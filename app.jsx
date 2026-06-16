// Main app — single-page Variation A with internal routing.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#029386",
  "fontPair": "mono-serif",
  "density": "regular",
  "pattern": "none",
  "navPalette": "xkcd-vivid"
}/*EDITMODE-END*/;

const NAV_PALETTES = {
  "muted-earth": {
    label: "Muted earth",
    desc: "Warm, low-saturation — like a worn academic press cover",
    colors: ["#7c6f57", "#a07b5b", "#9a8f6e", "#7a8471", "#5e6b6f", "#8a6f70", "#6d7e8a", "#a8915c"]
  },
  "xkcd-vivid": {
    label: "XKCD vivid",
    desc: "Eight saturated XKCD primaries — outline only",
    colors: ["#01b44c", "#75bbfd", "#f97306", "#e50000", "#9a0eea", "#13eac9", "#c20078", "#fac205"]
  },
  "xkcd-cool": {
    label: "XKCD cool",
    desc: "Cool half of the XKCD wheel — teals, blues, violets",
    colors: ["#13eac9", "#029386", "#2a6cf6", "#75bbfd", "#7e1e9c", "#9a0eea", "#0485d1", "#6241c7"]
  },
  "xkcd-warm": {
    label: "XKCD warm",
    desc: "Warm half — reds, oranges, golds, magentas",
    colors: ["#e50000", "#f97306", "#fac205", "#fdaa48", "#c20078", "#cb416b", "#9a0200", "#fd5956"]
  },
  "ink-jewel": {
    label: "Ink & jewel",
    desc: "Deep saturated tones — confident but not loud",
    colors: ["#2a6f97", "#4a7c59", "#9c6644", "#7d4f50", "#5e548e", "#a68a64", "#2f6f6a", "#7a3b52"]
  }
};
window.NAV_PALETTES = NAV_PALETTES;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [page, setPage] = React.useState(() => {
    const h = (window.location.hash || "").replace(/^#/, "");
    return ["research","teaching","service","code"].includes(h) ? h : "home";
  });
  const D = window.SITE_DATA;

  // sync URL hash <-> page state
  React.useEffect(() => {
    const target = page === "home" ? "" : "#" + page;
    if (window.location.hash !== target) {
      history.replaceState(null, "", window.location.pathname + window.location.search + target);
    }
  }, [page]);
  React.useEffect(() => {
    const onHash = () => {
      const h = (window.location.hash || "").replace(/^#/, "");
      const next = ["research","teaching","service","code"].includes(h) ? h : "home";
      setPage(next);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [page]);

  React.useEffect(() => {
    const fp = D.FONT_PAIRS.find(f => f.id === t.fontPair) || D.FONT_PAIRS[0];
    document.documentElement.style.setProperty("--sans", fp.sans);
    document.documentElement.style.setProperty("--mono", fp.mono);
    document.documentElement.style.setProperty("--serif", fp.serif);
  }, [t.fontPair]);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  React.useEffect(() => {
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.pattern = t.pattern;
  }, [t.density, t.pattern]);

  React.useEffect(() => {
    const pal = NAV_PALETTES[t.navPalette] || NAV_PALETTES["muted-earth"];
    pal.colors.forEach((c, i) => {
      document.documentElement.style.setProperty(`--nav-${i}`, c);
    });
  }, [t.navPalette]);

  React.useEffect(() => {
    const handler = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      const isInput = tag === "INPUT" || tag === "TEXTAREA" || (e.target && e.target.isContentEditable);
      if (isInput) return;
      if (e.key === "/") { e.preventDefault(); setCmdOpen(true); }
      if (e.key === "Escape" && page !== "home" && !cmdOpen) { setPage("home"); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [page, cmdOpen]);

  const onAction = (a) => {
    if (a === "close") { setCmdOpen(false); return; }
    if (a.startsWith("page:")) {
      setPage(a.split(":")[1]);
      setCmdOpen(false);
      return;
    }
    if (a === "ext:cv" || a === "ext:gh" || a === "ext:gs") {
      const urls = {
        "ext:cv": "https://carlosrondonmoreno.com/content/Rondon_CV.pdf",
        "ext:gh": "https://github.com/crondonm",
        "ext:gs": "https://scholar.google.com/citations?user=DfqEm4QAAAAJ&hl=en&oi=ao",
      };
      window.open(urls[a], "_blank", "noopener");
      setCmdOpen(false);
      return;
    }
    if (a === "tw:accent") {
      const cur = D.XKCD_SWATCHES.findIndex(s => s.hex.toLowerCase() === (t.accent || "").toLowerCase());
      const next = D.XKCD_SWATCHES[(cur + 1) % D.XKCD_SWATCHES.length];
      setTweak("accent", next.hex);
      return;
    }
    if (a === "tw:font") {
      const cur = D.FONT_PAIRS.findIndex(f => f.id === t.fontPair);
      setTweak("fontPair", D.FONT_PAIRS[(cur + 1) % D.FONT_PAIRS.length].id);
      return;
    }
    if (a === "tw:pat") {
      const opts = ["none","grid","dots","scan"];
      const cur = opts.indexOf(t.pattern);
      setTweak("pattern", opts[(cur + 1) % opts.length]);
      return;
    }
  };

  const onPage = (id) => setPage(id);
  const onBackHome = () => setPage("home");
  const onCmd = (a) => { if (a === "open") setCmdOpen(true); else onAction(a); };

  let body;
  if (page === "home") body = <VariationA onCmd={onCmd} onPage={onPage} />;
  else if (page === "research") body = <ResearchPage onBack={onBackHome} />;
  else if (page === "teaching") body = <TeachingPage onBack={onBackHome} />;
  else if (page === "service") body = <ServicePage onBack={onBackHome} />;
  else if (page === "code") body = <CodePage onBack={onBackHome} />;

  return (
    <div className="stage">
      {body}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onAction={onAction} />
      <TweaksPanel>
        <TweakSection label="Color · XKCD palette" />
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:6, marginTop:4}}>
          {D.XKCD_SWATCHES.map(s => (
            <button
              key={s.hex}
              onClick={() => setTweak("accent", s.hex)}
              title={s.name}
              style={{
                appearance:"none",
                border: t.accent.toLowerCase() === s.hex.toLowerCase()
                  ? "2px solid #29261b" : "1px solid rgba(0,0,0,.12)",
                borderRadius:6, height:32, cursor:"default",
                background: s.hex, padding:0, position:"relative",
              }}
            >
              <span style={{
                position:"absolute", left:6, bottom:4,
                font:"600 9px/1 ui-monospace,monospace",
                color: ["#fac205","#fdaa48","#13eac9"].includes(s.hex) ? "#000" : "#fff",
                letterSpacing: 0.04
              }}>{s.name}</span>
            </button>
          ))}
        </div>
        <TweakSection label="Type" />
        <TweakSelect
          label="Pairing"
          value={t.fontPair}
          options={D.FONT_PAIRS.map(f => ({value:f.id, label:f.label}))}
          onChange={(v) => setTweak("fontPair", v)}
        />
        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact","regular","comfy"]}
          onChange={(v) => setTweak("density", v)}
        />
        <TweakRadio
          label="Pattern"
          value={t.pattern}
          options={["none","grid","dots","scan"]}
          onChange={(v) => setTweak("pattern", v)}
        />
        <TweakSection label="Nav palette" />
        <div style={{display:"grid", gap:8, marginTop:4}}>
          {Object.entries(NAV_PALETTES).map(([id, p]) => (
            <button
              key={id}
              onClick={() => setTweak("navPalette", id)}
              style={{
                appearance:"none", textAlign:"left",
                border: t.navPalette === id ? "1.5px solid #29261b" : "1px solid rgba(0,0,0,.12)",
                borderRadius:6, padding:"8px 10px", cursor:"default",
                background: t.navPalette === id ? "rgba(0,0,0,.04)" : "#fff",
                display:"grid", gap:6,
              }}
            >
              <div style={{font:"600 11px/1 ui-sans-serif,system-ui", color:"#29261b"}}>{p.label}</div>
              <div style={{display:"flex", gap:3, height:14, borderRadius:3, overflow:"hidden"}}>
                {p.colors.map((c, i) => (
                  <div key={i} style={{flex:1, background:c}} />
                ))}
              </div>
              <div style={{font:"10px/1.3 ui-sans-serif,system-ui", color:"#6b6760"}}>{p.desc}</div>
            </button>
          ))}
        </div>
        <TweakSection label="Try" />
        <TweakButton label="/" onClick={() => setCmdOpen(true)}>open command palette</TweakButton>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
