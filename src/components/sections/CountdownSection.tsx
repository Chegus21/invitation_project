import React, { useEffect, useState } from 'react';
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
import { InvitationData, getCapabilities } from '../../data/invitations';
import { motion } from "framer-motion";

interface Props {
  data: InvitationData;
}

const CountdownSection: React.FC<Props> = ({ data }) => {

const caps = getCapabilities(data);

  const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  const [eventPassed, setEventPassed] = useState(false);

  // ⏳ Countdown
  useEffect(() => {
    const targetDate = new Date(data.eventDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setEventPassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };

        // Only update if values have changed to prevent unnecessary re-renders
        setTimeLeft((prev) => {
          if (
            prev.days !== newTimeLeft.days ||
            prev.hours !== newTimeLeft.hours ||
            prev.minutes !== newTimeLeft.minutes ||
            prev.seconds !== newTimeLeft.seconds
          ) {
            return newTimeLeft;
          }
          return prev;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data.eventDate]);

  const bgImage = data.customization?.countdownImage
  ? data.customization.countdownImage.startsWith("http")
    ? `url("${data.customization.countdownImage}")`
    : `url("${import.meta.env.BASE_URL}${data.customization.countdownImage.replace(/^\//, "")}")`
  : undefined;

  return (
    <div className="font-sans text-gray-800 ">
      {/* Countdown */}
      {caps.features.countdown && data.eventDate && (
        <section
          aria-label="Cuenta regresiva para el evento"
          className="relative py-16 px-4 bg-gradient-to-r"
          style={{
  backgroundImage: bgImage,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}}
        >
          <img
              src="https://res.cloudinary.com/dwtkygvrh/image/upload/v1773290465/cuenta_regresiva_xw6cke.png"
              alt="Icono de vestimenta"
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto text-center bg-black/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black/80 mb-6 tracking-wide uppercase">
              Falta muy poco para el gran día
            </h2>

            {eventPassed ? (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-3xl font-normal bg-gradient-to-r text-black bg-clip-text text-transparent animate-bounce montserrat-custom"
              >
                ¡El gran día ha llegado! 🎉
              </motion.div>
            ) : (
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                aria-label="Contadores de tiempo"
              >
                {[
                  { label: "Días", value: timeLeft.days, icon: Calendar },
                  { label: "Horas", value: timeLeft.hours, icon: Timer },
                  { label: "Minutos", value: timeLeft.minutes, icon: Zap },
                  { label: "Segundos", value: timeLeft.seconds, icon: Clock },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.2 }}
                      viewport={{ once: true }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform hover:scale-105 border border-white/20"
                      aria-label={`${item.label} restantes`}
                    >
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Icon
                          className="w-6 h-6 text-black/80"
                          aria-hidden="true"
                        />
                        <span className="text-4xl font-bold text-black/80 drop-shadow">
                          <time dateTime={`${item.value}`}>{item.value}</time>
                        </span>
                      </div>
                      <p className="text-sm text-black/80 uppercase tracking-widest font-light">
                        {item.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <p className="text-2xl md:text-3xl italianno-regular text-black/80 drop-shadow-lg mt-8">
              {data.phrase1}
            </p>
          </motion.div>
        </section>
      )}
    </div>
    
  );
};

export {CountdownSection};
export default CountdownSection;
