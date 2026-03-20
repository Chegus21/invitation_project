import React, { useEffect, useState } from "react";
import { InvitationData, getCapabilities } from "../../data/invitations";
import { motion } from "framer-motion";

type Props = { data: InvitationData };

export const RsvpSection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);
  if (!caps.features.rsvp) return null;

  const [showMessage, setShowMessage] = useState(false);

  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!data.rsvpDeadline) return;

    const deadline = new Date(data.rsvpDeadline);
    const today = new Date();

    const diff = deadline.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setDaysLeft(days);
  }, [data.rsvpDeadline]);

  const deadlineColor =
    daysLeft === null
      ? "text-gray-800"
      : daysLeft <= 3
        ? "text-red-600"
        : daysLeft <= 7
          ? "text-orange-500"
          : "text-green-600";

  const formattedDeadline = data.rsvpDeadline
    ? (() => {
        const [year, month, day] = data.rsvpDeadline.split("-");
        const date = new Date(Number(year), Number(month) - 1, Number(day));

        return new Intl.DateTimeFormat("es-MX", {
          day: "numeric",
          month: "long",
        }).format(date);
      })()
    : null;

  const eventName =
    data.type === "boda"
      ? "su boda 💍"
      : data.type === "quince"
        ? "sus XV años 👑"
        : data.type === "cumple"
          ? "su cumpleaños 🎉"
          : "su evento";

  const phone1 = data.rsvpContacts?.[0]?.phone;
  const phone2 = data.rsvpContacts?.[1]?.phone;

  const name1 = data.rsvpContacts?.[0]?.name;
  const name2 = data.rsvpContacts?.[1]?.name;

  const positiveMessage = `Hola, confirmo que asistiré a ${eventName}`;
  const negativeMessage = `Hola, lamentablemente no podré asistir a ${eventName}`;

  const createWhatsAppLink = (phone: string, message: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const linkYes1 = phone1 ? createWhatsAppLink(phone1, positiveMessage) : null;
  const linkYes2 = phone2 ? createWhatsAppLink(phone2, positiveMessage) : null;

  const linkNo1 = phone1 ? createWhatsAppLink(phone1, negativeMessage) : null;
  const linkNo2 = phone2 ? createWhatsAppLink(phone2, negativeMessage) : null;

  const hasTwoPhones = phone1 && phone2;

  const [rsvpChoice, setRsvpChoice] = useState<"yes" | "no" | null>(null);

  return (
    <div className="font-sans text-gray-800 ">
      <section
        className="py-16 px-4 bg-gradient-to-br from-green-400 to-blue-500"
        style={{
          backgroundImage: data.customization?.rsvpImage
            ? `url("${
                import.meta.env.BASE_URL
              }${data.customization.rsvpImage.replace(/^\//, "")}")`
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
          {data.rsvpDeadline?.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center mb-10"
            >
              <div className="bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-md">
                <p
                  className={`montserrat-custom font-semibold ${deadlineColor}`}
                >
                  ⏳ Confirma antes del {formattedDeadline}
                </p>
              </div>

              {daysLeft !== null && daysLeft > 0 && (
                <p className="text-sm mt-2 text-gray-600 montserrat-custom">
                  Faltan {daysLeft} días
                </p>
              )}
            </motion.div>
          )}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
            {hasTwoPhones && (
              <p className="text-center text-sm text-gray-500 mb-4">
                Confirma tu asistencia con cualquiera de los siguientes
                contactos
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* BOTÓN SÍ */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!hasTwoPhones && linkYes1) {
                    window.open(linkYes1, "_blank");
                  } else {
                    setRsvpChoice("yes");
                  }
                }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg"
              >
                <span className="text-2xl">✅</span>
                <span>Sí, asistiré</span>
              </motion.button>

              {/* BOTÓN NO */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!hasTwoPhones && linkNo1) {
                    window.open(linkNo1, "_blank");
                  } else {
                    setRsvpChoice("no");
                  }
                }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg"
              >
                <span className="text-2xl">❌</span>
                <span>No podré</span>
              </motion.button>
            </div>
            {hasTwoPhones && rsvpChoice && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-50">
                <motion.div
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 200, opacity: 0 }}
                  className="w-full max-w-md mb-6 bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="text-center py-4 text-gray-500 text-sm">
                    ¿Con quién deseas confirmar?
                  </div>

                  <button
                    onClick={() => {
                      window.open(
                        rsvpChoice === "yes" ? linkYes1! : linkNo1!,
                        "_blank",
                      );
                      setRsvpChoice(null);
                    }}
                    className="w-full py-4 text-lg font-semibold hover:bg-gray-100 transition"
                  >
                    📱 {name1}
                  </button>

                  <div className="border-t"></div>

                  <button
                    onClick={() => {
                      window.open(
                        rsvpChoice === "yes" ? linkYes2! : linkNo2!,
                        "_blank",
                      );
                      setRsvpChoice(null);
                    }}
                    className="w-full py-4 text-lg font-semibold hover:bg-gray-100 transition"
                  >
                    📱 {name2}
                  </button>

                  <div className="border-t"></div>

                  <button
                    onClick={() => setRsvpChoice(null)}
                    className="w-full py-4 text-red-500 font-semibold hover:bg-gray-100 transition"
                  >
                    Cancelar
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

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
    </div>
  );
};
