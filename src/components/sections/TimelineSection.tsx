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

export const TimelineSection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);

  const [passedEvents, setPassedEvents] = useState<boolean[]>([]);

  // Timeline passed events
  useEffect(() => {
    const checkPassed = () => {
      const now = new Date();
      if (!data.timeline || data.timeline.length === 0) {
        setPassedEvents([]);
        return;
      }
      const passed = data.timeline.map((item) => {
        const [hours, minutes] = item.time.split(":").map(Number);
        const eventDateTime = new Date(now);
        eventDateTime.setHours(hours, minutes, 0, 0);
        return now >= eventDateTime;
      });
      setPassedEvents(passed);
    };
    checkPassed();
    const interval = setInterval(checkPassed, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [data.timeline]);

  // Get event icon
  const getEventIcon = (event: string): React.ComponentType<any> => {
    if (event.toLowerCase().includes("ceremonia")) return Church;
    if (
      event.toLowerCase().includes("fiesta") ||
      event.toLowerCase().includes("recepción")
    )
      return PartyPopper;
    return Clock;
  };

  const bgImage = data.customization?.timelineImage
    ? data.customization.timelineImage.startsWith("http")
      ? `url("${data.customization.timelineImage}")`
      : `url("${
          import.meta.env.BASE_URL
        }${data.customization.timelineImage.replace(/^\//, "")}")`
    : undefined;

  return (
    <div className="font-sans text-gray-800 ">
      <section
        className="relative py-20 px-6 overflow-hidden"
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Fondo con glassmorphism y gradiente animado */}
        
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto text-center z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-6 montserrat-custom tracking-wide">
            Itinerario del Evento
          </h2>
          {/* Separador animado */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r mx-auto rounded-full mb-12"
          >
            <div
              className="w-20 h-1 mx-auto rounded-full mb-8"
              style={{
                background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
              }}
            ></div>
          </motion.div>
          <p className="text-gray-700 text-lg md:text-xl mb-16 max-w-3xl mx-auto leading-relaxed montserrat-custom">
            Sigue el progreso del evento en tiempo real con esta elegante línea
            del tiempo
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto z-10">
          <div
            className="relative"
            aria-label="Cronograma del evento de quince años"
          >
            {/* Línea vertical con degradado dinámico */}
            <div
              className="absolute left-8 top-0 bottom-0 w-1 rounded-full shadow-lg"
              style={{
                background: `linear-gradient(to bottom, ${data.colors.primary}, ${data.colors.accent}, ${data.colors.secondary})`,
              }}
            ></div>

            {data.timeline?.map((item, index) => {
              const passed = passedEvents[index] || false;
              const isCurrent =
                index === passedEvents.findIndex((p) => !p) - 1 ||
                (passedEvents.every((p) => p) &&
                  index === (data.timeline?.length ?? 0) - 1);

              const IconComponent = getEventIcon(item.event);

              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  className="relative mb-12 ml-16"
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {/* Círculo con gradiente y microinteracciones */}
                  <motion.div
                    className="absolute -left-12 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg ring-4 ring-white/50"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    aria-label={`Evento ${index + 1}: ${item.event}`}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </motion.div>

                  {/* Carta del evento */}
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-rose-100/50 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      {/* Hora en carta pequeña */}
                      <div className="bg-gradient-to-r from-rose-100 to-pink-100 px-4 py-2 rounded-full text-sm montserrat-custom text-rose-700 shadow-sm">
                        {item.time}
                      </div>
                      {/* Indicador de estado */}
                      {passed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                          aria-label="Evento completado"
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </div>

                    {/* Título destacado */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2 montserrat-custom tracking-wide">
                      {item.event}
                    </h3>
                  </motion.div>
                </motion.li>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
