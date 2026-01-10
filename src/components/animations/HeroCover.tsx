import React, { useState, useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export const HeroCover: React.FC<Props> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const hasInteractedRef = useRef(false);
  const originalOverflowRef = useRef<string>("");

  useEffect(() => {
    // Guardar el valor original del overflow
    originalOverflowRef.current = document.body.style.overflowY;

    // Bloqueo del scroll mientras el cover está activo
    document.body.style.overflowY = isScrolled ? "auto" : "hidden";

    // Detecta la primera interacción (scroll, toque, clic o teclado)
    const handleOpen = () => {
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        setIsScrolled(true);
      }
    };

    // Manejo de teclado para accesibilidad
    const handleKeyPress = (e: KeyboardEvent) => {
      if (["Enter", "Escape", " ", "ArrowDown"].includes(e.key)) {
        handleOpen();
      }
    };

    // Agrega los listeners solo si no ha interactuado
    if (!isScrolled) {
      window.addEventListener("wheel", handleOpen, {
        once: true,
        passive: true,
      });
      window.addEventListener("touchstart", handleOpen, {
        once: true,
        passive: true,
      });
      window.addEventListener("click", handleOpen, { once: true });
      window.addEventListener("keydown", handleKeyPress, { once: true });
    }

    // Limpieza
    return () => {
      // Restaurar overflow original
      document.body.style.overflowY = originalOverflowRef.current || "auto";

      // Remover listeners solo si no se han disparado
      if (!hasInteractedRef.current) {
        window.removeEventListener("wheel", handleOpen);
        window.removeEventListener("touchstart", handleOpen);
        window.removeEventListener("click", handleOpen);
        window.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [isScrolled]);

  return (
    <div className="relative">
      {/* --- COVER ANIMADO --- */}
      <div
        className={`
    fixed inset-0 z-50 flex flex-col items-center justify-center
    bg-[rgb(120,138,111)]
    transition-all duration-[2000ms] ease-in-out
    ${
      isScrolled
        ? "opacity-0 translate-y-[-30px] pointer-events-none"
        : "opacity-100 translate-y-0"
    }
  `}
        role="dialog"
        aria-modal="true"
        aria-label="Portada de invitación"
      >
        {/* --- Contenido central --- */}
        <div className="z-10 flex flex-col items-center gap-4 text-center text-white drop-shadow-lg">
          <h3 className="text-2xl font-semibold select-none animate-pulse">
            Presiona cualquier tecla, haz clic o desliza
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-white drop-shadow-md animate-bounce"
            aria-hidden="true"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M3.8 12.18c-.2-.86-.3-1.76-.3-2.68 0-2.84.99-5.45 2.63-7.5L7.2 3.07a10.457 10.457 0 00-1.88 8.99l1.62-1.62L8 11.5 4.5 15 1 11.5l1.06-1.06 1.74 1.74zm10.05-.56l-2.68-5.37a1.498 1.498 0 00-2.01-.67c-.75.38-1.05 1.28-.68 2.02l4.81 9.6-3.24.8c-.33.09-.59.33-.7.66L9 19.78l6.19 2.25c.5.17 1.28.02 1.75-.22l5.51-2.75c.89-.45 1.32-1.48 1-2.42l-1.43-4.27a2 2 0 00-1.9-1.37h-4.56c-.31 0-.62.07-.89.21l-.82.41"></path>
          </svg>
          <p className="text-sm opacity-80 mt-2">
            Presiona cualquier tecla, haz clic o desliza
          </p>
        </div>

        {/* --- Capa floral IZQUIERDA (se desliza hacia la izquierda) --- */}
        <div
          className={`
    absolute inset-0 bg-no-repeat bg-cover bg-right opacity-90
    transition-transform duration-[2000ms] ease-in-out
    ${isScrolled ? "-translate-x-full" : "translate-x-0"}
  `}
          style={{
            backgroundImage:
              'url("https://dr03x6mpfky2d.cloudfront.net/public/animaciones/flores/flowers-left2.png")',
          }}
          aria-hidden="true"
        ></div>

        {/* --- Capa floral DERECHA (se desliza hacia la derecha) --- */}
        <div
          className={`
    absolute inset-0 bg-no-repeat bg-cover bg-left opacity-90
    transition-transform duration-[2000ms] ease-in-out
    ${isScrolled ? "translate-x-full" : "translate-x-0"}
  `}
          style={{
            backgroundImage:
              'url("https://dr03x6mpfky2d.cloudfront.net/public/animaciones/flores/flowers-right2.png")',
          }}
          aria-hidden="true"
        ></div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 min-h-screen">
        {children}
      </div>
    </div>
  );
};
