import React from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import HeroSection from '@/components/HeroSection';

const Home: React.FC = () => {
  const handlePurchase = (productId: string) => {
    alert(`Product with ID ${productId} purchased!`);
  };

  return (
    <div className="pb-8">
      <HeroSection />

      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
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
