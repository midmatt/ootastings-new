import type { Metadata } from "next";
import AtmosphereCollage from "@/components/AtmosphereCollage";
import ExperienceGrid from "@/components/ExperienceGrid";
import FeaturedTastings from "@/components/FeaturedTastings";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HealthCoach from "@/components/HealthCoach";
import Hero from "@/components/Hero";
import InstagramStrip from "@/components/InstagramStrip";
import JsonLd from "@/components/JsonLd";
import PackageProvider from "@/components/PackageProvider";
import PackageSection from "@/components/PackageSection";
import PackageTray from "@/components/PackageTray";
import PourMission from "@/components/PourMission";
import Testimonial from "@/components/Testimonial";
import VideoLounge from "@/components/VideoLounge";
import {
  graph,
  organizationSchema,
  serviceSchema,
  webSiteSchema,
} from "@/lib/schema";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";

/**
 * Home page — UI pass only.
 * Section rhythm alternates full-bleed cream and olive blocks down the page.
 * All CTAs currently point at in-page anchors.
 * "Book a Tasting" and the hero CTA point at #book, which is the package and
 * quote-request section at the foot of the page.
 */
export const metadata: Metadata = {
  // `absolute` opts out of the root layout's "%s | OOT Tastings" template —
  // without it the brand would appear twice on the home page.
  title: {
    absolute: "OOT Tastings — Guided Olive Oil Tastings & Pairings",
  },
  description:
    "Guided olive oil tastings, flights and pairings for corporate events, retreats and private groups — hosted on location by the team who source the oil.",
  alternates: { canonical: "/" },
  // `openGraph` replaces the layout's wholesale rather than deep-merging, so
  // siteName and locale are repeated here instead of being inherited.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "OOT Tastings — Guided Olive Oil Tastings & Pairings",
    description:
      "Guided olive oil tastings, flights and pairings for corporate events, retreats and private groups — hosted on location by the team who source the oil.",
    images: [OG_IMAGE],
  },
};

export default function HomePage() {
  return (
    <PackageProvider>
      <JsonLd
        data={graph(organizationSchema(), webSiteSchema(), serviceSchema())}
      />
      <Header />
      <main>
        <Hero />
        <PourMission />
        <HealthCoach />
        <VideoLounge />
        <FeaturedTastings />
        <ExperienceGrid />
        <Testimonial />
        <AtmosphereCollage />
        <InstagramStrip />
        <PackageSection />
      </main>
      <Footer />
      <PackageTray />
    </PackageProvider>
  );
}
