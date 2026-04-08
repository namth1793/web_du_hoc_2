import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CountryCards from '../components/CountryCards';
import EventsGrid from '../components/EventsGrid';
import Achievements from '../components/Achievements';
import Testimonials from '../components/Testimonials';
import MediaSection from '../components/MediaSection';
import SocialSection from '../components/SocialSection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CountryCards />
      <EventsGrid />
      <Achievements />
      <Testimonials />
      <MediaSection />
      <SocialSection />
    </>
  );
}
