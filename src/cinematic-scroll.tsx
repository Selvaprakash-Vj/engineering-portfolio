import { useLayoutEffect, useState } from 'react'
import { resolveLanguage } from './routing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type ScrollScene = {
  id: string
  number: string
  label: string
  accent: string
}

const homeScenes: ScrollScene[] = [
  { id: 'home', number: '00', label: 'SYSTEM', accent: '#4cc9f0' },
  { id: 'identity', number: '01', label: 'IDENTITY', accent: '#4cc9f0' },
  { id: 'experience', number: '02', label: 'CAREER', accent: '#ff6b35' },
  { id: 'expertise', number: '03', label: 'STACK', accent: '#57e6a4' },
  { id: 'projects', number: '04', label: 'PROJECTS', accent: '#4cc9f0' },
  { id: 'education', number: '05', label: 'ACADEMIC', accent: '#ff6b35' },
  { id: 'resume', number: '06', label: 'RESUME', accent: '#57e6a4' },
  { id: 'contact', number: '07', label: 'CONNECT', accent: '#4cc9f0' },
]

const projectScenes: Record<'machineguard' | 'threadrom' | 'finance', ScrollScene[]> = {
  machineguard: [
    { id: 'mg-hero', number: '00', label: 'INTRO', accent: '#4cc9f0' },
    { id: 'mg-overview', number: '01', label: 'PROBLEM', accent: '#ff6b35' },
    { id: 'mg-workflow', number: '02', label: 'WORKFLOW', accent: '#4cc9f0' },
    { id: 'mg-results', number: '03', label: 'RESULTS', accent: '#57e6a4' },
    { id: 'mg-reliability', number: '04', label: 'RELIABILITY', accent: '#4cc9f0' },
    { id: 'mg-failure', number: '05', label: 'FAILURE', accent: '#ff6b35' },
    { id: 'mg-decision', number: '06', label: 'DECISION', accent: '#57e6a4' },
    { id: 'mg-explore', number: '07', label: 'EXPLORE', accent: '#4cc9f0' },
  ],
  threadrom: [
    { id: 'tr-hero', number: '00', label: 'INTRO', accent: '#4cc9f0' },
    { id: 'tr-problem', number: '01', label: 'PROBLEM', accent: '#ff6b35' },
    { id: 'tr-geometry', number: '02', label: 'GEOMETRY', accent: '#4cc9f0' },
    { id: 'tr-solver', number: '03', label: 'SOLVER', accent: '#57e6a4' },
    { id: 'tr-convergence', number: '04', label: 'CONVERGENCE', accent: '#4cc9f0' },
    { id: 'tr-quality', number: '05', label: 'QUALITY', accent: '#ff6b35' },
    { id: 'tr-factory', number: '06', label: 'FACTORY', accent: '#4cc9f0' },
    { id: 'tr-rom', number: '07', label: 'ROM', accent: '#ff6b35' },
    { id: 'tr-boundary', number: '08', label: 'STATUS', accent: '#57e6a4' },
  ],
  finance: [
    { id: 'ft-hero', number: '00', label: 'INTRO', accent: '#ff6b35' },
    { id: 'ft-problem', number: '01', label: 'PROBLEM', accent: '#4cc9f0' },
    { id: 'ft-workflow', number: '02', label: 'WORKFLOW', accent: '#ff6b35' },
    { id: 'ft-control', number: '03', label: 'CONTROL', accent: '#57e6a4' },
    { id: 'ft-safety', number: '04', label: 'SAFETY', accent: '#4cc9f0' },
    { id: 'ft-state', number: '05', label: 'STATE', accent: '#ff6b35' },
    { id: 'ft-roadmap', number: '06', label: 'ROADMAP', accent: '#57e6a4' },
  ],
}

function revealWithoutMotion(selector = '[data-reveal]') {
  document.querySelectorAll<HTMLElement>(selector).forEach(node => {
    node.classList.add('revealed')
    node.style.removeProperty('opacity')
    node.style.removeProperty('transform')
    node.style.removeProperty('filter')
    node.style.removeProperty('visibility')
    node.style.removeProperty('clip-path')
  })
}

function setupLiteScenes(
  scenes: ScrollScene[],
  activate: (id: string) => void,
  sceneClass: string,
  revealSelector: string,
) {
  const sceneElements = scenes
    .map(scene => document.getElementById(scene.id))
    .filter(Boolean) as HTMLElement[]

  const sceneObserver = new IntersectionObserver(
    entries => entries.forEach(entry => entry.isIntersecting && activate(entry.target.id)),
    { rootMargin: '-38% 0px -52% 0px', threshold: 0 },
  )

  sceneElements.forEach(element => {
    element.classList.add(sceneClass)
    sceneObserver.observe(element)
  })

  const revealObserver = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('revealed')
      revealObserver.unobserve(entry.target)
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.04 },
  )

  const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))
  revealNodes.forEach(node => revealObserver.observe(node))

  return () => {
    sceneObserver.disconnect()
    revealObserver.disconnect()
    sceneElements.forEach(element => element.classList.remove(sceneClass, 'is-scene-active'))
    revealWithoutMotion(revealSelector)
  }
}

function setupAnimationRuntime() {
  ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true })
  gsap.ticker.lagSmoothing(1000, 16)

  let resizeFrame = 0
  const refresh = () => {
    window.cancelAnimationFrame(resizeFrame)
    resizeFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
  }
  const handleVisibility = () => document.hidden ? gsap.ticker.sleep() : gsap.ticker.wake()

  window.addEventListener('resize', refresh, { passive: true })
  window.addEventListener('orientationchange', refresh, { passive: true })
  document.addEventListener('visibilitychange', handleVisibility)
  document.fonts?.ready.then(refresh).catch(() => undefined)

  return () => {
    window.cancelAnimationFrame(resizeFrame)
    window.removeEventListener('resize', refresh)
    window.removeEventListener('orientationchange', refresh)
    document.removeEventListener('visibilitychange', handleVisibility)
    gsap.ticker.wake()
  }
}

function SceneRail({ scenes, activeId, className = '' }: { scenes: ScrollScene[]; activeId: string; className?: string }) {
  const activeIndex = Math.max(0, scenes.findIndex(scene => scene.id === activeId))
  const active = scenes[activeIndex] ?? scenes[0]

  return (
    <>
      <aside className={`scene-rail ${className}`} aria-label="Page sections">
        <div className="scene-rail-readout">
          <strong>{active.number}</strong>
          <small>{active.label}</small>
        </div>
        <nav>
          {scenes.map(scene => (
            <a
              key={scene.id}
              href={`#${scene.id}`}
              className={scene.id === activeId ? 'active' : ''}
              aria-label={`Go to ${scene.label}`}
              aria-current={scene.id === activeId ? 'step' : undefined}
            >
              <span>{scene.number}</span>
              <i />
              <small>{scene.label}</small>
            </a>
          ))}
        </nav>
        <div className="scene-rail-track" aria-hidden="true">
          <i style={{ height: `${(activeIndex / Math.max(1, scenes.length - 1)) * 100}%` }} />
        </div>
      </aside>

      <div key={activeId} className="scene-transition-flash" aria-hidden="true">
        <i />
        <span>{active.number}</span>
        <strong>{active.label}</strong>
      </div>
    </>
  )
}

function homepageSectionStart(id: string) {
  const starts: Record<string, Record<string, string | number>> = {
    identity: { autoAlpha: 0.38, x: 95, y: 24, scale: 0.985, clipPath: 'inset(0 10% 0 0)' },
    experience: { autoAlpha: 0.34, x: -90, y: 30, skewX: -1.2, clipPath: 'inset(0 0 0 9%)' },
    expertise: { autoAlpha: 0.32, y: 95, scale: 0.925, rotation: 0.35, clipPath: 'inset(10% 0 0 0)' },
    projects: { autoAlpha: 0.35, y: 115, scale: 0.975, clipPath: 'inset(14% 0 0 0)' },
    education: { autoAlpha: 0.36, x: 88, y: 22, clipPath: 'inset(0 0 0 12%)' },
    resume: { autoAlpha: 0.34, y: 82, scale: 0.945, rotationX: 3, transformPerspective: 1200 },
  }
  return starts[id] ?? { autoAlpha: 0.4, y: 70, scale: 0.98 }
}

function homepageRevealStart(id: string, index: number) {
  switch (id) {
    case 'identity':
      return { autoAlpha: 0, x: index % 2 === 0 ? -58 : 58, y: 18, scale: 0.985 }
    case 'experience':
      return { autoAlpha: 0, x: -64, y: 18, skewX: -0.8 }
    case 'expertise':
      return { autoAlpha: 0, y: 58, scale: 0.88, rotation: index % 2 === 0 ? -1.2 : 1.2 }
    case 'projects':
      return { autoAlpha: 0, x: index % 2 === 0 ? -78 : 78, y: 42, rotation: index % 2 === 0 ? -0.8 : 0.8 }
    case 'education':
      return { autoAlpha: 0, y: 72, clipPath: 'inset(0 0 22% 0)' }
    case 'resume':
      return { autoAlpha: 0, x: 54, y: 30, scale: 0.965 }
    case 'contact':
      return { autoAlpha: 0, y: 46, x: index === 1 ? 42 : 0 }
    default:
      return { autoAlpha: 0, y: 42 }
  }
}

export function CinematicScrollSystem() {
  const [activeScene, setActiveScene] = useState('home')

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactViewport = window.matchMedia('(max-width: 900px), (pointer: coarse)')
    const root = document.documentElement

    root.classList.add('cinematic-scroll-enabled')
    root.dataset.scene = 'home'
    root.style.setProperty('--scene-accent', homeScenes[0].accent)

    const activateScene = (id: string) => {
      const scene = homeScenes.find(item => item.id === id) ?? homeScenes[0]
      setActiveScene(id)
      root.dataset.scene = id
      root.style.setProperty('--scene-accent', scene.accent)
      document.querySelectorAll<HTMLElement>('.cinematic-scene.is-scene-active').forEach(node => node.classList.remove('is-scene-active'))
      document.getElementById(id)?.classList.add('is-scene-active')
    }

    if (reduceMotion.matches) {
      revealWithoutMotion()
      const observer = new IntersectionObserver(
        entries => entries.forEach(entry => entry.isIntersecting && activateScene(entry.target.id)),
        { rootMargin: '-42% 0px -48% 0px' },
      )
      homeScenes.forEach(scene => {
        const element = document.getElementById(scene.id)
        if (element) {
          element.classList.add('cinematic-scene')
          observer.observe(element)
        }
      })
      return () => {
        observer.disconnect()
        root.classList.remove('cinematic-scroll-enabled', 'motion-lite')
        delete root.dataset.scene
        root.style.removeProperty('--scene-accent')
      }
    }

    if (compactViewport.matches) {
      root.classList.add('motion-lite')
      const cleanupLite = setupLiteScenes(homeScenes, activateScene, 'cinematic-scene', '.shell [data-reveal]')
      return () => {
        cleanupLite()
        root.classList.remove('cinematic-scroll-enabled', 'motion-lite')
        delete root.dataset.scene
        root.style.removeProperty('--scene-accent')
      }
    }

    gsap.registerPlugin(ScrollTrigger)
    const cleanupRuntime = setupAnimationRuntime()

    const context = gsap.context(() => {
      const sceneElements = homeScenes.map(scene => document.getElementById(scene.id)).filter(Boolean) as HTMLElement[]

      sceneElements.forEach(section => {
        section.classList.add('cinematic-scene')
        section.style.transformOrigin = '50% 50%'

        ScrollTrigger.create({
          trigger: section,
          start: 'top 56%',
          end: 'bottom 44%',
          onEnter: () => activateScene(section.id),
          onEnterBack: () => activateScene(section.id),
        })

        if (section.id !== 'home' && section.id !== 'contact') {
          gsap.fromTo(
            section,
            homepageSectionStart(section.id),
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              rotationX: 0,
              skewX: 0,
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: compactViewport.matches ? 'top 94%' : 'top 96%',
                end: compactViewport.matches ? 'top 48%' : 'top 24%',
                scrub: compactViewport.matches ? 0.28 : 0.72,
                invalidateOnRefresh: true,
              },
            },
          )
        }

        if (section.id === 'contact') {
          gsap.fromTo(
            section,
            { autoAlpha: 0.55, y: 58 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.82,
              ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 84%', once: true },
            },
          )
        }

        const revealNodes = Array.from(section.querySelectorAll<HTMLElement>('[data-reveal]'))
        if (revealNodes.length) {
          revealNodes.forEach((node, index) => gsap.set(node, homepageRevealStart(section.id, index)))
          gsap.to(revealNodes, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            skewX: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: compactViewport.matches ? 0.58 : 0.92,
            stagger: compactViewport.matches ? 0.035 : 0.085,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: compactViewport.matches ? 'top 86%' : 'top 74%',
              once: true,
            },
          })
        }
      })

      gsap.to('.hero-art', {
        yPercent: 18,
        rotate: 8,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.9 },
      })

      gsap.to('.rotor > svg', {
        rotate: 42,
        transformOrigin: '50% 50%',
        ease: 'none',
        scrollTrigger: { trigger: '.shell', start: 'top top', end: 'bottom bottom', scrub: 1.2 },
      })

      gsap.to('.identity-console', {
        yPercent: -4,
        rotateY: -1.2,
        transformPerspective: 1200,
        ease: 'none',
        scrollTrigger: { trigger: '#identity', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      gsap.fromTo('.career-route-line', { scaleX: 0, transformOrigin: 'left center' }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '#experience', start: 'top 74%', end: 'top 30%', scrub: 0.7 },
      })

      gsap.to('.experience-panel', {
        xPercent: 2.5,
        ease: 'none',
        scrollTrigger: { trigger: '#experience', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      gsap.fromTo('.engineering-pipeline-line', { scaleX: 0, transformOrigin: 'left center' }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '#expertise', start: 'top 72%', end: 'bottom 38%', scrub: 0.9 },
      })

      gsap.fromTo('.expertise-card', { rotateX: 5, transformPerspective: 900 }, {
        rotateX: 0,
        stagger: 0.035,
        ease: 'none',
        scrollTrigger: { trigger: '#expertise', start: 'top 78%', end: 'bottom 35%', scrub: 0.75 },
      })

      gsap.to('.project-card:nth-child(odd)', {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
      gsap.to('.project-card:nth-child(even)', {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
      gsap.to('.project-graphic', {
        rotate: (index: number) => index % 2 === 0 ? 2.2 : -2.2,
        scale: 1.035,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      gsap.fromTo('.education-index i', { scaleY: 0, transformOrigin: 'top center' }, {
        scaleY: 1,
        stagger: 0.16,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#education', start: 'top 66%', once: true },
      })
      gsap.to('.education-card:nth-child(odd)', {
        xPercent: -1.8,
        ease: 'none',
        scrollTrigger: { trigger: '#education', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      })
      gsap.to('.education-card:nth-child(even)', {
        xPercent: 1.8,
        ease: 'none',
        scrollTrigger: { trigger: '#education', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      })

      gsap.fromTo('.resume-shell', { clipPath: 'inset(0 0 100% 0)' }, {
        clipPath: 'inset(0 0 0% 0)',
        ease: 'none',
        scrollTrigger: { trigger: '#resume', start: 'top 78%', end: 'top 20%', scrub: 0.85 },
      })

      gsap.fromTo('.footer-copy h2', { backgroundPositionX: '100%' }, {
        backgroundPositionX: '0%',
        ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top 78%', end: 'top 38%', scrub: 0.7 },
      })

      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const viewportFocus = window.innerHeight * 0.5
        const current = sceneElements.find(element => {
          const rect = element.getBoundingClientRect()
          return rect.top <= viewportFocus && rect.bottom >= viewportFocus
        })
        activateScene(current?.id ?? 'home')
      })
    })

    return () => {
      cleanupRuntime()
      context.revert()
      root.classList.remove('cinematic-scroll-enabled', 'motion-lite')
      delete root.dataset.scene
      root.style.removeProperty('--scene-accent')
      document.querySelectorAll<HTMLElement>('.cinematic-scene').forEach(node => {
        node.classList.remove('cinematic-scene', 'is-scene-active')
        node.style.removeProperty('transform-origin')
        node.style.removeProperty('opacity')
        node.style.removeProperty('visibility')
        node.style.removeProperty('transform')
        node.style.removeProperty('filter')
        node.style.removeProperty('clip-path')
      })
      revealWithoutMotion()
    }
  }, [])

  return <SceneRail scenes={homeScenes} activeId={activeScene} />
}

function projectSectionStart(index: number) {
  const variants = [
    { autoAlpha: 0.34, x: -95, y: 22, clipPath: 'inset(0 0 0 11%)' },
    { autoAlpha: 0.34, x: 95, y: 22, clipPath: 'inset(0 11% 0 0)' },
    { autoAlpha: 0.32, y: 105, scale: 0.93, clipPath: 'inset(12% 0 0 0)' },
    { autoAlpha: 0.36, y: -45, scale: 0.97, clipPath: 'inset(0 0 12% 0)' },
  ]
  return variants[index % variants.length]
}

export function ProjectCinematicScrollSystem({ project }: { project: 'machineguard' | 'threadrom' | 'finance' }) {
  const language = resolveLanguage()
  const labelsDe: Record<'machineguard' | 'threadrom' | 'finance', string[]> = {
    machineguard: ['INTRO', 'PROBLEM', 'WORKFLOW', 'ERGEBNISSE', 'ZUVERLÄSSIGKEIT', 'FEHLERFALL', 'ENTSCHEIDUNG', 'VERTIEFEN'],
    threadrom: ['INTRO', 'PROBLEM', 'GEOMETRIE', 'SOLVER', 'KONVERGENZ', 'QUALITÄT', 'FEM-FABRIK', 'ROM', 'STATUS'],
    finance: ['INTRO', 'PROBLEM', 'WORKFLOW', 'KONTROLLE', 'SCHUTZ', 'SYSTEMSTAND', 'ROADMAP'],
  }
  const scenes = projectScenes[project].map((scene, index) => language === 'de' ? { ...scene, label: labelsDe[project][index] } : scene)
  const [activeScene, setActiveScene] = useState(scenes[0].id)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactViewport = window.matchMedia('(max-width: 900px), (pointer: coarse)')
    const root = document.documentElement
    const pageRoot = document.querySelector<HTMLElement>('.case-shell')

    root.classList.add('project-scroll-enabled')
    root.dataset.projectScene = scenes[0].id
    root.style.setProperty('--scene-accent', scenes[0].accent)

    const activate = (id: string) => {
      const scene = scenes.find(item => item.id === id) ?? scenes[0]
      setActiveScene(id)
      root.dataset.projectScene = id
      root.style.setProperty('--scene-accent', scene.accent)
      document.querySelectorAll<HTMLElement>('.project-cinematic-scene.is-scene-active').forEach(node => node.classList.remove('is-scene-active'))
      document.getElementById(id)?.classList.add('is-scene-active')
    }

    if (reduceMotion.matches) {
      revealWithoutMotion('.case-shell [data-reveal]')
      const observer = new IntersectionObserver(
        entries => entries.forEach(entry => entry.isIntersecting && activate(entry.target.id)),
        { rootMargin: '-42% 0px -48% 0px' },
      )
      scenes.forEach(scene => {
        const element = document.getElementById(scene.id)
        if (element) {
          element.classList.add('project-cinematic-scene')
          observer.observe(element)
        }
      })
      return () => {
        observer.disconnect()
        root.classList.remove('project-scroll-enabled', 'motion-lite')
        delete root.dataset.projectScene
        root.style.removeProperty('--scene-accent')
      }
    }

    if (compactViewport.matches) {
      root.classList.add('motion-lite')
      const cleanupLite = setupLiteScenes(scenes, activate, 'project-cinematic-scene', '.case-shell [data-reveal]')
      return () => {
        cleanupLite()
        root.classList.remove('project-scroll-enabled', 'motion-lite')
        delete root.dataset.projectScene
        root.style.removeProperty('--scene-accent')
      }
    }

    gsap.registerPlugin(ScrollTrigger)
    const cleanupRuntime = setupAnimationRuntime()
    const context = gsap.context(() => {
      const elements = scenes.map(scene => document.getElementById(scene.id)).filter(Boolean) as HTMLElement[]

      elements.forEach((section, index) => {
        section.classList.add('project-cinematic-scene')
        section.style.transformOrigin = '50% 50%'

        ScrollTrigger.create({
          trigger: section,
          start: 'top 56%',
          end: 'bottom 44%',
          onEnter: () => activate(section.id),
          onEnterBack: () => activate(section.id),
        })

        if (index === 0) {
          const copy = section.querySelector('.mg-case-copy')
          const visual = section.querySelector('.mg-hero-visual, .tr-hero-visual, .ft-hero-visual')
          const stats = section.querySelector('.mg-hero-stats')
          if (copy) gsap.fromTo(copy, { autoAlpha: 0, x: -72 }, { autoAlpha: 1, x: 0, duration: 1, ease: 'power3.out' })
          if (visual) gsap.fromTo(visual, { autoAlpha: 0, x: 72, scale: 0.94 }, { autoAlpha: 1, x: 0, scale: 1, duration: 1.15, ease: 'power3.out', delay: 0.08 })
          if (stats) gsap.fromTo(stats, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.25 })
          return
        }

        gsap.fromTo(section, projectSectionStart(index - 1), {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: compactViewport.matches ? 'top 94%' : 'top 96%',
            end: compactViewport.matches ? 'top 50%' : 'top 27%',
            scrub: compactViewport.matches ? 0.25 : 0.68,
            invalidateOnRefresh: true,
          },
        })

        const revealNodes = Array.from(section.querySelectorAll<HTMLElement>('[data-reveal]'))
        revealNodes.forEach((node, nodeIndex) => {
          gsap.set(node, {
            autoAlpha: 0,
            x: nodeIndex % 2 === 0 ? -42 : 42,
            y: 30 + (nodeIndex % 3) * 8,
            scale: 0.975,
          })
        })
        if (revealNodes.length) {
          gsap.to(revealNodes, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: compactViewport.matches ? 0.56 : 0.88,
            stagger: compactViewport.matches ? 0.025 : 0.065,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: compactViewport.matches ? 'top 86%' : 'top 72%', once: true },
          })
        }

        const title = section.querySelector('.case-section-title h2')
        if (title) {
          gsap.fromTo(title, { clipPath: index % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }, {
            clipPath: 'inset(0 0% 0 0%)',
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top 83%', end: 'top 44%', scrub: 0.65 },
          })
        }
      })

      gsap.to(project === 'machineguard' ? '.mg-hero-visual' : project === 'threadrom' ? '.tr-hero-visual' : '.ft-hero-visual', {
        yPercent: 12,
        rotate: project === 'machineguard' ? 2.2 : project === 'threadrom' ? 1.1 : -1.6,
        ease: 'none',
        scrollTrigger: { trigger: `#${scenes[0].id}`, start: 'top top', end: 'bottom top', scrub: 0.9 },
      })

      if (project === 'machineguard') {
        gsap.fromTo('.mg-architecture > div', { x: -42, autoAlpha: 0 }, {
          x: 0,
          autoAlpha: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#mg-workflow', start: 'top 66%', once: true },
        })
        gsap.fromTo('.mg-results-grid article', { y: 58, scale: 0.9, autoAlpha: 0 }, {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          stagger: 0.07,
          ease: 'back.out(1.25)',
          scrollTrigger: { trigger: '#mg-results', start: 'top 68%', once: true },
        })
        gsap.to('.predicted-line', {
          strokeDasharray: 900,
          strokeDashoffset: -900,
          ease: 'none',
          scrollTrigger: { trigger: '#mg-failure', start: 'top 78%', end: 'bottom 30%', scrub: 1 },
        })
        gsap.fromTo('.decision-arrows path', { strokeDasharray: 620, strokeDashoffset: 620 }, {
          strokeDashoffset: 0,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '#mg-decision', start: 'top 62%', once: true },
        })
      } else if (project === 'finance') {
        gsap.fromTo('.ft-pipeline > div', { x: -46, autoAlpha: 0 }, {
          x: 0,
          autoAlpha: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#ft-workflow', start: 'top 66%', once: true },
        })
        gsap.fromTo('.ft-authority-branch article', { scale: 0.88, autoAlpha: 0 }, {
          scale: 1,
          autoAlpha: 1,
          stagger: 0.14,
          ease: 'back.out(1.35)',
          scrollTrigger: { trigger: '#ft-control', start: 'top 64%', once: true },
        })
        gsap.fromTo('.ft-safeguard-grid article', { y: 48, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#ft-safety', start: 'top 68%', once: true },
        })
        gsap.fromTo('.ft-roadmap-grid article', { x: 55, autoAlpha: 0 }, {
          x: 0,
          autoAlpha: 1,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#ft-roadmap', start: 'top 70%', once: true },
        })
      } else {
        gsap.fromTo('.tr-mesh-level', { y: 55, scale: 0.9, autoAlpha: 0 }, {
          y: 0, scale: 1, autoAlpha: 1, stagger: 0.1, ease: 'back.out(1.25)',
          scrollTrigger: { trigger: '#tr-geometry', start: 'top 68%', once: true },
        })
        gsap.fromTo('.tr-pipeline article', { x: -46, autoAlpha: 0 }, {
          x: 0, autoAlpha: 1, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '#tr-solver', start: 'top 68%', once: true },
        })
        gsap.fromTo('.tr-convergence-point', { scale: 0, transformOrigin: 'center', autoAlpha: 0 }, {
          scale: 1, autoAlpha: 1, stagger: 0.16, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '#tr-convergence', start: 'top 64%', once: true },
        })
        gsap.fromTo('.tr-quality-grid article', { y: 48, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '#tr-quality', start: 'top 68%', once: true },
        })
      }

      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const viewportFocus = window.innerHeight * 0.5
        const current = elements.find(element => {
          const rect = element.getBoundingClientRect()
          return rect.top <= viewportFocus && rect.bottom >= viewportFocus
        })
        activate(current?.id ?? scenes[0].id)
      })
    }, pageRoot ?? undefined)

    return () => {
      cleanupRuntime()
      context.revert()
      root.classList.remove('project-scroll-enabled', 'motion-lite')
      delete root.dataset.projectScene
      root.style.removeProperty('--scene-accent')
      document.querySelectorAll<HTMLElement>('.project-cinematic-scene').forEach(node => {
        node.classList.remove('project-cinematic-scene', 'is-scene-active')
        node.style.removeProperty('transform-origin')
        node.style.removeProperty('opacity')
        node.style.removeProperty('visibility')
        node.style.removeProperty('transform')
        node.style.removeProperty('clip-path')
      })
      revealWithoutMotion('.case-shell [data-reveal]')
    }
  }, [project])

  return <SceneRail scenes={scenes} activeId={activeScene} className="project-scene-rail" />
}
