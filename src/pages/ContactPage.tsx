import React, { useRef, useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useInView } from '../hooks/useInView';

const ContactPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  
  // Refs for animation sections
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);

  const contactInfoInView = useInView(contactInfoRef, { threshold: 0.1 });
  const formInView = useInView(formRef, { threshold: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
      // Clear success message after some time
      setTimeout(() => setFormStatus(null), 5000);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white mb-16">
        <div className="container-custom py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.contact.title}</h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div 
            ref={contactInfoRef}
            className={`transition-all duration-700 ${
              contactInfoInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">{t.contact.info.title}</h2>
            
            <div className="space-y-8">              
              <div className="flex items-start">
                <div className="bg-amber-800/10 p-3 rounded-full mr-4">
                  <Mail size={24} className="text-amber-800" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{t.contact.info.email}</h3>
                  <p className="text-neutral-600">
                    <a href="mailto:info@mebeli.bg" className="hover:text-amber-800 transition-colors">
                      info@mebeli.bg
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-800/10 p-3 rounded-full mr-4">
                  <Phone size={24} className="text-amber-800" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{t.contact.info.phone}</h3>
                  <p className="text-neutral-600">
                    <a href="tel:+359887934320" className="hover:text-amber-800 transition-colors">
                      +359 886 585 268
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-800/10 p-3 rounded-full mr-4">
                  <Clock size={24} className="text-amber-800" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{t.contact.info.workingHours}</h3>
                  <p className="text-neutral-600">{t.contact.info.workingDays}</p>
                  <p className="text-neutral-600">{t.contact.info.saturday}</p>
                  <p className="text-neutral-600">{t.contact.info.sunday}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div 
            ref={formRef}
            className={`transition-all duration-700 delay-200 ${
              formInView ? 'animate-fade-in animate-delay-200' : 'opacity-0'
            }`}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">{t.contact.form.send}</h2>
              
              {formStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  {t.contact.form.success}
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {t.contact.form.error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-neutral-700 mb-2">
                      {t.contact.form.firstName} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-neutral-700 mb-2">
                      {t.contact.form.lastName} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-neutral-700 mb-2">
                    {t.contact.form.email} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-neutral-700 mb-2">
                    {t.contact.form.phone}
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-neutral-700 mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-full"
                >
                  {t.contact.form.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;