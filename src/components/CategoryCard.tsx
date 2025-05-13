import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  image: string;
  count: number;
  countText: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, count, countText }) => {
  return (
    <Link to="/products" className="block group">
      <div className="card overflow-hidden h-full">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
            <h3 className="text-xl font-medium">{title}</h3>
            <p className="text-sm text-neutral-300">{count} {countText}</p>
          </div>
        </div>
        
        <div className="p-4 flex justify-between items-center">
          <span className="font-medium">Разгледай</span>
          <ArrowRight size={18} className="text-amber-800 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;