import React from 'react';
import { useParams } from 'react-router-dom';
import { getInvitationData } from '../data/invitations';
import { QuinceTemplate } from '../templates/QuinceTemplate';
import { WeddingTemplate } from '../templates/WeddingTemplate';
import { BirthdayTemplate } from '../templates/BirthdayTemplate';

export const InvitationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>ID no encontrado</div>;
  const data = getInvitationData(id);
  if (!data) return <div>Invitación no encontrada</div>;

  switch (data.type) {
    case 'boda':
      return <WeddingTemplate data={data} />;
    case 'cumple':
      return <BirthdayTemplate data={data} />;
    case 'quince':
    default:
      return <QuinceTemplate data={data} />;
  }
};
