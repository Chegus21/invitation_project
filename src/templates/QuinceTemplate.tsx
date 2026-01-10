import React from 'react';
import { InvitationData } from '../data/invitations';
import { HeaderHero } from '../components/sections/HeaderHero';
import { CountdownSection } from '../components/sections/CountdownSection';
import { LocationsSection } from '../components/sections/LocationsSection';
import { CalendarSection } from '../components/sections/CalendarSection';
import { TimelineSection } from '../components/sections/TimelineSection';
import { DressCodeSection } from '../components/sections/DressCodeSection';
import { GallerySection } from '../components/sections/GallerySection';
import { HashtagSection } from '../components/sections/HashtagSection';
import { ParentsSection } from '../components/sections/ParentsSection';
import { GiftsSection } from '../components/sections/GiftsSection';
import { RsvpSection } from '../components/sections/RsvpSection';
import { MusicControl } from '../components/sections/MusicControl';
import { PassesSection } from '../components/sections/PassesSection';
import { FooterSection } from '../components/sections/FooterSection';
import { Image1Section } from '../components/sections/Image1Section';
import { Image2Section } from '../components/sections/Image2Section';
import { Image3Section } from '../components/sections/Image3Section';

// 1. Importa el nuevo componente de animación
import { HeroCover } from '../components/animations/HeroCover'; // Ajusta la ruta si es necesario

type Props = { data: InvitationData };

export const QuinceTemplate: React.FC<Props> = ({ data }) => {
  return (
    // 2. Envuelve todo el contenido de la invitación en el HeroCover
    <HeroCover>
      {/* 3. Todas tus secciones van aquí adentro sin cambios */}
      {/* El fondo degradado (bg-gradient-to-br...) se movió a HeroCover */}
      <HeaderHero data={data} />
      <ParentsSection data={data} title="Padres y Padrinos" />
      <CountdownSection data={data} />
      <Image1Section data={data} />
      <CalendarSection data={data} />
      <LocationsSection data={data} />
      <Image2Section data={data} />
      <TimelineSection data={data} />
      <DressCodeSection data={data} />
      <Image3Section data={data} />
      <HashtagSection data={data} />
      <GiftsSection data={data} />
      <GallerySection data={data} />
      <RsvpSection data={data} />
      <MusicControl data={data} />
      <PassesSection data={data} />
      <FooterSection />
    </HeroCover>
  );
};