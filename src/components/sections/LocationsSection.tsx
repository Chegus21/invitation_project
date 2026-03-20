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

export const LocationsSection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);

  const bgImage = data.customization?.locationImage
    ? data.customization.locationImage.startsWith("http")
      ? `url("${data.customization.locationImage}")`
      : `url("${import.meta.env.BASE_URL}${data.customization.locationImage.replace(/^\//, "")}")`
    : undefined;

  return (
    <div className="font-sans text-gray-800 ">
      {/* Ubicaciones con Imágenes y Mapas Interactivos */}
      {caps.features.locations &&
        ((data.churchAddress && data.churchLink) ||
          (data.receptionAddress && data.receptionLink)) && (
          <section
            className="py-16 px-4 bg-gradient-to-r from-pink-50 to-rose-50"
            style={{
              backgroundImage: bgImage,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <img
              src="https://res.cloudinary.com/dwtkygvrh/image/upload/v1773290482/maps_n9clat.png"
              alt="Icono de vestimenta"
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl montserrat-custom font-bold text-black/80 mb-4">
                  Ubicaciones del Evento
                </h2>
                <div
                  className="w-20 h-1 mx-auto rounded-full mb-8"
                  style={{
                    background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
                  }}
                ></div>
                <p className="text-gray-600 text-3xl md:text-4xl mb-16 mx-auto italianno-regular leading-relaxed text-center">
                  Acompáñanos en cada momento especial de este día inolvidable
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Ceremonia Religiosa */}
                {data.customization?.churchImage &&
                  data.churchAddress &&
                  data.churchLink && (
                    <motion.div
                      initial={{ opacity: 0, x: -80 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                      className="bg-white/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-500"
                    >
                      <div
                        className="h-64 relative cursor-pointer group"
                        onClick={() => {
                          if (!data.churchLink) return; // Evita errores si no hay link
                          window.open(
                            `https://maps.app.goo.gl/${encodeURIComponent(
                              data.churchLink,
                            )}`,
                            "_blank",
                          );
                        }}
                      >
                        <img
                          src={
                            data.customization.churchImage.startsWith("http")
                              ? data.customization.churchImage
                              : `${
                                  import.meta.env.BASE_URL
                                }${data.customization.churchImage.replace(
                                  /^\//,
                                  "",
                                )}`
                          }
                          alt="Recepción y fiesta"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-16 h-16 drop-shadow-lg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 2l3 6h6l-4.5 4 1.5 6L12 14l-6 4 1.5-6L3 8h6l3-6z"
                            />
                          </svg>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm rounded-lg p-3 text-center">
                          <h3 className="text-white font-bold montserrat-custom text-lg">
                            Ceremonia Religiosa
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 text-center">
                        <p className="text-black/80 montserrat-custom text-base mb-1">
                          <strong>Hora:</strong>{" "}
                          {
                            data.timeline?.find((e) =>
                              e.event.toLowerCase().includes("ceremonia"),
                            )?.time
                          }
                        </p>
                        <p className="text-black/80 montserrat-custom text-sm mb-4">
                          {data.churchAddress}
                        </p>
                        <button
                          onClick={() => {
                            if (!data.churchLink) return; // Evita errores si no hay link
                            window.open(
                              `https://maps.app.goo.gl/${encodeURIComponent(
                                data.churchLink,
                              )}`,
                              "_blank",
                            );
                          }}
                          className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                          style={{
                            background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
                          }}
                        >
                          <MapPin className="w-5 h-5" />
                          <span>Ver en Google Maps</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                {/* Recepción */}
                {data.customization?.receptionImage &&
                  data.receptionAddress &&
                  data.receptionLink && (
                    <motion.div
                      initial={{ x: 80, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                      viewport={{ once: true }}
                      className="bg-white/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-500"
                    >
                      <div
                        className="h-64 relative cursor-pointer group"
                        onClick={() => {
                          if (!data.receptionLink) return; // Evita errores si no hay link
                          window.open(
                            `https://maps.app.goo.gl/${encodeURIComponent(
                              data.receptionLink,
                            )}`,
                            "_blank",
                          );
                        }}
                      >
                        <img
                          src={
                            data.customization.receptionImage.startsWith("http")
                              ? data.customization.receptionImage
                              : `${
                                  import.meta.env.BASE_URL
                                }${data.customization.receptionImage.replace(
                                  /^\//,
                                  "",
                                )}`
                          }
                          alt="Recepción y fiesta"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {/* Icono de corona */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-16 h-16 drop-shadow-lg"
                          >
                            <path d="M5 20h14a1 1 0 0 0 1-1v-3.382l-2.447 1.225a1 1 0 0 1-1.21-.21L12 12.618l-4.343 3.015a1 1 0 0 1-1.21.21L4 15.618V19a1 1 0 0 0 1 1ZM4 6a2 2 0 1 1 3.874.808l2.46 2.46 1.148-3.434a2 2 0 1 1 3.036 0l1.148 3.434 2.46-2.46A2 2 0 1 1 20 6c0 .07-.004.14-.012.208l-1 8a1 1 0 0 1-.53.78L12 19l-6.458-4.012a1 1 0 0 1-.53-.78l-1-8A2.01 2.01 0 0 1 4 6Z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm rounded-lg p-3 text-center">
                          <h3 className="text-white font-bold montserrat-custom text-lg">
                            Recepción y Fiesta
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 text-center">
                        <p className="text-black/80 text-base montserrat-custom mb-1">
                          <strong>Hora:</strong>{" "}
                          {data.timeline?.find((e) =>
                            e.event.toLowerCase().includes("recepción"),
                          )?.time || "17:00"}
                        </p>
                        <p className="text-black/80 montserrat-custom text-sm mb-4">
                          {data.receptionAddress}
                        </p>
                        <button
                          onClick={() => {
                            if (!data.receptionLink) return; // Evita errores si no hay link
                            window.open(
                              `https://maps.app.goo.gl/${encodeURIComponent(
                                data.receptionLink,
                              )}`,
                              "_blank",
                            );
                          }}
                          className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                          style={{
                            background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
                          }}
                        >
                          <MapPin className="w-5 h-5" />
                          <span>Ver en Google Maps</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
              </div>
            </div>
          </section>
        )}
    </div>
  );
};
