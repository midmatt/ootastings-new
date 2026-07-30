import AtmosphereCollage from "@/components/AtmosphereCollage";
import BrandStatement from "@/components/BrandStatement";
import ExperienceGrid from "@/components/ExperienceGrid";
import FeaturedTastings from "@/components/FeaturedTastings";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InstagramStrip from "@/components/InstagramStrip";
import PackageProvider from "@/components/PackageProvider";
import PackageSection from "@/components/PackageSection";
import PackageTray from "@/components/PackageTray";
import PourMission from "@/components/PourMission";
import Testimonial from "@/components/Testimonial";

/**
 * Home page — UI pass only.
 * Section rhythm alternates full-bleed cream and olive blocks down the page.
 * All CTAs currently point at in-page anchors.
 * "Book a Tasting" and the hero CTA point at #book, which is the package and
 * quote-request section at the foot of the page.
 */
export default function HomePage() {
  return (
    <PackageProvider>
      <Header />
      <main>
        <Hero />
        <PourMission />
        <FeaturedTastings />
        <ExperienceGrid />
        <Testimonial />
        <AtmosphereCollage />
        <InstagramStrip />
        <BrandStatement />
        <PackageSection />
      </main>
      <Footer />
      <PackageTray />
    </PackageProvider>
  );
}
