import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Code2,
  BrainCircuit,
} from "lucide-react";
import { useEffect, useState } from "react";
import { sendContactEmail } from "../functions/contact.server";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MARCHAD SOHAN — Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of MARCHAD SOHAN — fresher software developer and AI/ML engineer based in Bangalore. Open to full-time roles in software development and AI/ML.",
      },
      { property: "og:title", content: "MARCHAD SOHAN — Software Developer" },
      {
        property: "og:description",
        content:
          "Fresher software developer and AI/ML engineer based in Bangalore, open to full-time opportunities.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
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
    link: "https://github.com/Marchadsohan",
  },
  {
    title: "Virtual Try-On System",
    desc: "Real-time eyewear try-on using facial landmark detection and CP-VTON, with a Flask interface for interactive fitting.",
    tags: ["OpenCV", "Flask", "CP-VTON"],
    year: "2024",
    link: "https://github.com/Marchadsohan",
  },
  {
    title: "Emotion-Based Music Recommender",
    desc: "CNN-based facial emotion detection paired with the Spotify API to surface music that matches the listener's mood in real time.",
    tags: ["TensorFlow", "OpenCV", "Spotify API"],
    year: "2024",
    link: "https://github.com/Marchadsohan",
  },
  {
    title: "Red Wine Quality Testing",
    desc: "ML pipeline predicting wine quality from physicochemical data — preprocessing, feature selection, and ensemble models.",
    tags: ["Pandas", "Scikit-learn", "Random Forest"],
    year: "2023",
    link: "https://github.com/Marchadsohan",
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

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function Portfolio() {
  const [downloads, setDownloads] = useState<number>(0);
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/data/resume-downloads.json", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") setDownloads(data.count);
      })
      .catch(() => setDownloads(0));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeDownload = async () => {
    setDownloads((prev) => prev + 1);
    try {
      // Trigger the server counter in the background
      fetch("/download-resume").catch(() => {});

      // Fetch the file and force download via a Blob
      const response = await fetch("/resume.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Marchad-Sohan-Resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file programmatically:", error);
      // Fallback: trigger standard navigation
      window.location.href = "/download-resume";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const result = await sendContactEmail({
        data: form as unknown as undefined,
      });
      if (result?.success) {
        setSuccessMessage("Your message has been sent! I'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen grain-bg">
      {/* ── Nav ── */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display font-bold tracking-tight text-lg">
            MS<span className="text-accent">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition">About</a>
            <a href="#work" className="hover:text-foreground transition">Work</a>
            <a href="#skills" className="hover:text-foreground transition">Skills</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResumeDownload}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent transition"
            >
              <Download className="h-4 w-4" />
              Resume
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Hire me <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="pt-40 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent mb-8">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Open to full-time roles — Software Development & AI/ML
          </div>

          <p className="font-mono text-sm text-muted-foreground mb-4 tracking-widest uppercase">
            Hi, I'm
          </p>

          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold leading-[0.9] tracking-tight text-balance uppercase">
            MARCHAD
            <br />
            <span className="text-accent">SOHAN</span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
              <Code2 className="h-4 w-4 text-accent" /> Software Developer
            </span>
            <span className="text-muted-foreground">×</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
              <BrainCircuit className="h-4 w-4 text-accent" /> AI / ML Engineer
            </span>
          </div>

          <p className="mt-10 text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Final-year B.Tech student from Dayananda Sagar University, Bangalore —
            passionate about building production-grade web products and intelligent
            ML systems. Ready to contribute from day one.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={handleResumeDownload}
              className="inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground px-7 py-3.5 font-medium hover:opacity-90 transition"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-3.5 font-medium hover:border-accent hover:text-accent transition"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
            <a
              href="https://github.com/Marchadsohan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-3.5 font-medium hover:border-accent hover:text-accent transition"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-10 text-sm border-t border-border pt-10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" /> Bangalore, India
            </div>
            <div className="text-muted-foreground">
              <span className="font-mono text-accent mr-2">CGPA</span>8.58 / 10
            </div>
            <div className="text-muted-foreground">
              <span className="font-mono text-accent mr-2">IEEE</span>2× Published Author
            </div>
            <div className="text-muted-foreground">
              <span className="font-mono text-accent mr-2">Resume</span>
              {downloads} downloads
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="border-y border-border bg-card/40 py-5 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap font-display text-xl md:text-2xl text-muted-foreground animate-[scroll_30s_linear_infinite]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              {[
                "Full-Stack Development",
                "AI / ML Engineering",
                "Cloud Solutions",
                "Data Science",
                "IEEE Research",
                "Open to Work",
              ].map((t) => (
                <span key={t} className="flex items-center gap-12">
                  {t} <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes scroll { to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ── About ── */}
      <section id="about" className="py-32 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
              01 — About
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold">
              Fresher. Driven. Ready to ship.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg text-muted-foreground">
            <p>
              I'm a final-year Computer Science student with hands-on experience in
              full-stack web development and AI/ML engineering. I've built and
              published production-ready projects, co-authored IEEE papers, and
              interned as an AI/ML engineer at Innovexis.
            </p>
            <p>
              I'm actively looking for my{" "}
              <span className="text-foreground font-medium">first full-time role</span>{" "}
              in software development or AI/ML where I can grow fast, ship real
              products, and work with driven teams. I'm comfortable with{" "}
              <span className="text-foreground">React, Node.js, Python, TensorFlow</span>, and{" "}
              <span className="text-foreground">AWS</span>.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border">
              <div>
                <div className="font-display text-3xl text-foreground font-bold">8.58</div>
                <div className="text-xs uppercase tracking-wider mt-1">CGPA</div>
              </div>
              <div>
                <div className="font-display text-3xl text-foreground font-bold">2×</div>
                <div className="text-xs uppercase tracking-wider mt-1">IEEE Papers</div>
              </div>
              <div>
                <div className="font-display text-3xl text-foreground font-bold">4+</div>
                <div className="text-xs uppercase tracking-wider mt-1">ML Projects</div>
              </div>
              <div>
                <div className="font-display text-3xl text-foreground font-bold">∞</div>
                <div className="text-xs uppercase tracking-wider mt-1">Curiosity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
                02 — Selected Work
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold">
                Projects I've built
              </h2>
            </div>
            <a
              href="https://github.com/Marchadsohan"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition"
            >
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
                  <span className="font-mono text-xs text-muted-foreground">
                    / 0{i + 1}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {p.year}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 group-hover:text-accent transition">
                  {p.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 rounded-2xl"
                  aria-label={`View ${p.title} on GitHub`}
                />
                <ArrowUpRight className="absolute top-8 right-8 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-accent transition" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-32 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
            03 — Stack
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-16">
            Tools I build with
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="bg-background p-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                  {group}
                </h3>
                <ul className="space-y-3">
                  {items.map((s) => (
                    <li key={s} className="text-base text-muted-foreground hover:text-foreground transition">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education + Experience ── */}
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
              04 — Education
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">
              Academic background
            </h2>
            <div className="space-y-8">
              {[
                {
                  y: "2022 — 2026",
                  t: "B.Tech, Computer Science",
                  s: "Dayananda Sagar University · CGPA 8.58",
                },
                {
                  y: "2022",
                  t: "Pre-University (PCMC)",
                  s: "Jnanaamrutha PU College · 93%",
                },
                {
                  y: "2020",
                  t: "Secondary School",
                  s: "Visweswaraiah High School · 78%",
                },
              ].map((e) => (
                <div
                  key={e.t}
                  className="flex gap-6 pb-8 border-b border-border last:border-0"
                >
                  <div className="font-mono text-xs text-muted-foreground w-32 shrink-0 pt-1">
                    {e.y}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium">{e.t}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{e.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
              05 — Recognition
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">
              Achievements & experience
            </h2>
            <div className="space-y-4">
              {[
                {
                  t: "AI/ML Intern — Innovexis",
                  s: "Hands-on industry experience in AI/ML product development",
                  highlight: true,
                },
                {
                  t: "IEEE Publication — 2026",
                  s: "Real-Time Carbon Footprint Prediction and Optimization",
                  highlight: false,
                },
                {
                  t: "IEEE Publication — 2025",
                  s: "Virtual Try-On System using Facial Landmark Detection",
                  highlight: false,
                },
                {
                  t: "TCS CodeVita 2025",
                  s: "Qualified for TCS Global Coding Contest",
                  highlight: false,
                },
                {
                  t: "Certifications",
                  s: "C++ International · Linux Bash Scripting · DRISHTI CPS IIT Indore",
                  highlight: false,
                },
              ].map((e) => (
                <div
                  key={e.t}
                  className={`p-6 rounded-xl border transition ${
                    e.highlight
                      ? "bg-accent/10 border-accent/30 text-foreground"
                      : "bg-card border-border"
                  }`}
                >
                  <h3 className="font-medium">{e.t}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{e.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-32 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[32px] overflow-hidden border border-border bg-[#061225]">
            <div className="grid lg:grid-cols-2">
              {/* Left */}
              <div className="p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                  Let's talk about everything!
                </h2>
                <p className="mt-6 text-lg text-slate-300 max-w-lg leading-relaxed">
                  I'm actively looking for my first full-time role. Don't like
                  forms? Send me an email directly — I usually respond within 24
                  hours.
                </p>

                <div className="mt-12 space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">Email</div>
                      <a
                        href="mailto:marchadsohangoud@gmail.com"
                        className="text-slate-300 hover:text-sky-400 transition text-sm"
                      >
                        marchadsohangoud@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">Location</div>
                      <div className="text-slate-300 text-sm">Bangalore, India</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <Linkedin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">LinkedIn</div>
                      <a
                        href="https://linkedin.com/in/marchad-sohan"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-300 hover:text-sky-400 transition text-sm"
                      >
                        linkedin.com/in/marchad-sohan
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <Github className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">GitHub</div>
                      <a
                        href="https://github.com/Marchadsohan"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-300 hover:text-sky-400 transition text-sm"
                      >
                        github.com/Marchadsohan
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    onClick={handleResumeDownload}
                    className="inline-flex items-center gap-3 rounded-full border border-slate-600 px-6 py-3 text-white text-sm hover:border-cyan-400 hover:text-cyan-300 transition"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                    <span className="font-mono text-xs text-slate-400 ml-1">
                      ({downloads})
                    </span>
                  </button>
                </div>
              </div>

              {/* Right — Form */}
              <div className="p-8 md:p-12 lg:p-14">
                <p className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-8">
                  06 — Contact
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-3 text-sm">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="w-full rounded-2xl border border-slate-700 bg-[#0a1730] px-5 py-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-3 text-sm">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className="w-full rounded-2xl border border-slate-700 bg-[#0a1730] px-5 py-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 transition text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3 text-sm">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleInputChange}
                      placeholder="Job Opportunity / Project Inquiry"
                      required
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1730] px-5 py-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3 text-sm">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about the role or project..."
                      required
                      rows={6}
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1730] px-5 py-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 transition resize-none text-sm"
                    />
                  </div>

                  {successMessage && (
                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300 text-sm">
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 px-6 py-5 text-lg font-semibold text-slate-950 hover:opacity-95 disabled:opacity-70 transition"
                  >
                    <Send className="h-5 w-5" />
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © 2026{" "}
            <span className="font-semibold text-foreground">MARCHAD SOHAN</span>.
            Built from scratch in Bangalore.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Marchadsohan"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/marchad-sohan"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:marchadsohangoud@gmail.com"
              className="hover:text-accent transition"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}