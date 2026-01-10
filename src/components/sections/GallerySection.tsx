import React, { useEffect, useState } from "react";
import { InvitationData, getCapabilities } from "../../data/invitations";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";


type Props = { data: InvitationData };

export const GallerySection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide cada 3 segundos
  useEffect(() => {
    const images = data.customization?.galleryImages;
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.customization?.galleryImages]);

  // Movimiento 3D sutil continuo
  const rotate = useMotionValue(0);
  useAnimationFrame((t) => {
    rotate.set(Math.sin(t / 2000) * 5); // oscilación suave
  });

  const bgImage = data.customization?.specialThanksImage
  ? data.customization.specialThanksImage.startsWith("http")
    ? `url("${data.customization.specialThanksImage}")`
    : `url("${import.meta.env.BASE_URL}${data.customization.specialThanksImage.replace(/^\//, "")}")`
  : undefined;

  return (
    <div className="font-sans text-gray-800">
      {caps.features.gallery && data.customization?.galleryImages?.length ? (
        <section
          className="py-20 px-6 bg-white"
          style={{
  backgroundImage: bgImage,
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
            <div
              className="w-20 h-1 mx-auto rounded-full mb-8"
              style={{
                background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.accent})`,
              }}
            ></div>
            <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto pattaya-regular">
              Una colección de recuerdos que esperamos compartir contigo en este
              día tan especial
            </p>
          </motion.div>

          {/* 🌟 Galería 3D tipo deck */}
          {(() => {
            const images = data.customization?.galleryImages || [];
            if (images.length === 0) return null;

            return (
              <div className="relative w-full max-w-6xl mx-auto h-[500px] flex items-center justify-center">
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                    position: "relative",
                  }}
                >
                  {images.map((image, index) => {
                    const imageUrl = image.startsWith("http")
                      ? image
                      : `${import.meta.env.BASE_URL}${image.replace(/^\//, "")}`;

                    // Posición relativa al índice activo
                    const offset =
                      ((index - currentIndex + images.length) % images.length) - 1;
                    const z = -Math.abs(offset) * 150;
                    const rotateY = offset * 15;
                    const scale = offset === 0 ? 1 : 0.9;

                    return (
                      <motion.img
                        key={index}
                        src={imageUrl}
                        alt={`Foto ${index + 1}`}
                        className="absolute w-auto max-w-[80%] h-[70%] rounded-xl shadow-2xl cursor-pointer object-cover"
                        onClick={() => setSelectedImage(imageUrl)}
                        initial={false}
                        animate={{
                          opacity: offset === 0 ? 1 : 0.7,
                          zIndex: images.length - Math.abs(offset),
                          scale,
                          rotateY: rotateY,
                          translateZ: z,
                        }}
                        style={{
                          rotateX: useTransform(rotate, (r) => r / 2),
                          transformOrigin: "center center",
                          backfaceVisibility: "hidden",
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    );
                  })}
                </div>

                {/* Botones de navegación */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full p-3"
                  onClick={() =>
                    setCurrentIndex(
                      (prev) => (prev - 1 + images.length) % images.length
                    )
                  }
                >
                  ◀
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full p-3"
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % images.length)
                  }
                >
                  ▶
                </button>
              </div>
            );
          })()}

          {/* Galería vacía */}
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
      ) : null}
    </div>
  );
};
