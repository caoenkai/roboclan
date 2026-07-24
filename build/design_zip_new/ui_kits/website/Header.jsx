/* Roboclan website — sticky glass header. Shared via window.RCHeader. */
(function () {
  const { Button } = window.RoboclanDesignSystem_0955a0;

  let injected = false;
  function inject() {
    if (injected) return; injected = true;
    const s = document.createElement("style");
    s.textContent = `
    .rc-hd{position:sticky;top:0;z-index:50;background:var(--surface-solid);
      backdrop-filter:blur(var(--blur-lg));border-bottom:1px solid var(--line);}
    .rc-hd__in{max-width:var(--container);margin:0 auto;padding:0 24px;height:var(--header-h);
      display:flex;align-items:center;gap:20px;}
    .rc-hd__logo{display:flex;align-items:center;gap:11px;cursor:pointer;}
    .rc-hd__word{font-family:var(--font-display);font-weight:600;font-size:20px;letter-spacing:-.03em;color:var(--text-1);}
    .rc-hd__nav{display:flex;gap:24px;margin-left:8px;align-items:center;}
    .rc-hd__bwrap{display:inline-flex;align-items:center;}
    .rc-hd__bwrap>a .rc-hd__chev{font-size:10px;opacity:.7;}
    .rc-hd__nav a{font-size:14px;font-weight:500;color:var(--text-2);cursor:pointer;position:relative;padding:6px 0;transition:color var(--dur-fast);}
    .rc-hd__nav a:hover,.rc-hd__nav a.on{color:var(--text-1);}
    .rc-hd__nav a.on::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;border-radius:2px;background:var(--grad-accent);}
    .rc-hd__search{flex:1;max-width:380px;position:relative;margin-left:auto;}
    .rc-hd__search input{width:100%;height:38px;border-radius:var(--r-pill);border:1px solid var(--line-2);
      background:var(--surface-1);color:var(--text-1);font-family:var(--font-body);font-size:13.5px;
      padding:0 16px 0 38px;outline:none;transition:border-color var(--dur-fast),box-shadow var(--dur-fast);}
    .rc-hd__search input::placeholder{color:var(--text-3);}
    .rc-hd__search input:focus{border-color:rgba(110,139,255,.5);box-shadow:var(--glow-focus);}
    .rc-hd__search svg{position:absolute;left:13px;top:11px;color:var(--text-3);}
    .rc-hd__cmp{position:relative;}
    .rc-hd__badge{position:absolute;top:-7px;right:-7px;min-width:19px;height:19px;border-radius:10px;
      background:var(--grad-accent);color:var(--text-on-accent);font-family:var(--font-mono);font-size:11px;
      font-weight:600;display:grid;place-items:center;padding:0 5px;box-shadow:var(--glow-accent-sm);}
    /* Categories 下拉：电脑端隐藏（顶部已有导航），只在手机端显示 */
    .rc-hd__cats{position:relative;margin-left:auto;display:none;}
    .rc-hd__catsbtn{display:inline-flex;align-items:center;gap:7px;height:38px;padding:0 15px;border-radius:var(--r-pill);
      border:1px solid var(--line-2);background:var(--surface-1);color:var(--text-2);font-family:var(--font-body);
      font-size:13.5px;font-weight:500;cursor:pointer;transition:color var(--dur-fast),border-color var(--dur-fast);}
    .rc-hd__catsbtn:hover,.rc-hd__catsbtn.on{color:var(--text-1);border-color:rgba(110,139,255,.5);}
    .rc-hd__catsbtn .rc-hd__chev{font-size:10px;transition:transform var(--dur-fast);}
    .rc-hd__catsbtn.on .rc-hd__chev{transform:rotate(180deg);}
    .rc-hd__catsmenu{position:absolute;top:48px;right:0;min-width:232px;background:var(--surface-solid);
      border:1px solid var(--line);border-radius:14px;padding:8px;box-shadow:0 22px 55px rgba(0,0,0,.5);z-index:60;
      display:flex;flex-direction:column;gap:2px;}
    .rc-hd__catsmenu a{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:9px;
      font-size:14px;color:var(--text-2);cursor:pointer;transition:background var(--dur-fast),color var(--dur-fast);}
    .rc-hd__catsmenu a:hover{background:var(--surface-2);color:var(--text-1);}
    .rc-hd__catdot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
    @media(max-width:820px){.rc-hd__nav,.rc-hd__search{display:none}.rc-hd__cats{display:block;}}
    `;
    document.head.appendChild(s);
  }

  function Mark({ size = 30 }) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="rchd-g" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#5BE2FF" /><stop offset="0.52" stopColor="#6E8BFF" /><stop offset="1" stopColor="#A66BFF" />
          </linearGradient>
          <radialGradient id="rchd-n" cx="0.4" cy="0.38" r="0.7">
            <stop offset="0" stopColor="#EAF2FF" /><stop offset="0.5" stopColor="#8FA8FF" /><stop offset="1" stopColor="#6E8BFF" />
          </radialGradient>
        </defs>
        <ellipse cx="24" cy="24" rx="18" ry="8.4" transform="rotate(-28 24 24)" fill="none" stroke="url(#rchd-g)" strokeWidth="1.5" opacity="0.45" />
        <path d="M18 35 V13 H26 A6 6 0 0 1 26 25 H18 M23 25 L31 36" fill="none" stroke="url(#rchd-g)" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="36.4" cy="13.6" r="3" fill="url(#rchd-n)" />
        <circle cx="35.5" cy="12.7" r="0.9" fill="#fff" fillOpacity="0.9" />
      </svg>
    );
  }

  function Header({ nav = "Home", compareCount = 0, onHome, onCompare, onSearch, onSearchGo, query = "", onNav, onCategory }) {
    inject();
    const items = ["Home", "Robots", "Guides", "News"];
    const DATA = window.ROBOCLAN_DATA || {};
    const cats = DATA.categories || [];
    const glow = DATA.glow || {};
    const brands = DATA.brands || [];
    const [catOpen, setCatOpen] = React.useState(false);
    const [brandOpen, setBrandOpen] = React.useState(false);
    const catsRef = React.useRef(null);
    const brandsRef = React.useRef(null);
    React.useEffect(() => {
      if (!brandOpen) return;
      const onDoc = (e) => { if (brandsRef.current && !brandsRef.current.contains(e.target)) setBrandOpen(false); };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, [brandOpen]);
    // 点下拉外面任意处就关闭（之前用 onMouseLeave，移到菜单项时会误关，导致点不中）
    React.useEffect(() => {
      if (!catOpen) return;
      const onDoc = (e) => { if (catsRef.current && !catsRef.current.contains(e.target)) setCatOpen(false); };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, [catOpen]);
    const go = () => { if (onSearchGo) onSearchGo(query); };
    return (
      <header className="rc-hd">
        <div className="rc-hd__in">
          <div className="rc-hd__logo" onClick={onHome}>
            <Mark /><span className="rc-hd__word">Roboclan</span>
          </div>
          <nav className="rc-hd__nav">
            {items.map((it) => <a key={it} className={it === nav ? "on" : ""} onClick={() => onNav ? onNav(it) : onHome()}>{it}</a>)}
            {brands.length > 0 && (
              <div className="rc-hd__bwrap" ref={brandsRef} style={{ position: "relative" }}>
                <a className={brandOpen ? "on" : ""} onClick={() => setBrandOpen((o) => !o)} aria-haspopup="true" aria-expanded={brandOpen}>Brands <span className="rc-hd__chev">▾</span></a>
                {brandOpen && (
                  <div className="rc-hd__catsmenu" style={{ top: "34px", left: 0, right: "auto" }}>
                    {brands.map((b) => (
                      <a key={b.slug} href={"/brands/" + b.slug + "/"} onClick={() => setBrandOpen(false)}>
                        <span className="rc-hd__catdot" style={{ background: "var(--accent-ink)" }} />{b.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>
          <div className="rc-hd__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ cursor: "pointer" }} onClick={go}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            <input placeholder="Search robots, brands…" value={query}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") go(); }} />
          </div>
          <div className="rc-hd__cats" ref={catsRef}>
            <button className={"rc-hd__catsbtn" + (catOpen ? " on" : "")} onClick={() => setCatOpen((o) => !o)} aria-haspopup="true" aria-expanded={catOpen}>
              Categories <span className="rc-hd__chev">▾</span>
            </button>
            {catOpen && (
              <div className="rc-hd__catsmenu">
                {cats.map((c) => (
                  <a key={c.name} onClick={() => { setCatOpen(false); onCategory && onCategory(c.name); }}>
                    <span className="rc-hd__catdot" style={{ background: glow[c.name] || "var(--accent-ink)" }} />{c.name}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="rc-hd__cmp">
            <Button variant="secondary" size="sm" onClick={onCompare}>Compare</Button>
            {compareCount > 0 && <span className="rc-hd__badge">{compareCount}</span>}
          </div>
        </div>
      </header>
    );
  }

  window.RCHeader = Header;
  window.RCMark = Mark;
})();
