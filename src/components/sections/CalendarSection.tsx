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
import { motion } from "framer-motion";

// Local lightweight type for this component (previously imported from ../data/invitations)
// Keeps only the fields used in this file to avoid a missing-module error.
interface InvitationData {
  eventDate: string | Date;
  name: string;
  receptionAddress?: string;
  customization?: {
    calendarImage?: string;
  };
  colors: {
    primary: string;
    accent: string;
  };
}

interface InvitationTemplateProps {
  data: InvitationData;
}

const CalendarSection: React.FC<InvitationTemplateProps> = ({ data }) => {
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

  const bgImage = data.customization?.calendarImage
    ? data.customization.calendarImage.startsWith("http")
      ? `url("${data.customization.calendarImage}")`
      : `url("${
          import.meta.env.BASE_URL
        }${data.customization.calendarImage.replace(/^\//, "")}")`
    : undefined;

  return (
    <section
      className="py-16 px-4 bg-gradient-to-r from-rose-50/50 to-pink-50/50"
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
        className="max-w-md mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl montserrat-custom font-bold text-black/80 mb-6 tracking-wide">
          Calendario del Evento
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
            const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

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
  );
};

export { CalendarSection };
export default CalendarSection;
