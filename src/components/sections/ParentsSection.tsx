import React from "react";
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
import { InvitationData, getCapabilities } from "../../data/invitations";
import { motion } from "framer-motion";

type Props = { data: InvitationData; title?: string };

export const ParentsSection: React.FC<Props> = ({ data, title = "Padres" }) => {
  const caps = getCapabilities(data);
  if (!caps.features.parentsSection) return null;

  const items = (data.parentsNames || []).map((n) => ({
    name: n,
    image: undefined as string | undefined,
  }));
  const padrinos = data.godparentsNames || [];
  const all = [...items, ...padrinos];

  if (all.length === 0) return null;

  const bgImage = data.customization?.godparentsBackgroundImages
  ? data.customization.godparentsBackgroundImages.startsWith("http")
    ? `url("${data.customization.godparentsBackgroundImages}")`
    : `url("${import.meta.env.BASE_URL}${data.customization.godparentsBackgroundImages.replace(/^\//, "")}")`
  : undefined;

  

  return (
    <div className="font-sans text-gray-800 ">
      <section className="py-16 px-4 bg-gradient-to-r from-rose-50/50 to-pink-50/50"
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
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black/80 mb-6 tracking-wide">
            Mis Padres
          </h2>
          <div
            className="w-20 h-1 mx-auto rounded-full mb-8"
            style={{
              background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
            }}
          ></div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 max-w-2xl mx-auto"
          >
            <div className="mb-6">
              <Heart className="w-16 h-16 text-rose-600 mx-auto mb-4" />
              <p className="text-2xl md:text-3xl italianno-regular text-black/80 drop-shadow-lg mt-8r">
                Con el amor y el apoyo incondicional de quienes nos dieron la
                vida
              </p>
            </div>

            <div className="space-y-4">
              {data.parentsNames &&
                data.parentsNames.map((parent, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-4 border border-rose-200/50"
                  >
                    <p className="text-rose-700 font-semibold montserrat-custom text-lg">
                      {parent}
                    </p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section
        className="py-20 px-6 bg-gradient-to-br from-pink-50/30 via-rose-50/20 to-white"
        style={{
  backgroundImage: bgImage,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-black-50 mb-4 font-serif">
            Mis Padrinos
          </h2>
          <div
            className="w-20 h-1 mx-auto rounded-full mb-8"
            style={{
              background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
            }}
          ></div>
          <p className="text-gray-600 text-3xl md:text-4xl mb-16 mx-auto italianno-regular leading-relaxed text-center">
            Personas especiales que nos acompañan en este momento tan importante
            de nuestras vidas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {data.godparentsNames &&
            data.godparentsNames.map((godparent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-pink-200/60 transition-all duration-500 border border-pink-100/50 hover:border-pink-200/60">
                  <div className="text-center">
                    {/* Avatar con imagen opcional */}
                    <div className="relative mb-6">
                      {godparent.image ? (
                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-pink-100 group-hover:ring-pink-200 transition-all duration-300">
                          <img
                            src={godparent.image}
                            alt={`Foto de ${godparent.name}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto ring-4 ring-pink-100 group-hover:ring-pink-200 transition-all duration-300">
                          <Crown
                            className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300"
                            aria-label="Ícono de padrino/madrina"
                          />
                        </div>
                      )}

                      {/* Corazón decorativo */}
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                      </div>
                    </div>

                    {/* Nombre con transición */}
                    <motion.h3
                      className="text-xl font-bold montserrat-custom text-black/80 mb-2 group-hover:text-pink-600 transition-colors duration-300"
                      initial={{ opacity: 0.9 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {godparent.name}
                    </motion.h3>

                    {/* Subtítulo con transición */}
                    <motion.p
                      className="text-sm text-gray-500 montserrat-custom opacity-70 group-hover:opacity-100 group-hover:text-pink-500 transition-all duration-300"
                      initial={{ y: 5, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 0.7 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      Padrino/Madrina
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {(!data.godparentsNames || data.godparentsNames.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-12 h-12 text-pink-400" />
            </div>
            <p className="text-gray-500 text-lg">
              Los padrinos serán anunciados próximamente
            </p>
          </motion.div>
        )}
      </section>
      
    </div>
  );
};
