import React from 'react';
import { InvitationData } from '../data/invitations';
import { HeaderHero } from '../components/sections/HeaderHero';
import { CountdownSection } from '../components/sections/CountdownSection';
import { LocationsSection } from '../components/sections/LocationsSection';
import { CalendarSection } from '../components/sections/CalendarSection';
import { TimelineSection } from '../components/sections/TimelineSection';
import { GallerySection } from '../components/sections/GallerySection';
import { HashtagSection } from '../components/sections/HashtagSection';
import { RsvpSection } from '../components/sections/RsvpSection';
import { DressCodeSection } from '../components/sections/DressCodeSection';
import { MusicControl } from '../components/sections/MusicControl';
import { GamesSection } from '../components/sections/GamesSection';
import { ParentsSection } from '../components/sections/ParentsSection';
import { FooterSection } from '../components/sections/FooterSection';
import { Image1Section } from '../components/sections/Image1Section';
import { Image2Section } from '../components/sections/Image2Section';
import { Image3Section } from '../components/sections/Image3Section';
import { HeroCover } from '../components/animations/HeroCover';
import ErrorBoundary from '../components/ErrorBoundary';

type Props = { data: InvitationData };

export const BirthdayTemplate: React.FC<Props> = ({ data }) => {
  const extras = (data.extras || {}) as { age?: number; theme?: string; giftsNote?: string };
  const subtitle =
    data.eventDate
      ? new Date(data.eventDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';

  return (
<HeroCover>
        <ErrorBoundary>
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
          <GallerySection data={data} />
          <RsvpSection data={data} />
          <MusicControl data={data} />
          <FooterSection />
        </ErrorBoundary>
      </HeroCover>
  );
};
