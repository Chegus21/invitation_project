// Base de datos de invitaciones - En producción esto vendría de una base de datos
export interface QuinceaneraData {
  id: string;
  name: string;
  eventDate: string;
  parentsNames: string[];
  godparentsNames?: { name: string; image: string }[];
  churchAddress: string;
  churchLink: string;
  receptionAddress: string;
  receptionLink: string;
  hashtag: string;
  dressCode: string;
  giftRegistry: string[];
  giftLink: string[];
  bankTransferDetails?: {
    clabe: string;
    cardNumber: string;
    bank: string;
  };
  timeline: { time: string; event: string }[];
  phone: string;
  whatsapp: string;
  googleFormsLink: string;
  musicLink: string;
  phrase1?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
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
  };
}

// Datos de ejemplo para múltiples clientes
export const invitationsDatabase: Record<string, QuinceaneraData> = {
  "Arely-America": {
    id: "Arely-America",
    name: "Arely",
    eventDate: "2025-12-20T17:00:00",
    parentsNames: ["Brenda Yadira Cardenas Peguerd"],
    godparentsNames: [
      { name: "Maria Amparo Rodriguez Ruiz", image: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-circle.svg" },
      { name: "Juan Moreno Arellano       .", image: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-circle.svg" },
    ],
    churchAddress: "Av. Principal Sn Puebla, Centro, 72000 Juan Bautista Cuautlancingo, Pue.",
    churchLink: "CWpigdjFYYnkzeGU6",
    receptionAddress:
      "C. Uranga 20, Barrio del Calvario, 72700 San Juan Cuautlancingo, Pue.",
      receptionLink: "13P4LfYYk8wR7dKQ8", 
    hashtag: "#ArelyXV",
    dressCode:
      "Vaquero (evitar colores rojos)",
    giftRegistry: [],
    giftLink: [
      
      "#",
    ],
    bankTransferDetails: {
      clabe: "",
      cardNumber: "",
      bank: "",
    },
    phrase1:
      "Un momento íntimo, debido a la situación, hemos planificado para elogiar esta hermosa ocasión. Y tú, que eres parte de nuestra preciosa familia, no puedes faltar a esta reunión.",
    timeline: [
      { time: "17:00", event: "Misa" },
      { time: "18:15", event: "Recepción" },
      { time: "19:00", event: "Cena" },
      { time: "20:30", event: "Vals" },
      { time: "21:30", event: "Baile  y Celebración" },
    ],
    phone: "",
    whatsapp: "",
    googleFormsLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeNueoWGOywLruyM_IR-DqGtacPVVKnNXeS_vLdpk3KYYDOxA/viewform?usp=dialog",
    musicLink: "/music/04 - Video Games - Lana Del Rey.mp3",

    colors: {
      primary: "green",
      secondary: "violet",
      accent: "pink",
    },
    customization: {
      headerImage: "/media/America/WhatsApp1.jpeg",
      churchImage:
        "/media/America/unnamed.jpg",
      receptionImage:
        "/media/America/reception.jpg",
      countdownImage:
        "/media/fondos/fondo-de-diseno-con-textura-simple-blanco.jpg",
      calendarImage:
        "/media/fondos/9.jpg",
      godparentsBackgroundImages:
        "/media/fondos/fondo-de-diseno-con-textura-simple-blanco.jpg",
      locationImage:
        "/media/fondos/9.jpg",
      timelineImage:
        "/media/fondos/fondo-de-diseno-con-textura-simple-blanco.jpg",
      hashtagImage:
        "/media/fondos/9.jpg",
      dressCodeImage:
        "/media/fondos/fondo-de-diseno-con-textura-simple-blanco.jpg",
      giftRegistryImage:
        "/media/fondos/9.jpg",
      specialThanksImage:
        "/media/fondos/fondo-de-diseno-con-textura-simple-blanco.jpg",
      rsvpImage:
        "/media/fondos/9.jpg",
      image1: "/media/America/WhatsApp Image 2025-10-16 at 18.33.06 (5).jpeg",
      text1: "«Guardame como la niña de tus ojos, escondeme a la sombra de tus alas» Salmo 17:8",
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
  },
  
};

export const getInvitationData = (id: string): QuinceaneraData | null => {
  return invitationsDatabase[id] || null;
};

export const getAllInvitationIds = (): string[] => {
  return Object.keys(invitationsDatabase);
};
