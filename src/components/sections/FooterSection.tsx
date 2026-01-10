import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const FooterSection: React.FC = () => {
  return (
<motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center py-12 bg-white border-t border-gray-100"
      >
        <img
          src={`${import.meta.env.BASE_URL}media/icon/11. Icono Menu.png`}
          alt="Logo ESSENCIAL PUEBLA"
          className="w-12 h-12 mx-auto mb-4"
        />
        <h2 className="text-xl md:text-2xl font-light text-gray-900 tracking-widest uppercase">
          ESSENCIAL PUEBLA
        </h2>
        <p className="text-gray-400 mt-1 text-sm md:text-base italic max-w-xs mx-auto">
          Invitaciones digitales personalizadas con estilo y elegancia.
        </p>
      </motion.footer>
    );
};