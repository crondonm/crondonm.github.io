// Command palette opened with `/` — terminal-style filterable navigator.

function CommandPalette({ open, onClose, onAction }) {
  const D = window.SITE_DATA;
  const [q, setQ] = React.useState("");
  const [sel, setSel] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setQ(""); setSel(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    }
  }, [open]);

  const items = D.CMD_ITEMS.filter(i => {
    if (!q) return true;
    return (i.label + " " + i.desc + " " + i.action).toLowerCase().includes(q.toLowerCase());
  });

  const handleKey = (e) => {
    if (e.key === "Escape") { onClose(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(items.length - 1, s + 1)); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
    else if (e.key === "Enter")     { if (items[sel]) onAction(items[sel].action); }
  };

  return (
    <div className={"cmdp-back" + (open ? " open" : "")} onClick={onClose}>
      <div className="cmdp" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          placeholder="Type a command or ‘/research’ …"
          value={q}
          onChange={e => { setQ(e.target.value); setSel(0); }}
          onKeyDown={handleKey}
        />
        <div className="res">
          {items.map((it, i) => (
            <div
              key={it.action + i}
              className={"item" + (i === sel ? " sel" : "")}
              onMouseEnter={() => setSel(i)}
              onClick={() => onAction(it.action)}
            >
              <span className="ic">{it.ic}</span>
              <span>{it.label}</span>
              <span className="desc">{it.desc}</span>
            </div>
          ))}
          {!items.length && (
            <div className="item" style={{color:"var(--fg-mute)"}}>
              <span className="ic">·</span><span>no results</span>
            </div>
          )}
        </div>
        <div className="foot">
          <span><span className="kbd">↑↓</span> navigate</span>
          <span><span className="kbd">↩</span> select</span>
          <span><span className="kbd">esc</span> close</span>
          <span style={{marginLeft:"auto"}}>cmd palette · v0.1</span>
        </div>
      </div>
    </div>
  );
}

window.CommandPalette = CommandPalette;
