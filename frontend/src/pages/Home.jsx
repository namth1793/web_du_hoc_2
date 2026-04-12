import Hero from '../components/Hero';
import MediaSection from '../components/MediaSection';
import CountryCards from '../components/CountryCards';
import EventsGrid from '../components/EventsGrid';
import Achievements from '../components/Achievements';
import Testimonials from '../components/Testimonials';
import SocialSection from '../components/SocialSection';

export default function Home() {
  return (
    <>
      <Hero />
      <CountryCards />
      <EventsGrid />
      <Achievements />
      <Testimonials />
      <MediaSection />
      <SocialSection />
    </>
  );
}
