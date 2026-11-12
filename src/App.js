import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './redesign.css';
import CitySkyline from './CitySkyline';

const cities = [
  { id: 'nyc', name: 'NYC, NY', detail: 'Five boroughs · skyline & grid' },
  { id: 'shanghai', name: 'Shanghai, CN', detail: 'Huangpu River · skyline & motion' },
  { id: 'austin', name: 'Austin, TX', detail: 'Lady Bird Lake · sun & sound' },
  { id: 'hanoi', name: 'Hanoi, VN', detail: 'Hoàn Kiếm · lakes & layers' },
  { id: 'seattle', name: 'Seattle, WA', detail: 'Puget Sound · rain & evergreens' },
  { id: 'pittsburgh', name: 'Pittsburgh, PA', detail: 'Three rivers · bridges & steel' },
  { id: 'sanjose', name: 'San Jose, CR', detail: 'Central Valley · mountains & green' },
];

const projects = [
  {
    title: 'Night Shift',
    type: 'AI back office · ScottyLabs Nova Hackathon',
    role: 'Full-Stack Developer',
    period: 'Nov 2026',
    description: 'An overnight back office for small restaurants: while the owner sleeps, it reads supplier invoices, flags total, pack-size, and duplicate errors, recalculates every dish’s cost, and delivers a bilingual Morning Brief. The LLM extracts and investigates, but deterministic, tested code does all the math, and every figure traces back to its source invoice line.',
    tags: ['FastAPI', 'React', 'Supabase', 'LLM Agents'],
    links: [
      { kind: 'site', href: 'https://night-shift-r237.onrender.com/' },
      { kind: 'github', href: 'https://github.com/stevloc/night-shift' },
    ],
  },
  // {
  //   title: 'Relay: Personal CRM',
  //   type: 'Offline-first mobile app',
  //   role: 'Mobile & AI Developer',
  //   period: 'Jul 2026 — Present',
  //   description: 'A personal CRM that works fully offline: a persisted mutation queue reconciles local writes across a 14-entity data model with Supabase on reconnect. LLM note extraction and message drafting run on Supabase Edge Functions with swappable models, and core logic lives in a framework-independent domain layer. Shipped to TestFlight.',
  //   tags: ['React Native', 'TypeScript', 'Supabase', 'LLMs'],
  // },
  {
    title: 'Jira Service Adapter',
    type: 'Integration service · AI ticketing system',
    role: 'Software Engineer',
    period: 'Sep — Dec 2025',
    description: 'Owned the ticketing vertical of a four-team AI ticket-management system: a 13-endpoint FastAPI service with 3-legged Jira OAuth 2.0 and automatic token refresh, hardened with idempotency keys, jittered exponential backoff, and a circuit breaker. Validated by 200+ tests, with mypy and Ruff enforced in CI.',
    tags: ['FastAPI', 'OAuth 2.0', 'Python', 'CircleCI'],
    links: [{ kind: 'github', href: 'https://github.com/kiamygomes/osdp-team6' }],
  },
  {
    title: 'PantryFlip',
    type: 'AI recipe discovery · HackCMU 2026',
    role: 'iOS & Backend Developer',
    period: 'Sep 2026',
    description: 'A food-waste iOS app where a multi-agent Kitchen Council (Chef, Taste, Nutrition, and Optimizer) drafts recipes from your fridge in about 10 seconds. Allergies, diet, quantities, and equipment are hard checks: the Chef rejects and redrafts any candidate that fails them. Uses Gemini ingredient recognition and USDA nutrition data, learns from saves and skips, and is backed by 237 tests.',
    tags: ['SwiftUI', 'FastAPI', 'Multi-Agent AI', 'Gemini'],
  },
  {
    title: 'Conscious: Better Spending App',
    type: 'iOS product · App Store',
    role: 'Co-Founder & Developer',
    period: 'May 2026 — Present',
    description: 'A budgeting app shipped to the App Store, owned from architecture through deployment: transactions, budgets, and recurring expenses on a SwiftData persistence layer, with Swift Charts analytics that surface spending patterns.',
    tags: ['Swift', 'SwiftUI', 'SwiftData', 'Swift Charts'],
    links: [{ kind: 'appstore', href: 'https://apps.apple.com/us/app/conscious-better-spending/id6778949105' }],
  },
  {
    title: 'Hustle Hub',
    type: 'Full-stack platform',
    role: 'Project Manager & Software Engineer',
    period: 'Jan — Dec 2025',
    description: 'Led a four-person team building a job board with 39 REST endpoints across 6 routers and a 7-table PostgreSQL schema, with JWT role-based access for applicants, employers, and admins. The backend started on Django and moved to FastAPI, reaching 88% backend coverage with pytest plus Playwright E2E tests.',
    tags: ['Angular', 'FastAPI', 'PostgreSQL', 'Playwright'],
    links: [{ kind: 'github', href: 'https://github.com/HanmingXiong/HustleHub' }],
  },
  // {
  //   title: 'StayPal',
  //   type: 'Mobile product',
  //   role: 'Product Designer & Developer',
  //   period: 'Sep 2025 — Present',
  //   description: 'A cross-platform roommate-matching concept for interns searching for affordable housing.',
  //   tags: ['React Native', 'Firebase', 'Product'],
  // },
  {
    title: 'High-Performance Computing VIP',
    type: 'Research',
    role: 'Undergraduate Researcher',
    period: 'Jun 2023 — May 2024',
    description: 'Data-lake optimization and machine-learning performance benchmarking on research systems.',
    tags: ['Python', 'MLPerf', 'Data Systems'],
    links: [{ kind: 'site', href: 'https://engineering.nyu.edu/research-innovation/student-research/vertically-integrated-projects/vip-teams/high-performance-computing', label: 'Program page' }],
  },
  {
    title: 'Urban Mobility & Emissions Digital Twin',
    type: 'Simulation · Hanoi, Vietnam',
    role: 'Simulation & Policy Analyst',
    period: 'Jan 2026',
    description: 'Compared GAMA mobility scenarios to evaluate how motorbike restrictions and metro expansion could reduce pollution in Hanoi. Contributed to the team’s Best Presentation award.',
    tags: ['GAMA', 'Simulation', 'Policy Analysis'],
  },
  {
    title: 'Criminal Database',
    type: 'Database systems',
    role: 'Database Developer',
    period: 'Feb — May 2024',
    description: 'A normalized SQL system with procedures, triggers, and optimized record management.',
    tags: ['SQL', 'MySQL', 'Database Design'],
    links: [{ kind: 'github', href: 'https://github.com/paripatel55/DatabaseProject' }],
  },
  {
    title: 'Farm Ninja',
    type: 'Software engineering',
    role: 'C++ Game Developer',
    period: 'Mar — May 2024',
    description: 'An object-oriented C++ game with modular architecture and progressive difficulty.',
    tags: ['C++', 'OOP', 'Game Development'],
    links: [{ kind: 'github', href: 'https://github.com/stevloc/farm_ninja' }],
  },
  {
    title: 'Urban Systems Lab',
    earlier: true,
    type: 'Modeling & research',
    role: 'Simulation Developer & Analyst',
    period: 'Jan — May 2025',
    description: 'Simulations exploring wildfire spread, urban ecology, and city geometry.',
    tags: ['MATLAB', 'Modeling', 'Data'],
    links: [{ kind: 'github', href: 'https://github.com/stevloc/matlab/tree/main' }],
  },
  {
    title: 'Game Development Portfolio',
    earlier: true,
    type: 'Interactive media',
    role: 'Indie Game Developer',
    period: '2023 — Present',
    description: 'A collection of published indie games focused on mechanics, level design, and iteration.',
    tags: ['Godot', 'GameMaker', 'Game Design'],
    links: [{ kind: 'site', label: 'itch.io', href: 'https://stevloc.itch.io/' }],
  },
  {
    title: 'Brass Bets',
    earlier: true,
    type: 'Tabletop design',
    role: 'Game Designer',
    period: 'Sep — Dec 2024',
    description: 'A casino-inspired strategy game designed and tested during study abroad in Shanghai.',
    tags: ['Game Design', 'Prototyping', 'Research'],
    links: [{ kind: 'slides', href: 'https://drive.google.com/file/d/1pk06BFISqoWgiJO6HdbS6oZ7biWPlDDg/view?usp=sharing' }],
  },
  {
    title: 'Bounce NYC',
    earlier: true,
    type: 'Hackathon project · mini-HackNYU 2023',
    role: 'Game Developer',
    period: 'Dec 2023',
    description: 'A rapid-prototype Python game built around movement, interaction, and NYC-inspired play.',
    tags: ['Python', 'Pygame', 'Prototyping'],
    links: [{ kind: 'github', href: 'https://github.com/stevloc/bounce_nyc' }],
  },
  {
    title: 'Sneak y Clean',
    earlier: true,
    type: 'Product design',
    role: 'Product Designer',
    period: 'Sep — Dec 2022',
    description: 'An accessible shoe-cleaner prototype designed to reduce effort and production cost.',
    tags: ['Fusion 360', 'Accessibility', 'Prototyping'],
    links: [{ kind: 'slides', href: 'https://docs.google.com/presentation/d/1OPVmpaGiavOimkeVNbHJDS7joNwvlUIZ3cjDvhHIdy0/edit' }],
  },
];

const experience = [
  {
    role: 'Systems Development Engineer Intern',
    company: 'Amazon · Whole Foods Market',
    logo: '/assets/logos/amazon.svg',
    period: 'May — Aug 2025',
    description: 'Built Python and Athena pipelines that snapshot EC2 metadata across 40+ AWS accounts into an internal resource dashboard. Cut historical storage 45% by re-architecting ingestion on Lambda, CDK, S3, and CloudWatch, and built QuickSight dashboards adopted by six outside teams, eliminating 40% of recurring manual reporting.',
    skills: ['AWS', 'Python', 'SQL', 'Observability', 'Automation'],
  },
  {
    role: 'Student IT Support Technician',
    company: 'NYU Faculty of Arts & Science',
    logo: '/assets/logos/nyu.svg',
    period: 'Jan 2024 — Dec 2025',
    description: 'Resolved 15+ tickets a week across macOS and Windows, from Wi-Fi, VPN, DNS, and IP configuration issues to software installs and hardware repairs, while streamlining department asset tracking.',
    skills: ['Technical Support', 'Troubleshooting', 'Systems Administration'],
  },
  {
    role: 'Campus Leadership',
    company: 'NYU · Tandon, Athletics & Residential Life',
    logo: '/assets/logos/nyu.svg',
    period: '2023 — 2025',
    description: 'CSE Peer Mentor guiding undergraduate CS students; Summer Resident Assistant supporting 700+ residents and improving operational data workflows; Student Operations Attendant at NYU Athletics, earning the Emerging Leader Award.',
    skills: ['Leadership', 'Mentoring', 'Operations', 'Process Improvement'],
  },
];

const education = [
  {
    school: 'Carnegie Mellon University',
    program: 'MISM · Business Intelligence & Data Analytics',
    period: '2026 — Present',
    location: 'Pittsburgh, PA',
    mark: 'CMU',
    logo: '/assets/logos/cmu.png',
    coursework: 'AI Agents, Machine Learning for Problem Solving, Unstructured Data Analytics, A/B Testing, Database Management, Decision Making Under Uncertainty',
    activities: [
      'AI Club · Treasurer',
      'ACM@CMU',
      'HackCMU',
      'Society of Hispanic Professional Engineers (SHPE)',
    ],
  },
  {
    school: 'New York University',
    program: 'B.S. Computer Science · Minors in Mathematics & Game Engineering',
    period: '2022 — May 2026',
    location: 'Brooklyn, NY',
    mark: 'NYU',
    logo: '/assets/logos/nyu.svg',
    coursework: 'Data Structures & Algorithms, Design & Analysis of Algorithms, Operating Systems, Software Engineering, Computer Networking, Computer Security, Databases',
    award: 'CSE Leadership Award',
    activities: [
      'NYU Theta Tau · Webmaster',
      'Chinese Mei Society · Vice President',
      'Society of Hispanic Professional Engineers (SHPE)',
      'HackNYU',
      'Tech@NYU',
      'VIP · High-Performance Computing',
      'VIP · Data Analytics & Visualization',
    ],
  },
  {
    school: 'NYU Shanghai',
    program: 'Study Away',
    period: 'Fall 2024',
    location: 'Shanghai, China',
    mark: 'SH',
    logo: '/assets/logos/nyu.svg',
  },
  {
    school: 'VinUniversity',
    program: 'Study Away',
    period: 'January 2026',
    location: 'Hanoi, Vietnam',
    mark: 'VIN',
    logo: '/assets/logos/vinuni.png',
  },
];

const degrees = education.filter((item) => item.program !== 'Study Away');
const studyAway = education.filter((item) => item.program === 'Study Away');

const linkKinds = {
  site: { icon: 'bi-box-arrow-up-right', label: 'Live site', a11y: 'Live site' },
  github: { icon: 'bi-github', label: 'Code', a11y: 'Source code on GitHub' },
  appstore: { icon: 'bi-apple', label: 'App Store', a11y: 'App Store listing' },
  slides: { icon: 'bi-easel', label: 'Slides', a11y: 'Presentation slides' },
};

const RESUME_URL = '/assets/resume/steven_locen_resume_gs.pdf?v=2026-11';
const EMAIL = 'stevloc03@gmail.com';
const NAV_SECTIONS = ['work', 'experience', 'education', 'about', 'contact'];
const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const NewTab = ({ pdf }) => <span className="sr-only">{pdf ? ' (PDF, opens in new tab)' : ' (opens in new tab)'}</span>;

const skills = ['AI Agents', 'LLM Systems', 'Python', 'TypeScript', 'SQL', 'C++', 'Swift', 'AWS', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'Data Analytics'];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/stevloc', icon: 'bi-linkedin' },
  { label: 'GitHub', href: 'https://github.com/stevloc', icon: 'bi-github' },
  { label: 'itch.io', href: 'https://stevloc.itch.io/', icon: 'bi-controller' },
  { label: 'Photography', href: 'https://www.instagram.com/stevloc.frames/', icon: 'bi-instagram' },
  { label: 'Beli', href: 'https://beliapp.co/app/stevloc2', icon: 'bi-cup-hot' },
  { label: 'Strava', href: 'https://strava.app.link/HMPSp2IPdXb', icon: 'bi-activity' },
];

function LogoGlyph({ src }) {
  return <span className="logo-glyph" style={{ '--logo': `url(${src})` }} aria-hidden="true"></span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCityId, setActiveCityId] = useState('pittsburgh');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [copied, setCopied] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const activeCity = cities.find((city) => city.id === activeCityId) || cities[0];
  const featuredProjects = projects.filter((project) => !project.earlier);
  const earlierProjects = projects.filter((project) => project.earlier);
  const visibleProjects = showAllProjects ? featuredProjects : featuredProjects.slice(0, 4);

  const renderProject = (project, index, staggered) => (
    <article className="project-card" key={project.title} style={staggered ? { '--i': Math.min(index, 6) } : undefined}>
      <div className="project-content">
        <p className="card-eyebrow">{project.type}</p>
        <h3 className="project-title">{project.title}</h3>
        {(project.role || project.period) && <p className="project-meta">{[project.role, project.period].filter(Boolean).join(' · ')}</p>}
        <p className="project-description">{project.description}</p>
        {project.links && (
          <div className="project-links">
            {project.links.map(({ kind, href, label }) => (
              <a key={href} className="link-pill" href={href} target="_blank" rel="noreferrer" aria-label={`${project.title}: ${label || linkKinds[kind].a11y} (opens in new tab)`}>
                <i aria-hidden="true" className={`bi ${linkKinds[kind].icon}`}></i><span>{label || linkKinds[kind].label}</span>
              </a>
            ))}
          </div>
        )}
        <div className="tag-row" role="list" aria-label="Technologies">{project.tags.map((tag) => <span role="listitem" key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  );

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (event) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen]);

  // Highlight the nav link for the section currently on screen.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    NAV_SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      // Move focus with the scroll so keyboard and screen-reader users land in the section.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
    setMenuOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const toggleProjects = () => {
    if (showAllProjects) scrollToSection('work');
    setShowAllProjects((showAll) => !showAll);
  };

  const navTo = (event, id) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className={`App theme-${activeCity.id}`}>
      <a className="skip-link" href="#main">Skip to content</a>

      <nav className="site-nav" aria-label="Primary navigation" ref={navRef}>
        <div className="nav-shell">
          <a className="nav-brand" href="#home" onClick={(event) => navTo(event, 'home')}>
            <span className="brand-mark">SL</span>
            <span>Steven Lo Cen</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            ref={menuButtonRef}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i aria-hidden="true" className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>

          <div id="site-menu" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#work" aria-current={activeSection === 'work' ? 'true' : undefined} onClick={(event) => navTo(event, 'work')}>Projects</a>
            <a href="#experience" aria-current={activeSection === 'experience' ? 'true' : undefined} onClick={(event) => navTo(event, 'experience')}>Experience</a>
            <a href="#education" aria-current={activeSection === 'education' ? 'true' : undefined} onClick={(event) => navTo(event, 'education')}>Education</a>
            <a href={RESUME_URL} target="_blank" rel="noreferrer">Resume <i aria-hidden="true" className="bi bi-arrow-up-right"></i><NewTab pdf /></a>
            <a href="#about" aria-current={activeSection === 'about' ? 'true' : undefined} onClick={(event) => navTo(event, 'about')}>About</a>
            <a className="nav-cta" href={`mailto:${EMAIL}`}>Contact <i aria-hidden="true" className="bi bi-arrow-up-right"></i></a>
          </div>
        </div>
      </nav>

      <main id="main">
        <section id="home" className="hero-section">
          <div className="ambient-orb ambient-orb--one"></div>
          <div className="ambient-orb ambient-orb--two"></div>

          <div className="hero-layout page-shell">
            <div className="hero-copy">
              <p className="eyebrow">Software engineer · AI agents · Data · Cloud</p>
              <h1><span className="first-name">Steven</span> <em className="last-name">Lo Cen.</em></h1>
              <p className="hero-intro">Building AI agents and shipping them alongside the people who use them.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work" onClick={(event) => navTo(event, 'work')}>View selected work <i aria-hidden="true" className="bi bi-arrow-down-right"></i></a>
                <a className="button button-secondary" href={RESUME_URL} target="_blank" rel="noreferrer">Resume (PDF) <i aria-hidden="true" className="bi bi-file-earmark-arrow-down"></i><NewTab pdf /></a>
              </div>
              <div className="hero-meta"><span>CMU MISM-BIDA</span><span>Previously @ Amazon</span><span>NYU CS</span></div>
            </div>

            <aside className="places-panel glass-panel" aria-label="Places Steven has lived, studied, or worked">
              <div className="places-header"><p>Places I&apos;ve lived &amp; worked</p><span aria-live="polite">{activeCity.detail}</span></div>
              <div className={`city-art city-art--${activeCity.id}`} data-city={activeCity.name} aria-hidden="true">
                <CitySkyline city={activeCity.id} />
              </div>
              <div className="places-list" role="group" aria-label="Choose a city">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    className={city.id === activeCity.id ? 'active' : ''}
                    aria-pressed={city.id === activeCity.id}
                    onClick={() => setActiveCityId(city.id)}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="page-shell">
            <header className="section-heading">
              <h2>Projects</h2>
              <a className="text-link" href="https://github.com/stevloc" target="_blank" rel="noreferrer">More on GitHub <i aria-hidden="true" className="bi bi-arrow-up-right"></i><NewTab /></a>
            </header>

            <div id="projects-grid">
              <div className={`projects-grid${showAllProjects ? ' projects-grid--reveal-tail' : ''}`}>{visibleProjects.map((project, i) => renderProject(project, i, showAllProjects && i >= 4))}</div>
              {showAllProjects && earlierProjects.length > 0 && (
                <>
                  <h3 className="projects-subheading">Earlier & creative work</h3>
                  <div className="projects-grid projects-grid--reveal">{earlierProjects.map((project, i) => renderProject(project, i + 2, true))}</div>
                </>
              )}
            </div>

            <div className="projects-actions">
              <button
                className="view-all-button"
                type="button"
                aria-expanded={showAllProjects}
                aria-controls="projects-grid"
                onClick={toggleProjects}
              >
                {showAllProjects ? 'Show fewer projects' : `View all ${projects.length} projects`}
                <i aria-hidden="true" className={`bi ${showAllProjects ? 'bi-arrow-up' : 'bi-grid-3x3-gap'}`}></i>
              </button>
            </div>
          </div>
        </section>

        <section id="experience" className="section background-section">
          <div className="page-shell">
            <header className="section-heading section-heading--light">
              <h2>Experience</h2>
            </header>

            <div className="experience-list">
              {experience.map((item) => (
                <article className="experience-row" key={item.role}>
                  <span>{item.period}</span>
                  <div className="experience-role">
                    {item.logo && <span className="experience-logo"><LogoGlyph src={item.logo} /></span>}
                    <div><p>{item.company}</p><h3>{item.role}</h3></div>
                  </div>
                  <div className="experience-detail">
                    <p>{item.description}</p>
                    {item.skills && <div className="experience-skills" role="list" aria-label="Skills">{item.skills.map((skill) => <span role="listitem" key={skill}>{skill}</span>)}</div>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section education-section">
          <div className="page-shell">
            <header className="section-heading education-heading">
              <h2>Education</h2>
            </header>
            <div className="education-grid">
              {degrees.map((item) => (
                <article className="education-card education-card--degree" key={item.school}>
                  <div className="education-card__brand">
                    <span className="school-mark">{item.logo ? <LogoGlyph src={item.logo} /> : item.mark}</span>
                    <div className="education-card__body">
                      <p>{item.period} · {item.location}</p>
                      <h3>{item.school}</h3>
                      <span className="education-program">{item.program}</span>
                      {item.coursework && <span className="education-coursework"><strong>Coursework</strong> · {item.coursework}</span>}
                    </div>
                  </div>
                  {(item.award || item.activities) && (
                    <div className="education-card__details">
                      {item.award && <span className="education-award"><i aria-hidden="true" className="bi bi-award"></i>{item.award}</span>}
                      <div className="education-activities" role="list" aria-label={`${item.school} involvement`}>
                        {item.activities.map((activity) => <span role="listitem" key={activity}>{activity}</span>)}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div className="study-away-block">
              <div className="study-away-heading"><h3>Study abroad</h3></div>
              <div className="study-away-list">
                {studyAway.map((item) => (
                  <article className="study-away-row" key={item.school}>
                    <span className="school-mark">{item.logo ? <LogoGlyph src={item.logo} /> : item.mark}</span>
                    <div><h4>{item.school}</h4><p>{item.period} · {item.location}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="page-shell about-grid">
            <div className="about-portrait"><img src="/assets/img/profile-2026.jpg" alt="Steven Lo Cen" loading="lazy" draggable="false" /></div>
            <div className="about-copy">
              <h2>About</h2>
              <div className="about-copy__text">
                <p>I'm Steven, a Chinese Costa Rican software engineer and CMU MISM-BIDA student. I enjoy coding, learning, and building useful products across AI, data, cloud, and consumer software.</p>
                <p>Lately I've been most excited about AI agents and the engineering that makes them reliable enough to trust. I'm drawn to forward deployed work: sitting close to the people with the problem, learning how they actually work, and building something that fits into their day.</p>
                <p>Outside of code, I rank in the <a href="https://beliapp.co/app/stevloc2" target="_blank" rel="noreferrer">top 0.5% of coffee reviewers in NYC and the top 0.5% of restaurant reviewers worldwide<NewTab /></a> on Beli. I love trying new restaurants, cooking, hiking, being outdoors, and <a href="https://www.instagram.com/stevloc.frames/" target="_blank" rel="noreferrer">photographing landscapes<NewTab /></a>. Lately, I've been learning more about coffee and exploring video editing, film, and cinematic storytelling.</p>
                <p>I'm always open to new ideas, collaborations, and opportunities.</p>
              </div>
              <a className="about-connect" href={`mailto:${EMAIL}`}>Connect with me <i aria-hidden="true" className="bi bi-arrow-up-right"></i></a>
              <div className="skills-list" role="list" aria-label="Skills">{skills.map((skill) => <span role="listitem" key={skill}>{skill}</span>)}</div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-shell contact-shell">
            <h2>Contact</h2>
            <div className="contact-actions">
              <a className="contact-email" href={`mailto:${EMAIL}`}><i aria-hidden="true" className="bi bi-envelope"></i><span>{EMAIL}</span><i aria-hidden="true" className="bi bi-arrow-up-right"></i></a>
              <div className="contact-buttons">
                <button className="contact-chip" type="button" onClick={copyEmail}><i aria-hidden="true" className={`bi ${copied ? 'bi-check2' : 'bi-copy'}`}></i>{copied ? 'Copied' : 'Copy email'}</button>
                <a className="contact-chip" href={RESUME_URL} target="_blank" rel="noreferrer"><i aria-hidden="true" className="bi bi-file-earmark-arrow-down"></i>Resume (PDF)<NewTab pdf /></a>
              </div>
              <span className="sr-only" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
            </div>
            <div className="contact-footer">
              <div className="social-links">{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer"><i aria-hidden="true" className={`bi ${social.icon} social-icon`}></i><span>{social.label}</span><i aria-hidden="true" className="bi bi-arrow-up-right link-arrow"></i><NewTab /></a>)}</div>
              <span>Pittsburgh, PA</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell"><span>© {new Date().getFullYear()} Steven Lo Cen</span><a href="#home" onClick={(event) => navTo(event, 'home')}>Back to top <i aria-hidden="true" className="bi bi-arrow-up"></i></a></div>
      </footer>
    </div>
  );
}

export default App;
