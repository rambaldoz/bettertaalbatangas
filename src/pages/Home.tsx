import HomeHero from '../components/home/HomeHero';
import ServicesGrid from '../components/home/ServicesGrid';
import WeatherForex from '../components/home/WeatherForex';
import PhilSysBanner from '../components/home/PhilSysBanner';
import SEO from '../components/SEO';

// Sections left out for now (to add later): CivicTech call to action,
// Government of the Philippines branches, and the official directory.
const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Community-run portal for the Municipality of Taal, Batangas. Find local government services, hotlines, weather and exchange rates."
        keywords="Taal, Batangas, local government, services, hotlines"
      />
      <main className="flex-grow">
        <HomeHero />
        <ServicesGrid />
        <WeatherForex />
        <PhilSysBanner />
      </main>
    </>
  );
};

export default Home;
