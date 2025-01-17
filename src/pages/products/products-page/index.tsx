import ProductCard from '@/components/main-content/product-card';
import { products } from '@/data/products';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductsPage: React.FC = () => {
        const { t } = useTranslation();
        const handlePurchase = (productId: string) => {
            alert(`Product with ID ${productId} purchased!`);
        };
        
    return (
        <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{t('products')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
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
