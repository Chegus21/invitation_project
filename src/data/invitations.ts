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

  parentsNames: {
    label?: string;
    name: string;
    deceased?: boolean;
  }[];

  parentsNamesExtra: {
    label?: string;
    name: string;
    deceased?: boolean;
  }[];
  godparentsNames?: { name: string; image?: string }[];
  godparentsTitle?: string;

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

  rsvpContacts?: {
    name: string;
    phone: string;
  }[];
  rsvpDeadline?: string;
  phone?: string;
  whatsapp?: string;
  googleFormsLink?: string;
  anserwsNegativeLink?: string;
  musicLink?: string;
  phrase1?: string;

  colors: { primary: string; secondary: string; accent: string };
  additionalColors: { primary?: string; secondary?: string; accent?: string };

  customization?: {
    headerImage?: string;
    heroStyle?: "classic" | "editorial" | "luxury" | "minimal" | "romantic";
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
    parentsNames: [
      { label: "", name: "Brenda Yadira Cardenas Peguerd", deceased: false },
    ],
    parentsNamesExtra: [],
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
    additionalColors: {
      primary: "#0B1F3A",
      secondary: "#1E3A5F",
      accent: "#6FA3D6",
    },
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
  "Diana-18": {
    id: "Diana-18",
    type: "cumple",
    tier: "premium",
    name: "Diana",
    eventDate: "2026-03-07T17:00:00",
    parentsNames: [
      { label: "Papá", name: "Dany Arturo Valdez Cruz" },
      { label: "Mamá", name: "Claudia Morales Segundo" },
    ],
    parentsNamesExtra: [
      { label: "", name: "" },
      { label: "", name: "" },
    ],
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
      "Salón de Fiestas Los Serafines, C. 18 de Noviembre Manzana 8 Lote 23, Aquiles Serdán antorha, 72495 Heroica Puebla de Zaragoza, Pue.",
    receptionLink: "ZNGHHfrVMGnWJfz58",
    hashtag: "#Diana18",
    dressCode: "Elegante - comodo (Evitar colores rosas)",
    giftRegistry: [],
    giftLink: ["#"],
    bankTransferDetails: { clabe: "", cardNumber: "", bank: "" },
    phrase1:
      "Hoy cruzas la puerta de una nueva etapa, donde tus sueños tienen voz, tus decisiones tienen fuerza y tu esencia empieza a brillar sin límites.",
    timeline: [
      { time: "17:00", event: "Misa" },
      { time: "18:03", event: "Recepción" },
      { time: "19:00", event: "Cena" },
      { time: "21:00", event: "Baile  y Celebración" },
    ],
    googleFormsLink:
      "https://wa.me/522217070003?text=Asistir%C3%A9%20a%20tu%20celebraci%C3%B3n",
    anserwsNegativeLink:
      "https://wa.me/522217070003?text=No%20podr%C3%A9%20asistir%20a%20tu%20celebraci%C3%B3n",
    musicLink:
      "https://res.cloudinary.com/dwtkygvrh/video/upload/v1768174923/The_Chainsmokers_-_Don_t_Let_Me_Down_Lyrics_ft._Daya_-_7clouds_gfaxdt.mp3",
    colors: {
      primary: "#B71C1C", // rojo vino
      secondary: "#1C1C1C", // rojo vivo
      accent: "#E57373", // rosa suave
    },
    additionalColors: {
      primary: "#0B1F3A",
      secondary: "#1E3A5F",
      accent: "#6FA3D6",
    },
    customization: {
      headerImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926840/WhatsApp_Image_2026-01-08_at_20.45.49_2_yeqxz3.jpg",
      churchImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767930199/1035b983-b5aa-4178-b31b-9e3331b75c5e.png",
      receptionImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1768094917/f156bae6-281f-4bad-b55e-5504dc67ffb6.png",
      countdownImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/fondo-floral-con-flores-rosas-la-derecha_ulsskn.jpg",
      calendarImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/fondo-floral-con-flores-rosas-la-derecha_ulsskn.jpg",
      godparentsBackgroundImages:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399339/fondo-de-diseno-con-textura-simple-blanco_gyc3ei.jpg",

      locationImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/9_okst0e.jpg",
      timelineImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399339/fondo-de-diseno-con-textura-simple-blanco_gyc3ei.jpg",
      hashtagImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/9_okst0e.jpg",
      dressCodeImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399339/fondo-de-diseno-con-textura-simple-blanco_gyc3ei.jpg",
      giftRegistryImage: "",
      specialThanksImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1762399338/fondo-floral-con-flores-rosas-la-derecha_ulsskn.jpg",
      rsvpImage: "",
      image1:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926841/WhatsApp_Image_2026-01-08_at_20.45.49_1_nkc9z0.jpg",
      text1: "",
      image2:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926844/WhatsApp_Image_2026-01-08_at_20.45.50_vnlxhj.jpg",
      text2: "",
      image3:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1767926839/WhatsApp_Image_2026-01-08_at_20.45.49_3_zoh1oe.jpg",
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
  "Jaqueline-Palomino": {
    id: "Jaqueline-Palomino",
    type: "quince",
    tier: "premium",
    name: "Jaqueline",
    eventDate: "2026-05-09T17:00:00",

    parentsNames: [
      { label: "Papá", name: "Antonio Palomino Pérez" },
      { label: "Mamá", name: "Alma Sintiha Ramírez Guzmán" },
    ],
    parentsNamesExtra: [
      { label: "Abuelo", name: "Raúl Ramirez Rodríguez" },
      { label: "Abuela", name: "Maria Luisa Guzmán López" },
    ],
    godparentsNames: [
      {
        name: "Angelica Javier Mejía",
        image:
          "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-circle.svg",
      },
      {
        name: "Eduardo Ramirez Guzmán        .",
        image:
          "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-circle.svg",
      },
    ],
    churchAddress:
      "Calle Juan N. Méndez, Seminario Palafoxiano, 72300 Heroica Puebla de Zaragoza, Pue.",
    churchLink: "xMwwXAPGoW3jZbx29",
    receptionAddress:
      "Blvrd Nte 733, Zona Sin Asignación de Nombre de Col 1, Santa María, 72080 Heroica Puebla de Zaragoza, Pue.",
    receptionLink: "hCUd9rQ1fYcg196F8",
    hashtag: "#JaquelineXV",
    dressCode: "Etiqueta rigurosa (evitar el color azul noche)",
    giftRegistry: ["Sears - #238501"],
    giftLink: [
      "https://www.sears.com.mx/Mesa-de-Regalos/238501/Te-invito-a-mi-XV-A%C3%B1os---Jaqueline-",
    ],
    bankTransferDetails: {
      clabe: "4169160850995896",
      cardNumber: "",
      bank: "",
    },
    phrase1:
      "Hoy dejo atrás una etapa y abro alas hacia nuevos sueños, con gratitud, felicidad y amor a la vida… Tú, que eres parte de esta familia, no puedes faltar. Gracias por acompañarme en este momento, donde cada instante se convierte en un recuerdo eterno.",
    timeline: [
      { time: "17:00", event: "Misa" },
      { time: "18:15", event: "Recepción" },
      { time: "19:00", event: "Cena" },
      { time: "20:30", event: "Vals" },
      { time: "21:30", event: "Baile  y Celebración" },
    ],
    rsvpContacts: [
      { name: "", phone: "522224634131" }
    ],
    googleFormsLink:
      "https://wa.me/522224634131?text=Asistir%C3%A9%20a%20tu%20celebraci%C3%B3n",
    anserwsNegativeLink:
      "https://wa.me/522224634131?text=No%20podr%C3%A9%20asistir%20a%20tu%20celebraci%C3%B3n",
    musicLink:
      "https://res.cloudinary.com/dwtkygvrh/video/upload/v1771378619/ytmp3free.cc_how-deep-is-your-love-bee-gees-daehan-choi-youtubemp3free.org_jy1y7r.mp3",
    colors: {
      primary: "#0B1F3A", // Azul noche profundo
      secondary: "#1E3A5F", // Azul marino elegante
      accent: "#6FA3D6", // Azul claro suave (para detalles)
    },
    additionalColors: {
      primary: "#D4AF37", // Dorado clásico elegante
      secondary: "#C9A227", // Dorado más profundo (contraste)
      accent: "#000000", // Negro elegante
    },
    customization: {
      headerImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1771524604/there-is-woman-blue-dress-standing-room-generative-ai.jpg_stptei.jpg",
      churchImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1771377986/0427510f-5d86-47c7-b713-47866202fb8c_whu5l0.jpg",
      receptionImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1771378177/74a4b2b1-3e42-4b83-ad80-5d5280f5a43b_gqo5uz.jpg",
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
      image1: "",
      text1: "",
      image2: "",
      text2: "",
      image3: "",
      text3: "",
      galleryImages: [],
    },
    extras: { courtNames: [] },
    createdAt: new Date().toISOString(),
  },
  "Ivette&JuanCarlos": {
    id: "Ivette&JuanCarlos",
    type: "boda",
    tier: "premium",
    name: "Ivette & Juan Carlos",
    eventDate: "2026-05-23T17:00:00",
    parentsNames: [
      {
        label: "Padre del novio",
        name: "Fausto Muñoz Bautista",
        deceased: true,
      },
      {
        label: "Madre del novio",
        name: "Josefina Vasquez Martinez",
        deceased: true,
      },
    ],

    parentsNamesExtra: [
      { label: "Madre de la novia", name: "Sara Juarez Hernandez" },
    ],
    godparentsNames: [
      {
        name: "Profra. Lourdes Susana Martínez Toscano",
        image:
          "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773682365/5b829311-dea6-40ca-b500-9d47e605e72d_utoop5.jpg",
      },
      {
        name: "Profr. Agustín Alberto Martínez Lázaro",
        image:
          "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773682368/58c61eac-4e47-434b-9727-dd5eb0c6a6b3_smgg0r.jpg",
      },
    ],
    godparentsTitle: "Padrinos de Brindis",
    churchAddress: "",
    churchLink: "",
    receptionAddress:
      "Av. 3 Sur 12105 -A, Zona Sin Asignación de Nombre de Col 69, Guadalupe Hidalgo, 72490 Heroica Puebla de Zaragoza, Pue.",
    receptionLink: "e26XEfwcmv7G6yNu5",
    hashtag: "#Ivette&JuanCarlos",
    dressCode:
      "Formal - Evitar en mujeres blanco, beige y Palo de Rosa. Evitar en hombres Azul Marino.",
    giftRegistry: [],
    giftLink: [],
    bankTransferDetails: {
      clabe: "",
      cardNumber: "",
      bank: "",
    },
    phrase1:
      "Hoy comenzamos una nueva historia, escrita con amor, confianza y sueños compartidos. Queremos que seas parte de este capitulo tan especial de nuestras vidas",
    timeline: [
      { time: "18:30", event: "Recepción" },
      { time: "19:00", event: "Boda Civil" },
      { time: "19:40", event: "Entrada de novios" },
      { time: "20:00", event: "Cena" },
      { time: "21:30", event: "Baile" },
    ],
    rsvpContacts: [
      { name: "Ivette", phone: "522221938392" },
      { name: "Juan Carlos", phone: "522223070486" },
    ],
    rsvpDeadline: "2026-04-15",
    googleFormsLink:
      "https://wa.me/522223070486?text=Hola,%20confirmo%20que%20asistir%C3%A9%20a%20su%20boda%20%F0%9F%92%8D",

    anserwsNegativeLink:
      "https://wa.me/522223070486?text=Hola,%20lamentablemente%20no%20podr%C3%A9%20asistir%20a%20su%20boda%20%F0%9F%98%94",
    musicLink:
      "https://res.cloudinary.com/dwtkygvrh/video/upload/v1773291288/Taylor_Swift_-_Lover_Official_Music_Video_letbvd.mp3",
    // Colores botones y detalles
    colors: {
      primary: "#7A9E7E", // Verde salvia elegante
      secondary: "#A8BFA3", // Verde salvia claro
      accent: "#C9A66B", // Dorado suave para detalles
    },
    //Colores textos
    additionalColors: {
      primary: "#ffffff", // Dorado clásico elegante
      secondary: "#ffffff", // Dorado más profundo (contraste)
      accent: "#ffffff", // Negro elegante
    },
    customization: {
      heroStyle: "editorial", //"classic" | "editorial" | "luxury" | "minimal" | "romantic"
      headerImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773285896/5fce7803-77eb-4366-b069-09f101ba9821_qsxveg.jpg",
      churchImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1771377986/0427510f-5d86-47c7-b713-47866202fb8c_whu5l0.jpg",
      receptionImage:
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773452914/1c23560f-d24d-421d-8666-55553017f82a_mirrgb.jpg",
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
      image1: "",
      text1: "",
      image2: "",
      text2: "",
      image3: "",
      text3: "",
      galleryImages: [
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773285946/d0d91260-92b4-4133-b3ac-61cf35bbc074_jblozj.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773285943/7099724c-5ca4-44bd-ab7f-9201d3e4539a_xlxcss.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773285940/aa99d9f0-b273-4d5a-90a2-5e70c8e58ff8_fmlj9n.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773285933/ba1a08cb-3b3d-4fda-8d97-f95993728d25_neekya.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773285930/c10ca1cf-0afc-40fc-b3e1-6cdd0fa9b258_ynejny.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773285927/70e79a39-c69f-441c-af1d-bbcc60d92a77_l8hd6k.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773285922/e6bf7fab-3ad3-443d-8d0a-2f049e304b4b_qmocha.jpg",
        "https://res.cloudinary.com/dwtkygvrh/image/upload/v1773682909/invitaciones/ClaudiaYJuan/copy_of_31f5f79e-52a3-4f6b-b155-990d304f7da0_ezhznj_29560f.jpg",
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
