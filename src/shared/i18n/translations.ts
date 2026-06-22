// ---------------------------------------------------------------------------
// i18n dictionaries — UI chrome only (navbar, section titles/subtitles,
// buttons, footer). Content prose lives in portfolioData and is NOT translated
// here. Spanish ('es') is the default language.
// ---------------------------------------------------------------------------

export type Language = 'es' | 'en';

export const DEFAULT_LANGUAGE: Language = 'es';

/** Shape of a single language's UI strings. Both dictionaries must satisfy it. */
export interface Translations {
  nav: {
    about: string;
    skills: string;
    work: string;
    projects: string;
    education: string;
    contact: string;
    contactAria: string;
  };
  language: {
    label: string;
  };
  hero: {
    available: string;
    greeting: string;
    role: string;
    runProfile: string;
    viewProjects: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  experience: {
    title: string;
  };
  education: {
    title: string;
    subtitle: string;
    certifications: string;
    training: string;
    status: string;
    activeLearning: string;
  };
  projects: {
    title: string;
  };
  contact: {
    title: string;
    subtitle: string;
    runScript: string;
    running: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    checkFields: string;
    sending: string;
    sent: string;
    sendError: string;
  };
  footer: {
    tagline: string;
    madeWith: string;
    and: string;
    by: string;
    scrollTop: string;
    rights: string;
  };
}

const es: Translations = {
  nav: {
    about: 'sobre mí',
    skills: 'habilidades',
    work: 'experiencia',
    projects: 'proyectos',
    education: 'educación',
    contact: 'contacto',
    contactAria: 'Contáctame',
  },
  language: {
    label: 'Idioma',
  },
  hero: {
    available: 'Disponible para proyectos',
    greeting: 'Hola, soy',
    role: 'SysAdmin / Desarrollador — Automatización y Operaciones Cloud',
    runProfile: 'Ejecutar perfil',
    viewProjects: 'Ver proyectos',
  },
  skills: {
    title: 'Árbol de habilidades',
    subtitle: 'Herramientas y tecnologías con las que trabajo',
  },
  experience: {
    title: 'Experiencia',
  },
  education: {
    title: 'Educación',
    subtitle:
      'Estudios formales, certificaciones y formación específica organizados como una línea de tiempo compacta.',
    certifications: 'Certificaciones profesionales',
    training: 'Formación adicional',
    status: 'Estado',
    activeLearning: 'Aprendizaje activo',
  },
  projects: {
    title: 'Proyectos',
  },
  contact: {
    title: 'Listo para construir la próxima interfaz',
    subtitle:
      'Un bloque de contacto reinventado como editor de código: campos editables, validación y un envío de correo real.',
    runScript: 'EJECUTAR SCRIPT',
    running: 'EJECUTANDO',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'tu@correo.com',
    messagePlaceholder: 'Escribe tu mensaje aquí...',
    checkFields: 'Revisa los campos antes de ejecutar el script.',
    sending: 'Enviando mensaje...',
    sent: 'Mensaje enviado correctamente.',
    sendError: 'No se pudo enviar el mensaje. Inténtalo nuevamente.',
  },
  footer: {
    tagline:
      'Construido con tecnologías web modernas y enfoque en código limpio y de alto rendimiento',
    madeWith: 'Hecho con',
    and: 'y',
    by: 'por',
    scrollTop: 'Volver arriba',
    rights: 'Todos los derechos reservados',
  },
};

const en: Translations = {
  nav: {
    about: 'about',
    skills: 'skills',
    work: 'work_experience',
    projects: 'projects',
    education: 'education',
    contact: 'contact',
    contactAria: 'Contact me',
  },
  language: {
    label: 'Language',
  },
  hero: {
    available: 'Available for projects',
    greeting: "Hello, I'm",
    role: 'SysAdmin / Developer — Automation & Cloud Operations',
    runProfile: 'Run Profile',
    viewProjects: 'View Projects',
  },
  skills: {
    title: 'Skills Tree',
    subtitle: 'Tools & Technologies I Can Work With',
  },
  experience: {
    title: 'Experience',
  },
  education: {
    title: 'Education',
    subtitle:
      'Formal studies, certifications, and focused training mapped like a compact operator timeline.',
    certifications: 'Professional Certifications',
    training: 'Additional Training',
    status: 'Status',
    activeLearning: 'Active learning',
  },
  projects: {
    title: 'Projects',
  },
  contact: {
    title: 'Open to build the next interface',
    subtitle:
      'A contact block reimagined as a code editor: editable fields, validation and a real email delivery flow.',
    runScript: 'RUN SCRIPT',
    running: 'RUNNING',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'your@email.com',
    messagePlaceholder: 'Type your message here...',
    checkFields: 'Check the fields before running the script.',
    sending: 'Sending message...',
    sent: 'Message sent successfully.',
    sendError: 'The message could not be sent. Please try again.',
  },
  footer: {
    tagline:
      'Built with modern web technologies and a focus on clean and performant code',
    madeWith: 'Made with',
    and: 'and',
    by: 'by',
    scrollTop: 'Scroll to top',
    rights: 'All rights reserved',
  },
};

export const translations: Record<Language, Translations> = { es, en };
