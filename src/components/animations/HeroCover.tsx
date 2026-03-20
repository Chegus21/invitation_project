import React, { useState, useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

export const HeroCover: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  // Auto-open on iOS (video issues)
  if (isIOS) {
    console.log('HeroCover: iOS detected, auto-opening invitation');
    setTimeout(() => setIsOpen(true), 500);
  }
}, []);

const handleOpen = async () => {
  setIsLoading(true);
  
  if (videoRef.current && !isIOS) {
    try {
      await videoRef.current.play();
      console.log('HeroCover: Video playing successfully');
    } catch (err) {
      console.warn('HeroCover: Video play failed (expected on mobile):', err);
      // Force open on play fail
    }
  }

  setTimeout(() => {
    setIsOpen(true);
    setIsLoading(false);
  }, 800);
};

  return (
    <div className="relative">

      {/* COVER */}
      <div
        className={`
        fixed inset-0 z-50 flex flex-col items-center justify-center
        transition-all duration-[5000ms] ease-in-out
        ${isOpen ? "opacity-0 blur-md pointer-events-none" : "opacity-100"}
        `}
      >

        {/* VIDEO DE FONDO */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
        >
          <source
  src="https://res.cloudinary.com/dwtkygvrh/video/upload/v1772920625/WhatsApp_Video_2026-01-20_at_15.54.51_yo8ju3.mp4"
  type="video/mp4"
/>
        </video>

        {/* CAPA OSCURA PARA QUE SE LEA EL TEXTO */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* CONTENIDO */}
        <div className="relative z-10 flex flex-col items-center text-white text-center gap-6">

<button
            onClick={handleOpen}
            disabled={isLoading}
            className={`px-8 py-3 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-lg hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed ${
              isLoading ? 'animate-pulse' : ''
            }`}
          >
            {isLoading ? '⏳ Cargando...' : 'Abrir invitación'}
          </button>

        </div>
      </div>

      {/* CONTENIDO DE LA INVITACIÓN */}
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
        {children}
      </div>
    </div>
  );
};