import React from 'react';
import { Sparkles } from 'lucide-react';
import { InvitationData, getCapabilities } from '../../data/invitations';

export const GamesSection: React.FC<{ data: InvitationData }> = ({ data }) => {
  const caps = getCapabilities(data);
  if (data.type !== 'cumple') return null;

  const extras = (data.extras || {}) as { theme?: string };
  return (
    <section className="max-w-4xl mx-auto px-4 my-10">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6" /> Actividades
      </h2>
      <div className="rounded-xl border p-4 text-slate-700">
        {extras.theme
          ? `Habrá dinámicas y juegos con el tema: ${extras.theme}.`
          : 'Tendremos dinámicas y sorpresas durante la fiesta.'}
      </div>
    </section>
  );
};
