/* ============================================================
   Données du portfolio (bilingues FR/EN).
   Tout le contenu modifiable est ici : ajoute / édite librement.
   Noms de fichiers : voir assets/CONVENTION-NOMMAGE.md
   ============================================================ */

const DATA = {

  /* --- Valeurs (chips "À propos") --- */
  values: {
    fr: ["Rigueur", "Persévérance", "Excellence", "Respect", "Esprit analytique", "Communication", "Prévenir plutôt que guérir", "Regard critique", "Décomposer les problèmes", "Essayer avant de demander", "Qualité avant quantité", "Simplicité avant complexité", "Éviter la répétition inutile"],
    en: ["Rigor", "Perseverance", "Excellence", "Respect", "Analytical mindset", "Communication", "Prevention over cure", "Critical thinking", "Decomposing problems", "Trying before asking", "Quality over quantity", "Simplicity over complexity", "No useless repetition"]
  },

  /* --- Statistiques (À propos) --- */
  stats: [
    { value: 13, plus: true,  label: { fr: "Projets réalisés", en: "Projects built" } },
    { value: 4,  plus: false, label: { fr: "Stages en entreprise", en: "Company internships" } },
    { value: 3,  plus: true,  label: { fr: "Certifications", en: "Certifications" } },
    { value: 2021, raw: true, label: { fr: "Premier stage", en: "First internship" } }
  ],

  /* --- Formation (compétences théoriques) --- */
  formation: [
    {
      short: "BUT", year: "2024",
      title: { fr: "BUT Informatique - Université de Reims", en: "BUT Computer Science - University of Reims" },
      meta:  { fr: "2024 – 2027 · 3e année dès septembre 2026", en: "2024 – 2027 · Final year from September 2026" },
      desc:  { fr: "Conception, développement, données, réseaux et gestion de projet.", en: "Design, development, data, networks and project management." },
      file:  "assets/documents/certificate-but-notes.pdf",
      fileLabel: { fr: "Relevé de notes (1re année) ↓", en: "Academic transcript (year 1) ↓" }
    },
    {
      short: "Le Wagon", year: "2023",
      title: { fr: "Le Wagon - Concepteur Développeur Web", en: "Le Wagon - Web Development Bootcamp" },
      meta:  { fr: "2023 – 2024 · Paris", en: "2023 – 2024 · Paris" },
      desc:  { fr: "Formation intensive full-stack (Ruby on Rails, JavaScript).", en: "Intensive full-stack bootcamp (Ruby on Rails, JavaScript)." },
      file:  "assets/documents/certificate-le-wagon.pdf",
      fileLabel: { fr: "Voir l'attestation ↓", en: "View certificate ↓" }
    }
  ],

  /* --- Compétences pratiques (grille interactive) --- */
  competences: [
    { key: "dev",    title: { fr: "Développement d'applications", en: "Application development" }, desc: { fr: "Concevoir et réaliser des applications web complètes, du front au back.", en: "Design and build complete web apps, front to back." } },
    { key: "optim",  title: { fr: "Algorithmique & optimisation", en: "Algorithms & optimization" }, desc: { fr: "Structurer des algorithmes efficaces, fiables et lisibles.", en: "Build efficient, reliable, readable algorithms." } },
    { key: "sys",    title: { fr: "Systèmes & réseaux", en: "Systems & networks" }, desc: { fr: "Déployer et administrer environnements et infrastructures.", en: "Deploy and administer environments and infrastructure." } },
    { key: "data",   title: { fr: "Données & bases de données", en: "Data & databases" }, desc: { fr: "Modéliser, sécuriser et exploiter les données.", en: "Model, secure and leverage data." } },
    { key: "projet", title: { fr: "Gestion de projet & produit", en: "Project & product management" }, desc: { fr: "Cadrer le besoin, prioriser, piloter la valeur.", en: "Frame needs, prioritize, drive value." } },
    { key: "equipe", title: { fr: "Travail en équipe", en: "Teamwork" }, desc: { fr: "Collaborer efficacement en méthodologie agile.", en: "Collaborate effectively with agile methodology." } }
  ],

  /* --- Projets (le visuel attendu = assets/images/project-<id>.jpg) --- */
  projects: [
    {
      id: "sam", year: "2026", featured: true,
      role: { fr: "Conception produit & développement - Codilee", en: "Product design & development - Codilee" },
      title: "Sam",
      tagline: { fr: "Faire un don à une personne sans-abri en 1 scan.", en: "Donate to a homeless person in one scan." },
      desc: { fr: "Application web progressive (PWA) permettant de faire un don immédiat à une personne sans-abri via un QR code remis par une association. 100 % du don revient au bénéficiaire. Espaces dédiés par association, paiements Stripe Connect, sécurité multi-tenant.", en: "A progressive web app (PWA) enabling instant donations to a homeless person via a QR code provided by a partner charity. 100% goes to the beneficiary. Per-charity dashboards, Stripe Connect payments, multi-tenant security." },
      tech: ["Next.js", "TypeScript", "Supabase", "Stripe Connect", "Tailwind"],
      competences: ["dev", "data", "projet", "sys"],
      demo: "https://samapp.net/", image: "assets/images/project-sam.jpg"
    },
    {
      id: "spoffee", year: "2026", featured: true,
      role: { fr: "Conception produit & développement - Codilee", en: "Product design & development - Codilee" },
      title: "Spoffee",
      tagline: { fr: "Réservez votre coin de travail dans un café.", en: "Book your workspace in a café." },
      desc: { fr: "Marketplace mettant en relation des travailleurs nomades et des cafés proposant des espaces réservables en ligne. Carte interactive, réservation et paiement Stripe, tableau de bord pour les établissements.", en: "A marketplace connecting remote workers with cafés offering bookable workspaces. Interactive map, Stripe payments, owner dashboard." },
      tech: ["Next.js", "React", "TypeScript", "Supabase", "Stripe"],
      competences: ["dev", "data", "projet", "equipe"],
      demo: "https://www.spoffee.com/", image: "assets/images/project-spoffee.jpg"
    },
    {
      id: "creation-entreprise", year: "2026", featured: false,
      role: { fr: "Projet personnel · Étude entrepreneuriale", en: "Personal project · Entrepreneurial study" },
      title: { fr: "Création d'entreprise", en: "Company-creation study" },
      tagline: { fr: "Concevoir une plateforme de mise en relation investisseurs / porteurs de projet.", en: "Designing a platform connecting investors with project creators." },
      desc: { fr: "Étude complète de création d'entreprise : recherche de l'idée, sélection du projet, analyse des avantages et des risques, et modèle économique d'une plateforme d'investissement reliant investisseurs et porteurs de projet. Une démarche d'analyse produit et de cadrage du besoin.", en: "A full company-creation study: idea generation, project selection, risk/benefit analysis and the business model of an investment platform connecting investors with project owners. A product-analysis and needs-framing approach." },
      tech: ["Étude de marché", "Business model", "Analyse produit"],
      competences: ["projet"],
      image: "assets/images/project-creation-entreprise.jpg",
      docs: [{ label: { fr: "Étude complète", en: "Full study" }, file: "assets/documents/doc-creation-entreprise.pdf" }]
    },
    {
      id: "geevent", year: "2025", featured: false,
      role: { fr: "Projet d'équipe (5) · BUT Informatique", en: "Team project (5) · CS degree" },
      title: "Ge'Event",
      tagline: { fr: "Concevoir une application de gestion d'événements en méthodologie SCRUM.", en: "Designing an event-management app with the SCRUM methodology." },
      desc: { fr: "Projet de Management des SI mené à cinq en SCRUM : rédaction du cahier des charges, diagramme de cas d'utilisation, charte graphique et maquette Figma, puis développement par sprints. Contribution au cadrage fonctionnel et au suivi agile.", en: "An IS-management project carried out by a team of five using SCRUM: specifications, use-case diagram, graphic charter and Figma mockup, then sprint-based development. Contributed to functional framing and agile follow-up." },
      tech: ["SCRUM", "UML", "Figma", "Cahier des charges"],
      competences: ["projet", "equipe", "dev"],
      image: "assets/images/project-geevent.jpg",
      docs: [
        { label: { fr: "Cahier des charges", en: "Specifications" }, file: "assets/documents/doc-geevent-cahier-des-charges.pdf" },
        { label: { fr: "Rapport SCRUM", en: "SCRUM report" }, file: "assets/documents/doc-geevent-scrum.pdf" }
      ]
    },
    {
      id: "bases-de-donnees", year: "2025", featured: false,
      role: { fr: "Projets · BUT Informatique", en: "Projects · CS degree" },
      title: { fr: "Conception de bases de données", en: "Database design" },
      tagline: { fr: "Modéliser et exploiter des bases de données, du MCD aux requêtes SQL.", en: "Modeling and querying databases, from the conceptual model to SQL." },
      desc: { fr: "Deux projets de bases de données : conception complète (analyse, modèle entité-association, modèle relationnel, création et alimentation des tables) pour la gestion d'un club de voile, puis exploitation et analyse statistique d'une base de données de supermarché.", en: "Two database projects: full design (analysis, entity-relationship model, relational model, table creation and population) for a sailing-club management system, then querying and statistical analysis of a supermarket database." },
      tech: ["MySQL", "SQL", "MCD / MLD", "Statistiques"],
      competences: ["data", "optim"],
      image: "assets/images/project-bases-de-donnees.jpg",
      docs: [
        { label: { fr: "BD · Club de voile", en: "DB · Sailing club" }, file: "assets/documents/doc-bd-club-voile.pdf" },
        { label: { fr: "BD · Supermarché", en: "DB · Supermarket" }, file: "assets/documents/doc-bd-supermarche.pdf" }
      ]
    },
    {
      id: "graphes", year: "2025", featured: false,
      role: { fr: "Projet (binôme) · BUT Informatique", en: "Pair project · CS degree" },
      title: { fr: "Théorie des graphes", en: "Graph theory" },
      tagline: { fr: "Résoudre un problème de planning par la coloration de graphes.", en: "Solving a scheduling problem with graph coloring." },
      desc: { fr: "Application de la théorie des graphes à un problème concret de planification : construction du graphe adjoint, algorithme de Welsh-Powell, coloration et déduction d'un planning optimal de passage devant les jurys.", en: "Applying graph theory to a real scheduling problem: building the line graph, the Welsh-Powell algorithm, coloring and deriving an optimal jury-scheduling plan." },
      tech: ["Théorie des graphes", "Welsh-Powell", "Algorithmique"],
      competences: ["optim"],
      image: "assets/images/project-graphes.jpg",
      docs: [{ label: { fr: "Rapport", en: "Report" }, file: "assets/documents/doc-graphes.pdf" }]
    },
    {
      id: "travail-equipe", year: "2025", featured: false,
      role: { fr: "Projet d'équipe (3) · BUT Informatique", en: "Team project (3) · CS degree" },
      title: { fr: "Travail en équipe", en: "Teamwork" },
      tagline: { fr: "Organiser, planifier et capitaliser le travail d'une équipe projet.", en: "Organizing, planning and capitalizing a project team's work." },
      desc: { fr: "Analyse réflexive de l'organisation d'une équipe sur le projet CultureJam (réseau social culturel inspiré de BeReal) : répartition des tâches, planning prévisionnel vs réalisé, points forts et points faibles, et capitalisation d'expérience.", en: "A reflective analysis of a team's organization on the CultureJam project (a culture-focused social network inspired by BeReal): task allocation, planned vs actual schedule, strengths and weaknesses, and lessons learned." },
      tech: ["Méthodologie agile", "Planning", "Rétrospective"],
      competences: ["equipe", "projet"],
      image: "assets/images/project-travail-equipe.jpg",
      docs: [{ label: { fr: "Rapport", en: "Report" }, file: "assets/documents/doc-travail-equipe.pdf" }]
    },
    {
      id: "culture-jam", year: "2024", featured: false,
      role: { fr: "Projet d'équipe - Le Wagon", en: "Team project - Le Wagon" },
      title: "Culture Jam",
      tagline: { fr: "Un réseau social pour nourrir sa curiosité culturelle.", en: "A social network to feed cultural curiosity." },
      desc: { fr: "Réseau social encourageant le partage d'activités culturelles, en réaction au contenu superficiel des réseaux traditionnels. Contenu instructif et personnalisé.", en: "A social network encouraging the sharing of cultural activities, reacting to the superficial content of mainstream networks. Educational, personalized content." },
      tech: ["Ruby on Rails", "JavaScript", "PostgreSQL"],
      competences: ["dev", "equipe", "projet"],
      github: "https://github.com/AntoineBarthelemy/Culture-Jam-School", image: "assets/images/project-culture-jam.jpg"
    },
    {
      id: "unbelievably", year: "2024", featured: false,
      role: { fr: "Projet d'équipe (4) - Le Wagon", en: "Team project (4) - Le Wagon" },
      title: "Unbelievably",
      tagline: { fr: "Un Airbnb d'activités imaginaires et fantastiques.", en: "An Airbnb of imaginary, fantastical activities." },
      desc: { fr: "Application inspirée d'Airbnb proposant des activités fantastiques. Réalisée à quatre en méthodologie agile.", en: "An Airbnb-inspired web app offering fantastical activities. Built by a team of four using agile methodology." },
      tech: ["Ruby on Rails", "Stimulus", "Bootstrap", "Git"],
      competences: ["dev", "equipe", "projet"],
      github: "https://github.com/AntoineBarthelemy/Unbelievably-School", image: "assets/images/project-unbelievably.jpg"
    },
    {
      id: "poste-dev", year: "2024", featured: false,
      role: { fr: "Projet d'équipe (3) · BUT Informatique", en: "Team project (3) · CS degree" },
      title: { fr: "Poste de développement", en: "Developer workstation" },
      tagline: { fr: "Comparer, choisir et installer un système d'exploitation pour le développement.", en: "Comparing, choosing and installing an OS for development." },
      desc: { fr: "Analyse comparative des systèmes d'exploitation du marché, choix argumenté, puis installation et configuration complète d'un poste de développement, avec schéma de l'architecture logicielle.", en: "Comparative analysis of available operating systems, a reasoned choice, then full installation and configuration of a developer workstation, with a software-architecture diagram." },
      tech: ["Linux", "Windows", "Virtualisation"],
      competences: ["sys"],
      image: "assets/images/project-poste-dev.jpg",
      docs: [{ label: { fr: "Rapport", en: "Report" }, file: "assets/documents/doc-poste-dev.pdf" }]
    },
    {
      id: "gpt-youtube", year: "2023", featured: false,
      role: { fr: "Projet personnel - HK-Tech", en: "Personal project - HK-Tech" },
      title: { fr: "GPT × YouTube", en: "GPT × YouTube" },
      tagline: { fr: "Résumer une vidéo YouTube via une simple URL.", en: "Summarize a YouTube video from a single URL." },
      desc: { fr: "Application connectée à l'API OpenAI : transcription audio (Whisper) puis traitement par GPT-3.5 Turbo à partir d'une URL et de prompts utilisateur. Idée anticipée avant la sortie officielle de la fonctionnalité.", en: "An app connected to the OpenAI API: audio transcription (Whisper) then GPT-3.5 Turbo processing from a URL and user prompts. Anticipated before the feature's official release." },
      tech: ["Python", "OpenAI API", "Whisper", "HTML", "JavaScript"],
      competences: ["dev", "optim"],
      github: "https://github.com/AntoineBarthelemy/Html-Css-Js-Python-ChatGPT-Youtube", image: "assets/images/project-gpt-youtube.jpg"
    },
    {
      id: "zcasino", year: "2023", featured: false,
      role: { fr: "Projet personnel", en: "Personal project" },
      title: "ZCasino",
      tagline: { fr: "Le jeu de la roulette en Python.", en: "The roulette game in Python." },
      desc: { fr: "Reproduction du jeu de la roulette en console (POO, exceptions, boucles, modularité), inspirée du livre de Vincent Le Goff.", en: "A console reproduction of roulette (OOP, exceptions, loops, modularity), inspired by Vincent Le Goff's book." },
      tech: ["Python", "POO"],
      competences: ["optim", "dev"],
      github: "https://github.com/AntoineBarthelemy/Python-ZCasino", image: "assets/images/project-zcasino.jpg"
    },
    {
      id: "infra-reseau", year: "2021", featured: false,
      role: { fr: "Stage réseau - Koesio", en: "Network internship - Koesio" },
      title: { fr: "Infrastructure réseau", en: "Network infrastructure" },
      tagline: { fr: "Mettre en place une infrastructure serveur.", en: "Building a server infrastructure." },
      desc: { fr: "Serveur sous Hyper-V, Active Directory (unités d'organisation, stratégies de groupe), configuration NAS et RAID. Découverte concrète des systèmes communicants.", en: "Hyper-V server, Active Directory (OUs, group policies), NAS and RAID configuration. Hands-on introduction to communicating systems." },
      tech: ["Hyper-V", "Active Directory", "NAS", "RAID"],
      competences: ["sys", "data"],
      github: "", demo: "", image: "assets/images/project-infra-reseau.jpg"
    }
  ],

  /* --- Stages (parcours, affichés sur le globe par ville) ---
     rapport attendu = assets/documents/report-<entreprise>.pdf
     lat/lng = coordonnées de la ville (pour le globe) --- */
  stages: [
    {
      period: { fr: "Avr. – Juin 2026", en: "Apr – Jun 2026" },
      title: { fr: "Software Programmer", en: "Software Programmer" },
      org: { fr: "Codilee · Paris", en: "Codilee · Paris" },
      desc: { fr: "Conception et développement d'applications web (Sam & Spoffee) : Next.js, TypeScript, Supabase, Stripe. Approche produit de bout en bout.", en: "Design and development of web apps (Sam & Spoffee): Next.js, TypeScript, Supabase, Stripe. End-to-end product approach." },
      report: "assets/documents/report-codilee.pdf",
      city: "Paris", lat: 48.8566, lng: 2.3522
    },
    {
      period: { fr: "Fév. – Avr. 2023", en: "Feb – Apr 2023" },
      title: { fr: "Web Designer", en: "Web Designer" },
      org: { fr: "Mainnevret Malblanc Avocats · Reims", en: "Mainnevret Malblanc Law Firm · Reims" },
      desc: { fr: "Modernisation du site web (WordPress) et conception d'une carte à destination des collectivités (Photoshop).", en: "Website modernization (WordPress) and design of a map for local authorities (Photoshop)." },
      city: "Reims", lat: 49.2583, lng: 4.0317
    },
    {
      period: { fr: "Sep. – Déc. 2022", en: "Sep – Dec 2022" },
      title: { fr: "Développeur front-end", en: "Front-end Developer" },
      org: { fr: "HK-Tech · Reims", en: "HK-Tech · Reims" },
      desc: { fr: "Bases du développement front-end (HTML, CSS, JavaScript, Bootstrap), application météo (API OpenWeatherMap) et projet IA connecté à GPT.", en: "Front-end fundamentals (HTML, CSS, JavaScript, Bootstrap), a weather app (OpenWeatherMap API) and a GPT-connected AI project." },
      report: "assets/documents/report-hktech.pdf",
      city: "Reims", lat: 49.2583, lng: 4.0317
    },
    {
      period: { fr: "Nov. 2021 – Jan. 2022", en: "Nov 2021 – Jan 2022" },
      title: { fr: "Stagiaire réseau", en: "Network Intern" },
      org: { fr: "Koesio · Reims", en: "Koesio · Reims" },
      desc: { fr: "Mise en place d'une infrastructure serveur : Hyper-V, Active Directory, NAS, RAID. Première immersion dans les systèmes & réseaux.", en: "Setting up a server infrastructure: Hyper-V, Active Directory, NAS, RAID. First immersion in systems & networks." },
      report: "assets/documents/report-koesio.pdf",
      city: "Reims", lat: 49.2583, lng: 4.0317
    }
  ],

  /* --- Objectif international (marqueur "but" sur le globe) --- */
  goal: {
    city: "New York",
    lat: 40.7128, lng: -74.0060,
    title: { fr: "Objectif : travailler aux États-Unis", en: "Goal: working in the United States" },
    desc: { fr: "Après mon diplôme, je souhaite travailler un an dans la tech aux États-Unis : découvrir d'autres méthodes, d'autres équipes et d'autres façons de penser, avant de poursuivre en école d'ingénieur. L'international, c'est ma façon de grandir.", en: "After graduating, I want to spend a year working in tech in the United States: discovering other methods, other teams and other ways of thinking, before continuing at an engineering school. Going international is how I grow." }
  },

  /* --- Certifications --- */
  certifications: [
    { name: { fr: "IELTS (Anglais)", en: "IELTS (English)" }, org: "IELTS Official", year: { fr: "2024 · valide jusqu'en 2026", en: "2024 · valid until 2026" }, file: "assets/documents/certificate-ielts.pdf" },
    { name: { fr: "Bootcamp Développement Web", en: "Web Development Bootcamp" }, org: "Le Wagon", year: { fr: "2024", en: "2024" }, file: "assets/documents/certificate-le-wagon.pdf" },
    { name: { fr: "Permis B", en: "Driving licence (B)" }, org: "Auto-école Abel", year: { fr: "2023", en: "2023" } }
  ],

  /* --- Recommandations --- */
  recommendations: [
    {
      initials: "JS",
      name: "Jatin Singh",
      role: { fr: "Software Engineer - Codilee", en: "Software Engineer - Codilee" },
      relation: { fr: "A travaillé avec moi · Juin 2026", en: "Worked with me · June 2026" },
      quote: {
        fr: "J'ai eu le plaisir de travailler avec Antoine chez Codilee, et c'est le type de collègue que l'on espère avoir dans son équipe. Il est agréable et facile à collaborer, travailleur, et remarquablement compétent dans le domaine des technologies. Ce qui le distingue avant tout, c'est sa curiosité : il explore sans cesse de nouveaux outils et de nouvelles idées, et cette énergie tire vers le haut tout son entourage.",
        en: "I had the pleasure of working with Antoine at Codilee, and he's the kind of colleague you hope to have on your team. He's pleasant and easy to collaborate with, hardworking, and remarkably skilled with technology. What sets him apart above all is his curiosity: he constantly explores new tools and ideas, and that energy lifts everyone around him."
      }
    },
    {
      initials: "HS",
      name: "Hassan Serhan",
      role: { fr: "DevOps Engineer · Finaliste Master Dev France", en: "DevOps Engineer · Master Dev France Finalist" },
      relation: { fr: "M'a encadré · Stage HK-Tech · Nov. 2023", en: "Managed me · HK-Tech internship · Nov. 2023" },
      quote: {
        fr: "J'ai eu le plaisir de travailler avec Antoine lors de son stage en développement, où il a démontré un engagement et une passion remarquables pour l'apprentissage des technologies web (HTML, CSS, JavaScript, Bootstrap). Il a acquis des compétences techniques solides tout en montrant une grande capacité d'adaptation et un esprit d'équipe exceptionnel. Je le recommande vivement à tout employeur : son avenir dans la tech est prometteur.",
        en: "I had the pleasure of working with Antoine during his development internship, where he showed remarkable commitment and passion for learning web technologies (HTML, CSS, JavaScript, Bootstrap). He gained solid technical skills while demonstrating great adaptability and exceptional team spirit. I highly recommend him to any employer: his future in tech is promising."
      }
    }
  ],

  /* --- Langues --- */
  languages: [
    { name: { fr: "🇬🇧 Anglais", en: "🇬🇧 English" }, level: { fr: "Professionnel · IELTS", en: "Professional · IELTS" }, value: 75, desc: { fr: "Communication professionnelle et technique. Certifié IELTS.", en: "Professional and technical communication. IELTS certified." } },
    { name: { fr: "🇫🇷 Français", en: "🇫🇷 French" }, level: { fr: "Langue maternelle", en: "Native" }, value: 100, desc: { fr: "Maîtrise complète à l'écrit comme à l'oral.", en: "Full written and spoken proficiency." } }
  ]
};
