import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marchad Sohan — Software Developer" },
      { name: "description", content: "Portfolio of Marchad Sohan — full-stack developer and AI/ML engineer based in Bangalore. Building intelligent, scalable web products." },
      { property: "og:title", content: "Marchad Sohan — Software Developer" },
      { property: "og:description", content: "Full-stack developer and AI/ML engineer based in Bangalore." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: Portfolio,
});

const projects = [
  {
    title: "Cloud-Based Carbon Footprint Prediction",
    desc: "End-to-end AI system using TensorFlow, XGBoost, and Streamlit with blockchain smart contracts for transparent carbon credit verification.",
    tags: ["Python", "TensorFlow", "AWS", "Web3.py"],
    year: "2025",
  },
  {
    title: "Virtual Try-On System",
    desc: "Real-time eyewear try-on using facial landmark detection and CP-VTON, with a Flask interface for interactive fitting.",
    tags: ["OpenCV", "Flask", "CP-VTON"],
    year: "2024",
  },
  {
    title: "Emotion-Based Music Recommender",
    desc: "CNN-based facial emotion detection paired with the Spotify API to surface music that matches the listener's mood in real time.",
    tags: ["TensorFlow", "OpenCV", "Spotify API"],
    year: "2024",
  },
  {
    title: "Red Wine Quality Testing",
    desc: "ML pipeline predicting wine quality from physicochemical data — preprocessing, feature selection, and ensemble models.",
    tags: ["Pandas", "Scikit-learn", "Random Forest"],
    year: "2023",
  },
];

const skills = {
  Languages: ["Java", "Python", "C++", "JavaScript", "SQL"],
  Frontend: ["React.js", "HTML", "CSS", "Tailwind"],
  Backend: ["Node.js", "Express.js", "Flask"],
  "AI / ML": ["LLM", "TensorFlow", "XGBoost", "Scikit-learn", "OpenCV"],
  "Data & Cloud": ["MongoDB", "MySQL", "AWS", "Docker"],
  Tools: ["Git", "Postman", "Streamlit"],
};

function Portfolio() {
  return (
    <div className="min-h-screen grain-bg">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display font-semibold tracking-tight">
            marchad<span className="text-accent">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition">About</a>
            <a href="#work" className="hover:text-foreground transition">Work</a>
            <a href="#skills" className="hover:text-foreground transition">Skills</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </nav>
          <a
            href="mailto:marchadsohangoud@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
          >
            Let's talk <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="pt-40 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground mb-8">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Available for Software Developer & AI/ML roles
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-semibold leading-[0.95] tracking-tight text-balance">
            Building intelligent
            <br />
            web products with{" "}
            <span className="italic font-normal text-accent">code</span> &{" "}
            <span className="italic font-normal text-accent">curiosity</span>.
          </h1>
          <div className="mt-12 grid md:grid-cols-3 gap-8 items-end">
            <p className="md:col-span-2 text-lg text-muted-foreground max-w-2xl">
              I'm <span className="text-foreground">Marchad Sohan</span> — a final-year B.Tech student at Dayananda Sagar University, full-stack developer, and AI/ML engineer crafting scalable solutions from Bangalore.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" /> Bangalore, India
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="font-mono text-accent">CGPA</span> 8.58 / 10
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="font-mono text-accent">IEEE</span> 2× Published Author
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="border-y border-border bg-card/40 py-6 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap font-display text-2xl md:text-3xl text-muted-foreground animate-[scroll_30s_linear_infinite]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              {["Full-Stack Development", "AI / ML Engineering", "Cloud Solutions", "Data Science", "Research", "Open Source"].map((t) => (
                <span key={t} className="flex items-center gap-12">
                  {t} <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes scroll { to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* About */}
      <section id="about" className="py-32 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">01 — About</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold">A developer who ships, learns, and publishes.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg text-muted-foreground">
            <p>
              I'm a motivated software engineer with a strong appetite for tackling complex problems — from end-to-end ML systems to scalable web backends.
            </p>
            <p>
              My work spans full-stack development with <span className="text-foreground">React & Node.js</span>, AI/ML pipelines with <span className="text-foreground">TensorFlow</span>, and cloud-native deployments on <span className="text-foreground">AWS</span>. I'm currently an AI/ML Intern at Innovexis and pursuing the DRISHTI CPS IIT Indore certification.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
            <div>
                <div className="font-display text-3xl text-foreground">8.58</div>
                <div className="text-xs uppercase tracking-wider mt-1">CGPA</div>
              </div>
              <div>
                <div className="font-display text-3xl text-foreground">2×</div>
                <div className="text-xs uppercase tracking-wider mt-1">IEEE Papers</div>
              </div>
              <div>
                <div className="font-display text-3xl text-foreground">4+</div>
                <div className="text-xs uppercase tracking-wider mt-1">ML Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">02 — Selected Work</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold">Recent projects</h2>
            </div>
            <a href="https://github.com/Marchadsohan" target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition">
              All on GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <article
                key={p.title}
                className="group relative rounded-2xl bg-card border border-border p-8 hover:border-accent/60 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs text-muted-foreground">/ 0{i + 1}</span>
                  <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4 group-hover:text-accent transition">
                  {p.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="absolute top-8 right-8 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-accent transition" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">03 — Stack</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-16">Tools I build with</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="bg-background p-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">{group}</h3>
                <ul className="space-y-3">
                  {items.map((s) => (
                    <li key={s} className="text-lg">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Experience */}
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">04 — Education</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">Academic journey</h2>
            <div className="space-y-8">
              {[
                { y: "2022 — 2026", t: "B.Tech, Computer Science", s: "Dayananda Sagar University · CGPA 8.58" },
                { y: "2022", t: "Pre-University (PCMC)", s: "Jnanaamrutha PU College · 93%" },
                { y: "2020", t: "Secondary School", s: "Visweswaraiah High School · 78%" },
              ].map((e) => (
                <div key={e.t} className="flex gap-6 pb-8 border-b border-border last:border-0">
                  <div className="font-mono text-xs text-muted-foreground w-32 shrink-0 pt-1">{e.y}</div>
                  <div>
                    <h3 className="font-display text-xl font-medium">{e.t}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{e.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">05 — Beyond Code</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">Recognition & more</h2>
            <div className="space-y-6">
              {[
                { t: "IEEE Publication — 2026", s: "Real-Time Carbon Footprint Prediction and Optimization" },
                { t: "IEEE Publication — 2025", s: "Virtual Try-On System" },
                { t: "AI/ML Intern", s: "Innovexis" },
                { t: "CodeVita 2025", s: "TCS Global Coding Contest Participant" },
                { t: "Certifications", s: "C++ International · Linux Bash Scripting · DRISHTI CPS IIT Indore (ongoing)" },
              ].map((e) => (
                <div key={e.t} className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-medium">{e.t}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{e.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">06 — Contact</p>
          <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-balance mb-12">
            Have a project in mind? <br />
            <span className="text-muted-foreground">Let's build it together.</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:marchadsohangoud@gmail.com"
              className="inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground px-6 py-4 font-medium hover:opacity-90 transition"
            >
              <Mail className="h-5 w-5" />
              marchadsohangoud@gmail.com
            </a>
            <a
              href="tel:+919008451473"
              className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-4 font-medium hover:border-accent transition"
            >
              <Phone className="h-5 w-5 text-accent" />
              +91 90084 51473
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Marchad Sohan. Crafted with care in Bangalore.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Marchadsohan" target="_blank" rel="noreferrer" className="hover:text-accent transition" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/marchad-sohan" target="_blank" rel="noreferrer" className="hover:text-accent transition" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:marchadsohangoud@gmail.com" className="hover:text-accent transition" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
