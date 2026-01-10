import React from 'react';
import { InvitationData, getCapabilities } from '../../data/invitations';

type Props = { data: InvitationData };

export const PassesSection: React.FC<Props> = ({ data }) => {
  const caps = getCapabilities(data);
  if (!caps.features.customPasses) return null;

  // Placeholder: aquí podrías renderizar una lista de pases invitados con QR
  return (
    <section className="max-w-4xl mx-auto px-4 my-10">
      <h2 className="text-2xl font-semibold mb-2">Pases personalizados</h2>
      <p className="text-gray-600">Próximamente: genera pases con código/QR por invitado.</p>
    </section>
  );
};
