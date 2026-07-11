/* Roboclan website — Homepage. Shared via window.RCHome. */
(function () {
  const { GlassCard, Badge, ProductCard, Button, ScoreBadge } = window.RoboclanDesignSystem_0955a0;
  const DATA = window.ROBOCLAN_DATA;

  let injected = false;
  function inject() {
    if (injected) return; injected = true;
    if (!document.getElementById("rc2-font")) {
      const l = document.createElement("link"); l.id = "rc2-font"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap";
      document.head.appendChild(l);
    }
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
    /* 向上滚动的新闻条：固定单行高视口，内部纵向轨道循环上移，末尾复制首条实现无缝循环 */
    .rc-news__vp{flex:1;height:22px;overflow:hidden;}
    .rc-news__track{display:flex;flex-direction:column;animation:rc-news-up 12s var(--ease-in-out) infinite;}
    .rc-news__line{height:22px;line-height:22px;font-size:14.5px;color:var(--text-1);
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .rc-news__line b{color:#fff;font-weight:600;}
    @keyframes rc-news-up{
      0%,26%{transform:translateY(0)}
      33.3%,59.6%{transform:translateY(-22px)}
      66.6%,93%{transform:translateY(-44px)}
      100%{transform:translateY(-66px)}
    }
    @media (prefers-reduced-motion: reduce){.rc-news__track{animation:none;}}
    .rc-news__more{font-size:13px;font-weight:600;color:var(--accent-ink);cursor:pointer;white-space:nowrap;}
    .rc-sec{display:flex;align-items:baseline;justify-content:space-between;margin:52px 0 18px;}
    .rc-sec h2{font-family:var(--font-display);font-weight:600;font-size:24px;letter-spacing:-.02em;margin:0;}
    .rc-sec__lnk{font-size:13px;font-weight:600;color:var(--accent-ink);cursor:pointer;}
    .rc-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
    @media(max-width:760px){.rc-tiles{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:460px){.rc-tiles{grid-template-columns:1fr}}
    .rc-tile{position:relative;overflow:hidden;cursor:pointer;padding:22px;display:flex;flex-direction:column;gap:4px;min-height:140px;}
    .rc-tile__glow{position:absolute;top:-30px;right:-30px;width:130px;height:130px;border-radius:50%;filter:blur(40px);opacity:.5;transition:transform var(--dur-slow) var(--ease-out),opacity var(--dur-slow) var(--ease-out);}
    .rc-tile__ico{width:36px;height:36px;margin-bottom:11px;position:relative;display:block;filter:drop-shadow(0 4px 14px rgba(0,0,0,.5));transition:transform var(--dur-med) var(--ease-out),filter var(--dur-med) var(--ease-out);}
    .rc-tile__ico svg{width:100%;height:100%;display:block;}
    .rc-ico-spin,.rc-ico-nod,.rc-ico-drive,.rc-ico-float,.rc-ico-flow,.rc-ico-sweep{transform-box:fill-box;}
    .rc-ico-spin,.rc-ico-drive,.rc-ico-float,.rc-ico-flow{transform-origin:center;}
    .rc-ico-nod{transform-origin:center bottom;}
    .rc-ico-sweep{transform-origin:center top;}
    .rc-ico-trot,.rc-ico-wag{transform-box:fill-box;}
    .rc-ico-trot{transform-origin:center;}
    .rc-ico-wag{transform-origin:right center;}
    .rc-tile:hover .rc-tile__ico{transform:scale(1.13) translateY(-2px);filter:drop-shadow(0 7px 18px currentColor);}
    .rc-tile:hover .rc-tile__glow{transform:scale(1.4);opacity:.82;}
    .rc-tile:hover .rc-ico-spin{animation:rc-ico-spin 2.4s linear infinite;}
    .rc-tile:hover .rc-ico-nod{animation:rc-ico-nod 1.6s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-drive{animation:rc-ico-drive 1.1s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-float{animation:rc-ico-float 1.8s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-flow{animation:rc-ico-flow 1.8s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-blink{animation:rc-ico-blink .9s steps(1,end) infinite;}
    .rc-tile:hover .rc-ico-sweep{animation:rc-ico-sweep 1.2s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-trot{animation:rc-ico-trot .5s var(--ease-in-out) infinite;}
    .rc-tile:hover .rc-ico-wag{animation:rc-ico-wag .35s var(--ease-in-out) infinite;}
    @keyframes rc-ico-spin{to{transform:rotate(360deg)}}
    @keyframes rc-ico-nod{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}
    @keyframes rc-ico-drive{0%,100%{transform:translateX(0) rotate(0)}25%{transform:translateX(-1.5px) rotate(-3deg)}75%{transform:translateX(1.5px) rotate(3deg)}}
    @keyframes rc-ico-float{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
    @keyframes rc-ico-flow{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
    @keyframes rc-ico-sweep{0%,100%{transform:rotate(0)}30%{transform:rotate(-4deg)}70%{transform:rotate(4deg)}}
    @keyframes rc-ico-blink{0%,100%{opacity:1}50%{opacity:.25}}
    @keyframes rc-ico-trot{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.4px)}}
    @keyframes rc-ico-wag{0%,100%{transform:rotate(0)}50%{transform:rotate(-16deg)}}
    .rc-tile__name{font-family:var(--font-display);font-weight:600;font-size:17px;color:var(--text-1);position:relative;}
    .rc-tile__blurb{font-size:12.5px;color:var(--text-3);position:relative;}
    .rc-tile__count{margin-top:auto;font-family:var(--font-mono);font-size:11px;color:var(--text-2);position:relative;padding-top:12px;}
    .rc-rail{display:grid;grid-template-columns:repeat(auto-fill,minmax(244px,1fr));gap:18px;}
    .rc-hgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;}
    .rc-hgcard{cursor:pointer;overflow:hidden;padding:0;display:flex;flex-direction:column;transition:transform .18s var(--ease-out),box-shadow .18s var(--ease-out);}
    .rc-hgcard:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.4);}
    .rc-hgcard__cov{height:150px;position:relative;display:flex;align-items:flex-end;padding:12px;}
    .rc-hgcard__badge{font-size:12px;font-weight:600;color:#cdd6ff;background:rgba(110,139,255,.18);border:1px solid rgba(110,139,255,.35);padding:3px 10px;border-radius:999px;}
    .rc-hgcard__body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:8px;flex:1;}
    .rc-hgcard__cat{font-size:12px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;color:#8fa8ff;}
    .rc-hgcard__ttl{font-family:var(--font-display);font-weight:700;font-size:19px;line-height:1.25;margin:0;letter-spacing:-.01em;}
    .rc-hgcard__ex{font-size:14px;line-height:1.5;color:var(--text-2,#9aa3bd);margin:0;flex:1;}
    .rc-hgcard__read{font-size:13px;font-weight:600;color:#8fa8ff;margin-top:2px;}
    @media(max-width:900px){.rc-hero{grid-template-columns:1fr}.rc-bot{display:none}}
    @media(max-width:640px){.rc-hero h1{font-size:40px}.rc-hero p{font-size:15px}.rc-hero{padding-top:40px}}

    /* ===== v2 editorial (light) homepage — matches approved mockup ===== */
    .rc2{--ink:#17171a;--ink2:#55555c;--ink3:#8a8a92;--line:#e7e6e2;--line2:#d9d8d3;--bg2:#f5f4f1;--green:#16a34a;--greenbg:#eafaf0;--accent:#4f46e5;--accent2:#eef0ff;--serif:'Fraunces',Georgia,serif;}
    .rc2 *{box-sizing:border-box;}
    .rc2-eyebrow{font-size:13px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--accent);margin-bottom:16px;}
    .rc2-hero{display:grid;grid-template-columns:1.05fr .95fr;gap:52px;align-items:center;padding:56px 0 44px;}
    .rc2-hero h1{font-family:var(--serif);font-weight:500;font-size:56px;line-height:1.02;letter-spacing:-.025em;margin:0 0 18px;color:var(--ink);}
    .rc2-hero p.sub{font-size:18px;color:var(--ink2);max-width:450px;line-height:1.55;margin:0 0 26px;}
    .rc2-btnrow{display:flex;gap:12px;flex-wrap:wrap;}
    .rc2-btn{display:inline-flex;align-items:center;gap:8px;background:var(--ink);color:#fff;font-weight:500;font-size:15px;padding:13px 26px;border-radius:999px;cursor:pointer;border:none;font-family:inherit;}
    .rc2-btn.ghost{background:transparent;color:var(--ink);border:1px solid var(--line2);}
    .rc2-herocard{background:var(--bg2);border:1px solid var(--line);border-radius:18px;padding:24px;cursor:pointer;}
    .rc2-herocard .tagn{font-size:12.5px;color:var(--ink3);font-weight:600;letter-spacing:.05em;text-transform:uppercase;}
    .rc2-herocard h3{font-family:var(--serif);font-size:24px;font-weight:600;margin:4px 0 2px;color:var(--ink);}
    .rc2-herocard .brand{font-size:14px;color:var(--ink2);}
    .rc2-himg{height:210px;background:#fff;border-radius:12px;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;margin:16px 0;overflow:hidden;padding:16px;}
    .rc2-himg img{max-width:100%;max-height:178px;width:auto;height:auto;object-fit:contain;display:block;}
    .rc2-himg .emo{font-size:52px;}
    .rc2-hcbot{display:flex;align-items:flex-end;justify-content:space-between;}
    .rc2-scorepill{display:inline-flex;align-items:center;gap:6px;background:var(--ink);color:#fff;font-size:13px;font-weight:600;padding:5px 12px;border-radius:999px;}
    .rc2-priceblk{text-align:right;}
    .rc2-msrp{font-size:12.5px;color:var(--ink3);font-weight:500;}
    .rc2-msrp s{color:var(--ink3);}
    .rc2-best{font-family:var(--serif);font-size:21px;font-weight:600;color:var(--green);}
    .rc2-best .rt{font-family:var(--font-sans,'Inter',sans-serif);font-size:12.5px;font-weight:500;}

    /* ticker */
    .rc2-ticker{background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line);overflow:hidden;margin:0 -24px;}
    .rc2-tkin{display:flex;align-items:center;gap:18px;height:44px;padding:0 24px;max-width:100%;}
    .rc2-tklbl{font-size:12px;font-weight:600;letter-spacing:.09em;color:var(--accent);flex-shrink:0;}
    .rc2-tkview{overflow:hidden;flex:1;min-width:0;}
    .rc2-tktrack{display:flex;width:max-content;flex-wrap:nowrap;gap:40px;white-space:nowrap;animation:rc2tk 60s linear infinite;}
    .rc2-tktrack .it{font-size:13.5px;color:var(--ink2);cursor:pointer;flex:0 0 auto;white-space:nowrap;}
    .rc2-tktrack .it b{color:var(--ink);font-weight:600;}
    @keyframes rc2tk{from{transform:translateX(0)}to{transform:translateX(-50%)}}

    /* section heads */
    .rc2-sec{padding:50px 0 6px;}
    .rc2-sechd{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;gap:16px;}
    .rc2-sechd h2{font-family:var(--serif);font-weight:500;font-size:33px;letter-spacing:-.02em;margin:0;color:var(--ink);}
    .rc2-sechd p{font-size:15px;color:var(--ink2);margin:6px 0 0;}
    .rc2-more{font-size:14.5px;font-weight:500;color:var(--ink2);white-space:nowrap;cursor:pointer;}
    .rc2-more:hover{color:var(--ink);}

    /* matrix */
    .rc2-matrix{display:grid;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:16px;overflow:hidden;}
    .rc2-mrow{display:grid;grid-template-columns:230px 1fr;background:#fff;}
    .rc2-mcat{padding:18px 22px;background:var(--bg2);border-right:1px solid var(--line);}
    .rc2-mcat .nm{font-weight:600;font-size:16px;display:flex;align-items:center;gap:10px;color:var(--ink);}
    .rc2-mcat .ic{width:30px;height:30px;border-radius:8px;background:#fff;border:1px solid var(--line);display:grid;place-items:center;color:var(--accent);}
    .rc2-mcat .ic svg{width:17px;height:17px;}
    .rc2-mcat .ct{font-size:12.5px;color:var(--ink3);margin-top:5px;padding-left:40px;}
    .rc2-mlinks{display:flex;flex-wrap:wrap;align-content:center;gap:9px;padding:15px 22px;}
    .rc2-chip{font-size:13.5px;font-weight:500;color:var(--ink2);background:var(--bg2);border:1px solid var(--line);border-radius:999px;padding:7px 14px;cursor:pointer;transition:.12s;}
    .rc2-chip:hover{color:var(--ink);border-color:var(--ink);background:#fff;}

    /* product rail cards */
    .rc2-rail{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
    .rc2-pc{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;cursor:pointer;transition:.15s;display:flex;flex-direction:column;}
    .rc2-pc:hover{border-color:var(--line2);transform:translateY(-3px);}
    .rc2-pc__im{height:178px;background:#fff;display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--line);position:relative;overflow:hidden;padding:14px;}
    .rc2-pc__im img{max-width:100%;max-height:150px;width:auto;height:auto;object-fit:contain;display:block;}
    .rc2-pc__im .emo{font-size:44px;}
    .rc2-pc__sc{position:absolute;top:12px;right:12px;background:var(--ink);color:#fff;font-size:12.5px;font-weight:600;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;}
    .rc2-pc__bd{padding:15px 16px 16px;display:flex;flex-direction:column;flex:1;}
    .rc2-pc__br{font-size:12.5px;color:var(--ink3);font-weight:500;}
    .rc2-pc__pn{font-weight:500;font-size:15.5px;margin:2px 0 12px;line-height:1.3;color:var(--ink);}
    .rc2-pc__msrp{font-size:12.5px;color:var(--ink3);font-weight:500;}
    .rc2-pc__msrp s{color:var(--ink3);}
    .rc2-pc__best{font-family:var(--serif);font-size:19px;font-weight:600;color:var(--green);margin-top:1px;}
    .rc2-pc__best .rt{font-family:var(--font-sans,'Inter',sans-serif);font-size:12px;font-weight:500;}
    .rc2-pc__qt{font-family:var(--serif);font-size:16px;font-weight:600;color:var(--ink);}
    .rc2-pc__cta{margin-top:auto;padding-top:13px;}
    .rc2-pc__cta span{display:block;text-align:center;background:var(--greenbg);color:var(--green);border:1px solid #c7ebd3;font-weight:600;font-size:14px;padding:10px;border-radius:9px;}
    .rc2-pc__cta.quote span{background:var(--accent2);color:var(--accent);border-color:#dfe2ff;}

    /* guide module */
    .rc2-guide{display:grid;grid-template-columns:1.5fr 1fr;align-items:start;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:#fff;cursor:pointer;}
    .rc2-guide .gimg{aspect-ratio:3/2;background:linear-gradient(135deg,#dfe7ea,#c7d2d6);display:flex;align-items:center;justify-content:center;color:#8ea0a6;font-size:52px;overflow:hidden;}
    .rc2-guide .gimg img{width:100%;height:100%;object-fit:cover;display:block;}
    .rc2-guide .gbody{padding:38px 36px;display:flex;flex-direction:column;}
    .rc2-guide .gcat{font-size:12.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;}
    .rc2-guide .gbody h3{font-family:var(--serif);font-weight:500;font-size:30px;line-height:1.12;letter-spacing:-.02em;margin:0 0 12px;color:var(--ink);}
    .rc2-guide .gbody p{font-size:15px;color:var(--ink2);line-height:1.6;margin:0 0 22px;}
    .rc2-guide .rc2-btn{align-self:flex-start;margin-top:auto;}
    .rc2-gcards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:20px;}
    .rc2-gcard{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fff;cursor:pointer;transition:.15s;display:flex;flex-direction:column;}
    .rc2-gcard:hover{border-color:var(--line2);transform:translateY(-3px);}
    .rc2-gcard .gcimg{aspect-ratio:3/2;background:linear-gradient(135deg,#dfe7ea,#c7d2d6);display:flex;align-items:center;justify-content:center;color:#8ea0a6;font-size:34px;overflow:hidden;}
    .rc2-gcard .gcimg img{width:100%;height:100%;object-fit:cover;display:block;}
    .rc2-gcard .gcbody{padding:15px 17px 17px;display:flex;flex-direction:column;gap:7px;flex:1;}
    .rc2-gcard .gccat{font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--accent);}
    .rc2-gcard .gctitle{font-family:var(--serif);font-weight:500;font-size:18px;line-height:1.25;letter-spacing:-.01em;margin:0;color:var(--ink);}
    .rc2-gcard .gcread{font-size:13px;font-weight:600;color:var(--accent);margin-top:auto;padding-top:4px;}
    @media(max-width:900px){.rc2-gcards{grid-template-columns:1fr 1fr}}
    @media(max-width:640px){.rc2-gcards{grid-template-columns:1fr}}

    @media(max-width:900px){.rc2-hero,.rc2-guide{grid-template-columns:1fr}.rc2-rail{grid-template-columns:repeat(2,1fr)}.rc2-mrow{grid-template-columns:1fr}.rc2-mcat{border-right:none;border-bottom:1px solid var(--line)}}
    @media(max-width:640px){.rc2-hero h1{font-size:40px}.rc2-rail{grid-template-columns:1fr 1fr}.rc2-sechd h2{font-size:26px}}
    `;
    document.head.appendChild(s);
  }

  // Hero visual — a living isometric robotics floor: multiple arms working, glowing pads, data links.
  function FactoryHero() {
    const add = (p, v, k) => [p[0] + v[0] * k, p[1] + v[1] * k];
    const RXv = [34, 17], DLv = [-34, 17], GN = 7, O = [240, 92];

    // Two parallel assembly-line conveyors (run along the RX iso axis), stacked in depth.
    const RX = [30, 15], DL = [-30, 15], LB = 5.8;
    const eo = [DL[0] * 0.6, DL[1] * 0.6];
    const lines = [
      { O: [150, 128] },   // back line
      { O: [42, 182] },    // front line (offset down the depth axis for clear spacing)
    ];
    const CLof = (Lo, t) => [Lo[0] + RX[0] * t, Lo[1] + RX[1] * t];

    // Robots distributed across the two lines: 3 on the back line, 2 on the front line.
    const stations = [
      { line: 0, t: 1.2, side: -1, tint: "a", label: "R-F3", d: 0.2 },
      { line: 0, t: 3.0, side:  1, tint: "a", label: "Z-7X", d: 0.9 },
      { line: 0, t: 4.7, side: -1, tint: "v", label: "Z-8X", d: 1.2, feat: true },
      { line: 1, t: 1.8, side:  1, tint: "a", label: "T-8R", d: 0.5 },
      { line: 1, t: 4.0, side: -1, tint: "a", label: "R-F2", d: 0.7 },
    ];
    const units = stations.map((st) => {
      const Lo = lines[st.line].O;
      const c = CLof(Lo, st.t);
      const base = [c[0] + DL[0] * 0.92 * st.side, c[1] + DL[1] * 0.92 * st.side];
      const u = 0.8 + st.line * 0.1 + st.t * 0.03;
      const work = [c[0], c[1] - 7];
      const S = [base[0] + (st.side > 0 ? 5 : -5) * u, base[1] - 46 * u];
      const E = [(S[0] + work[0]) / 2, Math.min(S[1], work[1]) - 15 * u];
      return { ...st, base, u, work, S, E };
    });
    const ordered = [...units].sort((a, b) => a.base[1] - b.base[1]);

    const isoBox = (cx, cy, q, hb, topF, lF, rF, key) => (
      <g key={key}>
        <polygon points={`${cx - q},${cy - hb} ${cx},${cy - hb + q * 0.5} ${cx},${cy + q * 0.5} ${cx - q},${cy}`} fill={lF} />
        <polygon points={`${cx},${cy - hb + q * 0.5} ${cx + q},${cy - hb} ${cx + q},${cy} ${cx},${cy + q * 0.5}`} fill={rF} />
        <polygon points={`${cx},${cy - hb - q * 0.5} ${cx + q},${cy - hb} ${cx},${cy - hb + q * 0.5} ${cx - q},${cy - hb}`} fill={topF} />
      </g>
    );

    const pedestal = (un) => {
      const { base, u, feat } = un;
      const panel = un.tint === "v" ? "url(#rc-fac-panelV)" : "url(#rc-fac-panel)";
      const acc = feat ? "#A66BFF" : "#6E8BFF";
      return (
        <g key={"pd" + un.label}>
          <ellipse cx={base[0]} cy={base[1] + 3} rx={14 * u} ry={5.6 * u} fill="#0B0E14" opacity="0.55" />
          <ellipse cx={base[0]} cy={base[1]} rx={14 * u} ry={5.6 * u} fill={panel} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <ellipse cx={base[0]} cy={base[1] - 1} rx={7.5 * u} ry={3 * u} fill="#0E1015" opacity="0.5" />
          <ellipse className="rc-fac__pad" style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: un.d + "s" }} cx={base[0]} cy={base[1]} rx={18 * u} ry={7.5 * u} fill="none" stroke={acc} strokeWidth="1.4" opacity="0.5" />
        </g>
      );
    };

    const machine = (c, key) => (
      <g key={key}>
        {isoBox(c[0], c[1], 22, 30, "#171C28", "#0A0D14", "#10141D", key + "b")}
        <polygon points={`${c[0] - 22},${c[1] - 30} ${c[0]},${c[1] - 30 + 11} ${c[0] + 22},${c[1] - 30} ${c[0]},${c[1] - 30 - 11}`} fill="none" stroke="rgba(124,150,255,0.22)" strokeWidth="1" />
        <rect x={c[0] - 8} y={c[1] - 25} width="16" height="6" rx="2" fill="#0E1015" stroke="#6E8BFF" strokeWidth="1" opacity="0.8" />
        <circle className="rc-fac__tool" style={{ transformBox: "fill-box", transformOrigin: "center" }} cx={c[0] + 13} cy={c[1] - 20} r="1.7" fill="#5BE2FF" />
      </g>
    );

    const belt = (Lo) => {
      const B1 = [Lo[0] + eo[0], Lo[1] + eo[1]], B2 = [Lo[0] - eo[0], Lo[1] - eo[1]];
      const e = CLof(Lo, LB);
      const E1 = [e[0] + eo[0], e[1] + eo[1]], E2 = [e[0] - eo[0], e[1] - eo[1]];
      const dp = 8, rollers = [];
      for (let t = 0.4; t < LB; t += 0.7) { const c = CLof(Lo, t); rollers.push([c[0] + eo[0], c[1] + eo[1], c[0] - eo[0], c[1] - eo[1]]); }
      return (
        <g>
          <polygon points={`${B1[0]},${B1[1]} ${E1[0]},${E1[1]} ${E1[0]},${E1[1] + dp} ${B1[0]},${B1[1] + dp}`} fill="#0A0D13" />
          <polygon points={`${E1[0]},${E1[1]} ${E2[0]},${E2[1]} ${E2[0]},${E2[1] + dp} ${E1[0]},${E1[1] + dp}`} fill="#0C1018" />
          <polygon points={`${B2[0]},${B2[1]} ${E2[0]},${E2[1]} ${E1[0]},${E1[1]} ${B1[0]},${B1[1]}`} fill="#12161F" stroke="rgba(124,150,255,0.22)" strokeWidth="1" />
          <g stroke="rgba(124,150,255,0.16)" strokeWidth="1">
            {rollers.map((r, k) => <line key={"r" + k} x1={r[0]} y1={r[1]} x2={r[2]} y2={r[3]} />)}
          </g>
          <line x1={B1[0]} y1={B1[1]} x2={E1[0]} y2={E1[1]} stroke="#5BE2FF" strokeWidth="1.4" opacity="0.4" />
          <line x1={B2[0]} y1={B2[1]} x2={E2[0]} y2={E2[1]} stroke="#6E8BFF" strokeWidth="1.4" opacity="0.4" />
        </g>
      );
    };

    const PART_COLORS = [
      ["#CFF6FF", "#3FC9E8", "#2C8AA8"], // cyan
      ["#D7E2FF", "#5B7BD6", "#3E579C"], // blue
      ["#ECDBFF", "#9B6FE0", "#7048B0"], // violet
      ["#CFF7E6", "#3FD49A", "#2C9C73"], // mint
      ["#FFE6C2", "#E8A94E", "#B07B2E"], // amber
      ["#FFD6E6", "#E86B9B", "#B04F77"], // pink
    ];
    const parts = (Lo, li) => {
      const arr = [];
      for (let i = -1; i <= LB - 1; i++) {
        const c = CLof(Lo, i + 0.4);
        const tn = PART_COLORS[(((i + li * 2) % PART_COLORS.length) + PART_COLORS.length) % PART_COLORS.length];
        arr.push(isoBox(c[0], c[1] - 4, 12, 13, tn[0], tn[1], tn[2], "pt" + li + "_" + i));
      }
      const a = CLof(Lo, 0.15), b = CLof(Lo, LB + 0.05);
      const clip = `${a[0] + eo[0]},${a[1] + eo[1] - 36} ${b[0] + eo[0]},${b[1] + eo[1] - 36} ${b[0] - eo[0]},${b[1] - eo[1] + 10} ${a[0] - eo[0]},${a[1] - eo[1] + 10}`;
      const cid = "rc-fac-clip" + li;
      return (
        <g>
          <clipPath id={cid}><polygon points={clip} /></clipPath>
          <g clipPath={`url(#${cid})`}>
            <g className="rc-fac__belt">{arr}</g>
          </g>
        </g>
      );
    };

    const arm = (un) => {
      const { base, u, work: W, S, E, tint, feat, d } = un;
      const limb = tint === "v" ? "url(#rc-fac-limbV)" : "url(#rc-fac-limb)";
      const panel = tint === "v" ? "url(#rc-fac-panelV)" : "url(#rc-fac-panel)";
      const acc = feat ? "#A66BFF" : "#6E8BFF";
      return (
        <g key={"a" + un.label}>
          <line x1={base[0]} y1={base[1]} x2={S[0]} y2={S[1]} stroke={limb} strokeWidth={11 * u} strokeLinecap="round" />
          <circle cx={S[0]} cy={S[1]} r={6 * u} fill={panel} stroke={acc} strokeWidth="1.2" />
          <line x1={S[0]} y1={S[1]} x2={E[0]} y2={E[1]} stroke={limb} strokeWidth={9 * u} strokeLinecap="round" />
          <line x1={S[0]} y1={S[1]} x2={E[0]} y2={E[1]} stroke={acc} strokeWidth="1.2" opacity="0.5" />
          <circle cx={E[0]} cy={E[1]} r={4.4 * u} fill="#0E1015" stroke={acc} strokeWidth="1.3" />
          <g className="rc-fac__weld" style={{ transformOrigin: `${E[0]}px ${E[1]}px`, animationDelay: d + "s" }}>
            <line x1={E[0]} y1={E[1]} x2={W[0]} y2={W[1]} stroke={limb} strokeWidth={7 * u} strokeLinecap="round" />
            <line x1={E[0]} y1={E[1]} x2={W[0]} y2={W[1]} stroke={acc} strokeWidth="1.1" opacity="0.55" />
            <circle cx={W[0]} cy={W[1]} r={3 * u} fill={panel} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          </g>
        </g>
      );
    };

    const spark = (un) => {
      const W = un.work, acc = un.feat ? "#A66BFF" : "#7DE3FF";
      return (
        <g key={"s" + un.label} className="rc-fac__spark" style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: (un.d + 0.3) + "s" }} transform={`translate(${W[0]},${W[1]})`}>
          <circle r="6" fill={acc} opacity="0.25" />
          <g stroke={acc} strokeWidth="1.2" strokeLinecap="round">
            <line x1="-5" y1="0" x2="5" y2="0" /><line x1="0" y1="-5" x2="0" y2="5" />
            <line x1="-3.4" y1="-3.4" x2="3.4" y2="3.4" /><line x1="-3.4" y1="3.4" x2="3.4" y2="-3.4" />
          </g>
        </g>
      );
    };

    return (
      <div className="rc-bot" aria-hidden="true">
        <svg viewBox="0 0 480 430" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="rc-fac-halo" cx="0.5" cy="0.46" r="0.55">
              <stop offset="0" stopColor="#6E8BFF" stopOpacity="0.16" /><stop offset="1" stopColor="#6E8BFF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rc-fac-vio" cx="0.62" cy="0.62" r="0.4">
              <stop offset="0" stopColor="#A66BFF" stopOpacity="0.16" /><stop offset="1" stopColor="#A66BFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rc-fac-limb" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E2E9FA" /><stop offset="1" stopColor="#9DABCE" />
            </linearGradient>
            <linearGradient id="rc-fac-panel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F2F6FF" /><stop offset="1" stopColor="#AAB7D8" />
            </linearGradient>
            <linearGradient id="rc-fac-limbV" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E7DEFF" /><stop offset="1" stopColor="#A98FE0" />
            </linearGradient>
            <linearGradient id="rc-fac-panelV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F4EEFF" /><stop offset="1" stopColor="#B79DE6" />
            </linearGradient>
            <linearGradient id="rc-fac-sweepg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#9CE6FF" stopOpacity="0" /><stop offset="0.5" stopColor="#9CE6FF" stopOpacity="0.5" /><stop offset="1" stopColor="#9CE6FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ambient backdrop + perspective iso grid (slow camera drift) */}
          <g className="rc-fac__drift">
            <ellipse cx="240" cy="210" rx="220" ry="200" fill="url(#rc-fac-halo)" />
            <ellipse cx="300" cy="250" rx="150" ry="140" fill="url(#rc-fac-vio)" />
            <g stroke="rgba(124,150,255,0.10)" strokeWidth="1">
              {Array.from({ length: GN + 1 }, (_, j) => {
                const a = add(O, DLv, j), b = add(add(O, DLv, j), RXv, GN);
                return <line key={"ga" + j} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
              })}
              {Array.from({ length: GN + 1 }, (_, i) => {
                const a = add(O, RXv, i), b = add(add(O, RXv, i), DLv, GN);
                return <line key={"gb" + i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
              })}
            </g>
          </g>

          {/* two assembly-line conveyors + parts moving through end machines */}
          {lines.map((ln, li) => (
            <g key={"ln" + li}>
              {belt(ln.O)}
              {parts(ln.O, li)}
              {machine(CLof(ln.O, -0.25), "mS" + li)}
              {machine(CLof(ln.O, LB + 0.3), "mE" + li)}
            </g>
          ))}

          {/* robot units working the lines (back-to-front) */}
          {ordered.map((un) => pedestal(un))}
          {ordered.map((un) => arm(un))}

          {/* foreground particles */}
          <g fill="#9CE6FF">
            {[[120, 150, 0, 0.7], [360, 120, 1.4, 0.5], [410, 220, 0.6, 0.6], [90, 250, 2.1, 0.45], [300, 96, 1.1, 0.6], [160, 330, 1.8, 0.4], [330, 330, 0.4, 0.5]].map((p, k) => (
              <circle key={"p" + k} className="rc-fac__pt" style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: p[2] + "s" }} cx={p[0]} cy={p[1]} r="1.5" opacity={p[3]} />
            ))}
          </g>
        </svg>
      </div>
    );
  }

  // Per-category line icons (brand line style, tinted to the category hue).
  const RC_ICONS = {
    "Humanoids": (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <g className="rc-ico-nod">
          <circle cx="16" cy="4.6" r="1.4" fill="currentColor" stroke="none" className="rc-ico-blink" /><path d="M16 6 V8" />
          <rect x="9" y="8" width="14" height="12" rx="4" />
          <circle cx="13.4" cy="14" r="1.4" fill="currentColor" stroke="none" /><circle cx="18.6" cy="14" r="1.4" fill="currentColor" stroke="none" />
          <path d="M13 17.4 H19" /><path d="M7 26 v-1.5 a3.5 3.5 0 0 1 3.5 -3.5 h11 a3.5 3.5 0 0 1 3.5 3.5 V26" />
        </g>
      </g>
    ),
    "Robot Vacuums": (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <g className="rc-ico-spin">
          <circle cx="16" cy="16" r="11" /><circle cx="16" cy="12" r="2.2" />
          <circle cx="16" cy="16" r="1.3" fill="currentColor" stroke="none" />
          <path d="M6.6 19 A11 11 0 0 0 25.4 19" />
        </g>
      </g>
    ),
    "Robot Lawn Mowers": (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <g className="rc-ico-drive">
          <path d="M12 12 Q12.5 7 14 5" /><path d="M16 12 Q16 6.5 17.5 4.5" /><path d="M20 12 Q20.5 7 22 5" />
          <rect x="7" y="12" width="18" height="8" rx="4" />
          <circle cx="11" cy="22" r="2.3" /><circle cx="21" cy="22" r="2.3" />
        </g>
      </g>
    ),
    "Pool Cleaners": (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8 Q8 5.5 11 8 T17 8 T23 8" className="rc-ico-flow" /><path d="M5 12 Q8 9.5 11 12 T17 12 T23 12" className="rc-ico-flow" />
        <g className="rc-ico-float">
          <path d="M13 18 v-1.5 a3 3 0 0 1 6 0 V18" /><rect x="10" y="18" width="12" height="7" rx="2" />
          <path d="M12.5 25 H19.5" />
        </g>
      </g>
    ),
    "Commercial & Industrial": (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="5" r="1.3" fill="currentColor" stroke="none" className="rc-ico-blink" /><path d="M16 6.4 V8" />
        <rect x="9" y="8" width="14" height="9" rx="3" /><path d="M12 12 H20" />
        <g className="rc-ico-sweep">
          <path d="M7 17 H25 L23 22 H9 Z" />
          <path d="M11 22 V25" /><path d="M14.5 22 V25.6" /><path d="M18 22 V25.6" /><path d="M21.5 22 V25" />
        </g>
      </g>
    ),
    "Quadrupeds": (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <g className="rc-ico-trot">
          <rect x="7.5" y="12" width="12.5" height="6.4" rx="2.3" />
          <path d="M20 13.4 h4.1 a1.6 1.6 0 0 1 1.6 1.6 V17.4 H22.4" />
          <path d="M24.6 13.4 l0.7 -2.6 l1.9 1.6" />
          <circle cx="23.7" cy="15.2" r="0.7" fill="currentColor" stroke="none" className="rc-ico-blink" />
          <path className="rc-ico-wag" d="M7.5 12.8 q-3.2 -0.5 -4.3 -2.9" />
          <path d="M10 18.4 V23" /><path d="M13.3 18.4 V23" /><path d="M16.6 18.4 V23" /><path d="M19.6 18.4 V23" />
        </g>
      </g>
    ),
  };

  const NEWS = [
    { b: "1X NEO", t: "opens U.S. pre-orders: $20,000 outright or $499/month subscription" },
    { b: "Dreame A3 AWD Pro", t: "lands in North America — LiDAR mapping, no boundary wire, 4WD slopes" },
    { b: "Cordless pool season", t: "self-emptying dock cleaners headline this year's robot lineup" },
  ];
  function Home({ onOpenCategory, onOpen, onAdd, compare, onNews, onQuote, onOpenGuides, onOpenPost }) {
    inject();
    // 新闻条实时从 Supabase 读（后台加了立即显示，无需重新发布）；失败则用内置兜底
    const [news, setNews] = React.useState(NEWS);
    React.useEffect(() => {
      try {
        const sb = window._sb; if (!sb) return;
        sb.from("news").select("title,body,url,sort").eq("active", true).order("sort", { ascending: true })
          .then(({ data, error }) => {
            if (!error && data && data.length) setNews(data.map((n) => ({ b: n.title, t: n.body || "", url: n.url })));
          });
      } catch (e) {}
    }, []);
    // 新闻滚动改回自走的 CSS 动画（独立运行，不依赖页面滚动；手机 scrollLeft 那条路走不通）
    const counts = {};
    DATA.robots.forEach((r) => { counts[r.cat] = (counts[r.cat] || 0) + 1; });
    // 跨品类轮流取（否则前几台全是扫地机），首页 Products 混排更丰富
    const _byCat = {};
    DATA.robots.forEach((r) => { (_byCat[r.cat] = _byCat[r.cat] || []).push(r); });
    const _cats = Object.keys(_byCat);
    const top = [];
    for (let k = 0; top.length < 8; k++) {
      let any = false;
      for (const c of _cats) {
        if (_byCat[c][k]) { top.push(_byCat[c][k]); any = true; if (top.length >= 8) break; }
      }
      if (!any) break;
    }
    const SCORED = { "Robot Vacuums": 1, "Robot Lawn Mowers": 1, "Pool Cleaners": 1 };
    const _num = (s) => { const v = parseFloat(String(s == null ? "" : s).replace(/[^0-9.]/g, "")); return isNaN(v) ? null : v; };
    const isQuote = (r) => { const p = String(r.price || "").toLowerCase(); return p.indexOf("quote") >= 0 || p.indexOf("contact") >= 0; };
    const GENERIC = { "best tracked price": 1, "pricing": 1, "price": 1, "msrp": 1 };
    const realRetailer = (ch) => ch && GENERIC[String(ch).toLowerCase()] !== 1 && !/\(msrp\)/i.test(ch);
    const bestOf = (prices) => {
      if (!prices || !prices.length) return null;
      const c = prices.map((x) => Array.isArray(x)
        ? { ch: x[0], p: x[1], url: [x[2], x[3]].find((v) => typeof v === "string" && /^https?:/.test(v)) || null }
        : { ch: x.retailer || x.channel || x.ch, p: (x.price != null ? x.price : x.p), url: x.url })
        .filter((x) => _num(x.p) != null).map((x) => ({ ch: x.ch, p: x.p, url: x.url, n: _num(x.p) }));
      if (!c.length) return null;
      c.sort((a, b) => a.n - b.n);
      return c[0];
    };
    const topScored = DATA.robots.filter((r) => SCORED[r.cat] && r.score != null).sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 8);
    const heroPick = topScored[0] || top[0];
    const MATRIX = [
      { cat: "Robot Vacuums", note: "scored", chips: ["Under $500", "$500–1,000", "$1,000–1,500", "$1,500+"] },
      { cat: "Robot Lawn Mowers", note: "scored", chips: ["Under $1,500", "$1,500–2,200", "$2,200+"] },
      { cat: "Pool Cleaners", note: "scored", chips: ["Under $500", "$500–1,200", "$1,200+"] },
      { cat: "Humanoids", note: "by brand", chips: ["Unitree", "LimX", "AgiBot"] },
      { cat: "Quadrupeds", note: "by brand", chips: ["Unitree", "DEEP Robotics", "AgiBot"] },
      { cat: "Commercial & Industrial", note: "by use-case", chips: ["Service", "Cleaning", "Delivery", "Manipulation"] },
    ];
    // 绿色 = best price = 零售/品牌各行里的最低价（MSRP 只作参考、不参与）；真实商家名才附上
    const greenPrice = (r) => {
      const b = bestOf(r.prices);
      if (b) return { p: b.p, ch: realRetailer(b.ch) ? b.ch : null };
      return { p: r.price, ch: null };
    };
    const PriceBlk = (r) => {
      if (isQuote(r)) return <div className="rc2-pc__qt">Contact for quote</div>;
      const g = greenPrice(r);
      return (
        <React.Fragment>
          <div className="rc2-pc__msrp">MSRP {r.price}</div>
          <div className="rc2-pc__best">{g.p}{g.ch ? <span className="rt"> · {g.ch}</span> : null}</div>
        </React.Fragment>
      );
    };
    const Card = (r) => {
      const q = isQuote(r); const b = q ? null : bestOf(r.prices);
      const showScore = SCORED[r.cat] && r.score != null;
      return (
        <div className="rc2-pc" key={r.id} onClick={() => onOpen(r.id)}>
          <div className="rc2-pc__im">
            {showScore && <span className="rc2-pc__sc">{r.score}</span>}
            {r.image ? <img src={r.image} alt={r.name} /> : <span className="emo">{r.emoji || "🤖"}</span>}
          </div>
          <div className="rc2-pc__bd">
            <div className="rc2-pc__br">{r.brand}</div>
            <div className="rc2-pc__pn">{r.name}</div>
            {PriceBlk(r)}
            <div className={"rc2-pc__cta" + (q ? " quote" : "")}>
              <span onClick={(e) => { e.stopPropagation(); if (q) { onQuote && onQuote(r.name); } else if (b && b.url) { window.open(b.url, "_blank", "noopener"); } else { onOpen(r.id); } }}>{q ? "Contact ↗" : (b && b.url) ? "View deal ↗" : "View details"}</span>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div className="rc-home rc2">
        <section className="rc2-hero">
          <div>
            <div className="rc2-eyebrow">Every robot, one scoring system</div>
            <h1>Find the right robot,<br />compared honestly.</h1>
            <p className="sub">188 robots across 6 categories, each scored on the same framework from official specs. No paid placements, no hype — just data you can compare.</p>
            <div className="rc2-btnrow">
              <button className="rc2-btn" onClick={() => onOpenCategory(null)}>Browse robots →</button>
              {DATA.posts && DATA.posts.length > 0 && <button className="rc2-btn ghost" onClick={() => onOpenGuides && onOpenGuides()}>Read the guides</button>}
            </div>
          </div>
          {heroPick && (
            <div className="rc2-herocard" onClick={() => onOpen(heroPick.id)}>
              <div className="tagn">Top rated · {heroPick.cat}</div>
              <h3>{heroPick.name}</h3>
              <div className="brand">{heroPick.brand}</div>
              <div className="rc2-himg">{heroPick.image ? <img src={heroPick.image} alt={heroPick.name} /> : <span className="emo">{heroPick.emoji || "🤖"}</span>}</div>
              <div className="rc2-hcbot">
                <span className="rc2-scorepill">★ {heroPick.score} Roboclan score</span>
                <div className="rc2-priceblk">{(() => { const g = greenPrice(heroPick); return (
                  <React.Fragment>
                    <div className="rc2-msrp">MSRP {heroPick.price}</div>
                    <div className="rc2-best">{g.p}{g.ch ? <span className="rt"> · {g.ch}</span> : null}</div>
                  </React.Fragment>
                ); })()}</div>
              </div>
            </div>
          )}
        </section>

        {(() => {
          // 重复足够多份，保证滚动条永远填满屏幕（尤其新闻只有 1 条时），不会滚走留白
          const base = (news && news.length) ? news : NEWS;
          const reps = Math.max(2, Math.ceil(10 / base.length));
          const half = []; for (let r = 0; r < reps; r++) base.forEach((x) => half.push(x));
          const dur = Math.max(40, half.length * 7); // 每条约 7s，速度稳定
          return (
            <div className="rc2-ticker"><div className="rc2-tkin">
              <span className="rc2-tklbl">⚡ NEWS</span>
              <div className="rc2-tkview"><div className="rc2-tktrack" style={{ animationDuration: dur + "s" }}>
                {half.concat(half).map((n, i) => (
                  <span className="it" key={i} onClick={() => { if (n && n.url) window.open(n.url, "_blank", "noopener"); }}>
                    <b>{n && n.b}</b> {n && n.t}
                  </span>
                ))}
              </div></div>
            </div></div>
          );
        })()}

        <div className="rc2-sec">
          <div className="rc2-sechd">
            <div><h2>Browse by category &amp; budget</h2><p>Jump straight to the list that fits — the fastest way to shortlist.</p></div>
            <span className="rc2-more" onClick={() => onOpenCategory(null)}>All categories →</span>
          </div>
          <div className="rc2-matrix">
            {MATRIX.map((m) => (
              <div className="rc2-mrow" key={m.cat}>
                <div className="rc2-mcat">
                  <div className="nm"><span className="ic"><svg viewBox="0 0 32 32">{RC_ICONS[m.cat]}</svg></span>{m.cat === "Commercial & Industrial" ? "Commercial" : m.cat}</div>
                  <div className="ct">{(counts[m.cat] || 0) + " models · " + m.note}</div>
                </div>
                <div className="rc2-mlinks">
                  {m.chips.map((ch) => <span className="rc2-chip" key={ch} onClick={() => onOpenCategory(m.cat)}>{ch}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rc2-sec">
          <div className="rc2-sechd">
            <div><h2>Top rated this month</h2><p>Highest Roboclan scores across scored categories.</p></div>
            <span className="rc2-more" onClick={() => onOpenCategory(null)}>See all robots →</span>
          </div>
          <div className="rc2-rail">{topScored.map(Card)}</div>
        </div>

        {DATA.posts && DATA.posts.length > 0 && (() => { const p = DATA.posts[0]; return (
          <div className="rc2-sec">
            <div className="rc2-sechd">
              <div><h2>Guides &amp; comparisons</h2><p>Real buying advice, backed by our data.</p></div>
              <span className="rc2-more" onClick={() => onOpenGuides && onOpenGuides()}>All guides →</span>
            </div>
            <div className="rc2-guide" onClick={() => onOpenPost && onOpenPost(p.id)}>
              <div className="gimg">{p.cover_image ? <img src={p.cover_image} alt={p.title} /> : "📷"}</div>
              <div className="gbody">
                <div className="gcat">{p.category || "Guide"}</div>
                <h3>{p.title}</h3>
                {p.excerpt && <p>{p.excerpt}</p>}
                <span className="rc2-btn">Read the guide →</span>
              </div>
            </div>
            {DATA.posts.length > 1 && (
              <div className="rc2-gcards">
                {DATA.posts.slice(1, 4).map((g) => (
                  <div className="rc2-gcard" key={g.id} onClick={() => onOpenPost && onOpenPost(g.id)}>
                    <div className="gcimg">{g.cover_image ? <img src={g.cover_image} alt={g.title} /> : <span className="emo">📷</span>}</div>
                    <div className="gcbody">
                      <div className="gccat">{g.category || "Guide"}</div>
                      <h4 className="gctitle">{g.title}</h4>
                      <span className="gcread">Read guide →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ); })()}
      </div>
    );
  }
  window.RCHome = Home;
})();
