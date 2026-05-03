// Shared content: papers, courses, palette swatches, command items.

const PALETTE_4 = {
  teal: "#029386",
  sky: "#75bbfd",
  gold: "#fac205",
  red: "#e50000",
};

const XKCD_SWATCHES = [
  { name: "teal",      hex: "#029386" },
  { name: "sky blue",  hex: "#75bbfd" },
  { name: "goldenrod", hex: "#fac205" },
  { name: "red",       hex: "#e50000" },
  { name: "purple",    hex: "#9a0eea" },
  { name: "magenta",   hex: "#c20078" },
  { name: "kelly grn", hex: "#02ab2e" },
  { name: "orange",    hex: "#fdaa48" },
  { name: "robin egg", hex: "#13eac9" },
];

const FONT_PAIRS = [
  { id: "mono-serif", label: "Mono · Serif", sans: '"Inter", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', serif: '"Source Serif 4", Georgia, serif' },
  { id: "geist-mono", label: "Geist · Mono", sans: '"Geist", "Inter", sans-serif',     mono: '"Geist Mono", ui-monospace, monospace', serif: '"Source Serif 4", Georgia, serif' },
  { id: "ibm-plex",   label: "IBM Plex",     sans: '"IBM Plex Sans", sans-serif',      mono: '"IBM Plex Mono", monospace',            serif: '"IBM Plex Serif", Georgia, serif' },
  { id: "jb-helv",    label: "Helvetica · JB", sans: '"Helvetica Neue", Helvetica, Arial, sans-serif', mono: '"JetBrains Mono", monospace', serif: '"Iowan Old Style", "Source Serif 4", Georgia, serif' },
];

const PAPERS = [
  {
    yr: "2025",
    tag: "PUBLISHED",
    venue: "Journal of International Economics, Vol 157, September 2025",
    title: "Overborrowing and Systemic Externalities in the Business Cycle Under Imperfect Information",
    authors: "with Juan Herreño",
    coauthors: [
      { name: "Juan Herreño", url: "https://sites.google.com/view/juanherreno" },
    ],
    pdf: "https://doi.org/10.1016/j.jinteco.2025.104103",
    github: "https://github.com/crondonm/Overborrowing_Replication_HR2025",
    appendix: "https://github.com/crondonm/Overborrowing_Replication_HR2025/blob/main/OnlineAppendix_Overborrowing.pdf",
    short: "overborrowing.imperfect-info",
  },
  {
    yr: "2022",
    tag: "WP №941",
    venue: "Central Bank of Chile WP",
    title: "Debt and Taxes: Optimal Fiscal Consolidation in the Small Open Economy",
    authors: "solo-authored",
    coauthors: [],
    pdf: "https://www.bcentral.cl/en/content/-/details/working-papers-n-941",
    short: "debt.taxes",
  },
  {
    yr: "2021",
    tag: "PLOS ONE",
    venue: "PLoS ONE 16(1): e0244474",
    title: "Tracking R of COVID-19: A New Real-time Estimation Using the Kalman Filter",
    authors: "with Arroyo-Marioli, Bullano, Kucinskas",
    coauthors: [
      { name: "Francisco Arroyo-Marioli", url: "https://www.worldbank.org/en/about/people/f/francisco-arroyo-marioli" },
      { name: "Francisco Bullano", url: "https://franciscobullano.com/" },
      { name: "Simas Kucinskas", url: "https://www.simaskucinskas.com" },
    ],
    pdf: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0244474",
    github: "https://github.com/crondonm/TrackingR",
    short: "covid.R.kalman",
  },
  {
    yr: "WIP",
    tag: "DRAFT",
    venue: "in progress",
    title: "On the Optimality of Inflation Targeting in Emerging Economies with Downward Wage Rigidities",
    authors: "with A. Fernández, M. Uribe, S. Schmitt-Grohé",
    coauthors: [
      { name: "Andrés Fernández", url: "https://sites.google.com/site/andresfernandezmartin8/" },
      { name: "Martín Uribe", url: "http://www.columbia.edu/~mu2166/" },
      { name: "Stephanie Schmitt-Grohé", url: "http://www.columbia.edu/~ss3501/" },
    ],
    short: "inflation.targeting.em",
  },
  {
    yr: "WIP",
    tag: "DRAFT",
    venue: "in progress",
    title: "Sovereign Wealth Funds and Foreign Reserves Accumulation",
    authors: "with M. Acosta-Henao, H. Martinez",
    coauthors: [
      { name: "Miguel Acosta-Henao", url: "http://www.miguelacostah.com/" },
      { name: "Humberto Martinez", url: "https://www.humbertomartinezb.com/" },
    ],
    short: "swf.reserves",
  },
];

const COURSES = [
  { code: "Fall\n2026*", name: "Macroeconomics", sub: "Department of Industrial Engineering · Universidad de Chile, Santiago, Chile", where: "Instructor" },
  { code: "Spring\n2025*", name: "Open Economy Macroeconomics — Master Level", sub: "Department of Economics · Universidad de Chile, Santiago, Chile", where: "Instructor" },
  { code: "Fall\n2024-25*", name: "Macroeconomics II — Master Level", sub: "Universidad Adolfo Ibáñez, Santiago, Chile", where: "Instructor" },
  { code: "Spring\n2023-24*", name: "Macroeconomics I", sub: "Department of Economics · Universidad de Chile, Santiago, Chile", where: "Instructor" },
  { code: "Fall 2017 —\nSpring 2018", name: "Principles of Macroeconomics", sub: "Department of Economics · University of Notre Dame, IN, US", where: "Instructor" },
  { code: "Spring\n2016-17", name: "Macroeconomics II — Ph.D. first-year core", sub: "Department of Economics · University of Notre Dame, IN, US", where: "Teaching Assistant" },
  { code: "Fall\n2018", name: "Principles of Statistics and Econometrics I", sub: "Department of Economics · University of Notre Dame, IN, US", where: "Teaching Assistant" },
];

const SERVICE = [
  {
    when: "January\n2026",
    org: "Society for Computational Economics",
    orgUrl: "https://comp-econ.com/about/#advisorycouncil",
    body: "Advisory Council",
    role: "Acting Secretary",
    where: "Elected officer",
    cat: "society",
  },
  {
    when: "July\n2025",
    org: "Society for Computational Economics",
    orgUrl: "https://comp-econ.com/31st-conference/",
    body: "31st International Conference on Computing in Economics and Finance",
    role: "Organizer & Scientific Committee Co-Chair",
    where: "Universidad de Chile · Santiago, Chile",
    cat: "conference",
  },
  {
    when: "July\n2025",
    org: "Central Bank of Chile & Center for Latin American Monetary Studies (CEMLA)",
    body: "Heterogeneous Agents Models: A Toolkit for Central Banks",
    role: "Organizer",
    where: "Santiago, Chile",
    cat: "conference",
  },
  {
    when: "2024-26",
    org: "Central Bank of Chile",
    orgUrl: "https://www.bcentral.cl/en/web/banco-central/weekly-seminar",
    body: "Research Department Weekly Seminar",
    role: "Organizer",
    where: "Santiago, Chile",
    cat: "conference",
  },
  {
    when: "May\n2024",
    org: "Central Bank of Chile & QuantEcon",
    orgUrl: "https://github.com/QuantEcon/cbc_2024",
    body: "Advanced Scientific Computing Workshop",
    role: "Organizer",
    where: "Central Bank of Chile · Santiago, Chile",
    cat: "conference",
  },
  {
    when: "September\n2023",
    org: "Central Bank of Chile & International Monetary Fund",
    body: "Integrated Policy Framework: A Toolkit for Policy-Makers",
    role: "Co-organizer",
    where: "Santiago, Chile",
    cat: "conference",
  },
  {
    when: "September\n2022",
    org: "Central Bank of Chile & QuantEcon",
    body: "Scientific Computing Workshop",
    role: "Co-organizer",
    where: "Santiago, Chile",
    cat: "conference",
  },
];

const CMD_ITEMS = [
  { ic: "→", label: "Go to Research",  desc: "g r",   action: "page:research" },
  { ic: "→", label: "Go to Teaching",  desc: "g t",   action: "page:teaching" },
  { ic: "→", label: "Go to Service",   desc: "g s",   action: "page:service"  },
  { ic: "↩", label: "Go to Home",      desc: "g h",   action: "page:home"     },
  { ic: "↗", label: "Open CV (PDF)",   desc: "extern",  action: "ext:cv"      },
  { ic: "↗", label: "GitHub · @crondonm", desc: "extern", action: "ext:gh"   },
  { ic: "↗", label: "Google Scholar",     desc: "extern", action: "ext:gs"   },
  { ic: "✱", label: "Cycle accent color", desc: "tweak",  action: "tw:accent" },
  { ic: "◐", label: "Toggle background pattern", desc: "tweak", action: "tw:pat" },
  { ic: "Aa", label: "Cycle font pairing", desc: "tweak", action: "tw:font" },
  { ic: "✕", label: "Close palette",   desc: "esc",   action: "close" },
];

window.SITE_DATA = { PALETTE_4, XKCD_SWATCHES, FONT_PAIRS, PAPERS, COURSES, SERVICE, CMD_ITEMS };
