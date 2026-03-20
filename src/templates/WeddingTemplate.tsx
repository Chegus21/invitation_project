import React from "react";
import { InvitationData } from "../data/invitations";
import { HeaderHero } from "../components/sections/HeaderHero";
import { CountdownSection } from "../components/sections/CountdownSection";
import { LocationsSection } from "../components/sections/LocationsSection";
import { CalendarSection } from "../components/sections/CalendarSection";
import { TimelineSection } from "../components/sections/TimelineSection";
import { GallerySection } from "../components/sections/GallerySection";
import { HashtagSection } from "../components/sections/HashtagSection";
import { ParentsSection } from "../components/sections/ParentsSection";
import { GiftsSection } from "../components/sections/GiftsSection";
import { RsvpSection } from "../components/sections/RsvpSection";
import { MusicControl } from "../components/sections/MusicControl";
import { DressCodeSection } from "../components/sections/DressCodeSection";
import { FooterSection } from "../components/sections/FooterSection";
import { Image1Section } from "../components/sections/Image1Section";
import { Image2Section } from "../components/sections/Image2Section";
import { Image3Section } from "../components/sections/Image3Section";
import { HeroCover } from "../components/animations/HeroCover";
import ErrorBoundary from "../components/ErrorBoundary";

type Props = { data: InvitationData };

export const WeddingTemplate: React.FC<Props> = ({ data }) => {
  const extras = (data.extras || {}) as {
    coupleNames?: { bride: string; groom: string };
    ceremonyType?: "civil" | "religiosa" | "mixta";
    dressCodeNote?: string;
    mesaDeRegalosTexto?: string;
  };

  const coupleTitle = extras.coupleNames
    ? `${extras.coupleNames.bride} & ${extras.coupleNames.groom}`
    : data.name;

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-slate-50 to-zinc-50">
<HeroCover>
        <ErrorBoundary>
          <HeaderHero data={data} />
          <ParentsSection data={data} title="Familia y Testigos" />
          <CountdownSection data={data} />
          <Image1Section data={data} />
          <CalendarSection data={data} />
          <LocationsSection data={data} />
          <Image2Section data={data} />
          <TimelineSection data={data} />
          <DressCodeSection
            data={{ ...data, dressCode: extras.dressCodeNote || data.dressCode }}
          />
          <Image3Section data={data} />
          <HashtagSection data={data} />
          <GiftsSection
            data={{ ...data, phrase1: extras.mesaDeRegalosTexto || data.phrase1 }}
          />
          <GallerySection data={data} />
          <RsvpSection data={data} />
          <MusicControl data={data} />
          <FooterSection />
        </ErrorBoundary>
      </HeroCover>
    </div>
  );
};
