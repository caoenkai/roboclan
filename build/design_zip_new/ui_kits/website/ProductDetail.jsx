/* Roboclan website — Product detail (the centerpiece). Shared via window.RCDetail. */
(function () {
  const { GlassCard, Radar, ScoreBadge, StatReadout, SpecRow, PriceRow, Tag, Badge, Button } = window.RoboclanDesignSystem_0955a0;
  const DATA = window.ROBOCLAN_DATA;

  // Non-breaking hyphen so words like "self-clean" / "third-party" never split.
  const nbHyph = (s) => String(s).replace(/-/g, "‑");

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
    .rc-dt__heroglow{position:absolute;width:280px;height:280px;border-radius:50%;filter:blur(50px);opacity:.5;}
    .rc-dt__emoji{position:relative;font-size:120px;filter:drop-shadow(0 16px 40px rgba(0,0,0,.6));}
    .rc-dt__img{position:relative;z-index:1;max-width:90%;max-height:250px;object-fit:contain;border-radius:12px;filter:drop-shadow(0 16px 40px rgba(0,0,0,.55));}
    .rc-dt__hero:has(.rc-dt__img) .rc-dt__heroglow{display:none;}
    .rc-dt__catpill{position:absolute;top:14px;left:14px;}
    .rc-dt__info{display:flex;flex-direction:column;justify-content:center;}
    .rc-dt__brand{font-family:var(--font-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-3);}
    .rc-dt__name{font-family:var(--font-display);font-weight:600;font-size:42px;letter-spacing:-.03em;margin:6px 0 12px;line-height:1.05;}
    .rc-dt__tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;}
    .rc-dt__priced{display:flex;align-items:flex-end;gap:26px;flex-wrap:wrap;margin-top:4px;}
    .rc-dt__panels{display:grid;grid-template-columns:1.1fr .9fr;gap:18px;margin-top:18px;}
    .rc-dt__radarwrap{display:flex;flex-direction:column;align-items:center;gap:6px;}
    .rc-dt__seclbl{font-family:var(--font-mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--text-3);margin:0 0 14px;}
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
    /* Unified spec cell: label on top, value(s) as boxed chips (consistent everywhere). */
    .rc-dt__specgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px 24px;align-items:start;}
    .rc-sc{display:flex;flex-direction:column;gap:7px;min-width:0;}
    .rc-sc--full{grid-column:1/-1;}
    .rc-sc__k{font-family:var(--font-body);font-size:13px;color:var(--text-3);}
    .rc-sc__chips{display:flex;flex-wrap:wrap;gap:7px;}
    .rc-feat__chip{display:inline-block;padding:5px 11px;border-radius:8px;background:var(--surface-2);border:1px solid var(--line);font-family:var(--font-mono);font-size:12.5px;color:var(--text-1);line-height:1.4;hyphens:none;overflow-wrap:break-word;}
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
    return (
      <div className="rc-dt">
        <span className="rc-dt__back" onClick={onBack}>‹ Back to catalog</span>

        <div className="rc-dt__top">
          <GlassCard padded={false} className="rc-dt__hero">
            <span className="rc-dt__heroglow" style={{ background: glow }} />
            <span className="rc-dt__catpill"><Badge tone="neutral">{r.cat}</Badge></span>
            {r.image
              ? <img className="rc-dt__img" src={r.image} alt={r.name} loading="lazy" />
              : <span className="rc-dt__emoji">{r.emoji}</span>}
          </GlassCard>
          <div className="rc-dt__info">
            <div className="rc-dt__brand">{r.brand}</div>
            <h1 className="rc-dt__name">{r.name}</h1>
            <div className="rc-dt__tags">{(r.highlights || []).map((t) => <Tag key={"hl-" + t} style={{ color: "#F5B14C", background: "rgba(245,177,76,.13)", borderColor: "rgba(245,177,76,.38)" }}>{t}</Tag>)}{r.tags.map((t) => <Tag key={t} style={{ color: "#F5B14C", background: "rgba(245,177,76,.13)", borderColor: "rgba(245,177,76,.38)" }}>{t}</Tag>)}</div>
            <div className="rc-dt__priced">
              {isQuote
                ? <span className="rc-dt__quotelbl">Enterprise · priced by quote</span>
                : <StatReadout label={r.priceFrom ? "From" : "Price"} value={r.price} accent size="lg" />}
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                <Button variant={added ? "secondary" : "primary"} onClick={() => onAdd(r.id)}>{added ? "✓ In compare" : "＋ Add to compare"}</Button>
                {isQuote
                  ? <Button variant="primary" onClick={() => onQuote && onQuote(r.name)}>Contact for quote</Button>
                  : <Button variant="primary" onClick={() => { try { window.rcLog && window.rcLog(r.name, r.cat, "outbound"); } catch (e) {} }}>View deal</Button>}
              </div>
            </div>
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
            <p className="rc-dt__seclbl">At a glance</p>
            <div className="rc-dt__chips">
              {r.info.map(([k, v]) => (
                <div className="rc-dt__chip" key={k}><StatReadout label={k} value={nbHyph(titleCase(v))} size="sm" /></div>
              ))}
            </div>
            <div className="rc-dt__verdict">
              <p className="rc-dt__seclbl">The verdict</p>
              <p>{r.verdict}</p>
            </div>
          </GlassCard>
        </div>

        <div className="rc-dt__pc">
          <div className="rc-dt__pccol pro"><h4>Pros</h4>{r.pros.map((p, i) => <div className="rc-dt__pcli" key={i}><span className="m p">+</span>{p}</div>)}</div>
          <div className="rc-dt__pccol con"><h4>Cons</h4>{r.cons.map((p, i) => <div className="rc-dt__pcli" key={i}><span className="m c">–</span>{p}</div>)}</div>
        </div>

        <div className="rc-dt__cols">
          <GlassCard>
            {isQuote ? (
              <div className="rc-dt__quote">
                <p className="rc-dt__seclbl">Pricing</p>
                <p className="rc-dt__quotetext">This model is sold by quote. Tell us about your use case and we’ll connect you with the manufacturer or an authorized distributor — they’ll follow up directly with pricing and availability.</p>
                <Button variant="primary" onClick={() => onQuote && onQuote(r.name)}>Contact for quote</Button>
              </div>
            ) : (
              <React.Fragment>
                <p className="rc-dt__seclbl">Compare prices</p>
                <div className="rc-dt__prices">
                  {r.prices.map(([ch, p, best], i) => (
                    <PriceRow key={i} channel={ch} price={p} best={best} ctaLabel={p.includes("/mo") ? "View plan" : "View deal"} />
                  ))}
                </div>
              </React.Fragment>
            )}
          </GlassCard>
          <GlassCard>
            <p className="rc-dt__seclbl">Features &amp; Specs</p>
            <div className="rc-dt__specgrid">
              {r.specs.map(([k, v], i) => {
                const parts = String(v).split(/ · | — /).map((p) => p.trim()).filter(Boolean);
                const full = parts.length >= 2 || String(v).length > 26;
                return (
                  <div className={"rc-sc" + (full ? " rc-sc--full" : "")} key={i}>
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
