import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { translations } from '../utils/translations';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { totalItems } = useCart();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/products', label: t.nav.products },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-heading font-bold text-amber-900">МебелиБГ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'text-amber-800'
                  : 'text-brown hover:text-amber-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleLanguage} 
            className="flex items-center text-brown hover:text-amber-800"
          >
            <Globe size={18} className="mr-1" />
            <span className="text-sm">{language === 'bg' ? 'EN' : 'BG'}</span>
          </button>
          
          <Link 
            to="/cart" 
            className="relative p-2 text-brown hover:text-amber-800"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>
          
          <Link to="/contact" className="btn btn-primary">
            {t.nav.contact}
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-brown"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-2 font-medium ${
                  location.pathname === link.to
                    ? 'text-amber-800'
                    : 'text-neutral-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200 flex justify-between">
              <button 
                onClick={toggleLanguage} 
                className="flex items-center text-neutral-600"
              >
                <Globe size={18} className="mr-1" />
                <span>{language === 'bg' ? 'EN' : 'BG'}</span>
              </button>
              
              <Link 
                to="/cart" 
                className="relative p-2 text-neutral-600"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar