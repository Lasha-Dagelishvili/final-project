import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">{t('home')}</h2>
      <p>{t('welcome')}</p>
    </div>
  );
};

export default Home;
