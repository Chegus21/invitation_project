import React, { useState } from "react";
import { InvitationData, getCapabilities } from '../../data/invitations';
import { motion } from "framer-motion";
import {
  
  Gift,
  Store,
  DollarSign,
  
} from "lucide-react";

type Props = { data: InvitationData };

export const GiftsSection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);

  const [showBankDetails, setShowBankDetails] = useState(false);


  
  return (
    <div className="font-sans text-gray-800 ">
      {/* Mesa de Regalos */}
      {caps.features.gifts && (
        <section
          className="py-16 px-4 bg-gradient-to-r from-emerald-100/50 to-teal-100/50"
          style={{
            backgroundImage: data.customization?.giftRegistryImage
              ? `url("${
                  import.meta.env.BASE_URL
                }${data.customization.giftRegistryImage.replace(/^\//, "")}")`
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
            <div
              className="w-20 h-1 mx-auto rounded-full mb-8"
              style={{
                background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
              }}
            ></div>

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
                  {(data.giftRegistry ?? []).length > 0
                    ? "Si deseas obsequiarnos algo especial, puedes elegir entre estas opciones:"
                    : "Si deseas contribuir, puedes hacerlo mediante transferencia bancaria:"}
                </p>
              </div>

              <div
                className={`grid gap-4 ${
                  (data.giftRegistry ?? []).length > 0
                    ? "grid-cols-1 md:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {(data.giftRegistry ?? []).length > 0 &&
                  data.giftRegistry?.map((registry: string, index: number) => (
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
              El mejor regalo es tu presencia en este día tan especial. Pero si
              deseas obsequiar algo más, un sobre con tu cariño será recibido
              con profunda gratitud.
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
    </div>
  );
};
