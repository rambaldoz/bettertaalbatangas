import HomeHero from '../components/home/HomeHero';
import ServicesGrid from '../components/home/ServicesGrid';
import WeatherForex from '../components/home/WeatherForex';
import PhilSysBanner from '../components/home/PhilSysBanner';
import EmergencyHotlines from '../components/home/EmergencyHotlines';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

// Sections left out for now (to add later): CivicTech call to action,
// Government of the Philippines branches, and the official directory.
const Home: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <SEO
        title={t('common.home')}
        description={t('seo.homeDescription')}
        keywords={t('seo.homeKeywords')}
      />
      <main className="flex-grow">
        <HomeHero />
        <ServicesGrid />
        <PhilSysBanner />
        <EmergencyHotlines />
        <WeatherForex />
      </main>
    </>
  );
};

export default Home;
