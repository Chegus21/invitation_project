import React from "react";
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

const DressCodeSection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);

  const bgImage = data.customization?.dressCodeImage
    ? data.customization.dressCodeImage.startsWith("http")
      ? `url("${data.customization.dressCodeImage}")`
      : `url("${
          import.meta.env.BASE_URL
        }${data.customization.dressCodeImage.replace(/^\//, "")}")`
    : undefined;

  return (
    <div className="font-sans text-gray-800">
      {/* Dress Code */}
      {caps.features.dressCode && data.dressCode && (
        <section
          aria-label="Código de vestimenta"
          className="py-16 px-4 bg-gradient-to-r from-indigo-100/50 to-purple-100/50"
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
            <img
              src="https://res.cloudinary.com/dwtkygvrh/image/upload/v1773290461/codigo_de_vestimenta_lqems8.png"
              alt="Icono de vestimenta"
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
            <h2 className="text-4xl font-serif montserrat-custom bg-clip-text bg-gradient-to-r text-black/80 mb-6 tracking-wide">
              Código de Vestimenta
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
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-indigo-100/50 max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <h3
                  className="text-2xl montserrat-custom mb-4"
                  style={{ color: data.colors.primary }}
                >
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
                  },
                  {
                    icon: Heart,
                    label: "Cómodo",
                  },
                  {
                    icon: Sparkles,
                    label: "Festivo",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-center"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md"
                      style={{
                        background: `linear-gradient(to bottom right, ${data.colors.primary}, ${data.colors.accent})`,
                      }}
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
    </div>
  );
};

export { DressCodeSection };
export default DressCodeSection;
