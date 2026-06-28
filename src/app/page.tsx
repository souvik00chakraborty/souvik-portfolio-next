"use client";

import styles from "./page.module.css";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  icon: string;
}

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  skills: string[];
}

export default function Home() {
  const projects: Project[] = [
    {
      title: "Aether AI Studio",
      description: "A collaborative AI image generation dashboard featuring live canvas tools, prompt helpers, and instant generation models using serverless Edge workers.",
      tags: ["Next.js", "TypeScript", "React Compiler", "WebSockets"],
      githubUrl: "https://github.com",
      liveUrl: "https://vercel.app",
      icon: "🎨"
    },
    {
      title: "Chronos DB",
      description: "An ultra-lightweight, high-performance in-memory key-value database built in Rust, featuring a robust TypeScript client library and full replication support.",
      tags: ["Rust", "TypeScript", "gRPC", "Systems Programming"],
      githubUrl: "https://github.com",
      liveUrl: "https://vercel.app",
      icon: "⚡"
    },
    {
      title: "Zenith Telemetry",
      description: "Real-time user analytics and core web vitals monitor with zero performance footprint, powered by Next.js middleware and edge database queries.",
      tags: ["Next.js", "Edge DB", "Charts", "Telemetry"],
      githubUrl: "https://github.com",
      liveUrl: "https://vercel.app",
      icon: "📊"
    }
  ];

  const skillGroups: SkillGroup[] = [
    {
      category: "Frontend engineering",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      skills: ["React / Next.js", "TypeScript", "HTML5 & Vanilla CSS", "CSS Modules", "Responsive Web Design"]
    },
    {
      category: "Backend & Systems",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
      skills: ["Node.js / Express", "Rust", "REST & GraphQL APIs", "PostgreSQL / Prisma", "Redis Cache"]
    },
    {
      category: "Infrastructure & Tools",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a6 6 0 0 0 6-6 6 6 0 0 0-6-6z"></path>
        </svg>
      ),
      skills: ["Docker / Containers", "Vercel / AWS", "Git / GitHub Actions", "ESLint & Biome", "Linux Systems"]
    }
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>SC</div>
        <nav>
          <ul className={styles.navLinks}>
            <li><a href="#hero" className={styles.navLink} id="nav-hero-link">Home</a></li>
            <li><a href="#projects" className={styles.navLink} id="nav-projects-link">Projects</a></li>
            <li><a href="#skills" className={styles.navLink} id="nav-skills-link">Skills</a></li>
            <li><a href="#contact" className={styles.navLink} id="nav-contact-link">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section id="hero" className={styles.hero}>
          <div className={styles.heroGlow}></div>
          <div className={styles.tagline}>Available for Opportunities</div>
          <h1>
            Crafting the next generation of <span className={styles.gradientText}>interactive web</span> systems.
          </h1>
          <p>
            Hi, I&apos;m Souvik Chakraborty. I design and engineer premium full-stack web applications, focus heavily on performance, sleek design, and solid systems architecture.
          </p>
          <div className={styles.heroCtas}>
            <a href="#projects" className="btn-primary" id="hero-view-work-btn">
              View My Work
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#contact" className="btn-secondary" id="hero-contact-btn">
              Contact Me
            </a>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Featured Work</h2>
            <p>A selection of projects that demonstrate design sensibility and system expertise.</p>
          </div>
          <div className={styles.projectsGrid}>
            {projects.map((project, idx) => (
              <article key={idx} className={`${styles.projectCard} glass-card`}>
                <div>
                  <div className={styles.projectHeader}>
                    <div className={styles.projectIcon}>{project.icon}</div>
                    <div className={styles.projectLinks}>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub Repository" id={`project-git-${idx}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Live Site" id={`project-live-${idx}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className={styles.projectTags}>
                  {project.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Technical Skillset</h2>
            <p>A breakdown of the languages, libraries, and design workflows I leverage daily.</p>
          </div>
          <div className={styles.skillsContainer}>
            {skillGroups.map((group, idx) => (
              <div key={idx} className={styles.skillsGroup}>
                <h3>
                  {group.icon}
                  {group.category}
                </h3>
                <div className={styles.skillsList}>
                  {group.skills.map((skill, skillIdx) => (
                    <span key={skillIdx} className={styles.skillBadge}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Get in Touch</h2>
            <p>Have an interesting project or role? Let&apos;s build something together.</p>
          </div>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.contactMethod}>
                <div className={styles.contactIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:souvik@example.com" id="contact-email-link">souvik@example.com</a></p>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <div className={styles.contactIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Kolkata, India (Open to Remote)</p>
                </div>
              </div>
            </div>

            <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" className={styles.formInput} placeholder="Your Name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className={styles.formInput} placeholder="your.email@example.com" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" className={`${styles.formInput} ${styles.formTextarea}`} placeholder="How can I help you?" required></textarea>
              </div>
              <button type="submit" className="btn-primary" id="contact-submit-btn">
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Souvik Chakraborty. All rights reserved.</p>
        <div className={styles.socials}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} id="footer-github-link">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} id="footer-linkedin-link">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} id="footer-twitter-link">Twitter</a>
        </div>
      </footer>
    </div>
  );
}
