import { site as siteEn } from './site'
import { siteDe } from './site.de'
import { resolveLanguage, type Language } from './routing'

export const ui = {
  en: {
    nav: ['Identity', 'Experience', 'Expertise', 'Project Lab', 'Education', 'Resume'],
    menuOpen: 'Open menu', menuClose: 'Close menu', primaryNavigation: 'Primary navigation',
    routeLabels: { home: 'Portfolio home', 'machineguard-ai': 'MachineGuard AI project', 'finance-tracker': 'Finance Tracker Automation project', resume: 'Digital resume' },
    skipMain: 'Skip to main content', skipResume: 'Skip to resume content',
    language: 'Language', english: 'EN', german: 'DE',
    hero: {
      eyebrow: 'Professional system online',
      projectButton: 'Explore project lab', resumeButton: 'View digital résumé',
      experience: '03+ years experience', scroll: 'SCROLL TO DECODE',
    },
    systemStrip: ['SYSTEM STATUS: NOMINAL', 'PORTFOLIO BUILD: 06.1 // BILINGUAL CORE ONLINE', 'EXPERIENCE: 03+ YEARS', 'LOCATION: INGOLSTADT_DE', 'AVAILABLE FOR OPPORTUNITIES'],
    identity: {
      label: 'IDENTITY', title: 'Mechanical engineer by foundation. Development and simulation engineer by experience.',
      text: 'I work across mechanical development, CAE and computational engineering, turning design questions into calculations, simulations and practical improvements.',
      career: 'Read career log', pdf: 'Open PDF CV', name: 'NAME', role: 'ROLE', base: 'BASE', focus: 'FOCUS', method: 'METHOD',
      focusValue: 'DESIGN · CAE · AUTOMATION', methodValue: 'BUILD · SIMULATE · VALIDATE · IMPROVE', loop: 'ENGINEERING LOOP', active: 'ACTIVE / ITERATIVE', status: 'PROFESSIONAL SYSTEM ONLINE',
    },
    experience: {
      label: 'CAREER LOG', title: 'From research models to high-precision mechanical systems.',
      text: 'My career has evolved through simulation research, industrial multiphysics, thermomechanical CAE and multidisciplinary product development—combining CAD, FEM, structural dynamics, validation and automation.',
      activeRecord: 'ACTIVE RECORD', mission: 'ENGINEERING MISSION', stageAdded: 'THIS STAGE ADDED',
      metrics: [['PROFESSIONAL ARC', 'RESEARCH → DEVELOPMENT'], ['EXPERIENCE DOMAINS', 'DESIGN · CAE · MULTIPHYSICS'], ['CONNECTING LAYER', 'VALIDATION · DATA · AUTOMATION']],
    },
    expertise: {
      label: 'ENGINEERING STACK', title: 'From geometry and loads to validated engineering decisions.',
      text: 'My engineering stack spans six connected capability areas—from mechanical development and simulation to automation and data-driven methods. Each one supports the same objective: understand how a system behaves, improve the design and communicate the reasoning clearly.',
      pipeline: ['GEOMETRY', 'LOADS & PHYSICS', 'MODEL & SOLVER', 'VALIDATION', 'ENGINEERING DECISION'],
      toolchain: 'TOOLCHAIN', verification: 'VERIFICATION LAYER // ACTIVE', verificationAction: 'VALIDATE · CORRELATE · CHECK · DOCUMENT · RECOMMEND',
      verificationText: 'Across every capability area, the objective remains the same: create results that can be checked, explained and used.',
      verificationSignals: ['MODEL VALIDATION', 'SIMULATION–TEST CORRELATION', 'PLAUSIBILITY CHECKS', 'TECHNICAL DOCUMENTATION', 'DESIGN RECOMMENDATIONS', 'CROSS-FUNCTIONAL COMMUNICATION'],
    },
    projects: {
      label: 'PROJECT LAB', title: 'Proof of work beyond the job title.',
      text: 'Only completed work enters this lab. For now: one engineering-AI system and one private data-automation platform, each built end to end. More projects will appear only when their code, documentation and engineering story are ready.',
      open: 'OPEN CASE STUDY', curation: 'CURATION RULE // ACTIVE',
      note: 'Both projects are complete enough to explain, but they have different release boundaries. MachineGuard AI is public and deployed; the Finance Tracker case study is public while its source code, financial data and personalised configuration remain private.',
    },
    education: {
      label: 'ACADEMIC CORE', title: 'Mechanical engineering foundation. Computational depth.',
      text: 'A core mechanical engineering education followed by an interdisciplinary master\'s focused on finite-element analysis, multiphysics, numerical simulation and design optimisation.',
      grade: 'GRADE', continuous: 'CONTINUOUS LEARNING', learningTitle: 'The degree ended. The learning did not.',
    },
    resume: {
      label: 'DIGITAL RESUME', title: 'The direct professional view — inside the larger system.',
      text: 'A recruiter-ready summary of my profile, experience, education and technical capabilities, with the complete CV one click away.',
      location: 'LOCATION', email: 'EMAIL', status: 'STATUS', open: 'Open PDF CV', openGerman: 'Open German CV',
      dossier: 'DOSSIER // SV-CAREER-2026', revision: 'REVISION // 06.1', locked: 'STATUS // BILINGUAL CORE',
      careerDossier: 'CAREER DOSSIER', updated: 'LAST SYSTEM UPDATE // JULY 2026',
      profile: 'PROFILE', experience: 'EXPERIENCE', education: 'EDUCATION', technical: 'TECHNICAL SYSTEMS', certifications: 'CERTIFICATIONS', languages: 'LANGUAGES',
    },
    footer: {
      label: 'NEXT CONNECTION', title: "Let's engineer something meaningful.",
      focus: 'Mechanical development. CAE. Simulation automation. Data-driven engineering.',
      support: 'Open to engineering opportunities, technical collaborations and ambitious ideas worth developing.',
      button: 'Start a conversation', email: 'EMAIL', resume: 'DOWNLOAD RESUME', built: 'Designed & built by',
    },
    resumePage: {
      portfolio: 'Portfolio', open: 'Open PDF CV', overline: 'DIRECT ROUTE', dossier: 'PROFESSIONAL DOSSIER // CURRENT', title: 'Digital Resume.',
      intro: 'A focused recruiter view of my professional profile, career progression, education and technical systems—inside the broader Selva Engineering Lab.',
      contact: 'Contact me', profile: 'PROFILE // CURRENT', location: 'LOCATION // INGOLSTADT, DE', availability: 'AVAILABILITY // OPEN', return: 'Return to portfolio',
    },
  },
  de: {
    nav: ['Profil', 'Berufserfahrung', 'Kompetenzen', 'Projektlabor', 'Ausbildung', 'Lebenslauf'],
    menuOpen: 'Menü öffnen', menuClose: 'Menü schließen', primaryNavigation: 'Hauptnavigation',
    routeLabels: { home: 'Portfolio-Startseite', 'machineguard-ai': 'MachineGuard-AI-Projekt', 'finance-tracker': 'Finance-Tracker-Automation', resume: 'Digitaler Lebenslauf' },
    skipMain: 'Zum Hauptinhalt springen', skipResume: 'Zum Lebenslauf springen',
    language: 'Sprache', english: 'EN', german: 'DE',
    hero: {
      eyebrow: 'Professionelles System online',
      projectButton: 'Projektlabor entdecken', resumeButton: 'Digitalen Lebenslauf ansehen',
      experience: '03+ Jahre Berufserfahrung', scroll: 'WEITERSCROLLEN',
    },
    systemStrip: ['SYSTEMSTATUS: NOMINAL', 'PORTFOLIO BUILD: 06.1 // BILINGUALER KERN ONLINE', 'ERFAHRUNG: 03+ JAHRE', 'STANDORT: INGOLSTADT_DE', 'OFFEN FÜR NEUE AUFGABEN'],
    identity: {
      label: 'PROFIL', title: 'Maschinenbau als Fundament. Entwicklung und Simulation als Berufspraxis.',
      text: 'Ich arbeite an der Schnittstelle von mechanischer Entwicklung, CAE und Computational Engineering und überführe konstruktive Fragestellungen in Berechnungen, Simulationen und umsetzbare Verbesserungen.',
      career: 'Beruflichen Werdegang ansehen', pdf: 'Lebenslauf öffnen', name: 'NAME', role: 'ROLLE', base: 'STANDORT', focus: 'SCHWERPUNKT', method: 'METHODE',
      focusValue: 'ENTWICKLUNG · CAE · AUTOMATISIERUNG', methodValue: 'ENTWICKELN · SIMULIEREN · VALIDIEREN · VERBESSERN', loop: 'ENGINEERING-KREISLAUF', active: 'AKTIV / ITERATIV', status: 'PROFESSIONELLES SYSTEM ONLINE',
    },
    experience: {
      label: 'BERUFLICHER WERDEGANG', title: 'Von Forschungsmodellen zu hochpräzisen mechanischen Systemen.',
      text: 'Mein beruflicher Weg führt von simulationsnaher Forschung über industrielle Multiphysik und thermomechanische CAE bis zur multidisziplinären Produktentwicklung – mit CAD, FEM, Strukturdynamik, Validierung und Automatisierung.',
      activeRecord: 'AKTIVER EINTRAG', mission: 'ENGINEERING-AUFGABE', stageAdded: 'DIESE STATION ERWEITERTE',
      metrics: [['BERUFLICHE ENTWICKLUNG', 'FORSCHUNG → PRODUKTENTWICKLUNG'], ['ERFAHRUNGSFELDER', 'KONSTRUKTION · CAE · MULTIPHYSIK'], ['VERBINDENDE EBENE', 'VALIDIERUNG · DATEN · AUTOMATISIERUNG']],
    },
    expertise: {
      label: 'ENGINEERING-KOMPETENZEN', title: 'Von Geometrie und Lasten zu validierten technischen Entscheidungen.',
      text: 'Mein Engineering-Stack umfasst sechs miteinander verbundene Kompetenzfelder – von mechanischer Entwicklung und Simulation bis zu Automatisierung und datengetriebenen Methoden. Das gemeinsame Ziel: Systemverhalten verstehen, Konstruktionen verbessern und technische Zusammenhänge klar kommunizieren.',
      pipeline: ['GEOMETRIE', 'LASTEN & PHYSIK', 'MODELL & SOLVER', 'VALIDIERUNG', 'TECHNISCHE ENTSCHEIDUNG'],
      toolchain: 'TOOLCHAIN', verification: 'VALIDIERUNGSEBENE // AKTIV', verificationAction: 'VALIDIEREN · KORRELIEREN · PRÜFEN · DOKUMENTIEREN · EMPFEHLEN',
      verificationText: 'Über alle Kompetenzfelder hinweg gilt dasselbe Ziel: Ergebnisse erzeugen, die geprüft, erklärt und praktisch genutzt werden können.',
      verificationSignals: ['MODELLVALIDIERUNG', 'SIMULATION–VERSUCHS-KORRELATION', 'PLAUSIBILITÄTSPRÜFUNG', 'TECHNISCHE DOKUMENTATION', 'KONSTRUKTIVE EMPFEHLUNGEN', 'INTERDISZIPLINÄRE ABSTIMMUNG'],
    },
    projects: {
      label: 'PROJEKTLABOR', title: 'Nachweisbare Arbeit über die Stellenbezeichnung hinaus.',
      text: 'In dieses Labor kommen nur abgeschlossene und erklärbare Projekte. Aktuell: ein öffentliches Engineering-AI-System und eine private Automatisierungsplattform für lokale Finanzdaten.',
      open: 'FALLSTUDIE ÖFFNEN', curation: 'KURATIERUNGSREGEL // AKTIV',
      note: 'Beide Projekte sind technisch weit genug entwickelt, um ihre Architektur und Ergebnisse nachvollziehbar zu zeigen. MachineGuard AI ist öffentlich verfügbar; beim Finance Tracker ist die Fallstudie öffentlich, während Quellcode, Finanzdaten und persönliche Konfiguration privat bleiben.',
    },
    education: {
      label: 'AKADEMISCHE BASIS', title: 'Maschinenbauliches Fundament. Numerische und rechnergestützte Tiefe.',
      text: 'Ein grundständiges Maschinenbaustudium, ergänzt durch einen interdisziplinären Master mit Schwerpunkten in FEM, Multiphysik, numerischer Simulation und Designoptimierung.',
      grade: 'NOTE', continuous: 'KONTINUIERLICHES LERNEN', learningTitle: 'Der Abschluss war ein Meilenstein – nicht das Ende des Lernens.',
    },
    resume: {
      label: 'DIGITALER LEBENSLAUF', title: 'Der direkte professionelle Überblick – innerhalb des Gesamtsystems.',
      text: 'Eine kompakte, recruiterfreundliche Übersicht über Profil, Berufserfahrung, Ausbildung und technische Kompetenzen – mit dem vollständigen Lebenslauf direkt abrufbar.',
      location: 'STANDORT', email: 'E-MAIL', status: 'STATUS', open: 'Lebenslauf öffnen', openGerman: 'Deutschen Lebenslauf öffnen',
      dossier: 'DOSSIER // SV-KARRIERE-2026', revision: 'REVISION // 06.1', locked: 'STATUS // BILINGUALER KERN',
      careerDossier: 'KARRIERE-DOSSIER', updated: 'LETZTES SYSTEMUPDATE // JULI 2026',
      profile: 'PROFIL', experience: 'BERUFSERFAHRUNG', education: 'AUSBILDUNG', technical: 'TECHNISCHE SYSTEME', certifications: 'ZERTIFIKATE', languages: 'SPRACHEN',
    },
    footer: {
      label: 'KONTAKT', title: 'Lassen Sie uns etwas Sinnvolles entwickeln.',
      focus: 'Mechanische Entwicklung. CAE. Simulationsautomatisierung. Datengetriebenes Engineering.',
      support: 'Offen für neue Engineering-Aufgaben, technische Zusammenarbeit und anspruchsvolle Ideen mit Entwicklungspotenzial.',
      button: 'Kontakt aufnehmen', email: 'E-MAIL', resume: 'LEBENSLAUF HERUNTERLADEN', built: 'Konzipiert & umgesetzt von',
    },
    resumePage: {
      portfolio: 'Portfolio', open: 'Lebenslauf öffnen', overline: 'DIREKTER EINSTIEG', dossier: 'PROFESSIONELLES DOSSIER // AKTUELL', title: 'Digitaler Lebenslauf.',
      intro: 'Eine fokussierte Übersicht für Recruiter über mein Profil, meinen beruflichen Werdegang, meine Ausbildung und technischen Kompetenzen – innerhalb des Selva Engineering Lab.',
      contact: 'Kontakt aufnehmen', profile: 'PROFIL // AKTUELL', location: 'STANDORT // INGOLSTADT, DE', availability: 'VERFÜGBARKEIT // OFFEN', return: 'Zurück zum Portfolio',
    },
  },
} as const

export function usePortfolioContent() {
  const language = resolveLanguage()
  return {
    language,
    site: language === 'de' ? siteDe : siteEn,
    ui: ui[language],
  }
}

export function languageName(language: Language) {
  return language === 'de' ? 'Deutsch' : 'English'
}
