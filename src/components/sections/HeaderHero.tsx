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
          className="
  text-3xl md:text-4xl 
  montserrat-custom 
  text-black
  drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
  drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]
"
        >
          {title}
        </h1>
      </div>

      {/* Texto inferior */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-6xl md:text-8xl text-black mb-3 drop-shadow-lg pattaya-regular">
          {data.name}
        </p>
        <h2 className="text-2xl md:text-3xl montserrat-custom text-black drop-shadow-lg">
          {subtitleOverride || dateText}
        </h2>
      </div>
    </motion.header>
  );
};
