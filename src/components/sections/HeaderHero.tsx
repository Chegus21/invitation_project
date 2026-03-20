import React from "react";
import { motion } from "framer-motion";
import { InvitationData, getCapabilities } from "../../data/invitations";

type Props = {
  data: InvitationData;
  titleOverride?: string;
  subtitleOverride?: string;
};

const base = (path?: string) =>
  path?.startsWith("http")
    ? path
    : path
      ? `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
      : "";

export const HeaderHero: React.FC<Props> = ({
  data,
  titleOverride,
  subtitleOverride,
}) => {
  const caps = getCapabilities(data);
  if (!caps.features.header) return null;

  const bg = data.customization?.headerImage
    ? base(data.customization.headerImage)
    : undefined;

  const date = new Date(data.eventDate);
  const dateText = data.eventDate
    ? date.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const title =
    titleOverride ||
    (data.type === "boda"
      ? "Nuestra Boda"
      : data.type === "cumple"
        ? "Mis 18 Años"
        : "Mis XV Años");

  // 🎨 Colores dinámicos
  const primaryColor = data.additionalColors?.primary || "#000";
  const secondaryColor = data.additionalColors?.secondary || "#000";
  const accentColor = data.additionalColors?.accent || "#000";

  const heroStyle = data.customization?.heroStyle || "classic";

  const heroStyles = {
    classic: {
      titleClass: "montserrat-custom",
      nameClass: "pattaya-regular",
      subtitleClass: "montserrat-custom",
      color: primaryColor,
    },

    editorial: {
      titleClass: "font-serif italic tracking-[0.2em]",
  nameClass: "italianno-regular text-7xl",
  subtitleClass: "font-serif italic",
  titleColor: "#ffffff",
  nameColor: "#ffffff",
  subtitleColor: "#ffffff",
    },

    luxury: {
      titleClass: "font-serif tracking-wide",
      nameClass: "pattaya-regular",
      subtitleClass: "font-serif",
      color: "#ffffff",
    },

    minimal: {
      titleClass: "font-light",
      nameClass: "font-light text-5xl",
      subtitleClass: "font-light",
      color: "#ffffff",
    },
    romantic: {
      titleClass: "italic font-serif tracking-wide",
      nameClass: "pattaya-regular",
      subtitleClass: "italic font-serif",
      titleColor: "#ffffff",
      nameColor: "#f5d48f",
      subtitleColor: "#ffffff",
    },
  };

  const activeStyle = heroStyles[heroStyle];

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: bg ? `url("${bg}")` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Marco blanco */}
      <div className="absolute inset-3 md:inset-5 border-4 border-white rounded-lg pointer-events-none" />

      {/* Texto superior */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <h1
          className={`text-4xl md:text-6xl ${activeStyle.titleClass} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]`}
          style={{ color: primaryColor }}
        >
          {title}
        </h1>
      </div>

      {/* Texto inferior */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p
          className={`text-6xl md:text-8xl mb-3 drop-shadow-lg ${activeStyle.nameClass}`}
          style={{ color: secondaryColor }}
        >
          {data.name}
        </p>

        <h2
          className={`text-2xl md:text-3xl ${activeStyle.subtitleClass} drop-shadow-lg`}
          style={{ color: accentColor }}
        >
          {subtitleOverride || dateText}
        </h2>
      </div>
    </motion.header>
  );
};
