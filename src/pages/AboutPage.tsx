import React, { useRef } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useInView } from '../hooks/useInView';

const AboutPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Refs for animation sections
  const introRef = useRef(null);
  const valuesRef = useRef(null);
  const ctaRef = useRef(null);

  const introInView = useInView(introRef, { threshold: 0.1 });
  const valuesInView = useInView(valuesRef, { threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { threshold: 0.1 });

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white mb-16">
        <div className="container-custom py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">За МебелиБГ</h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Създаваме качествени мебели с внимание към всеки детайл от 2020 г.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section 
        ref={introRef}
        className="section-padding"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div 
              className={`transition-all duration-700 ${
                introInView ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              <h2 className="text-3xl font-bold mb-6">Нашата история</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  МебелиБГ е малък семеен бизнес, основан през 2020 г. с една проста мисия: 
                  да създава висококачествени, функционални и красиви мебели на достъпни цени.
                </p>
                <p>
                  Нашият малък, но отдаден екип се състои от опитни майстори, които влагат 
                  цялото си сърце и умения във всяка изработена мебел. Вярваме, че качеството 
                  се крие в детайлите и личното отношение към всеки проект.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">Защо да изберете нас:</h3>
                <ul className="space-y-3">
                  {[
                    'Персонално отношение към всеки клиент',
                    'Внимание към всеки детайл',
                    'Качествени материали от проверени доставчици',
                    'Гъвкави решения според вашите нужди'
                  ].map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={20} className="text-amber-800 mt-1 mr-2 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div 
              className={`transition-all duration-700 delay-200 ${
                introInView ? 'animate-fade-in animate-delay-200' : 'opacity-0'
              }`}
            >
              <img 
                src="https://images.pexels.com/photos/4050296/pexels-photo-4050296.jpeg" 
                alt="Our workshop" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <img 
                  src="https://images.pexels.com/photos/4050316/pexels-photo-4050316.jpeg" 
                  alt="Furniture making process" 
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img 
                  src="https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg" 
                  alt="Our furniture" 
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section 
        ref={valuesRef}
        className="section-padding bg-neutral-100"
      >
        <div className="container-custom">
          <div 
            className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
              valuesInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Нашите ценности</h2>
            <p className="text-neutral-600">
              Принципите, които ръководят нашата работа и ни помагат да създаваме 
              качествени мебели за вашия дом
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Качество',
                description: 'Използваме само качествени материали и отделяме специално внимание на всеки детайл.'
              },
              {
                title: 'Персонално отношение',
                description: 'Изслушваме внимателно вашите нужди и предлагаме решения, които отговарят на очакванията ви.'
              },
              {
                title: 'Надеждност',
                description: 'Спазваме сроковете и поетите ангажименти, защото ценим вашето време и доверие.'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className={`card p-8 text-center transition-all duration-700 delay-${index * 100} ${
                  valuesInView ? 'animate-fade-in' : 'opacity-0'
                }`}
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
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
            src="https://images.pexels.com/photos/276534/pexels-photo-276534.jpeg"
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
              Готови ли сте да преобразите вашия дом?
            </h2>
            <p className="text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
              Разгледайте нашата колекция от качествени мебели или се свържете с нас 
              за персонална консултация.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products" className="btn btn-primary">
                Разгледай продуктите
              </Link>
              <Link to="/contact" className="btn bg-white text-neutral-900 hover:bg-neutral-100">
                Свържете се с нас
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;