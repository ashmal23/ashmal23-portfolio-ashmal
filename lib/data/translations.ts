export interface TranslationBundle {
  navHome: string;
  navAbout: string;
  navSkills: string;
  navServices: string;
  navProjects: string;
  navBlog: string;
  navContact: string;
  letsTalk: string;
  heroGreeting: string;
  heroTitle: string;
  heroSubtitle: string;
  heroSubtitle2: string;
  aboutTitle: string;
  skillsTitle: string;
  projectsTitle: string;
  contactTitle: string;
  contactSubtitle: string;
  formName: string;
  formEmail: string;
  formSubject: string;
  formMessage: string;
  formSubmit: string;
  botGreeting: string;
  
  // New localization keys
  signIn: string;
  logout: string;
  availableForWork: string;
  heroDescription: string;
  viewWork: string;
  downloadResume: string;
  aboutSubtitle: string;
  aboutDescription: string;
  badgeFullStack: string;
  badgeAIBuilder: string;
  badgeLocation: string;
  skillsSubtitle: string;
  skillsBadge: string;
  skillExpert: string;
  skillAdvanced: string;
  skillIntermediate: string;
  servicesSubtitle: string;
  seeMoreServices: string;
  viewAllSkills: string;
  showLessSkills: string;
  projectsSubtitle: string;
  viewAllProjects: string;
  contactSubtitleLeft: string;
  contactDescriptionLeft: string;
  contactLabelEmail: string;
  contactLabelLocation: string;
  contactLabelAvailability: string;
  contactValueAvailability: string;
  contactSuccessTitle: string;
  contactSuccessDesc: string;
  contactSendAnother: string;
}

export const translations: Record<string, TranslationBundle> = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navSkills: "Skills",
    navServices: "Services",
    navProjects: "Projects",
    navBlog: "Blog",
    navContact: "Contact",
    letsTalk: "Let's Talk",
    heroGreeting: "Hi, I'm",
    heroTitle: "Ashmal Ahmed",
    heroSubtitle: "Computer Science Student & Software Developer",
    heroSubtitle2: "Problem Solver & C/Python Programmer",
    aboutTitle: "About Me",
    skillsTitle: "My Skills",
    projectsTitle: "Featured Projects",
    contactTitle: "Contact Me",
    contactSubtitle: "Got a project in mind? Reach out and let's build it together.",
    formName: "Full Name",
    formEmail: "Email Address",
    formSubject: "Subject",
    formMessage: "Message",
    formSubmit: "Send Message",
    botGreeting: "Hi! I'm Ashmal's AI assistant. 🚀 Ask me about his Student Record Management System and I'll show you how he builds CLI programs!",
    
    // UI strings
    signIn: "Sign In",
    logout: "Logout",
    availableForWork: "Available for Projects & Internships",
    heroDescription: "I am a Computer Science student at Greenwich University, specializing in Python and C programming, object-oriented concepts, and basic algorithms. Eager to solve real-world problems.",
    viewWork: "View My Work",
    downloadResume: "Download Resume",
    aboutSubtitle: "A Few Words About Me",
    aboutDescription: "I am a Computer Science student at Greenwich University, based in Karachi, Pakistan. With hands-on experience in C, Python, Object-Oriented Programming (OOP), and core data structures, I focus on building reliable software solutions, input validations, and modular CLI architectures. I am eager to apply my problem-solving skills to real-world software engineering challenges.",
    badgeFullStack: "Software Developer",
    badgeAIBuilder: "CS Student",
    badgeLocation: "Karachi, Pakistan",
    skillsSubtitle: "Technologies I Work With",
    skillsBadge: "My Expertise",
    skillExpert: "Expert",
    skillAdvanced: "Advanced",
    skillIntermediate: "Intermediate",
    servicesSubtitle: "What I Can Build",
    seeMoreServices: "See More Services",
    viewAllSkills: "View All Skills",
    showLessSkills: "Show Less",
    projectsSubtitle: "What I've Built",
    viewAllProjects: "View All Projects",
    contactSubtitleLeft: "Let's Work Together",
    contactDescriptionLeft: "I'm always open to new opportunities and collaborations. If you have a project in mind or just want to say hi, feel free to reach out!",
    contactLabelEmail: "Email",
    contactLabelLocation: "Location",
    contactLabelAvailability: "Availability",
    contactValueAvailability: "Open to Internships & Projects",
    contactSuccessTitle: "Message Sent!",
    contactSuccessDesc: "Thank you for reaching out. I'll get back to you as soon as possible.",
    contactSendAnother: "Send another message",
  },
  ur: {
    navHome: "ہوم",
    navAbout: "میرے بارے میں",
    navSkills: "مہارتیں",
    navServices: "سروسز",
    navProjects: "پروجیکٹس",
    navBlog: "بلاگ",
    navContact: "رابطہ کریں",
    letsTalk: "بات چیت کریں",
    heroGreeting: "ہیلو، میں ہوں",
    heroTitle: "اشمل احمد",
    heroSubtitle: "کمپیوٹر سائنس کا طالب علم اور سافٹ ویئر ڈویلپر",
    heroSubtitle2: "پرابلم سالور اور C/Python ڈویلپر",
    aboutTitle: "میرے بارے میں",
    skillsTitle: "میری مہارتیں",
    projectsTitle: "نمایاں پروجیکٹس",
    contactTitle: "رابطہ کریں",
    contactSubtitle: "کیا آپ کے ذہن میں کوئی پروجیکٹ ہے؟ رابطہ کریں اور مل کر بنائیں گے۔",
    formName: "پورا نام",
    formEmail: "ای میل ایڈریس",
    formSubject: "موضوع",
    formMessage: "پیغام",
    formSubmit: "پیغام بھیجیں",
    botGreeting: "ہیلو! میں اشمل کا اے آئی اسسٹنٹ ہوں۔ 🚀 مجھ سے ان کے پروجیکٹس کے بارے میں پوچھیں!",
    
    // UI strings
    signIn: "سائن ان",
    logout: "لاگ آؤٹ",
    availableForWork: "پروجیکٹس اور انٹرن شپ کے لیے دستیاب ہے",
    heroDescription: "میں گرین وچ یونیورسٹی کا کمپیوٹر سائنس کا طالب علم ہوں، جو C اور Python پروگرامنگ، آبجیکٹ اورینٹڈ تصورات اور ڈیٹا اسٹرکچرز میں مہارت رکھتا ہوں۔",
    viewWork: "میرا کام دیکھیں",
    downloadResume: "ریزیومے ڈاؤن لوڈ کریں",
    aboutSubtitle: "میرے بارے میں چند الفاظ",
    aboutDescription: "میں گرین وچ یونیورسٹی، کراچی، پاکستان میں کمپیوٹر سائنس کا طالب علم ہوں۔ C، Python، آبجیکٹ اورینٹڈ پروگرامنگ (OOP)، اور بنیادی ڈیٹا اسٹرکچرز میں عملی تجربے کے ساتھ، میں قابل اعتماد سافٹ ویئر سلوشنز، ان پٹ ویلیڈیشنز اور ماڈیولر CLI پروگرامنگ پر توجہ مرکوز کرتا ہوں۔",
    badgeFullStack: "سافٹ ویئر ڈویلپر",
    badgeAIBuilder: "سی ایس اسٹوڈنٹ",
    badgeLocation: "کراچی، پاکستان",
    skillsSubtitle: "وہ ٹیکنالوجیز جن پر میں کام کرتا ہوں",
    skillsBadge: "میری مہارت",
    skillExpert: "ماہر",
    skillAdvanced: "اعلیٰ",
    skillIntermediate: "درمیانہ",
    servicesSubtitle: "میں کیا بنا سکتا ہوں",
    seeMoreServices: "مزید سروسز دیکھیں",
    viewAllSkills: "تمام مہارتیں دیکھیں",
    showLessSkills: "کم دکھائیں",
    projectsSubtitle: "جو میں نے بنایا ہے",
    viewAllProjects: "تمام پروجیکٹس دیکھیں",
    contactSubtitleLeft: "آئیں مل کر کام کریں",
    contactDescriptionLeft: "میں ہمیشہ نئے مواقع اور تعاون کے لیے تیار رہتا ہوں۔ اگر آپ کے ذہن میں کوئی پروجیکٹ ہے یا صرف ہیلو کہنا چاہتے ہیں، تو بلا جھجھک رابطہ کریں!",
    contactLabelEmail: "ای میل",
    contactLabelLocation: "مقام",
    contactLabelAvailability: "دستیابی",
    contactValueAvailability: "انٹرن شپ اور پروجیکٹس کے لیے دستیاب",
    contactSuccessTitle: "پیغام بھیج دیا گیا!",
    contactSuccessDesc: "رابطہ کرنے کا شکریہ۔ میں جلد از جلد آپ سے رابطہ کروں گا۔",
    contactSendAnother: "ایک اور پیغام بھیجیں",
  },
  de: {
    navHome: "Startseite",
    navAbout: "Über mich",
    navSkills: "Fähigkeiten",
    navServices: "Dienstleistungen",
    navProjects: "Projekte",
    navBlog: "Blog",
    navContact: "Kontakt",
    letsTalk: "Lass uns reden",
    heroGreeting: "Hi, ich bin",
    heroTitle: "Ashmal Ahmed",
    heroSubtitle: "Informatik-Student & Software-Entwickler",
    heroSubtitle2: "Problemlöser & C/Python-Entwickler",
    aboutTitle: "Über mich",
    skillsTitle: "Meine Fähigkeiten",
    projectsTitle: "Vorgestellte Projekte",
    contactTitle: "Kontaktiere mich",
    contactSubtitle: "Haben Sie ein Projekt im Sinn? Kontaktieren Sie mich und lassen Sie es uns gemeinsam bauen.",
    formName: "Vollständiger Name",
    formEmail: "E-Mail-Adresse",
    formSubject: "Betreff",
    formMessage: "Nachricht",
    formSubmit: "Nachricht senden",
    botGreeting: "Hallo! Ich bin Ashmals KI-Assistent. 🚀 Fragen Sie mich nach seinen Projekten!",
    
    // UI strings
    signIn: "Anmelden",
    logout: "Abmelden",
    availableForWork: "Verfügbar für Projekte & Praktika",
    heroDescription: "Ich bin Informatik-Student an der Greenwich University und spezialisiert auf Python- und C-Programmierung, objektorientierte Konzepte und grundlegende Algorithmen.",
    viewWork: "Meine Arbeit ansehen",
    downloadResume: "Lebenslauf herunterladen",
    aboutSubtitle: "Ein paar Worte über mich",
    aboutDescription: "Ich bin Informatik-Student an der Greenwich University in Karatschi, Pakistan. Mit praktischer Erfahrung in C, Python, objektorientierter Programmierung (OOP) und grundlegenden Datenstrukturen konzentriere ich mich auf die Entwicklung zuverlässiger Softwarelösungen und modularer CLI-Architekturen.",
    badgeFullStack: "Software-Entwickler",
    badgeAIBuilder: "Informatik-Student",
    badgeLocation: "Karatschi, Pakistan",
    skillsSubtitle: "Technologien, mit denen ich arbeite",
    skillsBadge: "Meine Expertise",
    skillExpert: "Experte",
    skillAdvanced: "Fortgeschritten",
    skillIntermediate: "Mittel",
    servicesSubtitle: "Was ich bauen kann",
    seeMoreServices: "Mehr Dienstleistungen sehen",
    viewAllSkills: "Alle Fähigkeiten anzeigen",
    showLessSkills: "Weniger anzeigen",
    projectsSubtitle: "Was ich gebaut habe",
    viewAllProjects: "Alle Projekte anzeigen",
    contactSubtitleLeft: "Lass uns zusammenarbeiten",
    contactDescriptionLeft: "Ich bin immer offen für neue Möglichkeiten und Kooperationen. Wenn Sie ein Projekt im Sinn haben oder einfach nur Hallo sagen möchten, können Sie sich gerne an mich wenden!",
    contactLabelEmail: "E-Mail",
    contactLabelLocation: "Standort",
    contactLabelAvailability: "Verfügbarkeit",
    contactValueAvailability: "Offen für Praktika & Projekte",
    contactSuccessTitle: "Nachricht gesendet!",
    contactSuccessDesc: "Vielen Dank für Ihre Kontaktaufnahme. Ich werde mich so schnell wie möglich bei Ihnen melden.",
    contactSendAnother: "Eine weitere Nachricht senden",
  },
};
