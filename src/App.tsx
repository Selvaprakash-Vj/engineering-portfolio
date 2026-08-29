import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { site as siteEn } from './site'
import { usePortfolioContent } from './i18n'
import { RouteLink, alternateLanguagePath, assetUrl, localizedHome, localizedResume, resolveLanguage, useAppRoute, type AppRoute, type Language } from './routing'
import { CinematicScrollSystem, ProjectCinematicScrollSystem } from './cinematic-scroll'

const nav = [
  ['01', '#identity', 'section'],
  ['02', '#experience', 'section'],
  ['03', '#expertise', 'section'],
  ['04', '#projects', 'section'],
  ['05', '#education', 'section'],
  ['06', 'resume', 'route'],
] as const

function Logo({ href = '#home', route = false }: { href?: string; route?: boolean }) {
  const content = (
    <>
      <svg viewBox="0 0 52 52" aria-hidden="true">
        <path d="M26 2.5 46.35 14.25v23.5L26 49.5 5.65 37.75v-23.5L26 2.5Z" />
        <path d="M34.2 16.6H22.6c-3.2 0-5.4 1.6-5.4 4.2 0 2.35 1.65 3.55 4.65 4.25l7.65 1.75c3.6.8 5.7 2.55 5.7 5.75 0 4.1-3.45 6.65-8.8 6.65H16.7" />
      </svg>
      <span><strong>SELVA</strong><small>ENGINEERING LAB</small></span>
    </>
  )

  if (route) {
    return <RouteLink className="brand" to={href} aria-label="Selva Engineering Lab homepage">{content}</RouteLink>
  }

  return <a className="brand" href={href} aria-label="Selva Engineering Lab homepage">{content}</a>
}


function LanguageSwitch({ route, compact = false }: { route: AppRoute; compact?: boolean }) {
  const language = resolveLanguage()
  return (
    <div className={`language-switch ${compact ? 'compact' : ''}`} aria-label={language === 'de' ? 'Sprache' : 'Language'}>
      <RouteLink className={language === 'en' ? 'active' : ''} to={alternateLanguagePath(route, 'en')} aria-current={language === 'en' ? 'page' : undefined}>EN</RouteLink>
      <span>/</span>
      <RouteLink className={language === 'de' ? 'active' : ''} to={alternateLanguagePath(route, 'de')} aria-current={language === 'de' ? 'page' : undefined}>DE</RouteLink>
    </div>
  )
}

function RouteAnnouncer({ route }: { route: AppRoute }) {
  const { ui } = usePortfolioContent()
  return <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{ui.routeLabels[route]}</div>
}

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      const progress = available > 0 ? window.scrollY / available : 0
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />
}

function Navbar() {
  const { language, site, ui } = usePortfolioContent()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', 'identity', 'experience', 'expertise', 'projects', 'education', 'resume', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return () => document.body.classList.remove('menu-open')

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <>
      <ScrollProgress />
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Logo />
        <nav id="primary-navigation" className={open ? 'nav open' : 'nav'} aria-label={ui.primaryNavigation}>
          {nav.map(([number, href, kind], index) => {
            const label = ui.nav[index]
            if (kind === 'route') {
              return (
                <RouteLink key={number} to={localizedResume(language)} onClick={() => setOpen(false)}>
                  <span>{number}.</span>{label}
                </RouteLink>
              )
            }

            const id = href.slice(1)
            return (
              <a key={number} className={active === id ? 'active' : ''} href={href} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>
                <span>{number}.</span>{label}
              </a>
            )
          })}
          <LanguageSwitch route="home" compact />
          <a className="button small outline" href={assetUrl(site.resume)} target="_blank" rel="noreferrer">{language === 'de' ? 'CV DE' : 'CV PDF'}</a>
        </nav>
        <button className={open ? 'menu active' : 'menu'} onClick={() => setOpen(!open)} aria-label={open ? ui.menuClose : ui.menuOpen} aria-controls="primary-navigation" aria-expanded={open}>
          <i /><i /><i />
        </button>
      </header>
    </>
  )
}

function Rotor() {
  return (
    <div className="rotor" aria-hidden="true">
      <div className="rotor-glow" />
      <svg viewBox="0 0 620 620">
        <defs>
          <linearGradient id="ring" x1="0" x2="1"><stop offset="0" stopColor="#4cc9f0" stopOpacity=".08"/><stop offset=".48" stopColor="#4cc9f0" stopOpacity=".82"/><stop offset="1" stopColor="#ff6b35" stopOpacity=".7"/></linearGradient>
          <radialGradient id="core"><stop offset="0" stopColor="#172231" stopOpacity=".95"/><stop offset=".72" stopColor="#101925" stopOpacity=".82"/><stop offset="1" stopColor="#080d14" stopOpacity="0"/></radialGradient>
        </defs>
        <circle cx="310" cy="310" r="242" fill="none" stroke="#263547" strokeWidth="1" strokeDasharray="2 12"/>
        <circle cx="310" cy="310" r="207" fill="none" stroke="url(#ring)" strokeWidth="1.4" opacity=".74"/>
        <ellipse cx="310" cy="310" rx="245" ry="90" fill="none" stroke="#4cc9f0" strokeOpacity=".24" transform="rotate(-18 310 310)"/>
        <ellipse cx="310" cy="310" rx="245" ry="90" fill="none" stroke="#ff6b35" strokeOpacity=".22" transform="rotate(63 310 310)"/>
        <g className="blades">
          <circle cx="310" cy="310" r="132" fill="url(#core)" stroke="#3c5067"/>
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d="M310 178 C341 188 353 218 342 251 C329 234 309 224 286 227 C297 210 305 194 310 178Z" fill="none" stroke={i % 3 === 0 ? '#ff6b35' : '#4cc9f0'} strokeOpacity={i % 3 === 0 ? .64 : .4} transform={`rotate(${i * 30} 310 310)`}/>
          ))}
          <circle cx="310" cy="310" r="46" fill="#080d14" stroke="#4cc9f0" strokeOpacity=".65"/>
          <circle cx="310" cy="310" r="11" fill="#ff6b35"/>
        </g>
        <g className="nodes" fill="#4cc9f0"><circle cx="165" cy="165" r="3"/><circle cx="469" cy="191" r="2.5"/><circle cx="496" cy="395" r="3"/><circle cx="204" cy="474" r="2.5"/></g>
        <g className="labels"><text x="94" y="139">NODE 0217</text><text x="449" y="166">30 000 RPM</text><text x="455" y="432">σV / MPa</text><text x="123" y="506">MESH // 0.82</text></g>
      </svg>
      <div className="badge b1"><span>SYS</span><strong>NOMINAL</strong></div>
      <div className="badge b2"><span>SOLVER</span><strong>CONVERGED</strong></div>
      <div className="orbit-dot d1" /><div className="orbit-dot d2" />
    </div>
  )
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const move = (event: PointerEvent) => {
      if (ref.current) ref.current.style.transform = `translate3d(${event.clientX - 230}px, ${event.clientY - 230}px, 0)`
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

function SideRails() {
  const { language, site, ui } = usePortfolioContent()
  return (
    <>
      <aside className="social-rail">
        <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .9A11.2 11.2 0 0 0 8.46 22.73c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.16A10.7 10.7 0 0 1 12 6.18c.95 0 1.9.13 2.8.38 2.14-1.46 3.08-1.16 3.08-1.16.62 1.55.23 2.7.12 2.98.72.79 1.15 1.8 1.15 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.77 1.04.77 2.1v3.12c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .9Z"/></svg></a>
        <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M5.34 7.63H1.36V20.4h3.98V7.63ZM3.35 1.6a2.31 2.31 0 1 0 0 4.62 2.31 2.31 0 0 0 0-4.62ZM20.64 13.08c0-3.85-2.05-5.64-4.79-5.64-2.2 0-3.19 1.21-3.74 2.06V7.63H8.13V20.4h3.98v-6.32c0-1.67.32-3.29 2.4-3.29 2.05 0 2.08 1.92 2.08 3.4v6.21h3.98l.07-7.32Z"/></svg></a>
        <i />
      </aside>
      <aside className="email-rail"><a href={`mailto:${site.email}`}>{site.email}</a><i /></aside>
    </>
  )
}

function SectionHeader({ index, label, title, text }: { index: string; label: string; title: string; text?: string }) {
  return (
    <div className="section-header" data-reveal>
      <p className="section-kicker"><span>{index}</span>{label}</p>
      <div className="section-heading">
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </div>
  )
}

function IdentitySection() {
  const { language, site, ui } = usePortfolioContent()
  return (
    <section id="identity" className="identity section panel-section">
      <SectionHeader
        index="01"
        label={ui.identity.label}
        title={ui.identity.title}
        text={ui.identity.text}
      />
      <div className="identity-grid">
        <div className="identity-copy" data-reveal>
          {site.profile.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <div className="identity-actions">
            <a className="text-link" href="#experience">{ui.identity.career} <span>↘</span></a>
            <a className="text-link muted-link" href={assetUrl(site.resume)} target="_blank" rel="noreferrer">{ui.identity.pdf} <span>↗</span></a>
          </div>
        </div>
        <div className="identity-console" data-reveal>
          <div className="console-head"><span>PROFILE_KERNEL.exe</span></div>
          <div className="console-body">
            <p><span>{ui.identity.name}</span>{site.name}</p>
            <p><span>{ui.identity.role}</span>{site.role}</p>
            <p><span>{ui.identity.base}</span>{site.location}</p>
            <p><span>{ui.identity.focus}</span>{ui.identity.focusValue}</p>
            <p><span>{ui.identity.method}</span><strong>{ui.identity.methodValue}</strong></p>
          </div>
          <div className="console-visual" aria-hidden="true">
            <div className="workflow-map">
              {(language === 'de' ? ['ENTWICKELN', 'SIMULIEREN', 'VALIDIEREN', 'VERBESSERN'] : ['BUILD', 'SIMULATE', 'VALIDATE', 'IMPROVE']).map((step, index) => (
                <div className="workflow-step" key={step}>
                  <span>0{index + 1}</span>
                  <i />
                  <strong>{step}</strong>
                </div>
              ))}
              <div className="workflow-line"><i /></div>
            </div>
            <div className="workflow-readout"><span>{ui.identity.loop}</span><strong>{ui.identity.active}</strong></div>
          </div>
          <div className="console-status"><i /> {ui.identity.status}</div>
        </div>
      </div>
      <div className="principle-grid">
        {site.principles.map(([number, title, text]) => (
          <article key={number} className="principle" data-reveal>
            <span>{number}</span><h3>{title}</h3><p>{text}</p><i />
          </article>
        ))}
      </div>
    </section>
  )
}

function ExperienceSection() {
  const { language, site, ui } = usePortfolioContent()
  const [selected, setSelected] = useState(0)
  const experience = site.experiences[selected]

  return (
    <section id="experience" className="experience section">
      <SectionHeader
        index="02"
        label={ui.experience.label}
        title={ui.experience.title}
        text={ui.experience.text}
      />

      <div className="career-route" data-reveal aria-label={ui.experience.label}>
        {site.experiences.map((item, index) => (
          <button
            key={item.chapter}
            className={selected === index ? 'active' : ''}
            onClick={() => setSelected(index)}
            aria-label={`${language === 'de' ? 'Öffnen' : 'Open'} ${item.chapter}`}
          >
            <span>0{index + 1}</span>
            <i />
            <strong>{item.chapter}</strong>
          </button>
        ))}
        <div className="career-route-line"><i /></div>
      </div>

      <div className="experience-system" data-reveal>
        <div className="experience-tabs" role="tablist" aria-label={ui.experience.label}>
          {site.experiences.map((item, index) => (
            <button key={item.short} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)} role="tab" aria-selected={selected === index}>
              <span>0{index + 1}</span><strong>{item.short}</strong><small>{item.period}</small>
            </button>
          ))}
        </div>
        <article className="experience-panel" key={experience.short} role="tabpanel">
          <div className="experience-topline">
            <div><span>{ui.experience.activeRecord} // 0{selected + 1}</span><i /></div><strong>{experience.period}</strong>
          </div>
          <p className="experience-chapter">{experience.chapter}</p>
          <h3>{experience.role} <span>@ {experience.company}</span></h3>
          <p className="experience-location">{experience.location}</p>
          <div className="experience-mission">
            <span>{ui.experience.mission}</span>
            <strong>{experience.mission}</strong>
          </div>
          <p className="experience-summary">{experience.summary}</p>
          <ul>
            {experience.bullets.map(bullet => <li key={bullet}><span>▹</span>{bullet}</li>)}
          </ul>
          <div className="tool-chips">{experience.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
          <div className="experience-progression">
            <span>{ui.experience.stageAdded}</span>
            <strong>{experience.progression}</strong>
          </div>
          <div className="panel-corner tl" /><div className="panel-corner br" />
        </article>
      </div>
      <div className="career-metrics" data-reveal>
        {ui.experience.metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
    </section>
  )
}

function ExpertiseSection() {
  const { language, site, ui } = usePortfolioContent()
  const pipeline = ui.expertise.pipeline
  const verification = ui.expertise.verificationSignals

  return (
    <section id="expertise" className="expertise section panel-section">
      <SectionHeader
        index="03"
        label={ui.expertise.label}
        title={ui.expertise.title}
        text={ui.expertise.text}
      />

      <div className="engineering-pipeline" data-reveal aria-label={ui.expertise.label}>
        {pipeline.map((step, index) => (
          <div key={step}>
            <span>0{index + 1}</span>
            <i />
            <strong>{step}</strong>
          </div>
        ))}
        <div className="engineering-pipeline-line"><i /></div>
      </div>

      <div className="expertise-grid">
        {site.expertise.map((item, index) => (
          <article className="expertise-card" key={item.code} data-reveal>
            <div className="expertise-code"><span>{item.code}</span><small>0{index + 1}</small></div>
            <div className="expertise-signal"><i />{item.signal}</div>
            <h3>{item.title}</h3>
            <h4>{item.subtitle}</h4>
            <p>{item.description}</p>
            <ul>{item.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul>
            <div className="expertise-tools">
              <span>{ui.expertise.toolchain}</span>
              <p>{item.tools.join(' · ')}</p>
            </div>
            <div className="card-scan" /><div className="card-corner" />
          </article>
        ))}
      </div>

      <div className="verification-layer" data-reveal>
        <div className="verification-head">
          <div><i /><span>{ui.expertise.verification}</span></div>
          <strong>{ui.expertise.verificationAction}</strong>
        </div>
        <p>{ui.expertise.verificationText}</p>
        <div className="verification-signals">
          {verification.map((item, index) => <span key={item}><small>V{index + 1}</small>{item}</span>)}
        </div>
        <div className="verification-scan"><i /></div>
      </div>

      <div className="stack-marquee" aria-label="Technical tools">
        <div>
          ANSYS WORKBENCH <i /> APDL <i /> PYTHON <i /> CREO <i /> CATIA V5 <i /> SOLIDWORKS <i /> MATLAB <i /> HYPERMESH <i /> ABAQUS <i /> MKS <i /> MACHINE LEARNING <i /> STRUCTURAL DYNAMICS <i /> THERMOMECHANICS <i /> VALIDATION <i />
          ANSYS WORKBENCH <i /> APDL <i /> PYTHON <i /> CREO <i /> CATIA V5 <i /> SOLIDWORKS <i /> MATLAB <i /> HYPERMESH <i /> ABAQUS <i /> MKS <i /> MACHINE LEARNING <i /> STRUCTURAL DYNAMICS <i /> THERMOMECHANICS <i /> VALIDATION <i />
        </div>
      </div>
    </section>
  )
}

function ProjectGraphic({ index }: { index: number }) {
  return (
    <div className={`project-graphic graphic-${index + 1}`} aria-hidden="true">
      <div className="graphic-grid" />
      <div className="graphic-ring r-a" /><div className="graphic-ring r-b" />
      <div className="graphic-core"><i /><i /><i /><i /></div>
      <svg viewBox="0 0 360 180" preserveAspectRatio="none">
        <polyline points={index % 2 === 0 ? '0,140 45,127 80,132 118,88 156,96 195,50 238,73 280,28 325,43 360,18' : '0,30 45,42 83,28 120,75 160,60 198,117 240,93 280,145 320,126 360,160'} />
      </svg>
      <span>DATA_CHANNEL_0{index + 1}</span>
    </div>
  )
}

function ProjectsSection() {
  const { language, site, ui } = usePortfolioContent()
  return (
    <section id="projects" className="projects section">
      <SectionHeader
        index="04"
        label={ui.projects.label}
        title={ui.projects.title}
        text={ui.projects.text}
      />
      <div className="project-grid">
        {site.projects.map((project, index) => (
          <article className={`project-card ${project.accent}`} key={project.number} data-reveal>
            <div className="project-meta"><span>{project.number}</span><strong className={`status ${project.status.toLowerCase()}`}><i />{language === 'de' ? (project.status === 'COMPLETE' ? 'ABGESCHLOSSEN' : project.status === 'MILESTONE' ? 'MEILENSTEIN' : 'PRIVAT') : project.status}</strong></div>
            <ProjectGraphic index={index} />
            <p className="project-category">{project.category}</p>
            <h3>{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-result"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
            <div className="tool-chips compact">{project.stack.map(tool => <span key={tool}>{tool}</span>)}</div>
            <RouteLink
              className="project-link project-link-active"
              to={language === 'de' ? `/de/projekte/${project.route}` : `/projects/${project.route}`}
            >
              <span>{ui.projects.open}</span><strong>{project.release}</strong><i>↗</i>
            </RouteLink>
          </article>
        ))}
      </div>
      <div className="project-lab-note" data-reveal>
        <div><i /><span>{ui.projects.curation}</span></div>
        <p>{ui.projects.note}</p>
      </div>
    </section>
  )
}

function EducationSection() {
  const { language, site, ui } = usePortfolioContent()
  return (
    <section id="education" className="education section panel-section">
      <SectionHeader
        index="05"
        label={ui.education.label}
        title={ui.education.title}
        text={ui.education.text}
      />
      <div className="education-track">
        {site.education.map((item, index) => (
          <article className="education-card" key={item.degree} data-reveal>
            <div className="education-index"><span>0{index + 1}</span><i /></div>
            <div className="education-main">
              <p>{item.period} · {item.location}</p>
              <h3>{item.degree}</h3>
              <h4>{item.institution}</h4>
              <div className="education-focus">{item.focus.map(focus => <span key={focus}>{focus}</span>)}</div>
              <div className="thesis"><span>{item.thesisLabel}</span><p>{item.thesis}</p></div>
            </div>
            <div className="education-grade"><span>{ui.education.grade}</span><strong>{item.grade}</strong></div>
          </article>
        ))}
      </div>
      <div className="certification-block" data-reveal>
        <div><p className="section-kicker"><span>+</span>{ui.education.continuous}</p><h3>{ui.education.learningTitle}</h3></div>
        <div className="cert-list">
          {site.certifications.map((item, index) => (
            <p key={item.title}>
              <span>0{index + 1}</span>
              <span className="cert-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
              <i>{item.state}</i>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResumeSection() {
  const { language, site, ui } = usePortfolioContent()
  return (
    <section id="resume" className="resume-section section">
      <SectionHeader
        index="06"
        label={ui.resume.label}
        title={ui.resume.title}
        text={ui.resume.text}
      />
      <div className="resume-shell" data-reveal>
        <aside className="resume-sidebar">
          <div className="resume-avatar"><span>SV</span><i /><i /></div>
          <h3>{site.name}</h3><p>{site.role}</p>
          <div className="resume-contact">
            <span>{ui.resume.location}<strong>{site.location}</strong></span>
            <span>{ui.resume.email}<strong>{site.email}</strong></span>
            <span>{ui.resume.status}<strong>{site.availability}</strong></span>
          </div>
          <a className="button primary full" href={assetUrl(site.resume)} target="_blank" rel="noreferrer">{language === 'de' ? ui.resume.openGerman : ui.resume.open} <span>↗</span></a>
          <div className="resume-network">
            <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={`mailto:${site.email}`}>Email ↗</a>
          </div>
          <div className="resume-code">{ui.resume.dossier}<br/>{ui.resume.revision}<br/>{ui.resume.locked}</div>
        </aside>
        <div className="resume-document">
          <div className="resume-doc-head"><span>{ui.resume.careerDossier}</span><span>{ui.resume.updated}</span></div>
          <section>
            <h4>{ui.resume.profile}</h4>
            <div className="resume-profile">{site.resumeProfile.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>
          <section>
            <h4>{ui.resume.experience}</h4>
            {site.experiences.map(item => (
              <div className="resume-line" key={item.company}>
                <span>{item.period}</span><div><strong>{item.role}</strong><p>{item.company} · {item.location}</p></div>
              </div>
            ))}
          </section>
          <section>
            <h4>{ui.resume.education}</h4>
            {site.education.map(item => (
              <div className="resume-line" key={item.degree}>
                <span>{item.period}</span><div><strong>{item.degree}</strong><p>{item.institution} · {item.location}</p></div>
              </div>
            ))}
          </section>
          <section>
            <h4>{ui.resume.technical}</h4>
            <div className="resume-tools">
              {site.toolGroups.map(([group, tools]) => <p key={group}><span>{group}</span>{tools}</p>)}
            </div>
          </section>
          <section>
            <h4>{ui.resume.certifications}</h4>
            <div className="resume-tools">
              {site.certifications.map(item => <p key={item.title}><span>{item.state}</span>{item.title}</p>)}
            </div>
          </section>
          <section>
            <h4>{ui.resume.languages}</h4>
            <div className="resume-tools">
              {site.languages.map(([language, level]) => <p key={language}><span>{language}</span>{level}</p>)}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}


function ResumeTopbar() {
  const { language, site, ui } = usePortfolioContent()
  return (
    <header className="case-topbar resume-topbar">
      <Logo href={localizedHome(language)} route />
      <div className="case-topbar-actions">
        <RouteLink to={localizedHome(language)}>← {ui.resumePage.portfolio}</RouteLink>
        <LanguageSwitch route="resume" compact />
        <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a className="button small primary" href={assetUrl(site.resume)} target="_blank" rel="noreferrer">{ui.resumePage.open} ↗</a>
      </div>
    </header>
  )
}

function ResumePage() {
  const { language, site, ui } = usePortfolioContent()
  return (
    <div className="case-page resume-page">
      <a className="skip-link" href="#resume-main">{ui.skipResume}</a>
      <CursorGlow /><div className="noise" /><div className="grid" />
      <ResumeTopbar />
      <main id="resume-main" className="resume-page-main" tabIndex={-1}>
        <section className="resume-page-hero">
          <p className="case-overline"><span>{ui.resumePage.overline}</span> {ui.resumePage.dossier}</p>
          <h1>{ui.resumePage.title}</h1>
          <p>{ui.resumePage.intro}</p>
          <div className="actions">
            <a className="button primary" href={assetUrl(site.resume)} target="_blank" rel="noreferrer">{ui.resumePage.open} <span>↗</span></a>
            <a className="button ghost" href={`mailto:${site.email}`}>{ui.resumePage.contact} <span>↗</span></a>
          </div>
          <div className="resume-page-status">
            <span><i />{ui.resumePage.profile}</span>
            <span>{ui.resumePage.location}</span>
            <span>{ui.resumePage.availability}</span>
          </div>
        </section>
        <ResumeSection />
        <footer className="resume-page-footer">
          <RouteLink to={localizedHome(language)}>← {ui.resumePage.return}</RouteLink>
          <div>
            <a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={`mailto:${site.email}`}>Email ↗</a>
          </div>
        </footer>
      </main>
    </div>
  )
}


const projectTranslationsDe: Record<'machineguard' | 'finance', Record<string, string>> = {
  machineguard: {
    'Skip to project content': 'Zum Projektinhalt springen',
    '← Portfolio': '← Portfolio',
    'Launch dashboard ↗': 'Dashboard öffnen ↗',
    'PROJECT // MG-01': 'PROJEKT // MG-01',
    'RELEASED · v1.0.0': 'VERÖFFENTLICHT · v1.0.0',
    'Reliability-aware Remaining Useful Life prediction for NASA C-MAPSS turbofan engines.': 'Zuverlässigkeitsbewusste Remaining-Useful-Life-Prognose für NASA-C-MAPSS-Turbofantriebwerke.',
    'Predict remaining life. Measure uncertainty. Flag predictions that deserve a second look.': 'Restlebensdauer prognostizieren. Unsicherheit quantifizieren. Auffällige Vorhersagen für eine technische Prüfung kennzeichnen.',
    'Open live dashboard': 'Live-Dashboard öffnen',
    'View GitHub repository': 'GitHub-Repository ansehen',
    'Read full project report': 'Vollständigen Projektbericht lesen',
    'Overview': 'Übersicht', 'Workflow': 'Workflow', 'Results': 'Ergebnisse', 'Reliability': 'Zuverlässigkeit', 'Decision layer': 'Entscheidungsebene', 'Explore': 'Vertiefen',
    'ENGINEERING PROBLEM': 'TECHNISCHE FRAGESTELLUNG',
    'How many operating cycles remain—and how much should we trust the answer?': 'Wie viele Betriebszyklen verbleiben – und wie belastbar ist diese Aussage?',
    'MachineGuard AI uses the latest sensor history of a simulated turbofan engine to estimate Remaining Useful Life. The prediction is not treated as an automatic maintenance command; it is one piece of evidence within an engineering review workflow.': 'MachineGuard AI nutzt die jüngste Sensorhistorie eines simulierten Turbofantriebwerks, um die Remaining Useful Life zu schätzen. Die Prognose wird nicht als automatische Instandhaltungsentscheidung verstanden, sondern als ein Evidenzbaustein innerhalb eines technischen Prüfprozesses.',
    'WHAT THIS PROJECT IS': 'PROJEKTPOSITIONIERUNG',
    'An end-to-end predictive-maintenance system, not only a trained neural network.': 'Ein durchgängiges Predictive-Maintenance-System – nicht nur ein trainiertes neuronales Netz.',
    'It converts engine histories into RUL estimates, checks uncertainty and temporal behaviour, and presents the evidence in a form an engineer can review.': 'Es überführt Triebwerksverläufe in RUL-Schätzungen, prüft Unsicherheit und zeitliches Verhalten und stellt die Evidenz so dar, dass sie technisch bewertet werden kann.',
    'MODEL INPUT': 'MODELLEINGANG', 'MODEL OUTPUT': 'MODELLAUSGANG', 'ENGINEERING GOAL': 'TECHNISCHES ZIEL',
    'The latest 30 operating cycles, with three operating settings and 21 simulated sensor measurements per cycle.': 'Die letzten 30 Betriebszyklen mit drei Betriebseinstellungen und 21 simulierten Sensormesswerten je Zyklus.',
    'Estimated cycles remaining before the simulated end-of-life threshold, using a capped 125-cycle target.': 'Geschätzte verbleibende Zyklen bis zur simulierten End-of-Life-Schwelle mit einem auf 125 Zyklen begrenzten Zielwert.',
    'Estimate remaining life while making uncertainty, suspicious behaviour and review needs visible.': 'Restlebensdauer schätzen und zugleich Unsicherheit, auffälliges Verhalten und Prüfbedarf sichtbar machen.',
    'END-TO-END WORKFLOW': 'DURCHGÄNGIGER WORKFLOW', 'Methodology before architecture.': 'Methodik vor Modellarchitektur.',
    'The decisive improvement came from rebuilding the experiment around leakage-safe data handling and deployment-aligned evaluation—not from simply replacing one neural network with another.': 'Die entscheidende Verbesserung entstand durch leakage-sichere Datenaufbereitung und eine einsatznahe Bewertung – nicht durch den bloßen Austausch eines neuronalen Netzes.',
    'CORE DESIGN CHOICES': 'ZENTRALE METHODISCHE ENTSCHEIDUNGEN',
    'Split complete engines': 'Vollständige Triebwerke trennen', 'No engine trajectory appears across training and validation.': 'Keine Triebwerkstrajektorie erscheint gleichzeitig in Training und Validierung.',
    'Fit scaling on training data only': 'Skalierung ausschließlich auf Trainingsdaten fitten', 'Unseen-engine statistics never influence preprocessing.': 'Statistiken unbekannter Triebwerke beeinflussen das Preprocessing nicht.',
    'Use 30-cycle temporal windows': 'Zeitfenster mit 30 Zyklen verwenden', 'Each model receives the same recent operating history.': 'Jedes Modell erhält dieselbe jüngste Betriebshistorie.',
    'Score one final window per test engine': 'Ein finales Fenster je Testtriebwerk bewerten', 'Every unseen engine contributes one deployment-style prediction.': 'Jedes unbekannte Triebwerk liefert genau eine einsatznahe Prognose.',
    'Compare against simple baselines': 'Mit einfachen Baselines vergleichen', 'Complexity must outperform transparent alternatives.': 'Komplexität muss transparente Alternativen tatsächlich übertreffen.',
    'RMSE after the methodology rebuild': 'RMSE nach dem methodischen Neuaufbau',
    'KEY RESULTS': 'ZENTRALE ERGEBNISSE', 'Strong performance—with the model roles kept honest.': 'Starke Ergebnisse – bei klarer und ehrlicher Rollenverteilung der Modelle.',
    'The GRU offered the strongest standalone operational balance. A GRU–LSTM ensemble achieved the best aggregate RMSE, while Ridge remained a valuable independent baseline and the Transformer result was retained as an honest negative experiment.': 'Die GRU bot die stärkste eigenständige operative Balance. Ein GRU–LSTM-Ensemble erzielte den besten aggregierten RMSE, Ridge blieb eine wertvolle unabhängige Baseline und das Transformer-Ergebnis wurde als ehrliches negatives Experiment beibehalten.',
    'cycles': 'Zyklen', 'test fleet': 'Testflotte', '90% target': '90-%-Ziel',
    'PRIMARY MODEL': 'PRIMÄRMODELL', 'BEST AVERAGE RMSE': 'BESTER MITTLERER RMSE', 'NEGATIVE RESULT RETAINED': 'NEGATIVES ERGEBNIS BEIBEHALTEN',
    'Best standalone balance of error, efficiency and dangerous-overprediction behaviour.': 'Beste eigenständige Balance aus Fehler, Effizienz und riskantem Überprognoseverhalten.',
    'Validation-selected ensemble with RMSE 13.21.': 'Validierungsbasiert gewähltes Ensemble mit RMSE 13,21.',
    'More complexity did not improve this FD001 experiment.': 'Mehr Komplexität verbesserte dieses FD001-Experiment nicht.',
    'RELIABILITY BEYOND ACCURACY': 'ZUVERLÄSSIGKEIT ÜBER GENAUIGKEIT HINAUS', 'A point prediction is only the beginning.': 'Eine Punktprognose ist nur der Anfang.',
    'Three additional evidence layers help expose difficult cases and make the RUL estimate easier to question, explain and review.': 'Drei zusätzliche Evidenzebenen helfen, schwierige Fälle sichtbar zu machen und die RUL-Schätzung besser hinterfragen, erklären und prüfen zu können.',
    'Uncertainty estimation': 'Unsicherheitsschätzung', 'Trajectory diagnostics': 'Trajektoriendiagnostik', 'Explainability': 'Erklärbarkeit',
    'Repeated stochastic GRU predictions create a calibrated interval instead of presenting one precise-looking number without context.': 'Wiederholte stochastische GRU-Prognosen erzeugen ein kalibriertes Intervall, statt eine scheinbar exakte Zahl ohne Kontext auszugeben.',
    'The history of predicted RUL is checked for plateaus, instability and physically suspicious changes that a final point estimate can hide.': 'Der Verlauf der prognostizierten RUL wird auf Plateaus, Instabilität und physikalisch auffällige Änderungen geprüft, die eine finale Punktprognose verdecken kann.',
    'Feature occlusion reveals which sensor channels influence the model most, while keeping model reliance separate from physical causality.': 'Feature Occlusion zeigt, welche Sensorkanäle das Modell besonders beeinflussen, ohne Modellabhängigkeit mit physikalischer Kausalität gleichzusetzen.',
    '100 MC PASSES / ENGINE': '100 MC-DURCHLÄUFE / TRIEBWERK', '90% TARGET COVERAGE': '90 % ZIELABDECKUNG', '88% OBSERVED COVERAGE': '88 % BEOBACHTETE ABDECKUNG',
    'Confidence is not correctness.': 'Konfidenz ist nicht gleich Korrektheit.', 'Uncertainty helps identify difficult cases, but a model can still be confidently wrong.': 'Unsicherheit hilft bei der Erkennung schwieriger Fälle, dennoch kann ein Modell mit hoher Konfidenz falsch liegen.',
    'FAILURE CASE': 'FEHLERFALL', 'Engine 67: agreement without correctness.': 'Engine 67: Übereinstimmung ohne Korrektheit.',
    'GRU and Ridge produced similar optimistic predictions. Their agreement looked reassuring, but the historical RUL trajectory showed an unrealistic high-RUL plateau and triggered engineering review.': 'GRU und Ridge lieferten ähnlich optimistische Prognosen. Die Übereinstimmung wirkte zunächst beruhigend, doch die historische RUL-Trajektorie zeigte ein unrealistisches High-RUL-Plateau und löste eine technische Prüfung aus.',
    'ACTUAL RUL': 'TATSÄCHLICHE RUL', 'RIDGE PREDICTION': 'RIDGE-PROGNOSE', 'TRAJECTORY FLAG': 'TRAJEKTORIE-FLAG', 'ENGINEERING REVIEW': 'TECHNISCHE PRÜFUNG', 'REQUIRED': 'ERFORDERLICH',
    'Model agreement does not guarantee model correctness. Prediction history exposed a shared blind spot that the final estimates did not.': 'Modellübereinstimmung garantiert keine Modellkorrektheit. Der Prognoseverlauf deckte einen gemeinsamen Blind Spot auf, den die finalen Schätzungen nicht sichtbar machten.',
    'ENGINEERING DECISION LAYER': 'ENGINEERING-ENTSCHEIDUNGSEBENE', 'The model organises the evidence. The engineer retains the decision.': 'Das Modell strukturiert die Evidenz. Die Entscheidung bleibt beim Ingenieur.',
    'Predicted RUL, uncertainty, model disagreement and trajectory behaviour are combined into four separate decision-support views. The system structures the evidence; it does not authorise maintenance actions.': 'Prognostizierte RUL, Unsicherheit, Modellabweichung und Trajektorienverhalten werden in vier getrennten Entscheidungsansichten zusammengeführt. Das System strukturiert die Evidenz, autorisiert jedoch keine Instandhaltungsmaßnahmen.',
    'Engine condition': 'Triebwerkszustand', 'How urgent does the estimated physical condition appear?': 'Wie dringlich erscheint der geschätzte physische Zustand?',
    'Reliability risk': 'Prognosezuverlässigkeit', 'How trustworthy or suspicious is the available prediction evidence?': 'Wie belastbar oder auffällig ist die vorliegende Prognoseevidenz?',
    'Engineering review': 'Technische Prüfung', 'Should a human inspect the result before it is used?': 'Soll das Ergebnis vor seiner Nutzung durch einen Menschen geprüft werden?',
    'Operational priority': 'Operative Priorität', 'How urgently should the engine enter the maintenance workflow?': 'Wie dringend sollte das Triebwerk in den Instandhaltungsprozess aufgenommen werden?',
    'EXPLORE THE COMPLETE PROJECT': 'GESAMTPROJEKT VERTIEFEN', 'The portfolio page is the overview. The deeper evidence lives here.': 'Die Portfolio-Seite liefert den Überblick. Die vertiefende Evidenz finden Sie hier.',
    'Use the live dashboard for interactive investigation, GitHub for the implementation and release history, and the full report for the complete engineering and machine-learning study.': 'Nutzen Sie das Live-Dashboard für die interaktive Analyse, GitHub für Implementierung und Release-Historie und den vollständigen Bericht für die gesamte Engineering- und Machine-Learning-Studie.',
    'Explore the system': 'System interaktiv erkunden', 'Review the implementation': 'Implementierung prüfen', 'Read the complete study': 'Vollständige Studie lesen',
    'Open dashboard ↗': 'Dashboard öffnen ↗', 'View repository ↗': 'Repository ansehen ↗', 'Open report ↗': 'Bericht öffnen ↗',
    'RESPONSIBLE-USE BOUNDARY': 'VERANTWORTUNGSVOLLE NUTZUNG',
    'MachineGuard AI is an educational portfolio project built on simulated NASA data.': 'MachineGuard AI ist ein Ausbildungs- und Portfolio-Projekt auf Basis simulierter NASA-Daten.',
    'It is not a certified aircraft-maintenance system and does not replace inspection, sensor validation, maintenance history or qualified engineering judgement.': 'Es ist kein zertifiziertes Instandhaltungssystem für Luftfahrzeuge und ersetzt weder Inspektion, Sensorvalidierung und Wartungshistorie noch qualifizierte technische Beurteilung.',
    'PROJECT STATUS': 'PROJEKTSTATUS', 'COMPLETE · RELEASED · PUBLIC': 'ABGESCHLOSSEN · VERÖFFENTLICHT · ÖFFENTLICH', '← Return to project lab': '← Zurück zum Projektlabor', 'Download technical report ↗': 'Technischen Bericht herunterladen ↗',
    '100 training + 100 test engines': '100 Trainings- + 100 Testtriebwerke', 'Leakage-safe preprocessing': 'Leakage-sicheres Preprocessing', 'Engine split · train-only scaling · 30-cycle windows': 'Triebwerkssplit · Skalierung nur auf Training · 30-Zyklen-Fenster',
    'Model benchmark': 'Modellbenchmark', 'Validation-only selection': 'Auswahl ausschließlich auf Validierung', 'Primary GRU · 60/40 GRU–LSTM ensemble': 'Primäre GRU · 60/40-GRU–LSTM-Ensemble',
    'Reliability layer': 'Zuverlässigkeitsebene', 'MC dropout · calibration · disagreement · trajectories': 'MC Dropout · Kalibrierung · Abweichung · Trajektorien',
    'Explainability layer': 'Erklärbarkeitsebene', 'Global and selected local feature occlusion': 'Globale und ausgewählte lokale Feature Occlusion',
    'Engineering decision layer': 'Engineering-Entscheidungsebene', 'Condition · reliability · review · priority': 'Zustand · Zuverlässigkeit · Prüfung · Priorität',
    'Public dashboard': 'Öffentliches Dashboard', 'Fleet · engines · models · uncertainty · methodology': 'Flotte · Triebwerke · Modelle · Unsicherheit · Methodik',
    'PREDICTION CORE': 'PROGNOSEKERN', 'DATASET': 'DATENSATZ', 'RELEASE': 'RELEASE',
    'PREDICTED &': 'PROGNOSTIZIERTE &', 'CONSERVATIVE RUL': 'KONSERVATIVE RUL', 'UNCERTAINTY &': 'UNSICHERHEIT &', 'MODEL DISAGREEMENT': 'MODELLABWEICHUNG', 'TRAJECTORY': 'TRAJEKTORIEN-', 'DIAGNOSTICS': 'DIAGNOSTIK',
    'SEPARATES PHYSICAL URGENCY': 'TRENNT PHYSISCHE DRINGLICHKEIT', 'FROM PREDICTION RELIABILITY': 'VON PROGNOSEZUVERLÄSSIGKEIT',
    'Critical · Warning · Monitor · Healthy': 'Kritisch · Warnung · Beobachten · Gesund', 'High · Medium · Low': 'Hoch · Mittel · Niedrig', 'Required · Recommended · Not required': 'Erforderlich · Empfohlen · Nicht erforderlich', 'Immediate · High · Elevated · Watch · Routine': 'Sofort · Hoch · Erhöht · Beobachten · Routine',
    'The model does not make the maintenance decision.': 'Das Modell trifft keine Instandhaltungsentscheidung.', 'It organises evidence for human engineering review.': 'Es strukturiert Evidenz für die menschliche technische Prüfung.',
  },
  finance: {
    'Skip to project content': 'Zum Projektinhalt springen', '← Portfolio': '← Portfolio',
    'Public-release roadmap ↓': 'Roadmap zur öffentlichen Version ↓', 'View architecture ↓': 'Architektur ansehen ↓',
    'PROJECT // FT-01': 'PROJEKT // FT-01', 'PRIVATE SYSTEM · OPERATIONAL': 'PRIVATES SYSTEM · BETRIEBSBEREIT',
    'Local-first financial data engineering designed around automation without surrendering control.': 'Lokales Finanz-Data-Engineering, das Automatisierung mit menschlicher Kontrolle verbindet.',
    'A private monthly workflow that converts statements from three financial providers into canonical transaction data, preserves manual context, uses machine learning only for genuinely blank rows and publishes validated outputs without sending personal data to a cloud service.': 'Ein privater monatlicher Workflow, der Abrechnungen von drei Finanzanbietern in kanonische Transaktionsdaten überführt, manuelle Kontexte unverändert bewahrt, Machine Learning ausschließlich für tatsächlich leere Zeilen nutzt und validierte Ergebnisse veröffentlicht, ohne persönliche Daten an einen Cloud-Dienst zu senden.',
    'Explore the workflow': 'Workflow erkunden', 'See the human-control layer': 'Menschliche Kontrollschicht ansehen', 'Why the repository is private': 'Warum das Repository privat ist',
    'INPUT SOURCES': 'EINGABEQUELLEN', 'PROCESSING PHASES': 'VERARBEITUNGSPHASEN', 'EXECUTION MODEL': 'AUSFÜHRUNGSMODELL', 'AUTHORITATIVE LABELS': 'VERBINDLICHE LABELS',
    'Problem': 'Problem', 'Human control': 'Menschliche Kontrolle', 'Safeguards': 'Schutzmechanismen', 'System state': 'Systemstand', 'Roadmap': 'Roadmap',
    'THE ENGINEERING PROBLEM': 'DIE TECHNISCHE AUFGABE', 'The difficult part was not drawing a spending chart. It was making the monthly data trustworthy.': 'Die Herausforderung war nicht das Zeichnen eines Ausgabendiagramms, sondern die monatlichen Daten verlässlich zu machen.',
    'Financial statements arrive in different structures, descriptions are inconsistent and manual context can easily disappear during automation. The project was built to make monthly preparation repeatable without allowing automation to overwrite human judgement.': 'Finanzabrechnungen liegen in unterschiedlichen Strukturen vor, Beschreibungen sind uneinheitlich und manueller Kontext kann bei der Automatisierung leicht verloren gehen. Das Projekt macht die monatliche Aufbereitung wiederholbar, ohne dass Automatisierung menschliche Entscheidungen überschreibt.',
    'PROJECT POSITIONING': 'PROJEKTPOSITIONIERUNG', 'A personal operations system, not a generic budgeting application.': 'Ein persönliches Betriebssystem – keine generische Budget-App.',
    'The core value is the data pipeline: extraction, canonicalisation, human-annotation preservation, controlled machine-learning fallback and safe monthly publishing.': 'Der Kernwert liegt in der Datenpipeline: Extraktion, Kanonisierung, unveränderte Übernahme menschlicher Annotationen, kontrollierter Machine-Learning-Fallback und sichere monatliche Veröffentlichung.',
    'FRAGMENTED INPUTS': 'FRAGMENTIERTE EINGABEN', 'REPETITIVE WORK': 'WIEDERKEHRENDE ARBEIT', 'CONTEXT RISK': 'KONTEXTVERLUST-RISIKO',
    'Each provider exports transactions with its own structure, naming conventions and statement behaviour.': 'Jeder Anbieter exportiert Transaktionen mit eigener Struktur, Benennung und Abrechnungslogik.',
    'Manual conversion, cleanup and reconciliation consume time and invite inconsistent handling.': 'Manuelle Konvertierung, Bereinigung und Abstimmung kosten Zeit und begünstigen inkonsistente Bearbeitung.',
    'Personal comments contain the meaning behind a transaction and must survive every automated phase.': 'Persönliche Kommentare enthalten den tatsächlichen Kontext einer Transaktion und müssen jede automatisierte Phase unverändert überstehen.',
    'END-TO-END WORKFLOW': 'DURCHGÄNGIGER WORKFLOW', 'Three phases turn statements into a controlled monthly data product.': 'Drei Phasen überführen Abrechnungen in ein kontrolliertes monatliches Datenprodukt.',
    'The architecture separates raw extraction, model training and safe publication. Each phase has a distinct responsibility so parsing errors, model behaviour and final output rules can be tested independently.': 'Die Architektur trennt Rohdatenextraktion, Modelltraining und sichere Veröffentlichung. Jede Phase hat eine klar abgegrenzte Verantwortung, sodass Parserfehler, Modellverhalten und Ausgaberegeln unabhängig geprüft werden können.',
    'Extract & canonicalise': 'Extrahieren & kanonisieren', 'Train & validate the fallback': 'Fallback trainieren & validieren', 'Publish safely': 'Sicher veröffentlichen',
    'HUMAN-IN-THE-LOOP CONTROL': 'HUMAN-IN-THE-LOOP-KONTROLLE', 'Automation fills gaps. It does not rewrite intent.': 'Automatisierung füllt Lücken. Sie überschreibt keine menschliche Absicht.',
    'The comment column is treated as a protected human decision layer. Any nonblank comment remains untouched; only a genuinely unlabelled transaction is eligible for machine-learning fallback.': 'Die Kommentarspalte wird als geschützte menschliche Entscheidungsebene behandelt. Jeder nichtleere Kommentar bleibt unverändert; nur tatsächlich unbeschriftete Transaktionen sind für den Machine-Learning-Fallback zugelassen.',
    'Human comments are authoritative': 'Menschliche Kommentare sind verbindlich', 'Machine learning is a fallback': 'Machine Learning ist ein Fallback', 'Publishing is a separate gate': 'Die Veröffentlichung ist ein separates Gate',
    'WORKFLOW SAFEGUARDS': 'WORKFLOW-SCHUTZMECHANISMEN', 'A useful automation must fail predictably.': 'Eine belastbare Automatisierung muss vorhersehbar fehlschlagen.',
    'The project focuses as much on preventing silent damage as it does on saving time. Guards and validation rules protect the monthly workflow from missing inputs, duplicated execution, schema drift and lost annotations.': 'Das Projekt konzentriert sich ebenso auf die Vermeidung stiller Fehler wie auf Zeitersparnis. Schutz- und Validierungsregeln sichern den monatlichen Workflow gegen fehlende Eingaben, doppelte Ausführung, Schemaabweichungen und verlorene Annotationen ab.',
    'MISSING-FILE GUARD': 'FEHLENDE-DATEI-SCHUTZ', 'IDEMPOTENT EXECUTION': 'IDEMPOTENTE AUSFÜHRUNG', 'SCHEMA CONTROL': 'SCHEMAKONTROLLE', 'COMMENT PRESERVATION': 'KOMMENTARERHALT', 'LOCAL PROCESSING': 'LOKALE VERARBEITUNG', 'CONTROLLED PUBLISHING': 'KONTROLLIERTE VERÖFFENTLICHUNG',
    'STOP ON MISSING INPUT': 'STOPP BEI FEHLENDER EINGABE', 'PRESERVE NONBLANK COMMENTS': 'NICHTLEERE KOMMENTARE UNVERÄNDERT BEWAHREN', 'VALIDATE BEFORE PUBLISH': 'VOR VERÖFFENTLICHUNG VALIDIEREN',
    'CURRENT SYSTEM STATE': 'AKTUELLER SYSTEMSTAND', 'Operational for the monthly workflow it was designed to solve.': 'Betriebsbereit für den monatlichen Workflow, für den das System entwickelt wurde.',
    'The complete local pipeline has been reproduced across months: canonical data generation, model-bundle creation and comment-safe publication. The strongest result is not a flashy model score—it is a repeatable process that preserves the reviewed data already present.': 'Die vollständige lokale Pipeline wurde über mehrere Monate reproduziert: kanonische Datenerzeugung, Erstellung des Modell-Bundles und kommentarsichere Veröffentlichung. Das stärkste Ergebnis ist kein auffälliger Modellscore, sondern ein wiederholbarer Prozess, der bereits geprüfte Daten unverändert erhält.',
    'PRIVATE BOUNDARY & PUBLIC ROADMAP': 'PRIVATE GRENZE & ÖFFENTLICHE ROADMAP', 'The case study is public. The personal financial system is not.': 'Die Fallstudie ist öffentlich. Das persönliche Finanzsystem ist es nicht.',
    'The current codebase contains provider assumptions, personal categories, local paths and workflow choices tailored to one household. Publishing it responsibly requires a clean, de-personalised release rather than exposing the working private repository.': 'Die aktuelle Codebasis enthält anbieterspezifische Annahmen, persönliche Kategorien, lokale Pfade und auf einen Haushalt zugeschnittene Workflow-Entscheidungen. Eine verantwortungsvolle Veröffentlichung erfordert deshalb eine bereinigte und entpersonalisierte Version statt der Freigabe des produktiven privaten Repositorys.',
    'CURRENT RELEASE': 'AKTUELLER RELEASE', 'PRIVATE SOURCE · PRIVATE DATA · PUBLIC ARCHITECTURE': 'PRIVATER QUELLCODE · PRIVATE DATEN · ÖFFENTLICHE ARCHITEKTUR',
    'This page explains the engineering design without exposing statements, account details, transaction records, personal categories or machine-specific configuration.': 'Diese Seite erklärt die technische Architektur, ohne Abrechnungen, Kontodetails, Transaktionsdaten, persönliche Kategorien oder systemspezifische Konfiguration offenzulegen.',
    'PROJECT STATUS': 'PROJEKTSTATUS', 'OPERATIONAL · PRIVATE · CASE STUDY PUBLISHED': 'BETRIEBSBEREIT · PRIVAT · FALLSTUDIE VERÖFFENTLICHT', '← Return to project lab': '← Zurück zum Projektlabor', 'Review architecture ↑': 'Architektur erneut ansehen ↑',
    'The run stops before publishing when a required monthly input is absent.': 'Der Lauf stoppt vor der Veröffentlichung, wenn eine erforderliche monatliche Eingabedatei fehlt.',
    'Rerunning the same month does not create uncontrolled duplicate outputs.': 'Das erneute Ausführen desselben Monats erzeugt keine unkontrollierten doppelten Ausgaben.',
    'Transactions are normalised into one consistent canonical structure.': 'Transaktionen werden in eine einheitliche kanonische Struktur normalisiert.',
    'Existing human annotations pass through every phase unchanged.': 'Vorhandene menschliche Annotationen durchlaufen jede Phase unverändert.',
    'Personal financial statements and trained artifacts remain on the local machine.': 'Persönliche Finanzabrechnungen und trainierte Artefakte verbleiben auf dem lokalen Rechner.',
    'Outputs are written only after the expected validation checks pass.': 'Ausgaben werden erst geschrieben, nachdem die vorgesehenen Validierungsprüfungen bestanden wurden.',
    'CONFIGURATION LAYER': 'KONFIGURATIONSEBENE', 'Replace personal paths, account names and fixed rules with documented configuration.': 'Persönliche Pfade, Kontonamen und feste Regeln durch dokumentierte Konfiguration ersetzen.',
    'PARSER ABSTRACTION': 'PARSER-ABSTRAKTION', 'Create provider templates so new statement formats can be added without editing core logic.': 'Anbietervorlagen erstellen, damit neue Abrechnungsformate ohne Änderung der Kernlogik ergänzt werden können.',
    'SYNTHETIC SAMPLE DATA': 'SYNTHETISCHE BEISPIELDATEN', 'Publish realistic examples without exposing any personal financial information.': 'Realistische Beispiele veröffentlichen, ohne persönliche Finanzinformationen offenzulegen.',
    'AUTOMATED TEST SUITE': 'AUTOMATISIERTE TESTSUITE', 'Add parser, schema, preservation and end-to-end regression tests.': 'Parser-, Schema-, Erhaltungs- und End-to-End-Regressionstests ergänzen.',
    'CLEAN CLI & INSTALLATION': 'SAUBERE CLI & INSTALLATION', 'Package the monthly runner with simple commands and environment checks.': 'Den monatlichen Runner mit einfachen Befehlen und Umgebungsprüfungen paketieren.',
    'PUBLIC DOCUMENTATION': 'ÖFFENTLICHE DOKUMENTATION', 'Add architecture, privacy boundaries, examples and a reproducible walkthrough.': 'Architektur, Datenschutzgrenzen, Beispiele und einen reproduzierbaren Ablauf dokumentieren.',
    'CANONICAL TRANSACTION': 'KANONISCHE TRANSAKTION', 'COMMENT FIELD': 'KOMMENTARFELD', 'NONBLANK?': 'NICHT LEER?', 'YES': 'JA', 'NO': 'NEIN',
    'Keep the human comment exactly as written.': 'Den menschlichen Kommentar exakt unverändert bewahren.', 'Allow the trained classifier to propose a fallback label.': 'Dem trainierten Klassifikator erlauben, ein Fallback-Label vorzuschlagen.',
    'AUTHORITATIVE PATH': 'VERBINDLICHER PFAD', 'FALLBACK PATH': 'FALLBACK-PFAD', 'PUBLISHING RULE': 'VERÖFFENTLICHUNGSREGEL', 'HUMAN INPUT ALWAYS WINS': 'MENSCHLICHE EINGABE HAT IMMER VORRANG',
    'BANK PDF': 'BANK-PDF', 'CANONICALISATION CORE': 'KANONISIERUNGSKERN', 'HUMAN CONTEXT': 'MENSCHLICHER KONTEXT', 'COMMENTS PRESERVED': 'KOMMENTARE UNVERÄNDERT', 'CONTROLLED ML': 'KONTROLLIERTES ML', 'BLANK ROWS ONLY': 'NUR LEERE ZEILEN', 'VALIDATED MONTHLY DATASET': 'VALIDIERTER MONATSDATENSATZ', 'EXECUTION': 'AUSFÜHRUNG', 'LOCAL / PRIVATE': 'LOKAL / PRIVAT',
  },
}

function ProjectLanguageTranslator({ project }: { project: 'machineguard' | 'finance' }) {
  const language = resolveLanguage()
  useEffect(() => {
    if (language !== 'de') return
    const translations = projectTranslationsDe[project]
    const root = document.querySelector(project === 'machineguard' ? '.machineguard-page' : '.finance-case')
    if (!root) return
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    nodes.forEach(node => {
      const raw = node.nodeValue ?? ''
      const trimmed = raw.trim()
      const translated = translations[trimmed]
      if (!translated) return
      const leading = raw.match(/^\s*/)?.[0] ?? ''
      const trailing = raw.match(/\s*$/)?.[0] ?? ''
      node.nodeValue = `${leading}${translated}${trailing}`
    })
    root.querySelectorAll<HTMLElement>('[aria-label]').forEach(element => {
      const label = element.getAttribute('aria-label') ?? ''
      if (translations[label]) element.setAttribute('aria-label', translations[label])
    })
  }, [language, project])
  return null
}

function ProjectTopbar() {
  const language = resolveLanguage()
  return (
    <header className="case-topbar">
      <Logo href={localizedHome(language)} route />
      <div className="case-topbar-actions">
        <RouteLink to={`${localizedHome(language)}#projects`}>← Portfolio</RouteLink>
        <LanguageSwitch route="machineguard-ai" compact />
        <a href="https://github.com/Selvaprakash-Vj/MachineGuard-AI" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a className="button small primary" href="https://machineguard-ai.streamlit.app/" target="_blank" rel="noreferrer">{language === 'de' ? 'Dashboard öffnen ↗' : 'Launch dashboard ↗'}</a>
      </div>
    </header>
  )
}

function CaseSectionTitle({ index, label, title, text }: { index: string; label: string; title: string; text: string }) {
  return (
    <div className="case-section-title" data-reveal>
      <p><span>{index}</span>{label}</p>
      <h2>{title}</h2>
      <div>{text}</div>
    </div>
  )
}

function MachineGuardHeroVisual() {
  return (
    <div className="mg-hero-visual" aria-hidden="true">
      <div className="mg-orbit orbit-a" /><div className="mg-orbit orbit-b" /><div className="mg-orbit orbit-c" />
      <div className="mg-engine-core">
        <div className="mg-fan">{Array.from({ length: 12 }).map((_, index) => <i key={index} style={{ transform: `rotate(${index * 30}deg)` }} />)}</div>
        <strong>RUL</strong><span>PREDICTION CORE</span>
      </div>
      <svg viewBox="0 0 620 320" preserveAspectRatio="none">
        <defs><linearGradient id="mgLine" x1="0" x2="1"><stop offset="0" stopColor="#4cc9f0"/><stop offset="1" stopColor="#ff6b35"/></linearGradient></defs>
        <polyline points="0,245 48,236 88,244 128,205 168,214 208,168 248,178 288,132 330,146 370,102 410,115 454,78 500,93 548,52 620,64" />
        <line x1="0" y1="270" x2="620" y2="270" />
      </svg>
      <div className="mg-readout readout-a"><span>DATASET</span><strong>NASA FD001</strong></div>
      <div className="mg-readout readout-b"><span>PRIMARY MODEL</span><strong>GRU</strong></div>
      <div className="mg-readout readout-c"><span>RELEASE</span><strong>v1.0.0</strong></div>
    </div>
  )
}

function ArchitectureStack() {
  const stages = [
    ['01', 'NASA C-MAPSS FD001', '100 training + 100 test engines'],
    ['02', 'Leakage-safe preprocessing', 'Engine split · train-only scaling · 30-cycle windows'],
    ['03', 'Model benchmark', 'Mean · Ridge · LSTM · GRU · Transformer'],
    ['04', 'Validation-only selection', 'Primary GRU · 60/40 GRU–LSTM ensemble'],
    ['05', 'Reliability layer', 'MC dropout · calibration · disagreement · trajectories'],
    ['06', 'Explainability layer', 'Global and selected local feature occlusion'],
    ['07', 'Engineering decision layer', 'Condition · reliability · review · priority'],
    ['08', 'Public dashboard', 'Fleet · engines · models · uncertainty · methodology'],
  ]
  return <div className="mg-architecture" data-reveal>{stages.map(([n,t,d]) => <div key={n}><span>{n}</span><p><strong>{t}</strong><small>{d}</small></p><i /></div>)}</div>
}

function BenchmarkPanel() {
  const models = [
    ['ENSEMBLE', 13.21, 10.09, 'BEST AGGREGATE'],
    ['GRU', 13.58, 9.88, 'PRIMARY MODEL'],
    ['LSTM', 14.29, 10.96, 'SECONDARY'],
    ['RIDGE', 14.99, 12.23, 'BASELINE'],
    ['TRANSFORMER', 21.70, 15.43, 'REJECTED'],
  ] as const
  return (
    <div className="mg-benchmark" data-reveal tabIndex={0} aria-label="FD001 model benchmark. Scroll horizontally on smaller screens.">
      <div className="mg-benchmark-head"><span>FD001 // DEPLOYMENT-ALIGNED TEST</span><strong>LOWER IS BETTER</strong></div>
      {models.map(([model, rmse, mae, role]) => (
        <div className={`mg-model-row ${model === 'GRU' ? 'selected' : ''}`} key={model}>
          <span>{model}</span>
          <div className="mg-bars"><i style={{ width: `${(rmse / 23) * 100}%` }} /><i style={{ width: `${(mae / 23) * 100}%` }} /></div>
          <p><strong>{rmse.toFixed(2)}</strong><small>RMSE</small></p>
          <p><strong>{mae.toFixed(2)}</strong><small>MAE</small></p>
          <em>{role}</em>
        </div>
      ))}
      <div className="mg-benchmark-legend"><span><i />RMSE</span><span><i />MAE</span></div>
    </div>
  )
}

function Engine67Graphic() {
  return (
    <div className="engine67-chart" data-reveal tabIndex={0} role="img" aria-label="Engine 67 predicted and retrospective remaining-useful-life trajectory. Scroll horizontally on smaller screens.">
      <div className="chart-head"><span>FD001 // ENGINE 67</span><strong>SHARED-MODEL BLIND SPOT</strong></div>
      <svg viewBox="0 0 720 330" preserveAspectRatio="none" aria-label="Illustrative RUL trajectory for Engine 67">
        <g className="chart-grid">{[60,110,160,210,260].map(y => <line key={y} x1="55" y1={y} x2="690" y2={y}/>)}</g>
        <polyline className="predicted-line" points="55,55 85,90 115,116 145,84 175,155 205,102 235,180 265,91 295,118 325,82 355,132 385,94 415,77 445,102 475,72 505,82 535,62 565,88 595,70 625,58 655,75 690,68" />
        <polyline className="actual-line" points="55,55 110,55 165,55 220,55 275,82 330,112 385,143 440,174 495,205 550,236 605,267 660,298 690,312" />
        <rect x="525" y="40" width="165" height="275" />
        <text x="68" y="32">PREDICTED RUL</text><text x="538" y="58">REVIEW WINDOW</text>
      </svg>
      <div className="engine67-legend"><span><i />GRU trajectory</span><span><i />Retrospective actual RUL</span></div>
    </div>
  )
}

function DecisionLayerGraphic() {
  return (
    <div className="decision-diagram" data-reveal tabIndex={0} aria-label="Engineering decision layer diagram. Scroll horizontally on smaller screens.">
      <svg viewBox="0 0 1240 520" role="img" aria-labelledby="decisionTitle decisionDesc">
        <title id="decisionTitle">MachineGuard AI engineering decision layer</title>
        <desc id="decisionDesc">Predicted remaining life, uncertainty, model disagreement and trajectory diagnostics are organised into engine condition, reliability risk, engineering review and operational priority.</desc>
        <defs>
          <marker id="decisionArrow" viewBox="0 0 10 10" refX="8.8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#718297" />
          </marker>
          <linearGradient id="decisionCoreFill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#172331" stopOpacity=".94" />
            <stop offset="1" stopColor="#08101a" stopOpacity=".98" />
          </linearGradient>
        </defs>

        <g className="decision-arrows" fill="none" stroke="#718297" strokeWidth="3" markerEnd="url(#decisionArrow)">
          <path d="M 335 105 C 390 105, 420 170, 475 215" />
          <path d="M 335 235 C 395 235, 425 235, 475 250" />
          <path d="M 335 365 C 395 365, 425 320, 475 285" />
          <path d="M 765 230 C 820 190, 850 105, 905 105" />
          <path d="M 765 245 C 830 230, 850 215, 905 215" />
          <path d="M 765 260 C 830 280, 850 325, 905 325" />
          <path d="M 765 275 C 825 330, 850 435, 905 435" />
        </g>

        <g className="decision-box decision-box-input">
          <rect x="35" y="52" width="300" height="106" rx="22" />
          <text x="185" y="94"><tspan x="185">PREDICTED &amp;</tspan><tspan x="185" dy="28">CONSERVATIVE RUL</tspan></text>
        </g>
        <g className="decision-box decision-box-input decision-box-violet">
          <rect x="35" y="182" width="300" height="106" rx="22" />
          <text x="185" y="224"><tspan x="185">UNCERTAINTY &amp;</tspan><tspan x="185" dy="28">MODEL DISAGREEMENT</tspan></text>
        </g>
        <g className="decision-box decision-box-input decision-box-orange">
          <rect x="35" y="312" width="300" height="106" rx="22" />
          <text x="185" y="354"><tspan x="185">TRAJECTORY</tspan><tspan x="185" dy="28">DIAGNOSTICS</tspan></text>
        </g>

        <g className="decision-core-svg">
          <rect x="475" y="145" width="290" height="230" rx="30" fill="url(#decisionCoreFill)" />
          <text x="620" y="215"><tspan x="620">ENGINEERING</tspan><tspan x="620" dy="36">DECISION LAYER</tspan></text>
          <line x1="530" y1="294" x2="710" y2="294" />
          <text className="decision-core-sub" x="620" y="325"><tspan x="620">SEPARATES PHYSICAL URGENCY</tspan><tspan x="620" dy="23">FROM PREDICTION RELIABILITY</tspan></text>
        </g>

        <g className="decision-box decision-box-output decision-box-orange">
          <rect x="905" y="52" width="300" height="106" rx="22" />
          <text x="1055" y="94"><tspan x="1055">ENGINE CONDITION</tspan><tspan className="decision-subline" x="1055" dy="27">Critical · Warning · Monitor · Healthy</tspan></text>
        </g>
        <g className="decision-box decision-box-output decision-box-violet">
          <rect x="905" y="162" width="300" height="106" rx="22" />
          <text x="1055" y="204"><tspan x="1055">RELIABILITY RISK</tspan><tspan className="decision-subline" x="1055" dy="27">High · Medium · Low</tspan></text>
        </g>
        <g className="decision-box decision-box-output decision-box-green">
          <rect x="905" y="272" width="300" height="106" rx="22" />
          <text x="1055" y="314"><tspan x="1055">ENGINEERING REVIEW</tspan><tspan className="decision-subline" x="1055" dy="27">Required · Recommended · Not required</tspan></text>
        </g>
        <g className="decision-box decision-box-output decision-box-lime">
          <rect x="905" y="382" width="300" height="106" rx="22" />
          <text x="1055" y="424"><tspan x="1055">OPERATIONAL PRIORITY</tspan><tspan className="decision-subline" x="1055" dy="27">Immediate · High · Elevated · Watch · Routine</tspan></text>
        </g>
      </svg>
      <p><strong>The model does not make the maintenance decision.</strong> It organises evidence for human engineering review.</p>
    </div>
  )
}

function MachineGuardPage() {
  const headlineResults = [
    ['13.58', 'GRU RMSE', 'cycles'],
    ['9.88', 'GRU MAE', 'cycles'],
    ['0.885', 'GRU R²', 'test fleet'],
    ['13.21', 'ENSEMBLE RMSE', 'cycles'],
    ['88%', 'INTERVAL COVERAGE', '90% target'],
  ]
  const reliability = [
    ['Uncertainty estimation', 'Repeated stochastic GRU predictions create a calibrated interval instead of presenting one precise-looking number without context.'],
    ['Trajectory diagnostics', 'The history of predicted RUL is checked for plateaus, instability and physically suspicious changes that a final point estimate can hide.'],
    ['Explainability', 'Feature occlusion reveals which sensor channels influence the model most, while keeping model reliance separate from physical causality.'],
  ]
  return (
    <div className="case-shell machineguard-page">
      <ProjectLanguageTranslator project="machineguard" />
      <a className="skip-link" href="#mg-hero">Skip to project content</a>
      <CursorGlow /><div className="noise" /><div className="grid" />
      <ProjectTopbar />
      <ProjectCinematicScrollSystem project="machineguard" />
      <main id="machineguard-main">
        <section id="mg-hero" tabIndex={-1} className="mg-case-hero">
          <div className="mg-case-copy">
            <p className="case-eyebrow"><span>PROJECT // MG-01</span><i />RELEASED · v1.0.0</p>
            <h1>MachineGuard <em>AI</em></h1>
            <h2>Reliability-aware Remaining Useful Life prediction for NASA C-MAPSS turbofan engines.</h2>
            <p className="mg-case-intro">Predict remaining life. Measure uncertainty. Flag predictions that deserve a second look.</p>
            <div className="mg-case-actions">
              <a className="button primary" href="https://machineguard-ai.streamlit.app/" target="_blank" rel="noreferrer">Open live dashboard <span>↗</span></a>
              <a className="button ghost" href="https://github.com/Selvaprakash-Vj/MachineGuard-AI" target="_blank" rel="noreferrer">View GitHub repository <span>↗</span></a>
              <a className="text-link" href={assetUrl('MachineGuard_AI_Project_Report.pdf')} target="_blank" rel="noreferrer">Read full project report <span>↗</span></a>
            </div>
          </div>
          <MachineGuardHeroVisual />
          <div className="mg-hero-stats">{headlineResults.slice(0,4).map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </section>

        <nav className="case-jumpbar" aria-label="Project page navigation">
          <a href="#mg-overview">Overview</a><a href="#mg-workflow">Workflow</a><a href="#mg-results">Results</a><a href="#mg-reliability">Reliability</a><a href="#mg-failure">Engine 67</a><a href="#mg-decision">Decision layer</a><a href="#mg-explore">Explore</a>
        </nav>

        <section id="mg-overview" className="case-section">
          <CaseSectionTitle index="01" label="ENGINEERING PROBLEM" title="How many operating cycles remain—and how much should we trust the answer?" text="MachineGuard AI uses the latest sensor history of a simulated turbofan engine to estimate Remaining Useful Life. The prediction is not treated as an automatic maintenance command; it is one piece of evidence within an engineering review workflow." />
          <div className="mg-positioning" data-reveal>
            <span>WHAT THIS PROJECT IS</span>
            <p><strong>An end-to-end predictive-maintenance system, not only a trained neural network.</strong> It converts engine histories into RUL estimates, checks uncertainty and temporal behaviour, and presents the evidence in a form an engineer can review.</p>
          </div>
          <div className="mg-problem-grid">
            <article data-reveal><span>MODEL INPUT</span><strong>30 × 24</strong><p>The latest 30 operating cycles, with three operating settings and 21 simulated sensor measurements per cycle.</p></article>
            <article data-reveal><span>MODEL OUTPUT</span><strong>RUL</strong><p>Estimated cycles remaining before the simulated end-of-life threshold, using a capped 125-cycle target.</p></article>
            <article data-reveal><span>ENGINEERING GOAL</span><strong>TRUST</strong><p>Estimate remaining life while making uncertainty, suspicious behaviour and review needs visible.</p></article>
          </div>
        </section>

        <section id="mg-workflow" className="case-section panel-section">
          <CaseSectionTitle index="02" label="END-TO-END WORKFLOW" title="Methodology before architecture." text="The decisive improvement came from rebuilding the experiment around leakage-safe data handling and deployment-aligned evaluation—not from simply replacing one neural network with another." />
          <div className="mg-method-layout">
            <ArchitectureStack />
            <div className="mg-audit-card" data-reveal>
              <p>CORE DESIGN CHOICES</p>
              {[
                ['Split complete engines', 'No engine trajectory appears across training and validation.'],
                ['Fit scaling on training data only', 'Unseen-engine statistics never influence preprocessing.'],
                ['Use 30-cycle temporal windows', 'Each model receives the same recent operating history.'],
                ['Score one final window per test engine', 'Every unseen engine contributes one deployment-style prediction.'],
                ['Compare against simple baselines', 'Complexity must outperform transparent alternatives.'],
              ].map(([problem,fix],index) => <div key={problem}><span>0{index+1}</span><p><strong>{problem}</strong><small>{fix}</small></p></div>)}
              <footer><strong>63.79 → 13.58</strong><span>RMSE after the methodology rebuild</span></footer>
            </div>
          </div>
        </section>

        <section id="mg-results" className="case-section">
          <CaseSectionTitle index="03" label="KEY RESULTS" title="Strong performance—with the model roles kept honest." text="The GRU offered the strongest standalone operational balance. A GRU–LSTM ensemble achieved the best aggregate RMSE, while Ridge remained a valuable independent baseline and the Transformer result was retained as an honest negative experiment." />
          <div className="mg-results-grid">
            {headlineResults.map(([value,label,note]) => <article data-reveal key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}
          </div>
          <div className="mg-model-summary" data-reveal>
            <p><span>PRIMARY MODEL</span><strong>GRU</strong> Best standalone balance of error, efficiency and dangerous-overprediction behaviour.</p>
            <p><span>BEST AVERAGE RMSE</span><strong>60% GRU + 40% LSTM</strong> Validation-selected ensemble with RMSE 13.21.</p>
            <p><span>NEGATIVE RESULT RETAINED</span><strong>TRANSFORMER</strong> More complexity did not improve this FD001 experiment.</p>
          </div>
        </section>

        <section id="mg-reliability" className="case-section panel-section">
          <CaseSectionTitle index="04" label="RELIABILITY BEYOND ACCURACY" title="A point prediction is only the beginning." text="Three additional evidence layers help expose difficult cases and make the RUL estimate easier to question, explain and review." />
          <div className="mg-reliability-grid">{reliability.map(([title,text],index) => <article data-reveal key={title}><span>R{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="mg-reliability-strip" data-reveal>
            <span>100 MC PASSES / ENGINE</span><i />
            <span>90% TARGET COVERAGE</span><i />
            <span>88% OBSERVED COVERAGE</span>
          </div>
          <p className="mg-reliability-note" data-reveal><strong>Confidence is not correctness.</strong> Uncertainty helps identify difficult cases, but a model can still be confidently wrong.</p>
        </section>

        <section id="mg-failure" className="case-section engine67-section">
          <CaseSectionTitle index="05" label="FAILURE CASE" title="Engine 67: agreement without correctness." text="GRU and Ridge produced similar optimistic predictions. Their agreement looked reassuring, but the historical RUL trajectory showed an unrealistic high-RUL plateau and triggered engineering review." />
          <div className="engine67-layout">
            <Engine67Graphic />
            <div className="engine67-evidence" data-reveal>
              {[
                ['ACTUAL RUL', '77.0 cycles'], ['GRU MC MEAN', '114.56 cycles'], ['RIDGE PREDICTION', '111.56 cycles'], ['TRAJECTORY FLAG', 'HIGH-RUL PLATEAU'], ['ENGINEERING REVIEW', 'REQUIRED'],
              ].map(([label,value]) => <p key={label}><span>{label}</span><strong>{value}</strong></p>)}
            </div>
          </div>
          <blockquote data-reveal>Model agreement does not guarantee model correctness. Prediction history exposed a shared blind spot that the final estimates did not.</blockquote>
        </section>

        <section id="mg-decision" className="case-section panel-section">
          <CaseSectionTitle index="06" label="ENGINEERING DECISION LAYER" title="The model organises the evidence. The engineer retains the decision." text="Predicted RUL, uncertainty, model disagreement and trajectory behaviour are combined into four separate decision-support views. The system structures the evidence; it does not authorise maintenance actions." />
          <DecisionLayerGraphic />
          <div className="decision-support-copy" data-reveal>
            <article><h3>Engine condition</h3><p>How urgent does the estimated physical condition appear?</p></article>
            <article><h3>Reliability risk</h3><p>How trustworthy or suspicious is the available prediction evidence?</p></article>
            <article><h3>Engineering review</h3><p>Should a human inspect the result before it is used?</p></article>
            <article><h3>Operational priority</h3><p>How urgently should the engine enter the maintenance workflow?</p></article>
          </div>
        </section>

        <section id="mg-explore" className="case-section responsible-section">
          <CaseSectionTitle index="07" label="EXPLORE THE COMPLETE PROJECT" title="The portfolio page is the overview. The deeper evidence lives here." text="Use the live dashboard for interactive investigation, GitHub for the implementation and release history, and the full report for the complete engineering and machine-learning study." />
          <div className="mg-deployment-grid">
            <article data-reveal><span>LIVE STREAMLIT DASHBOARD</span><h3>Explore the system</h3><p>Inspect fleet results, individual engines, uncertainty, trajectories, explainability and decision-support outputs.</p><a href="https://machineguard-ai.streamlit.app/" target="_blank" rel="noreferrer">Open dashboard ↗</a></article>
            <article data-reveal><span>GITHUB REPOSITORY</span><h3>Review the implementation</h3><p>Browse the source code, versioned release, preserved artifacts, documentation and reproducible deployment setup.</p><a href="https://github.com/Selvaprakash-Vj/MachineGuard-AI" target="_blank" rel="noreferrer">View repository ↗</a></article>
            <article data-reveal><span>TECHNICAL REPORT</span><h3>Read the complete study</h3><p>Open the 55-page thesis-style report covering the dataset, models, methodology, results, limitations and lessons learned.</p><a href={assetUrl('MachineGuard_AI_Project_Report.pdf')} target="_blank" rel="noreferrer">Open report ↗</a></article>
          </div>
          <div className="responsible-boundary" data-reveal>
            <span>RESPONSIBLE-USE BOUNDARY</span>
            <p><strong>MachineGuard AI is an educational portfolio project built on simulated NASA data.</strong> It is not a certified aircraft-maintenance system and does not replace inspection, sensor validation, maintenance history or qualified engineering judgement.</p>
          </div>
          <div className="mg-case-footer" data-reveal>
            <div><span>PROJECT STATUS</span><strong>COMPLETE · RELEASED · PUBLIC</strong></div>
            <div className="mg-case-footer-actions"><RouteLink to={`${localizedHome(resolveLanguage())}#projects`}>← Return to project lab</RouteLink><a href={assetUrl('MachineGuard_AI_Project_Report.pdf')} target="_blank" rel="noreferrer">Download technical report ↗</a></div>
          </div>
        </section>
      </main>
    </div>
  )
}


const threadromContent = {
  en: {
    skip: 'Skip to ThreadROM project content',
    portfolio: '← Portfolio',
    scopeLink: 'Current status ↓',
    resultsLink: 'Review certification ↓',
    overline: 'PROJECT // TR-01',
    status: 'PHASES 1 + 2 COMPLETE · PHASE 3 UNDERWAY',
    title: 'ThreadROM',
    subtitle: 'From analytical fastener mechanics to a physically certified 20 kN nonlinear threaded-joint baseline.',
    intro: 'ThreadROM is a Python-driven framework for simulation and reduced-order modelling of threaded bolted joints. Phase 1 built the analytical and FEM foundation; Phase 2 stabilised the nonlinear preload architecture and certified the physical load path. Phase 3 is now underway.',
    heroButton: 'Review the engineering',
    boundaryButton: 'See current status',
    heroStats: [['CERTIFIED CLAMP', '20.0635 kN'], ['TARGET ERROR', '+0.3175%'], ['FORCE SPREAD', '0.02881%'], ['REGRESSION QA', '337 TESTS']],
    problem: {
      label: 'ENGINEERING OBJECTIVE',
      title: 'Solver convergence is not enough. The joint must carry the intended load through the intended physical path.',
      text: 'ThreadROM treats a threaded-joint simulation as an engineering experiment. The reference model must reproduce the target preload while showing bolt tension, member compression, load transfer through the engaged thread flanks and balanced forces across the principal interfaces.',
      cards: [
        ['BUILD THE FOUNDATION', 'Start with independent analytical mechanics, full-helical geometry, controlled meshing and a reproducible solver pipeline.'],
        ['VERIFY THE LOAD PATH', 'Measure physical clamp force at multiple interfaces instead of accepting a solver reference quantity at face value.'],
        ['CERTIFY THE EVIDENCE', 'Combine analytical checks, nonlinear solver behaviour, contact mechanics and deterministic provenance before calling a case valid.'],
      ],
    },
    geometry: {
      label: 'PHASE 1 · ENGINEERING FOUNDATION',
      title: 'Build the mechanics and simulation pipeline before trusting nonlinear results.',
      text: 'Phase 1 established the analytical joint model, parametric M10×1.5 thread geometry, mesh hierarchy, CalculiX transfer and verification framework. A 1 kN linear benchmark closed with only 0.56% stiffness difference between the coarse and medium meshes, providing a controlled reference before nonlinear preload work.',
      levels: [
        ['ANALYTICS', 'M10×1.5 joint mechanics', 'Stiffness · elongation · load share', 'Independent engineering references before FEM interpretation'],
        ['FEM PIPELINE', 'Python + Gmsh + CalculiX', 'Geometry · mesh · solver · evidence', 'Configuration-driven and reproducible from model definition to results'],
        ['BASELINE', '0.56% coarse ↔ medium', '351.97 → 350.01 kN/mm', 'Linear axial benchmark and equilibrium checks completed'],
      ],
    },
    solver: {
      label: 'PHASE 2 · PRELOAD STABILISATION',
      title: 'The preload method had to prove physical force transfer—not just report the requested number.',
      text: 'Phase 2 investigated several preload strategies against the complete nonlinear bolt–nut–member assembly. Native tetrahedral pretension could report 20 kN while transferring only about 83 N through the physical interfaces; an ideal nut-turn relation produced only about 3.2–3.4 kN. Both were rejected for the certified baseline. A governed bolt-only thermal eigenstrain was then calibrated from nonlinear solves and independently certified.',
      stages: [
        ['01', 'NATIVE PRETENSION', '20 kN solver reference; ≈83 N physical clamp force → rejected'],
        ['02', 'NUT-TURN CHECK', '12.57° ideal relation; ≈3.2–3.4 kN physical clamp force → rejected'],
        ['03', 'THERMAL EIGENSTRAIN', 'Governed bolt-only numerical actuator calibrated from solved nonlinear cases'],
        ['04', 'CERTIFICATION', 'Interface forces, thread loading, deformation and solver behaviour checked independently'],
      ],
      loadcase: [['TARGET PRELOAD', '20.000 kN'], ['CERTIFIED MODEL', '101,493 nodes · 509,115 C3D4'], ['CONTACT', '4 PRIMARY INTERFACES'], ['GEOMETRY', '20 mm grip · 8 mm engagement'], ['GOVERNED ACTUATOR', 'ΔT = −243.2745°C']],
    },
    convergence: {
      label: 'PHASE 2 · PHYSICAL CERTIFICATION',
      title: 'Three independent interface measurements close on the same 20 kN clamp load.',
      text: 'The final nonlinear certification case measures the physical load where it passes through the joint—not only at the actuator. Under-head bearing, nut bearing and member-interface forces agree to within a few newtons.',
      chartLabel: 'PHYSICAL CLAMP FORCE // kN',
      chartSignal: 'LOAD-PATH BALANCE',
      ariaLabel: 'ThreadROM certified physical clamp force across three joint interfaces',
      values: [['UNDER HEAD', 'bearing force', '20.06027 kN'], ['NUT BEARING', 'bearing force', '20.06605 kN'], ['MEMBER INTERFACE', 'contact force', '20.06418 kN']],
      highlight: '20.0635 kN mean physical clamp force',
      note: 'Target error: +0.3175%. Maximum spread across the three measurements: 5.78 N, or 0.02881%.',
    },
    quality: {
      label: 'VALIDATION & ENGINEERING QA',
      title: 'Certification combines physical observables, analytical checks and reproducible software evidence.',
      text: 'The final baseline also showed bolt tension, member compression, dominant loading on the expected thread flank and analytical-to-FEM deformation agreement. Solver and configuration artifacts are traceable through governed evidence and SHA-256 provenance.',
      items: [['8.25×', 'THREAD-FLANK DOMINANCE', 'The intended load-bearing flank carried the dominant compressive traction tendency.'], ['≈3.2%', 'DEFORMATION DIFFERENCE', 'FEM member-stack shortening remained close to the independent analytical prediction.'], ['20 / 20', 'ACCEPTED INCREMENTS', 'All nonlinear load increments were accepted with no cutbacks in the certification run.'], ['337', 'REGRESSION TESTS', 'Automated tests protect the engineering configuration, generation, parsing and verification workflow.']],
    },
    boundary: {
      label: 'CURRENT DEVELOPMENT STATUS',
      title: 'Phases 1 and 2 are closed. Phase 3 is underway.',
      text: 'The certified 20 kN nonlinear reference now acts as the high-fidelity anchor for the next stage. Phase 3 is extending the same governed workflow into a parametric FEM factory while preserving the validation and provenance rules established here.',
      establishedTitle: 'COMPLETED · PHASES 1 + 2',
      established: ['Analytical bolted-joint mechanics and verification references', 'Parametric full-helical M10×1.5 geometry and controlled FEM pipeline', 'Validated nonlinear preload architecture for the complete joint', 'Certified 20.0635 kN physical clamp-force baseline', 'Physics-based acceptance logic and reproducible evidence'],
      openTitle: 'PHASE 3 · UNDERWAY',
      open: ['Governed parameter-space and case generation', 'Automated simulation, post-processing and acceptance', 'Preservation and reuse of trustworthy FEM evidence', 'High-fidelity dataset generation for later reduced-order modelling'],
      statusLabel: 'PROJECT STATUS',
      footer: 'PHASES 1 + 2 COMPLETE · PHASE 3 UNDERWAY',
      return: '← Return to project lab',
      review: 'Review certification ↑',
    },
  },
  de: {
    skip: 'Zum ThreadROM-Projektinhalt springen',
    portfolio: '← Portfolio',
    scopeLink: 'Aktueller Stand ↓',
    resultsLink: 'Zertifizierung ansehen ↓',
    overline: 'PROJEKT // TR-01',
    status: 'PHASEN 1 + 2 ABGESCHLOSSEN · PHASE 3 LÄUFT',
    title: 'ThreadROM',
    subtitle: 'Von analytischer Schraubenmechanik zu einer physikalisch zertifizierten nichtlinearen 20-kN-Referenz für Gewindeverbindungen.',
    intro: 'ThreadROM ist ein Python-gesteuertes Framework für Simulation und Reduced-Order Modelling von Schraubenverbindungen. Phase 1 schuf die analytische und numerische Grundlage; Phase 2 stabilisierte die nichtlineare Vorspannarchitektur und zertifizierte den physikalischen Lastpfad. Phase 3 läuft derzeit.',
    heroButton: 'Engineering ansehen',
    boundaryButton: 'Aktuellen Stand ansehen',
    heroStats: [['ZERTIFIZIERTE KLEMMKRAFT', '20,0635 kN'], ['ZIELABWEICHUNG', '+0,3175 %'], ['KRAFTSTREUUNG', '0,02881 %'], ['REGRESSION-QA', '337 TESTS']],
    problem: {
      label: 'TECHNISCHES ZIEL',
      title: 'Solver-Konvergenz reicht nicht aus. Die Verbindung muss die vorgesehene Last über den vorgesehenen physikalischen Lastpfad tragen.',
      text: 'ThreadROM behandelt die Simulation einer Gewindeverbindung als technisches Experiment. Das Referenzmodell muss die Zielvorspannung reproduzieren und gleichzeitig Schraubenzug, Bauteilkompression, Lastübertragung über die tragenden Gewindeflanken sowie ausgeglichene Kräfte an den wesentlichen Schnittstellen nachweisen.',
      cards: [
        ['GRUNDLAGE AUFBAUEN', 'Unabhängige analytische Mechanik, vollhelikale Geometrie, kontrollierte Vernetzung und reproduzierbare Solver-Pipeline zuerst absichern.'],
        ['LASTPFAD VERIFIZIEREN', 'Physikalische Klemmkraft an mehreren Schnittstellen messen, statt nur einer Solver-Referenzgröße zu vertrauen.'],
        ['EVIDENZ ZERTIFIZIEREN', 'Analytische Prüfungen, nichtlineares Solver-Verhalten, Kontaktmechanik und deterministische Provenienz gemeinsam bewerten.'],
      ],
    },
    geometry: {
      label: 'PHASE 1 · ENGINEERING-GRUNDLAGE',
      title: 'Mechanik und Simulationspipeline aufbauen, bevor nichtlineare Ergebnisse bewertet werden.',
      text: 'Phase 1 etablierte das analytische Verbindungsmodell, die parametrische M10×1,5-Gewindegeometrie, die Vernetzungshierarchie, die CalculiX-Übertragung und den Verifikationsrahmen. Ein linearer 1-kN-Referenzfall wurde mit nur 0,56 % Steifigkeitsunterschied zwischen grobem und mittlerem Netz abgeschlossen und bildete damit die kontrollierte Basis für die nichtlineare Vorspannung.',
      levels: [
        ['ANALYTIK', 'M10×1,5-Verbindungsmechanik', 'Steifigkeit · Dehnung · Lastanteile', 'Unabhängige technische Referenzen vor der FEM-Interpretation'],
        ['FEM-PIPELINE', 'Python + Gmsh + CalculiX', 'Geometrie · Netz · Solver · Evidenz', 'Konfigurationsgesteuert und reproduzierbar von der Modelldefinition bis zum Ergebnis'],
        ['REFERENZ', '0,56 % grob ↔ mittel', '351,97 → 350,01 kN/mm', 'Linearer Axialfall und Gleichgewichtsprüfungen abgeschlossen'],
      ],
    },
    solver: {
      label: 'PHASE 2 · STABILISIERUNG DER VORSPANNUNG',
      title: 'Die Vorspannmethode musste physikalische Kraftübertragung nachweisen – nicht nur den gewünschten Zahlenwert ausgeben.',
      text: 'Phase 2 untersuchte mehrere Vorspannstrategien am vollständigen nichtlinearen Schraube–Mutter–Bauteil-Modell. Die native Vorspannung konnte 20 kN als Solver-Referenz melden, übertrug an den physikalischen Schnittstellen jedoch nur rund 83 N; eine ideale Mutterdrehung erzeugte nur etwa 3,2–3,4 kN. Beide Ansätze wurden für die zertifizierte Referenz verworfen. Anschließend wurde eine kontrollierte thermische Eigenverzerrung ausschließlich im Schraubenkörper anhand nichtlinearer Lösungen kalibriert und unabhängig zertifiziert.',
      stages: [
        ['01', 'NATIVE VORSPANNUNG', '20 kN Solver-Referenz; ≈83 N physikalische Klemmkraft → verworfen'],
        ['02', 'MUTTERDREHUNG', '12,57° ideale Relation; ≈3,2–3,4 kN physikalische Klemmkraft → verworfen'],
        ['03', 'THERMISCHE EIGENVERZERRUNG', 'Kontrollierter numerischer Aktuator nur im Schraubenkörper, aus nichtlinearen Fällen kalibriert'],
        ['04', 'ZERTIFIZIERUNG', 'Schnittstellenkräfte, Gewindelast, Verformung und Solver-Verhalten unabhängig geprüft'],
      ],
      loadcase: [['ZIELVORSPANNUNG', '20,000 kN'], ['ZERTIFIZIERTES MODELL', '101.493 Knoten · 509.115 C3D4'], ['KONTAKT', '4 PRIMÄRE SCHNITTSTELLEN'], ['GEOMETRIE', '20 mm Klemmlänge · 8 mm Eingriff'], ['KONTROLLIERTER AKTUATOR', 'ΔT = −243,2745 °C']],
    },
    convergence: {
      label: 'PHASE 2 · PHYSIKALISCHE ZERTIFIZIERUNG',
      title: 'Drei unabhängige Schnittstellenmessungen schließen auf dieselbe Klemmkraft von rund 20 kN.',
      text: 'Der finale nichtlineare Zertifizierungsfall misst die physikalische Last dort, wo sie durch die Verbindung übertragen wird – nicht nur am Aktuator. Kopfauflage, Mutterauflage und Bauteilschnittstelle stimmen bis auf wenige Newton überein.',
      chartLabel: 'PHYSIKALISCHE KLEMMKRAFT // kN',
      chartSignal: 'LASTPFAD-BILANZ',
      ariaLabel: 'ThreadROM zertifizierte physikalische Klemmkraft an drei Schnittstellen der Verbindung',
      values: [['KOPFAUFLAGE', 'Auflagerkraft', '20,06027 kN'], ['MUTTERAUFLAGE', 'Auflagerkraft', '20,06605 kN'], ['BAUTEILSCHNITTSTELLE', 'Kontaktkraft', '20,06418 kN']],
      highlight: '20,0635 kN mittlere physikalische Klemmkraft',
      note: 'Abweichung vom Zielwert: +0,3175 %. Maximale Streuung zwischen den drei Messungen: 5,78 N bzw. 0,02881 %.',
    },
    quality: {
      label: 'VALIDIERUNG & ENGINEERING-QA',
      title: 'Die Zertifizierung verbindet physikalische Messgrößen, analytische Prüfungen und reproduzierbare Software-Evidenz.',
      text: 'Die finale Referenz zeigte zusätzlich Schraubenzug, Bauteilkompression, dominante Belastung der erwarteten Gewindeflanke und eine gute analytisch-numerische Übereinstimmung der Verformung. Solver- und Konfigurationsartefakte sind über kontrollierte Evidenz und SHA-256-Provenienz rückverfolgbar.',
      items: [['8,25×', 'DOMINANZ DER TRAGENDEN FLANKE', 'Die erwartete tragende Gewindeflanke zeigte die deutlich dominierende Druckbeanspruchung.'], ['≈3,2 %', 'VERFORMUNGSABWEICHUNG', 'Die FEM-Verkürzung des Klemmstapels lag nahe an der unabhängigen analytischen Vorhersage.'], ['20 / 20', 'AKZEPTIERTE INKREMENTE', 'Alle nichtlinearen Lastinkremente wurden im Zertifizierungslauf ohne Cutbacks akzeptiert.'], ['337', 'REGRESSIONSTESTS', 'Automatisierte Tests schützen Konfiguration, Generierung, Parsing und Verifikationsworkflow.']],
    },
    boundary: {
      label: 'AKTUELLER ENTWICKLUNGSSTAND',
      title: 'Phase 1 und 2 sind abgeschlossen. Phase 3 läuft.',
      text: 'Die zertifizierte nichtlineare 20-kN-Referenz dient nun als High-Fidelity-Anker für die nächste Stufe. Phase 3 erweitert denselben kontrollierten Workflow zu einer parametrischen FEM-Fabrik und übernimmt dabei die hier etablierten Regeln für Validierung und Provenienz.',
      establishedTitle: 'ABGESCHLOSSEN · PHASEN 1 + 2',
      established: ['Analytische Mechanik der Schraubenverbindung und Verifikationsreferenzen', 'Parametrische vollhelikale M10×1,5-Geometrie und kontrollierte FEM-Pipeline', 'Validierte nichtlineare Vorspannarchitektur für die vollständige Verbindung', 'Zertifizierte physikalische Klemmkraft von 20,0635 kN', 'Physikbasierte Akzeptanzlogik und reproduzierbare Evidenz'],
      openTitle: 'PHASE 3 · LÄUFT',
      open: ['Kontrollierter Parameterraum und automatische Fallgenerierung', 'Automatisierte Simulation, Nachverarbeitung und Akzeptanz', 'Erhalt und Wiederverwendung vertrauenswürdiger FEM-Evidenz', 'High-Fidelity-Datensatz als Grundlage für späteres Reduced-Order Modelling'],
      statusLabel: 'PROJEKTSTATUS',
      footer: 'PHASEN 1 + 2 ABGESCHLOSSEN · PHASE 3 LÄUFT',
      return: '← Zurück zum Projektlabor',
      review: 'Zertifizierung ansehen ↑',
    },
  },
} as const

function ThreadROMTopbar() {
  const language = resolveLanguage()
  const content = threadromContent[language]
  return (
    <header className="case-topbar threadrom-topbar">
      <Logo href={localizedHome(language)} route />
      <div className="case-topbar-actions">
        <RouteLink to={`${localizedHome(language)}#projects`}>{content.portfolio}</RouteLink>
        <LanguageSwitch route="threadrom" compact />
        <a href="#tr-boundary">{content.scopeLink}</a>
        <a className="button small primary" href="#tr-convergence">{content.resultsLink}</a>
      </div>
    </header>
  )
}

function ThreadROMHeroVisual() {
  return (
    <div className="tr-hero-visual" aria-hidden="true">
      <div className="tr-visual-grid" />
      <svg viewBox="0 0 760 390" role="presentation">
        <defs>
          <linearGradient id="trMetal" x1="0" x2="1"><stop offset="0" stopColor="#4cc9f0" stopOpacity=".28"/><stop offset="1" stopColor="#ff6b35" stopOpacity=".12"/></linearGradient>
          <marker id="trArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10Z" fill="#ff6b35"/></marker>
        </defs>
        <g className="tr-bolt-body">
          <path d="M85 125 H175 L210 160 V230 L175 265 H85 L50 230 V160Z" />
          <rect x="210" y="168" width="185" height="54" rx="8" />
          <path d="M395 158 H660 V232 H395Z" fill="url(#trMetal)" />
        </g>
        <g className="tr-thread-lines">
          {Array.from({ length: 15 }).map((_, index) => <path key={index} d={`M ${390 + index * 18} 158 l 34 74 M ${390 + index * 18} 232 l 34 -74`} />)}
        </g>
        <g className="tr-mesh-nodes">
          {Array.from({ length: 22 }).map((_, index) => <circle key={index} cx={110 + index * 24} cy={index % 2 ? 188 : 205} r="2.3" />)}
        </g>
        <path className="tr-load-arrow" d="M20 195 H72" markerEnd="url(#trArrow)" />
        <g className="tr-fixed"><rect x="672" y="120" width="36" height="150" />{Array.from({ length: 7 }).map((_,i)=><path key={i} d={`M708 ${125+i*22} l24 18`} />)}</g>
        <text x="18" y="174">20 kN</text><text x="455" y="285">M10 × 1.5 FULL HELIX</text><text x="640" y="104">LOAD PATH</text>
      </svg>
      <div className="tr-readout tr-readout-a"><span>BASELINE</span><strong>NONLINEAR CONTACT</strong></div>
      <div className="tr-readout tr-readout-b"><span>CERTIFIED</span><strong>20.0635 kN</strong></div>
      <div className="tr-readout tr-readout-c"><span>STATUS</span><strong>PHASE 3 UNDERWAY</strong></div>
    </div>
  )
}

function ThreadROMCertificationGraphic({
  values,
  chartLabel,
  chartSignal,
  ariaLabel,
}: {
  values: readonly (readonly [string, string, string])[]
  chartLabel: string
  chartSignal: string
  ariaLabel: string
}) {
  const xs = [130, 380, 630]
  const ys = [145, 118, 132]
  return (
    <div className="tr-convergence-chart" data-reveal role="img" aria-label={ariaLabel}>
      <div className="tr-chart-head"><span>{chartLabel}</span><strong>{chartSignal}</strong></div>
      <svg viewBox="0 0 760 330" preserveAspectRatio="none">
        {[65,120,175,230,285].map(y => <line className="tr-chart-grid" key={y} x1="70" y1={y} x2="710" y2={y} />)}
        <polyline className="tr-chart-line" points={xs.map((x,index)=>`${x},${ys[index]}`).join(' ')} />
        {values.map(([, , value],index)=><g className="tr-convergence-point" key={value}><circle cx={xs[index]} cy={ys[index]} r="9"/><text x={xs[index]} y={ys[index]-26} textAnchor="middle">{value.replace(' kN','')}</text></g>)}
      </svg>
      <div className="tr-convergence-values">{values.map(([level,kind,value])=><article key={level}><span>{level}</span><p>{kind}</p><strong>{value}</strong></article>)}</div>
    </div>
  )
}

function ThreadROMPage() {
  const language = resolveLanguage()
  const content = threadromContent[language]
  return (
    <div className="case-page threadrom-case case-shell">
      <a className="skip-link" href="#tr-main">{content.skip}</a>
      <CursorGlow /><div className="noise" /><div className="grid" />
      <ProjectCinematicScrollSystem project="threadrom" />
      <ThreadROMTopbar />
      <main id="tr-main" tabIndex={-1}>
        <section id="tr-hero" className="mg-case-hero tr-case-hero">
          <div className="mg-case-copy">
            <p className="case-eyebrow"><span>{content.overline}</span><i />{content.status}</p>
            <h1>{content.title}</h1>
            <h2>{content.subtitle}</h2>
            <p className="mg-case-intro">{content.intro}</p>
            <div className="mg-case-actions">
              <a className="button primary" href="#tr-problem">{content.heroButton} <span>↓</span></a>
              <a className="button ghost" href="#tr-boundary">{content.boundaryButton} <span>↓</span></a>
            </div>
          </div>
          <ThreadROMHeroVisual />
          <div className="mg-hero-stats tr-hero-stats">{content.heroStats.map(([label,value])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </section>

        <nav className="case-jumpbar" aria-label={language === 'de' ? 'ThreadROM-Projektnavigation' : 'ThreadROM project navigation'}>
          <a href="#tr-problem">{language === 'de' ? 'Ziel' : 'Objective'}</a><a href="#tr-geometry">Phase 1</a><a href="#tr-solver">Phase 2</a><a href="#tr-convergence">{language === 'de' ? 'Zertifizierung' : 'Certification'}</a><a href="#tr-quality">{language === 'de' ? 'Validierung' : 'Validation'}</a><a href="#tr-boundary">Status</a>
        </nav>

        <section id="tr-problem" className="case-section">
          <CaseSectionTitle index="01" label={content.problem.label} title={content.problem.title} text={content.problem.text} />
          <div className="tr-problem-grid">{content.problem.cards.map(([title,text],index)=><article data-reveal key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section id="tr-geometry" className="case-section panel-section">
          <CaseSectionTitle index="02" label={content.geometry.label} title={content.geometry.title} text={content.geometry.text} />
          <div className="tr-mesh-grid">{content.geometry.levels.map(([level,nodes,elements,note],index)=><article className="tr-mesh-level" data-reveal key={level}><div><span>M{index+1}</span><strong>{level}</strong></div><h3>{nodes}</h3><p>{elements}</p><small>{note}</small><i style={{'--mesh-density': `${42 + index*28}%`} as CSSProperties}/></article>)}</div>
        </section>

        <section id="tr-solver" className="case-section">
          <CaseSectionTitle index="03" label={content.solver.label} title={content.solver.title} text={content.solver.text} />
          <div className="tr-solver-layout">
            <div className="tr-pipeline" data-reveal>{content.solver.stages.map(([n,title,text],index)=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div>{index<content.solver.stages.length-1&&<i>→</i>}</article>)}</div>
            <div className="tr-loadcase" data-reveal>{content.solver.loadcase.map(([label,value])=><p key={label}><span>{label}</span><strong>{value}</strong></p>)}</div>
          </div>
        </section>

        <section id="tr-convergence" className="case-section panel-section">
          <CaseSectionTitle index="04" label={content.convergence.label} title={content.convergence.title} text={content.convergence.text} />
          <ThreadROMCertificationGraphic values={content.convergence.values} chartLabel={content.convergence.chartLabel} chartSignal={content.convergence.chartSignal} ariaLabel={content.convergence.ariaLabel} />
          <div className="tr-convergence-summary" data-reveal><strong>{content.convergence.highlight}</strong><p>{content.convergence.note}</p></div>
        </section>

        <section id="tr-quality" className="case-section">
          <CaseSectionTitle index="05" label={content.quality.label} title={content.quality.title} text={content.quality.text} />
          <div className="tr-quality-grid">{content.quality.items.map(([metric,label,text])=><article data-reveal key={label}><strong>{metric}</strong><span>{label}</span><p>{text}</p></article>)}</div>
        </section>

        <section id="tr-boundary" className="case-section panel-section tr-boundary-section">
          <CaseSectionTitle index="06" label={content.boundary.label} title={content.boundary.title} text={content.boundary.text} />
          <div className="tr-boundary-grid">
            <article data-reveal><span>{content.boundary.establishedTitle}</span><ul>{content.boundary.established.map(item=><li key={item}>{item}</li>)}</ul></article>
            <article data-reveal><span>{content.boundary.openTitle}</span><ul>{content.boundary.open.map(item=><li key={item}>{item}</li>)}</ul></article>
          </div>
          <div className="mg-case-footer" data-reveal>
            <div><span>{content.boundary.statusLabel}</span><strong>{content.boundary.footer}</strong></div>
            <div className="mg-case-footer-actions"><RouteLink to={`${localizedHome(language)}#projects`}>{content.boundary.return}</RouteLink><a href="#tr-convergence">{content.boundary.review}</a></div>
          </div>
        </section>
      </main>
    </div>
  )
}


function FinanceTopbar() {
  const language = resolveLanguage()
  return (
    <header className="case-topbar">
      <Logo href={localizedHome(language)} route />
      <div className="case-topbar-actions">
        <RouteLink to={`${localizedHome(language)}#projects`}>← Portfolio</RouteLink>
        <LanguageSwitch route="finance-tracker" compact />
        <a href="#ft-roadmap">{language === 'de' ? 'Roadmap zur öffentlichen Version ↓' : 'Public-release roadmap ↓'}</a>
        <a className="button small orange" href="#ft-workflow">{language === 'de' ? 'Architektur ansehen ↓' : 'View architecture ↓'}</a>
      </div>
    </header>
  )
}

function FinanceHeroVisual() {
  return (
    <div className="ft-hero-visual" aria-hidden="true">
      <div className="ft-grid-overlay" />
      <div className="ft-source-cluster">
        <span>BANK PDF</span><span>AMEX PDF</span><span>ADVANZIA PDF</span>
      </div>
      <div className="ft-flow-line flow-one" /><div className="ft-flow-line flow-two" /><div className="ft-flow-line flow-three" />
      <div className="ft-parser-core"><strong>ETL</strong><span>CANONICALISATION CORE</span></div>
      <div className="ft-layer human"><span>HUMAN CONTEXT</span><strong>COMMENTS PRESERVED</strong></div>
      <div className="ft-layer model"><span>CONTROLLED ML</span><strong>BLANK ROWS ONLY</strong></div>
      <div className="ft-layer publish"><span>OUTPUT</span><strong>VALIDATED MONTHLY DATASET</strong></div>
      <div className="ft-terminal-readout"><span>EXECUTION</span><strong>LOCAL / PRIVATE</strong></div>
    </div>
  )
}

function FinancePipeline() {
  const stages = [
    ['01', 'Statement sources', 'Three provider-specific monthly inputs'],
    ['02', 'Parser layer', 'Extract transactions from each source format'],
    ['03', 'Canonical schema', 'Normalise dates, amounts, descriptions and provenance'],
    ['04', 'Human comment layer', 'Preserve every existing nonblank annotation exactly'],
    ['05', 'ML fallback', 'Predict only for rows that remain genuinely unlabelled'],
    ['06', 'Validation gate', 'Check files, schema, row integrity and publishing rules'],
    ['07', 'Monthly publication', 'Write repeatable outputs into the year/month structure'],
  ]
  return (
    <div className="ft-pipeline" data-reveal>
      {stages.map(([index,title,text], i) => (
        <div key={index}>
          <span>{index}</span><p><strong>{title}</strong><small>{text}</small></p>{i < stages.length - 1 && <i>↓</i>}
        </div>
      ))}
    </div>
  )
}

function CommentAuthorityDiagram() {
  return (
    <div className="ft-authority" data-reveal>
      <div className="ft-authority-input"><span>CANONICAL TRANSACTION</span><strong>COMMENT FIELD</strong></div>
      <div className="ft-authority-branch">
        <article><span>NONBLANK?</span><strong>YES</strong><p>Keep the human comment exactly as written.</p><em>AUTHORITATIVE PATH</em></article>
        <article><span>NONBLANK?</span><strong>NO</strong><p>Allow the trained classifier to propose a fallback label.</p><em>FALLBACK PATH</em></article>
      </div>
      <div className="ft-authority-output"><span>PUBLISHING RULE</span><strong>HUMAN INPUT ALWAYS WINS</strong></div>
    </div>
  )
}

function FinanceTrackerPage() {
  const safeguards = [
    ['MISSING-FILE GUARD', 'The run stops before publishing when a required monthly input is absent.'],
    ['IDEMPOTENT EXECUTION', 'Rerunning the same month does not create uncontrolled duplicate outputs.'],
    ['SCHEMA CONTROL', 'Transactions are normalised into one consistent canonical structure.'],
    ['COMMENT PRESERVATION', 'Existing human annotations pass through every phase unchanged.'],
    ['LOCAL PROCESSING', 'Personal financial statements and trained artifacts remain on the local machine.'],
    ['CONTROLLED PUBLISHING', 'Outputs are written only after the expected validation checks pass.'],
  ]
  const roadmap = [
    ['CONFIGURATION LAYER', 'Replace personal paths, account names and fixed rules with documented configuration.'],
    ['PARSER ABSTRACTION', 'Create provider templates so new statement formats can be added without editing core logic.'],
    ['SYNTHETIC SAMPLE DATA', 'Publish realistic examples without exposing any personal financial information.'],
    ['AUTOMATED TEST SUITE', 'Add parser, schema, preservation and end-to-end regression tests.'],
    ['CLEAN CLI & INSTALLATION', 'Package the monthly runner with simple commands and environment checks.'],
    ['PUBLIC DOCUMENTATION', 'Add architecture, privacy boundaries, examples and a reproducible walkthrough.'],
  ]
  return (
    <div className="case-shell finance-case">
      <ProjectLanguageTranslator project="finance" />
      <a className="skip-link" href="#ft-hero">Skip to project content</a>
      <CursorGlow /><div className="noise" /><div className="grid" />
      <FinanceTopbar />
      <ProjectCinematicScrollSystem project="finance" />

      <main id="finance-main">
        <section id="ft-hero" className="ft-case-hero" tabIndex={-1}>
          <div className="mg-case-copy">
            <p className="eyebrow"><span>PROJECT // FT-01</span>PRIVATE SYSTEM · OPERATIONAL</p>
            <h1>Finance Tracker <em>Automation</em></h1>
            <h2>Local-first financial data engineering designed around automation without surrendering control.</h2>
            <p className="mg-case-intro">A private monthly workflow that converts statements from three financial providers into canonical transaction data, preserves manual context, uses machine learning only for genuinely blank rows and publishes validated outputs without sending personal data to a cloud service.</p>
            <div className="mg-case-actions">
              <a className="button orange" href="#ft-workflow">Explore the workflow <span>↓</span></a>
              <a className="button ghost" href="#ft-control">See the human-control layer <span>↓</span></a>
              <a className="text-link" href="#ft-roadmap">Why the repository is private <span>↓</span></a>
            </div>
          </div>
          <FinanceHeroVisual />
          <div className="mg-hero-stats ft-hero-stats">
            <div><strong>03</strong><span>INPUT SOURCES</span></div>
            <div><strong>03</strong><span>PROCESSING PHASES</span></div>
            <div><strong>LOCAL</strong><span>EXECUTION MODEL</span></div>
            <div><strong>HUMAN</strong><span>AUTHORITATIVE LABELS</span></div>
          </div>
        </section>

        <nav className="case-jumpbar" aria-label="Finance Tracker sections">
          <a href="#ft-problem">Problem</a><a href="#ft-workflow">Workflow</a><a href="#ft-control">Human control</a><a href="#ft-safety">Safeguards</a><a href="#ft-state">System state</a><a href="#ft-roadmap">Roadmap</a>
        </nav>

        <section id="ft-problem" className="case-section">
          <CaseSectionTitle index="01" label="THE ENGINEERING PROBLEM" title="The difficult part was not drawing a spending chart. It was making the monthly data trustworthy." text="Financial statements arrive in different structures, descriptions are inconsistent and manual context can easily disappear during automation. The project was built to make monthly preparation repeatable without allowing automation to overwrite human judgement." />
          <div className="mg-positioning ft-positioning" data-reveal>
            <span>PROJECT POSITIONING</span>
            <p><strong>A personal operations system, not a generic budgeting application.</strong> The core value is the data pipeline: extraction, canonicalisation, human-annotation preservation, controlled machine-learning fallback and safe monthly publishing.</p>
          </div>
          <div className="mg-problem-grid ft-problem-grid">
            <article data-reveal><span>FRAGMENTED INPUTS</span><strong>03</strong><p>Each provider exports transactions with its own structure, naming conventions and statement behaviour.</p></article>
            <article data-reveal><span>REPETITIVE WORK</span><strong>MONTHLY</strong><p>Manual conversion, cleanup and reconciliation consume time and invite inconsistent handling.</p></article>
            <article data-reveal><span>CONTEXT RISK</span><strong>HUMAN</strong><p>Personal comments contain the meaning behind a transaction and must survive every automated phase.</p></article>
          </div>
        </section>

        <section id="ft-workflow" className="case-section panel-section">
          <CaseSectionTitle index="02" label="END-TO-END WORKFLOW" title="Three phases turn statements into a controlled monthly data product." text="The architecture separates raw extraction, model training and safe publication. Each phase has a distinct responsibility so parsing errors, model behaviour and final output rules can be tested independently." />
          <div className="ft-workflow-layout">
            <FinancePipeline />
            <div className="ft-phase-stack" data-reveal>
              <article><span>PHASE 01</span><h3>Extract & canonicalise</h3><p>Read the three statement sources, create provider CSVs and combine them into one canonical transaction model with stable fields and provenance.</p><strong>PDF → CSV → CANONICAL DATA</strong></article>
              <article><span>PHASE 02</span><h3>Train & validate the fallback</h3><p>Build the labelled training set from reviewed historical transactions, hold out a month for validation and version the resulting model bundle.</p><strong>LABELLED DATA → MODEL BUNDLE</strong></article>
              <article><span>PHASE 03</span><h3>Publish safely</h3><p>Preserve all existing comments, apply the model only to blanks, run validation checks and write the completed monthly outputs.</p><strong>HUMAN LABELS + FALLBACK → PUBLISHED MONTH</strong></article>
            </div>
          </div>
        </section>

        <section id="ft-control" className="case-section">
          <CaseSectionTitle index="03" label="HUMAN-IN-THE-LOOP CONTROL" title="Automation fills gaps. It does not rewrite intent." text="The comment column is treated as a protected human decision layer. Any nonblank comment remains untouched; only a genuinely unlabelled transaction is eligible for machine-learning fallback." />
          <CommentAuthorityDiagram />
          <div className="ft-control-principles">
            <article data-reveal><span>01</span><h3>Human comments are authoritative</h3><p>Reviewed annotations represent real context that a transaction description alone may not contain.</p></article>
            <article data-reveal><span>02</span><h3>Machine learning is a fallback</h3><p>The classifier reduces repetitive labelling work, but it does not replace already-reviewed decisions.</p></article>
            <article data-reveal><span>03</span><h3>Publishing is a separate gate</h3><p>A prediction is not automatically accepted as a finished monthly dataset; the pipeline validates the complete output first.</p></article>
          </div>
        </section>

        <section id="ft-safety" className="case-section panel-section">
          <CaseSectionTitle index="04" label="WORKFLOW SAFEGUARDS" title="A useful automation must fail predictably." text="The project focuses as much on preventing silent damage as it does on saving time. Guards and validation rules protect the monthly workflow from missing inputs, duplicated execution, schema drift and lost annotations." />
          <div className="ft-safeguard-grid">
            {safeguards.map(([title,text], index) => <article data-reveal key={title}><span>S{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="ft-safety-strip" data-reveal><span>STOP ON MISSING INPUT</span><i /><span>PRESERVE NONBLANK COMMENTS</span><i /><span>VALIDATE BEFORE PUBLISH</span></div>
        </section>

        <section id="ft-state" className="case-section">
          <CaseSectionTitle index="05" label="CURRENT SYSTEM STATE" title="Operational for the monthly workflow it was designed to solve." text="The complete local pipeline has been reproduced across months: canonical data generation, model-bundle creation and comment-safe publication. The strongest result is not a flashy model score—it is a repeatable process that preserves the reviewed data already present." />
          <div className="ft-state-grid">
            <article data-reveal><span>PHASE 01</span><strong>REPRODUCIBLE</strong><p>Provider inputs are transformed into consistent canonical transactions and training artifacts.</p></article>
            <article data-reveal><span>PHASE 02</span><strong>VALIDATED</strong><p>The fallback classifier is trained from historical reviewed data and evaluated on a held-out month.</p></article>
            <article data-reveal><span>PHASE 03</span><strong>COMMENT-SAFE</strong><p>Publishing preserves every existing nonblank human comment and labels only the remaining gaps.</p></article>
            <article data-reveal><span>PRIVACY</span><strong>LOCAL-FIRST</strong><p>Statements, transaction history, model artifacts and output datasets remain on the user-controlled machine.</p></article>
          </div>
          <div className="ft-system-console" data-reveal>
            <p><span>RUNNER</span><strong>IDEMPOTENT</strong></p><p><span>INPUT GUARD</span><strong>ACTIVE</strong></p><p><span>COMMENT POLICY</span><strong>PRESERVE EXACTLY</strong></p><p><span>ML ROLE</span><strong>FALLBACK ONLY</strong></p><p><span>OUTPUT</span><strong>YEAR / MONTH STRUCTURE</strong></p>
          </div>
        </section>

        <section id="ft-roadmap" className="case-section panel-section">
          <CaseSectionTitle index="06" label="PRIVATE BOUNDARY & PUBLIC ROADMAP" title="The case study is public. The personal financial system is not." text="The current codebase contains provider assumptions, personal categories, local paths and workflow choices tailored to one household. Publishing it responsibly requires a clean, de-personalised release rather than exposing the working private repository." />
          <div className="ft-private-boundary" data-reveal>
            <div><span>CURRENT RELEASE</span><strong>PRIVATE SOURCE · PRIVATE DATA · PUBLIC ARCHITECTURE</strong></div>
            <p>This page explains the engineering design without exposing statements, account details, transaction records, personal categories or machine-specific configuration.</p>
          </div>
          <div className="ft-roadmap-grid">
            {roadmap.map(([title,text], index) => <article data-reveal key={title}><span>R{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="mg-case-footer" data-reveal>
            <div><span>PROJECT STATUS</span><strong>OPERATIONAL · PRIVATE · CASE STUDY PUBLISHED</strong></div>
            <div className="mg-case-footer-actions"><RouteLink to={`${localizedHome(resolveLanguage())}#projects`}>← Return to project lab</RouteLink><a href="#ft-workflow">Review architecture ↑</a></div>
          </div>
        </section>
      </main>
    </div>
  )
}

function BootScreen() {
  const { language, site, ui } = usePortfolioContent()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const visited = sessionStorage.getItem('selva-lab-booted')
    if (visited) return
    setShow(true)
    sessionStorage.setItem('selva-lab-booted', 'true')
    const timer = window.setTimeout(() => setShow(false), 1450)
    return () => window.clearTimeout(timer)
  }, [])
  if (!show) return null
  return (
    <div className="boot-screen" aria-hidden="true">
      <Logo />
      <div className="boot-copy"><span>{language === 'de' ? 'PROFESSIONELLES SYSTEM WIRD INITIALISIERT' : 'INITIALISING PROFESSIONAL SYSTEM'}</span><strong>SELVA // ENGINEERING LAB</strong></div>
      <div className="boot-track"><i /></div>
      <p>{language === 'de' ? 'FEM · ENTWICKLUNG · AUTOMATISIERUNG · KI' : 'FEM · DEVELOPMENT · AUTOMATION · AI'}</p>
    </div>
  )
}

export default function App() {
  const route = useAppRoute()
  const { language, site, ui } = usePortfolioContent()

  useEffect(() => {
    if (route !== 'resume') return
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: .12, rootMargin: '0px 0px -50px' })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [route])

  if (route === 'machineguard-ai') return <><RouteAnnouncer route={route} /><MachineGuardPage /></>
  if (route === 'threadrom') return <><RouteAnnouncer route={route} /><ThreadROMPage /></>
  if (route === 'finance-tracker') return <><RouteAnnouncer route={route} /><FinanceTrackerPage /></>
  if (route === 'resume') return <><RouteAnnouncer route={route} /><ResumePage /></>

  const [firstName, ...surnameParts] = site.name.split(' ')
  const surname = surnameParts.join(' ')

  return (
    <div className="shell">
      <RouteAnnouncer route={route} />
      <a className="skip-link" href="#main-content">{ui.skipMain}</a>
      <BootScreen />
      <CursorGlow /><div className="noise" /><div className="grid" />
      <Navbar /><SideRails /><CinematicScrollSystem />

      <main id="main-content" tabIndex={-1}>
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow r1"><span>00</span>{ui.hero.eyebrow}</p>
            <h1 id="hero-title" className="r2 hero-name"><span>{firstName}</span><span>{surname}.</span></h1>
            <h2 className="r3 hero-role">{site.role}</h2>
            <div className="hero-focus r4" aria-label={language === 'de' ? 'Zentrale Engineering-Schwerpunkte' : 'Primary engineering focus'}>
              {site.heroFocus.map((item, index) => <span key={item}>{item}{index < site.heroFocus.length - 1 && <i aria-hidden="true" />}</span>)}
            </div>
            <p className="intro r4">{site.intro}</p>
            <div className="actions r5">
              <a className="button primary" href="#projects">{ui.hero.projectButton} <span aria-hidden="true">↗</span></a>
              <RouteLink className="button ghost" to={localizedResume(language)}>{ui.hero.resumeButton} <span aria-hidden="true">↗</span></RouteLink>
            </div>
          </div>
          <div className="hero-art r3"><Rotor /></div>
          <div className="hero-meta r6"><span>{ui.hero.experience}</span><span>{site.location}</span></div>
          <a className="scroll-cue r6" href="#identity"><span>{ui.hero.scroll}</span><i /></a>
        </section>

        <div className="system-strip" aria-label={language === 'de' ? 'Portfolio-Systemstatus' : 'Portfolio system status'}>
          {ui.systemStrip.map((item, index) => <span key={item}>{index === 0 || index === ui.systemStrip.length - 1 ? <i /> : null}{item}</span>)}
        </div>

        <IdentitySection />
        <ExperienceSection />
        <ExpertiseSection />
        <ProjectsSection />
        <EducationSection />
        <ResumeSection />
      </main>

      <footer id="contact" className="footer section">
        <div className="footer-copy" data-reveal>
          <p className="section-kicker"><span>07</span>{ui.footer.label}</p>
          <h2>{ui.footer.title}</h2>
          <p className="footer-focus">{ui.footer.focus}</p>
          <p className="footer-support">{ui.footer.support}</p>
        </div>
        <a className="button primary" href={`mailto:${site.email}`}>{ui.footer.button} <span>↗</span></a>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>{ui.footer.email} ↗</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a href={site.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href={assetUrl(site.resume)} target="_blank" rel="noreferrer">{ui.footer.resume} ↗</a>
        </div>
        <div className="footer-bottom"><span>{ui.footer.built} {site.name}</span><span>SELVA // ENGINEERING LAB · © {new Date().getFullYear()}</span></div>
      </footer>
    </div>
  )
}
