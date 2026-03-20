import React, { useState } from "react";
import { InvitationData, getCapabilities } from "../../data/invitations";
import { motion } from "framer-motion";
import { Gift, Store, DollarSign } from "lucide-react";

type Props = { data: InvitationData };

export const GiftsSection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);

  const [showBankDetails, setShowBankDetails] = useState(false);
  const hasBankDetails = (bank?: any) =>
  bank && (bank.clabe || bank.cardNumber || bank.bank);
  const noGifts = (!data.giftRegistry?.length) && !hasBankDetails(data.bankTransferDetails);

  

  return (
    <div className="font-sans text-gray-800">
      
      {/* ============================= */}
      {/* CUANDO NO HAY REGALOS */}
      {/* ============================= */}

      {caps.features.gifts && noGifts && (
        <section className="py-20 px-4 bg-gradient-to-r from-emerald-100/40 to-teal-100/40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-emerald-100/50">
              <img
              src="https://res.cloudinary.com/dwtkygvrh/image/upload/v1773290486/mesa_de_regalos_rcvja5.png"
              alt="Icono de vestimenta"
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />

              <h2 className="text-3xl montserrat-custom text-emerald-700 mb-6">
                Tu Presencia es Nuestro Mejor Regalo
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                En este día tan especial, el mayor regalo que podemos recibir es
                compartirlo contigo.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Tu presencia, tus buenos deseos y el cariño que nos brindas son
                más que suficientes para hacer de este momento algo
                verdaderamente inolvidable.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed italianno-bold text-2xl">
                Gracias por ser parte de nuestra historia.
              </p>
            </div>
          </motion.div>
        </section>
      )}

      {/* ============================= */}
      {/* CUANDO SI HAY REGALOS */}
      {/* ============================= */}

      {caps.features.gifts && !noGifts && (
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
                          window.open(
                            data.giftLink && data.giftLink[index]
                              ? data.giftLink[index]
                              : "#",
                            "_blank",
                          );
                        }}
                      >
                        Abrir
                      </motion.button>
                    </motion.div>
                  ))}

                {data.bankTransferDetails &&
                  (data.bankTransferDetails.clabe ||
                    data.bankTransferDetails.cardNumber ||
                    data.bankTransferDetails.bank) && (
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
                  )}
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

      {/* ============================= */}
      {/* MODAL DATOS BANCARIOS */}
      {/* ============================= */}

      {showBankDetails && data.bankTransferDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowBankDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Gift className="w-14 h-14 text-emerald-500 mx-auto mb-4" />

            <h3 className="text-2xl font-semibold mb-3 text-emerald-700">
              Lluvia de Sobres
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Tu presencia es nuestro mejor regalo. Pero si deseas obsequiarnos
              algo adicional, será recibido con profunda gratitud.
            </p>

            <div className="space-y-3 text-left mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Banco</p>
                <p className="font-semibold">{data.bankTransferDetails.bank}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">CLABE</p>
                <p className="font-mono font-semibold">
                  {data.bankTransferDetails.clabe}
                </p>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      data.bankTransferDetails.clabe,
                    )
                  }
                  className="text-xs text-emerald-600 mt-1 hover:underline"
                >
                  Copiar CLABE
                </button>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Tarjeta</p>
                <p className="font-mono font-semibold">
                  {data.bankTransferDetails.cardNumber}
                </p>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      data.bankTransferDetails.cardNumber,
                    )
                  }
                  className="text-xs text-emerald-600 mt-1 hover:underline"
                >
                  Copiar tarjeta
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowBankDetails(false)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-2 rounded-full font-medium hover:scale-105 transition"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
