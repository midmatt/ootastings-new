import AtmosphereCollage from "@/components/AtmosphereCollage";
import BrandStatement from "@/components/BrandStatement";
import EmailCapture from "@/components/EmailCapture";
import ExperienceGrid from "@/components/ExperienceGrid";
import FeaturedTastings from "@/components/FeaturedTastings";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InstagramStrip from "@/components/InstagramStrip";
import PourMission from "@/components/PourMission";
import Testimonial from "@/components/Testimonial";

/**
 * Home page — UI pass only.
 * Section rhythm alternates full-bleed cream and olive blocks down the page.
 * All CTAs currently point at in-page anchors.
 * TODO: route "Book a Tasting" / "Reserve Your Tasting" to the real booking flow.
 */
export default function HomePage() {
  return (
    <>
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
        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
