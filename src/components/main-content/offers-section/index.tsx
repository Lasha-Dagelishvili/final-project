import React from 'react';
import { offers } from '@/data/offers';
import OfferCard from './offer-card';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OffersSection: React.FC = () => {
    const { t } = useTranslation();
    const { lang } = useParams<{ lang: string }>();
    
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl font-bold">{t('offers')}</h2>
        <NavLink  className="text-blue-600 dark:text-blue-400 " to={`/${lang}/products`}>
          {t('view_all')}
        </NavLink>
      </div>
      <div className="flex overflow-x-auto w-full gap-4 px-4 rounded-lg scrollbar-hide">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            title={offer.title}
            description={offer.description}
            image={offer.image}
            date={offer.date}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersSection;
