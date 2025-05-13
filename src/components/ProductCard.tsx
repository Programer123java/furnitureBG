import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { translations } from '../utils/translations';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  rating,
  category,
  isNew = false,
  isSale = false,
  discount = 0
}) => {
  const { language } = useLanguage();
  const { addItem } = useCart();
  const t = translations[language];
  
  const discountedPrice = isSale ? price - (price * (discount / 100)) : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      title,
      price: discountedPrice || price,
      image,
      quantity: 1
    });
  };

  return (
    <div className="card group h-full flex flex-col">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Labels */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
              {t.product.new}
            </span>
          )}
          {isSale && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
              {t.product.sale} {discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={handleAddToCart}
            className="bg-white text-neutral-900 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-amber-800 hover:text-white"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-sm text-amber-700 mb-1">{category}</span>
        <h3 className="font-medium text-lg mb-2 line-clamp-2 hover:text-amber-800 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center">
            {isSale && discountedPrice ? (
              <>
                <span className="text-lg font-medium text-red-600">
                  {discountedPrice.toLocaleString()} лв.
                </span>
                <span className="ml-2 text-sm text-neutral-500 line-through">
                  {price.toLocaleString()} лв.
                </span>
              </>
            ) : (
              <span className="text-lg font-medium">
                {price.toLocaleString()} лв.
              </span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full mt-3 bg-amber-800 text-white py-2 rounded hover:bg-amber-900 transition-colors"
          >
            {t.product.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;