import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  rating
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={`${i <= rating ? 'text-amber-500 fill-amber-500' : 'text-neutral-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        {renderStars()}
      </div>
      
      <p className="text-neutral-700 mb-6 flex-grow">"{content}"</p>
      
      <div className="mt-auto">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-neutral-500">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;