import React from 'react';
import ProductCard from '@/components/main-content/product-card';
import HeroSection from '@/components/main-content/hero-section';
import OffersSection from '@/components/main-content/offers-section';
import { useTranslation } from 'react-i18next';
import { mainpage_products } from '@/data/products/mainpage-products';
import { products } from '@/data/products';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const handlePurchase = async (productId: string) => {
    const product = products.find((item) => item.id === productId);

    if (!product) return;

    try {
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              name: product.name,
              price: product.price,
              image: product.image,
            },
          ],
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="pb-8 max-w-6xl mx-auto">
      <HeroSection />
      <OffersSection />

      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">{t('products')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainpage_products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
