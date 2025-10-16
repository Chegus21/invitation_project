// Base de datos de invitaciones - En producción esto vendría de una base de datos
export interface QuinceaneraData {
  id: string;
  name: string;
  eventDate: string;
  parentsNames: string[];
  godparentsNames?: { name: string; image: string }[];
  churchAddress: string;
  receptionAddress: string;
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
  "isabella-maria": {
    id: "isabella-maria",
    name: "Isabella María",
    eventDate: "2025-12-15T18:00:00",
    parentsNames: ["María González", "Carlos Rodríguez"],
    godparentsNames: [
      {
        name: "Anabel López",
        image:
          "https://static01.nyt.com/images/2017/05/07/arts/07GAL-GADOTweb/07GAL-GADOTweb-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      },
      { name: "Roberto Martínez", image: "https://randomuser.me/api/por" },
      { name: "Carmen Silva", image: "/media/XV_Sofia/Sofia -118.jpg" },
      { name: "Eduardo Torres", image: "https://randomuser.me/api/por" },
    ],
    churchAddress: "Parroquia San José, Calle Principal 123, Ciudad",
    receptionAddress:
      "Salón de Eventos El Palacio, Avenida Central 456, Ciudad",
    hashtag: "#IsabellaXV",
    dressCode:
      "Formal / Cocktail - Colores recomendados: Tonos pasteles (evitar blanco y rosa fuerte)",
    giftRegistry: ["Liverpool", "Amazon", "Palacio de Hierro"],
    giftLink: [
      "https://mesaderegalos.liverpool.com.mx/?gclsrc=aw.ds&gad_source=1&gad_campaignid=12463324257&gbraid=0AAAAABmIDJ2mX46lVjRUDrUnTlMHeZBAc&gclid=CjwKCAjw6P3GBhBVEiwAJPjmLuW7fYjM7ZldmSRySFEP0MvPg-gmQJpduSmJszl0AgQggUpoc0obxhoC8QoQAvD_BwE",
      "https://www.amazon.com.mx/registries/custom",
      "https://www.elpalaciodehierro.com/mesas-de-regalos",
      "#",
    ],
    bankTransferDetails: {
      clabe: "012345678901234567",
      cardNumber: "1234 5678 9012 3456",
      bank: "Banco Ejemplo",
    },
    phrase1:
      "Un momento íntimo, debido a la situación, hemos planificado para elogiar esta hermosa ocasión. Y tú, que eres parte de nuestra preciosa familia, no puedes faltar a esta reunión.",
    timeline: [
      { time: "18:00", event: "Misa de Acción de Gracias" },
      { time: "19:30", event: "Recepción y Cocktail" },
      { time: "20:00", event: "Protocolo de XV Años" },
      { time: "21:00", event: "Cena" },
      { time: "22:00", event: "Baile y Celebración" },
      { time: "23:00", event: "Fin de la Celebración" },
    ],
    phone: "+52 55 1234 5678",
    whatsapp: "5551234567",
    googleFormsLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeNueoWGOywLruyM_IR-DqGtacPVVKnNXeS_vLdpk3KYYDOxA/viewform?usp=dialog",
    musicLink: "/music/2 - Cupid's Quiver.mp3",

    colors: {
      primary: "green",
      secondary: "violet",
      accent: "pink",
    },
    customization: {
      headerImage: "/media/XV_Sofia/Sofia -74.jpg",
      churchImage:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      receptionImage:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
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
      image1: "/media/XV_Sofia/Sofia -45.jpg",
      text1: "«La sonrisa que me provoca tu mirada, será mi alegría por toda la eternidad»",
      image2: "/media/XV_Sofia/Sofia -96.jpg",
      text2: "«Cada momento a tu lado es un tesoro que guardo en mi corazón para siempre»",
      image3: "/media/XV_Sofia/Sofia -38.jpg",
      text3: "«Eres la melodía que llena mi vida de alegría y amor infinito»",

      galleryImages: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
      ],
    },
  },
  "sofia-alejandra": {
    id: "sofia-alejandra",
    name: "Sofía Alejandra",
    eventDate: "2025-09-30T11:05:00",
    parentsNames: ["Carmen Morales", "José Luis Herrera"],
    godparentsNames: [
      {
        name: "Anabel López",
        image:
          "https://static01.nyt.com/images/2017/05/07/arts/07GAL-GADOTweb/07GAL-GADOTweb-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      },
      { name: "Roberto Martínez", image: "https://randomuser.me/api/por" },
      { name: "Carmen Silva", image: "https://randomuser.me/api/por" },
      { name: "Eduardo Torres", image: "https://randomuser.me/api/por" },
    ],
    churchAddress:
      "Catedral de Nuestra Señora de la Inmaculada Concepción de Puebla",
    receptionAddress:
      "Jardín de Eventos Los Rosales, Boulevard de las Flores 321, Ciudad",
    hashtag: "#SofiaXVAños",
    dressCode:
      "Elegante - Colores sugeridos: Azul marino, dorado y blanco (evitar negro y rojo)",
    giftRegistry: [],
    giftLink: [],
    phrase1:
      "Un momento íntimo, debido a la situación, hemos planificado para elogiar esta hermosa ocasión. Y tú, que eres parte de nuestra preciosa familia, no puedes faltar a esta reunión.",
    timeline: [
      { time: "11:42", event: "Ceremonia Religiosa" },
      { time: "11:43", event: "Recepción de Invitados" },
      { time: "11:44", event: "Vals y Protocolo" },
      { time: "11:45", event: "Cena de Gala" },
      { time: "11:46", event: "Fiesta y Baile" },
      { time: "11:47", event: "Cierre de Celebración" },
    ],
    phone: "+52 55 9876 5432",
    whatsapp: "5559876543",
    googleFormsLink: "https://forms.gle/mi-link-sofia",
    musicLink: "/music/1 - Lover Is a Day.mp3",
    colors: {
      primary: "blue",
      secondary: "indigo",
      accent: "yellow",
    },
    customization: {
      headerImage: "/media/XV_Sofia/Sofia -3.jpg",
      churchImage:
        "https://mexicorutamagica.mx/wp-content/uploads/2021/01/catedral_de_puebla-001-mrm-768x480.jpg",
      receptionImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
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
      image1: "/media/XV_Sofia/Sofia -13.jpg",
      text1: "«La vida es un viaje hermoso, y tú eres mi destino favorito»",
      image2: "/media/XV_Sofia/Sofia -76.jpg",
      text2: "«Eres la luz que ilumina mi camino y llena mi vida de alegría»",
      image3: "/media/XV_Sofia/Sofia -45.jpg",
      text3: "«Contigo, cada día es una aventura llena de amor y felicidad»",
      galleryImages: [
        "/media/XV_Sofia/Sofia -3.jpg",
        "/media/XV_Sofia/Sofia -13.jpg",
        "/media/XV_Sofia/Sofia -38.jpg",
        "/media/XV_Sofia/Sofia -45.jpg",
        "/media/XV_Sofia/Sofia -74.jpg",
        "/media/XV_Sofia/Sofia -76.jpg",
        "/media/XV_Sofia/Sofia -96.jpg",
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
