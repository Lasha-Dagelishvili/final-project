import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onPurchase: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, onPurchase }) => {
      const { t } = useTranslation();
  
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-600 mb-4">${price.toFixed(2)}</p>
      <button
        onClick={() => onPurchase(id)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {t('purchase')}
      </button>
    </div>
  );
};

export default ProductCard;
