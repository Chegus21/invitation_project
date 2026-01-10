// components/InvitationTemplate.tsx (wrapper de compatibilidad opcional)
import { QuinceTemplate } from '../templates/QuinceTemplate';
import { WeddingTemplate } from '../templates/WeddingTemplate';
import { BirthdayTemplate } from '../templates/BirthdayTemplate';
import { InvitationData } from '../data/invitations';

export const InvitationTemplate = ({ data }: { data: InvitationData }) => {
  switch (data.type) {
    case 'boda': return <WeddingTemplate data={data} />;
    case 'cumple': return <BirthdayTemplate data={data} />;
    case 'quince':
    default: return <QuinceTemplate data={data} />;
  }
};
