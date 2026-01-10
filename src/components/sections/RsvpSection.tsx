import React, { useEffect, useState } from "react";
import { InvitationData, getCapabilities } from '../../data/invitations';
import { motion } from 'framer-motion';

type Props = { data: InvitationData };

export const RsvpSection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);
  if (!caps.features.rsvp) return null;

  const [showMessage, setShowMessage] = useState(false);

  

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
                Tu presencia es muy importante para nosotros. Confirma tu
                asistencia de la manera que prefieras.
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
                    onClick={() => window.open(data.anserwsNegativeLink, "_blank")}
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
