import React from 'react';
import { offers } from '@/data/offers';
import OfferCard from './offer-card';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const OffersSection: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('offers')}
        </h2>
        <NavLink
          className="text-blue-600 dark:text-blue-400 hover:underline"
          to={`/${lang}/products`}
        >
          {t('view_all')}
        </NavLink>
      </div>
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 z-10"
        >
          <FaChevronLeft />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto w-full gap-4 px-4 rounded-lg scrollbar-custom"
        >
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

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default OffersSection;
