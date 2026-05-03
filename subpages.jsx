// Sub-page mocks: research / teaching / service. Reused inside any artboard.

function PageHeader({ crumb, title, lede, onBack, pageAccent }) {
  const wrapperStyle = pageAccent ? {"--accent": pageAccent} : {};
  return (
    <div style={wrapperStyle}>
      <div className="backbar">
        <span className="back" onClick={onBack}>
          <span className="arr">←</span> back to home
        </span>
        <span className="crumb">~/<b>{crumb}</b></span>
      </div>
      <h2>{title}</h2>
      <p className="lede">{lede}</p>
    </div>
  );
}

function AuthorList({ paper }) {
  if (!paper.coauthors || paper.coauthors.length === 0) {
    return <>{paper.authors}</>;
  }
  return (
    <>
      with{" "}
      {paper.coauthors.map((c, i) => (
        <React.Fragment key={c.name}>
          {i > 0 && (i === paper.coauthors.length - 1 ? " & " : ", ")}
          {c.url ? (
            <a className="coa" href={c.url} target="_blank" rel="noopener">{c.name}</a>
          ) : (
            <span className="coa-plain">{c.name}</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

function CourseCode({ code }) {
  // Render trailing " *" as a superscript asterisk.
  const m = code.match(/^([\s\S]*?)(\s*\*)?$/);
  const main = m[1];
  const hasStar = !!m[2];
  return (
    <>
      {main}
      {hasStar && <sup className="hemi-mark">*</sup>}
    </>
  );
}

function ResearchPage({ onBack }) {
  const D = window.SITE_DATA;
  return (
    <div className="subp" style={{"--accent": "var(--nav-0)"}}>
      <PageHeader
        onBack={onBack}
        crumb="research"
        title="Research"
        lede="Working papers, publications, and works-in-progress on macroprudential policy, financial crises, and computational macro."
      />
      <section>
        <h4>// published</h4>
        {D.PAPERS.filter(p => p.tag === "PUBLISHED" || p.tag === "PLOS ONE").map((p,i)=>(
          <div className="pp" key={i}>
            <div>
              <span className="yr">{p.yr}</span>
              {p.pdf
                ? <a className="ttl" href={p.pdf} target="_blank" rel="noopener"><b>{p.title}</b></a>
                : <b>{p.title}</b>}
            </div>
            <div className="au"><AuthorList paper={p} /> · {p.venue}</div>
            <div className="links" style={{marginTop:8}}>
              {p.pdf      && <a href={p.pdf}      target="_blank" rel="noopener">pdf ↗</a>}
              {p.appendix && <a href={p.appendix} target="_blank" rel="noopener">online appendix ↗</a>}
              {p.github   && <a href={p.github}   target="_blank" rel="noopener">github ↗</a>}
              {(p.extras || []).map((x,j) => (
                <a key={j} href={x.url} target="_blank" rel="noopener">{x.label} ↗</a>
              ))}
            </div>
            {p.short === "covid.R.kalman" && (
              <div className="policy-note">
                <span className="lbl">policy uptake</span>
                <span className="bd">
                  Kalman-filter R<sub>t</sub> estimator featured by{" "}
                  <a href="https://ourworldindata.org/explorers/coronavirus-data-explorer" target="_blank" rel="noopener">Our World in Data</a>, the{" "}
                  <a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31927-9/fulltext" target="_blank" rel="noopener">Lancet COVID-19 Commission Report</a>, the{" "}
                  <a href="https://s3.amazonaws.com/sustainabledevelopment.report/2020/2020_sustainable_development_report.pdf" target="_blank" rel="noopener">UN Sustainable Development Report 2020</a>, and the{" "}
                  <a href="https://www.bcentral.cl/documents/33528/2369613/mpr_june_2020.pdf/d04d0e14-8445-f636-005f-a1738b3d1ff4?t=1594834348797" target="_blank" rel="noopener">Central Bank of Chile Monetary Policy Report (June 2020)</a>.
                </span>
              </div>
            )}
          </div>
        ))}
      </section>
      <section>
        <h4>// working papers</h4>
        {D.PAPERS.filter(p => p.tag === "WP №941").map((p,i)=>(
          <div className="pp" key={i}>
            <div>
              <span className="yr">{p.yr}</span>
              {p.pdf
                ? <a className="ttl" href={p.pdf} target="_blank" rel="noopener"><b>{p.title}</b></a>
                : <b>{p.title}</b>}
            </div>
            <div className="au"><AuthorList paper={p} /> · {p.venue}</div>
            {p.pdf && (
              <div className="links" style={{marginTop:8}}>
                <a href={p.pdf} target="_blank" rel="noopener">pdf ↗</a>
              </div>
            )}
          </div>
        ))}
      </section>
      <section>
        <h4>// work in progress</h4>
        {D.PAPERS.filter(p => p.tag === "DRAFT").map((p,i)=>(
          <div className="pp" key={i}>
            <div><span className="yr">{p.yr}</span><b>{p.title}</b></div>
            <div className="au"><AuthorList paper={p} /> · {p.venue}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

function TeachingPage({ onBack }) {
  const D = window.SITE_DATA;
  return (
    <div className="subp" style={{"--accent": "var(--nav-1)"}}>
      <PageHeader
        onBack={onBack}
        crumb="teaching"
        title="Teaching"
        lede="Courses taught and TA appointments. Materials available on request."
      />
      <section>
        <h4>// courses & TA</h4>
        {D.COURSES.map((c,i)=>(
          <div className="course" key={i}>
            <div className="code"><CourseCode code={c.code} /></div>
            <div className="name">{c.name}<small>{c.sub}</small></div>
            <div className="where">{c.where}</div>
          </div>
        ))}
        <div className="footnote">
          <span className="mark">*</span> Southern-hemisphere academic calendar — Fall runs Aug–Dec, Spring runs Mar–Jul.
        </div>
      </section>
      <section>
        <h4>// student references on request</h4>
        <div style={{font:"13px/1.6 var(--sans)", color:"var(--fg-dim)"}}>
          For letters of reference or syllabi, contact <span style={{color:"var(--accent)", fontFamily:"var(--mono)"}}>crondon[at]bcentral.cl</span>.
        </div>
      </section>
    </div>
  );
}

function ServicePage({ onBack }) {
  const D = window.SITE_DATA;
  return (
    <div className="subp" style={{"--accent": "var(--nav-2)"}}>
      <PageHeader
        onBack={onBack}
        crumb="service"
        title="Service"
        lede="Elected positions in the computational-economics community, plus conferences and workshops I've organized or co-organized."
      />
      <section>
        <h4>// elected positions</h4>
        {D.SERVICE.filter(s => s.cat === "society").map((s,i)=>(
          <div className="course" key={i}>
            <div className="code"><CourseCode code={s.when} /></div>
            <div className="name">
              {s.orgUrl
                ? <a className="ttl" href={s.orgUrl} target="_blank" rel="noopener">{s.org}</a>
                : s.org}
              <small>{s.body}</small>
              <small>{s.where}</small>
            </div>
            <div className="where">{s.role}</div>
          </div>
        ))}
      </section>
      <section>
        <h4>// conferences & workshops</h4>
        {D.SERVICE.filter(s => s.cat !== "society").map((s,i)=>(
          <div className="course" key={i}>
            <div className="code"><CourseCode code={s.when} /></div>
            <div className="name">
              {s.orgUrl
                ? <a className="ttl" href={s.orgUrl} target="_blank" rel="noopener">{s.org}</a>
                : s.org}
              <small>{s.body}</small>
              <small>{s.where}</small>
            </div>
            <div className="where">{s.role}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

window.ResearchPage = ResearchPage;
window.TeachingPage = TeachingPage;
window.ServicePage = ServicePage;
