import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();


  return (
    <div className="flex relative mt-10 bg-gray-100 dark:bg-gray-800">
      <div
        className="rounded-3xl h-96 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')`,
        }}
      ></div>
      <div className="absolute inset-0 flex flex-col justify-center items-start text-left p-8 pl-8 md:p-16 lg:p-24 ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('hero_heading')}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-lg">
          {t('hero_subheading')}
        </p>
        <NavLink to={`/${lang}/products`} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md text-lg" >
          {t('cta_button')}
        </NavLink>
      </div>
    </div>
  );
};

export default HeroSection;
