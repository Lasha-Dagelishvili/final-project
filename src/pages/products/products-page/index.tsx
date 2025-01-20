import React from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/main-content/product-card';
import { useTranslation } from 'react-i18next';

const ProductsPage: React.FC = () => {
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
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{t('products')}</h1>
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
  );
};

export default ProductsPage;
