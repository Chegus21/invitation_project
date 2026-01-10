// Tipos base
export type InvitationType = "quince" | "boda" | "cumple";
export type InvitationTier = "basic" | "standard" | "premium";

export interface TierCapabilities {
  validityMonths: number;
  features: {
    header: boolean;
    countdown: boolean;
    locations: boolean;
    calendar: boolean;
    timeline: boolean;
    dressCode: boolean;
    gallery: boolean;
    hashtag: boolean;
    rsvp: boolean;
    unlimitedSends: boolean;
    music: boolean;
    parentsSection: boolean;
    video: boolean;
    gifts: boolean;
    customPasses: boolean;
  };
}

export const TIER_CAPS: Record<InvitationTier, TierCapabilities> = {
  basic: {
    validityMonths: 1,
    features: {
      header: true,
      countdown: true,
      locations: true,
      calendar: true,
      timeline: true,
      dressCode: true,
      gallery: true,
      hashtag: true,
      rsvp: true,
      unlimitedSends: true,
      music: true,
      parentsSection: false,
      video: false,
      gifts: false,
      customPasses: false,
    },
  },
  standard: {
    validityMonths: 3,
    features: {
      header: true,
      countdown: true,
      locations: true,
      calendar: true,
      timeline: true,
      dressCode: true,
      gallery: true,
      hashtag: true,
      rsvp: true,
      unlimitedSends: true,
      music: true,
      parentsSection: true,
      video: false,
      gifts: false,
      customPasses: false,
    },
  },
  premium: {
    validityMonths: 6,
    features: {
      header: true,
      countdown: true,
      locations: true,
      calendar: true,
      timeline: true,
      dressCode: true,
      gallery: true,
      hashtag: true,
      rsvp: true,
      unlimitedSends: true,
      music: true,
      parentsSection: true,
      video: true,
      gifts: true,
      customPasses: true,
    },
  },
};

// Campos específicos por tipo
export interface WeddingExtras {
  coupleNames?: { bride: string; groom: string };
  ceremonyType?: "civil" | "religiosa" | "mixta";
  dressCodeNote?: string;
  mesaDeRegalosTexto?: string;
}

export interface BirthdayExtras {
  age?: number;
  theme?: string;
  giftsNote?: string; // p. ej. “sin regalos”
}

export interface QuinceExtras {
  courtNames?: string[]; // Damas/Chambelanes
}

// Modelo genérico
export interface InvitationData {
  id: string;
  isDemo?: boolean;
  type: InvitationType;
  tier: InvitationTier;

  name: string;
  eventDate: string;

  parentsNames: string[];
  godparentsNames?: { name: string; image?: string }[];

  churchAddress?: string;
  churchLink?: string;
  receptionAddress?: string;
  receptionLink?: string;

  hashtag?: string;
  dressCode?: string;
  giftRegistry?: string[];
  giftLink?: string[];
  bankTransferDetails?: { clabe: string; cardNumber: string; bank: string };

  timeline?: { time: string; event: string }[];

  phone?: string;
  whatsapp?: string;
  googleFormsLink?: string;
  anserwsNegativeLink?: string;
  musicLink?: string;
  phrase1?: string;

  colors: { primary: string; secondary: string; accent: string };

  customization?: {
    headerImage?: string;
    primaryColor?: string;
    churchImage?: string;
    receptionImage?: string;
    galleryImages?: string[];
    countdownImage?: string;
    calendarImage?: string;
    godparentsBackgroundImages?: string;
    locationImage?: string;
    timelineImage?: string;
    hashtagImage?: string;
    dressCodeImage?: string;
    giftRegistryImage?: string;
    specialThanksImage?: string;
    rsvpImage?: string;
    image1?: string;
    text1?: string;
    image2?: string;
    text2?: string;
    image3?: string;
    text3?: string;
    videoUrl?: string;
  };

  // Extras por tipo
  extras?: WeddingExtras | BirthdayExtras | QuinceExtras;

  createdAt?: string;
}

// DB ejemplo mínima (tu registro existente adaptado)
export const invitationsDatabase: Record<string, InvitationData> = {
  "Arely-America": {
    id: "Arely-America",
    type: "quince",
    tier: "premium",
    name: "Arely",
    eventDate: "2025-12-20T17:00:00",
    parentsNames: ["Brenda Yadira Cardenas Peguerd"],
    godparentsNames: [
      {
        name: "Maria Amparo Rodriguez Ruiz",
        image:
          "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-circle.svg",
      },
      {
        name: "Juan Moreno Arellano       .",
        image:
          "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-circle.svg",
      },
    ],
    churchAddress:
      "Av. Principal Sn Puebla, Centro, 72000 Juan Bautista Cuautlancingo, Pue.",
    churchLink: "CWpigdjFYYnkzeGU6",
    receptionAddress:
      "C. Uranga 20, Barrio del Calvario, 72700 San Juan Cuautlancingo, Pue.",
    receptionLink: "13P4LfYYk8wR7dKQ8",
    hashtag: "#ArelyXV",
    dressCode: "Vaquero (evitar colores rojos)",
    giftRegistry: [],
    giftLink: ["#"],
    bankTransferDetails: { clabe: "", cardNumber: "", bank: "" },
    phrase1:
      "Un momento íntimo, debido a la situación, hemos planificado para elogiar esta hermosa ocasión. Y tú, que eres parte de nuestra preciosa familia, no puedes faltar a esta reunión.",
    timeline: [
      { time: "17:00", event: "Misa" },
      { time: "18:15", event: "Recepción" },
      { time: "19:00", event: "Cena" },
      { time: "20:30", event: "Vals" },
      { time: "21:30", event: "Baile  y Celebración" },
    ],
    googleFormsLink: "https://forms.gle/kSzVn3M79n12xdFo6",
    musicLink: "/music/04 - Video Games - Lana Del Rey.mp3",
    colors: { primary: "#B71C1C", secondary: "#D32F2F", accent: "#E57373" },
    customization: {
      headerImage: "/media/America/WhatsApp1.jpeg",
      churchImage: "/media/America/unnamed.jpg",
      receptionImage: "/media/America/reception.jpg",
      countdownImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/fondo-floral-con-flores-rosas-la-derecha_ulsskn.jpg",
      calendarImage: "/media/fondos/9.jpg",
      godparentsBackgroundImages:
  "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/fondo-floral-con-flores-rosas-la-derecha_ulsskn.jpg",

      locationImage: "/media/fondos/9.jpg",
      timelineImage:
        "/media/fondos/fondo-de-diseno-con-textura-simple-blanco.jpg",
      hashtagImage: "/media/fondos/9.jpg",
      dressCodeImage:
        "/media/fondos/fondo-de-diseno-con-textura-simple-blanco.jpg",
      giftRegistryImage: "/media/fondos/9.jpg",
      specialThanksImage:
        "/media/fondos/fondo-de-diseno-con-textura-simple-blanco.jpg",
      rsvpImage: "/media/fondos/9.jpg",
      image1: "/media/America/WhatsApp Image 2025-10-16 at 18.33.06 (5).jpeg",
      text1:
        "«Guardame como la niña de tus ojos, escondeme a la sombra de tus alas» Salmo 17:8",
      image2: "/media/America/WhatsApp Image 2025-10-16 at 18.33.07 (2).jpeg",
      text2: "",
      image3: "/media/America/WhatsApp Image 2025-10-16 at 18.33.06 (4).jpeg",
      text3: "",
      galleryImages: [
        "/media/America/WhatsApp Image 2025-10-16 at 18.33.06 (1).jpeg",
        "/media/America/WhatsApp Image 2025-10-16 at 18.33.06 (2).jpeg",
        "/media/America/WhatsApp Image 2025-10-16 at 18.33.07.jpeg",
        "/media/America/WhatsApp Image 2025-10-16 at 18.33.07 (1).jpeg",
        "/media/America/WhatsApp Image 2025-10-16 at 18.33.06 (5).jpeg",
        "/media/America/WhatsApp Image 2025-10-16 at 18.33.07 (3).jpeg",
      ],
    },
    extras: { courtNames: [] },
    createdAt: new Date().toISOString(),
  },
  "Diana-Grupo": {
    id: "Diana-Grupo",
    type: "cumple",
    tier: "premium",
    name: "Diana",
    eventDate: "2026-02-07T17:00:00",
    parentsNames: ["Dani Anrturo Valdez Cruz",
      "Claudia Morales Segundo "],
    godparentsNames: [
      {
        name: "Cruz Morales",
        image:
          "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-circle.svg",
      },
      {
        name: "Leónides Segundo",
        image:
          "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-circle.svg",
      },
    ],
    churchAddress:
      "C. Insurgentes 12910, Guadalupe Hidalgo, 72490 Heroica Puebla de Zaragoza, Pue.",
    churchLink: "r7uWSk5LBDfJ8eN87",
    receptionAddress:
      "Calle 18 de noviembre mz 2 lt 24 Colonia Aquiles Serdán ",
    receptionLink: "13P4LfYYk8wR7dKQ8",
    hashtag: "#Diana18",
    dressCode: "Elegante - comodo (Evitar colores rosas)",
    giftRegistry: [],
    giftLink: ["#"],
    bankTransferDetails: { clabe: "", cardNumber: "", bank: "" },
    phrase1: "Hoy cruzas la puerta de una nueva etapa, donde tus sueños tienen voz, tus decisiones tienen fuerza y tu esencia empieza a brillar sin límites.",
    timeline: [
      { time: "17:00", event: "Misa" },
      { time: "18:30", event: "Recepción" },
      { time: "19:00", event: "Cena" },
      { time: "21:00", event: "Baile  y Celebración" },
    ],
    googleFormsLink: "https://wa.me/522217070003?text=Asistir%C3%A9%20a%20tu%20celebraci%C3%B3n",
    anserwsNegativeLink: "https://wa.me/522217070003?text=No%20podr%C3%A9%20asistir%20a%20tu%20celebraci%C3%B3n",
    musicLink: "https://res.cloudinary.com/dwtkygvrh/video/upload/v1768017991/Don_t_Let_Me_Down_Remastered_2009_-_The_Beatles_fjolts.mp3",
    colors: {
  primary: "#B71C1C",   // rojo vino
  secondary: "#1C1C1C", // rojo vivo
  accent: "#E57373"     // rosa suave
},
    customization: {
      headerImage: "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767928162/WhatsApp_Image_2026-01-08_at_21.08.39_agmbce.jpg",
      churchImage: "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767930199/1035b983-b5aa-4178-b31b-9e3331b75c5e.png",
      receptionImage: "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767930572/84139e7c-afab-43ff-9fb3-6aaa4fd6745d.png",
      countdownImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/fondo-floral-con-flores-rosas-la-derecha_ulsskn.jpg",
      calendarImage: "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/fondo-floral-con-flores-rosas-la-derecha_ulsskn.jpg",
      godparentsBackgroundImages:
  "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399339/fondo-de-diseno-con-textura-simple-blanco_gyc3ei.jpg",

      locationImage: "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/9_okst0e.jpg",
      timelineImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399339/fondo-de-diseno-con-textura-simple-blanco_gyc3ei.jpg",
      hashtagImage: "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/9_okst0e.jpg",
      dressCodeImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399339/fondo-de-diseno-con-textura-simple-blanco_gyc3ei.jpg",
      giftRegistryImage: "",
      specialThanksImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/fondo-floral-con-flores-rosas-la-derecha_ulsskn.jpg",
      rsvpImage: "",
      image1: "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926841/WhatsApp_Image_2026-01-08_at_20.45.49_1_nkc9z0.jpg",
      text1:
        "",
      image2: "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926844/WhatsApp_Image_2026-01-08_at_20.45.50_vnlxhj.jpg",
      text2: "",
      image3: "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926839/WhatsApp_Image_2026-01-08_at_20.45.49_3_zoh1oe.jpg",
      text3: "",
      galleryImages: [
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926846/WhatsApp_Image_2026-01-08_at_20.45.49_5_psusfn.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926844/WhatsApp_Image_2026-01-08_at_20.45.50_vnlxhj.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926843/WhatsApp_Image_2026-01-08_at_20.45.50_1_scf21r.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926842/WhatsApp_Image_2026-01-08_at_20.45.49_e2cxli.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926840/WhatsApp_Image_2026-01-08_at_20.45.49_2_yeqxz3.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926839/WhatsApp_Image_2026-01-08_at_20.45.49_3_zoh1oe.jpg",
      ],
    },
    extras: { courtNames: [] },
    createdAt: new Date().toISOString(),
  },
  
};

export const getInvitationData = (id: string): InvitationData | null =>
  invitationsDatabase[id] || null;
export const getAllInvitationIds = (): string[] =>
  Object.keys(invitationsDatabase);
export const getCapabilities = (data: InvitationData) => TIER_CAPS[data.tier];
