/* @ds-bundle: {"format":3,"namespace":"RoboclanDesignSystem_0955a0","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"GlassCard","sourcePath":"components/core/GlassCard.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Radar","sourcePath":"components/data/Radar.jsx"},{"name":"ScoreBadge","sourcePath":"components/data/ScoreBadge.jsx"},{"name":"SpecRow","sourcePath":"components/data/SpecRow.jsx"},{"name":"StatReadout","sourcePath":"components/data/StatReadout.jsx"},{"name":"PriceRow","sourcePath":"components/product/PriceRow.jsx"},{"name":"ProductCard","sourcePath":"components/product/ProductCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a2acfdcf6a58","components/core/Button.jsx":"ef0607bacf31","components/core/Chip.jsx":"6f3b788988e7","components/core/GlassCard.jsx":"8ba165c75231","components/core/IconButton.jsx":"c0179327b844","components/core/Tag.jsx":"a94d75710de0","components/data/Radar.jsx":"ae0119b565b8","components/data/ScoreBadge.jsx":"bdccdc787608","components/data/SpecRow.jsx":"fcfd722abc44","components/data/StatReadout.jsx":"350519deeb46","components/product/PriceRow.jsx":"e8e2574727c4","components/product/ProductCard.jsx":"1be94a0d663c","ui_kits/website/Catalog.jsx":"9627df24e7d2","ui_kits/website/Header.jsx":"fb962de5a1b1","ui_kits/website/Home.jsx":"c6b8028a14a8","ui_kits/website/ProductDetail.jsx":"c990e34ae761","ui_kits/website/data.js":"b696f9c7675a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RoboclanDesignSystem_0955a0 = window.RoboclanDesignSystem_0955a0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _badgeInjected = false;
function injectBadgeStyles() {
  if (_badgeInjected || typeof document === "undefined") return;
  _badgeInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);
    font-size:11px;font-weight:500;letter-spacing:.04em;line-height:1;padding:5px 10px;
    border-radius:var(--r-pill);border:1px solid;white-space:nowrap;}
  .rc-badge__dot{width:6px;height:6px;border-radius:50%;background:currentColor;}
  .rc-badge--neutral{color:var(--text-2);background:var(--surface-2);border-color:var(--line-2);}
  .rc-badge--accent{color:var(--accent-ink);background:var(--accent-soft);border-color:rgba(110,139,255,.4);}
  .rc-badge--success{color:var(--success);background:var(--success-soft);border-color:rgba(63,224,162,.4);}
  .rc-badge--warn{color:var(--warn);background:var(--warn-soft);border-color:rgba(245,177,76,.4);}
  .rc-badge--danger{color:var(--danger);background:var(--danger-soft);border-color:rgba(255,107,107,.4);}
  .rc-badge--live{color:var(--live);background:rgba(255,84,112,.13);border-color:rgba(255,84,112,.45);}
  .rc-badge--live .rc-badge__dot{animation:rc-pulse 1.6s var(--ease-in-out) infinite;}
  @keyframes rc-pulse{0%,100%{opacity:1}50%{opacity:.3}}
  `;
  document.head.appendChild(s);
}

/** Small status badge — availability, stock, "LIVE", best price, etc. */
function Badge({
  children,
  tone = "neutral",
  dot = false,
  className = "",
  ...rest
}) {
  injectBadgeStyles();
  const cls = ["rc-badge", `rc-badge--${tone}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), (dot || tone === "live") && /*#__PURE__*/React.createElement("span", {
    className: "rc-badge__dot",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component styles once. Roboclan components are self-contained and
   read every value from the design-system CSS custom properties. */
let _btnInjected = false;
function injectBtnStyles() {
  if (_btnInjected || typeof document === "undefined") return;
  _btnInjected = true;
  const s = document.createElement("style");
  s.id = "rc-button-styles";
  s.textContent = `
  .rc-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;
    font-family:var(--font-body);font-weight:600;white-space:nowrap;cursor:pointer;
    border:1px solid transparent;border-radius:var(--r-pill);overflow:hidden;
    transition:transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-med) var(--ease-out),
      background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out);
    -webkit-tap-highlight-color:transparent;}
  .rc-btn:focus-visible{outline:none;box-shadow:var(--glow-focus);}
  .rc-btn:active{transform:scale(.975);}
  .rc-btn[disabled]{opacity:.45;cursor:not-allowed;pointer-events:none;}
  .rc-btn--sm{height:34px;padding:0 14px;font-size:13px;}
  .rc-btn--md{height:42px;padding:0 20px;font-size:14.5px;}
  .rc-btn--lg{height:50px;padding:0 28px;font-size:15.5px;}
  .rc-btn--block{width:100%;}
  /* sheen */
  .rc-btn__sheen{position:absolute;inset:0;background:var(--grad-sheen);transform:translateX(-130%);
    transition:transform var(--dur-slow) var(--ease-out);pointer-events:none;}
  .rc-btn:hover .rc-btn__sheen{transform:translateX(130%);}
  /* primary */
  .rc-btn--primary{background:var(--grad-accent);color:var(--text-on-accent);
    box-shadow:var(--glow-accent-md),var(--inset-hairline);}
  .rc-btn--primary:hover{transform:var(--lift);box-shadow:0 10px 38px rgba(110,139,255,.5),0 3px 14px rgba(166,107,255,.4);}
  /* secondary (glass) */
  .rc-btn--secondary{background:var(--surface-2);color:var(--text-1);border-color:var(--line-2);
    backdrop-filter:blur(var(--blur-sm));box-shadow:var(--inset-hairline);}
  .rc-btn--secondary:hover{background:var(--surface-3);border-color:var(--line-strong);transform:var(--lift);}
  /* ghost */
  .rc-btn--ghost{background:transparent;color:var(--text-2);}
  .rc-btn--ghost:hover{background:var(--surface-1);color:var(--text-1);}
  .rc-btn__label{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px;}
  `;
  document.head.appendChild(s);
}

/**
 * Roboclan Button — primary (gradient + sheen), secondary (glass), or ghost.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  iconLeft = null,
  iconRight = null,
  disabled = false,
  className = "",
  ...rest
}) {
  injectBtnStyles();
  const cls = ["rc-btn", `rc-btn--${variant}`, `rc-btn--${size}`, block ? "rc-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled
  }, rest), variant === "primary" && /*#__PURE__*/React.createElement("span", {
    className: "rc-btn__sheen",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "rc-btn__label"
  }, iconLeft, children, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _chipInjected = false;
function injectChipStyles() {
  if (_chipInjected || typeof document === "undefined") return;
  _chipInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-chip{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-body);
    font-size:13.5px;font-weight:500;line-height:1;padding:8px 14px;cursor:pointer;
    border-radius:var(--r-pill);color:var(--text-2);background:var(--surface-2);
    border:1px solid var(--line-2);backdrop-filter:blur(var(--blur-sm));
    transition:background var(--dur-fast),border-color var(--dur-fast),color var(--dur-fast),box-shadow var(--dur-med);
    -webkit-tap-highlight-color:transparent;}
  .rc-chip:hover{border-color:var(--line-strong);color:var(--text-1);}
  .rc-chip:focus-visible{outline:none;box-shadow:var(--glow-focus);}
  .rc-chip__ic{display:inline-flex;color:var(--text-3);transition:color var(--dur-fast);}
  .rc-chip.is-on{color:var(--accent-ink);background:var(--accent-soft);border-color:rgba(110,139,255,.5);
    box-shadow:0 0 0 1px rgba(110,139,255,.25),0 4px 16px rgba(110,139,255,.18);}
  .rc-chip.is-on .rc-chip__ic{color:var(--accent-ink);}
  `;
  document.head.appendChild(s);
}

/** Toggleable filter chip (category / brand / price facets). */
function Chip({
  children,
  active = false,
  icon,
  onClick,
  className = "",
  ...rest
}) {
  injectChipStyles();
  const cls = ["rc-chip", active ? "is-on" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-pressed": active,
    onClick: onClick
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "rc-chip__ic",
    "aria-hidden": "true"
  }, icon != null ? icon : active ? "✓" : "＋"), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/GlassCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _gcInjected = false;
function injectGcStyles() {
  if (_gcInjected || typeof document === "undefined") return;
  _gcInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-card{position:relative;border-radius:var(--r-lg);background:var(--surface-2);
    border:1px solid var(--line-2);backdrop-filter:blur(var(--blur-md));
    box-shadow:var(--shadow-md),var(--inset-hairline);
    transition:transform var(--dur-med) var(--ease-out),box-shadow var(--dur-med) var(--ease-out),border-color var(--dur-med) var(--ease-out);}
  .rc-card--pad{padding:var(--sp-5);}
  .rc-card--inset{box-shadow:var(--shadow-md),var(--inset-glow);}
  .rc-card--hover{cursor:pointer;}
  .rc-card--hover:hover{transform:var(--lift);border-color:var(--line-strong);
    box-shadow:var(--shadow-lg),0 0 30px rgba(110,139,255,.10),var(--inset-hairline);}
  .rc-card--glow{border-color:rgba(110,139,255,.35);box-shadow:var(--glow-accent-md),var(--inset-glow);}
  `;
  document.head.appendChild(s);
}

/** Frosted-glass container — the base surface for cards, panels, and HUD blocks. */
function GlassCard({
  children,
  padded = true,
  hover = false,
  glow = false,
  inset = false,
  as: Tag = "div",
  className = "",
  ...rest
}) {
  injectGcStyles();
  const cls = ["rc-card", padded ? "rc-card--pad" : "", hover ? "rc-card--hover" : "", glow ? "rc-card--glow" : "", inset ? "rc-card--inset" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _ibInjected = false;
function injectIbStyles() {
  if (_ibInjected || typeof document === "undefined") return;
  _ibInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-ib{display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
    border:1px solid transparent;border-radius:var(--r-sm);color:var(--text-2);
    transition:transform var(--dur-fast) var(--ease-out),background var(--dur-fast),border-color var(--dur-fast),color var(--dur-fast),box-shadow var(--dur-med);
    -webkit-tap-highlight-color:transparent;}
  .rc-ib:focus-visible{outline:none;box-shadow:var(--glow-focus);}
  .rc-ib:active{transform:scale(.92);}
  .rc-ib[disabled]{opacity:.4;cursor:not-allowed;pointer-events:none;}
  .rc-ib--sm{width:32px;height:32px;}
  .rc-ib--md{width:38px;height:38px;}
  .rc-ib--lg{width:46px;height:46px;border-radius:var(--r-md);}
  .rc-ib--glass{background:var(--surface-2);border-color:var(--line-2);backdrop-filter:blur(var(--blur-sm));box-shadow:var(--inset-hairline);}
  .rc-ib--glass:hover{background:var(--surface-3);border-color:var(--line-strong);color:var(--text-1);}
  .rc-ib--solid{background:var(--grad-accent);color:var(--text-on-accent);box-shadow:var(--glow-accent-sm);}
  .rc-ib--solid:hover{transform:var(--lift);box-shadow:var(--glow-accent-md);}
  .rc-ib--plain{background:transparent;}
  .rc-ib--plain:hover{background:var(--surface-1);color:var(--text-1);}
  `;
  document.head.appendChild(s);
}

/** Square icon-only button — toolbar / close / compare-add affordances. */
function IconButton({
  children,
  variant = "glass",
  size = "md",
  active = false,
  label,
  className = "",
  ...rest
}) {
  injectIbStyles();
  const cls = ["rc-ib", `rc-ib--${active ? "solid" : variant}`, `rc-ib--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label,
    title: label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _tagInjected = false;
function injectTagStyles() {
  if (_tagInjected || typeof document === "undefined") return;
  _tagInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-tag{display:inline-flex;align-items:center;font-family:var(--font-body);font-size:12.5px;
    font-weight:500;line-height:1;padding:6px 11px;border-radius:var(--r-pill);
    color:var(--accent-ink);background:var(--accent-soft);border:1px solid rgba(110,139,255,.28);
    white-space:nowrap;}
  .rc-tag--muted{color:var(--text-2);background:var(--surface-2);border-color:var(--line-2);}
  `;
  document.head.appendChild(s);
}

/** Descriptive product tag — "Spec king", "No boundary wire", "Best value". */
function Tag({
  children,
  muted = false,
  className = "",
  ...rest
}) {
  injectTagStyles();
  const cls = ["rc-tag", muted ? "rc-tag--muted" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/Radar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _radarInjected = false;
function injectRadarStyles() {
  if (_radarInjected || typeof document === "undefined") return;
  _radarInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-radar{display:inline-block;overflow:visible;max-width:100%;}
  .rc-radar__data{transform-box:fill-box;transform-origin:center;
    transition:transform var(--dur-slow) var(--ease-out),opacity var(--dur-slow) var(--ease-out);}
  .rc-radar.is-init .rc-radar__data{transform:scale(.55);opacity:0;}
  .rc-radar.is-drawn .rc-radar__data{transform:scale(1);opacity:1;}
  .rc-radar__node{display:none;}
  .rc-radar.is-init .rc-radar__node{opacity:0;}
  .rc-radar.is-drawn .rc-radar__node{opacity:1;}
  .rc-radar__axislabel{font-family:var(--font-mono);font-size:11px;letter-spacing:.04em;fill:var(--text-2);}
  .rc-radar__axisval{font-family:var(--font-mono);font-size:11px;font-weight:600;fill:var(--accent-ink);}
  .rc-radar__ring{fill:none;stroke:var(--line);}
  .rc-radar__spoke{stroke:var(--line);}
  @media (prefers-reduced-motion: reduce){
    .rc-radar.is-init .rc-radar__data,.rc-radar.is-init .rc-radar__node{transform:none;opacity:1;}
  }
  `;
  document.head.appendChild(s);
}

/**
 * Roboclan HUD radar — a glowing 5-axis (n-axis) score chart.
 * Values default to a 1–5 scale; pass max={10} to feed legacy /10 data.
 */
function Radar({
  values = [],
  labels = [],
  max = 5,
  size = 260,
  rings = 4,
  showLabels = true,
  showValues = true,
  animate = true,
  color,
  className = "",
  ...rest
}) {
  injectRadarStyles();
  const [drawn, setDrawn] = React.useState(!animate);
  React.useEffect(() => {
    if (!animate) return;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
    return () => cancelAnimationFrame(r);
  }, [animate]);
  const n = values.length || labels.length || 5;
  // 标签(带数字)会横向伸出，长词如 "Intelligence"/"Autonomy" + 数值需要更宽留白，
  // 否则右/左两侧标签会溢出 viewBox 被卡片/手机屏幕切掉。无标签(卡片小图)保持紧凑。
  const pad = showLabels ? (showValues ? 92 : 62) : 14;
  const W = size + pad * 2;
  const cx = W / 2;
  const cy = W / 2;
  const R = size / 2;
  const uid = React.useId ? React.useId().replace(/:/g, "") : "rc" + Math.random().toString(36).slice(2, 8);
  const pt = (i, r) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const poly = r => Array.from({
    length: n
  }, (_, i) => pt(i, r).map(v => v.toFixed(1)).join(",")).join(" ");
  // 占位轴：值为 null（如人形/商用的"性价比"，不评分/询价保护）→ 顶点归 0（落在中心），
  // 五根轴的网格/标签仍在（形状与其它品类一致），但该轴不显示数字、多边形在此收到中心，
  // 让人一眼看出"此轴无评分"，而不是误以为拿了高分。
  const dataPts = values.map((v, i) => pt(i, R * Math.max(0, Math.min(v == null ? 0 : v, max)) / max));
  const dataStr = dataPts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
  const cls = ["rc-radar", animate ? drawn ? "is-drawn" : "is-init" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: cls,
    width: W,
    height: W,
    viewBox: `0 0 ${W} ${W}`,
    style: { maxWidth: "100%", height: "auto" }
  }, rest), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `${uid}-fill`,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#5BE2FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.5",
    stopColor: "#6E8BFF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#A66BFF"
  })), /*#__PURE__*/React.createElement("filter", {
    id: `${uid}-glow`,
    x: "-40%",
    y: "-40%",
    width: "180%",
    height: "180%"
  }, /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "4",
    result: "b"
  }), /*#__PURE__*/React.createElement("feMerge", null, /*#__PURE__*/React.createElement("feMergeNode", {
    in: "b"
  }), /*#__PURE__*/React.createElement("feMergeNode", {
    in: "SourceGraphic"
  })))), Array.from({
    length: rings
  }, (_, k) => /*#__PURE__*/React.createElement("polygon", {
    key: k,
    className: "rc-radar__ring",
    points: poly(R * (k + 1) / rings),
    strokeWidth: "1"
  })), Array.from({
    length: n
  }, (_, i) => {
    const [x, y] = pt(i, R);
    const [lx, ly] = pt(i, R + 16);
    const anchor = Math.abs(lx - cx) < 8 ? "middle" : lx > cx ? "start" : "end";
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      className: "rc-radar__spoke",
      x1: cx,
      y1: cy,
      x2: x.toFixed(1),
      y2: y.toFixed(1),
      strokeWidth: "1"
    }), showLabels && labels[i] != null && /*#__PURE__*/React.createElement("text", {
      className: "rc-radar__axislabel",
      x: lx.toFixed(1),
      y: ly.toFixed(1),
      textAnchor: anchor,
      dominantBaseline: "middle",
      opacity: values[i] == null ? "0.45" : "1"
    }, labels[i], showValues && values[i] != null && /*#__PURE__*/React.createElement("tspan", {
      className: "rc-radar__axisval",
      dx: "6"
    }, (max === 10 ? values[i] / 2 : values[i]).toFixed(1))));
  }), /*#__PURE__*/React.createElement("polygon", {
    className: "rc-radar__data",
    points: dataStr,
    fill: color || `url(#${uid}-fill)`,
    fillOpacity: "0.28",
    stroke: color || `url(#${uid}-fill)`,
    strokeWidth: "2.2",
    strokeLinejoin: "round",
    filter: `url(#${uid}-glow)`
  }), /*#__PURE__*/React.createElement("g", {
    className: "rc-radar__node"
  }, dataPts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: p[0].toFixed(1),
    cy: p[1].toFixed(1),
    r: "3.4",
    fill: color || `url(#${uid}-fill)`,
    filter: `url(#${uid}-glow)`
  }))));
}
Object.assign(__ds_scope, { Radar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Radar.jsx", error: String((e && e.message) || e) }); }

// components/data/ScoreBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _sbInjected = false;
function injectSbStyles() {
  if (_sbInjected || typeof document === "undefined") return;
  _sbInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-score{display:inline-flex;align-items:baseline;gap:3px;font-family:var(--font-mono);line-height:1;}
  .rc-score__v{font-weight:600;background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent;}
  .rc-score__max{color:var(--text-3);font-weight:500;}
  .rc-score--sm .rc-score__v{font-size:15px;} .rc-score--sm .rc-score__max{font-size:11px;}
  .rc-score--md .rc-score__v{font-size:22px;} .rc-score--md .rc-score__max{font-size:13px;}
  .rc-score--lg .rc-score__v{font-size:40px;} .rc-score--lg .rc-score__max{font-size:16px;}
  .rc-score__star{font-size:.7em;color:var(--accent-violet);-webkit-text-fill-color:var(--accent-violet);}
  `;
  document.head.appendChild(s);
}

/** Gradient numeric score readout on a 1–5 scale (pass max={10} for legacy data). */
function ScoreBadge({
  value,
  max = 5,
  size = "md",
  showMax = true,
  star = false,
  className = "",
  ...rest
}) {
  injectSbStyles();
  const shown = max === 10 ? value / 2 : value;
  const cls = ["rc-score", `rc-score--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), star && /*#__PURE__*/React.createElement("span", {
    className: "rc-score__star"
  }, "\u2605"), /*#__PURE__*/React.createElement("span", {
    className: "rc-score__v"
  }, shown.toFixed(1)), showMax && /*#__PURE__*/React.createElement("span", {
    className: "rc-score__max"
  }, "/", max === 10 ? 5 : max));
}
Object.assign(__ds_scope, { ScoreBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ScoreBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/SpecRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _srInjected = false;
function injectSrStyles() {
  if (_srInjected || typeof document === "undefined") return;
  _srInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-spec{display:flex;align-items:baseline;justify-content:space-between;gap:16px;
    padding:11px 0;border-bottom:1px solid var(--line);}
  .rc-spec__k{font-family:var(--font-body);font-size:13.5px;color:var(--text-3);white-space:nowrap;}
  .rc-spec__v{font-family:var(--font-mono);font-size:13.5px;color:var(--text-1);font-weight:500;
    text-align:right;font-feature-settings:"tnum" 1;}
  .rc-spec--plain{border-bottom:none;}
  `;
  document.head.appendChild(s);
}

/** Instrument-panel spec row: muted label, mono value, hairline divider. */
function SpecRow({
  label,
  value,
  divider = true,
  className = "",
  ...rest
}) {
  injectSrStyles();
  const cls = ["rc-spec", divider ? "" : "rc-spec--plain", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "rc-spec__k"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "rc-spec__v"
  }, value));
}
Object.assign(__ds_scope, { SpecRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SpecRow.jsx", error: String((e && e.message) || e) }); }

// components/data/StatReadout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _stInjected = false;
function injectStStyles() {
  if (_stInjected || typeof document === "undefined") return;
  _stInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-stat{display:flex;flex-direction:column;gap:6px;}
  .rc-stat__k{font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-3);}
  .rc-stat__v{font-family:var(--font-mono);font-weight:500;color:var(--text-1);line-height:1;font-feature-settings:"tnum" 1;}
  .rc-stat__u{color:var(--text-3);font-weight:400;}
  .rc-stat--sm .rc-stat__v{font-size:20px;} .rc-stat--md .rc-stat__v{font-size:28px;} .rc-stat--lg .rc-stat__v{font-size:40px;}
  .rc-stat--sm .rc-stat__u{font-size:12px;} .rc-stat--md .rc-stat__u{font-size:13px;} .rc-stat--lg .rc-stat__u{font-size:15px;}
  .rc-stat--accent .rc-stat__v{background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent;}
  `;
  document.head.appendChild(s);
}

/** Big instrument-panel stat: eyebrow label + large mono value + unit. */
function StatReadout({
  label,
  value,
  unit,
  size = "md",
  accent = false,
  className = "",
  ...rest
}) {
  injectStStyles();
  const cls = ["rc-stat", `rc-stat--${size}`, accent ? "rc-stat--accent" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), label != null && /*#__PURE__*/React.createElement("span", {
    className: "rc-stat__k"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "rc-stat__v"
  }, value, unit != null && /*#__PURE__*/React.createElement("span", {
    className: "rc-stat__u"
  }, " ", unit)));
}
Object.assign(__ds_scope, { StatReadout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatReadout.jsx", error: String((e && e.message) || e) }); }

// components/product/PriceRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _prInjected = false;
function injectPrStyles() {
  if (_prInjected || typeof document === "undefined") return;
  _prInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-prow{display:flex;align-items:center;gap:14px;padding:13px 16px;border-radius:var(--r-md);
    border:1px solid var(--line);background:var(--surface-1);
    transition:background var(--dur-fast),border-color var(--dur-fast);}
  .rc-prow:hover{background:var(--surface-2);border-color:var(--line-2);}
  .rc-prow.is-best{background:var(--success-soft);border-color:rgba(63,224,162,.35);}
  .rc-prow__ch{flex:1;min-width:0;}
  .rc-prow__name{font-family:var(--font-body);font-size:14px;color:var(--text-1);font-weight:500;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .rc-prow__best{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-mono);
    font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--success);margin-top:3px;}
  .rc-prow__price{font-family:var(--font-mono);font-size:17px;font-weight:600;color:var(--text-1);
    font-feature-settings:"tnum" 1;white-space:nowrap;}
  .rc-prow.is-best .rc-prow__price{color:var(--success);}
  `;
  document.head.appendChild(s);
}

/** One retailer row in the price-compare table; lowest is flagged best. */
function PriceRow({
  channel,
  price,
  best = false,
  ctaLabel = "View deal",
  url,
  onView,
  className = "",
  ...rest
}) {
  injectPrStyles();
  const cls = ["rc-prow", best ? "is-best" : "", className].filter(Boolean).join(" ");
  const handle = () => { try { onView && onView(); } catch (e) {} if (url) window.open(url, "_blank", "noopener"); };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "rc-prow__ch"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rc-prow__name"
  }, channel), best && /*#__PURE__*/React.createElement("div", {
    className: "rc-prow__best"
  }, "\u2605 Lowest price")), /*#__PURE__*/React.createElement("div", {
    className: "rc-prow__price"
  }, price), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: best ? "primary" : "secondary",
    size: "sm",
    onClick: handle
  }, ctaLabel));
}
Object.assign(__ds_scope, { PriceRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/PriceRow.jsx", error: String((e && e.message) || e) }); }

// components/product/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _pcInjected = false;
function injectPcStyles() {
  if (_pcInjected || typeof document === "undefined") return;
  _pcInjected = true;
  const s = document.createElement("style");
  s.textContent = `
  .rc-pc{width:100%;overflow:hidden;display:flex;flex-direction:column;}
  .rc-pc__thumb{position:relative;aspect-ratio:1;display:grid;place-items:center;
    border-bottom:1px solid var(--line);overflow:hidden;}
  /* 有图的卡片：正方形白底，图片铺满（与后台 1:1 定位窗口所见即所得一致） */
  .rc-pc__thumb:has(img){background:#ffffff;border-bottom-color:#e6e8ee;}
  .rc-pc__thumb img{position:relative;z-index:1;width:100%;height:100%;object-fit:contain;padding:0;box-sizing:border-box;
    display:block;}
  .rc-pc__glow{position:absolute;width:240px;height:240px;border-radius:50%;
    filter:blur(34px);opacity:.55;}
  .rc-pc__emoji{position:relative;font-size:104px;line-height:1;filter:drop-shadow(0 10px 26px rgba(0,0,0,.5));}
  .rc-pc__cat{position:absolute;top:12px;left:12px;z-index:2;font-family:var(--font-mono);font-size:10.5px;
    letter-spacing:.08em;text-transform:uppercase;color:var(--text-1);padding:4px 9px;
    border-radius:var(--r-pill);background:#12141b;border:1px solid rgba(255,255,255,.14);}
  .rc-pc__add{position:absolute;top:10px;right:10px;z-index:2;}
  /* 白底图卡片：+ 号改成白底黑十字，深色浅色背景上都清晰 */
  .rc-pc__thumb:has(img) .rc-pc__add .rc-ib--glass{background:#ffffff;border-color:rgba(0,0,0,.2);color:#4a505c;box-shadow:0 2px 8px rgba(0,0,0,.18);}
  .rc-pc__thumb:has(img) .rc-pc__add .rc-ib--glass:hover{background:#fff;color:#2c313b;border-color:rgba(0,0,0,.4);}
  .rc-pc__body{padding:16px 16px 16px;display:flex;flex-direction:column;flex:1;}
  .rc-pc__catlbl{font-family:var(--font-mono);font-size:10.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;margin:0 0 5px;}
  .rc-pc__name{font-family:var(--font-display);font-weight:600;font-size:17px;letter-spacing:-.01em;color:var(--text-1);margin:0;}
  .rc-pc__brand{font-size:12.5px;color:var(--text-3);margin-top:2px;}
  .rc-pc__priced{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;margin-top:12px;}
  .rc-pc__price{font-family:var(--font-mono);font-size:19px;font-weight:600;color:var(--text-1);}
  .rc-pc__price .from{font-size:11px;color:var(--text-3);font-weight:500;margin-right:5px;letter-spacing:.06em;text-transform:uppercase;}
  .rc-pc__specs{display:flex;flex-direction:column;gap:5px;margin-top:13px;}
  .rc-pc__spec{display:flex;justify-content:space-between;gap:12px;font-size:12.5px;color:var(--text-3);}
  .rc-pc__spec b{font-family:var(--font-mono);color:var(--text-2);font-weight:500;}
  .rc-pc__foot{display:flex;align-items:center;justify-content:space-between;gap:10px;
    margin-top:14px;padding-top:13px;border-top:1px solid var(--line);}
  .rc-pc__cta{display:inline-flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;
    color:var(--accent-ink);cursor:pointer;}
  .rc-pc__mini{flex-shrink:0;}
  `;
  document.head.appendChild(s);
}

/**
 * Roboclan product card — the catalog card, re-skinned to dark glass.
 * Keeps the original structure: thumb + category + compare-add, name/brand,
 * "from $X" price, two key specs, mini radar / score, availability.
 */
function ProductCard({
  name,
  brand,
  category,
  emoji = "🤖",
  image,
  glow = "#6E8BFF",
  price,
  priceFrom = false,
  status,
  specs = [],
  radar,
  axes,
  score,
  scoreMax = 5,
  cta = "Compare prices",
  added = false,
  onAdd,
  onOpen,
  className = "",
  ...rest
}) {
  injectPcStyles();
  return /*#__PURE__*/React.createElement(__ds_scope.GlassCard, _extends({
    hover: true,
    padded: false,
    className: ["rc-pc", className].filter(Boolean).join(" "),
    onClick: onOpen
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "rc-pc__thumb"
  }, image ? null : /*#__PURE__*/React.createElement("span", {
    className: "rc-pc__glow",
    style: {
      background: glow
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "rc-pc__add",
    onClick: e => {
      e.stopPropagation();
      onAdd && onAdd();
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    size: "sm",
    label: added ? "In compare" : "Add to compare",
    active: added
  }, added ? "✓" : "＋")), image
    ? /*#__PURE__*/React.createElement("img", { className: "rc-pc__img", src: image, alt: name, loading: "lazy" })
    : /*#__PURE__*/React.createElement("span", {
    className: "rc-pc__emoji"
  }, emoji)), /*#__PURE__*/React.createElement("div", {
    className: "rc-pc__body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "rc-pc__catlbl",
    style: { color: glow }
  }, category), /*#__PURE__*/React.createElement("h3", {
    className: "rc-pc__name"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "rc-pc__brand"
  }, brand)), /*#__PURE__*/React.createElement("div", {
    className: "rc-pc__priced"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rc-pc__price"
  }, priceFrom && /*#__PURE__*/React.createElement("span", {
    className: "from"
  }, "from"), price), status && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: status.tone || "neutral"
  }, status.label)), /*#__PURE__*/React.createElement("div", {
    className: "rc-pc__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rc-pc__cta",
    onClick: e => {
      e.stopPropagation();
      onOpen && onOpen(e);
    }
  }, cta, " ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u203A")), radar ? /*#__PURE__*/React.createElement("span", {
    className: "rc-pc__mini"
  }, /*#__PURE__*/React.createElement(__ds_scope.Radar, {
    values: radar,
    labels: axes,
    size: 50,
    rings: 3,
    showLabels: false,
    animate: false
  })) : score != null && /*#__PURE__*/React.createElement(__ds_scope.ScoreBadge, {
    value: score,
    max: scoreMax,
    size: "md",
    star: true
  }))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ProductCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Catalog.jsx
try { (() => {
/* Roboclan website — Category grid with filters. Shared via window.RCCatalog. */
(function () {
  const {
    ProductCard,
    Chip
  } = window.RoboclanDesignSystem_0955a0;
  const DATA = window.ROBOCLAN_DATA;
  let injected = false;
  function inject() {
    if (injected) return;
    injected = true;
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
    const n = Number(String(price).replace(/[^0-9.]/g, "")) || 0;
    if (b === "Under $1k") return n < 1000;
    if (b === "$1k–$3k") return n >= 1000 && n < 3000;
    return n >= 3000;
  }
  function Catalog({
    initialCat,
    onOpen,
    onAdd,
    compare
  }) {
    inject();
    const [cats, setCats] = React.useState(new Set(initialCat ? [initialCat] : []));
    const [price, setPrice] = React.useState(new Set());
    const buckets = ["Under $1k", "$1k–$3k", "$3k+"];
    const toggle = (set, setter, v) => {
      const n = new Set(set);
      n.has(v) ? n.delete(v) : n.add(v);
      setter(n);
    };
    const list = DATA.robots.filter(r => (cats.size === 0 || cats.has(r.cat)) && (price.size === 0 || [...price].some(b => inBucket(r.price, b))));
    const active = cats.size + price.size > 0;
    return /*#__PURE__*/React.createElement("div", {
      className: "rc-cat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-cat__head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-cat__ey"
    }, "Catalog"), /*#__PURE__*/React.createElement("h1", null, cats.size === 1 ? [...cats][0] : "All robots")), /*#__PURE__*/React.createElement("div", {
      className: "rc-cat__filters"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-cat__row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rc-cat__rowlbl"
    }, "Category"), DATA.categories.map(c => /*#__PURE__*/React.createElement(Chip, {
      key: c.name,
      active: cats.has(c.name),
      onClick: () => toggle(cats, setCats, c.name)
    }, c.name))), /*#__PURE__*/React.createElement("div", {
      className: "rc-cat__row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rc-cat__rowlbl"
    }, "Price"), buckets.map(b => /*#__PURE__*/React.createElement(Chip, {
      key: b,
      active: price.has(b),
      onClick: () => toggle(price, setPrice, b)
    }, b)))), /*#__PURE__*/React.createElement("div", {
      className: "rc-cat__bar"
    }, /*#__PURE__*/React.createElement("span", null, list.length, " robot", list.length !== 1 ? "s" : ""), active && /*#__PURE__*/React.createElement("span", {
      className: "rc-cat__reset",
      onClick: () => {
        setCats(new Set());
        setPrice(new Set());
      }
    }, "\u2715 Reset filters")), /*#__PURE__*/React.createElement("div", {
      className: "rc-cat__grid"
    }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "rc-cat__empty"
    }, "No matches \u2014 try removing a filter."), list.map(r => /*#__PURE__*/React.createElement(ProductCard, {
      key: r.id,
      name: r.name,
      brand: r.brand,
      category: r.cat,
      emoji: r.emoji,
      glow: DATA.glow[r.cat],
      price: r.price,
      priceFrom: r.priceFrom,
      specs: r.cardSpecs,
      radar: r.radar,
      axes: DATA.axes[r.cat],
      status: r.status,
      added: compare.has(r.id),
      onAdd: () => onAdd(r.id),
      onOpen: () => onOpen(r.id)
    }))));
  }
  window.RCCatalog = Catalog;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Catalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
/* Roboclan website — sticky glass header. Shared via window.RCHeader. */
(function () {
  const {
    Button
  } = window.RoboclanDesignSystem_0955a0;
  let injected = false;
  function inject() {
    if (injected) return;
    injected = true;
    const s = document.createElement("style");
    s.textContent = `
    .rc-hd{position:sticky;top:0;z-index:50;background:var(--surface-solid);
      backdrop-filter:blur(var(--blur-lg));border-bottom:1px solid var(--line);}
    .rc-hd__in{max-width:var(--container);margin:0 auto;padding:0 24px;height:var(--header-h);
      display:flex;align-items:center;gap:20px;}
    .rc-hd__logo{display:flex;align-items:center;gap:11px;cursor:pointer;}
    .rc-hd__word{font-family:var(--font-display);font-weight:600;font-size:20px;letter-spacing:-.03em;color:var(--text-1);}
    .rc-hd__nav{display:flex;gap:24px;margin-left:8px;}
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
    @media(max-width:820px){.rc-hd__nav,.rc-hd__search{display:none}}
    `;
    document.head.appendChild(s);
  }
  function Mark({
    size = 30
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 48 48",
      fill: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "rchd-g",
      x1: "8",
      y1: "8",
      x2: "40",
      y2: "40",
      gradientUnits: "userSpaceOnUse"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#5BE2FF"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "0.52",
      stopColor: "#6E8BFF"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#A66BFF"
    })), /*#__PURE__*/React.createElement("radialGradient", {
      id: "rchd-n",
      cx: "0.4",
      cy: "0.38",
      r: "0.7"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#EAF2FF"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "0.5",
      stopColor: "#8FA8FF"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#6E8BFF"
    }))), /*#__PURE__*/React.createElement("ellipse", {
      cx: "24",
      cy: "24",
      rx: "18",
      ry: "8.4",
      transform: "rotate(-28 24 24)",
      fill: "none",
      stroke: "url(#rchd-g)",
      strokeWidth: "1.5",
      opacity: "0.45"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 35 V13 H26 A6 6 0 0 1 26 25 H18 M23 25 L31 36",
      fill: "none",
      stroke: "url(#rchd-g)",
      strokeWidth: "2.9",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "36.4",
      cy: "13.6",
      r: "3",
      fill: "url(#rchd-n)"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "35.5",
      cy: "12.7",
      r: "0.9",
      fill: "#fff",
      fillOpacity: "0.9"
    }));
  }
  function Header({
    nav = "Reviews",
    compareCount = 0,
    onHome,
    onCompare,
    onSearch,
    query = ""
  }) {
    inject();
    const items = ["Reviews", "Guides", "News", "About"];
    return /*#__PURE__*/React.createElement("header", {
      className: "rc-hd"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-hd__in"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-hd__logo",
      onClick: onHome
    }, /*#__PURE__*/React.createElement(Mark, null), /*#__PURE__*/React.createElement("span", {
      className: "rc-hd__word"
    }, "Roboclan")), /*#__PURE__*/React.createElement("nav", {
      className: "rc-hd__nav"
    }, items.map(it => /*#__PURE__*/React.createElement("a", {
      key: it,
      className: it === nav ? "on" : "",
      onClick: onHome
    }, it))), /*#__PURE__*/React.createElement("div", {
      className: "rc-hd__search"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 21l-4-4"
    })), /*#__PURE__*/React.createElement("input", {
      placeholder: "Search robots, brands\u2026",
      value: query,
      onChange: e => onSearch && onSearch(e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "rc-hd__cmp"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: onCompare
    }, "Compare"), compareCount > 0 && /*#__PURE__*/React.createElement("span", {
      className: "rc-hd__badge"
    }, compareCount))));
  }
  window.RCHeader = Header;
  window.RCMark = Mark;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
/* Roboclan website — Homepage. Shared via window.RCHome. */
(function () {
  const {
    GlassCard,
    Badge,
    ProductCard,
    Button,
    ScoreBadge
  } = window.RoboclanDesignSystem_0955a0;
  const DATA = window.ROBOCLAN_DATA;
  let injected = false;
  function inject() {
    if (injected) return;
    injected = true;
    const s = document.createElement("style");
    s.textContent = `
    .rc-home{max-width:var(--container);margin:0 auto;padding:0 24px 80px;}
    .rc-hero{padding:56px 0 24px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,500px);gap:44px;align-items:center;}
    .rc-hero__copy{max-width:560px;position:relative;}
    .rc-hero__copy::before{content:"";position:absolute;left:-30px;top:28px;width:340px;height:200px;
      background:radial-gradient(closest-side,rgba(110,139,255,.18),transparent 75%);filter:blur(8px);z-index:0;pointer-events:none;}
    .rc-hero__copy>*{position:relative;z-index:1;}
    .rc-hero h1{font-family:var(--font-display);font-weight:700;font-size:68px;line-height:1.0;
      letter-spacing:-.035em;margin:0 0 18px;text-shadow:0 2px 24px rgba(0,0,0,.45);}
    .rc-hero h1 .g{background:linear-gradient(100deg,#5BE2FF 0%,#8FA8FF 28%,#A66BFF 52%,#8FA8FF 76%,#5BE2FF 100%);
      background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
      filter:drop-shadow(0 6px 34px rgba(120,150,255,.5));animation:rc-shine 6s linear infinite;}
    @keyframes rc-shine{to{background-position:-220% 0}}
    .rc-bot{position:relative;}
    .rc-bot svg{width:100%;height:auto;overflow:visible;display:block;}
    .rc-fac__drift{transform-box:view-box;transform-origin:240px 210px;animation:rc-fac-drift 16s var(--ease-in-out) infinite;}
    .rc-fac__pad{animation:rc-fac-pad 3s var(--ease-in-out) infinite;}
    .rc-fac__swing{transform-box:view-box;animation:rc-fac-swing 3.6s var(--ease-in-out) infinite;}
    .rc-fac__turn{transform-box:view-box;animation:rc-fac-turn 4.4s var(--ease-in-out) infinite;}
    .rc-fac__tool{animation:rc-fac-tool 1.5s var(--ease-in-out) infinite;}
    .rc-fac__pt{animation:rc-fac-pt 4.2s var(--ease-in-out) infinite;}
    .rc-fac__link{animation:rc-fac-link 1.1s linear infinite;}
    .rc-fac__belt{animation:rc-fac-belt 2.6s linear infinite;}
    .rc-fac__weld{transform-box:view-box;animation:rc-fac-weld 1s var(--ease-in-out) infinite;}
    .rc-fac__spark{transform-box:fill-box;transform-origin:center;animation:rc-fac-spark 1.5s var(--ease-in-out) infinite;}
    .rc-fac__led{animation:rc-bot-led 1.8s var(--ease-in-out) infinite;}
    @keyframes rc-fac-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(-7px,4px)}}
    @keyframes rc-fac-pad{0%,100%{opacity:.45;transform:scale(.93)}50%{opacity:.9;transform:scale(1.06)}}
    @keyframes rc-fac-swing{0%,100%{transform:rotate(-13deg)}50%{transform:rotate(8deg)}}
    @keyframes rc-fac-turn{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}
    @keyframes rc-fac-tool{0%,100%{opacity:.5;transform:scale(.7)}50%{opacity:1;transform:scale(1.2)}}
    @keyframes rc-fac-pt{0%{opacity:0;transform:translateY(10px)}40%{opacity:.85}100%{opacity:0;transform:translateY(-30px)}}
    @keyframes rc-fac-link{to{stroke-dashoffset:-20}}
    @keyframes rc-fac-belt{from{transform:translate(0,0)}to{transform:translate(30px,15px)}}
    @keyframes rc-fac-weld{0%,100%{transform:rotate(3deg)}50%{transform:rotate(-7deg)}}
    @keyframes rc-fac-spark{0%,68%,100%{opacity:0;transform:scale(.4)}8%{opacity:1;transform:scale(1)}26%{opacity:.55;transform:scale(1.35)}}
    @keyframes rc-bot-led{0%,100%{opacity:1}50%{opacity:.35}}
    @media(prefers-reduced-motion:reduce){.rc-fac__drift,.rc-fac__pad,.rc-fac__swing,.rc-fac__turn,.rc-fac__tool,.rc-fac__pt,.rc-fac__link,.rc-fac__belt,.rc-fac__weld,.rc-fac__spark,.rc-fac__led{animation:none}}
    .rc-hero p{font-size:18px;color:var(--text-2);margin:0;max-width:560px;line-height:1.5;}
    .rc-hero p .dot{color:var(--text-4);margin:0 4px;}
    .rc-hero__ey{display:inline-flex;margin-bottom:20px;}
    .rc-hero__cta{display:flex;gap:12px;margin-top:28px;flex-wrap:wrap;}
    .rc-bot{position:relative;}
    .rc-bot__tag{position:absolute;left:6px;top:8px;z-index:3;display:flex;align-items:center;gap:7px;font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--text-3);}
    .rc-bot__tag .led{width:7px;height:7px;border-radius:50%;background:var(--success);box-shadow:0 0 9px var(--success);}
    .rc-news{position:relative;overflow:hidden;display:flex;align-items:center;gap:14px;margin:32px 0 8px;padding:14px 18px;
      border-radius:var(--r-md);
      background:linear-gradient(100deg,rgba(110,139,255,.16),rgba(166,107,255,.10) 55%,var(--surface-2));
      border:1px solid rgba(110,139,255,.32);
      box-shadow:0 10px 34px rgba(110,139,255,.14),var(--inset-hairline);}
    .rc-news::after{content:"";position:absolute;inset:0;pointer-events:none;
      background:linear-gradient(110deg,transparent 32%,rgba(255,255,255,.07) 50%,transparent 68%);
      transform:translateX(-100%);animation:rc-news-sheen 5.5s var(--ease-in-out) infinite;}
    @keyframes rc-news-sheen{0%{transform:translateX(-100%)}55%,100%{transform:translateX(100%)}}
    .rc-news>*{position:relative;z-index:1;}
    .rc-news__t{flex:1;font-size:14.5px;color:var(--text-1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
    .rc-news__t b{color:#fff;font-weight:600;}
    .rc-news__more{font-size:13px;font-weight:600;color:var(--accent-ink);cursor:pointer;white-space:nowrap;}
    .rc-sec{display:flex;align-items:baseline;justify-content:space-between;margin:52px 0 18px;}
    .rc-sec h2{font-family:var(--font-display);font-weight:600;font-size:24px;letter-spacing:-.02em;margin:0;}
    .rc-sec__lnk{font-size:13px;font-weight:600;color:var(--accent-ink);cursor:pointer;}
    .rc-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;}
    .rc-tile{position:relative;overflow:hidden;cursor:pointer;padding:22px;display:flex;flex-direction:column;gap:4px;min-height:140px;}
    .rc-tile__glow{position:absolute;top:-30px;right:-30px;width:130px;height:130px;border-radius:50%;filter:blur(40px);opacity:.5;transition:transform var(--dur-slow) var(--ease-out),opacity var(--dur-slow) var(--ease-out);}
    .rc-tile__ico{width:36px;height:36px;margin-bottom:11px;position:relative;display:block;filter:drop-shadow(0 4px 14px rgba(0,0,0,.5));transition:transform var(--dur-med) var(--ease-out),filter var(--dur-med) var(--ease-out);}
    .rc-tile__ico svg{width:100%;height:100%;display:block;}
    .rc-ico-spin,.rc-ico-nod,.rc-ico-drive,.rc-ico-float,.rc-ico-flow,.rc-ico-sweep{transform-box:fill-box;}
    .rc-ico-spin,.rc-ico-drive,.rc-ico-float,.rc-ico-flow{transform-origin:center;}
    .rc-ico-nod{transform-origin:center bottom;}
    .rc-ico-sweep{transform-origin:center top;}
    .rc-tile:hover .rc-tile__ico{transform:scale(1.13) translateY(-2px);filter:drop-shadow(0 7px 18px currentColor);}
    .rc-tile:hover .rc-tile__glow{transform:scale(1.4);opacity:.82;}
    .rc-tile:hover .rc-ico-spin{animation:rc-ico-spin 2.4s linear infinite;}
    .rc-tile:hover .rc-ico-nod{animation:rc-ico-nod 1.6s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-drive{animation:rc-ico-drive 1.1s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-float{animation:rc-ico-float 1.8s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-flow{animation:rc-ico-flow 1.8s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-blink{animation:rc-ico-blink .9s steps(1,end) infinite;}
    .rc-tile:hover .rc-ico-sweep{animation:rc-ico-sweep 1.2s var(--ease-in-out) infinite;}
    @keyframes rc-ico-spin{to{transform:rotate(360deg)}}
    @keyframes rc-ico-nod{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}
    @keyframes rc-ico-drive{0%,100%{transform:translateX(0) rotate(0)}25%{transform:translateX(-1.5px) rotate(-3deg)}75%{transform:translateX(1.5px) rotate(3deg)}}
    @keyframes rc-ico-float{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
    @keyframes rc-ico-flow{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
    @keyframes rc-ico-sweep{0%,100%{transform:rotate(0)}30%{transform:rotate(-4deg)}70%{transform:rotate(4deg)}}
    @keyframes rc-ico-blink{0%,100%{opacity:1}50%{opacity:.25}}
    .rc-tile__name{font-family:var(--font-display);font-weight:600;font-size:17px;color:var(--text-1);position:relative;}
    .rc-tile__blurb{font-size:12.5px;color:var(--text-3);position:relative;}
    .rc-tile__count{margin-top:auto;font-family:var(--font-mono);font-size:11px;color:var(--text-2);position:relative;padding-top:12px;}
    .rc-rail{display:grid;grid-template-columns:repeat(auto-fill,minmax(244px,1fr));gap:18px;}
    @media(max-width:900px){.rc-hero{grid-template-columns:1fr}.rc-bot{display:none}}
    @media(max-width:640px){.rc-hero h1{font-size:40px}.rc-hero p{font-size:15px}.rc-hero{padding-top:40px}}
    `;
    document.head.appendChild(s);
  }

  // Hero visual — a living isometric robotics floor: multiple arms working, glowing pads, data links.
  function FactoryHero() {
    const add = (p, v, k) => [p[0] + v[0] * k, p[1] + v[1] * k];
    const RXv = [34, 17],
      DLv = [-34, 17],
      GN = 7,
      O = [240, 92];

    // Two parallel assembly-line conveyors (run along the RX iso axis), stacked in depth.
    const RX = [30, 15],
      DL = [-30, 15],
      LB = 5.8;
    const eo = [DL[0] * 0.6, DL[1] * 0.6];
    const lines = [{
      O: [150, 128]
    },
    // back line
    {
      O: [42, 182]
    } // front line (offset down the depth axis for clear spacing)
    ];
    const CLof = (Lo, t) => [Lo[0] + RX[0] * t, Lo[1] + RX[1] * t];

    // Robots distributed across the two lines: 3 on the back line, 2 on the front line.
    const stations = [{
      line: 0,
      t: 1.2,
      side: -1,
      tint: "a",
      label: "R-F3",
      d: 0.2
    }, {
      line: 0,
      t: 3.0,
      side: 1,
      tint: "a",
      label: "Z-7X",
      d: 0.9
    }, {
      line: 0,
      t: 4.7,
      side: -1,
      tint: "v",
      label: "Z-8X",
      d: 1.2,
      feat: true
    }, {
      line: 1,
      t: 1.8,
      side: 1,
      tint: "a",
      label: "T-8R",
      d: 0.5
    }, {
      line: 1,
      t: 4.0,
      side: -1,
      tint: "a",
      label: "R-F2",
      d: 0.7
    }];
    const units = stations.map(st => {
      const Lo = lines[st.line].O;
      const c = CLof(Lo, st.t);
      const base = [c[0] + DL[0] * 0.92 * st.side, c[1] + DL[1] * 0.92 * st.side];
      const u = 0.8 + st.line * 0.1 + st.t * 0.03;
      const work = [c[0], c[1] - 7];
      const S = [base[0] + (st.side > 0 ? 5 : -5) * u, base[1] - 46 * u];
      const E = [(S[0] + work[0]) / 2, Math.min(S[1], work[1]) - 15 * u];
      return {
        ...st,
        base,
        u,
        work,
        S,
        E
      };
    });
    const ordered = [...units].sort((a, b) => a.base[1] - b.base[1]);
    const isoBox = (cx, cy, q, hb, topF, lF, rF, key) => /*#__PURE__*/React.createElement("g", {
      key: key
    }, /*#__PURE__*/React.createElement("polygon", {
      points: `${cx - q},${cy - hb} ${cx},${cy - hb + q * 0.5} ${cx},${cy + q * 0.5} ${cx - q},${cy}`,
      fill: lF
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `${cx},${cy - hb + q * 0.5} ${cx + q},${cy - hb} ${cx + q},${cy} ${cx},${cy + q * 0.5}`,
      fill: rF
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `${cx},${cy - hb - q * 0.5} ${cx + q},${cy - hb} ${cx},${cy - hb + q * 0.5} ${cx - q},${cy - hb}`,
      fill: topF
    }));
    const pedestal = un => {
      const {
        base,
        u,
        feat
      } = un;
      const panel = un.tint === "v" ? "url(#rc-fac-panelV)" : "url(#rc-fac-panel)";
      const acc = feat ? "#A66BFF" : "#6E8BFF";
      return /*#__PURE__*/React.createElement("g", {
        key: "pd" + un.label
      }, /*#__PURE__*/React.createElement("ellipse", {
        cx: base[0],
        cy: base[1] + 3,
        rx: 14 * u,
        ry: 5.6 * u,
        fill: "#0B0E14",
        opacity: "0.55"
      }), /*#__PURE__*/React.createElement("ellipse", {
        cx: base[0],
        cy: base[1],
        rx: 14 * u,
        ry: 5.6 * u,
        fill: panel,
        stroke: "rgba(255,255,255,0.2)",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("ellipse", {
        cx: base[0],
        cy: base[1] - 1,
        rx: 7.5 * u,
        ry: 3 * u,
        fill: "#0E1015",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("ellipse", {
        className: "rc-fac__pad",
        style: {
          transformBox: "fill-box",
          transformOrigin: "center",
          animationDelay: un.d + "s"
        },
        cx: base[0],
        cy: base[1],
        rx: 18 * u,
        ry: 7.5 * u,
        fill: "none",
        stroke: acc,
        strokeWidth: "1.4",
        opacity: "0.5"
      }));
    };
    const machine = (c, key) => /*#__PURE__*/React.createElement("g", {
      key: key
    }, isoBox(c[0], c[1], 22, 30, "#171C28", "#0A0D14", "#10141D", key + "b"), /*#__PURE__*/React.createElement("polygon", {
      points: `${c[0] - 22},${c[1] - 30} ${c[0]},${c[1] - 30 + 11} ${c[0] + 22},${c[1] - 30} ${c[0]},${c[1] - 30 - 11}`,
      fill: "none",
      stroke: "rgba(124,150,255,0.22)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: c[0] - 8,
      y: c[1] - 25,
      width: "16",
      height: "6",
      rx: "2",
      fill: "#0E1015",
      stroke: "#6E8BFF",
      strokeWidth: "1",
      opacity: "0.8"
    }), /*#__PURE__*/React.createElement("circle", {
      className: "rc-fac__tool",
      style: {
        transformBox: "fill-box",
        transformOrigin: "center"
      },
      cx: c[0] + 13,
      cy: c[1] - 20,
      r: "1.7",
      fill: "#5BE2FF"
    }));
    const belt = Lo => {
      const B1 = [Lo[0] + eo[0], Lo[1] + eo[1]],
        B2 = [Lo[0] - eo[0], Lo[1] - eo[1]];
      const e = CLof(Lo, LB);
      const E1 = [e[0] + eo[0], e[1] + eo[1]],
        E2 = [e[0] - eo[0], e[1] - eo[1]];
      const dp = 8,
        rollers = [];
      for (let t = 0.4; t < LB; t += 0.7) {
        const c = CLof(Lo, t);
        rollers.push([c[0] + eo[0], c[1] + eo[1], c[0] - eo[0], c[1] - eo[1]]);
      }
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
        points: `${B1[0]},${B1[1]} ${E1[0]},${E1[1]} ${E1[0]},${E1[1] + dp} ${B1[0]},${B1[1] + dp}`,
        fill: "#0A0D13"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: `${E1[0]},${E1[1]} ${E2[0]},${E2[1]} ${E2[0]},${E2[1] + dp} ${E1[0]},${E1[1] + dp}`,
        fill: "#0C1018"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: `${B2[0]},${B2[1]} ${E2[0]},${E2[1]} ${E1[0]},${E1[1]} ${B1[0]},${B1[1]}`,
        fill: "#12161F",
        stroke: "rgba(124,150,255,0.22)",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("g", {
        stroke: "rgba(124,150,255,0.16)",
        strokeWidth: "1"
      }, rollers.map((r, k) => /*#__PURE__*/React.createElement("line", {
        key: "r" + k,
        x1: r[0],
        y1: r[1],
        x2: r[2],
        y2: r[3]
      }))), /*#__PURE__*/React.createElement("line", {
        x1: B1[0],
        y1: B1[1],
        x2: E1[0],
        y2: E1[1],
        stroke: "#5BE2FF",
        strokeWidth: "1.4",
        opacity: "0.4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: B2[0],
        y1: B2[1],
        x2: E2[0],
        y2: E2[1],
        stroke: "#6E8BFF",
        strokeWidth: "1.4",
        opacity: "0.4"
      }));
    };
    const PART_COLORS = [["#CFF6FF", "#3FC9E8", "#2C8AA8"],
    // cyan
    ["#D7E2FF", "#5B7BD6", "#3E579C"],
    // blue
    ["#ECDBFF", "#9B6FE0", "#7048B0"],
    // violet
    ["#CFF7E6", "#3FD49A", "#2C9C73"],
    // mint
    ["#FFE6C2", "#E8A94E", "#B07B2E"],
    // amber
    ["#FFD6E6", "#E86B9B", "#B04F77"] // pink
    ];
    const parts = (Lo, li) => {
      const arr = [];
      for (let i = -1; i <= LB - 1; i++) {
        const c = CLof(Lo, i + 0.4);
        const tn = PART_COLORS[((i + li * 2) % PART_COLORS.length + PART_COLORS.length) % PART_COLORS.length];
        arr.push(isoBox(c[0], c[1] - 4, 12, 13, tn[0], tn[1], tn[2], "pt" + li + "_" + i));
      }
      const a = CLof(Lo, 0.15),
        b = CLof(Lo, LB + 0.05);
      const clip = `${a[0] + eo[0]},${a[1] + eo[1] - 36} ${b[0] + eo[0]},${b[1] + eo[1] - 36} ${b[0] - eo[0]},${b[1] - eo[1] + 10} ${a[0] - eo[0]},${a[1] - eo[1] + 10}`;
      const cid = "rc-fac-clip" + li;
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("clipPath", {
        id: cid
      }, /*#__PURE__*/React.createElement("polygon", {
        points: clip
      })), /*#__PURE__*/React.createElement("g", {
        clipPath: `url(#${cid})`
      }, /*#__PURE__*/React.createElement("g", {
        className: "rc-fac__belt"
      }, arr)));
    };
    const arm = un => {
      const {
        base,
        u,
        work: W,
        S,
        E,
        tint,
        feat,
        d
      } = un;
      const limb = tint === "v" ? "url(#rc-fac-limbV)" : "url(#rc-fac-limb)";
      const panel = tint === "v" ? "url(#rc-fac-panelV)" : "url(#rc-fac-panel)";
      const acc = feat ? "#A66BFF" : "#6E8BFF";
      return /*#__PURE__*/React.createElement("g", {
        key: "a" + un.label
      }, /*#__PURE__*/React.createElement("line", {
        x1: base[0],
        y1: base[1],
        x2: S[0],
        y2: S[1],
        stroke: limb,
        strokeWidth: 11 * u,
        strokeLinecap: "round"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: S[0],
        cy: S[1],
        r: 6 * u,
        fill: panel,
        stroke: acc,
        strokeWidth: "1.2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: S[0],
        y1: S[1],
        x2: E[0],
        y2: E[1],
        stroke: limb,
        strokeWidth: 9 * u,
        strokeLinecap: "round"
      }), /*#__PURE__*/React.createElement("line", {
        x1: S[0],
        y1: S[1],
        x2: E[0],
        y2: E[1],
        stroke: acc,
        strokeWidth: "1.2",
        opacity: "0.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: E[0],
        cy: E[1],
        r: 4.4 * u,
        fill: "#0E1015",
        stroke: acc,
        strokeWidth: "1.3"
      }), /*#__PURE__*/React.createElement("g", {
        className: "rc-fac__weld",
        style: {
          transformOrigin: `${E[0]}px ${E[1]}px`,
          animationDelay: d + "s"
        }
      }, /*#__PURE__*/React.createElement("line", {
        x1: E[0],
        y1: E[1],
        x2: W[0],
        y2: W[1],
        stroke: limb,
        strokeWidth: 7 * u,
        strokeLinecap: "round"
      }), /*#__PURE__*/React.createElement("line", {
        x1: E[0],
        y1: E[1],
        x2: W[0],
        y2: W[1],
        stroke: acc,
        strokeWidth: "1.1",
        opacity: "0.55"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: W[0],
        cy: W[1],
        r: 3 * u,
        fill: panel,
        stroke: "rgba(255,255,255,0.25)",
        strokeWidth: "1"
      })));
    };
    const spark = un => {
      const W = un.work,
        acc = un.feat ? "#A66BFF" : "#7DE3FF";
      return /*#__PURE__*/React.createElement("g", {
        key: "s" + un.label,
        className: "rc-fac__spark",
        style: {
          transformBox: "fill-box",
          transformOrigin: "center",
          animationDelay: un.d + 0.3 + "s"
        },
        transform: `translate(${W[0]},${W[1]})`
      }, /*#__PURE__*/React.createElement("circle", {
        r: "6",
        fill: acc,
        opacity: "0.25"
      }), /*#__PURE__*/React.createElement("g", {
        stroke: acc,
        strokeWidth: "1.2",
        strokeLinecap: "round"
      }, /*#__PURE__*/React.createElement("line", {
        x1: "-5",
        y1: "0",
        x2: "5",
        y2: "0"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "0",
        y1: "-5",
        x2: "0",
        y2: "5"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-3.4",
        y1: "-3.4",
        x2: "3.4",
        y2: "3.4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "-3.4",
        y1: "3.4",
        x2: "3.4",
        y2: "-3.4"
      })));
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "rc-bot",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 480 430",
      preserveAspectRatio: "xMidYMid meet"
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
      id: "rc-fac-halo",
      cx: "0.5",
      cy: "0.46",
      r: "0.55"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#6E8BFF",
      stopOpacity: "0.16"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#6E8BFF",
      stopOpacity: "0"
    })), /*#__PURE__*/React.createElement("radialGradient", {
      id: "rc-fac-vio",
      cx: "0.62",
      cy: "0.62",
      r: "0.4"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#A66BFF",
      stopOpacity: "0.16"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#A66BFF",
      stopOpacity: "0"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "rc-fac-limb",
      x1: "0",
      y1: "0",
      x2: "1",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#E2E9FA"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#9DABCE"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "rc-fac-panel",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#F2F6FF"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#AAB7D8"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "rc-fac-limbV",
      x1: "0",
      y1: "0",
      x2: "1",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#E7DEFF"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#A98FE0"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "rc-fac-panelV",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#F4EEFF"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#B79DE6"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "rc-fac-sweepg",
      x1: "0",
      y1: "0",
      x2: "1",
      y2: "0"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "#9CE6FF",
      stopOpacity: "0"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "0.5",
      stopColor: "#9CE6FF",
      stopOpacity: "0.5"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "#9CE6FF",
      stopOpacity: "0"
    }))), /*#__PURE__*/React.createElement("g", {
      className: "rc-fac__drift"
    }, /*#__PURE__*/React.createElement("ellipse", {
      cx: "240",
      cy: "210",
      rx: "220",
      ry: "200",
      fill: "url(#rc-fac-halo)"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: "300",
      cy: "250",
      rx: "150",
      ry: "140",
      fill: "url(#rc-fac-vio)"
    }), /*#__PURE__*/React.createElement("g", {
      stroke: "rgba(124,150,255,0.10)",
      strokeWidth: "1"
    }, Array.from({
      length: GN + 1
    }, (_, j) => {
      const a = add(O, DLv, j),
        b = add(add(O, DLv, j), RXv, GN);
      return /*#__PURE__*/React.createElement("line", {
        key: "ga" + j,
        x1: a[0],
        y1: a[1],
        x2: b[0],
        y2: b[1]
      });
    }), Array.from({
      length: GN + 1
    }, (_, i) => {
      const a = add(O, RXv, i),
        b = add(add(O, RXv, i), DLv, GN);
      return /*#__PURE__*/React.createElement("line", {
        key: "gb" + i,
        x1: a[0],
        y1: a[1],
        x2: b[0],
        y2: b[1]
      });
    }))), lines.map((ln, li) => /*#__PURE__*/React.createElement("g", {
      key: "ln" + li
    }, belt(ln.O), parts(ln.O, li), machine(CLof(ln.O, -0.25), "mS" + li), machine(CLof(ln.O, LB + 0.3), "mE" + li))), ordered.map(un => pedestal(un)), ordered.map(un => arm(un)), /*#__PURE__*/React.createElement("g", {
      fill: "#9CE6FF"
    }, [[120, 150, 0, 0.7], [360, 120, 1.4, 0.5], [410, 220, 0.6, 0.6], [90, 250, 2.1, 0.45], [300, 96, 1.1, 0.6], [160, 330, 1.8, 0.4], [330, 330, 0.4, 0.5]].map((p, k) => /*#__PURE__*/React.createElement("circle", {
      key: "p" + k,
      className: "rc-fac__pt",
      style: {
        transformBox: "fill-box",
        transformOrigin: "center",
        animationDelay: p[2] + "s"
      },
      cx: p[0],
      cy: p[1],
      r: "1.5",
      opacity: p[3]
    })))));
  }

  // Per-category line icons (brand line style, tinted to the category hue).
  const RC_ICONS = {
    "Humanoids": /*#__PURE__*/React.createElement("g", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("g", {
      className: "rc-ico-nod"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "4.6",
      r: "1.4",
      fill: "currentColor",
      stroke: "none",
      className: "rc-ico-blink"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 6 V8"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "9",
      y: "8",
      width: "14",
      height: "12",
      rx: "4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "13.4",
      cy: "14",
      r: "1.4",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18.6",
      cy: "14",
      r: "1.4",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13 17.4 H19"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 26 v-1.5 a3.5 3.5 0 0 1 3.5 -3.5 h11 a3.5 3.5 0 0 1 3.5 3.5 V26"
    }))),
    "Robot Vacuums": /*#__PURE__*/React.createElement("g", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("g", {
      className: "rc-ico-spin"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "16",
      r: "11"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "12",
      r: "2.2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "16",
      r: "1.3",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6.6 19 A11 11 0 0 0 25.4 19"
    }))),
    "Robot Mowers": /*#__PURE__*/React.createElement("g", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("g", {
      className: "rc-ico-drive"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 12 Q12.5 7 14 5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 12 Q16 6.5 17.5 4.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 12 Q20.5 7 22 5"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "7",
      y: "12",
      width: "18",
      height: "8",
      rx: "4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "22",
      r: "2.3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "21",
      cy: "22",
      r: "2.3"
    }))),
    "Pool Robots": /*#__PURE__*/React.createElement("g", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 8 Q8 5.5 11 8 T17 8 T23 8",
      className: "rc-ico-flow"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 12 Q8 9.5 11 12 T17 12 T23 12",
      className: "rc-ico-flow"
    }), /*#__PURE__*/React.createElement("g", {
      className: "rc-ico-float"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M13 18 v-1.5 a3 3 0 0 1 6 0 V18"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "10",
      y: "18",
      width: "12",
      height: "7",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12.5 25 H19.5"
    }))),
    "Commercial Cleaning": /*#__PURE__*/React.createElement("g", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "5",
      r: "1.3",
      fill: "currentColor",
      stroke: "none",
      className: "rc-ico-blink"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 6.4 V8"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "9",
      y: "8",
      width: "14",
      height: "9",
      rx: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 12 H20"
    }), /*#__PURE__*/React.createElement("g", {
      className: "rc-ico-sweep"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 17 H25 L23 22 H9 Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M11 22 V25"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14.5 22 V25.6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 22 V25.6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21.5 22 V25"
    })))
  };
  function Home({
    onOpenCategory,
    onOpen,
    onAdd,
    compare,
    onNews
  }) {
    inject();
    const counts = {};
    DATA.robots.forEach(r => {
      counts[r.cat] = (counts[r.cat] || 0) + 1;
    });
    const top = [...DATA.robots].sort((a, b) => b.score - a.score).slice(0, 4);
    return /*#__PURE__*/React.createElement("div", {
      className: "rc-home"
    }, /*#__PURE__*/React.createElement("section", {
      className: "rc-hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-hero__copy"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rc-hero__ey"
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "accent"
    }, "\u25C6 1\u20135 radar scoring")), /*#__PURE__*/React.createElement("h1", null, "Every robot,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      className: "g"
    }, "compared.")), /*#__PURE__*/React.createElement("p", null, "Specs", /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }, "\xB7"), "5-point radar ratings", /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }, "\xB7"), "aggregated reviews", /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }, "\xB7"), "live price tracking \u2014 across every robot category."), /*#__PURE__*/React.createElement("div", {
      className: "rc-hero__cta"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => onOpenCategory(null)
    }, "Browse all robots"))), /*#__PURE__*/React.createElement(FactoryHero, null)), /*#__PURE__*/React.createElement("div", {
      className: "rc-news"
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "live"
    }, "LIVE"), /*#__PURE__*/React.createElement("div", {
      className: "rc-news__t"
    }, /*#__PURE__*/React.createElement("b", null, "1X NEO"), " opens U.S. pre-orders: $20,000 outright or $499/month subscription"), /*#__PURE__*/React.createElement("span", {
      className: "rc-news__more",
      onClick: onNews
    }, "All headlines \u203A")), /*#__PURE__*/React.createElement("div", {
      className: "rc-sec"
    }, /*#__PURE__*/React.createElement("h2", null, "Browse by category")), /*#__PURE__*/React.createElement("div", {
      className: "rc-tiles"
    }, DATA.categories.map(c => /*#__PURE__*/React.createElement(GlassCard, {
      key: c.name,
      hover: true,
      padded: false,
      className: "rc-tile",
      onClick: () => onOpenCategory(c.name)
    }, /*#__PURE__*/React.createElement("span", {
      className: "rc-tile__glow",
      style: {
        background: DATA.glow[c.name]
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "rc-tile__ico",
      style: {
        color: DATA.glow[c.name]
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 32 32"
    }, RC_ICONS[c.name])), /*#__PURE__*/React.createElement("span", {
      className: "rc-tile__name"
    }, c.name), /*#__PURE__*/React.createElement("span", {
      className: "rc-tile__blurb"
    }, c.blurb), /*#__PURE__*/React.createElement("span", {
      className: "rc-tile__count"
    }, counts[c.name] || 0, " models \u203A")))), /*#__PURE__*/React.createElement("div", {
      className: "rc-sec"
    }, /*#__PURE__*/React.createElement("h2", null, "Top rated"), /*#__PURE__*/React.createElement("span", {
      className: "rc-sec__lnk",
      onClick: () => onOpenCategory(null)
    }, "See all \u203A")), /*#__PURE__*/React.createElement("div", {
      className: "rc-rail"
    }, top.map(r => /*#__PURE__*/React.createElement(ProductCard, {
      key: r.id,
      name: r.name,
      brand: r.brand,
      category: r.cat,
      emoji: r.emoji,
      glow: DATA.glow[r.cat],
      price: r.price,
      priceFrom: r.priceFrom,
      specs: r.cardSpecs,
      radar: r.radar,
      axes: DATA.axes[r.cat],
      status: r.status,
      added: compare.has(r.id),
      onAdd: () => onAdd(r.id),
      onOpen: () => onOpen(r.id)
    }))));
  }
  window.RCHome = Home;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductDetail.jsx
try { (() => {
/* Roboclan website — Product detail (the centerpiece). Shared via window.RCDetail. */
(function () {
  const {
    GlassCard,
    Radar,
    ScoreBadge,
    StatReadout,
    SpecRow,
    PriceRow,
    Tag,
    Badge,
    Button
  } = window.RoboclanDesignSystem_0955a0;
  const DATA = window.ROBOCLAN_DATA;
  let injected = false;
  function inject() {
    if (injected) return;
    injected = true;
    const s = document.createElement("style");
    s.textContent = `
    .rc-dt{max-width:var(--container);margin:0 auto;padding:24px 24px 96px;}
    .rc-dt__back{display:inline-flex;align-items:center;gap:7px;font-size:13.5px;color:var(--text-2);cursor:pointer;margin-bottom:22px;}
    .rc-dt__back:hover{color:var(--text-1);}
    .rc-dt__top{display:grid;grid-template-columns:300px 1fr;gap:28px;align-items:stretch;}
    .rc-dt__hero{position:relative;display:grid;place-items:center;min-height:280px;overflow:hidden;}
    .rc-dt__heroglow{position:absolute;width:280px;height:280px;border-radius:50%;filter:blur(50px);opacity:.5;}
    .rc-dt__emoji{position:relative;font-size:120px;filter:drop-shadow(0 16px 40px rgba(0,0,0,.6));}
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
    .rc-dt__chip{flex:1;min-width:120px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-1);border:1px solid var(--line);}
    .rc-dt__verdict{margin-top:18px;}
    .rc-dt__verdict p{font-size:15.5px;color:var(--text-2);line-height:1.6;margin:0;}
    .rc-dt__pc{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px;}
    .rc-dt__pccol h4{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 10px;}
    .rc-dt__pccol.pro h4{color:var(--success);} .rc-dt__pccol.con h4{color:var(--danger);}
    .rc-dt__pcli{display:flex;gap:9px;align-items:flex-start;font-size:14px;color:var(--text-2);margin:8px 0;line-height:1.4;}
    .rc-dt__pcli .m{flex-shrink:0;margin-top:1px;}
    .rc-dt__pcli .m.p{color:var(--success);} .rc-dt__pcli .m.c{color:var(--danger);}
    .rc-dt__specgrid{display:grid;grid-template-columns:1fr 1fr;gap:0 32px;}
    .rc-dt__prices{display:flex;flex-direction:column;gap:8px;}
    .rc-dt__note{font-size:12px;color:var(--text-3);margin-top:14px;line-height:1.5;}
    .rc-dt__cols{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px;align-items:start;}
    @media(max-width:860px){.rc-dt__top{grid-template-columns:1fr}.rc-dt__panels,.rc-dt__cols,.rc-dt__pc,.rc-dt__specgrid{grid-template-columns:1fr}.rc-dt__name{font-size:32px}}
    `;
    document.head.appendChild(s);
  }
  function Detail({
    robot,
    onBack,
    onAdd,
    compare
  }) {
    inject();
    const r = robot;
    const glow = DATA.glow[r.cat];
    const axes = DATA.axes[r.cat];
    const added = compare.has(r.id);
    return /*#__PURE__*/React.createElement("div", {
      className: "rc-dt"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rc-dt__back",
      onClick: onBack
    }, "\u2039 Back to catalog"), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__top"
    }, /*#__PURE__*/React.createElement(GlassCard, {
      padded: false,
      className: "rc-dt__hero"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rc-dt__heroglow",
      style: {
        background: glow
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "rc-dt__catpill"
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral"
    }, r.cat)), /*#__PURE__*/React.createElement("span", {
      className: "rc-dt__emoji"
    }, r.emoji)), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__brand"
    }, r.brand), /*#__PURE__*/React.createElement("h1", {
      className: "rc-dt__name"
    }, r.name), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__tags"
    }, r.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t
    }, t))), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__priced"
    }, /*#__PURE__*/React.createElement(StatReadout, {
      label: r.priceFrom ? "From" : "Price",
      value: r.price,
      accent: true,
      size: "lg"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__seclbl",
      style: {
        marginBottom: 6
      }
    }, "Overall"), /*#__PURE__*/React.createElement(ScoreBadge, {
      value: r.score,
      size: "lg",
      star: true
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: "auto",
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: added ? "secondary" : "primary",
      onClick: () => onAdd(r.id)
    }, added ? "✓ In compare" : "＋ Add to compare"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary"
    }, "View deal"))))), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__panels"
    }, /*#__PURE__*/React.createElement(GlassCard, {
      inset: true
    }, /*#__PURE__*/React.createElement("p", {
      className: "rc-dt__seclbl"
    }, "Ratings \xB7 5-axis"), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__radarwrap"
    }, /*#__PURE__*/React.createElement(Radar, {
      values: r.radar,
      labels: axes,
      max: 5,
      size: 240
    }))), /*#__PURE__*/React.createElement(GlassCard, null, /*#__PURE__*/React.createElement("p", {
      className: "rc-dt__seclbl"
    }, "At a glance"), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__chips"
    }, r.info.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__chip",
      key: k
    }, /*#__PURE__*/React.createElement(StatReadout, {
      label: k,
      value: v,
      size: "sm"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__verdict"
    }, /*#__PURE__*/React.createElement("p", {
      className: "rc-dt__seclbl"
    }, "The verdict"), /*#__PURE__*/React.createElement("p", null, r.verdict)))), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__pc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__pccol pro"
    }, /*#__PURE__*/React.createElement("h4", null, "Pros"), r.pros.map((p, i) => /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__pcli",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "m p"
    }, "+"), p))), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__pccol con"
    }, /*#__PURE__*/React.createElement("h4", null, "Cons"), r.cons.map((p, i) => /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__pcli",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "m c"
    }, "\u2013"), p)))), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__cols"
    }, /*#__PURE__*/React.createElement(GlassCard, null, /*#__PURE__*/React.createElement("p", {
      className: "rc-dt__seclbl"
    }, "Compare prices"), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__prices"
    }, r.prices.map(([ch, p, best], i) => /*#__PURE__*/React.createElement(PriceRow, {
      key: i,
      channel: ch,
      price: p,
      best: best,
      ctaLabel: p.includes("/mo") || p.toLowerCase().includes("quote") ? "View plan" : "View deal"
    }))), /*#__PURE__*/React.createElement("p", {
      className: "rc-dt__note"
    }, "\u2605 Sample prices, sorted low \u2192 high. Production tracks every retailer's live price daily and earns affiliate revenue on outbound clicks.")), /*#__PURE__*/React.createElement(GlassCard, null, /*#__PURE__*/React.createElement("p", {
      className: "rc-dt__seclbl"
    }, "Specifications"), /*#__PURE__*/React.createElement("div", {
      className: "rc-dt__specgrid"
    }, r.specs.map(([k, v], i) => /*#__PURE__*/React.createElement(SpecRow, {
      key: i,
      label: k,
      value: v
    }))))));
  }
  window.RCDetail = Detail;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
/* Roboclan UI-kit dataset — a curated subset of the live catalog, adapted to the
   redesign's 1–5 scoring. Mirrors the production data shape (Supabase / built-in DATA).
   Exposed as window.ROBOCLAN_DATA for the kit's screen scripts. */
window.ROBOCLAN_DATA = function () {
  const CAT_GLOW = {
    "Humanoids": "#A66BFF",
    "Robot Vacuums": "#6E8BFF",
    "Robot Mowers": "#3FE0A2",
    "Pool Robots": "#5BE2FF",
    "Commercial Cleaning": "#4FD1E0"
  };
  const AXES = {
    "Humanoids": ["Mobility", "Manipulation", "Intelligence", "Battery", "Value"],
    "Robot Vacuums": ["Suction", "Runtime", "Threshold", "Mop-lift", "Value"],
    "Robot Mowers": ["Cut", "Terrain", "Navigation", "Safety", "Value"],
    "Pool Robots": ["Coverage", "Waterline", "Filtration", "Ease", "Value"],
    "Commercial Cleaning": ["Cleaning", "Coverage", "Autonomy", "Uptime", "ROI"]
  };
  const CATEGORIES = [{
    name: "Humanoids",
    emoji: "🤖",
    blurb: "Home & general-purpose"
  }, {
    name: "Robot Vacuums",
    emoji: "🧹",
    blurb: "Vac, mop & self-empty"
  }, {
    name: "Robot Mowers",
    emoji: "🌱",
    blurb: "Wire-free lawn care"
  }, {
    name: "Pool Robots",
    emoji: "🌊",
    blurb: "Floor, wall & waterline"
  }, {
    name: "Commercial Cleaning",
    emoji: "🧼",
    blurb: "Autonomous, at scale"
  }];
  const R = [{
    id: "saros10",
    name: "Roborock Saros 10",
    brand: "Roborock",
    cat: "Robot Vacuums",
    emoji: "🤖",
    priceFrom: true,
    price: "$1,599",
    score: 4.4,
    featured: true,
    radar: [4.8, 4.0, 4.6, 4.7, 3.4],
    tags: ["Spec king", "Hot-water mop", "Retractable arm"],
    cardSpecs: [["Suction", "22,000 Pa"], ["Nav", "Lidar + AI"]],
    verdict: "The do-everything flagship. Top suction, lidar nav, and a self-washing hot-water mop make it the most capable vacuum you can buy. The only real downside is the price and the big dock.",
    pros: ["Highest suction & cleaning power", "Self-washing, hot-water mop", "Excellent lidar navigation"],
    cons: ["Expensive", "Large dock footprint", "App can overwhelm beginners"],
    info: [["Dock", "Self-empty + hot wash"], ["Threshold", "Single 22 / Double 42 mm"], ["Mop-lift", "10 mm"]],
    specs: [["Suction", "22,000 Pa"], ["Mapping", "Lidar + AI"], ["Self-empty", "Yes"], ["Mopping", "Retractable + hot wash"], ["Max runtime", "180 min"], ["Dock", "All-in-one"]],
    prices: [["Amazon", "$1,599", true], ["Roborock.com", "$1,599", false], ["Newegg", "$1,629", false], ["Walmart", "$1,649", false], ["Best Buy", "$1,699", false]]
  }, {
    id: "j9",
    name: "Roomba j9+",
    brand: "iRobot",
    cat: "Robot Vacuums",
    emoji: "🧹",
    priceFrom: true,
    price: "$899",
    score: 4.2,
    radar: [4.2, 3.8, 4.2, 2.8, 3.5],
    tags: ["Trusted brand", "Obstacle avoidance"],
    cardSpecs: [["Suction", "Strong"], ["Nav", "vSLAM camera"]],
    verdict: "The safe, reliable pick. Excellent obstacle avoidance and a 'never touch it' base. Mopping is basic versus newer rivals, and you pay the iRobot brand premium.",
    pros: ["Best-in-class obstacle avoidance", "Hands-off 60-day auto-empty base", "Mature, reliable app"],
    cons: ["Mopping is an afterthought", "Pricey for the specs", "Camera nav, no lidar"],
    info: [["Dock", "Self-empty (60 days)"], ["Threshold", "Single 20 mm"], ["Mop-lift", "None"]],
    specs: [["Suction", "Strong"], ["Mapping", "vSLAM camera"], ["Self-empty", "Yes (60 days)"], ["Mopping", "Yes (basic)"], ["Max runtime", "120 min"], ["Dock", "Auto-empty base"]],
    prices: [["Amazon", "$899", true], ["Walmart", "$929", false], ["Best Buy", "$949", false], ["iRobot.com", "$999", false]]
  }, {
    id: "x10",
    name: "Eufy X10 Pro Omni",
    brand: "Eufy",
    cat: "Robot Vacuums",
    emoji: "🧽",
    priceFrom: true,
    price: "$799",
    score: 4.1,
    radar: [4.0, 4.0, 4.2, 3.7, 4.5],
    tags: ["Value pick", "Spinning mop"],
    cardSpecs: [["Suction", "8,000 Pa"], ["Nav", "Lidar"]],
    verdict: "The value champion. You get a self-washing mop dock and lidar for hundreds less than the flagships. Suction trails the Saros, but for most homes it's more than enough.",
    pros: ["Full self-wash dock under $800", "Spinning mop pads clean well", "Great lidar mapping for the price"],
    cons: ["Lower suction than flagships", "Brand support less proven", "Occasional app hiccups"],
    info: [["Dock", "Wash + dry"], ["Threshold", "Single 20 mm"], ["Mop-lift", "12 mm"]],
    specs: [["Suction", "8,000 Pa"], ["Mapping", "Lidar"], ["Self-empty", "Yes"], ["Mopping", "Dual spinning pads"], ["Max runtime", "160 min"], ["Dock", "Wash/dry"]],
    prices: [["Amazon", "$799", true], ["Walmart", "$799", true], ["Target", "$829", false], ["Best Buy", "$849", false]]
  }, {
    id: "neo",
    name: "1X NEO",
    brand: "1X Technologies",
    cat: "Humanoids",
    emoji: "🤖",
    priceFrom: false,
    price: "$20,000",
    score: 4.2,
    status: {
      label: "Pre-order",
      tone: "accent"
    },
    radar: [4.0, 4.2, 4.0, 3.2, 3.7],
    tags: ["Pre-order open", "Home-focused"],
    cardSpecs: [["Height", "167 cm"], ["Payload", "~20 kg"]],
    verdict: "The first humanoid you can actually order for the home. Soft, safe design and a teleop-to-autonomy plan. Real autonomous chores are still maturing, and $499/mo adds up.",
    pros: ["Genuinely orderable for home use", "Subscription lowers entry barrier", "Safety-first soft design"],
    cons: ["Autonomy still partly tele-operated", "Subscription cost compounds", "Limited proven chore set"],
    info: [["Form", "Bipedal · 167 cm"], ["Hands", "5-finger"], ["Runtime", "~2–4 hrs"]],
    specs: [["Height", "167 cm"], ["Weight", "30 kg"], ["Payload", "~20 kg"], ["Runtime", "~2–4 hrs"], ["Hands", "5-finger"], ["Use", "Home assistant"]],
    prices: [["1X Official", "$20,000", true], ["Subscription plan", "$499/mo", false]]
  }, {
    id: "r1",
    name: "Unitree R1",
    brand: "Unitree",
    cat: "Humanoids",
    emoji: "🦾",
    priceFrom: false,
    price: "$5,900",
    score: 4.0,
    radar: [4.2, 3.2, 3.2, 2.7, 4.7],
    tags: ["Price disruptor", "Developer-friendly"],
    cardSpecs: [["Height", "121 cm"], ["DOF", "26"]],
    verdict: "Blows up the price floor at $5,900. Incredible value for makers and researchers; not a turnkey home helper yet. If you want to tinker, nothing else is close on price.",
    pros: ["Unbeatable price for a humanoid", "Strong, agile movement", "Open SDK, big dev community"],
    cons: ["Hobby/dev focus, not home chores", "Short battery life", "Limited dexterous manipulation"],
    info: [["Form", "Bipedal · 121 cm"], ["DOF", "26"], ["Speed", "2 m/s"]],
    specs: [["Height", "121 cm"], ["Weight", "25 kg"], ["DOF", "26"], ["Runtime", "~2 hrs"], ["Speed", "2 m/s"], ["Use", "Dev / hobby"]],
    prices: [["Unitree Official", "$5,900", true], ["Authorized reseller", "$6,400", false], ["eBay (new)", "$6,750", false]]
  }, {
    id: "navimow",
    name: "Navimow i110",
    brand: "Segway",
    cat: "Robot Mowers",
    emoji: "🌱",
    priceFrom: true,
    price: "$1,299",
    score: 4.1,
    radar: [4.0, 3.7, 4.2, 4.0, 4.2],
    tags: ["No boundary wire", "RTK GPS"],
    cardSpecs: [["Coverage", "1/4 acre"], ["Nav", "RTK, no wire"]],
    verdict: "The easiest entry into wire-free mowing. RTK setup is genuinely simple and the cut is clean for small-to-mid yards. Struggles in tight, tree-heavy lots where GPS drops.",
    pros: ["No boundary wire to bury", "Simple RTK app setup", "Good anti-theft suite"],
    cons: ["GPS struggles under dense trees", "Smaller coverage area", "Bumps on very uneven ground"],
    info: [["Coverage", "Up to 1/4 acre"], ["Slope", "Up to 45%"], ["Cut", "1–2.4 in"]],
    specs: [["Coverage", "Up to 1/4 acre"], ["Navigation", "RTK, no wire"], ["Slope", "Up to 45%"], ["Cut height", "1–2.4 in"], ["Anti-theft", "GPS + PIN"], ["Rain sensor", "Yes"]],
    prices: [["Amazon", "$1,299", true], ["Best Buy", "$1,299", true], ["Lowe's", "$1,329", false], ["Home Depot", "$1,349", false]]
  }, {
    id: "automower",
    name: "Automower 430X",
    brand: "Husqvarna",
    cat: "Robot Mowers",
    emoji: "🚜",
    priceFrom: true,
    price: "$2,799",
    score: 4.3,
    radar: [4.5, 4.5, 3.5, 4.2, 3.5],
    tags: ["Premium", "Proven reliability"],
    cardSpecs: [["Coverage", "0.8 acre"], ["Nav", "Wire + GPS"]],
    verdict: "The reliability benchmark. Husqvarna's years of refinement show in the flawless cut and all-weather toughness. The catch: it still uses a buried boundary wire and costs a premium.",
    pros: ["Best-in-class cut quality", "Handles large, complex lawns", "Extremely reliable, all-weather"],
    cons: ["Requires buried boundary wire", "Expensive", "Install is more involved"],
    info: [["Coverage", "Up to 0.8 acre"], ["Slope", "Up to 45%"], ["Cut", "0.8–2.4 in"]],
    specs: [["Coverage", "Up to 0.8 acre"], ["Navigation", "Boundary wire + GPS"], ["Slope", "Up to 45%"], ["Cut height", "0.8–2.4 in"], ["Anti-theft", "PIN + alarm"], ["Weather", "All-weather"]],
    prices: [["Tractor Supply", "$2,799", true], ["Husqvarna dealer", "$2,799", true], ["Lowe's", "$2,849", false], ["Amazon", "$2,899", false]]
  }, {
    id: "aquasense",
    name: "AquaSense Pro",
    brand: "Beatbot",
    cat: "Pool Robots",
    emoji: "🌊",
    priceFrom: true,
    price: "$1,499",
    score: 4.2,
    radar: [4.5, 4.2, 4.5, 4.0, 3.5],
    tags: ["Flagship", "Cleans everything"],
    cardSpecs: [["Cleans", "Floor+wall+line"], ["Power", "Cordless"]],
    verdict: "The most complete pool robot. It does floor, walls, waterline and even surface skimming with smart navigation. It's pricey, but it replaces several single-purpose tools.",
    pros: ["Cleans floor, walls, waterline & surface", "Smart multi-motor navigation", "Strong fine-particle filtration"],
    cons: ["Premium price", "Heavy to lift out", "App features still maturing"],
    info: [["Cleans", "Floor·wall·line·surface"], ["Power", "Cordless"], ["Runtime", "~3 hrs"]],
    specs: [["Cleaning", "Floor+wall+waterline+surface"], ["Navigation", "AI, 5 motors"], ["Power", "Cordless"], ["Filter", "Fine + ultra-fine"], ["Runtime", "~3 hrs"], ["Extra", "Water clarification"]],
    prices: [["Beatbot.com", "$1,499", true], ["Amazon", "$1,499", true], ["Best Buy", "$1,549", false], ["Leslie's", "$1,549", false]]
  }, {
    id: "nautilus",
    name: "Nautilus CC Plus",
    brand: "Dolphin",
    cat: "Pool Robots",
    emoji: "🐬",
    priceFrom: true,
    price: "$799",
    score: 4.1,
    radar: [4.0, 3.7, 4.0, 4.2, 4.5],
    tags: ["Best value", "Proven"],
    cardSpecs: [["Cleans", "Floor + walls"], ["Power", "Corded"]],
    verdict: "The reliable value default. For years the go-to recommendation: cleans floor and walls well, easy top-load filter, and a price everyone can stomach. Corded, and no waterline scrub.",
    pros: ["Excellent value & track record", "Easy top-load filter basket", "Climbs walls reliably"],
    cons: ["Corded (tangle management)", "No waterline/surface cleaning", "Basic navigation"],
    info: [["Cleans", "Floor + walls"], ["Power", "Corded"], ["Cycle", "2 hr"]],
    specs: [["Cleaning", "Floor + walls"], ["Navigation", "CleverClean"], ["Power", "Corded"], ["Filter", "Top-load basket"], ["Runtime", "2 hr cycle"], ["Pool size", "Up to 50 ft"]],
    prices: [["Amazon", "$799", true], ["Walmart", "$815", false], ["Best Buy", "$829", false], ["Leslie's", "$849", false]]
  }];
  const byId = Object.fromEntries(R.map(r => [r.id, r]));
  return {
    robots: R,
    byId,
    categories: CATEGORIES,
    axes: AXES,
    glow: CAT_GLOW
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Radar = __ds_scope.Radar;

__ds_ns.ScoreBadge = __ds_scope.ScoreBadge;

__ds_ns.SpecRow = __ds_scope.SpecRow;

__ds_ns.StatReadout = __ds_scope.StatReadout;

__ds_ns.PriceRow = __ds_scope.PriceRow;

__ds_ns.ProductCard = __ds_scope.ProductCard;

})();
