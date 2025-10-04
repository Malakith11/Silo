import { AnnouncementBanner } from "../../components/layout/announcement-banner";
import { SiteHeader } from "../../components/layout/site-header";
import { Hero } from "../../components/sections/hero";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBanner />
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </div>
  );
}
