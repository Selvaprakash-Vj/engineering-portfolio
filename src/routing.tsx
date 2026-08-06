import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useState,
} from 'react'
import { site } from './site'

export type AppRoute = 'home' | 'machineguard-ai' | 'threadrom' | 'finance-tracker' | 'resume'
export type Language = 'en' | 'de'

const routeSuffixes: Array<[AppRoute, string]> = [
  ['machineguard-ai', '/de/projekte/machineguard-ai'],
  ['threadrom', '/de/projekte/threadrom'],
  ['finance-tracker', '/de/projekte/finance-tracker'],
  ['machineguard-ai', '/projects/machineguard-ai'],
  ['threadrom', '/projects/threadrom'],
  ['finance-tracker', '/projects/finance-tracker'],
  ['resume', '/de/lebenslauf'],
  ['resume', '/resume'],
]

const languageSuffixes = ['/de/projekte/machineguard-ai', '/de/projekte/threadrom', '/de/projekte/finance-tracker', '/de/lebenslauf', '/de']

function trimTrailingSlash(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function resolveLanguage(pathname = window.location.pathname): Language {
  const cleanPath = trimTrailingSlash(pathname)
  return /(^|\/)de(\/|$)/.test(cleanPath) ? 'de' : 'en'
}

export function resolveRoute(pathname = window.location.pathname): AppRoute {
  const cleanPath = trimTrailingSlash(pathname)
  const matched = routeSuffixes.find(([, suffix]) => cleanPath.endsWith(suffix))
  return matched?.[0] ?? 'home'
}

/**
 * Resolves the application root at runtime so the same files work at:
 * - http://localhost:5173/
 * - https://username.github.io/repository/
 * - a future custom domain
 */
export function appRootPath(pathname = window.location.pathname) {
  let cleanPath = trimTrailingSlash(pathname)

  if (cleanPath.endsWith('/index.html')) {
    cleanPath = cleanPath.slice(0, -'/index.html'.length)
  }

  const knownSuffixes = [...routeSuffixes.map(([, suffix]) => suffix), ...languageSuffixes]
    .sort((a, b) => b.length - a.length)

  for (const suffix of knownSuffixes) {
    if (cleanPath.endsWith(suffix)) {
      cleanPath = cleanPath.slice(0, -suffix.length)
      break
    }
  }

  if (!cleanPath || cleanPath === '/') return '/'
  return `${cleanPath}/`
}

export function appUrl(target = '/') {
  const root = appRootPath()
  if (target === '/' || target === '') return root
  if (target.startsWith('#')) return `${root}${target}`
  return `${root}${target.replace(/^\//, '')}`
}

export function localizedHome(language: Language) {
  return language === 'de' ? '/de/' : '/'
}

export function localizedResume(language: Language) {
  return language === 'de' ? '/de/lebenslauf' : '/resume'
}

export function alternateLanguagePath(route: AppRoute, targetLanguage: Language) {
  if (route === 'resume') return localizedResume(targetLanguage)
  if (route === 'home') return localizedHome(targetLanguage)
  if (route === 'machineguard-ai') return targetLanguage === 'de' ? '/de/projekte/machineguard-ai' : '/projects/machineguard-ai'
  if (route === 'threadrom') return targetLanguage === 'de' ? '/de/projekte/threadrom' : '/projects/threadrom'
  if (route === 'finance-tracker') return targetLanguage === 'de' ? '/de/projekte/finance-tracker' : '/projects/finance-tracker'
  return localizedHome(targetLanguage)
}

export function assetUrl(filename: string) {
  return `${appRootPath()}${filename.replace(/^\.\//, '').replace(/^\//, '')}`
}

function shouldHandleClientSide(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

export function navigateTo(target: string, replace = false) {
  const href = appUrl(target)

  if (replace) {
    window.history.replaceState({ ...window.history.state, scrollY: 0 }, '', href)
  } else {
    window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '', window.location.href)
    window.history.pushState({ scrollY: 0 }, '', href)
  }

  window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))
}

type RouteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  children: ReactNode
}

export function RouteLink({ to, onClick, children, ...props }: RouteLinkProps) {
  const href = appUrl(to)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (!shouldHandleClientSide(event) || props.target === '_blank') return

    event.preventDefault()
    navigateTo(to)
  }

  return <a {...props} href={href} onClick={handleClick}>{children}</a>
}

function scrollForCurrentUrl(savedPosition = 0) {
  const hash = window.location.hash
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1))
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: savedPosition, left: 0, behavior: 'auto' })
      }
    })
  })
}

type RouteMetadata = {
  title: string
  description: string
  path: string
  image: string
  imageAlt: string
  schemaType: 'Person' | 'SoftwareApplication' | 'CreativeWork' | 'ProfilePage'
}

const routeMetadataEn: Record<AppRoute, RouteMetadata> = {
  home: {
    title: 'Selvaprakash Vijayaraman | Mechanical Development & Simulation Engineer',
    description: 'Mechanical development and simulation engineer specialising in FEM, structural dynamics, thermomechanical analysis, engineering automation and data-driven methods.',
    path: '',
    image: 'social/portfolio-preview.png',
    imageAlt: 'Selvaprakash Vijayaraman engineering portfolio preview',
    schemaType: 'Person',
  },
  'machineguard-ai': {
    title: 'MachineGuard AI | Reliability-Aware Predictive Maintenance',
    description: 'A reliability-aware NASA C-MAPSS turbofan RUL project combining leakage-safe data engineering, GRU prediction, uncertainty, trajectory diagnostics and engineering review.',
    path: 'projects/machineguard-ai/',
    image: 'social/machineguard-preview.png',
    imageAlt: 'MachineGuard AI predictive maintenance project preview',
    schemaType: 'SoftwareApplication',
  },
  threadrom: {
    title: 'ThreadROM Phase 1 | Threaded-Fastener FEM Foundation',
    description: 'A reproducible M10×1.5 full-helical fastener FEM foundation with controlled Gmsh meshes, CalculiX axial baselines, equilibrium checks and convergence evidence.',
    path: 'projects/threadrom/',
    image: 'social/threadrom-preview.png',
    imageAlt: 'ThreadROM Phase 1 threaded-fastener FEM project preview',
    schemaType: 'CreativeWork',
  },
  'finance-tracker': {
    title: 'Finance Tracker Automation | Local-First Data Engineering',
    description: 'A private local-first financial data pipeline with canonical transaction processing, exact human-comment preservation, ML fallback and validated monthly publishing.',
    path: 'projects/finance-tracker/',
    image: 'social/finance-tracker-preview.png',
    imageAlt: 'Finance Tracker Automation local data engineering project preview',
    schemaType: 'CreativeWork',
  },
  resume: {
    title: 'Digital Resume | Selvaprakash Vijayaraman',
    description: 'Professional experience, education, engineering capabilities and contact details for Selvaprakash Vijayaraman.',
    path: 'resume/',
    image: 'social/resume-preview.png',
    imageAlt: 'Digital resume of Selvaprakash Vijayaraman',
    schemaType: 'ProfilePage',
  },
}

const routeMetadataDe: Record<AppRoute, RouteMetadata> = {
  ...routeMetadataEn,
  'machineguard-ai': {
    title: 'MachineGuard AI | Zuverlässigkeitsbewusste Predictive Maintenance',
    description: 'Eine deutschsprachige Fallstudie zur RUL-Prognose für NASA-C-MAPSS-Turbofantriebwerke mit leakage-sicherer Datenaufbereitung, GRU, Unsicherheit, Trajektoriendiagnostik und technischer Bewertung.',
    path: 'de/projekte/machineguard-ai/',
    image: 'social/machineguard-preview.png',
    imageAlt: 'MachineGuard AI Predictive-Maintenance-Projekt',
    schemaType: 'SoftwareApplication',
  },
  threadrom: {
    title: 'ThreadROM Phase 1 | FEM-Grundlage für Gewindeverbindungen',
    description: 'Eine reproduzierbare FEM-Basis für eine vollhelikale M10×1,5-Schraube mit kontrollierten Gmsh-Netzen, CalculiX-Referenzlastfall, Gleichgewichtsprüfung und Konvergenzevidenz.',
    path: 'de/projekte/threadrom/',
    image: 'social/threadrom-preview.png',
    imageAlt: 'ThreadROM Phase-1-Projekt zur FEM von Gewindeverbindungen',
    schemaType: 'CreativeWork',
  },
  'finance-tracker': {
    title: 'Finance Tracker Automation | Lokales Data Engineering',
    description: 'Eine private, lokal ausgeführte Finanzdaten-Pipeline mit kanonischer Transaktionsverarbeitung, unveränderter Übernahme menschlicher Kommentare, ML-Fallback und validierter Monatsveröffentlichung.',
    path: 'de/projekte/finance-tracker/',
    image: 'social/finance-tracker-preview.png',
    imageAlt: 'Finance Tracker Automation als lokales Data-Engineering-Projekt',
    schemaType: 'CreativeWork',
  },
  home: {
    title: 'Selvaprakash Vijayaraman | Mechanische Entwicklung, CAE & Simulation',
    description: 'Entwicklungsingenieur mit Erfahrung in mechanischer Entwicklung, FEM, Strukturdynamik, Thermomechanik, Simulationsautomatisierung und datengetriebenen Engineering-Methoden.',
    path: 'de/',
    image: 'social/portfolio-preview.png',
    imageAlt: 'Deutsches Engineering-Portfolio von Selvaprakash Vijayaraman',
    schemaType: 'Person',
  },
  resume: {
    title: 'Digitaler Lebenslauf | Selvaprakash Vijayaraman',
    description: 'Berufserfahrung, Ausbildung, technische Kompetenzen und Kontaktdaten von Selvaprakash Vijayaraman.',
    path: 'de/lebenslauf/',
    image: 'social/resume-preview.png',
    imageAlt: 'Digitaler Lebenslauf von Selvaprakash Vijayaraman',
    schemaType: 'ProfilePage',
  },
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value))
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let link = document.head.querySelector<HTMLLinkElement>(selector)
  if (!link) {
    link = document.createElement('link')
    document.head.appendChild(link)
  }
  Object.entries(attributes).forEach(([key, value]) => link?.setAttribute(key, value))
}

function absolutePublicUrl(path = '') {
  return new URL(path, site.publicUrl).toString()
}

function structuredData(route: AppRoute, canonical: string, image: string, language: Language) {
  const metadata = (language === 'de' ? routeMetadataDe : routeMetadataEn)[route]
  const common = {
    '@context': 'https://schema.org',
    '@type': metadata.schemaType,
    inLanguage: language === 'de' ? 'de-DE' : 'en',
    name: route === 'home' ? site.name : metadata.title.split(' | ')[0],
    url: canonical,
    image,
    author: route === 'home' ? undefined : { '@type': 'Person', name: site.name, url: absolutePublicUrl() },
  }

  if (route === 'home') {
    return {
      ...common,
      jobTitle: language === 'de' ? 'Entwicklungsingenieur für mechanische Systeme und Simulation' : site.role,
      description: metadata.description,
      email: `mailto:${site.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Ingolstadt', addressCountry: 'DE' },
      sameAs: [site.linkedin, site.github],
      knowsAbout: ['Mechanical development', 'Finite element analysis', 'CAE', 'Structural dynamics', 'Thermomechanical simulation', 'Engineering automation', 'Machine learning'],
    }
  }

  if (route === 'machineguard-ai') {
    return {
      ...common,
      applicationCategory: 'EngineeringApplication',
      operatingSystem: 'Web',
      description: metadata.description,
      softwareVersion: '1.0.0',
      codeRepository: 'https://github.com/Selvaprakash-Vj/MachineGuard-AI',
    }
  }

  return { ...common, description: metadata.description }
}

function applyRouteMetadata(route: AppRoute) {
  const language = resolveLanguage()
  const metadata = (language === 'de' ? routeMetadataDe : routeMetadataEn)[route]
  const canonical = absolutePublicUrl(metadata.path)
  const image = absolutePublicUrl(metadata.image)

  document.title = metadata.title
  document.documentElement.lang = language
  upsertMeta('meta[name="description"]', { name: 'description', content: metadata.description })
  upsertMeta('meta[name="author"]', { name: 'author', content: site.name })
  upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large' })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: metadata.title })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metadata.description })
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: route === 'home' ? 'profile' : 'website' })
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Selva Engineering Lab' })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: metadata.imageAlt })
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: language === 'de' ? 'de_DE' : 'en_US' })
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: metadata.title })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: metadata.description })
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
  upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: metadata.imageAlt })
  upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical })

  const englishPath = route === 'resume' ? 'resume/' : route === 'home' ? '' : route === 'machineguard-ai' ? 'projects/machineguard-ai/' : route === 'threadrom' ? 'projects/threadrom/' : 'projects/finance-tracker/'
  const germanPath = route === 'resume' ? 'de/lebenslauf/' : route === 'home' ? 'de/' : route === 'machineguard-ai' ? 'de/projekte/machineguard-ai/' : route === 'threadrom' ? 'de/projekte/threadrom/' : 'de/projekte/finance-tracker/'
  upsertLink('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: absolutePublicUrl(englishPath) })
  upsertLink('link[rel="alternate"][hreflang="de"]', { rel: 'alternate', hreflang: 'de', href: absolutePublicUrl(germanPath) })
  upsertLink('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: absolutePublicUrl(englishPath) })

  let script = document.head.querySelector<HTMLScriptElement>('#portfolio-structured-data')
  if (!script) {
    script = document.createElement('script')
    script.id = 'portfolio-structured-data'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(structuredData(route, canonical, image, language))
}

export function useAppRoute() {
  const [routeState, setRouteState] = useState(() => ({ route: resolveRoute(), path: window.location.pathname }))

  useEffect(() => {
    const legacyParams = new URLSearchParams(window.location.search)
    const legacyProject = legacyParams.get('project')
    const legacyRoute = legacyParams.get('route')
    const legacyLanguage = legacyParams.get('lang')
    if (legacyProject === 'machineguard-ai' || legacyProject === 'threadrom' || legacyProject === 'finance-tracker') {
      const target = legacyLanguage === 'de' ? `/de/projekte/${legacyProject}` : `/projects/${legacyProject}`
      window.history.replaceState({}, '', appUrl(target))
      setRouteState({ route: resolveRoute(), path: window.location.pathname })
    } else if (legacyRoute === 'resume') {
      window.history.replaceState({}, '', appUrl('/resume'))
      setRouteState({ route: resolveRoute(), path: window.location.pathname })
    }

    const onNavigation = (event: PopStateEvent) => {
      const nextRoute = resolveRoute()
      setRouteState({ route: nextRoute, path: window.location.pathname })
      applyRouteMetadata(nextRoute)
      const savedPosition = typeof event.state?.scrollY === 'number' ? event.state.scrollY : 0
      scrollForCurrentUrl(savedPosition)
    }

    window.history.scrollRestoration = 'manual'
    window.history.replaceState(
      { ...window.history.state, scrollY: window.history.state?.scrollY ?? window.scrollY },
      '',
      window.location.href,
    )
    applyRouteMetadata(resolveRoute())
    window.addEventListener('popstate', onNavigation)
    scrollForCurrentUrl(window.history.state?.scrollY ?? 0)

    return () => window.removeEventListener('popstate', onNavigation)
  }, [])

  return routeState.route
}
