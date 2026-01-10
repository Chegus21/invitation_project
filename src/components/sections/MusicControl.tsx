import React, { useEffect, useRef, useState } from "react";
import { Music } from "lucide-react";
import { InvitationData, getCapabilities } from "../../data/invitations";
import { motion } from "framer-motion";

type Props = { data: InvitationData };

const base = (p?: string) =>
  p?.startsWith("http")
    ? p
    : p
    ? `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`
    : "";

export const MusicControl: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);
  if (!caps.features.music || !data.musicLink) return null;

  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    ref.current = new Audio(base(data.musicLink));
    ref.current.loop = true;
    return () => {
      ref.current?.pause();
      ref.current = null;
    };
  }, [data.musicLink]);

  const toggle = async () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      try {
        await ref.current.play();
        setPlaying(true);
      } catch {}
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggle}
        aria-pressed={playing}
        aria-label="Control de música"
        className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg border border-gray-200 backdrop-blur-sm transition-all duration-300
      ${
        playing
          ? "bg-indigo-600 text-white animate-pulse"
          : "bg-white/80 text-indigo-600 hover:bg-white"
      }`}
      >
        <Music className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
};
