import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import logoBlau from './assets/blauOH.png';
import logoViolette from './assets/violetteOH.png';
import moonEmpty from './assets/moonEmpty.svg';
import moonFull from './assets/moonFull.svg';
import sunEmpty from './assets/sunEmpty.svg';
import sunFull from './assets/sunFull.svg';
import tiktokLogo from './assets/tiktok.svg';

type ProjectStatus = 'Live' | 'Growing' | 'Next';

interface ProjectCard {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  summary: string;
  status: ProjectStatus;
  accent: 'core' | 'teal' | 'violet';
  metrics: string[];
  audience: string;
  detail: string[];
  website: string;
}

const projects: ProjectCard[] = [
  {
    slug: 'planary-core',
    name: 'Planary Core',
    tagline: 'Digital experiences shaped around clarity and momentum',
    description:
      'A polished product hub that presents the Planary ecosystem in a clear, memorable way for customers, partners, and future collaborators.',
    summary:
      'A clean presentation layer that turns multiple internal efforts into one recognizable public-facing brand experience.',
    status: 'Live',
    accent: 'core',
    metrics: ['Brand presence', 'Product overview', 'Scalable structure'],
    audience: 'Companies, partners, and employers who need a quick overview of what Planary builds.',
    website: 'https://planary.ch',
    detail: [
      'Planary acts as the public front door for the wider product ecosystem and introduces the tone of the whole brand.',
      'Its role is to give customers and potential collaborators a quick, polished understanding of what the team is building.',
      'The site is structured as a portfolio-style layer, making it easier to extend the ecosystem with more products over time.',
    ],
  },
  {
    slug: 'tournamount',
    name: 'Tournamount',
    tagline: 'Competitive event planning',
    description:
      'A dedicated experience for organizing tournaments, brackets, event flow, and the operational details that keep competition moving.',
    summary:
      'Built for structured competition planning with a focus on scheduling, bracket clarity, and event coordination.',
    status: 'Growing',
    accent: 'teal',
    metrics: ['Brackets', 'Scheduling', 'Match flow'],
    audience: 'Organizers, event teams, gaming communities, and clubs running competitive formats.',
    website: 'https://tournament.planary.ch',
    detail: [
      'Tournamount focuses on tournament control without the chaos, giving organizers a clearer overview of events, brackets, and participants.',
      'The product is built around faster updates, smoother handovers, and a cleaner administrative flow for competitive events.',
      'Within the Planary ecosystem, it demonstrates how the same visual language can support a much more operational product without losing clarity.',
    ],
  },
  {
    slug: 'planary-wishlist',
    name: 'Planary Wishlist',
    tagline: 'Gift planning with structure',
    description:
      'A calmer way to collect ideas, organize wishlists, and create a recognizable Planary experience for everyday planning.',
    summary:
      'A wishlist product that makes saving, organizing, and sharing gift ideas feel elegant instead of scattered.',
    status: 'Live',
    accent: 'violet',
    metrics: ['Wishlists', 'Sharing', 'Product tracking'],
    audience: 'Individuals, families, and social circles who want a simple but polished way to manage gift ideas.',
    website: 'https://wishlist.planary.ch',
    detail: [
      'Planary Wishlist combines a calm visual identity with a practical everyday use case people can return to often.',
      'The experience is designed to make saving, organizing, and sharing gift ideas feel thoughtful rather than cluttered.',
      'It also serves as a strong example of how Planary approaches small consumer tools with the same care as larger product surfaces.',
    ],
  },
];

const highlights = [
  {
    label: 'Focus',
    title: 'Clear public presentation',
    copy: 'The site is built to quickly explain what Planary creates without exposing internal-only context.',
  },
  {
    label: 'Design',
    title: 'Consistent visual identity',
    copy: 'Each product card shares the same design language while still feeling distinct enough to stand on its own.',
  },
  {
    label: 'Growth',
    title: 'Built for expansion',
    copy: 'More projects can be added later through the same detail-page structure without rebuilding the site.',
  },
];

const THEME_STORAGE_KEY = 'planary-theme';

function SiteFrame({
  children,
  isDarkMode,
  onToggleTheme,
}: {
  children: React.ReactNode;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith('/projects/')) {
      const slug = location.pathname.replace('/projects/', '');
      const project = projects.find((entry) => entry.slug === slug);
      return project ? `${project.name} | Planary` : 'Planary';
    }
    if (location.pathname === '/team') {
      return 'Team | Planary';
    }
    return 'Planary';
  }, [location.pathname]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Planary Home">
          <img
            src={isDarkMode ? logoViolette : logoBlau}
            alt="Planary"
            className="brand-logo"
          />
        </Link>

        <div className="header-actions">
          <button
            type="button"
            className={`menu-toggle-btn ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle Navigation Menu"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="primary-navigation"
            className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}
            aria-label="Primary Navigation"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            <Link to="/team" onClick={() => setIsMenuOpen(false)}>Team</Link>
            <a href="#footer" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </nav>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Toggle Theme"
          >
            <img
              src={
                isDarkMode
                  ? (isHovered ? sunFull : sunEmpty)
                  : (isHovered ? moonFull : moonEmpty)
              }
              alt=""
              className="theme-icon"
            />
          </button>
        </div>
      </header>

      <main id="top" className="main-content">
        {children}
      </main>

      <footer id="footer" className="site-footer">
        <div className="footer-content">
          <span className="copyright">
            &copy; {new Date().getFullYear()} Planary. Digital products with a clear visual identity.
          </span>

          <div className="footer-socials">
            <a href="https://github.com/planary" target="_blank" rel="noreferrer" className="social-link">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
            </a>
            <a href="https://instagram.com/planaryofficial" target="_blank" rel="noreferrer" className="social-link">
              <img src="https://www.svgrepo.com/show/521711/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@planaryofficial" target="_blank" rel="noreferrer" className="social-link">
              <img src={tiktokLogo} alt="TikTok" style={{ width: '26px', height: '26px' }} />
            </a>
          </div>

          <div className="footer-links">
            <a href="#top">Top</a>
            <a href="#projects">Projects</a>
            <a href="https://vercel.com">Vercel</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero-panel hero-panel-single">
        <div className="hero-copy">
          <span className="eyebrow">Planary Projects</span>
          <h1>We build focused digital products with their own personality.</h1>
          <p>
            Explore the current Planary portfolio, discover what each project is built for,
            and open dedicated detail pages for a closer look at the product story.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="primary-link">
              View projects
            </a>
            <Link to="/team" className="secondary-link">
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <section className="highlight-grid">
        {highlights.map((item) => (
          <article key={item.title} className="highlight-card">
            <span className="eyebrow">{item.label}</span>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>

      <section id="projects" className="projects-section">
        <div className="section-heading">
          <span className="eyebrow">Projects</span>
          <h2>A portfolio view of the current Planary ecosystem</h2>
          <p>
            Every card opens a separate project page with more context, intended audience,
            and a clearer explanation of the product direction.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className={`project-card ${project.accent} project-card-link`}
            >
              <div className="project-topline">
                <span className="status-pill">{project.status}</span>
                <span className="status-note">
                  {project.status === 'Live'
                    ? 'Ready to present'
                    : project.status === 'Growing'
                      ? 'Actively expanding'
                      : 'Queued next'}
                </span>
              </div>

              <div className="project-copy">
                <h3>{project.name}</h3>
                <p className="tagline">{project.tagline}</p>
                <p>{project.description}</p>
              </div>

              <div className="metric-list">
                {project.metrics.map((metric) => (
                  <span key={metric}>{metric}</span>
                ))}
              </div>

              <div className="project-footer">
                <strong className="inline-link">View project details</strong>
                <span className="footer-note">{project.summary}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectPage() {
  const location = useLocation();
  const slug = location.pathname.replace('/projects/', '');
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="project-detail-shell">
      <div className={`project-detail-card ${project.accent}`}>
        <div className="project-detail-back">
          <Link to="/" className="secondary-link">
            Back to projects
          </Link>
        </div>

        <span className="eyebrow">{project.name}</span>
        <h1>{project.tagline}</h1>
        <p className="project-detail-lead">{project.description}</p>

        <div className="project-detail-grid">
          <article className="detail-panel">
            <h2>Summary</h2>
            <p>{project.summary}</p>
          </article>
          <article className="detail-panel">
            <h2>Audience</h2>
            <p>{project.audience}</p>
          </article>
        </div>

        <div className="detail-panel detail-panel-wide">
          <h2>Project overview</h2>
          <div className="detail-copy-stack">
            {project.detail.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="detail-panel detail-panel-wide">
          <h2>Key themes</h2>
          <div className="metric-list">
            {project.metrics.map((metric) => (
              <span key={metric}>{metric}</span>
            ))}
          </div>
        </div>

        <div className="detail-panel detail-panel-wide">
          <h2>Live product</h2>
          <a href={project.website} target="_blank" rel="noreferrer" className="primary-link">
            Visit {project.name}
          </a>
        </div>
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <section className="team-shell">
      <div className="team-card">
        <span className="eyebrow">Team</span>
        <h1>Space reserved for the Planary team page.</h1>
        <p>
          This page is intentionally separated from the public portfolio so team-specific
          information can be added later without cluttering the customer-facing homepage.
        </p>

        <div className="detail-panel detail-panel-wide">
          <h2>Planned content</h2>
          <div className="team-list">
            <span>Team introductions</span>
            <span>Working principles</span>
            <span>Roles and collaboration</span>
            <span>Internal updates or hiring context</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme ? storedTheme === 'dark' : true;
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <SiteFrame
      isDarkMode={isDarkMode}
      onToggleTheme={() => setIsDarkMode((value) => !value)}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteFrame>
  );
}

export default App;
