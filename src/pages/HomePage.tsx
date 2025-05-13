import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import TestimonialCard from '../components/TestimonialCard';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useInView } from '../hooks/useInView';

const HomePage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Refs for animation sections
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { threshold: 0.1 });
  const categoriesInView = useInView(categoriesRef, { threshold: 0.1 });
  const testimonialsInView = useInView(testimonialsRef, { threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-24 pb-16"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
            alt="Modern living room furniture"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-white">
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 ${
                heroInView ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              {t.hero.title}
            </h1>
            <p 
              className={`text-lg md:text-xl text-neutral-200 mb-8 max-w-xl transition-all duration-700 delay-100 ${
                heroInView ? 'animate-fade-in animate-delay-100' : 'opacity-0'
              }`}
            >
              {t.hero.subtitle}
            </p>
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-200 ${
                heroInView ? 'animate-fade-in animate-delay-200' : 'opacity-0'
              }`}
            >
              <Link to="/products" className="btn btn-primary">
                {t.hero.browseButton}
              </Link>
              <Link to="/contact" className="btn bg-white text-neutral-900 hover:bg-neutral-100">
                {t.hero.contactButton}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
          <div className="animate-bounce">
            <ArrowRight size={24} className="transform rotate-90" />
          </div>
          <span className="text-sm mt-2 block">Scroll down</span>
        </div>
      </section>

      {/* Categories Section */}
      <section 
        ref={categoriesRef}
        className="section-padding bg-stone-100"
      >
        <div className="container-custom">
          <div className="text-center max-w3xl mx-auto mb-12">
            <h2 
              className={`text-3xl md:text-4xl font-bold mb-4 text-neutral-900 transition-all duration-700 ${
                categoriesInView ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              {t.categories.title}
            </h2>
            <p 
              className={`text-neutral-600 transition-all duration-700 delay-100 ${
                categoriesInView ? 'animate-fade-in animate-delay-100' : 'opacity-0'
              }`}
            >
              {t.categories.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t.categories.livingRoom,
                image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
                count: 24
              },
              {
                title: t.categories.bedroom,
                image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
                count: 18
              },
              {
                title: t.categories.diningRoom,
                image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
                count: 15
              },
              {
                title: t.categories.office,
                image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg",
                count: 12
              },
              {
                title: t.categories.kitchen,
                image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
                count: 20
              },
              {
                title: t.categories.outdoor,
                image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
                count: 16
              }
            ].map((category, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 delay-${index * 100} ${
                  categoriesInView ? 'animate-fade-in' : 'opacity-0'
                }`}
              >
                <CategoryCard {...category} countText={t.categories.productsCount} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="section-padding bg-amber-800/5"
      >
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 
              className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
                testimonialsInView ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              {t.testimonials.title}
            </h2>
            <p 
              className={`text-neutral-600 transition-all duration-700 delay-100 ${
                testimonialsInView ? 'animate-fade-in animate-delay-100' : 'opacity-0'
              }`}
            >
              {t.testimonials.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Доволен клиент",
                role: "София",
                content: "Качеството на мебелите е изключително. Доставката беше навреме и монтажът беше професионален. Препоръчвам!",
                rating: 5,
                image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              },
              {
                name: "Редовен клиент",
                role: "Пловдив",
                content: "Вече втори път обзавеждам дома си с мебели от тук. Изключително съм доволен от качеството и обслужването.",
                rating: 5,
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              },
              {
                name: "Щастлив клиент",
                role: "Варна",
                content: "Страхотно съотношение цена-качество. Мебелите са точно каквито ги искахме и изглеждат прекрасно в дома ни.",
                rating: 5,
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 delay-${index * 100} ${
                  testimonialsInView ? 'animate-fade-in' : 'opacity-0'
                }`}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="relative section-padding py-20 md:py-28"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-900/80 z-10"></div>
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
            alt="Beautiful furniture"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <div 
            className={`max-w-3xl mx-auto text-center text-white transition-all duration-700 ${
              ctaInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products" className="btn btn-primary">
                {t.cta.browseButton}
              </Link>
              <Link to="/contact" className="btn bg-white text-neutral-900 hover:bg-neutral-100">
                {t.cta.contactButton}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;