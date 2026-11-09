import { useEffect, useMemo, useRef, useState } from "react";

import "./App.css";

const projects = [
  {
    number: "01",
    type: "AI / RAG",
    title: "AI Codebase Explainer",
    image: "/projects/ai-codebase-explainer.png",
    description:
      "An AI-powered repository intelligence platform that parses codebases, creates embeddings, retrieves relevant context and visualizes dependencies.",
    stack: ["React", "Node.js", "RAG", "Supabase", "Vector DB", "React Flow"],
    accent: "cyan",
    liveUrl: "https://codebase-explainer.netlify.app/",
    githubUrl: "https://github.com/Tanya1203/Codebase-Explainer",
  },
  {
    number: "02",
    type: "FULL-STACK",
    title: "Food Delivery Platform",
    image: "/projects/food-delivery.png",
    description:
      "A complete MERN food-ordering experience with responsive UI, authentication, restaurant browsing and an end-to-end ordering flow.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    accent: "violet",
    liveUrl: "#",
    githubUrl: "https://github.com/Tanya1203",
  },
  {
    number: "03",
    type: "PRODUCTIVITY",
    title: "Expense Tracker",
    image: "/projects/expense-tracker.png",
    description:
      "A clean personal-finance experience for tracking spending, understanding categories and making everyday money management simpler.",
    stack: ["React", "Node.js", "MongoDB"],
    accent: "pink",
    liveUrl: "#",
    githubUrl: "https://github.com/Tanya1203/Expense-Tracker",
  },
  {
    number: "04",
    type: "FRONTEND",
    title: "Netflix Clone",
    image: "/projects/netflix-clone.png",
    description:
      "A streaming-inspired interface focused on visual hierarchy, discovery and responsive interactions across screen sizes.",
    stack: ["React", "JavaScript", "REST API", "CSS"],
    accent: "orange",
    liveUrl: "#",
    githubUrl: "https://github.com/Tanya1203/Project1-Netflix-Clone",
  },
];

const achievements = [
  {
    title: "Rising Star",
    subtitle: "LeewayHertz · 2026",
    description:
      "Recognition for impact, ownership and contribution to product engineering.",
    image: "/achievements/rising-star-2026.jpg",
  },
  {
    title: "Employee of the Quarter",
    subtitle: "Q2 · 2026",
    description:
      "Recognition for consistent execution, collaboration and meaningful delivery.",
    image: "/achievements/employee-quarter-q2-2026.png",
  }
];

const techGroups = {
  "Build": ["React.js", "JavaScript", "Node.js", "Express.js", "REST APIs", "HTML5", "CSS3"],
  "AI / Data": ["RAG", "LLMs", "AI Agents", "Embeddings", "Vector DB", "Prompt Engineering", "OCR"],
  "Backend / DB": ["MongoDB", "PostgreSQL", "MySQL", "Supabase", "SQL", "Webhooks"],
  "Cloud / Tools": ["Azure Logic Apps", "Git", "GitHub", "Postman", "Jira", "Salesforce", "CI/CD"],
};

const journey = [
  {
    year: "2025 — NOW",
    title: "Software Developer",
    company: "LeewayHertz",
    text: "Building full-stack products and AI-powered enterprise workflows across React, Node.js, RAG and LLM integrations.",
  },
  {
    year: "2025",
    title: "Software Developer Intern",
    company: "LeewayHertz",
    text: "Worked on RAG agents, Salesforce case intelligence and AI-driven product experiences.",
  },
  {
    year: "2023 — 2025",
    title: "MCA · Computer Science",
    company: "Chandigarh Group of Colleges",
    text: "Advanced computer science study with a strong focus on software engineering and applied problem solving.",
  },
  {
    year: "2019 — 2022",
    title: "B.Sc. · Computer Science",
    company: "Panjab University",
    text: "Built the foundations in programming, algorithms, databases and computer science.",
  },
];

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    external: <><path d="M14 5h5v5" /><path d="M10 14 19 5" /><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></>,
    github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.7-1.6 6.7-7A5.4 5.4 0 0 0 19.2 4 5 5 0 0 0 19 1.8S17.8 1.4 15 3a13.4 13.4 0 0 0-6 0C6.2 1.4 5 1.8 5 1.8A5 5 0 0 0 4.8 4a5.4 5.4 0 0 0-1.5 3.5c0 5.4 3.4 6.6 6.7 7A4.8 4.8 0 0 0 9 18v4" /><path d="M9 18c-4.5 2-5-2-7-2" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><path d="M2 9h4v12H2z" /><path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    code: <><path d="m8 9-4 3 4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 5-4 14" /></>,
    play: <path d="m9 6 10 6-10 6V6Z" />,
    spark: <><path d="m12 3-1.4 5.1L6 10l4.6 1.9L12 17l1.4-5.1L18 10l-4.6-1.9L12 3Z" /><path d="m19 16-.6 2.4L16 19l2.4.6L19 22l.6-2.4L22 19l-2.4-.6L19 16Z" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    x: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
    trophy: <><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4v2a4 4 0 0 0 4 4" /><path d="M17 6h3v2a4 4 0 0 1-4 4" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function AchievementImage({ src, title }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="achievement-placeholder">
        <Icon name="trophy" size={34} />
        <span>Add recognition image</span>
        <small>{src}</small>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${title} recognition`}
      onError={() => setFailed(true)}
    />
  );
}

function BubbleStack({ skills }) {
  const containerRef = useRef(null);
  const bubbleRefs = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const spread = useRef([]);   // each bubble's "segregated" grid slot
  const cluster = useRef({ x: 0, y: 0 });
  const jitter = useRef([]);   // small random offset so clustered bubbles don't fully overlap
  const pos = useRef([]);      // live x/y + velocity per bubble

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const layout = () => {
      const w = el.clientWidth || 300;
      const cols = w < 520 ? 2 : w < 820 ? 3 : 4;
      const cellW = w / cols;
      const cellH = 78;
      const rows = Math.ceil(skills.length / cols);
      const fieldH = rows * cellH + 20;

      spread.current = skills.map((_, i) => ({
        x: cellW * (i % cols) + cellW / 2,
        y: Math.floor(i / cols) * cellH + 42,
      }));
      cluster.current = { x: w / 2, y: fieldH / 2 };
      jitter.current = skills.map(() => ({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
      }));
      // start every bubble clustered at the center
      pos.current = skills.map((_, i) => ({
        x: cluster.current.x + jitter.current[i].x,
        y: cluster.current.y + jitter.current[i].y,
        vx: 0, vy: 0,
      }));
      el.style.height = `${fieldH}px`;
    };
    layout();
    window.addEventListener("resize", layout);

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => { mouse.current.active = false; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onMove);

    let raf;
    const tick = () => {
      spread.current.forEach((slot, i) => {
        const p = pos.current[i];
        if (!p) return;

        let targetX, targetY;
        if (mouse.current.active) {
          // segregate: head toward this bubble's own grid slot, and get
          // an extra shove away from wherever the cursor actually is
          const dx = slot.x - mouse.current.x, dy = slot.y - mouse.current.y;
          const dist = Math.hypot(dx, dy) || 1;
          const repel = 110;
          const force = dist < repel ? (repel - dist) / repel : 0;
          targetX = slot.x + (dx / dist) * force * 38;
          targetY = slot.y + (dy / dist) * force * 38;
        } else {
          // no cursor activity: drift back into the clustered huddle
          targetX = cluster.current.x + jitter.current[i].x;
          targetY = cluster.current.y + jitter.current[i].y;
        }

        p.vx += (targetX - p.x) * 0.06;
        p.vy += (targetY - p.y) * 0.06;
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;

        const node = bubbleRefs.current[i];
        if (node) node.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", layout);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onMove);
      cancelAnimationFrame(raf);
    };
  }, [skills]);

  return (
    <div className="bubble-field" ref={containerRef}>
      <div className="bubble-hint">hover to spread them out</div>
      {skills.map((skill, i) => (
        <div key={skill} ref={(n) => (bubbleRefs.current[i] = n)} className="bubble" style={{ "--i": i }}>
          {skill}
        </div>
      ))}
    </div>
  );
}

function AchievementCard({ item }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-4px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <article className="achievement-card glass" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="achievement-image">
        <AchievementImage src={item.image} title={item.title} />
        <div className="image-sheen" />
      </div>
      <div className="achievement-info">
        <div className="achievement-icon"><Icon name="trophy" size={18} /></div>
        <div>
          <div className="achievement-subtitle">{item.subtitle}</div>
          <h3>{item.title}</h3>
        </div>
      </div>
      <p>{item.description}</p>
    </article>
  );
}

function ProjectShot({ project }) {
  const [loaded, setLoaded] = useState(false);
  if (!project.image) return null;
  return (
    <img
      className={`project-shot ${loaded ? "loaded" : ""}`}
      src={project.image}
      alt={`${project.title} interface preview`}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(false)}
    />
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className={`project-card project-${project.accent}`}>
      <div className="project-visual">
        <div className="project-grid-lines" />
        <div className="project-orb" />
        <div className="project-window">
          <div className="window-bar">
            <i /><i /><i />
            <span>{project.type}</span>
          </div>
          <div className="window-content">
            <div className="mini-line wide" />
            <div className="mini-line" />
            <div className="mini-row">
              <div />
              <div />
              <div />
            </div>
            <div className="mini-line short" />
          </div>
        </div>
        <ProjectShot project={project} />
        <div className="project-number">{project.number}</div>
      </div>

      <div className="project-body">
        <div className="project-kicker">{project.type}</div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-tags">
          {project.stack.map((item) => <span key={item}>{item}</span>)}
        </div>

        <div className="project-actions">
          <button onClick={() => onOpen(project)} className="project-details">
            View case <Icon name="arrow" size={15} />
          </button>
          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live ${project.title} project`}
            >
              Live <Icon name="external" size={14} />
            </a>
          )}
          <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>
            <Icon name="github" size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const videoRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTech, setActiveTech] = useState("Build");
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    const onPointerMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY, active: true });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = !entered ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [entered]);

  const handleEnter = () => {
    // Trigger the curtain-door split first, then swap to the
    // portfolio once the doors have finished sliding away.
    setOpening(true);

    window.setTimeout(() => {
      setEntered(true);

      const video = videoRef.current;
      if (!video) return;

      try {
        video.pause();
        video.currentTime = 0;
        video.volume = 1;
        video.muted = false;
        video.play().catch(async (error) => {
          console.warn("Avatar video could not start with audio:", error);
          video.muted = true;

          try {
            await video.play();
          } catch (fallbackError) {
            console.warn("Avatar video fallback failed:", fallbackError);
          }
        });
      } catch (error) {
        console.warn("Avatar video could not start:", error);
      }
    }, 820);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    setSending(true);
    setFormError("");

    try {
      const response = await fetch(
        "https://formspree.io/f/xgaajgdq",
        {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setFormError("Unable to send your message. Please try again.");
      }
    } catch (error) {
      setFormError("Something went wrong. Please try again later.");
    } finally {
      setSending(false);
    }
  };


  const activeSkills = useMemo(() => techGroups[activeTech], [activeTech]);

  return (
    <div className="portfolio">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div
        className="cursor-glow"
        style={{
          opacity: cursor.active ? 1 : 0,
          transform: `translate3d(${cursor.x - 38}px, ${cursor.y - 38}px, 0)`,
        }}
      />

      <video
        ref={videoRef}
        className="background-video"
        src="/avatar-background.mp4"
        playsInline
        preload="auto"
        onEnded={(event) => {
          event.currentTarget.pause();
          event.currentTarget.muted = true;
        }}
      />
      <div className="video-overlay" />

      {!entered && (
        <div className="entry-screen">
          <div className="entry-noise" />
          <div className={`entry-card ${opening ? "leaving" : ""}`}>
            <div className="entry-topline">
              <span className="status-dot" /> AVAILABLE FOR NEW BUILDS
            </div>
            <div className="entry-label">TANYA VINAIK</div>
            <h1>
              I build things
              <span> that think.</span>
            </h1>
            <p>
              Full-stack developer · AI/RAG engineer · curious human.
              Step inside and let the portfolio tell the story.
            </p>
            <button className="enter-button" onClick={handleEnter} disabled={opening}>
              <span className="enter-icon"><Icon name="play" size={15} /></span>
              {opening ? "Opening..." : "Enter portfolio"}
              <span className="enter-arrow"><Icon name="arrow" size={17} /></span>
            </button>
            <small><span>sound on</span> · avatar introduction plays once</small>
          </div>
          <div className="entry-corner entry-corner-left">01 / 06</div>
          <div className="entry-corner entry-corner-right">SCROLL TO EXPLORE</div>

          <div className={`curtain-door curtain-left ${opening ? "open" : ""}`} />
          <div className={`curtain-door curtain-right ${opening ? "open" : ""}`} />
        </div>
      )}

      {entered && (
        <main className="portfolio-content">
          <nav className="navbar">
            <a className="logo" href="#home" onClick={() => setMenuOpen(false)}>
              TV<span>.</span>
            </a>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              {[
                ["home", "Home"],
                ["about", "About"],
                ["work", "Work"],
                ["experience", "Journey"],
                ["skills", "Stack"],
                ["achievements", "Wins"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <a href="/resume.pdf" download className="nav-links-resume" onClick={() => setMenuOpen(false)}>
                <Icon name="download" size={13} /> Résumé
              </a>
            </div>

            <div className="nav-right">
              <a href="/resume.pdf" download className="nav-resume">
                <Icon name="download" size={13} /> Résumé
              </a>
              <a href="mailto:vinaiktanya@gmail.com" className="nav-contact">
                Let's talk <Icon name="arrow" size={14} />
              </a>
              <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                <Icon name={menuOpen ? "x" : "menu"} size={19} />
              </button>
            </div>
          </nav>

          <section id="home" className="hero">
            <div className="hero-content">
              <div className="eyebrow reveal">
                <span className="eyebrow-line" />
                FULL-STACK DEVELOPER · AI ENGINEER
              </div>
              <h1 className="hero-title">
                Building digital
                <br />
                experiences that <em>think.</em>
              </h1>
              <p className="hero-copy">
                I turn messy problems into clean products — from full-stack
                interfaces to RAG systems, AI agents and intelligent workflows.
              </p>

              <div className="hero-cta">
                <a href="#work" className="primary-button">
                  Explore my work <Icon name="arrow" size={16} />
                </a>
                <a href="#contact" className="secondary-button">
                  Start a conversation
                </a>
              </div>

              <div className="hero-micro">
                <span><i /> 1.5+ years shipping software</span>
                <span>React + Node + AI</span>
                <span>India · IST</span>
              </div>
            </div>

            <div className="hero-floating-card glass">
              <div className="live-pulse"><i /> CURRENTLY BUILDING</div>
              <strong>AI + human-friendly interfaces</strong>
              <span>RAG · Agents · Product experiences</span>
            </div>

            <div className="scroll-cue">
              <span>01</span>
              <div className="scroll-line" />
              <span>SCROLL</span>
            </div>
          </section>

          <section id="about" className="section about-section">
            <div className="section-intro">
              <div className="section-label">01 — ABOUT ME</div>
              <h2>
                Developer by code.
                <br />
                <span>Problem solver by nature.</span>
              </h2>
            </div>

            <div className="about-grid">
              <div className="about-copy glass">
                <div className="quote-mark">“</div>
                <p>
                  I'm a Full-Stack Software Developer focused on React.js,
                  Node.js and AI/RAG engineering. I like understanding the
                  problem behind the ticket — then building something that
                  feels obvious to the person using it.
                </p>
                <div className="about-signature">— Tanya</div>
              </div>

              <div className="about-stats">
                <div className="stat-card glass"><strong>1.5+</strong><span>Years experience</span></div>
                <div className="stat-card glass"><strong>AI ×</strong><span>Product engineering</span></div>
                <div className="stat-card glass"><strong>∞</strong><span>Things still to learn</span></div>
              </div>
            </div>

            <div className="principles">
              <div><span>01</span><strong>Make it useful</strong><p>Technology should remove friction, not create a new layer of it.</p></div>
              <div><span>02</span><strong>Make it clear</strong><p>Good engineering and good interfaces both respect attention.</p></div>
              <div><span>03</span><strong>Keep exploring</strong><p>I learn by building, breaking and rebuilding better.</p></div>
            </div>
          </section>

          <section id="work" className="section work-section">
            <div className="section-intro split-intro">
              <div>
                <div className="section-label">02 — SELECTED WORK</div>
                <h2>Things I've <span>built.</span></h2>
              </div>
              <p>Click into a project for the story, stack and review links. Replace the placeholder URLs with your deployed projects when you're ready.</p>
            </div>

            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} onOpen={setSelectedProject} />
              ))}
            </div>
          </section>

          <section id="experience" className="section journey-section">
            <div className="section-label">03 — THE JOURNEY</div>
            <div className="journey-heading">
              <h2>A little<br className="journey-title-break" /> <span>context.</span></h2>
              <p>Where curiosity turned into software I could ship.</p>
            </div>

            <div className="timeline">
              {journey.map((item, index) => (
                <div className="timeline-item" key={`${item.year}-${item.title}`}>
                  <div className="timeline-index">0{index + 1}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-content glass">
                    <div className="timeline-year">{item.year}</div>
                    <h3>{item.title}</h3>
                    <strong>{item.company}</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="skills" className="section stack-section">
            <div className="section-intro split-intro">
              <div>
                <div className="section-label">04 — INTERACTIVE STACK</div>
                <h2>Tools I <span>work with.</span></h2>
              </div>
              <p>Select a discipline to explore the toolkit.</p>
            </div>

            <div className="stack-interface">
              <div className="stack-tabs">
                {Object.keys(techGroups).map((group) => (
                  <button
                    key={group}
                    className={activeTech === group ? "active" : ""}
                    aria-pressed={activeTech === group}
                    onClick={() => setActiveTech(group)}
                  >
                    {group}
                  </button>
                ))}
              </div>

              <div className="stack-stage">
                <div className="stack-stage-label">
                  <span>{activeTech}</span>
                  <span>{String(activeSkills.length).padStart(2, "0")} TOOLS · MOVE YOUR CURSOR</span>
                </div>

                <BubbleStack skills={activeSkills} key={activeTech} />
              </div>
            </div>
          </section>

          <section id="achievements" className="section achievements-section">
            <div className="section-intro split-intro">
              <div>
                <div className="section-label">05 — RECOGNITION</div>
                <h2>Proof that <span>matters.</span></h2>
              </div>
              <p>Recognition, milestones and the moments worth keeping. Your trophy/certificate images can drop straight into these cards.</p>
            </div>

            <div className="achievement-grid">
              {achievements.map((item) => (
                <AchievementCard key={item.title} item={item} />
              ))}
            </div>

            <div className="recognition-line glass">
              <span className="recognition-dot" />
              <div>
                <strong>More milestones loading...</strong>
                <p>Because the best portfolio isn't finished. It's continuously shipped.</p>
              </div>
              <Icon name="spark" size={22} />
            </div>
          </section>

          <section className="section lab-section">
            <div className="lab-card">
              <div className="lab-grid" />
              <div className="lab-content">
                <div className="section-label">06 — LAB / CURRENTLY EXPLORING</div>
                <div className="lab-status"><i /> EXPERIMENTAL MODE</div>
                <h2>What I'm <span>curious about next.</span></h2>
                <div className="lab-list">
                  <span>Agentic workflows</span>
                  <span>Better RAG evaluation</span>
                  <span>AI-native interfaces</span>
                  <span>Developer tooling</span>
                  <span>Creative coding</span>
                </div>
              </div>
              <div className="lab-orbit orbit-a" />
              <div className="lab-orbit orbit-b" />
              <div className="lab-core"><Icon name="spark" size={26} /></div>
            </div>
          </section>

          <section className="section beyond-section">
            <div className="section-intro">
              <div className="section-label">07 — BEYOND DEVELOPMENT</div>
              <h2>There is more to me than <span>code.</span></h2>
            </div>

            <div className="beyond-grid">
              <div className="beyond-card glass">
                <span className="beyond-number">01</span>
                <div className="beyond-emoji">✦</div>
                <h3>Dance</h3>
                <p>My reset button. Movement, music and a little chaos.</p>
              </div>
              <div className="beyond-card glass">
                <span className="beyond-number">02</span>
                <div className="beyond-emoji">⌁</div>
                <h3>Sketching</h3>
                <p>Another way I think through shapes, ideas and stories.</p>
              </div>
              <div className="beyond-card glass">
                <span className="beyond-number">03</span>
                <div className="beyond-emoji">◌</div>
                <h3>Content</h3>
                <p>Experimenting with ways to make tech and everyday life feel relatable.</p>
              </div>
            </div>
          </section>

          <section id="contact" className="section contact-section">
            <div className="contact-heading">
              <div className="section-label">08 — LET'S TALK</div>
              <h2>Have an idea?<br /><span>Let's make it real.</span></h2>
              <p>Open to interesting engineering problems, AI products and conversations that start with “what if…?”</p>
            </div>

            <div className="contact-grid">
              <form className="contact-form glass" onSubmit={handleSubmit}>
                <div className="form-top">
                  <span>DROP A MESSAGE</span>
                  <span>01 / 03</span>
                </div>

                {submitted ? (
                  <div className="form-success">
                    <div className="success-icon"><Icon name="check" size={24} /></div>
                    <h3>Message sent!</h3>
                    <p>
                      Thanks for reaching out. I'll get back to you soon.
                    </p>
                    <a className="primary-button" href="mailto:vinaiktanya@gmail.com">Email Tanya <Icon name="arrow" size={15} /></a>
                    <button type="button" className="text-button" onClick={() => setSubmitted(false)}>Send another</button>
                  </div>
                ) : (
                  <>
                    <label>
                      <span>Your name</span>
                      <input name="name" required placeholder="Jane Doe" />
                    </label>
                    <label>
                      <span>Email</span>
                      <input name="email" type="email" required placeholder="jane@company.com" />
                    </label>
                    <label>
                      <span>What's on your mind?</span>
                      <textarea name="message" required rows="5" placeholder="Let's build something useful..." />
                    </label>

                    <button
                      className="send-button"
                      type="submit"
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Send message"}
                      {!sending && <Icon name="send" size={16} />}
                    </button>

                    {formError && (
                      <small className="form-error">
                        {formError}
                      </small>
                    )}

                    <small className="form-note">
                      Your message will be delivered directly to Tanya.
                    </small>

                    <small className="form-note">No backend needed for this demo. Connect this form to Formspree, Resend, EmailJS or your own API when deploying.</small>
                  </>
                )}
              </form>

              <div className="contact-side">
                <div className="social-grid">
                  <a href="mailto:vinaiktanya@gmail.com" className="social-card">
                    <span className="social-icon"><Icon name="mail" size={19} /></span>
                    <span className="social-text">
                      <strong>Email</strong>
                      <small>vinaiktanya@gmail.com</small>
                    </span>
                    <Icon name="external" size={14} className="social-go" />
                  </a>
                  <a href="https://www.linkedin.com/in/tanya-vinaik-082324224/" target="_blank" rel="noreferrer" className="social-card">
                    <span className="social-icon"><Icon name="linkedin" size={19} /></span>
                    <span className="social-text">
                      <strong>LinkedIn</strong>
                      <small>tanya-vinaik</small>
                    </span>
                    <Icon name="external" size={13} className="social-go" />
                  </a>
                  <a href="https://github.com/Tanya1203" target="_blank" rel="noreferrer" className="social-card">
                    <span className="social-icon"><Icon name="github" size={19} /></span>
                    <span className="social-text">
                      <strong>GitHub</strong>
                      <small>Tanya1203</small>
                    </span>
                    <Icon name="external" size={13} className="social-go" />
                  </a>
                  <a href="https://leetcode.com/u/Tanya1203/" target="_blank" rel="noreferrer" className="social-card">
                    <span className="social-icon"><Icon name="code" size={19} /></span>
                    <span className="social-text">
                      <strong>LeetCode</strong>
                      <small>Tanya1203</small>
                    </span>
                    <Icon name="external" size={13} className="social-go" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <a className="footer-brand" href="#home">TV<span>.</span></a>

            <div className="footer-social">
              <a href="mailto:vinaiktanya@gmail.com" aria-label="Email"><Icon name="mail" size={16} /></a>
              <a href="https://www.linkedin.com/in/tanya-vinaik-082324224/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={16} /></a>
              <a href="https://github.com/Tanya1203" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={16} /></a>
              <a href="https://leetcode.com/u/Tanya1203/" target="_blank" rel="noreferrer" aria-label="LeetCode"><Icon name="code" size={16} /></a>
            </div>

            <div>Designed + engineered by Tanya</div>
            <a href="#home" className="back-to-top">Back to top <span>↑</span></a>
          </footer>
        </main>
      )}

      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal glass" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close">
              <Icon name="x" size={20} />
            </button>
            <div className={`modal-visual project-${selectedProject.accent}`}>
              <ProjectShot project={selectedProject} />
              <span>{selectedProject.type}</span>
              <strong>{selectedProject.number}</strong>
            </div>
            <div className="modal-body">
              <div className="section-label">CASE STUDY PREVIEW</div>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              <div className="modal-stack">
                {selectedProject.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="modal-actions">
                {selectedProject.liveUrl &&
                  selectedProject.liveUrl !== "#" && (
                    <a
                      className="primary-button"
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Review project <Icon name="external" size={15} />
                    </a>
                  )}
                <a className="secondary-button" href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                  GitHub <Icon name="github" size={15} />
                </a>
              </div>
              <small className="modal-note">Replace the project URL in the <code>projects</code> array in App.jsx when your deployment is ready.</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
