import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gray-100 dark:bg-gray-800">
      <div
        className="h-96 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1920x500')`, // Replace with your image URL
        }}
      ></div>
      <div className="absolute inset-0 flex flex-col justify-center items-start text-left p-8 md:p-16 lg:p-24 ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('hero_heading')}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-lg">
          {t('hero_subheading')}
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md text-lg">
          {t('cta_button')}
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
