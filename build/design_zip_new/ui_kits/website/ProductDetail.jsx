/* Roboclan website — Product detail (the centerpiece). Shared via window.RCDetail. */
(function () {
  const { GlassCard, Radar, ScoreBadge, StatReadout, SpecRow, PriceRow, Tag, Badge, Button } = window.RoboclanDesignSystem_0955a0;
  const DATA = window.ROBOCLAN_DATA;

  // Non-breaking hyphen so words like "self-clean" / "third-party" never split.
  const nbHyph = (s) => String(s).replace(/-/g, "‑");

  // "2 in threshold" 里的 in(英寸)易被误读 → 任何"数字 + in + 英文词"统一成连字符("2‑in threshold")
  // 通用规则，未来新标签也自动处理；in 后面若是数字(如"5 in 1")则不动。
  const tidyTag = (t) => String(t).replace(/(\d[\d.,]*)\s+in\s+(?=[A-Za-z])/g, "$1‑in ");

  // 名字下的标签 = 每根雷达轴对应的真实数据值（如 "Suction 35,000 Pa"）
  const AXIS_ALIAS = {
    "Suction": ["suction"], "Runtime": ["runtime", "battery life", "battery"],
    "Threshold": ["obstacle crossing", "obstacle", "threshold"], "Mop-lift": ["mop lift", "mop-lift"],
    "Payload": ["payload", "max payload", "cabin payload"], "Speed": ["speed"],
    "DOF": ["total dof", "dof"], "Battery": ["battery", "runtime", "battery life"],
    "Cut": ["cut width", "cut"], "Cut width": ["cut width"], "Slope": ["max slope", "slope"],
    "Cleaning": ["coverage", "cleaning", "clean water"], "Capacity": ["basket", "capacity", "dustbin"],
    "Filtration": ["filtration", "filter"], "Mobility": ["max speed", "speed"],
    "Autonomy": ["navigation", "autonomy", "mapping"], "Efficiency": ["coverage", "throughput", "speed"],
    "Intelligence": ["compute", "sensing", "ai"]
  };
  function specVal(r, keys) {
    const rows = [].concat(r.specs || [], r.cardSpecs || [], r.info || []);
    for (const key of keys) {
      const hit = rows.find((row) => Array.isArray(row) && String(row[0]).toLowerCase().includes(key));
      if (hit) return String(hit[1]);
    }
    return null;
  }
  function radarTags(r) {
    const ax = r.axes || DATA.axes[r.cat] || [];
    const out = [];
    ax.forEach((a) => {
      if (a === "Value") return;                       // 性价比无实测值，跳过
      const v = specVal(r, AXIS_ALIAS[a] || [a.toLowerCase()]);
      if (v) out.push(a + " " + v);
    });
    return out;
  }

  // Title-case feature phrases: capitalize each word, but leave units,
  // acronyms and product names (anything already containing an uppercase
  // letter, or a known unit token) untouched.
  const UNITS = new Set(["in", "ft", "qt", "oz", "fl", "lb", "mph", "sq", "rpm",
    "min", "mins", "day", "days", "month", "months", "hour", "hours", "h", "hr",
    "mm", "cm", "m", "s", "mah", "pa", "aw", "v", "w", "g", "kg", "ml", "l", "dpi"]);
  function capWord(w) {
    if (/[A-Z]/.test(w)) return w;                 // acronym / product name
    if (!/[a-z]/.test(w)) return w;                // numbers / symbols only
    if (UNITS.has(w.toLowerCase().replace(/[^a-z]/g, ""))) return w;  // unit
    return w.replace(/(^|[-\/(])([a-z])/g, (m, pre, c) => pre + c.toUpperCase());
  }
  function titleCase(s) {
    return String(s).split(" ").map(capWord).join(" ");
  }

  let injected = false;
  function inject() {
    if (injected) return; injected = true;
    const s = document.createElement("style");
    s.textContent = `
    .rc-dt{max-width:var(--container);margin:0 auto;padding:24px 24px 96px;}
    .rc-dt__back{display:inline-flex;align-items:center;gap:7px;font-size:13.5px;color:var(--text-2);cursor:pointer;margin-bottom:22px;}
    .rc-dt__back:hover{color:var(--text-1);}
    .rc-dt__top{display:grid;grid-template-columns:300px 1fr;gap:28px;align-items:stretch;}
    .rc-dt__hero{position:relative;display:grid;place-items:center;min-height:280px;overflow:hidden;}
    /* 有图时整块 hero 铺成白底（和卡片一致），产品居中充满 */
    .rc-dt__hero:has(.rc-dt__img){background:#ffffff;}
    .rc-dt__heroglow{position:absolute;width:280px;height:280px;border-radius:50%;filter:blur(50px);opacity:.5;}
    .rc-dt__emoji{position:relative;font-size:120px;filter:drop-shadow(0 16px 40px rgba(0,0,0,.6));}
    .rc-dt__img{position:relative;z-index:1;width:100%;height:100%;max-height:320px;object-fit:contain;padding:26px;box-sizing:border-box;}
    .rc-dt__hero:has(.rc-dt__img) .rc-dt__heroglow{display:none;}
    /* 品类 tag：实心深底 + 品类色文字，白底/深底上都清晰 */
    .rc-dt__catpill{position:absolute;top:14px;left:14px;z-index:2;font-family:var(--font-mono);font-size:11px;
      letter-spacing:.08em;text-transform:uppercase;padding:5px 11px;border-radius:var(--r-pill);
      background:#12141b;border:1px solid rgba(255,255,255,.12);}
    .rc-dt__catpill{position:absolute;top:14px;left:14px;}
    .rc-dt__info{display:flex;flex-direction:column;justify-content:center;}
    .rc-dt__brand{font-family:var(--font-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-3);}
    .rc-dt__name{font-family:var(--font-display);font-weight:600;font-size:42px;letter-spacing:-.03em;margin:6px 0 12px;line-height:1.05;}
    .rc-dt__tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;}
    .rc-dt__priced{display:flex;align-items:flex-end;gap:26px;flex-wrap:wrap;margin-top:4px;}
    .rc-dt__pricebox{display:flex;flex-direction:column;gap:6px;}
    .rc-dt__best{font-family:var(--font-mono);font-size:13px;color:var(--success);}
    .rc-dt__best b{color:var(--success);}
    .rc-dt__speccard{margin-top:18px;}
    .rc-dt__panels{display:grid;grid-template-columns:.85fr 1.15fr;gap:18px;margin-top:18px;align-items:start;}
    .rc-dt__radarwrap{display:flex;flex-direction:column;align-items:center;gap:6px;}
    .rc-dt__seclbl{font-family:var(--font-display);font-weight:600;font-size:18px;letter-spacing:-.01em;color:var(--text-1);margin:0 0 16px;}
    .rc-dt__chips{display:flex;gap:10px;flex-wrap:wrap;}
    .rc-dt__chip{flex:1;min-width:150px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-1);border:1px solid var(--line);}
    .rc-dt__chip .rc-stat__v{font-size:16px;line-height:1.3;overflow-wrap:break-word;word-break:normal;hyphens:none;}
    .rc-dt__verdict{margin-top:18px;}
    .rc-dt__verdict p{font-size:15.5px;color:var(--text-2);line-height:1.6;margin:0;}
    .rc-dt__pc{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px;}
    .rc-dt__pccol h4{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 10px;}
    .rc-dt__pccol.pro h4{color:var(--success);} .rc-dt__pccol.con h4{color:var(--danger);}
    .rc-dt__pcli{display:flex;gap:9px;align-items:flex-start;font-size:14px;color:var(--text-2);margin:8px 0;line-height:1.4;}
    .rc-dt__pcli .m{flex-shrink:0;margin-top:1px;}
    .rc-dt__pcli .m.p{color:var(--success);} .rc-dt__pcli .m.c{color:var(--danger);}
    .rc-dt .rc-radar__axislabel{fill:var(--text-1);}
    /* 规格：整齐的"标签 | 值"表格，一行一条、带分隔线、更大字号，不再左右交错显得乱 */
    .rc-dt__specgrid{display:flex;flex-direction:column;}
    .rc-sc{display:flex;gap:18px;align-items:baseline;padding:12px 0;border-top:1px solid var(--line);min-width:0;}
    .rc-sc:first-child{border-top:none;}
    .rc-sc__k{flex:0 0 33%;font-family:var(--font-body);font-size:14.5px;color:var(--text-3);}
    .rc-sc__chips{flex:1;display:flex;flex-wrap:wrap;gap:8px;min-width:0;}
    .rc-feat__chip{display:inline-block;padding:6px 12px;border-radius:8px;background:var(--surface-2);border:1px solid var(--line);font-family:var(--font-mono);font-size:14px;color:var(--text-1);line-height:1.45;hyphens:none;overflow-wrap:break-word;}
    @media(max-width:560px){.rc-sc{flex-direction:column;gap:7px;}.rc-sc__k{flex:none;}}
    .rc-dt__prices{display:flex;flex-direction:column;gap:8px;}
    .rc-dt__note{font-size:12px;color:var(--text-3);margin-top:14px;line-height:1.5;}
    .rc-dt__cols{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px;align-items:start;}
    @media(max-width:860px){.rc-dt__top{grid-template-columns:1fr}.rc-dt__panels,.rc-dt__cols,.rc-dt__pc,.rc-dt__specgrid{grid-template-columns:1fr}.rc-dt__name{font-size:32px}}
    `;
    document.head.appendChild(s);
  }

  function Detail({ robot, onBack, onAdd, compare, onQuote }) {
    inject();
    const r = robot; const glow = DATA.glow[r.cat]; const axes = r.axes || DATA.axes[r.cat];
    const added = compare.has(r.id);
    const isQuote = /quote|contact/i.test(r.price || "");
    // 多商家价格 → 最优价（含商家、价格、链接）
    const _pr = (r.prices || []).map((row) => Array.isArray(row)
      ? { ch: row[0], p: row[1], best: row[2], url: row[3] }
      : { ch: row.retailer || row.channel || row.ch, p: row.price || row.p, best: row.best, url: row.url });
    const bestEntry = _pr.find((x) => x.best) || _pr[0] || null;
    const bestUrl = (_pr.find((x) => x.best && x.url) || _pr.find((x) => x.url) || {}).url || null;
    return (
      <div className="rc-dt">
        <span className="rc-dt__back" onClick={onBack}>‹ Back to catalog</span>

        <div className="rc-dt__top">
          <GlassCard padded={false} className="rc-dt__hero">
            <span className="rc-dt__heroglow" style={{ background: glow }} />
            {r.image
              ? <img className="rc-dt__img" src={r.image} alt={r.name} loading="lazy" />
              : <span className="rc-dt__emoji">{r.emoji}</span>}
          </GlassCard>
          <div className="rc-dt__info">
            <div className="rc-dt__brand">{r.brand}</div>
            <h1 className="rc-dt__name">{r.name}</h1>
            <div className="rc-dt__tags">{radarTags(r).map((t) => <Tag key={t} style={{ color: "#F5B14C", background: "rgba(245,177,76,.13)", borderColor: "rgba(245,177,76,.38)" }}>{tidyTag(t)}</Tag>)}</div>
            <div className="rc-dt__priced">
              {isQuote
                ? <span className="rc-dt__quotelbl">Priced by quote</span>
                : <div className="rc-dt__pricebox">
                    <StatReadout label={r.priceFrom ? "From" : "Launch MSRP"} value={r.price} accent size="lg" />
                    {bestEntry && bestEntry.p && String(bestEntry.p) !== String(r.price) &&
                      <span className="rc-dt__best">Best: <b>{bestEntry.p}</b>{bestEntry.ch ? " · " + bestEntry.ch : ""}</span>}
                  </div>}
              <div style={{ marginLeft: "auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
                {isQuote
                  ? <Button variant="primary" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", boxShadow: "0 0 16px rgba(34,197,94,.55)" }} onClick={() => onQuote && onQuote(r.name)}>Contact ↗</Button>
                  : <Button variant="primary" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", boxShadow: "0 0 16px rgba(34,197,94,.55)" }} onClick={() => { try { window.rcLog && window.rcLog(r.name, r.cat, "outbound"); } catch (e) {} if (bestUrl) window.open(bestUrl, "_blank", "noopener"); }}>{bestUrl ? "View deal ↗" : "View deal"}</Button>}
                <Button variant={added ? "secondary" : "primary"} style={{ boxShadow: added ? "none" : "0 0 16px rgba(110,139,255,.45)" }} onClick={() => onAdd(r.id)}>{added ? "✓ In compare" : "＋ Add to compare"}</Button>
              </div>
            </div>
            {!isQuote && r.prices && r.prices.length > 0 &&
              <p className="rc-dt__note" style={{ marginTop: 10 }}>Price shown for reference — check the retailer for the current price. As an Amazon Associate, Roboclan earns from qualifying purchases.</p>}
          </div>
        </div>

        <div className="rc-dt__panels">
          <GlassCard inset>
            <p className="rc-dt__seclbl">Ratings · 5-axis</p>
            <div className="rc-dt__radarwrap">
              <Radar values={r.radar} labels={axes} max={5} size={240} />
            </div>
          </GlassCard>
          <GlassCard>
            <p className="rc-dt__seclbl">Features &amp; Specs</p>
            <div className="rc-dt__specgrid">
              {r.specs.map(([k, v], i) => {
                const parts = String(v).split(/ · | — /).map((p) => p.trim()).filter(Boolean);
                return (
                  <div className="rc-sc" key={i}>
                    <span className="rc-sc__k">{k}</span>
                    <div className="rc-sc__chips">
                      {parts.map((p, j) => <span className="rc-feat__chip" key={j}>{nbHyph(titleCase(p))}</span>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }
  window.RCDetail = Detail;
})();
