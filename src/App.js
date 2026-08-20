import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './redesign.css';

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
    title: 'Conscious: Better Spending App',
    type: 'iOS product',
    role: 'Co-Founder & Developer',
    period: 'May 2026 — Present',
    description: 'A production budgeting app with transactions, budgets, recurring expenses, and analytics that turn spending patterns into actionable insights.',
    tags: ['SwiftData', 'iOS', 'Product'],
    link: 'https://apps.apple.com/us/app/conscious-better-spending/id6778949105',
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
    title: 'Jira Service Adapter',
    type: 'Cloud infrastructure',
    role: 'Software Engineer',
    period: 'Sep — Dec 2025',
    description: 'A secure, typed Jira microservice with automated delivery and 90% test coverage.',
    tags: ['FastAPI', 'OAuth', 'Python'],
    link: 'https://github.com/kiamygomes/osdp-team6',
  },
  {
    title: 'Hustle Hub',
    type: 'Accessible platform',
    role: 'Project Manager & Software Engineer',
    period: 'Jan — Dec 2025',
    description: 'A multilingual job board built to make work and financial resources easier to access.',
    tags: ['Angular', 'Django', 'PostgreSQL'],
    link: 'https://github.com/HanmingXiong/HustleHub',
  },
  {
    title: 'StayPal',
    type: 'Mobile product',
    role: 'Product Designer & Developer',
    period: 'Sep 2025 — Present',
    description: 'A cross-platform roommate-matching concept for interns searching for affordable housing.',
    tags: ['React Native', 'Firebase', 'Product'],
  },
  {
    title: 'Urban Systems Lab',
    type: 'Modeling & research',
    role: 'Simulation Developer & Analyst',
    period: 'Jan — May 2025',
    description: 'Simulations exploring wildfire spread, urban ecology, and city geometry.',
    tags: ['MATLAB', 'Modeling', 'Data'],
    link: 'https://github.com/stevloc/matlab/tree/main',
  },
  {
    title: 'Game Development Portfolio',
    type: 'Interactive media',
    role: 'Indie Game Developer',
    period: '2023 — Present',
    description: 'A collection of published indie games focused on mechanics, level design, and iteration.',
    tags: ['Godot', 'GameMaker', 'Game Design'],
    link: 'https://stevloc.itch.io/',
  },
  {
    title: 'Brass Bets',
    type: 'Tabletop design',
    role: 'Game Designer',
    period: 'Sep — Dec 2024',
    description: 'A casino-inspired strategy game designed and tested during study abroad in Shanghai.',
    tags: ['Game Design', 'Prototyping', 'Research'],
    link: 'https://drive.google.com/file/d/1pk06BFISqoWgiJO6HdbS6oZ7biWPlDDg/view?usp=sharing',
  },
  {
    title: 'Criminal Database',
    type: 'Database systems',
    role: 'Database Developer',
    period: 'Feb — May 2024',
    description: 'A normalized SQL system with procedures, triggers, and optimized record management.',
    tags: ['SQL', 'MySQL', 'Database Design'],
    link: 'https://github.com/paripatel55/DatabaseProject',
  },
  {
    title: 'Farm Ninja',
    type: 'Software engineering',
    role: 'C++ Game Developer',
    period: 'Mar — May 2024',
    description: 'An object-oriented C++ game with modular architecture and progressive difficulty.',
    tags: ['C++', 'OOP', 'Game Development'],
    link: 'https://github.com/stevloc/farm_ninja',
  },
  {
    title: 'Bounce NYC',
    type: 'Hackathon project',
    role: 'Game Developer',
    period: 'Dec 2023',
    description: 'A rapid-prototype Python game built around movement, interaction, and NYC-inspired play.',
    tags: ['Python', 'Pygame', 'Prototyping'],
    link: 'https://github.com/stevloc/bounce_nyc',
  },
  {
    title: 'High-Performance Computing VIP',
    type: 'Research',
    role: 'Undergraduate Researcher',
    period: 'Jun 2023 — May 2024',
    description: 'Data-lake optimization and machine-learning performance benchmarking on research systems.',
    tags: ['Python', 'MLPerf', 'Data Systems'],
    link: 'https://engineering.nyu.edu/research-innovation/student-research/vertically-integrated-projects/vip-teams/high-performance-computing',
  },
  {
    title: 'Sneak y Clean',
    type: 'Product design',
    role: 'Product Designer',
    period: 'Sep — Dec 2022',
    description: 'An accessible shoe-cleaner prototype designed to reduce effort and production cost.',
    tags: ['Fusion 360', 'Accessibility', 'Prototyping'],
  },
];

const experience = [
  {
    role: 'Systems Development Engineer Intern',
    company: 'Amazon · Whole Foods Market',
    period: '2025',
    description: 'Built forecasting, observability, and analytics systems for worldwide grocery technology.',
  },
  {
    role: 'CSE Peer Mentor',
    company: 'NYU Tandon School of Engineering',
    period: 'Sep — Dec 2025',
    description: 'Mentored undergraduate computer science students through regular check-ins, academic guidance, campus resources, and department events.',
  },
  {
    role: 'Student IT Support Technician',
    company: 'NYU Faculty of Arts & Science',
    period: '2024 — 2025',
    description: 'Delivered technical support across university systems, devices, and networks.',
  },
  {
    role: 'Student Operations Attendant',
    company: 'NYU Athletics',
    period: '2023 — 2024',
    description: 'Managed gym operations, supported athletic events, and earned the Emerging Leader Award.',
  },
  {
    role: 'Summer Resident Assistant',
    company: 'NYU Residential Life',
    period: '2024',
    description: 'Supported 700+ residents and improved operational data workflows.',
  },
];

const education = [
  {
    school: 'Carnegie Mellon University',
    program: 'MISM — Business Intelligence & Data Analytics',
    period: '2026 — Present',
    location: 'Pittsburgh, PA',
    mark: 'CMU',
  },
  {
    school: 'New York University',
    program: 'B.S. Computer Science · Mathematics & Game Engineering',
    period: '2022 — 2026',
    location: 'Brooklyn, NY',
    mark: 'NYU',
    award: 'CSE Leadership Award',
    activities: [
      'NYU Theta Tau · Webmaster',
      'Chinese Mei Society · Vice President',
      'Society of Hispanic Professional Engineers (SHPE)',
      'HackNYU',
      'Tech@NYU',
    ],
  },
  {
    school: 'NYU Shanghai',
    program: 'Study Away',
    period: 'Fall 2024',
    location: 'Shanghai, China',
    mark: 'SH',
  },
  {
    school: 'VinUniversity',
    program: 'Study Away',
    period: 'January 2026',
    location: 'Hanoi, Vietnam',
    mark: 'VIN',
  },
];

const degrees = education.filter((item) => item.program !== 'Study Away');
const studyAway = education.filter((item) => item.program === 'Study Away');

const skills = ['Python', 'SQL', 'AWS', 'Machine Learning', 'React', 'FastAPI', 'Data Analytics', 'Product'];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/stevloc', icon: 'bi-linkedin' },
  { label: 'GitHub', href: 'https://github.com/stevloc', icon: 'bi-github' },
  { label: 'Photography', href: 'https://www.instagram.com/stevloc.frames/', icon: 'bi-instagram' },
  { label: 'Strava', href: 'https://strava.app.link/HMPSp2IPdXb', icon: 'bi-activity' },
  { label: 'Beli', href: 'https://beliapp.co/app/stevloc2', icon: 'bi-cup-hot' },
  { label: 'itch.io', href: 'https://stevloc.itch.io/', icon: 'bi-controller' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCityId, setActiveCityId] = useState('pittsburgh');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const activeCity = cities.find((city) => city.id === activeCityId) || cities[0];
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

  useEffect(() => {
    const closeMenu = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', closeMenu);
    return () => document.removeEventListener('keydown', closeMenu);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navTo = (event, id) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className={`App theme-${activeCity.id}`}>
      <a className="skip-link" href="#main">Skip to content</a>

      <nav className="site-nav" aria-label="Primary navigation">
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
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>

          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#work" onClick={(event) => navTo(event, 'work')}>Projects</a>
            <a href="#experience" onClick={(event) => navTo(event, 'experience')}>Experience</a>
            <a href="#education" onClick={(event) => navTo(event, 'education')}>Education</a>
            <a href="/assets/resume/steven_locen_resume_gs.pdf" target="_blank" rel="noreferrer">Resume <i className="bi bi-arrow-up-right"></i></a>
            <a href="#about" onClick={(event) => navTo(event, 'about')}>About</a>
            <a className="nav-cta" href="mailto:stevloc03@gmail.com">Contact <i className="bi bi-arrow-up-right"></i></a>
          </div>
        </div>
      </nav>

      <main id="main">
        <section id="home" className="hero-section">
          <div className="ambient-orb ambient-orb--one"></div>
          <div className="ambient-orb ambient-orb--two"></div>

          <div className="hero-layout page-shell">
            <div className="hero-copy">
              <p className="eyebrow">Software engineer · AI · Data · Cloud</p>
              <h1><span className="first-name">Steven</span> <em className="last-name">Lo Cen.</em></h1>
              <p className="hero-intro">AI, data, and software engineering.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work" onClick={(event) => navTo(event, 'work')}>View selected work <i className="bi bi-arrow-down-right"></i></a>
                <a className="button button-secondary" href="mailto:stevloc03@gmail.com">Get in touch</a>
              </div>
              <div className="hero-meta"><span>CMU MISM-BIDA</span><span>Previously @ Amazon</span><span>NYU CS</span></div>
            </div>

            <aside className="places-panel glass-panel" aria-label="Places Steven has lived, studied, or worked">
              <div className="places-header"><p>Locations</p><span>{activeCity.detail}</span></div>
              <div className={`city-art city-art--${activeCity.id}`} data-city={activeCity.name} aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
              <div className="places-list">
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
              <a className="text-link" href="https://github.com/stevloc" target="_blank" rel="noreferrer">More on GitHub <i className="bi bi-arrow-up-right"></i></a>
            </header>

            <div className="projects-grid" id="projects-grid">
              {visibleProjects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-content">
                    <p className="card-eyebrow">{project.type}</p>
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                      {project.link && <a className="round-link" href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><i className="bi bi-arrow-up-right"></i></a>}
                    </div>
                    {(project.role || project.period) && <p className="project-meta">{[project.role, project.period].filter(Boolean).join(' · ')}</p>}
                    <p className="project-description">{project.description}</p>
                    <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>

            <div className="projects-actions">
              <button
                className="view-all-button"
                type="button"
                aria-expanded={showAllProjects}
                aria-controls="projects-grid"
                onClick={() => setShowAllProjects((showAll) => !showAll)}
              >
                {showAllProjects ? 'Show selected projects' : `View all ${projects.length} projects`}
                <i className={`bi ${showAllProjects ? 'bi-arrow-up' : 'bi-grid-3x3-gap'}`}></i>
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
                  <div><p>{item.company}</p><h3>{item.role}</h3></div>
                  <p>{item.description}</p>
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
                    <span className="school-mark">{item.mark}</span>
                    <div className="education-card__body">
                      <p>{item.period} · {item.location}</p>
                      <h4>{item.school}</h4>
                      <span className="education-program">{item.program}</span>
                    </div>
                  </div>
                  {item.award && (
                    <div className="education-card__details">
                      <span className="education-award"><i className="bi bi-award"></i>{item.award}</span>
                      <div className="education-activities" aria-label="NYU involvement">
                        {item.activities.map((activity) => <span key={activity}>{activity}</span>)}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div className="study-away-block">
              <div className="study-away-heading"><h4>Study abroad</h4></div>
              <div className="study-away-list">
                {studyAway.map((item) => (
                  <article className="study-away-row" key={item.school}>
                    <span className="school-mark">{item.mark}</span>
                    <div><h4>{item.school}</h4><p>{item.period} · {item.location}</p></div>
                    <span>{item.program}</span>
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
                <p>Outside of code, I rank among the <a href="https://beliapp.co/app/stevloc2" target="_blank" rel="noreferrer">top 1% of coffee and tea reviewers in New York</a>. I love trying new restaurants, cooking, hiking, being outdoors, and <a href="https://www.instagram.com/stevloc.frames/" target="_blank" rel="noreferrer">photographing landscapes</a>. Lately, I've been learning more about coffee and exploring video editing, film, and cinematic storytelling.</p>
                <p>I still have plenty to learn, and that's what keeps things interesting. I'm always open to new ideas, collaborations, and opportunities.</p>
              </div>
              <a className="about-connect" href="mailto:stevloc03@gmail.com">Connect with me <i className="bi bi-arrow-up-right"></i></a>
              <div className="skills-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-shell contact-shell">
            <h2>Contact</h2>
            <div className="contact-actions">
              <a className="contact-email" href="mailto:stevloc03@gmail.com"><i className="bi bi-envelope"></i><span>stevloc03@gmail.com</span><i className="bi bi-arrow-up-right"></i></a>
            </div>
            <div className="contact-footer">
              <div className="social-links">{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer"><i className={`bi ${social.icon} social-icon`}></i><span>{social.label}</span><i className="bi bi-arrow-up-right link-arrow"></i></a>)}</div>
              <span>Pittsburgh, PA</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell"><span>© {new Date().getFullYear()} Steven Lo Cen</span><a href="#home" onClick={(event) => navTo(event, 'home')}>Back to top <i className="bi bi-arrow-up"></i></a></div>
      </footer>
    </div>
  );
}

export default App;
