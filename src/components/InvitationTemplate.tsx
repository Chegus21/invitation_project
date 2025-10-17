import React, { useEffect, useState } from "react";
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

interface InvitationTemplateProps {
  data: {
    name: string;
    eventDate: string;
    churchAddress: string;
    churchLink: string;
    receptionAddress: string;
    receptionLink: string;
    timeline: { time: string; event: string }[];
    phrase1?: string;
    hashtag?: string;
    dressCode?: string;
    giftRegistry?: string[];
    giftLink?: string[];
    godparentsNames?: { name: string; image?: string }[];
    parentsNames?: string[];
    phone: string;
    whatsapp: string;
    googleFormsLink: string;
    musicLink?: string;
    bankTransferDetails?: {
      clabe: string;
      cardNumber: string;
      bank: string;
    };
    customization?: {
      headerImage?: string;
      countdownImage?: string;
      churchImage?: string;
      receptionImage?: string;
      galleryImages?: string[];
      calendarImage?: string;
      godparentsBackgroundImages?: string;
      locationImage?: string;
      timelineImage?: string;
      hashtagImage?: string;
      dressCodeImage?: string;
      giftRegistryImage?: string;
      specialThanksImage?: string;
      rsvpImage?: string;
      image1?: string;
      text1?: string;
      image2?: string;
      text2?: string;
      image3?: string;
      text3?: string;
    };
  };
}

const InvitationTemplate: React.FC<InvitationTemplateProps> = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [eventPassed, setEventPassed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [passedEvents, setPassedEvents] = useState<boolean[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);

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

  // Carousel auto-slide
  useEffect(() => {
    const images = data.customization?.galleryImages;
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.customization?.galleryImages]);

  // Timeline passed events
  useEffect(() => {
    const checkPassed = () => {
      const now = new Date();
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

  // Music Player
  useEffect(() => {
    if (!data.musicLink) return;

    const audio = new Audio(`${import.meta.env.BASE_URL}${data.musicLink.replace(/^\//, '')}`);
    audio.autoplay = true;
    audio.loop = true;
    audio.muted = false;

    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));

    setPlayer(audio);

    

    return () => {
      audio.pause();
      audio.removeEventListener("play", () => setIsPlaying(true));
      audio.removeEventListener("pause", () => setIsPlaying(false));
    };
  }, [data.musicLink]);

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

  // 📅 Añadir al Calendario
  const addToCalendar = (): void => {
    const eventDate = new Date(data.eventDate);
    const start = eventDate.toISOString().replace(/[-:]/g, "").split(".")[0];
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000); // +4 hours
    const end = endDate.toISOString().replace(/[-:]/g, "").split(".")[0];
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:XV Años de ${data.name}
DTSTART:${start}
DTEND:${end}
LOCATION:${data.receptionAddress}
DESCRIPTION:Evento especial de XV Años
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `XV_${data.name}.ics`;
    link.click();
  };

  const addToGoogleCalendar = (): void => {
    const eventDate = new Date(data.eventDate);
    const start = eventDate.toISOString().replace(/[-:]/g, "").split(".")[0];
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000);
    const end = endDate.toISOString().replace(/[-:]/g, "").split(".")[0];

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=XV Años de ${encodeURIComponent(
      data.name
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      "Evento especial de XV Años. ¡No faltes!"
    )}&location=${encodeURIComponent(data.receptionAddress || "")}`;

    window.open(googleUrl, "_blank");
  };

  const addToAppleCalendar = () => {
    const eventDate = new Date(data.eventDate);
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000);

    const pad = (num: number) => String(num).padStart(2, "0");
    const formatDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(
        d.getUTCDate()
      )}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(
        d.getUTCSeconds()
      )}Z`;

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TuSitio//InvitacionXV//ES
BEGIN:VEVENT
UID:${Date.now()}@tusitio.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(eventDate)}
DTEND:${formatDate(endDate)}
SUMMARY:XV Años de ${data.name}
DESCRIPTION:Evento especial de XV Años. ¡No faltes!
LOCATION:${data.receptionAddress || ""}
END:VEVENT
END:VCALENDAR
`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `XV_${data.name.replace(/\s+/g, "_")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addToOutlookCalendar = (): void => {
    const eventDate = new Date(data.eventDate);
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000);
    const start = eventDate.toISOString();
    const end = endDate.toISOString();

    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
      "XV Años de " + data.name
    )}&body=${encodeURIComponent(
      "Evento especial de XV Años. ¡No faltes!"
    )}&startdt=${start}&enddt=${end}&location=${encodeURIComponent(
      data.receptionAddress || ""
    )}`;

    window.open(outlookUrl, "_blank");
  };

  // 📅 Generar calendario del mes
  const generateCalendar = (): {
    year: number;
    month: number;
    days: (number | null)[];
    eventDay: number;
  } => {
    const eventDate = new Date(data.eventDate);
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth();
    const eventDay = eventDate.getDate();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = firstDay.getDay(); // 0 = Sunday
    const totalDays = lastDay.getDate();

    const days: (number | null)[] = [];
    // Empty cells for days before first day
    for (let i = 0; i < startDate; i++) {
      days.push(null);
    }
    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }

    return { year, month, days, eventDay };
  };

  return (
    <div className="font-sans text-gray-800 ">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg"
        style={{
          backgroundImage: data.customization?.headerImage
            ? `url("${import.meta.env.BASE_URL}${data.customization.headerImage.replace(/^\//, '')}")`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Marco blanco interno */}
        <div className="absolute inset-3 md:inset-5 border-4 border-white rounded-lg pointer-events-none"></div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-6xl md:text-9xl text-white mb-2 drop-shadow-lg pattaya-regular">
            {data.name}
          </p>
          <h1 className="text-2xl md:text-3xl montserrat-custom text-white drop-shadow-lg">
            Mis XV Años
          </h1>
        </div>
      </motion.header>

      {/* Nuestros Padres */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-50/50 to-pink-50/50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black/80 mb-6 tracking-wide">
            Nuestros Padres
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-8"></div>

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
                Con el amor y el apoyo incondicional de quienes nos dieron la vida
              </p>
            </div>

            <div className="space-y-4">
              {data.parentsNames && data.parentsNames.map((parent, index) => (
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

      {/* Countdown */}
      <section
        aria-label="Cuenta regresiva para el evento"
        className="relative py-16 px-4 bg-gradient-to-r"
        style={{
          backgroundImage: data.customization?.countdownImage
            ? 
            `url("${import.meta.env.BASE_URL}${data.customization.countdownImage.replace(/^\//, '')}")`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
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

      {/* Calendario del Evento */}
      <section
        className="py-16 px-4 bg-gradient-to-r from-rose-50/50 to-pink-50/50"
        style={{
          backgroundImage: data.customization?.calendarImage
            ? 
            `url("${import.meta.env.BASE_URL}${data.customization.calendarImage.replace(/^\//, '')}")`
            : undefined,
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
          className="max-w-md mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl montserrat-custom font-bold text-black/80 mb-6 tracking-wide">
            Calendario del Evento
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-8"></div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/30 w-full"
          >
            {(() => {
              const { year, month, days, eventDay } = generateCalendar();
              const monthNames = [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
              ];
              const dayNames = [
                "Dom",
                "Lun",
                "Mar",
                "Mié",
                "Jue",
                "Vie",
                "Sáb",
              ];

              return (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl montserrat-custom text-black/80 mb-1">
                      {monthNames[month]} {year}
                    </h3>
                    <div className="text-sm text-gray-600 italic">
                      ¡La gran celebración será el{" "}
                      <span className="font-bold">{eventDay}</span> de{" "}
                      {monthNames[month]}!
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-6 text-center">
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className="text-xs font-semibold text-gray-500 py-1"
                      >
                        {day}
                      </div>
                    ))}
                    {days.map((day, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: day === eventDay ? 1.1 : 1.05 }}
                        className={`relative text-sm py-2 rounded-lg transition-all duration-300 ${
                          day === eventDay
                            ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white font-bold shadow-lg flex flex-col items-center justify-center"
                            : day
                            ? "text-gray-700 hover:bg-rose-100"
                            : ""
                        }`}
                      >
                        {day === eventDay && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-yellow-400 mb-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l3 6h6l-4.5 4 1.5 6L12 14l-6 4 1.5-6L3 8h6z" />
                          </svg>
                        )}
                        {day || ""}
                      </motion.div>
                    ))}
                  </div>

                  {/* 🗓️ Botones para agregar al calendario */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addToGoogleCalendar}
                      className="flex items-center justify-center w-full bg-[#EA4335]/90 hover:bg-[#EA4335] text-white py-3 rounded-xl font-semibold shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M21.35 11.1H12v2.9h5.35c-.25 1.25-.97 2.31-2.07 3.01v2.49h3.34c1.96-1.81 3.09-4.47 3.09-7.65 0-.65-.06-1.29-.17-1.9z" />
                        <path d="M12 22c2.7 0 4.97-.9 6.63-2.45l-3.34-2.49c-.92.62-2.1.99-3.29.99-2.53 0-4.68-1.71-5.45-4.01H3.1v2.54C4.74 19.98 8.1 22 12 22z" />
                        <path d="M6.55 13.99c-.2-.6-.32-1.24-.32-1.99s.12-1.39.32-1.99V7.47H3.1A9.97 9.97 0 0 0 2 12c0 1.63.39 3.16 1.1 4.53l3.45-2.54z" />
                        <path d="M12 4.01c1.47 0 2.79.51 3.84 1.51l2.86-2.86C16.97 1.42 14.7.5 12 .5 8.1.5 4.74 2.52 3.1 5.46l3.45 2.54C7.32 5.72 9.47 4.01 12 4.01z" />
                      </svg>
                      Google
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addToOutlookCalendar}
                      className="flex items-center justify-center w-full bg-[#0078D4]/90 hover:bg-[#0078D4] text-white py-3 rounded-xl font-semibold shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 4H8c-1.1 0-2 .9-2 2v2H3v8h3v2c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 12H8V8h13v8z" />
                      </svg>
                      Outlook
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addToAppleCalendar}
                      className="flex items-center justify-center w-full bg-[#555]/90 hover:bg-[#000] text-white py-3 rounded-xl font-semibold shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.5 2c-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1.1.1 2.3-.5 3-1.3.6-.8 1-1.8.9-2.9-.2-.1-.3-.1-.4 0zM20 17.5c-.4.9-.8 1.7-1.4 2.5-.7 1-1.6 2-2.8 2-1.1 0-1.4-.6-2.8-.6s-1.8.6-2.8.6c-1.1 0-2-1-2.8-2-1-1.3-1.8-2.9-2.1-4.5-.3-1.3-.3-2.7.3-3.9.7-1.4 2-2.4 3.4-2.4 1.1 0 2 .7 2.8.7s1.9-.8 3.2-.7c1.1.1 2.1.7 2.8 1.7-.7.4-1.4 1.1-1.7 2-.4 1.2-.1 2.5.8 3.4.5.5 1.2.8 2 .8.2 0 .4 0 .5-.1z" />
                      </svg>
                      Apple (.ics)
                    </motion.button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      </section>

      {/* Sección personalizada 1 */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center 
             bg-center bg-cover rounded-lg overflow-hidden"
        style={{
          backgroundImage: data.customization?.image1
            ? 
            `url("${import.meta.env.BASE_URL}${data.customization.image1.replace(/^\//, '')}")`
            : undefined,
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
          {data.customization?.text1 && (
            <p
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl montserrat-custom leading-snug 
                 [text-shadow:_0_2px_4px_rgb(0_0_0_/_70%)]"
            >
              {data.customization.text1}
            </p>
          )}
        </motion.div>
      </motion.section>

      {/* Padrinos Interactivos */}
      <section
        className="py-20 px-6 bg-gradient-to-br from-pink-50/30 via-rose-50/20 to-white"
        style={{
          backgroundImage: data.customization?.godparentsBackgroundImages
            ? `url("${import.meta.env.BASE_URL}${data.customization.godparentsBackgroundImages.replace(/^\//, '')}")`
            : undefined,
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
            Nuestros Padrinos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full mb-12"></div>
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

      {/* Ubicaciones con Imágenes y Mapas Interactivos */}
      <section
        className="py-16 px-4 bg-gradient-to-r from-pink-50 to-rose-50"
        style={{
          backgroundImage: data.customization?.locationImage
            ? `url("${import.meta.env.BASE_URL}${data.customization.locationImage.replace(/^\//, '')}")`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl montserrat-custom font-bold text-black/80 mb-4">
              Ubicaciones del Evento
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
            <p className="text-gray-600 text-3xl md:text-4xl mb-16 mx-auto italianno-regular leading-relaxed text-center">
              Acompáñanos en cada momento especial de este día inolvidable
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Ceremonia Religiosa */}
            {data.customization?.churchImage && (
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
                  onClick={() =>
                    window.open(
                      `https://maps.app.goo.gl/${encodeURIComponent(
                        data.churchLink
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <img
                    src={
                      data.customization.churchImage.startsWith("http")
                        ? data.customization.churchImage
                        : `${import.meta.env.BASE_URL}${data.customization.churchImage.replace(/^\//, '')}`
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
                    <strong>Hora:</strong> {data.timeline[0]?.time || "17:00"}
                  </p>
                  <p className="text-black/80 montserrat-custom text-sm mb-4">
                    {data.churchAddress}
                  </p>
                  <button
                    onClick={() =>
                      window.open(
                        `https://maps.app.goo.gl/${encodeURIComponent(
                          data.churchLink
                        )}`,
                        "_blank"
                      )
                    }
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Ver en Google Maps</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Recepción */}
            {data.customization?.receptionImage && (
              <motion.div
                initial={{ x: 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-500"
              >
                <div
                  className="h-64 relative cursor-pointer group"
                  onClick={() =>
                    window.open(
                      `https://maps.app.goo.gl/${encodeURIComponent(
                        data.receptionLink
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <img
                    src={
                      data.customization.receptionImage.startsWith("http")
                        ? data.customization.receptionImage
                        : `${import.meta.env.BASE_URL}${data.customization.receptionImage.replace(/^\//, '')}`
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
                    <strong>Hora:</strong> {data.timeline[1]?.time || "20:00"}
                  </p>
                  <p className="text-black/80 montserrat-custom text-sm mb-4">
                    {data.receptionAddress}
                  </p>
                  <button
                    onClick={() =>
                      window.open(
                        `https://maps.app.goo.gl/${encodeURIComponent(
                        data.receptionLink
                        )}`,
                        "_blank"
                      )
                    }
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
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

      {/* Sección personalizada 2 */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center 
             bg-center bg-cover rounded-lg overflow-hidden"
        style={{
          backgroundImage: data.customization?.image2
            ? `url("${import.meta.env.BASE_URL}${data.customization.image2.replace(/^\//, '')}")`
            : undefined,
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

      {/* Itinerario */}
      <section
        className="relative py-20 px-6 overflow-hidden"
        style={{
          backgroundImage: data.customization?.timelineImage
            ? `url("${import.meta.env.BASE_URL}${data.customization.timelineImage.replace(/^\//, '')}")`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Fondo con glassmorphism y gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/40 via-rose-50/30 to-purple-50/40 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>

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
            className="h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 mx-auto rounded-full mb-12"
          ></motion.div>
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
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 via-pink-400 to-purple-500 rounded-full shadow-lg"></div>

            {data.timeline.map((item, index) => {
              const passed = passedEvents[index] || false;
              const isCurrent =
                index === passedEvents.findIndex((p) => !p) - 1 ||
                (passedEvents.every((p) => p) &&
                  index === data.timeline.length - 1);
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

      {/* Hashtag */}
      {data.hashtag &&
        (() => {
          const hashtag = data.hashtag!;
          return (
            <section
              className="py-16 px-4"
              style={{
                backgroundImage: data.customization?.hashtagImage
                  ? `url("${import.meta.env.BASE_URL}${data.customization.hashtagImage.replace(/^\//, '')}")`
                  : undefined,
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
                  Comparte Nuestra Alegría
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-10"></div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-purple-200/40 max-w-md mx-auto relative"
                >
                  {/* Hashtag principal */}
                  <div className="mb-6">
                    <Hash className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold montserrat-custom text-purple-700 mb-2">
                      Hashtag Oficial
                    </h3>

                    {/* ✨ Hashtag con botón de copia */}
                    <div className="flex items-center justify-center space-x-3">
                      <motion.p
                        animate={{ opacity: [1, 0.8, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-purple-600 montserrat-custom text-xl font-semibold tracking-wide bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                      >
                        {hashtag}
                      </motion.p>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(hashtag);
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
                          className="w-5 h-5 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
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

                  {/* 🔁 Botón principal de compartir */}
                  <div className="flex justify-center mb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                      onClick={() => {
                        const text = `¡Celebrando los XV años de ${data.name}! ${hashtag}`;
                        const url = window.location.href;
                        window.open(
                          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            text
                          )}&url=${encodeURIComponent(url)}`,
                          "_blank"
                        );
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      <span>Compartir</span>
                    </motion.button>
                  </div>

                  {/* 💬 Integración social ampliada */}
                  <div className="flex justify-center space-x-6">
                    {/* Instagram */}
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={`https://www.instagram.com/explore/tags/${hashtag.replace(
                        "#",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700 transition"
                      title="Ver en Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.5 2C4.46 2 2 4.46 2 7.5v9C2 19.54 4.46 22 7.5 22h9c3.04 0 5.5-2.46 5.5-5.5v-9C22 4.46 19.54 2 16.5 2h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm6.5.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 9a3 3 0 100 6 3 3 0 000-6z" />
                      </svg>
                    </motion.a>

                    {/* TikTok */}
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href="https://www.tiktok.com/tag/"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          `https://www.tiktok.com/tag/${hashtag.replace(
                            "#",
                            ""
                          )}`,
                          "_blank"
                        );
                      }}
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
          );
        })()}

      {/* Sección personalizada 3 */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center 
             bg-center bg-cover rounded-lg overflow-hidden"
        style={{
          backgroundImage: data.customization?.image3
            ? `url("${import.meta.env.BASE_URL}${data.customization.image3.replace(/^\//, '')}")`
            : undefined,
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
          {data.customization?.text3 && (
            <p
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl montserrat-custom leading-snug 
                   [text-shadow:_0_2px_4px_rgb(0_0_0_/_70%)]"
            >
              {data.customization.text3}
            </p>
          )}
        </motion.div>
      </motion.section>

      {/* Dress Code */}
      {data.dressCode && (
        <section
          aria-label="Código de vestimenta"
          className="py-16 px-4 bg-gradient-to-r from-indigo-100/50 to-purple-100/50"
          style={{
            backgroundImage: data.customization?.dressCodeImage
              ? `url("${import.meta.env.BASE_URL}${data.customization.dressCodeImage.replace(/^\//, '')}")`
              : undefined,
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
            <h2 className="text-4xl font-serif montserrat-custom bg-clip-text bg-gradient-to-r text-black/80 mb-6 tracking-wide">
              Código de Vestimenta
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full mb-12"></div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-indigo-100/50 max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <Shirt
                  aria-label="Icono de vestimenta"
                  className="w-16 h-16 text-indigo-600 mx-auto mb-4"
                />
                <h3 className="text-2xl montserrat-custom text-indigo-700 mb-4">
                  ¿Qué vestir?
                </h3>
                <p className="text-gray-700 montserrat-custom leading-relaxed">
                  {data.dressCode}
                </p>
              </div>

              {/* Opciones */}
              <div className="pattaya-regular grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    icon: CheckCircle,
                    label: "Elegante",
                    gradient: "from-indigo-400 to-purple-500",
                  },
                  {
                    icon: Heart,
                    label: "Cómodo",
                    gradient: "from-purple-400 to-pink-500",
                  },
                  {
                    icon: Sparkles,
                    label: "Festivo",
                    gradient: "from-pink-400 to-rose-500",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-center"
                  >
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-3 shadow-md`}
                    >
                      <item.icon
                        className="w-7 h-7 text-white"
                        aria-label={item.label}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Mesa de Regalos */}
      {data.giftRegistry && (
        <section
          className="py-16 px-4 bg-gradient-to-r from-emerald-100/50 to-teal-100/50"
          style={{
            backgroundImage: data.customization?.giftRegistryImage
              ? `url("${import.meta.env.BASE_URL}${data.customization.giftRegistryImage.replace(/^\//, '')}")`
              : undefined,
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
            <h2 className="text-4xl font-serif montserrat-custom text-black/80 mb-6 tracking-wide">
              Mesa de Regalos
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-12"></div>

            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-emerald-100/50 max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <Gift className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl montserrat-custom text-emerald-700 mb-4">
                  Tu Presencia es el Mejor Regalo
                </h3>
                <p className="text-gray-700 text-lg montserrat-custom leading-relaxed mb-6">
                  {data.giftRegistry.length > 0
                    ? "Si deseas obsequiarnos algo especial, puedes elegir entre estas opciones:"
                    : "Si deseas contribuir, puedes hacerlo mediante transferencia bancaria:"}
                </p>
              </div>

              <div
                className={`grid gap-4 ${
                  data.giftRegistry.length > 0
                    ? "grid-cols-1 md:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {data.giftRegistry.length > 0 &&
                  data.giftRegistry.map((registry: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Store className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="montserrat-custom text-emerald-700 mb-2">
                        {registry}
                      </h4>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm"
                        onClick={() => {
                          // Aquí se podría implementar búsqueda en la tienda específica
                          window.open(
                            data.giftLink && data.giftLink[index]
                              ? data.giftLink[index]
                              : "#",
                            "_blank"
                          );
                        }}
                      >
                        Ver Opciones
                      </motion.button>
                    </motion.div>
                  ))}

                {/* Opción de Transferencia Bancaria */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: (data.giftRegistry?.length || 0) * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="montserrat-custom text-emerald-700 mb-2">
                    Lluvia de sobres
                  </h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm"
                    onClick={() => setShowBankDetails(true)}
                  >
                    Ver
                  </motion.button>
                </motion.div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/50">
                <p className="text-black-700 text-3xl italianno-regular">
                  Tu presencia y bendiciones son lo más importante para nosotros
                  en este día especial.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Galería */}
      <section
        className="py-20 px-6 bg-white"
        style={{
          backgroundImage: data.customization?.specialThanksImage
            ? `url("${import.meta.env.BASE_URL}${data.customization.specialThanksImage.replace(/^\//, '')}")`
            : undefined,
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
          <h2 className="text-4xl font-bold text-gray-800 mb-4 montserrat-custom">
            Momentos Especiales
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-12"></div>
          <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto pattaya-regular">
            Una colección de recuerdos que esperamos compartir contigo en este
            día tan especial
          </p>
        </motion.div>

        {(() => {
          const images = data.customization?.galleryImages || [];
          return images.length > 0 ? (
            <div
              id="default-carousel"
              className="relative w-full max-w-7xl mx-auto"
              data-carousel="slide"
            >
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96 lg:h-[500px] xl:h-[600px]">
                {images.map((image, index) => {
                  const imageUrl = image.startsWith('http')
                    ? image
                    : `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`;
                  return (
                    <div
                      key={index}
                      className={`absolute block w-full h-full duration-1000 ease-in-out ${
                        index === currentIndex
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0"
                      }`}
                      data-carousel-item
                    >
                      <img
                        src={imageUrl}
                        className="w-full h-full object-contain cursor-pointer"
                        alt={`Foto ${index + 1}`}
                        onClick={() => setSelectedImage(imageUrl)}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? "bg-white" : "bg-gray-400"
                    }`}
                    aria-current={index === currentIndex ? "true" : "false"}
                    aria-label={`Slide ${index + 1}`}
                    data-carousel-slide-to={index}
                    onClick={() => setCurrentIndex(index)}
                  ></button>
                ))}
              </div>
              <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + images.length) % images.length
                  )
                }
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % images.length)
                }
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          ) : null;
        })()}

        {(data.customization?.galleryImages || []).length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              La galería de fotos estará disponible próximamente
            </p>
          </motion.div>
        )}
      </section>

      {/* Confirmar Asistencia */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-green-400 to-blue-500"
        style={{
          backgroundImage: data.customization?.rsvpImage
            ? `url("${import.meta.env.BASE_URL}${data.customization.rsvpImage.replace(/^\//, '')}")`
            : undefined,
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
          <h2 className="text-4xl montserrat-custom font-bold text-black mb-4 tracking-wide">
            Confirmar Asistencia
          </h2>
          <div className="w-24 h-1 bg-black mx-auto rounded-full mb-8"></div>
          <p className="text-black/90 text-lg mb-12 max-w-2xl mx-auto pattaya-regular">
            Tu presencia es muy importante para nosotros. Confirma tu asistencia
            de la manera que prefieras.
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(data.googleFormsLink, "_blank")}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg"
              >
                <span className="text-2xl">✅</span>
                <span>Sí, asistiré</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMessage(true)}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg"
              >
                <span className="text-2xl">❌</span>
                <span>No podré</span>
              </motion.button>
            </div>
            {/*
            <div className="text-center">
              <p className="text-gray-600 mb-4">O confirma de otra manera:</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={`tel:${data.phone}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>📞</span>
                  <span>Teléfono</span>
                </a>
                <a
                  href={`https://wa.me/${
                    data.whatsapp
                  }?text=Hola, quiero confirmar asistencia a los XV de ${encodeURIComponent(
                    data.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            */}
          </div>
        </motion.div>
      </section>

      {/* Modal Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Vista ampliada"
            className="max-h-[90%] max-w-[90%] rounded-xl shadow-2xl"
          />
        </motion.div>
      )}

      {/* Message Modal */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowMessage(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-2xl mb-4 montserrat-custom text-gray-800">
              Gracias por avisarnos, te extrañaremos 💔
            </p>
            <button
              onClick={() => setShowMessage(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      )}

      {/* Sobres sin info */}

      {showBankDetails && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    onClick={() => setShowBankDetails(false)}
  >
    <div
      className="bg-white rounded-3xl p-10 shadow-xl max-w-md mx-4 text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-3xl font-semibold mb-5 text-emerald-700 tracking-wide">
        Lluvia de Sobres
      </h3>
      <p className="text-gray-700 leading-relaxed text-lg italic">
        El mejor regalo es tu presencia en este día tan especial.  
        Pero si deseas obsequiar algo más,  
        un sobre con tu cariño será recibido con profunda gratitud.
      </p>
      <button
        onClick={() => setShowBankDetails(false)}
        className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-8 rounded-full font-medium transition-all shadow-sm"
      >
        Cerrar
      </button>
    </div>
  </motion.div>
)}

{/* Bank Details Modal 
      {showBankDetails && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    onClick={() => setShowBankDetails(false)}
  >
    <div
      className="bg-white rounded-3xl p-10 shadow-xl max-w-md mx-4 text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-3xl font-semibold mb-5 text-emerald-700 tracking-wide">
        Lluvia de Sobres
      </h3>
      {data.bankTransferDetails ? (
        <div className="space-y-4 text-left">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Banco</p>
            <p className="font-semibold">
              {data.bankTransferDetails.bank}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">CLABE</p>
            <p className="font-mono font-semibold">
              {data.bankTransferDetails.clabe}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">
              Número de Tarjeta
            </p>
            <p className="font-mono font-semibold">
              {data.bankTransferDetails.cardNumber}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 leading-relaxed text-lg italic">
          El mejor regalo es tu presencia en este día tan especial.  
          Pero si deseas obsequiar algo más,  
          un sobre con tu cariño será recibido con profunda gratitud.
        </p>
      )}
      <button
        onClick={() => setShowBankDetails(false)}
        className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-8 rounded-full font-medium transition-all shadow-sm"
      >
        Cerrar
      </button>
    </div>
  </motion.div>
)}

*/}



      {/* Bank Details Modal 
      {showBankDetails && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowBankDetails(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6 text-emerald-600">
              Lluvia de Sobres
            </h3>
            {data.bankTransferDetails ? (
              <div className="space-y-4 text-left">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Banco</p>
                  <p className="font-semibold">
                    {data.bankTransferDetails.bank}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">CLABE</p>
                  <p className="font-mono font-semibold">
                    {data.bankTransferDetails.clabe}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">
                    Número de Tarjeta
                  </p>
                  <p className="font-mono font-semibold">
                    {data.bankTransferDetails.cardNumber}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">
                Los datos bancarios no están disponibles en este momento.
              </p>
            )}
            <button
              onClick={() => setShowBankDetails(false)}
              className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      )}

      */}


      {/* Footer clásico minimalista */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center py-10 bg-white border-t border-gray-200"
      >
        <h2 className="text-2xl md:text-3xl font-serif text-gray-800 tracking-wide">
          ESSENCIAL PUEBLA
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base italic">
          Invitaciones digitales personalizadas con estilo y elegancia.
        </p>
      </motion.footer>

      {/* Hidden YouTube Player */}
      {data.musicLink && (
        <div id="youtube-player" style={{ display: "none" }}></div>
      )}

      {/* Background Music */}
      {data.musicLink && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (player) {
                if (isPlaying) {
                  player.pause();
                } else {
                  player.play();
                }
              }
            }}
            className={`w-14 h-14 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center ${
              isPlaying ? "animate-spin" : ""
            }`}
          >
            {isPlaying ? (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.25 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            )}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export { InvitationTemplate };
export default InvitationTemplate;
