import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { InvitationData, getCapabilities } from "../../data/invitations";

interface SectionProps {
  data: InvitationData;
}

export const Image2Section: React.FC<SectionProps> = ({ data }) => {
  const caps = getCapabilities(data);

  const bgImage = data.customization?.image2
    ? data.customization.image2.startsWith("http")
      ? `url("${data.customization.image2}")`
      : `url("${import.meta.env.BASE_URL}${data.customization.image2.replace(
          /^\//,
          ""
        )}")`
    : undefined;

  return (
    <div className="font-sans text-gray-800 ">
      {/* Sección personalizada 2 */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center 
             bg-center bg-cover rounded-lg overflow-hidden"
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Marco blanco interno */}
        <div className="absolute inset-3 md:inset-5 border-4 border-white rounded-lg pointer-events-none"></div>

        {/* Contenedor de texto responsivo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative max-w-[90%] md:max-w-2xl text-center px-4"
        >
          {data.customization?.text2 && (
            <p
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl montserrat-custom leading-snug 
                   [text-shadow:_0_2px_4px_rgb(0_0_0_/_70%)]"
            >
              {data.customization.text2}
            </p>
          )}
        </motion.div>
      </motion.section>
    </div>
  );
};
