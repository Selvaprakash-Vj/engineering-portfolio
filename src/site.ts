export type Experience = {
  company: string
  short: string
  chapter: string
  role: string
  location: string
  period: string
  mission: string
  summary: string
  bullets: string[]
  tools: string[]
  progression: string
}

export type Expertise = {
  code: string
  title: string
  subtitle: string
  description: string
  capabilities: string[]
  signal: string
  tools: string[]
}

export type Project = {
  number: string
  title: string
  category: string
  description: string
  stack: string[]
  metric: string
  metricLabel: string
  status: 'COMPLETE' | 'PRIVATE' | 'MILESTONE'
  accent: 'cyan' | 'orange'
  release: string
  route: 'machineguard-ai' | 'threadrom' | 'finance-tracker'
}

export const site = {
  name: 'Selvaprakash Vijayaraman',
  publicUrl: 'https://selvaprakash-vj.github.io/engineering-portfolio/',
  shortName: 'Selva',
  role: 'Mechanical Development & Simulation Engineer',
  location: 'Ingolstadt, Germany',
  availability: 'Open to engineering opportunities',
  headline: [
    'Mechanical Development Engineer.',
    'CAE & Simulation Specialist.',
    'Engineering Automation & AI Builder.',
  ],
  intro:
    'Designing mechanical systems, validating their behaviour and building the workflows that make engineering clearer and more repeatable.',
  heroFocus: ['MECHANICAL DEVELOPMENT', 'CAE / FEM', 'SIMULATION AUTOMATION'],
  resumeProfile: [
    'Development and simulation engineer with more than three years of experience in FEM-based assessment, optimisation and validation of complex mechanical assemblies.',
    'My work connects technical requirements, CAD-oriented development, nonlinear structural and thermomechanical simulation, model validation and practical design improvement.',
  ],
  email: 'v.selvaprakash07@gmail.com',
  github: 'https://github.com/Selvaprakash-Vj',
  linkedin: 'https://www.linkedin.com/in/selvaprakash-vijay',
  resume: 'Selvaprakash_Vijayaraman_Resume.pdf',
  disciplines: [
    'FINITE ELEMENT ENGINEERING',
    'MECHANICAL DESIGN & DEVELOPMENT',
    'SIMULATION AUTOMATION',
    'ENGINEERING AI & MACHINE LEARNING',
  ],
  profile: [
    'I am a mechanical development and simulation engineer with more than three years of professional experience working on complex components and assemblies.',
    'My work has included mechanical design support, CAD-related development, structural and thermomechanical simulation, dynamic-system analysis, tolerance evaluation and technical documentation.',
    'I enjoy the part of engineering where design, calculation and simulation come together—understanding how a system behaves, finding what needs to improve and translating the results into a practical engineering decision.',
    'Outside my professional work, I build independent FEM, automation and machine-learning projects to deepen my skills and explore better ways of carrying out engineering analysis.',
  ],
  principles: [
    ['01', 'Get the physics right first', 'Before looking at stresses and deformations, I make sure the loads, constraints, contacts and assumptions represent the real problem.'],
    ['02', 'Results should lead somewhere', 'A simulation is useful only when the results can be explained, checked and used to make a better engineering decision.'],
    ['03', 'Automate the repetitive work', 'I use scripts and structured workflows to reduce repetitive tasks, while keeping engineering judgement with the engineer.'],
  ],
  experiences: [
    {
      company: 'Bertrandt Ingenieurbüro',
      short: 'HIGH-PRECISION',
      chapter: 'HIGH-PRECISION MECHANICAL DEVELOPMENT',
      role: 'Design & Development Engineer',
      location: 'Ingolstadt, Germany',
      period: '07/2023 — PRESENT',
      mission: 'High-precision mechanical development and simulation',
      summary:
        'I work on complex mechanical assemblies where geometry, interfaces, stiffness, thermal behaviour and vibration performance must be understood together.',
      bullets: [
        'Develop and assess mechanical components and assemblies using CAD-oriented engineering and finite-element analysis.',
        'Build nonlinear FE models with contact, prestress, geometric nonlinearity and stress stiffening for realistic system representation.',
        'Evaluate static behaviour, thermomechanical loading, natural frequencies, vibration response and interface sensitivity.',
        'Correlate numerical models with test results, refine modelling assumptions and translate findings into design improvements.',
        'Coordinate technical analysis topics with specialist teams and support repeatable post-processing with Python and MATLAB.',
      ],
      tools: ['ANSYS Workbench', 'APDL', 'Creo', 'Python', 'MATLAB', 'MKS-related simulation'],
      progression: 'From performing analyses to supporting multidisciplinary product decisions.',
    },
    {
      company: 'Refratechnik Steel GmbH',
      short: 'THERMOMECHANICAL',
      chapter: 'THERMOMECHANICAL CAE',
      role: 'CAE Engineer',
      location: 'Düsseldorf, Germany',
      period: '05/2022 — 04/2023',
      mission: 'Industrial thermomechanical simulation and design support',
      summary:
        'I applied simulation directly to high-temperature industrial systems, connecting thermal loading, structural response, material behaviour and practical design requirements.',
      bullets: [
        'Simulated temperature distribution, deformation and mechanical loading in thermally loaded components and assemblies.',
        'Created and parameterised ANSYS models with material data, realistic load cases and engineering boundary conditions.',
        'Derived recommendations for material selection, component optimisation and thermal durability from numerical results.',
        'Supported aluminium-melting-furnace development with SolidWorks, refractory calculations and technical drawings.',
        'Established a structured CAE workflow and coordinated simulation work with design and construction stakeholders.',
      ],
      tools: ['ANSYS Workbench', 'Thermomechanics', 'SolidWorks', 'Refractory calculations', 'Technical drawings'],
      progression: 'From building individual models to creating an industrial simulation workflow.',
    },
    {
      company: 'Salzgitter Mannesmann Forschung',
      short: 'MULTIPHYSICS',
      chapter: 'INDUSTRIAL MULTIPHYSICS RESEARCH',
      role: 'Research Intern',
      location: 'Salzgitter, Germany',
      period: '04/2020 — 03/2021',
      mission: 'Numerical development and validation of industrial machinery',
      summary:
        'I worked on the design and numerical validation of a heat-treatment zone for specialised industrial machinery, combining geometry preparation, multiphysics modelling and structural verification.',
      bullets: [
        'Designed and developed a heat-treatment-zone concept incorporating compensators for specialised machinery.',
        'Prepared geometry using CATIA and SpaceClaim and built FE models with HyperMesh and ANSYS.',
        'Conducted static and transient analyses for stiffness, durability and operational vibration behaviour.',
        'Performed strength checks for bolts and weld seams and identified critical stress and deformation regions.',
        'Documented simulation results and proposed practical optimisation measures for performance and reliability.',
      ],
      tools: ['ANSYS', 'HyperMesh', 'CATIA V5', 'SpaceClaim', 'Multiphysics', 'Structural verification'],
      progression: 'From academic numerical methods to complete industrial component validation.',
    },
    {
      company: 'TU Braunschweig & Open Hybrid LabFactory',
      short: 'FOUNDATIONS',
      chapter: 'RESEARCH FOUNDATIONS',
      role: 'Student Research Assistant & Research Intern',
      location: 'Braunschweig / Wolfsburg, Germany',
      period: '04/2019 — 03/2020',
      mission: 'Model correlation, engineering data and simulation preparation',
      summary:
        'My professional foundation began with automotive and composite structures, where I learned to connect geometry, loads, experiments, data and finite-element models.',
      bullets: [
        'Modelled automotive and commercial-vehicle components and supported static and dynamic structural calculations.',
        'Performed defeaturing, meshing, load definition and boundary-condition setup for finite-element models.',
        'Calibrated simulation models using experimental data and refined assumptions through simulation-test correlation.',
        'Applied machine-learning and multivariate statistical methods to reduce complex load spectra.',
        'Developed MATLAB workflows to transform engineering load data for Abaqus-based structural analysis.',
      ],
      tools: ['MATLAB', 'Abaqus', 'Creo', 'CATIA V5', 'AutoCAD', 'Model correlation'],
      progression: 'An early understanding that simulation, experiments and data belong in the same engineering loop.',
    },
  ] satisfies Experience[],
  expertise: [
    {
      code: 'STR',
      title: 'Structural & Nonlinear FEM',
      subtitle: 'Understanding how components carry load, deform and fail.',
      description: 'Structural assessment of mechanical components and assemblies under realistic loads, interfaces and operating conditions—from model setup to result interpretation and design improvement.',
      capabilities: ['Static structural analysis', 'Contact and nonlinear modelling', 'Prestress and geometric nonlinearity', 'Stress, deformation and stiffness assessment', 'Mesh strategy and convergence checks', 'Strength evaluation of components, bolts and welds'],
      signal: 'CORE ANALYSIS',
      tools: ['ANSYS Workbench', 'APDL', 'HyperMesh', 'Abaqus'],
    },
    {
      code: 'THM',
      title: 'Thermal & Thermomechanical Simulation',
      subtitle: 'When temperature changes the mechanical behaviour.',
      description: 'Thermal and thermomechanical modelling of components and industrial systems where temperature distribution, material response, deformation and structural loading interact.',
      capabilities: ['Steady-state and transient thermal analysis', 'Thermomechanical coupling', 'Temperature-dependent material behaviour', 'Thermal deformation and stress evaluation', 'High-temperature component assessment', 'Process-oriented multiphysics modelling'],
      signal: 'COUPLED PHYSICS',
      tools: ['ANSYS Workbench', 'ANSYS APDL', 'HyperMesh', 'SpaceClaim'],
    },
    {
      code: 'DEV',
      title: 'Mechanical Design & Development',
      subtitle: 'Connecting requirements, geometry and physical behaviour.',
      description: 'Mechanical development that combines CAD geometry, component interfaces, tolerances, simulation results and manufacturability to produce practical design improvements.',
      capabilities: ['3D mechanical component development', 'CAD-oriented engineering assessment', 'Tolerance-chain analysis', 'Assembly and interface evaluation', 'Technical drawings and documentation', 'Design optimisation and manufacturability'],
      signal: 'DESIGN LOOP',
      tools: ['Creo', 'CATIA V5', 'SolidWorks', 'SpaceClaim', 'AutoCAD'],
    },
    {
      code: 'DYN',
      title: 'Structural Dynamics & System Simulation',
      subtitle: 'Mechanical systems do not remain still.',
      description: 'Evaluation of frequencies, vibration behaviour, interfaces and dynamic response where stiffness, mass distribution, contacts and operating conditions influence system performance.',
      capabilities: ['Modal analysis', 'Harmonic response assessment', 'Natural-frequency evaluation', 'Vibration and resonance assessment', 'Dynamic-system and MKS-related simulation', 'Simulation-test correlation'],
      signal: 'DYNAMIC RESPONSE',
      tools: ['ANSYS Workbench', 'APDL', 'Creo Simulate', 'MATLAB'],
    },
    {
      code: 'AUT',
      title: 'Simulation Automation',
      subtitle: 'Repetitive analysis should become a reusable workflow.',
      description: 'Python, MATLAB and APDL workflows that reduce manual repetition, support consistent model evaluation and make engineering analysis easier to reproduce and extend.',
      capabilities: ['Automated result extraction', 'Pre- and post-processing workflows', 'Parametric model evaluation', 'Batch analysis and data handling', 'Reusable calculation tools', 'Report-ready result processing'],
      signal: 'WORKFLOW ENGINE',
      tools: ['Python', 'MATLAB', 'ANSYS APDL', 'Excel'],
    },
    {
      code: 'AIM',
      title: 'Data-Driven Engineering & Machine Learning',
      subtitle: 'Using engineering data to recognise patterns and support prediction.',
      description: 'Machine-learning and statistical methods applied to engineering data, simulation preparation, condition assessment and predictive workflows.',
      capabilities: ['Engineering-data preprocessing', 'Feature engineering and dimensional reduction', 'Multivariate statistical analysis', 'Predictive modelling', 'Time-series and LSTM workflows', 'Model training and validation'],
      signal: 'ENGINEERING INTELLIGENCE',
      tools: ['Python', 'MATLAB', 'Machine Learning', 'Deep Learning'],
    },
  ] satisfies Expertise[],
  projects: [
    {
      number: 'P.01',
      title: 'MachineGuard AI',
      category: 'PREDICTIVE MAINTENANCE',
      description: 'An end-to-end predictive-maintenance case study for NASA C-MAPSS turbofan engines that estimates Remaining Useful Life, evaluates how trustworthy the result is and presents the evidence in a form an engineer can review.',
      stack: ['Python', 'GRU', 'LSTM', 'Uncertainty', 'Explainability'],
      metric: '13.58',
      metricLabel: 'GRU RMSE · FD001',
      status: 'COMPLETE',
      accent: 'cyan',
      release: 'v1.0.0 · LIVE DASHBOARD · PUBLIC REPOSITORY',
      route: 'machineguard-ai',
    },
    {
      number: 'P.02',
      title: 'ThreadROM',
      category: 'THREADED-FASTENER FEM & ROM',
      description: 'Phase 1 establishes a reproducible M10×1.5 full-helical fastener simulation baseline: generated geometry, controlled mesh levels, CalculiX transfer, axial-response verification, equilibrium checks and convergence evidence. Nonlinear pretension and reduced-order modelling remain outside this release.',
      stack: ['Python', 'Gmsh', 'CalculiX', 'FEM', 'Validation'],
      metric: '0.56%',
      metricLabel: 'COARSE ↔ MEDIUM STIFFNESS DIFFERENCE',
      status: 'MILESTONE',
      accent: 'cyan',
      release: 'PHASE 1 COMPLETE · FOUNDATION BASELINE',
      route: 'threadrom',
    },
    {
      number: 'P.03',
      title: 'Finance Tracker Automation',
      category: 'LOCAL DATA ENGINEERING',
      description: 'A private, local-first financial data pipeline that converts monthly statements into canonical transaction data, preserves human annotations, applies machine learning only to genuinely blank rows and publishes validated monthly outputs.',
      stack: ['Python', 'ETL', 'Machine Learning', 'Validation'],
      metric: '03',
      metricLabel: 'AUTOMATED PHASES',
      status: 'PRIVATE',
      accent: 'orange',
      release: 'PRIVATE SYSTEM · CASE STUDY ONLINE',
      route: 'finance-tracker',
    },
  ] satisfies Project[],
  education: [
    {
      degree: 'M.Sc. Computational Sciences in Engineering',
      institution: 'Technische Universität Braunschweig',
      location: 'Braunschweig, Germany',
      period: '10/2017 — 05/2021',
      grade: '2.0',
      focus: ['Finite Element Analysis', 'Multiphysics Simulation', 'CFD & Numerical Methods', 'Topology Optimisation'],
      thesisLabel: 'MASTER THESIS',
      thesis: 'Multiphysics numerical simulation and design optimisation of a heat-treatment zone.',
    },
    {
      degree: 'B.E. Mechanical Engineering',
      institution: 'Anna University',
      location: 'Chennai, India',
      period: '08/2012 — 04/2016',
      grade: '1.7 equivalent',
      focus: ['Mechanical Design', 'Machine Dynamics', 'Automotive Engineering', 'Engineering Mechanics'],
      thesisLabel: 'BACHELOR THESIS',
      thesis: 'Design and fabrication of an automated thread-cutting machine.',
    },
  ],
  certifications: [
    {
      title: 'Machine Learning — Coursera',
      detail: 'Python-based machine-learning methods and model evaluation',
      state: 'CERTIFIED',
    },
    {
      title: 'Deep Learning — Coursera',
      detail: 'Neural-network and deep-learning workflows with Python',
      state: 'CERTIFIED',
    },
    {
      title: 'EASA A3 Drone Licence',
      detail: 'European open-category remote-pilot competency',
      state: 'LICENSED',
    },
    {
      title: 'German Language — DSH-1',
      detail: 'TU Braunschweig academic qualification with B2 university coursework',
      state: 'QUALIFIED',
    },
  ],
  toolGroups: [
    ['SIMULATION & CAE', 'ANSYS Workbench · APDL · HyperMesh / HyperWorks · Creo Simulate · Abaqus (basic) · Nastran · ANSA · LS-DYNA'],
    ['CAD & GEOMETRY', 'Creo · CATIA V5 · SolidWorks · SpaceClaim · AutoCAD'],
    ['PROGRAMMING', 'Python · MATLAB · APDL · C++ · Octave'],
    ['METHODS', 'Structural & nonlinear FEM · Thermal / thermomechanical · Modal / harmonic · MKS / system simulation · Model validation · Topology optimisation · Machine learning'],
  ],
  languages: [
    ['GERMAN', 'B2/C1 · Professional working proficiency'],
    ['ENGLISH', 'Fluent'],
    ['TAMIL', 'Native'],
    ['JAPANESE', 'Basic'],
  ],
} as const
