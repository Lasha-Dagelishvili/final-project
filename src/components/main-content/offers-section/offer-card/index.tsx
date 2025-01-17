import React from 'react';

interface OfferCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ title, description, image, date }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden w-72 flex-shrink-0">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{description}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">{date}</p>
      </div>
    </div>
  );
};

export default OfferCard;
