import React, { useEffect, useState } from "react";
import { InvitationData, getCapabilities } from "../../data/invitations";
import { motion } from "framer-motion";
import {
  MapPin,
  Heart,
  Crown,
  Church,
  PartyPopper,
  Clock,
  Calendar,
  Timer,
  Zap,
  Hash,
  Shirt,
  CheckCircle,
  Sparkles,
  Gift,
  Store,
  DollarSign,
  Copy,
  Instagram,
  Music,
} from "lucide-react";

type Props = { data: InvitationData };

export const HashtagSection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);
  const bgImage = data.customization?.hashtagImage
    ? data.customization.hashtagImage.startsWith("http")
      ? `url("${data.customization.hashtagImage}")`
      : `url("${
          import.meta.env.BASE_URL
        }${data.customization.hashtagImage.replace(/^\//, "")}")`
    : undefined;

  return (
    <div className="font-sans text-gray-800 ">
      {/* Hashtag */}
      {caps.features.hashtag && data.hashtag && (
        <section
          className="py-16 px-4"
          style={{
            backgroundImage: bgImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto text-center z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold montserrat-custom text-black/80 mb-6 tracking-wide">
              Comparte Mi Alegría
            </h2>
            <div
              className="w-20 h-1 mx-auto rounded-full mb-8"
              style={{
                background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
              }}
            ></div>

            {/* ✨ Tarjeta del hashtag */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-purple-200/40 max-w-md mx-auto relative"
            >
              <div className="mb-6">
                <Hash
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: data.colors.primary }}
                />
                <h3
                  className="text-2xl font-bold montserrat-custom mb-2"
                  style={{ color: data.colors.primary }}
                >
                  Hashtag Oficial
                </h3>

                <div className="flex items-center justify-center space-x-3">
                  <motion.p
                    animate={{ opacity: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="montserrat-custom text-xl font-semibold tracking-wide bg-clip-text text-transparent"
                    style={{ color: data.colors.primary }}
                  >
                    {data.hashtag}
                  </motion.p>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(data.hashtag!);
                      const toast = document.createElement("div");
                      toast.textContent = "¡Copiado!";
                      toast.className =
                        "fixed bottom-8 right-8 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold z-50 animate-bounce";
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 2000);
                    }}
                    className="p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition"
                    title="Copiar hashtag"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      style={{ color: data.colors.primary }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-2 12h4a2 2 0 002-2v-8a2 2 0 00-2-2h-4a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 🔁 Botones sociales */}
              <div className="flex justify-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                  style={{
                    background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
                  }}
                  onClick={() => {
                    const hashtagText = data.hashtag!.replace("#", "");
                    window.open(
                      `https://www.instagram.com/explore/tags/${hashtagText}/`,
                      "_blank"
                    );
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.5 2C4.46 2 2 4.46 2 7.5v9C2 19.54 4.46 22 7.5 22h9c3.04 0 5.5-2.46 5.5-5.5v-9C22 4.46 19.54 2 16.5 2h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm6.5.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 9a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                  <span>Ver en Instagram</span>
                </motion.button>
              </div>

              {/* Redes adicionales */}
              <div className="flex justify-center space-x-6">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={`https://x.com/intent/post?text=${encodeURIComponent(
                    `¡Celebrando los XV años de ${data.name}! ${data.hashtag}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-800 transition"
                  title="Compartir en X"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2h3.314l-7.227 8.26L22 22h-6.634l-5.197-6.783L4.244 22H.93l7.7-8.8L2 2h6.756l4.713 6.236L18.244 2z" />
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={`https://www.tiktok.com/tag/${data.hashtag.replace(
                    "#",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-800 transition"
                  title="Ver en TikTok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.04 2h3.17c.1 1.23.61 2.26 1.46 3.11.85.85 1.88 1.36 3.11 1.46v3.17c-.97 0-1.9-.15-2.79-.44v7.47c0 1.73-.63 3.21-1.89 4.44C13.85 22.45 12.39 23 10.65 23c-1.73 0-3.2-.55-4.45-1.79C4.96 19.97 4.43 18.5 4.43 16.77c0-1.73.53-3.2 1.78-4.44 1.24-1.25 2.72-1.89 4.45-1.89.21 0 .41.01.61.03v3.3a3.23 3.23 0 00-.61-.06c-.89 0-1.63.31-2.25.92a3.07 3.07 0 00-.94 2.22c0 .91.31 1.65.94 2.27a3.18 3.18 0 002.25.92c.88 0 1.63-.31 2.25-.92a3.07 3.07 0 00.94-2.27V2z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}
    </div>
  );
};
