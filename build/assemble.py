# -*- coding: utf-8 -*-
import json, re, os, sys, urllib.request
# 路径全部相对脚本自身所在目录(06_构建工具/)，不再硬编码某个会话的沙盒路径，
# 这样换任何新会话/新沙盒，只要文件夹本身连接上了，都能直接跑。
HERE = os.path.dirname(os.path.abspath(__file__))
Z = os.path.join(HERE, "design_zip_new")
def rd(p): return open(os.path.join(Z,p),encoding="utf-8").read()

# ---- Supabase（与前端追踪脚本同一套 anon key；产品数据本就公开可读）----
SB_URL='https://vthiulsykmdnatwoqdat.supabase.co'
SB_ANON='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aGl1bHN5a21kbmF0d29xZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExOTM4NzksImV4cCI6MjA5Njc2OTg3OX0.TOHjT3wswV8F3juerFSci-OAa0Gz66nlbBQh7DwXdug'
# --from-supabase：从 Supabase 的 products 表读"最终成品记录"出站（发布流水线用）
# --dump-products：把本地构建出的最终记录导出成 products_export.json（做迁移用）
FROM_SUPABASE = "--from-supabase" in sys.argv
DUMP_PRODUCTS = "--dump-products" in sys.argv
def fetch_products_from_supabase():
    # 离线/测试：设 RC_PRODUCTS_LOCAL=某个json 时直接读本地成品记录，不走网络
    _local = os.environ.get("RC_PRODUCTS_LOCAL")
    if _local:
        return json.load(open(_local, encoding="utf-8"))
    url = SB_URL + "/rest/v1/products?select=data,sort&order=sort.asc"
    req = urllib.request.Request(url, headers={"apikey":SB_ANON,"Authorization":"Bearer "+SB_ANON})
    with urllib.request.urlopen(req, timeout=45) as resp:
        rows = json.load(resp)
    if not rows: raise RuntimeError("Supabase products 表为空——先跑迁移 SQL 灌入数据")
    return [row["data"] for row in rows]

def fetch_posts():
    # 博客/导购文章：已发布的从 Supabase 读；本地或失败则空（graceful）
    _local = os.environ.get("RC_POSTS_LOCAL")
    if _local:
        try: return json.load(open(_local, encoding="utf-8"))
        except Exception: return []
    try:
        url = SB_URL + "/rest/v1/posts?select=*&published=eq.true&order=created_at.desc"
        req = urllib.request.Request(url, headers={"apikey":SB_ANON,"Authorization":"Bearer "+SB_ANON})
        with urllib.request.urlopen(req, timeout=45) as resp:
            return json.load(resp)
    except Exception as e:
        print("posts 跳过（无网络/表不存在）:", e); return []

# --from-supabase 模式：产品数据全部来自 Supabase，本地不需要任何 *_data.json，
# 故此时 robots 置空（后面的构建/排序/规范化对空列表自然 no-op，再由 Supabase 覆盖 out）。
# 这样云端发布只需 assemble.py + design_zip_new/，无需带数据文件。
if FROM_SUPABASE:
    robots = []
else:
    robots = json.load(open(os.path.join(HERE, "robots_data.json"),encoding="utf-8"))
    # 其他品类各自一个数据文件（每品类一个 *_data.json，字段是已结构化好的展示字段），
    # 存在就并入。新增品类时：写一个 <品类>_data.json，在这里加进列表即可。
    for _extra in ["humanoids_data.json", "pool_data.json", "mower_data.json", "commercial_data.json", "quadruped_data.json"]:
        _p=os.path.join(HERE, _extra)
        if os.path.exists(_p):
            robots += json.load(open(_p,encoding="utf-8"))

# ---- 重算各轴分数 + 客观推导 tags/verdict/pros/cons ----
suc_t=[6000,12000,20000,30000];run_t=[120,150,180,220];clb_t=[10,20,40,60];lift_t=[5,10,15,20]
def sc(v,t): return 1+sum(1 for x in t if v>=x)
GLOW={"Roborock":"#6E8BFF","Dreame":"#A66BFF","Ecovacs":"#5BE2FF","Eufy":"#5B8CFF","Narwal":"#8FA8FF","iRobot":"#3FE0A2"}
# glow 必须按【品类】存（Home/卡片用 DATA.glow[品类名]），与设计稿一致
CAT_GLOW={"Humanoids":"#A66BFF","Robot Vacuums":"#6E8BFF","Robot Lawn Mowers":"#3FE0A2","Pool Cleaners":"#5BE2FF","Commercial & Industrial":"#FF6BAA","Quadrupeds":"#F5B14C"}

# ---- 各品类图标（首页/卡片/详情用），与 CATEGORIES 列表保持一致 ----
CAT_EMOJI={"Humanoids":"\U0001F916","Robot Vacuums":"\U0001F9F9",
           "Robot Lawn Mowers":"\U0001F331","Pool Cleaners":"\U0001F30A",
           "Quadrupeds":"\U0001F415","Commercial & Industrial":"\U0001F9FE"}

# ---- 各品类雷达 5 轴（单一来源：Python 侧构建器 + 前端 DATA_JS 都用它）----
# 须与 04_文档/Roboclan雷达评分标准.md 权威口径一致。
# · Humanoids 已从最早占位的 Mobility/Manipulation/Intelligence/Battery/Value
#   同步为定稿口径 DOF/Payload/Battery/Speed/Value（2026-06-30 与 Kai 确认）。
# · Pool Cleaners 走「无线」轨口径；有线款（Coverage/Filtration/Suction/PoolSize/Value）
#   档位口径尚未统一，接入有线泳池数据前需在此补一条有线轴或按子类拆分（见交接第②节第6条）。
AXES={
    # 人形机 + 商用工业：不放性价比/ROI 轴（Kai 2026-07 定）——这两类厂商多要求"询价"，
    # 性价比由价格反推，会间接泄露定价，故雷达只保留纯能力轴（4 轴）。
    "Humanoids":["DOF","Payload","Battery","Speed","Value"],
    "Robot Vacuums":["Suction","Runtime","Threshold","Mop-lift","Value"],
    "Robot Lawn Mowers":["Coverage","Slope","Cut width","Runtime","Value"],
    "Pool Cleaners":["Coverage","Capacity","Filtration","Runtime","Value"],
    "Commercial & Industrial":["Payload","Autonomy","Efficiency","Runtime","Value"],
    "Quadrupeds":["Mobility","Payload","Battery","Intelligence","Value"],
}

# ============================================================
# 按品类分支的数据处理逻辑。
# ------------------------------------------------------------
# 通用契约：每条记录处理后必须产出前端消费的这些字段——
#   cat / emoji / radar / tags / cardSpecs / info / specs / prices
#   / verdict / pros / cons / score / featured / priceFrom / price
# 「铁律」：只用客观数据。tags/verdict/pros/cons 一律从 radar 分数或
# 官方规格客观推导（或直接采用数据文件里已写好的字段），绝不主观编评测。
# 新增品类时优先做法：在 robots_data.json 里直接给出结构化的
# cardSpecs/info/specs/prices/tags（键存在就直接采用），
# build_generic 只在缺省时按 radar 轴分兜底，保证任何品类都能出网站。
# ============================================================

# ---- 单位显示：面向北美用户，一律用美制单位（US customary）。----
# 源数据保持公制（贴合官方规格表），构建时转换为美制显示。幂等：
# 已是美制的 token 原样通过；airflow(L/s)、N·m、mAh、Pa、dB、min 等不动。
def _fmt_us(x, dec=1):
    s = f'{x:.{dec}f}'.rstrip('0').rstrip('.')
    return s if s else '0'

def us(s):
    if not isinstance(s, str):
        return s
    t = s
    t = re.sub(r'(-?\d+(?:\.\d+)?)\s*°C', lambda m: f'{round(float(m.group(1))*9/5+32)}°F', t)
    t = re.sub(r'(\d+(?:\.\d+)?)\s*km/h', lambda m: f'{_fmt_us(float(m.group(1))*0.621371)} mph', t)
    t = re.sub(r'(\d+(?:\.\d+)?)\s*m/s', lambda m: f'{_fmt_us(float(m.group(1))*2.236936)} mph', t)
    t = re.sub(r'(\d+(?:\.\d+)?)\s*m²', lambda m: f'{int(round(float(m.group(1))*10.7639/10)*10):,} sq ft', t)
    # 多个数字共用一个 mm 单位（× / + 分隔，如 "350 × 353 × 79.8 mm"、
    # "35 / 41 mm"、"45 + 43 mm"）：每个数字都要换算，分隔符保留。
    def _len_group(m):
        body = re.sub(r'\d[\d.,]*', lambda n: _fmt_us(float(n.group(0).replace(',', ''))/25.4), m.group(1))
        return body + ' in'
    t = re.sub(r'((?:\d[\d.,]*\s*[×/+]\s*)+\d[\d.,]*)\s*mm', _len_group, t)
    t = re.sub(r'(\d+(?:\.\d+)?)\s*mm', lambda m: f'{_fmt_us(float(m.group(1))/25.4)} in', t)
    t = re.sub(r'(\d+(?:\.\d+)?)\s*cm', lambda m: f'{_fmt_us(float(m.group(1))/2.54)} in', t)
    t = re.sub(r'(\d+(?:\.\d+)?)\s*kg', lambda m: f'{_fmt_us(float(m.group(1))*2.204623)} lb', t)
    t = re.sub(r'(\d+(?:\.\d+)?)\s*m[lL]\b', lambda m: f'{_fmt_us(float(m.group(1))*0.033814)} fl oz', t)
    t = re.sub(r'(\d+(?:\.\d+)?)\s*L\b(?!\s*/)', lambda m: f'{_fmt_us(float(m.group(1))*1.056688)} qt', t)
    t = re.sub(r'(?<![·\w])(\d+(?:\.\d+)?)\s*m\b(?!/|²|Ah|ph|m)', lambda m: f'{_fmt_us(float(m.group(1))*3.28084)} ft', t)
    # 词与词之间的 " + " 当作「and」，改成 " & "，避免看起来像数学公式
    # （数字间的 "45 + 43"、无空格的 "300+" 不受影响）。
    t = re.sub(r'(?<=[A-Za-z]) \+ (?=[A-Za-z])', ' & ', t)
    return t

def apply_us(rec):
    """把一条已构建记录里的所有展示字符串转成美制单位。"""
    rec["tags"] = [us(t) for t in rec.get("tags", [])]
    rec["highlights"] = [us(t) for t in rec.get("highlights", [])]
    rec["info"] = [[k, us(v)] for k, v in rec.get("info", [])]
    rec["specs"] = [[k, us(v)] for k, v in rec.get("specs", [])]
    rec["cardSpecs"] = [[k, us(v)] for k, v in rec.get("cardSpecs", [])]
    if rec.get("verdict"):
        rec["verdict"] = us(rec["verdict"])
    if rec.get("pros"):
        rec["pros"] = [us(p) for p in rec["pros"]]
    if rec.get("cons"):
        rec["cons"] = [us(c) for c in rec["cons"]]
    return rec

def build_vacuum(r):
    """扫地机专属逻辑（保持与历史输出逐字节一致）。"""
    su=r["suction"]; ru=r["runtime"]; th=r["threshold"]; ml=r["moplift"]; pr=r["price"]
    rad=r["radar"]  # [suc,run,clb,lift,val]
    # 总表增强字段（有则用）：越障单/双、坞详细功能、招牌技术、导航
    obstacle=r.get("obstacle") or th
    dockfull=r["dock"]+(" — "+r["dockFeatures"] if r.get("dockFeatures") else "")
    # tags：3–4 个纯规格数据词条（Kai 定：词条放 spec 数据，不放招牌技术/虚词）
    tags=[su, ru, f"{th} threshold", f"{ml} mop-lift"]
    highlights=[]  # 不再用黄色招牌技术词条；招牌技术仍在规格表 Notable tech 行
    # verdict（事实陈述，非评测）
    verdict=(f"{su} suction · {ru} runtime · crosses thresholds up to {th} · "
             f"{ml} mop-lift on carpet · all-in-one self-clean dock. "
             f"Radar {r['score']}/5 on official specs.")
    # pros/cons（从分数客观推导）
    pros=[]
    if rad[0]>=4: pros.append(f"Strong {su} suction")
    if rad[1]>=4: pros.append(f"Long {ru} runtime")
    if rad[2]>=4: pros.append(f"Crosses tall thresholds (up to {th})")
    if rad[3]>=4: pros.append(f"High {ml} mop-lift for carpets")
    if rad[4]>=4 and r["priceFrom"]: pros.append(f"Good value at {pr}")
    pros=pros[:3] or [f"All-in-one self-clean dock"]
    cons=[]
    if rad[0]<=2: cons.append(f"Modest {su} suction")
    if rad[1]<=2: cons.append(f"Short {ru} runtime")
    if rad[2]<=2: cons.append("Low threshold clearance")
    if rad[3]<=2: cons.append(f"Limited {ml} mop-lift")
    cons=cons[:3]
    return {
        "id":r["id"],"name":r["name"],"brand":r["brand"],"cat":"Robot Vacuums","emoji":"\U0001F9F9",
        "priceFrom":r["priceFrom"],"price":pr,"score":r["score"],
        "featured":r["score"]>=4.4,
        "radar":rad,"tags":tags,"highlights":highlights,
        "cardSpecs":[["Suction",su],["Runtime","up to "+ru]],
        "verdict":verdict,"pros":pros,"cons":cons,
        "info":[["Dock",r["dock"]],["Obstacle",th],["Mop-lift",ml]],
        "specs":([["Suction",su],["Runtime","up to "+ru],["Obstacle crossing",obstacle],["Mop lift",ml]]
                 +([["Navigation",r["nav"]]] if r.get("nav") else [])
                 +([["Main brush",r["mainBrush"]]] if r.get("mainBrush") else [])
                 +([["Dustbin",r["dustbin"]]] if r.get("dustbin") else [])
                 +([["Water tank",r["waterTank"]]] if r.get("waterTank") else [])
                 +([["Battery",r["battery"]]] if r.get("battery") else [])
                 +([["Suitable area",r["area"]]] if r.get("area") else [])
                 +([["Max carpet height",r["carpet"]]] if r.get("carpet") else [])
                 +([["Noise",r["noise"]]] if r.get("noise") else [])
                 +([["Dimensions",r["dimensions"]]] if r.get("dimensions") else [])
                 +([["Weight",r["weight"]]] if r.get("weight") else [])
                 +([["Filter",r["filter"]]] if r.get("filter") else [])
                 +([["Smart home",r["smartHome"]]] if r.get("smartHome") else [])
                 +[["Dock",dockfull]]
                 +([["Notable tech",r["tech"]]] if r.get("tech") else [])),
        "prices":[["Best tracked price",pr,True]],
    }

def build_generic(r):
    """通用逻辑：任何非扫地机品类都走这里。
    优先采用数据文件里已写好的 tags/cardSpecs/info/specs/prices；
    缺省时按该品类的 radar 轴名 + 分数客观兜底，绝不编造评测话术。"""
    cat=r["cat"]; rad=r["radar"]
    axes=AXES.get(cat, ["A1","A2","A3","A4","A5"])
    pr=r.get("price","See price")
    # score 可为 None：本站不做「总分」（各轴独立展示），无总分的品类 score 传 null。
    # 前端卡片的分数徽章遇 null 会自动隐藏；详情页 Overall 徽章也已加判空。
    sc=r.get("score")
    # tags：数据里给了就用；否则挑得分最高的轴客观生成
    tags=r.get("tags")
    _rv=lambda i: (rad[i] if rad[i] is not None else -1)  # None 轴(N/A)不参与自动挑选
    if not tags:
        tags=[]
        for i in sorted(range(len(axes)), key=lambda i:-_rv(i)):
            if _rv(i)>=5: tags.append(f"Top {axes[i]}")
            elif _rv(i)>=4: tags.append(f"Strong {axes[i]}")
        if not tags: tags=[r["brand"]]
        tags=tags[:3]
    # cardSpecs：数据里给了就用；否则展示前两条轴分
    cardSpecs=r.get("cardSpecs") or [[axes[0],f"{rad[0]}/5"],[axes[1],f"{rad[1]}/5"]]
    # info（详情页概览）：数据里给了就用；否则前三条轴分
    info=r.get("info") or [[axes[i],f"{rad[i]}/5"] for i in range(min(3,len(axes)))]
    # specs（详情页规格表）：数据里给了就用；否则全部轴分（无总分，不加 Radar score 行）
    specs=r.get("specs") or [[axes[i],f"{rad[i]} / 5"] for i in range(len(axes))]
    # prices：数据里给了就用；否则单条占位（价格待确认时也不编数字）
    prices=r.get("prices") or [["Best tracked price",pr,bool(r.get("priceFrom"))]]
    # verdict/pros/cons：详情页已删除该区块，仅为契约完整性保留，客观推导
    verdict=r.get("verdict") or (
        f"{r['name']} — official specs across {', '.join(axes)}.")
    pros=r.get("pros")
    if pros is None:
        pros=[f"Strong {axes[i].lower()}" for i in range(len(axes)) if _rv(i)>=4][:3] \
             or ["Scored on official specs"]
    cons=r.get("cons")
    if cons is None:
        cons=[f"Modest {axes[i].lower()}" for i in range(len(axes)) if 0<=_rv(i)<=2][:3]
    return {
        "id":r["id"],"name":r["name"],"brand":r["brand"],"cat":cat,
        "emoji":r.get("emoji") or CAT_EMOJI.get(cat,"\U0001F916"),
        "priceFrom":bool(r.get("priceFrom")),"price":pr,"score":sc,
        "featured":bool(sc is not None and sc>=4.4),
        "radar":rad,"tags":tags,
        "axes":r.get("axes"),  # 可选：单条覆盖雷达轴名（泳池有线/无线双轨用）；None → 前端回退 DATA.axes[cat]
        "highlights":r.get("highlights",[]),  # 黄色亮点词条（可选）；普通 tags 渲染为灰色
        "cardSpecs":cardSpecs,
        "verdict":verdict,"pros":pros,"cons":cons,
        "info":info,"specs":specs,"prices":prices,
    }

# 品类 → 构建器分发表。扫地机走专属逻辑，其余全部走通用逻辑。
BUILDERS={"Robot Vacuums":build_vacuum}

# 把每款补出 verdict/pros/cons/tags/info/specs/prices（都基于已知客观数据）
out=[]
for r in robots:
    # cat 从数据里读，不再硬编码；历史扫地机记录没有 cat 字段 → 默认扫地机（向后兼容）
    cat=r.get("cat","Robot Vacuums")
    rec=dict(r); rec["cat"]=cat
    out.append(apply_us(BUILDERS.get(cat, build_generic)(rec)))

# 排序：先按品类分区（扫地机在前，保持历史顺序不变），品类内部——
#  · 扫地机：按 score 降序（沿用历史，保证输出与旧版一致）
#  · 人形机：无总分，不能按分排；按品牌分组（Kai 定），组内保持数据文件顺序
#  · 其余品类：有 score 按 score 降序，无 score 按品牌名，避免拿单轴冒充总分
CAT_SORT={"Robot Vacuums":0,"Humanoids":1,"Robot Lawn Mowers":2,
          "Pool Cleaners":3,"Quadrupeds":4,"Commercial & Industrial":5}
HUMANOID_BRAND_ORDER={"Unitree":0,"LimX":1,"AgiBot":2,"Booster":3}
def sort_key(x):
    crank=CAT_SORT.get(x["cat"],9); cat=x["cat"]
    if cat=="Robot Vacuums":
        return (crank, -x["score"], 0, "", "")
    if cat=="Humanoids":
        return (crank, 0, HUMANOID_BRAND_ORDER.get(x["brand"],9), x["brand"], "")
    sc=x["score"] if x["score"] is not None else 0
    return (crank, -sc, 0, x["brand"], x["name"])
out.sort(key=sort_key)

# ===== 显示层规范化（Kai 反馈：统一大小写、水箱去 clean/used、导航去括号黑话）=====
_UNITS_KEEP={"in","ft","qt","oz","fl","gal","lb","lbs","mph","sq","rpm","min","mins","h","hr","hrs",
  "day","days","mo","yr","mm","cm","m","km","s","mah","wh","kwh","ah","pa","kpa","v","w","kg","g",
  "ml","l","db","dba","gph","dof","tops","tflops","fps"}
def _capword(w):
    if any(c.isupper() for c in w): return w                       # 已含大写(缩写/品牌/型号)→原样
    if not any(c.islower() for c in w): return w                    # 纯数字/符号→原样
    if re.sub(r'[^a-z]','',w.lower()) in _UNITS_KEEP: return w       # 单位保持小写
    return w[0].upper()+w[1:]
def _title(s):
    return " ".join(_capword(w) for w in str(s).split(" "))
def _clean_tank(v):
    v=v.split("/")[0].strip()                                       # 丢掉 "/ X used"
    v=re.sub(r'\s*\b(clean|used|water)\b','',v,flags=re.I).strip()  # 去 clean/used/water 词
    m=re.match(r'^([\d.]+)\s*qt$',v)                                # 统一成 fl oz（与小水箱一致）
    if m: v=str(round(float(m.group(1))*32))+" fl oz"
    m=re.match(r'^([\d.]+)\s*gal$',v,re.I)
    if m: v=str(round(float(m.group(1))*128))+" fl oz"
    return v
def _simple_nav(v):
    lv=v.lower(); parts=[]
    if "lidar" in lv or " lds" in lv or "laser" in lv: parts.append("LiDAR")
    if "rtk" in lv: parts.append("RTK")
    if "tof" in lv: parts.append("3D ToF")
    if "structured light" in lv: parts.append("structured light")
    if "camera" in lv or "vision" in lv or "rgb" in lv or "aivi" in lv: parts.append("AI camera")
    parts=list(dict.fromkeys(parts))
    return " + ".join(parts) if parts else re.sub(r'\s*\([^)]*\)','',v).strip()
for _rec in out:
    for _fld in ("specs","info","cardSpecs"):
        rows=_rec.get(_fld)
        if not rows: continue
        for _row in rows:
            if not isinstance(_row,list) or len(_row)<2: continue
            # 标签统一：Runtime 在人形语境易被误解为"软件运行时"，仅人形改成 Battery life
            # （扫地机等仍叫 Runtime，与其雷达轴一致）；Arm payload 本质就是负载，
            # 统一归到 Payload（无产品同时含两者，不会重复）。
            if _rec.get("cat")=="Humanoids" and _row[0]=="Runtime": _row[0]="Battery life"
            elif _row[0]=="Arm payload": _row[0]="Payload"
            k=_row[0]; val=str(_row[1])
            if k in ("Water tank","Water tanks"): val=_clean_tank(val)
            if k in ("Navigation","Nav"): val=_simple_nav(val)
            _row[1]=_title(val)

# 到这里 out 已是"最终成品记录"（已排序 + 已规范化）。
# 迁移：把它导出，供 gen_products_sql.py 生成 Supabase products 表的灌库 SQL。
if DUMP_PRODUCTS:
    # 顺序由导出时的下标决定（gen_products_sql.py 用 enumerate 下标写 sort 列），
    # 不往 data 里塞 sort 字段，保证 Supabase 出站结果与本地构建逐字段一致。
    json.dump(out, open(os.path.join(HERE,"products_export.json"),"w",encoding="utf-8"), ensure_ascii=False, indent=1)
    print("已导出 products_export.json：%d 条"%len(out))
# 发布流水线：改用 Supabase 里的成品记录出站（覆盖本地构建结果，Supabase 为唯一真相源）
if FROM_SUPABASE:
    out = fetch_products_from_supabase()
    print("已从 Supabase 读取 products：%d 条"%len(out))

DATA_JS = "window.ROBOCLAN_DATA=(function(){\n"
DATA_JS += 'var CAT_GLOW=%s;\n'%json.dumps(CAT_GLOW)
# AXES 用上面定义的 Python 字典序列化，前后端同一份口径，避免两边不同步。
DATA_JS += 'var AXES=%s;\n'%json.dumps(AXES)
DATA_JS += ('var CATEGORIES=['
            '{name:"Humanoids",emoji:"\U0001F916",blurb:""},'
            '{name:"Robot Vacuums",emoji:"\U0001F9F9",blurb:""},'
            '{name:"Robot Lawn Mowers",emoji:"\U0001F331",blurb:""},'
            '{name:"Pool Cleaners",emoji:"\U0001F30A",blurb:""},'
            '{name:"Quadrupeds",emoji:"\U0001F415",blurb:""},'
            '{name:"Commercial & Industrial",emoji:"\U0001F9FE",blurb:""}];\n')
DATA_JS += 'var R=%s;\n'%json.dumps(out,ensure_ascii=False)
DATA_JS += 'var byId={};R.forEach(function(x){byId[x.id]=x;});\n'
POSTS = fetch_posts()
DATA_JS += 'var POSTS=%s;\n'%json.dumps(POSTS, ensure_ascii=False)
DATA_JS += 'var postById={};POSTS.forEach(function(p){postById[p.id]=p;});\n'
DATA_JS += 'return {robots:R,byId:byId,glow:CAT_GLOW,axes:AXES,categories:CATEGORIES,posts:POSTS,postById:postById};\n})();'

# ---- CSS：内联所有 token + styles.css(去掉@import) ----
css=""
for t in ["colors","typography","effects","spacing","base"]:
    css+=rd("tokens/%s.css"%t)+"\n"
# 注意：styles.css 只是 @import 各 token（已单独内联）+ 一段注释，整体跳过。
# 不能再用正则删 @import —— 之前那样会把注释里 "It only @imports..." 的结尾 */ 一起吃掉，
# 导致注释不闭合、把后面的 FOOT_CSS 全吞成注释。
styles=""
FOOT_CSS = """
.rc-ft{border-top:1px solid var(--line);margin-top:48px;background:linear-gradient(180deg,transparent,rgba(110,139,255,.025));}
.rc-ft__cols{max-width:var(--container);margin:0 auto;padding:64px 24px 44px;display:grid;grid-template-columns:repeat(5,1fr);gap:32px;}
.rc-ft__col h4{font-family:var(--font-display);font-weight:600;font-size:20px;letter-spacing:-.01em;color:var(--text-1);margin:0 0 22px;}
.rc-ft__col a{display:block;font-size:14px;color:var(--text-3);text-decoration:none;cursor:pointer;margin-bottom:15px;transition:color var(--dur-fast);width:fit-content;}
.rc-ft__col a:hover{color:var(--text-1);}
.rc-ft__bar{max-width:var(--container);margin:0 auto;padding:26px 24px 60px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap;font-size:12px;color:var(--text-4);line-height:1.7;}
.rc-ft__bar .rc-ft__sig{display:flex;align-items:center;gap:9px;}
.rc-ft__bar .rc-ft__word{font-family:var(--font-display);font-weight:600;font-size:16px;letter-spacing:-.03em;color:var(--text-2);}
.rc-ft__bar .rc-ft__dis{max-width:680px;text-align:right;}
@media(max-width:920px){.rc-ft__cols{grid-template-columns:repeat(2,1fr);gap:36px 24px}}
@media(max-width:560px){.rc-ft__cols{grid-template-columns:1fr}.rc-ft__bar{flex-direction:column;gap:14px}.rc-ft__bar .rc-ft__dis{text-align:left}}

/* 静态内容页（About / How We Score / Terms / Privacy / Affiliate） */
.rc-page{max-width:760px;margin:0 auto;padding:40px 24px 88px;}
.rc-page__back{display:inline-block;font-family:var(--font-mono);font-size:12px;letter-spacing:.06em;color:var(--text-3);cursor:pointer;text-decoration:none;margin-bottom:26px;transition:color var(--dur-fast);}
.rc-page__back:hover{color:var(--text-1);}
.rc-page__title{font-family:var(--font-display);font-weight:600;font-size:38px;letter-spacing:-.025em;color:var(--text-1);margin:0 0 14px;}
.rc-page__lede{font-size:17px;line-height:1.65;color:var(--text-2);margin:0 0 40px;}
.rc-news2{display:flex;flex-direction:column;gap:12px;}
.rc-news2__item{display:block;padding:18px 20px;border:1px solid var(--line);border-radius:14px;background:var(--surface-1);text-decoration:none;position:relative;}
.rc-news2__item.is-link{cursor:pointer;transition:border-color .15s,background .15s;}
.rc-news2__item.is-link:hover{border-color:rgba(110,139,255,.5);background:var(--surface-2);}
.rc-news2__h{font-family:var(--font-display);font-weight:600;font-size:17px;color:var(--text-1);}
.rc-news2__b{font-size:14.5px;color:var(--text-2);margin-top:4px;line-height:1.5;}
.rc-news2__arw{position:absolute;top:18px;right:18px;color:var(--accent-ink);font-size:15px;}
.rc-news2__empty{color:var(--text-3);padding:30px 0;}
/* 导购/文章 */
.rc-guides{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;}
.rc-gcard{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--surface-1);text-decoration:none;transition:border-color .15s,transform .15s;cursor:pointer;}
.rc-gcard:hover{border-color:rgba(110,139,255,.5);transform:translateY(-2px);}
.rc-gcard__cover{height:170px;background:#fff;overflow:hidden;}
.rc-gcard__cover img{width:100%;height:100%;object-fit:cover;}
.rc-gcard__body{padding:16px 18px;}
.rc-gcard__cat{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-ink);margin-bottom:7px;}
.rc-gcard__t{font-family:var(--font-display);font-weight:600;font-size:18px;line-height:1.25;color:var(--text-1);margin:0;}
.rc-gcard__ex{font-size:14px;color:var(--text-2);line-height:1.5;margin:8px 0 0;}
.rc-post{max-width:760px;margin:0 auto;padding:24px 24px 96px;}
.rc-post__cat{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-ink);margin:18px 0 8px;}
.rc-post__title{font-family:var(--font-display);font-weight:600;font-size:38px;letter-spacing:-.025em;line-height:1.1;color:var(--text-1);margin:0 0 12px;}
.rc-post__meta{font-size:13.5px;color:var(--text-3);margin-bottom:22px;}
.rc-post__cover{border-radius:16px;overflow:hidden;background:#fff;margin-bottom:26px;}
.rc-post__cover img{width:100%;display:block;}
.rc-post__body{font-size:16.5px;line-height:1.75;color:var(--text-2);}
.rc-post__body h2{font-family:var(--font-display);font-weight:600;font-size:25px;color:var(--text-1);margin:34px 0 12px;letter-spacing:-.02em;}
.rc-post__body h3{font-family:var(--font-display);font-weight:600;font-size:19px;color:var(--text-1);margin:26px 0 8px;}
.rc-post__body p{margin:0 0 16px;}
.rc-post__body ul{margin:0 0 16px;padding-left:22px;}
.rc-post__body li{margin:7px 0;}
.rc-post__body a{color:var(--accent-ink);text-decoration:underline;}
.rc-post__body .lead{font-size:19px;color:var(--text-1);line-height:1.6;}
.rc-post__body .disclosure{font-size:13px;color:var(--text-3);border-top:1px solid var(--line);padding-top:16px;margin-top:32px;}
.rc-page__sec{margin-bottom:30px;}
.rc-page__sec h2{font-family:var(--font-display);font-weight:600;font-size:21px;letter-spacing:-.01em;color:var(--text-1);margin:0 0 10px;}
.rc-page__sec p{font-size:15px;line-height:1.72;color:var(--text-3);margin:0 0 12px;}

/* 对比页 */
.rc-cmp{max-width:var(--container);margin:0 auto;padding:32px 24px 80px;}
.rc-cmp__title{font-family:var(--font-display);font-weight:600;font-size:30px;letter-spacing:-.02em;color:var(--text-1);margin:14px 0 22px;}
.rc-cmp__scroll{overflow-x:auto;border:1px solid var(--line);border-radius:16px;}
.rc-cmp__tbl{border-collapse:collapse;width:100%;min-width:520px;font-size:13.5px;}
.rc-cmp__tbl th,.rc-cmp__tbl td{padding:12px 16px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top;}
.rc-cmp__prod{min-width:150px;}
.rc-cmp__prodhd{display:flex;align-items:center;gap:9px;margin-bottom:6px;}
.rc-cmp__rm{flex-shrink:0;width:24px;height:24px;border-radius:50%;border:1px solid var(--line);background:var(--surface-2);color:var(--text-2);font-size:16px;line-height:1;cursor:pointer;display:grid;place-items:center;padding:0;transition:all .15s;}
.rc-cmp__rm:hover{background:var(--danger);border-color:var(--danger);color:#fff;}
.rc-cmp__emoji{font-size:30px;display:block;margin-bottom:6px;}
.rc-cmp__nm{font-family:var(--font-display);font-weight:600;font-size:15px;color:var(--text-1);line-height:1.25;}
.rc-cmp__pr{font-family:var(--font-mono);font-size:12.5px;color:var(--accent-ink);margin-top:3px;}
.rc-cmp__k{font-family:var(--font-mono);font-size:11.5px;letter-spacing:.03em;text-transform:uppercase;color:var(--text-3);white-space:nowrap;}
.rc-cmp__v{color:var(--text-2);}
.rc-cmp__sec{font-family:var(--font-display);font-weight:600;font-size:13px;color:var(--text-1);background:var(--surface-2);text-transform:uppercase;letter-spacing:.05em;}

/* 移动端防护：禁止横向溢出（错位最常见原因）；小屏内边距收紧 */
html,body{overflow-x:hidden;max-width:100%;}
.rc-app{overflow-x:hidden;}
img,svg,table{max-width:100%;}
@media(max-width:560px){
  .rc-cmp,.rc-page{padding-left:16px;padding-right:16px;}
  .rc-page__title{font-size:30px;}
}

/* 询价留资弹窗 */
.rc-lead__ov{position:fixed;inset:0;z-index:100;background:rgba(6,8,12,.72);backdrop-filter:blur(6px);display:flex;align-items:flex-start;justify-content:center;padding:48px 16px;overflow-y:auto;}
.rc-lead{position:relative;width:100%;max-width:560px;background:var(--bg-2);border:1px solid var(--line-2);border-radius:20px;padding:32px 30px;box-shadow:var(--shadow-pop);}
.rc-lead__x{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text-3);font-size:26px;line-height:1;cursor:pointer;}
.rc-lead__x:hover{color:var(--text-1);}
.rc-lead__t{font-family:var(--font-display);font-weight:600;font-size:24px;color:var(--text-1);margin:0 0 8px;}
.rc-lead__sub{font-size:14px;line-height:1.6;color:var(--text-3);margin:0 0 22px;}
.rc-lead__grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 16px;margin-bottom:14px;}
.rc-lead__lb{display:flex;flex-direction:column;gap:6px;font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-3);}
.rc-lead__form>.rc-lead__lb{margin-bottom:14px;}
.rc-lead__req{color:var(--accent-ink);font-style:normal;}
.rc-lead__in{font-family:var(--font-body);font-size:14px;color:var(--text-1);background:var(--surface-1);border:1px solid var(--line-2);border-radius:10px;padding:10px 12px;text-transform:none;letter-spacing:0;transition:border-color var(--dur-fast);}
.rc-lead__in:focus{outline:none;border-color:var(--accent);box-shadow:var(--glow-focus);}
.rc-lead__ta{resize:vertical;min-height:88px;}
.rc-lead__submit{margin-top:6px;width:100%;font-family:var(--font-body);font-weight:600;font-size:15px;color:var(--text-on-accent);background:var(--grad-accent);border:none;border-radius:12px;padding:13px;cursor:pointer;box-shadow:var(--glow-accent-sm);}
.rc-lead__submit:disabled{opacity:.6;cursor:default;}
.rc-lead__errmsg{color:var(--danger);font-size:13px;margin:2px 0 0;}
.rc-lead__done{text-align:center;padding:16px 0;}
.rc-lead__check{width:56px;height:56px;margin:0 auto 16px;border-radius:50%;display:grid;place-items:center;font-size:28px;color:var(--success);background:var(--success-soft);}
@media(max-width:520px){.rc-lead__grid{grid-template-columns:1fr;}}

/* 详情页询价区 */
.rc-dt__quotelbl{font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--warn);align-self:center;}
.rc-dt__quote{display:flex;flex-direction:column;gap:14px;align-items:flex-start;}
.rc-dt__quotetext{font-size:14px;line-height:1.65;color:var(--text-3);margin:0;}

/* ===== 浅银灰(亮色)主题微调：把深空彩色光斑换成中性银灰，干净电商质感 ===== */
[data-theme="light"]{
  /* 柔和雾白灰：底色降一档不刺眼，卡片仍纯白留层次 */
  --bg-0:#E6E8EC; --bg-1:#ECEEF1; --bg-2:#FFFFFF; --bg-3:#FFFFFF;
  /* 环境光全部去色，几乎不可见，避免刺眼 */
  --glow-cyan:rgba(140,150,168,.04);
  --glow-violet:rgba(142,148,166,.05);
  --glow-blue:rgba(140,150,168,.04);
}
[data-theme="light"] body{
  background-color:var(--bg-1);
  /* 去掉顶部大白光斑(刺眼来源)，仅留极淡均匀的中性渐变 */
  background-image:
    radial-gradient(1200px 800px at 50% -20%, rgba(255,255,255,.45), transparent 62%),
    radial-gradient(900px 600px at 100% 0%, rgba(150,156,176,.05), transparent 60%);
}
[data-theme="light"] ::selection{background:rgba(110,139,255,.22);color:#11141C;}
/* 修：唯一写死的白字(资讯条加粗词)在浅底会隐形 → 跟随主题文字色 */
[data-theme="light"] .rc-news__t b{color:var(--text-1);}
"""
css+=styles+"\n"+FOOT_CSS

bundle=rd("_ds_bundle.js")
header=rd("ui_kits/website/Header.jsx")
home=rd("ui_kits/website/Home.jsx")
catalog=rd("ui_kits/website/Catalog.jsx")
detail=rd("ui_kits/website/ProductDetail.jsx")
# 方案①：删掉详情页的 verdict 和 pros/cons 两个区块（无真实评测，不留主观文案）
detail=re.sub(r'<div className="rc-dt__verdict">.*?</div>', '', detail, flags=re.S)
detail=re.sub(r'<div className="rc-dt__pc">.*?</div>\s*(?=<div className="rc-dt__cols">)', '', detail, flags=re.S)

APP = r'''
const DATA = window.ROBOCLAN_DATA;

const PAGES = {
  score: {
    title: "How We Score",
    lede: "Every robot on Roboclan is rated on a 1–5 radar across five category-specific axes — using only official manufacturer specs. No paid placement, no invented numbers.",
    sections: [
      ["Only official data", ["Every score comes from the manufacturer's own published specs (official product pages and spec sheets) for the US market. If a figure isn't officially published, we mark it N/A rather than guess. Where sources conflict, we note it instead of silently picking one."]],
      ["A 5-axis radar, each axis 1–5", ["Each category has its own five axes chosen to be objective and direction-clear (higher is better). A robot vacuum is scored on suction, runtime, obstacle-crossing, mop-lift and value; a lawn mower on coverage, slope, cut width, runtime and value; and so on. Axes like navigation type or brand aren't scored — they're shown as spec details instead."]],
      ["No total score", ["We deliberately don't combine the axes into a single number. A blended 'overall' score hides trade-offs; the radar shows them. Compare the shapes, then weigh the axes that matter to you."]],
      ["The Value axis", ["Value is the only price-dependent axis. We anchor it to each product's original launch price (US MSRP), kept fixed so ratings stay consistent even as street prices swing with sales. Retail prices change constantly — always check the retailer for today's price."]],
      ["Enterprise & quote-only products", ["Humanoids and commercial/industrial robots are usually sold by quote. To avoid exposing a vendor's confidential pricing, we don't score a Value axis for them — the radar shows capability only."]],
      ["Updates", ["Scores are recomputed whenever a manufacturer publishes corrected specs. Our scoring rules are versioned internally so changes are traceable."]],
    ],
  },
  about: {
    title: "About Roboclan",
    lede: "Roboclan is an independent robot buying guide for the US market — comparing robots across six categories on objective, official specifications.",
    sections: [
      ["What we do", ["We help buyers compare robots the way an informed friend would: side-by-side, on the specs that matter, without hype. We cover robot vacuums, lawn mowers, pool cleaners, humanoids, quadrupeds, and commercial/industrial robots — with more added over time."]],
      ["How we stay objective", ["Our radar scores are computed from manufacturers' official specs, not from paid placement. Brands cannot pay to change a score. Where a product is genuinely strong, the radar shows it; where it's weak, the radar shows that too."]],
      ["How we make money", ["Roboclan earns affiliate commissions when you buy through our links, and generates qualified leads for enterprise robot vendors. This never changes how a product is scored. See our Affiliate Disclosure for details."]],
      ["Contact", ["Questions, corrections, or partnership inquiries: hello@roboclan.ai."]],
    ],
  },
  affiliate: {
    title: "Affiliate Disclosure",
    lede: "Roboclan is free to use. When you buy through links on our site, we may earn a commission — at no extra cost to you.",
    sections: [
      ["Our affiliate relationships", ["Roboclan is funded in part by affiliate partnerships. As an Amazon Associate, Roboclan earns from qualifying purchases. Where we link to a retailer or manufacturer through an affiliate program, we may earn a commission if you make a purchase. As we are accepted into additional retailer and manufacturer programs, we will add any program-specific disclosures they require here."]],
      ["No extra cost to you", ["Affiliate commissions are paid by the retailer out of their margin. You pay the same price whether or not you use our links."]],
      ["It does not affect our scores", ["Commissions never influence our radar scores or rankings. Scores are computed from official manufacturer specs. We link to products because they're relevant to your comparison, not because of commission rates."]],
      ["FTC disclosure", ["In line with the U.S. Federal Trade Commission's guidelines on endorsements, we disclose that some links on Roboclan are affiliate links. Prices and availability shown are for reference and may change; the retailer's page is always the source of truth for current pricing."]],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lede: "This policy explains what information Roboclan collects and how we use it. Last updated: 2026.",
    sections: [
      ["Information we collect", ["Roboclan is primarily an informational site. We collect limited, non-identifying analytics data (such as pages viewed and general device/browser type) to understand how the site is used and to improve it. We do not require you to create an account to browse."]],
      ["Cookies & analytics", ["We and our analytics providers may use cookies and similar technologies. Retailer and manufacturer affiliate networks may set cookies to attribute purchases made through our links. You can disable cookies in your browser settings."]],
      ["Third parties", ["When you click an outbound link, you leave Roboclan and are subject to the destination site's own privacy policy. We share only the minimum data needed for affiliate attribution; we do not sell your personal information."]],
      ["Your choices", ["Depending on your location, you may have rights to access, correct, or delete personal data we hold about you. To make a request, contact hello@roboclan.ai."]],
      ["Changes & contact", ["We may update this policy; material changes will be reflected here. Questions: hello@roboclan.ai."]],
    ],
  },
  terms: {
    title: "Terms of Service",
    lede: "By using Roboclan you agree to these terms. Last updated: 2026.",
    sections: [
      ["Informational use only", ["Roboclan provides robot comparisons and ratings for general informational purposes. Our scores reflect official specifications and our own methodology; they are not professional, financial, or purchasing advice. Always confirm specs and prices with the manufacturer or retailer before buying."]],
      ["Accuracy & pricing", ["We work to keep specs and scores accurate, but we make no warranty that all information is complete or current. Prices shown are reference values (typically launch MSRP) and change frequently; the retailer's listing is the authoritative source for current price and availability."]],
      ["Affiliate links", ["Some links are affiliate links, as described in our Affiliate Disclosure. Purchases and any resulting warranty, returns, or support are between you and the retailer or manufacturer."]],
      ["Intellectual property", ["Roboclan's original content, scoring methodology, and design are our property. Product names, images, and trademarks belong to their respective owners and are used for identification and comparison."]],
      ["Limitation of liability", ["To the extent permitted by law, Roboclan is not liable for any loss arising from reliance on information on the site. Use the site at your own discretion."]],
      ["Contact", ["Questions about these terms: hello@roboclan.ai."]],
    ],
  },
};

function PageView({ page, onHome }){
  React.useEffect(()=>{window.scrollTo(0,0);},[]);
  return (
    React.createElement("div",{className:"rc-page"},
      React.createElement("a",{className:"rc-page__back",onClick:onHome},"‹ Home"),
      React.createElement("h1",{className:"rc-page__title"},page.title),
      React.createElement("p",{className:"rc-page__lede"},page.lede),
      page.sections.map((s,i)=>React.createElement("section",{key:i,className:"rc-page__sec"},
        React.createElement("h2",null,s[0]),
        s[1].map((p,j)=>React.createElement("p",{key:j},p))
      ))
    )
  );
}

function _lf(label,key,f,set,req,type){
  return React.createElement("label",{className:"rc-lead__lb",key:key},
    React.createElement("span",null,label,req?React.createElement("i",{className:"rc-lead__req"}," *"):null),
    React.createElement("input",{className:"rc-lead__in",type:type||"text",value:f[key],onChange:set(key),required:!!req}));
}
function _lta(label,key,f,set,req){
  return React.createElement("label",{className:"rc-lead__lb rc-lead__lb--full",key:key},
    React.createElement("span",null,label,req?React.createElement("i",{className:"rc-lead__req"}," *"):null),
    React.createElement("textarea",{className:"rc-lead__in rc-lead__ta",value:f[key],onChange:set(key),required:!!req,rows:4}));
}
function LeadModal({product, onClose}){
  const [f,setF]=React.useState({name:"",email:"",country:"",phone:"",org:"",message:""});
  const [state,setState]=React.useState("form");
  const set=(k)=>(e)=>setF(v=>Object.assign({},v,{[k]:e.target.value}));
  const submit=async(e)=>{
    e.preventDefault();
    setState("sending");
    try{
      const sb=window._sb;
      const msg=(f.message||"")+"\n\nProduct: "+product+"\nCountry: "+f.country+(f.phone?("\nPhone: "+f.phone):"");
      if(sb){const r=await sb.from("leads").insert({name:f.name,email:f.email,company:f.org||null,message:msg,status:"new"});if(r&&r.error)throw r.error;}
      try{window.rcLog&&window.rcLog(product,null,"lead");}catch(_){}
      setState("done");
    }catch(err){console.warn("lead error",err);setState("error");}
  };
  return React.createElement("div",{className:"rc-lead__ov",onClick:onClose},
    React.createElement("div",{className:"rc-lead",onClick:e=>e.stopPropagation()},
      React.createElement("button",{className:"rc-lead__x","aria-label":"Close",onClick:onClose},"×"),
      state==="done"
        ? React.createElement("div",{className:"rc-lead__done"},
            React.createElement("div",{className:"rc-lead__check"},"✓"),
            React.createElement("h3",{className:"rc-lead__t"},"Request sent"),
            React.createElement("p",{className:"rc-lead__sub"},"Thanks — your inquiry about "+product+" is in. The manufacturer or an authorized distributor will get back to you directly with pricing, availability, and next steps."),
            React.createElement("button",{className:"rc-lead__submit",onClick:onClose},"Done"))
        : React.createElement("form",{className:"rc-lead__form",onSubmit:submit},
            React.createElement("h3",{className:"rc-lead__t"},"Request a quote"),
            React.createElement("p",{className:"rc-lead__sub"},product+" is sold by quote. Share a few details and we’ll connect you with the brand or an authorized distributor — they’ll follow up with pricing, availability, and configuration options. No obligation, and we never sell your data."),
            React.createElement("div",{className:"rc-lead__grid"},
              _lf("Name","name",f,set,true),
              _lf("Work email","email",f,set,true,"email"),
              _lf("Country","country",f,set,true),
              _lf("Phone","phone",f,set,false,"tel")),
            _lf("Organization","org",f,set,false),
            _lta("How can we help?","message",f,set,true),
            state==="error"?React.createElement("p",{className:"rc-lead__errmsg"},"Something went wrong sending your request. Please email hello@roboclan.ai directly and we’ll help."):null,
            React.createElement("button",{className:"rc-lead__submit",type:"submit",disabled:state==="sending"},state==="sending"?"Sending…":"Send request"))));
}

function CompareView({ids, onOpen, onBack, onRemove}){
  const items=ids.map(id=>DATA.byId[id]).filter(Boolean);
  if(!items.length) return React.createElement("div",{className:"rc-cmp"},React.createElement("a",{className:"rc-page__back",onClick:onBack},"‹ Back"),React.createElement("p",{className:"rc-page__lede"},"Nothing selected to compare."));
  const cat=items[0].cat; const ax=(DATA.axes[cat])||[];
  const specKeys=[]; items.forEach(r=>(r.specs||[]).forEach(s=>{if(specKeys.indexOf(s[0])<0)specKeys.push(s[0]);}));
  const sm=r=>{const o={};(r.specs||[]).forEach(s=>o[s[0]]=s[1]);return o;};
  const rows=[];
  rows.push(React.createElement("tr",{key:"axh"},React.createElement("td",{className:"rc-cmp__sec",colSpan:items.length+1},"Ratings (1–5)")));
  ax.forEach((label,ai)=>rows.push(React.createElement("tr",{key:"ax"+ai},
    React.createElement("td",{className:"rc-cmp__k"},label),
    ...items.map(r=>React.createElement("td",{key:r.id,className:"rc-cmp__v"},(r.radar&&r.radar[ai]!=null)?(r.radar[ai]+" / 5"):"—")))));
  rows.push(React.createElement("tr",{key:"sph"},React.createElement("td",{className:"rc-cmp__sec",colSpan:items.length+1},"Specifications")));
  specKeys.forEach((k,ki)=>rows.push(React.createElement("tr",{key:"sp"+ki},
    React.createElement("td",{className:"rc-cmp__k"},k),
    ...items.map(r=>React.createElement("td",{key:r.id,className:"rc-cmp__v"},sm(r)[k]||"—")))));
  return React.createElement("div",{className:"rc-cmp"},
    React.createElement("a",{className:"rc-page__back",onClick:onBack},"‹ Back"),
    React.createElement("h1",{className:"rc-cmp__title"},"Compare · "+cat),
    React.createElement("div",{className:"rc-cmp__scroll"},
      React.createElement("table",{className:"rc-cmp__tbl"},
        React.createElement("thead",null,React.createElement("tr",null,
          React.createElement("th",null,""),
          ...items.map(r=>React.createElement("th",{key:r.id,className:"rc-cmp__prod"},
            React.createElement("div",{className:"rc-cmp__prodhd"},
              React.createElement("button",{className:"rc-cmp__rm",title:"Remove from compare","aria-label":"Remove "+r.name,onClick:(e)=>{e.stopPropagation();onRemove&&onRemove(r.id);}},"−"),
              React.createElement("span",{className:"rc-cmp__emoji",onClick:()=>onOpen(r.id),style:{cursor:"pointer"}},r.emoji)),
            React.createElement("div",{className:"rc-cmp__nm",onClick:()=>onOpen(r.id),style:{cursor:"pointer"}},r.name),
            React.createElement("div",{className:"rc-cmp__pr"},r.price))))),
        React.createElement("tbody",null,rows))));
}

// 独立新闻页：顶栏 News 打开，实时从 Supabase 读全部头条（可点链接）
function NewsView({onBack}){
  const [items,setItems]=React.useState(null);
  React.useEffect(()=>{
    try{ const sb=window._sb; if(!sb){setItems([]);return;}
      sb.from("news").select("title,body,url,sort").eq("active",true).order("sort",{ascending:true})
        .then(function(res){ setItems(res.error?[]:(res.data||[])); });
    }catch(e){ setItems([]); }
  },[]);
  return React.createElement("div",{className:"rc-page"},
    React.createElement("a",{className:"rc-page__back",onClick:onBack},"‹ Back"),
    React.createElement("h1",{className:"rc-page__title"},"Robot News"),
    React.createElement("p",{className:"rc-page__lede"},"The latest launches and updates across every robot category."),
    items===null ? React.createElement("p",{className:"rc-news2__empty"},"Loading…")
    : items.length===0 ? React.createElement("p",{className:"rc-news2__empty"},"No headlines yet.")
    : React.createElement("div",{className:"rc-news2"}, items.map(function(n,i){
        var props={key:i,className:"rc-news2__item"+(n.url?" is-link":"")};
        if(n.url){props.href=n.url;props.target="_blank";props.rel="noopener";}
        return React.createElement(n.url?"a":"div",props,
          React.createElement("div",{className:"rc-news2__h"},n.title),
          n.body?React.createElement("div",{className:"rc-news2__b"},n.body):null,
          n.url?React.createElement("span",{className:"rc-news2__arw"},"↗"):null);
      })));
}

// 导购/博客：文章列表页（/guides）与单篇文章页（/guides/<slug>）
function GuidesView({onBack, onOpenPost}){
  var posts=(DATA.posts||[]);
  return React.createElement("div",{className:"rc-page"},
    React.createElement("a",{className:"rc-page__back",onClick:onBack},"‹ Back"),
    React.createElement("h1",{className:"rc-page__title"},"Guides"),
    React.createElement("p",{className:"rc-page__lede"},"Buying guides, brand comparisons and head-to-head breakdowns — every robot scored on the same 5-axis framework."),
    posts.length===0 ? React.createElement("p",{className:"rc-news2__empty"},"New guides are on the way.")
    : React.createElement("div",{className:"rc-guides"}, posts.map(function(p){
        return React.createElement("a",{key:p.id,className:"rc-gcard",onClick:function(e){e.preventDefault();onOpenPost(p.id);},href:"/guides/"+p.id+"/"},
          p.cover_image?React.createElement("div",{className:"rc-gcard__cover"},React.createElement("img",{src:p.cover_image,alt:"",loading:"lazy"})):null,
          React.createElement("div",{className:"rc-gcard__body"},
            p.category?React.createElement("div",{className:"rc-gcard__cat"},p.category):null,
            React.createElement("h3",{className:"rc-gcard__t"},p.title),
            p.excerpt?React.createElement("p",{className:"rc-gcard__ex"},p.excerpt):null));
      })));
}
function PostView({post, onBack}){
  if(!post) return React.createElement("div",{className:"rc-page"},React.createElement("a",{className:"rc-page__back",onClick:onBack},"‹ Back"),React.createElement("p",{className:"rc-page__lede"},"Article not found."));
  return React.createElement("article",{className:"rc-post"},
    React.createElement("a",{className:"rc-page__back",onClick:onBack},"‹ All guides"),
    post.category?React.createElement("div",{className:"rc-post__cat"},post.category):null,
    React.createElement("h1",{className:"rc-post__title"},post.title),
    React.createElement("div",{className:"rc-post__meta"},(post.author||"Roboclan Editors")+(post.created_at?(" · "+new Date(post.created_at).toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"})):"")),
    post.cover_image?React.createElement("div",{className:"rc-post__cover"},React.createElement("img",{src:post.cover_image,alt:""})):null,
    React.createElement("div",{className:"rc-post__body",dangerouslySetInnerHTML:{__html:post.body||""}}));
}

function App(){
  // 每个页面独立 URL：刷新/直达都停在当前页（配合 vercel.json 的 SPA 回退）
  const _catSlug=(n)=>String(n).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const _slugToCat=(s)=>{ var f=(DATA.categories||[]).find(c=>_catSlug(c.name)===s); return f?f.name:null; };
  const routeFromPath=()=>{ try{
    var p=location.pathname.replace(/\/+$/,""); var m;
    if(!p||p==="/") return {name:"home"};
    if((m=p.match(/^\/robots\/([^\/]+)$/))&&DATA.byId[m[1]]) return {name:"detail",id:m[1]};
    if(p==="/robots") return {name:"catalog",cat:null};
    if((m=p.match(/^\/c\/([^\/]+)$/))){ var cn=_slugToCat(m[1]); if(cn) return {name:"catalog",cat:cn}; }
    if(p==="/search") return {name:"catalog",cat:null,search:(new URLSearchParams(location.search).get("q")||"")};
    if(p==="/news") return {name:"news"};
    if(p==="/guides") return {name:"guides"};
    if((m=p.match(/^\/guides\/([^\/]+)$/))&&DATA.postById[m[1]]) return {name:"post",slug:m[1]};
    if((m=p.match(/^\/p\/([^\/]+)$/))&&PAGES[m[1]]) return {name:"page",key:m[1]};
    if(p==="/compare") return {name:"compare"};
  }catch(e){} return {name:"home"}; };
  const [view,setView]=React.useState(routeFromPath());
  const [compare,setCompare]=React.useState(new Set());
  const [query,setQuery]=React.useState("");
  const [lead,setLead]=React.useState(null);
  const openQuote=(name)=>setLead(name);
  // 浏览器前进/后退：每次切页 pushState；按后退键 popstate 时恢复到上一页（不再跳出到 Google）
  const nav=(v)=>{setView(v);try{
    var u="/";
    if(v.name==="detail") u="/robots/"+v.id+"/";
    else if(v.name==="catalog") u=v.search?("/search?q="+encodeURIComponent(v.search)):(v.cat?("/c/"+_catSlug(v.cat)):"/robots");
    else if(v.name==="news") u="/news";
    else if(v.name==="guides") u="/guides";
    else if(v.name==="post") u="/guides/"+v.slug+"/";
    else if(v.name==="page") u="/p/"+v.key;
    else if(v.name==="compare") u="/compare";
    window.history.pushState({rcView:v},"",u);
  }catch(e){}window.scrollTo(0,0);};
  React.useEffect(()=>{
    try{window.history.replaceState({rcView:routeFromPath()},"");}catch(e){}
    const onPop=(e)=>{const v=(e.state&&e.state.rcView)||routeFromPath();setView(v);window.scrollTo(0,0);};
    window.addEventListener("popstate",onPop);
    return ()=>window.removeEventListener("popstate",onPop);
  },[]);
  const onAdd=(id)=>setCompare((c)=>{
    const n=new Set(c);
    if(n.has(id)){n.delete(id);return n;}
    if(n.size>=4){alert("You can compare up to 4 robots at once.");return n;}
    const cat=DATA.byId[id].cat;
    if([...n].some(x=>DATA.byId[x].cat!==cat)){
      alert("Compare works within one category only — different categories are scored on different axes. Clear your current selection first to compare another category.");
      return n;
    }
    n.add(id);return n;
  });
  const goHome=()=>nav({name:"home"});
  const openCategory=(cat)=>nav({name:"catalog",cat});
  const openGuides=()=>nav({name:"guides"});
  const openPost=(slug)=>nav({name:"post",slug});
  const onSearchGo=(q)=>{ if(q&&q.trim()) nav({name:"catalog",cat:null,search:q.trim()}); };
  const open=(id)=>{const r=DATA.byId[id];try{window.rcLog&&window.rcLog(r&&r.name,r&&r.cat,"view");}catch(e){}nav({name:"detail",id});};
  const openPage=(key)=>nav({name:"page",key});
  const onCompare=()=>{if(compare.size===0){alert("Add robots with the ＋ on any card (up to 4, same category) to compare.");return;}nav({name:"compare"});};
  const onNews=()=>alert("Robot News (demo) — curated headlines refresh periodically.");
  const onNav=(it)=>{if(it==="Home")goHome();else if(it==="Robots")openCategory(null);else if(it==="News")nav({name:"news"});else if(it==="Guides")openGuides();else alert(it+" — coming soon.");};
  const Header=window.RCHeader;
  return (
    <div className="rc-app">
      <Header nav={view.name==="home"?"Home":(view.name==="guides"||view.name==="post")?"Guides":view.name==="news"?"News":"Robots"} compareCount={compare.size} onHome={goHome} onNav={onNav} onCompare={onCompare} onSearch={setQuery} onSearchGo={onSearchGo} query={query} onCategory={openCategory} />
      {view.name==="home" && <window.RCHome onOpenCategory={openCategory} onOpen={open} onAdd={onAdd} compare={compare} onNews={onNews} onQuote={openQuote} onOpenGuides={openGuides} onOpenPost={openPost} />}
      {view.name==="catalog" && <window.RCCatalog key={(view.cat||"")+"|"+(view.search||"")} initialCat={view.cat} search={view.search} onOpen={open} onAdd={onAdd} compare={compare} onQuote={openQuote} />}
      {view.name==="detail" && <window.RCDetail robot={DATA.byId[view.id]} onBack={()=>openCategory(DATA.byId[view.id].cat)} onAdd={onAdd} compare={compare} onQuote={openQuote} />}
      {lead && <LeadModal product={lead} onClose={()=>setLead(null)} />}
      {view.name==="page" && <PageView page={PAGES[view.key]} onHome={goHome} />}
      {view.name==="compare" && <CompareView ids={[...compare]} onOpen={open} onBack={goHome} onRemove={onAdd} />}
      {view.name==="news" && <NewsView onBack={goHome} />}
      {view.name==="guides" && <GuidesView onBack={goHome} onOpenPost={openPost} />}
      {view.name==="post" && <PostView post={DATA.postById[view.slug]} onBack={openGuides} />}
      <footer className="rc-ft">
        <div className="rc-ft__cols">
          <div className="rc-ft__col">
            <h4>Company</h4>
            <a onClick={()=>openPage("about")}>About Roboclan</a>
            <a onClick={()=>openPage("score")}>How We Score</a>
            <a onClick={()=>alert("Advertise With Us — coming soon.")}>Advertise With Us</a>
            <a href="mailto:hello@roboclan.ai">Contact</a>
          </div>
          <div className="rc-ft__col">
            <h4>Explore</h4>
            <a onClick={()=>openCategory(null)}>All Robots</a>
            <a onClick={()=>openCategory(null)}>Rankings</a>
            <a onClick={()=>alert("Buying guides — coming soon.")}>Buying Guides</a>
            <a onClick={onNews}>Robot News</a>
          </div>
          <div className="rc-ft__col">
            <h4>Top Brands</h4>
            {["Roborock","Dreame","Ecovacs","Eufy","Narwal","iRobot"].map((b)=>(
              <a key={b} onClick={()=>openCategory(null)}>{b}</a>
            ))}
          </div>
          <div className="rc-ft__col">
            <h4>Categories</h4>
            {DATA.categories.map((c)=>(
              <a key={c.name} onClick={()=>openCategory(c.name)}>{c.name}</a>
            ))}
          </div>
          <div className="rc-ft__col">
            <h4>Support</h4>
            <a href="mailto:hello@roboclan.ai">Help Center</a>
            <a onClick={()=>openPage("terms")}>Terms of Service</a>
            <a onClick={()=>openPage("privacy")}>Privacy Policy</a>
            <a onClick={()=>openPage("affiliate")}>Affiliate Disclosure</a>
          </div>
        </div>
        <div className="rc-ft__bar">
          <span className="rc-ft__sig"><span className="rc-ft__word">Roboclan</span><span>© 2026 · All rights reserved.</span></span>
          <span className="rc-ft__dis">Every robot is rated on its official specs across five categories, each scored out of 5. Value scores are based on each product's original launch price (US MSRP), kept fixed so ratings stay consistent over time — live retail prices and promotions change, so check the retailer for the latest price before buying. Some links on Roboclan are affiliate links, and Roboclan may earn a commission on qualifying purchases made through our retail and brand partners, including as an Amazon Associate. This never affects our ratings.</span>
        </div>
      </footer>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
'''

HTML = """<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
__SEOHEAD__
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;450;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=6">
<link rel="icon" type="image/png" href="/favicon.png?v=6">
<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=6">
<style>
""" + css + """
</style>
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>""" + bundle + """</script>
<script>""" + DATA_JS + """</script>
<script type="text/babel" data-presets="react">""" + header + """</script>
<script type="text/babel" data-presets="react">""" + home + """</script>
<script type="text/babel" data-presets="react">""" + catalog + """</script>
<script type="text/babel" data-presets="react">""" + detail + """</script>
</head>
<body>
<div id="root"></div>
<script type="text/babel" data-presets="react">""" + APP + """</script>
<script>
/* Roboclan · Supabase 统计（浏览/点击 → 你的 dashboard 看板）。复用你现有 anon 公钥。*/
(function(){
  var SB_URL='https://vthiulsykmdnatwoqdat.supabase.co';
  var SB_ANON='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aGl1bHN5a21kbmF0d29xZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExOTM4NzksImV4cCI6MjA5Njc2OTg3OX0.TOHjT3wswV8F3juerFSci-OAa0Gz66nlbBQh7DwXdug';
  var SID=(function(){try{var s=localStorage.getItem('rc_sid');if(!s){s=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('rc_sid',s);}return s;}catch(e){return 'anon';}})();
  try{ if(window.supabase){ window._sb=window.supabase.createClient(SB_URL,SB_ANON);
    window._sb.from('clicks').insert({kind:'pageview',session:SID}); } }catch(e){}
  // 记录产品卡/详情页上的点击（打开产品 = 兴趣信号；以后接联盟链接时同一处记 outbound）
  window.rcLog=function(name,cat,kind){ try{ window._sb&&window._sb.from('clicks').insert({robot_name:name||null,category:cat||null,kind:kind||'click',session:SID}); }catch(e){} };
})();
</script>
</body>
</html>"""

# ============== SEO：每页独立 <head>（title/描述/canonical/OG）==============
import html as _html
SITE = "https://www.roboclan.ai"   # canonical 用带 www 的最终域名
def _seo_head(title, desc, canonical, ogimg, ogtype="website"):
    t=_html.escape(title); d=_html.escape((desc or "").replace("\n"," ")[:157]); img=_html.escape(ogimg)
    return ("<title>"+t+"</title>\n"
      '<meta name="description" content="'+d+'">\n'
      '<link rel="canonical" href="'+canonical+'">\n'
      '<meta name="robots" content="index,follow">\n'
      '<meta property="og:type" content="'+ogtype+'">\n'
      '<meta property="og:site_name" content="Roboclan">\n'
      '<meta property="og:title" content="'+t+'">\n'
      '<meta property="og:description" content="'+d+'">\n'
      '<meta property="og:url" content="'+canonical+'">\n'
      '<meta property="og:image" content="'+img+'">\n'
      '<meta name="twitter:card" content="summary_large_image">')
def _prod_desc(r):
    if r.get("verdict"): return r["verdict"]
    cs=", ".join([str(s[0])+" "+str(s[1]) for s in (r.get("cardSpecs") or [])[:3]])
    return (r["name"]+" by "+r["brand"]+" — "+r["cat"]+": specs, 1–5 radar ratings and price comparison. "+cs).strip()
def _abs_img(u):
    if not u: return SITE+"/apple-touch-icon.png"
    if u.startswith("/"): return SITE+u
    return u
_HOME_HEAD=_seo_head("Roboclan · Every robot, compared",
    "Roboclan — every robot, compared. Specs, 1–5 radar ratings and price tracking across robot vacuums, mowers, pool cleaners, humanoids, quadrupeds and commercial robots.",
    SITE+"/", SITE+"/apple-touch-icon.png")
HTML_INDEX = HTML.replace("__SEOHEAD__", _HOME_HEAD)

# 输出路径：默认写到 05_原型/；传 --out <路径> 时改写到指定文件（云端发布用）。
_out_arg=None
for _i,_a in enumerate(sys.argv):
    if _a=="--out" and _i+1<len(sys.argv): _out_arg=sys.argv[_i+1]
    elif _a.startswith("--out="): _out_arg=_a.split("=",1)[1]
if _out_arg:
    op=_out_arg if os.path.isabs(_out_arg) else os.path.join(os.getcwd(),_out_arg)
    _d=os.path.dirname(op)
    if _d and not os.path.isdir(_d): os.makedirs(_d,exist_ok=True)
else:
    op=os.path.join(HERE, "..", "05_原型", "Roboclan重设计_v2.html")
open(op,"w",encoding="utf-8").write(HTML_INDEX)
print("写出:",len(HTML_INDEX),"bytes →",op)
print("机器人数:",len(out),"前3:",[(x['name'],x['score']) for x in out[:3]])

# 部署构建（有 --out）时：为每个产品生成独立 URL 页 /robots/<slug>/ + sitemap.xml + robots.txt
if _out_arg:
    _base=os.path.dirname(op); _urls=[SITE+"/"]
    for r in out:
        slug=r["id"]; canon=SITE+"/robots/"+slug+"/"
        head=_seo_head(r["name"]+" — Specs, Ratings & Price | Roboclan", _prod_desc(r), canon, _abs_img(r.get("image")), "product")
        page=HTML.replace("__SEOHEAD__", head)
        _pd=os.path.join(_base,"robots",slug); os.makedirs(_pd,exist_ok=True)
        open(os.path.join(_pd,"index.html"),"w",encoding="utf-8").write(page)
        _urls.append(canon)
    # 导购/博客文章独立页 /guides/<slug>/（SEO），+ /guides 列表页
    for _pst in POSTS:
        _ps=_pst.get("id");
        if not _ps: continue
        _pc=SITE+"/guides/"+_ps+"/"
        _phead=_seo_head((_pst.get("title") or "Guide")+" | Roboclan", (_pst.get("excerpt") or _pst.get("title") or ""), _pc, _abs_img(_pst.get("cover_image")), "article")
        _ppage=HTML.replace("__SEOHEAD__", _phead)
        _pdir=os.path.join(_base,"guides",_ps); os.makedirs(_pdir,exist_ok=True)
        open(os.path.join(_pdir,"index.html"),"w",encoding="utf-8").write(_ppage)
        _urls.append(_pc)
    if POSTS:
        _ghead=_seo_head("Guides — Robot Buying Guides & Comparisons | Roboclan","Buying guides, brand comparisons and head-to-head robot breakdowns, every model scored on the same 5-axis framework.",SITE+"/guides/",SITE+"/apple-touch-icon.png")
        _gdir=os.path.join(_base,"guides"); os.makedirs(_gdir,exist_ok=True)
        open(os.path.join(_gdir,"index.html"),"w",encoding="utf-8").write(HTML.replace("__SEOHEAD__",_ghead))
        _urls.insert(1, SITE+"/guides/")
    _sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for _u in _urls: _sm+="<url><loc>"+_u+"</loc></url>\n"
    _sm+="</urlset>\n"
    open(os.path.join(_base,"sitemap.xml"),"w",encoding="utf-8").write(_sm)
    open(os.path.join(_base,"robots.txt"),"w",encoding="utf-8").write("User-agent: *\nAllow: /\nSitemap: "+SITE+"/sitemap.xml\n")
    # SPA 回退：未知路由（非 /robots/、/guides/ 静态页、非带扩展名的文件）交给 index.html 客户端路由。
    _vj = json.dumps({"rewrites":[{"source":"/((?!robots/|guides/|.*\\.).*)","destination":"/index.html"}]}, indent=2)
    open(os.path.join(_base,"vercel.json"),"w",encoding="utf-8").write(_vj+"\n")
    print("生成产品页:",len(out)," 文章页:",len(POSTS)," + sitemap + robots.txt + vercel.json")

# ============== 自检关卡（每次生成后自动运行）==============
def verify(html):
    errs=[]; warns=[]
    # 1) <style> 段：注释闭合 + 花括号配平
    st=html.find("<style>"); en=html.find("</style>")
    style_css=html[st+7:en] if st>=0 and en>=0 else ""
    if style_css.count("/*")!=style_css.count("*/"):
        errs.append("<style> 内注释不闭合：/* x%d  */ x%d"%(style_css.count("/*"),style_css.count("*/")))
    # 去掉成对注释后不应还有悬空 /*（会吞掉后续 CSS）
    no_comments=re.sub(r'/\*.*?\*/','',style_css,flags=re.S)
    if "/*" in no_comments:
        errs.append("<style> 内有未闭合注释，会吞掉后面的 CSS")
    if style_css.count("{")!=style_css.count("}"):
        errs.append("<style> 花括号不配平：{ x%d  } x%d"%(style_css.count("{"),style_css.count("}")))
    # 2) markup 里用到的 class，CSS（<style> 或 bundle/kit 注入）里是否有定义
    used=set(re.findall(r'className="([^"]+)"',html))
    used={c for grp in used for c in grp.split()}
    all_css=html  # bundle/kit 的 inject() CSS 也在 html 文本里
    for cls in sorted(used):
        if ("."+cls+"{" not in all_css) and ("."+cls+" " not in all_css) and ("."+cls+":" not in all_css) and ("."+cls+"," not in all_css):
            warns.append("class .%s 在 markup 用到但没找到样式定义"%cls)
    # 3) 关键依赖脚本存在
    for must in ["react.production.min.js","babel","window.ROBOCLAN_DATA","window.RCHome","ReactDOM.createRoot"]:
        if must not in html: errs.append("缺少关键依赖/入口：%s"%must)
    # 4) 数据完整性：每款必备字段（score 不再必备——无总分品类 score=null 合法）
    need=["id","name","brand","cat","radar"]
    for r in out:
        miss=[k for k in need if k not in r or r[k] in (None,"")]
        if miss: errs.append("数据缺字段 %s：%s"%(r.get("name","?"),miss)); break
    return errs,warns

errs,warns=verify(HTML)
print("\n===== 自检 =====")
if errs:
    print("❌ 错误（必须修）：")
    for e in errs: print("   -",e)
else:
    print("✅ 通过：注释闭合、花括号配平、关键 class 有样式、入口脚本齐全、数据字段完整")
if warns:
    print("⚠️ 提醒：")
    for w in warns[:12]: print("   -",w)
import sys
sys.exit(1 if errs else 0)
