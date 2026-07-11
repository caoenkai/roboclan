/* Roboclan website — Category grid with filters. Shared via window.RCCatalog. */
(function () {
  const { ProductCard, Chip } = window.RoboclanDesignSystem_0955a0;
  const DATA = window.ROBOCLAN_DATA;

  let injected = false;
  function inject() {
    if (injected) return; injected = true;
    const s = document.createElement("style");
    s.textContent = `
    .rc-cat{max-width:var(--container);margin:0 auto;padding:32px 24px 80px;}
    .rc-cat__head{margin-bottom:8px;}
    .rc-cat__ey{font-family:var(--font-mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--text-3);}
    .rc-cat h1{font-family:var(--font-display);font-weight:600;font-size:34px;letter-spacing:-.025em;margin:6px 0 0;}
    .rc-cat__filters{display:flex;flex-direction:column;gap:10px;margin:22px 0 18px;}
    .rc-cat__row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
    .rc-cat__rowlbl{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-3);width:60px;}
    .rc-cat__bar{display:flex;align-items:center;gap:12px;margin:4px 0 20px;font-size:13px;color:var(--text-3);}
    .rc-cat__reset{color:var(--accent-ink);cursor:pointer;font-weight:600;}
    .rc-cat__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(252px,1fr));gap:18px;}
    .rc-cat__empty{padding:50px;color:var(--text-3);text-align:center;grid-column:1/-1;}
    `;
    document.head.appendChild(s);
  }

  function inBucket(price, b) {
    const clean = String(price).replace(/[^0-9.]/g, "");
    if (b === "Contact") return !clean;  // 询价/无公开价专档
    if (!clean) return false;            // 有价档：询价品不落入
    const n = Number(clean) || 0;
    if (b === "Under $1k") return n < 1000;
    if (b === "$1k–$3k") return n >= 1000 && n < 3000;
    if (b === "$3k–$5k") return n >= 3000 && n < 5000;
    if (b === "$5k–$15k") return n >= 5000 && n < 15000;
    return n >= 15000;                   // "$15k+"
  }

  function Catalog({ initialCat, search, initialBrand, initialPriceMin, initialPriceMax, initialTag, filterLabel, onOpen, onAdd, compare, onQuote }) {
    inject();
    const q = (search || "").toLowerCase().trim();
    const [cats, setCats] = React.useState(new Set(initialCat ? [initialCat] : []));
    const [brands, setBrands] = React.useState(new Set(initialBrand ? [initialBrand] : []));
    const [price, setPrice] = React.useState(new Set());
    // 首页矩阵带来的精确筛选：价格区间 / 用途标签
    const [pRange, setPRange] = React.useState((initialPriceMin != null || initialPriceMax != null) ? { min: initialPriceMin, max: initialPriceMax } : null);
    const [uTag, setUTag] = React.useState(initialTag || null);
    const _pnum = (p) => { const c = String(p).replace(/[^0-9.]/g, ""); return c ? Number(c) : null; };
    const inRange = (p) => { if (!pRange) return true; const n = _pnum(p); if (n == null) return false; if (pRange.min != null && n < pRange.min) return false; if (pRange.max != null && n >= pRange.max) return false; return true; };
    const tagMatch = (r) => { if (!uTag) return true; return (r.tags || []).some((t) => String(t).toLowerCase().indexOf(uTag.toLowerCase()) >= 0); };
    const buckets = ["Under $1k", "$1k–$3k", "$3k–$5k", "$5k–$15k", "$15k+", "Contact"];
    const toggle = (set, setter, v) => { const n = new Set(set); n.has(v) ? n.delete(v) : n.add(v); setter(n); };
    // Brands present in the (category-filtered) catalog, alphabetical.
    const brandList = [...new Set(DATA.robots
      .filter((r) => cats.size === 0 || cats.has(r.cat))
      .map((r) => r.brand))].sort();

    // 默认（未按品类筛选）视图跨品类轮流混排，否则前面整屏全是扫地机
    const _byCat = {};
    DATA.robots.forEach((r) => { (_byCat[r.cat] = _byCat[r.cat] || []).push(r); });
    const _catKeys = Object.keys(_byCat);
    const _mixed = [];
    for (let k = 0; ; k++) {
      let any = false;
      for (const c of _catKeys) { if (_byCat[c][k]) { _mixed.push(_byCat[c][k]); any = true; } }
      if (!any) break;
    }
    const list = _mixed.filter((r) =>
      (cats.size === 0 || cats.has(r.cat)) &&
      (brands.size === 0 || brands.has(r.brand)) &&
      (price.size === 0 || [...price].some((b) => inBucket(r.price, b))) &&
      inRange(r.price) && tagMatch(r) &&
      (!q || (r.name + " " + r.brand + " " + r.cat).toLowerCase().includes(q)));
    const active = cats.size + brands.size + price.size > 0 || pRange || uTag;

    return (
      <div className="rc-cat">
        <div className="rc-cat__head">
          <div className="rc-cat__ey">Catalog</div>
          <h1>{q ? ("Search: “" + search + "”") : (cats.size === 1 ? [...cats][0] : "All robots")}{(filterLabel && (pRange || uTag)) ? (" · " + filterLabel) : ""}</h1>
        </div>
        <div className="rc-cat__filters">
          <div className="rc-cat__row">
            <span className="rc-cat__rowlbl">Category</span>
            {DATA.categories.map((c) => (
              <Chip key={c.name} active={cats.has(c.name)} style={{ color: DATA.glow[c.name] }} onClick={() => toggle(cats, setCats, c.name)}>{c.name}</Chip>
            ))}
          </div>
          <div className="rc-cat__row">
            <span className="rc-cat__rowlbl">Brand</span>
            {brandList.map((b) => (
              <Chip key={b} active={brands.has(b)} onClick={() => toggle(brands, setBrands, b)}>{b}</Chip>
            ))}
          </div>
          <div className="rc-cat__row">
            <span className="rc-cat__rowlbl">Price</span>
            {buckets.map((b) => (
              <Chip key={b} active={price.has(b)} onClick={() => toggle(price, setPrice, b)}>{b}</Chip>
            ))}
          </div>
        </div>
        <div className="rc-cat__bar">
          <span>{list.length} robot{list.length !== 1 ? "s" : ""}</span>
          {active && <span className="rc-cat__reset" onClick={() => { setCats(new Set()); setBrands(new Set()); setPrice(new Set()); setPRange(null); setUTag(null); }}>✕ Reset filters</span>}
        </div>
        <div className="rc-cat__grid">
          {list.length === 0 && <div className="rc-cat__empty">No matches — try removing a filter.</div>}
          {list.map((r) => (
            <ProductCard key={r.id}
              name={r.name} brand={r.brand} category={r.cat} emoji={r.emoji} image={r.image}
              glow={DATA.glow[r.cat]} price={r.price} priceFrom={r.priceFrom}
              prices={r.prices} onQuote={onQuote}
              specs={r.cardSpecs} radar={r.radar} axes={r.axes || DATA.axes[r.cat]} status={r.status}
              added={compare.has(r.id)} onAdd={() => onAdd(r.id)} onOpen={() => onOpen(r.id)} />
          ))}
        </div>
      </div>
    );
  }
  window.RCCatalog = Catalog;
})();
