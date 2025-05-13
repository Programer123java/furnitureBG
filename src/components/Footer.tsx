import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations['bg']; // Fallback to Bulgarian if language is undefined

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">{t?.footer?.quickLinks ?? 'Бързи връзки'}</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: t?.nav?.home ?? 'Начало' },
                { to: '/products', label: t?.nav?.products ?? 'Продукти' },
                { to: '/contact', label: t?.nav?.contact ?? 'Контакти' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-neutral-400 hover:text-amber-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">{t?.footer?.categories ?? 'Категории'}</h3>
            <ul className="space-y-2">
              {[
                { label: t?.categories?.livingRoom ?? 'Хол' },
                { label: t?.categories?.bedroom ?? 'Спалня' },
                { label: t?.categories?.diningRoom ?? 'Трапезария' },
                { label: t?.categories?.office ?? 'Офис' },
                { label: t?.categories?.kitchen ?? 'Кухня' },
                { label: t?.categories?.outdoor ?? 'Градина' },
              ].map((category, index) => (
                <li key={index}>
                  <Link to="/products" className="text-neutral-400 hover:text-amber-500 transition-colors">
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">{t?.footer?.contactUs ?? 'Контакти'}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-400">
                  ул. "Иван Вазов" 25, София 1000
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-amber-500 mr-2 flex-shrink-0" />
                <a href="tel:+359887934320" className="text-neutral-400 hover:text-amber-500 transition-colors">
                  +359 886 585 268
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-amber-500 mr-2 flex-shrink-0" />
                <a href="mailto:info@mebeli.bg" className="text-neutral-400 hover:text-amber-500 transition-colors">
                  info@mebeli.bg
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-800 text-center text-neutral-500 text-sm">
          <p>© 2025 МебелиБГ. {t?.footer?.copyright ?? 'Всички права запазени.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;