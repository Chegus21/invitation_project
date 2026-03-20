import React, { useEffect, useState } from "react";
import { InvitationData } from "../../data/invitations";
import { motion } from "framer-motion";
import {
  Church,
  PartyPopper,
  Clock,
  Crown,
  Heart,
  Camera,
  Music,
  Sparkles,
  Utensils
} from "lucide-react";
import confetti from "canvas-confetti";
import { useInView } from "react-intersection-observer";

type Props = { data: InvitationData };

export const TimelineSection: React.FC<Props> = ({ data }) => {
  const [passedEvents, setPassedEvents] = useState<boolean[]>([]);
  const [nightMode, setNightMode] = useState(false);
  const [countdown, setCountdown] = useState("");

  /* -----------------------------
     CUENTA REGRESIVA
  ----------------------------- */

  useEffect(() => {
    if (!data.eventDate) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const event = new Date(data.eventDate).getTime();

      const diff = event - now;

      if (diff <= 0) {
        setCountdown("¡El evento ha comenzado!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [data.eventDate]);

  /* -----------------------------
     EVENTOS PASADOS
  ----------------------------- */

  useEffect(() => {
    const checkPassed = () => {
      const now = new Date();

      if (!data.timeline) return;

      const passed = data.timeline.map((item) => {
        const eventDateTime = new Date(data.eventDate);

        const [hours, minutes] = item.time.split(":").map(Number);

        eventDateTime.setHours(hours, minutes, 0, 0);

        return now >= eventDateTime;
      });

      setPassedEvents(passed);
    };

    checkPassed();

    const interval = setInterval(checkPassed, 10000);

    return () => clearInterval(interval);
  }, [data.timeline, data.eventDate]);

  /* -----------------------------
     CONFETTI + MODO NOCHE
  ----------------------------- */

  useEffect(() => {
    if (!data.timeline) return;

    const fiesta = data.timeline.find((item) =>
      item.event.toLowerCase().includes("fiesta"),
    );

    if (!fiesta) return;

    const [hours, minutes] = fiesta.time.split(":").map(Number);

    const checkFiesta = () => {
      const now = new Date();

      const fiestaTime = new Date(data.eventDate);

      fiestaTime.setHours(hours, minutes, 0, 0);

      if (now >= fiestaTime) {
        setNightMode(true);

        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.6 },
        });
      }
    };

    const interval = setInterval(checkFiesta, 5000);

    return () => clearInterval(interval);
  }, [data]);

  /* -----------------------------
     ICONOS
  ----------------------------- */

  const getEventIcon = (event: string) => {
    const name = event.toLowerCase();

    if (name.includes("misa")) return Church;

    if (name.includes("boda")) return Heart;

    if (name.includes("fiesta") || name.includes("recepción"))
      return PartyPopper;

    if (name.includes("vals")) return Crown;

    if (name.includes("comida") || name.includes("cena") || name.includes("banquete")) return Utensils;

    if (name.includes("brindis")) return Sparkles;

    if (name.includes("foto")) return Camera;

    if (name.includes("baile")) return Music;

    if (name.includes("entrada")) return Heart;

    return Clock;
  };

  /* -----------------------------
     BACKGROUND
  ----------------------------- */

  const bgImage = data.customization?.timelineImage
    ? data.customization.timelineImage.startsWith("http")
      ? `url("${data.customization.timelineImage}")`
      : `url("${import.meta.env.BASE_URL}${data.customization.timelineImage.replace(/^\//, "")}")`
    : undefined;

  const progress =
    data.timeline && data.timeline.length > 0
      ? (passedEvents.filter(Boolean).length / data.timeline.length) * 100
      : 0;

  return (
    <div className="font-sans">
      <section
        className={`relative py-20 px-6 overflow-hidden transition-colors duration-1000 ${
          nightMode ? "bg-black text-white" : "text-gray-800"
        }`}
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

        {/* Cuenta regresiva */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center mb-20"
        >
          <img
              src="https://res.cloudinary.com/dwtkygvrh/image/upload/v1773290477/itinerario_vhujkx.png"
              alt="Icono de vestimenta"
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
          <h2 className="text-4xl font-bold mb-6">Itinerario del Evento</h2>

          
        </motion.div>

        {/* TIMELINE */}

        <div className="relative max-w-4xl mx-auto z-10">
          {/* Línea base */}

          <div className="absolute left-8 top-0 bottom-0 w-1 rounded-full bg-gray-200" />

          {/* Línea progreso */}

          <motion.div
            className="absolute left-8 top-0 w-1 rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${data.colors.primary}, ${data.colors.accent})`,
            }}
            initial={{ height: 0 }}
            animate={{ height: `${progress}%` }}
            transition={{ duration: 1 }}
          />

          <ul>
            {data.timeline?.map((item, index) => {
              const { ref, inView } = useInView({
                threshold: 0.4,
                triggerOnce: true,
              });

              const passed = passedEvents[index] || false;

              const isCurrent =
                index === passedEvents.findIndex((p) => !p) - 1 ||
                (passedEvents.every((p) => p) &&
                  index === data.timeline.length - 1);

              const IconComponent = getEventIcon(item.event);

              return (
                <motion.li
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, x: -80 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7 }}
                  className="relative mb-14 ml-16"
                >
                  {/* Círculo */}

                  <motion.div
                    className={`absolute -left-12 w-9 h-9 rounded-full shadow-lg ring-4 ring-white
${isCurrent ? "bg-pink-500 animate-pulse" : "bg-rose-400"}
`}
                    animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                    transition={{
                      repeat: isCurrent ? Infinity : 0,
                      duration: 1.5,
                    }}
                  />

                  {/* Card */}

                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-300
                    ${
                      isCurrent
                        ? "bg-rose-50 border-rose-400 scale-[1.02]"
                        : "bg-white/90 border-rose-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-rose-100 px-4 py-2 rounded-full text-sm text-rose-700">
                        {item.time}
                      </div>

                      {passed && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          ✓
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-rose-100 text-rose-600">
                        {React.createElement(IconComponent, {
                          className: "w-5 h-5",
                        })}
                      </div>

                      <h3 className="text-xl font-bold">{item.event}</h3>
                    </div>

                    {isCurrent && (
                      <span className="text-xs bg-rose-500 text-white px-3 py-1 rounded-full">
                        En curso
                      </span>
                    )}
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};
