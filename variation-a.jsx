// Variation A — Terminal / hacker
// Uses --mono throughout. Talks like a shell session. Photo is duotone-stripe.

function VariationA({ onCmd, onPage }) {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const sclTime = now.toLocaleTimeString("en-GB", { timeZone: "America/Santiago", hour12: false });

  const ascii =
  "  ____  ____  __  __ \n" +
  " / ___||  _ \\|  \\/  |\n" +
  "| |    | |_) | |\\/| |\n" +
  "| |___ |  _ <| |  | |\n" +
  " \\____||_| \\_\\_|  |_|";

  return (
    <div className="va frame">
      <div className="topbar">
        <div className="traffic"><span /><span /><span /></div>
        <span className="title">~/site — carlos@bcch — zsh</span>
        <div className="meta">
          <span><b>scl</b> {sclTime}</span>
          <span><span className="dot pulse" /> &nbsp;<b>online</b></span>
        </div>
      </div>

      <div className="content">
        <div className="left">
          <pre className="ascii">{ascii}</pre>
          <div className="prompt"><b>carlos@bcch</b> ~ $ whoami</div>
          <h1 className="greet">Carlos <em>Rondón-Moreno</em><span className="blink">_</span></h1>
          <p className="bio">
            Senior economist, <b>Central Bank of Chile</b> · Research Dept.
            <span className="tex">Ph.D. in Economics, University of Notre Dame, 2019<span className="pop">advised by Eric Sims, Christiane Baumeister, Cesar Sosa-Padilla & Zach Stangebye</span></span>;
            B.A. & M.A., <b>Universidad de los Andes</b> (Bogotá).
          </p>
          <p className="bio" style={{ marginTop: 14 }}>
            I work on <span className="tex">macroprudential policy<span className="pop">{"\\partial W / \\partial \\tau_b > 0  \\iff  \\text{externality binds}"}</span></span> and the
            anatomy of <b>financial crises</b> in small open economies — capital
            controls, sudden stops, fiscal consolidation. Soft spot for
            <b> computational methods</b>, <b>Python</b>, and using <span className="tex">ML/AI methods<span className="pop">Mostly using Google JAX</span></span> to improve economic modelling.
          </p>
          <div className="links">
            <a style={{ "--xc": "var(--nav-0)" }} onClick={() => onPage("research")}>research</a>
            <a style={{ "--xc": "var(--nav-1)" }} onClick={() => onPage("teaching")}>teaching</a>
            <a style={{ "--xc": "var(--nav-2)" }} onClick={() => onPage("service")}>service</a>
            <a style={{ "--xc": "var(--nav-3)" }} onClick={() => onCmd("ext:cv")}>cv</a>
            <a style={{ "--xc": "var(--nav-4)" }} onClick={() => onCmd("ext:gh")}>github</a>
            <a style={{ "--xc": "var(--nav-5)" }} onClick={() => onCmd("ext:gs")}>scholar</a>
          </div>
        </div>

        <div className="side">
          <div className="photo" style={{ letterSpacing: "0px", width: "520px", margin: "0px" }}>
            <img src="assets/carlos.jpg" alt="Carlos" style={{ objectFit: "cover", width: "5px" }} />
            <div className="meta">
              <span>id_rsa.pub</span>
            </div>
          </div>
          <div className="card">
            <h4><span className="num">02</span> recent.papers</h4>
            {window.SITE_DATA.PAPERS.slice(0, 3).map((p, i) =>
            <a className="paper" key={i} onClick={() => onPage("research")}>
                <span className="tag">{p.tag}</span>
                <span className="title-link">{p.short}</span>
                <div className="meta">{p.yr} · {p.venue}</div>
              </a>
            )}
          </div>
          <div className="card">
            <h4><span className="num">03</span> sce / news</h4>
            <div style={{ font: "13px/1.55 var(--mono)", color: "var(--fg-dim)" }}>
              <div>
                <span className="badge-new">NEW</span>
                <span style={{ color: "var(--fg)" }}>Elected </span>
                <a
                  href="https://comp-econ.com/about/#advisorycouncil"
                  target="_blank"
                  rel="noopener"
                  style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px dashed var(--accent)" }}
                >Acting Secretary</a>
                <span style={{ color: "var(--fg)" }}> of the Society for Computational Economics</span>
                <span style={{ color: "var(--fg-mute)" }}> · Jan 2026</span>.
              </div>
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px dashed var(--line-2)" }}>
                <span style={{ color: "var(--fg)" }}>Local organizing committee</span> for the
                31st Conference on Computing in Economics &amp; Finance.
                <span style={{ color: "var(--fg-mute)" }}> Santiago, Jul 7–9, 2025</span>.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="statusbar">
        <span>NORMAL</span>
        <span><b>~/research.tex</b></span>
        <span>utf-8 · LF</span>
        <span className="right">press <span className="kbd">/</span> to search · <span className="kbd">?</span> shortcuts</span>
      </div>
    </div>);

}

window.VariationA = VariationA;