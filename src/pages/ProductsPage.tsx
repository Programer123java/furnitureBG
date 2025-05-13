import React, { useState, useCallback } from 'react';
import { Filter, Star, ArrowDown, ArrowUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

interface Product {
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

const ProductsPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    inStock: false,
    onSale: false,
    newProducts: false
  });

  // Demo products for display
  const initialProducts = [
    {
      title: language === 'bg' ? "Модерен диван 'София'" : "Modern Sofa 'Sofia'",
      price: 1200,
      image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
      rating: 4.8,
      category: t.categories.livingRoom,
      isNew: true
    },
    {
      title: language === 'bg' ? "Легло 'Комфорт Плюс'" : "Bed 'Comfort Plus'",
      price: 850,
      image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
      rating: 4.7,
      category: t.categories.bedroom
    },
    {
      title: language === 'bg' ? "Трапезна маса 'Елегант'" : "Dining Table 'Elegant'",
      price: 680,
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      rating: 4.9,
      category: t.categories.diningRoom,
      isSale: true,
      discount: 15
    },
    {
      title: language === 'bg' ? "Офис бюро 'Про'" : "Office Desk 'Pro'",
      price: 450,
      image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg",
      rating: 4.6,
      category: t.categories.office
    },
    {
      title: language === 'bg' ? "Кухня 'Модерн'" : "Kitchen 'Modern'",
      price: 780,
      image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      rating: 4.5,
      category: t.categories.kitchen
    },
    {
      title: language === 'bg' ? "Гардероб 'Какао'" : "Wardrobe 'Cocoa'",
      price: 950,
      image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
      rating: 4.7,
      category: t.categories.bedroom
    },
    {
      title: language === 'bg' ? "Шкаф за телевизор 'Ултра'" : "TV Cabinet 'Ultra'",
      price: 420,
      image: "https://images.pexels.com/photos/6527053/pexels-photo-6527053.jpeg",
      rating: 4.4,
      category: t.categories.livingRoom,
      isSale: true,
      discount: 10
    },
    {
      title: language === 'bg' ? "Холна маса 'Кристал'" : "Coffee Table 'Crystal'",
      price: 340,
      image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg",
      rating: 4.6,
      category: t.categories.livingRoom
    },
    {
      title: language === 'bg' ? "Спален комплект 'Лукс'" : "Bedroom Set 'Lux'",
      price: 1800,
      image: "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg",
      rating: 4.9,
      category: t.categories.bedroom,
      isNew: true
    },
    {
      title: language === 'bg' ? "Трапезен сет 'Хармония'" : "Dining Set 'Harmony'",
      price: 1200,
      image: "https://images.pexels.com/photos/1813502/pexels-photo-1813502.jpeg",
      rating: 4.8,
      category: t.categories.diningRoom
    },
    {
      title: language === 'bg' ? "Офис стол" : "Office Chair",
      price: 280,
      image: "https://i.ebayimg.com/images/g/OH0AAeSwzKloD1pH/s-l1600.webp",
      rating: 4.5,
      category: t.categories.office,
      isSale: true,
      discount: 20
    },
    {
      title: language === 'bg' ? "Кухненски остров 'Шеф'" : "Kitchen Island 'Chef'",
      price: 890,
      image: "https://images.pexels.com/photos/3623785/pexels-photo-3623785.jpeg",
      rating: 4.7,
      category: t.categories.kitchen,
      isNew: true
    }
  ];

  const itemsPerPage = 9;
  const totalPages = Math.ceil(initialProducts.length / itemsPerPage);

  const categories = [
    { id: 'living-room', name: t.categories.livingRoom },
    { id: 'bedroom', name: t.categories.bedroom },
    { id: 'dining-room', name: t.categories.diningRoom },
    { id: 'office', name: t.categories.office },
    { id: 'kitchen', name: t.categories.kitchen },
  ];

  const priceRanges = [
    { id: 'under-300', name: language === 'bg' ? 'Под 300 лв.' : 'Under 300 BGN', min: 0, max: 300 },
    { id: '300-600', name: '300 - 600 BGN', min: 300, max: 600 },
    { id: '600-1000', name: '600 - 1000 BGN', min: 600, max: 1000 },
    { id: 'over-1000', name: language === 'bg' ? 'Над 1000 лв.' : 'Over 1000 BGN', min: 1000, max: Infinity }
  ];

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName);
      }
      return [...prev, categoryName];
    });
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (rangeId: string) => {
    setSelectedPriceRanges(prev => {
      if (prev.includes(rangeId)) {
        return prev.filter(range => range !== rangeId);
      }
      return [...prev, rangeId];
    });
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setFilters({
      inStock: false,
      onSale: false,
      newProducts: false
    });
    setSortOrder('featured');
    setCurrentPage(1);
  };

  const filterProducts = useCallback((products: Product[]) => {
    return products.filter(product => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      if (selectedPriceRanges.length > 0) {
        const priceInRange = selectedPriceRanges.some(rangeId => {
          const range = priceRanges.find(r => r.id === rangeId);
          if (!range) return false;
          return product.price >= range.min && product.price <= range.max;
        });
        if (!priceInRange) return false;
      }

      if (filters.onSale && !product.isSale) return false;
      if (filters.newProducts && !product.isNew) return false;

      return true;
    });
  }, [selectedCategories, selectedPriceRanges, filters, priceRanges]);

  const sortProducts = useCallback((products: Product[]) => {
    const sortedProducts = [...products];
    switch (sortOrder) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'newest':
        return sortedProducts.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      default:
        return sortedProducts;
    }
  }, [sortOrder]);

  const filteredAndSortedProducts = sortProducts(filterProducts(initialProducts));
  
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'bg' ? 'Всички продукти' : 'All Products'}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button 
              className="flex items-center text-neutral-700 sm:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={20} className="mr-2" />
              {t.product.filters.title}
              {isFilterOpen ? <ArrowUp size={16} className="ml-2" /> : <ArrowDown size={16} className="ml-2" />}
            </button>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-neutral-700 whitespace-nowrap">
                {t.product.filters.sort}:
              </label>
              <select 
                id="sort" 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="featured">
                  {language === 'bg' ? 'Препоръчани' : 'Featured'}
                </option>
                <option value="price-asc">
                  {language === 'bg' ? 'Цена (ниска към висока)' : 'Price (Low to High)'}
                </option>
                <option value="price-desc">
                  {language === 'bg' ? 'Цена (висока към ниска)' : 'Price (High to Low)'}
                </option>
                <option value="newest">
                  {language === 'bg' ? 'Най-нови' : 'Newest'}
                </option>
                <option value="rating">
                  {language === 'bg' ? 'Най-високо оценени' : 'Highest Rated'}
                </option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Sidebar */}
          <aside className={`md:w-1/4 lg:w-1/5 ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="sticky top-24 bg-white border border-neutral-200 rounded-lg p-5 mb-5 shadow-sm">
              <h3 className="font-medium text-lg mb-4">{t.product.filters.categories}</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                      className="form-checkbox text-amber-800 rounded mr-2" 
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
              
              <div className="border-t border-neutral-200 my-5"></div>
              
              <h3 className="font-medium text-lg mb-4">{t.product.filters.price}</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.id} className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range.id)}
                      onChange={() => handlePriceRangeChange(range.id)}
                      className="form-checkbox text-amber-800 rounded mr-2" 
                    />
                    <span>{range.name}</span>
                  </label>
                ))}
              </div>
              
              <div className="border-t border-neutral-200 my-5"></div>
              
              <h3 className="font-medium text-lg mb-4">{t.product.filters.title}</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={() => handleFilterChange('inStock')}
                    className="form-checkbox text-amber-800 rounded mr-2" 
                  />
                  <span>{t.product.filters.inStock}</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={() => handleFilterChange('onSale')}
                    className="form-checkbox text-amber-800 rounded mr-2" 
                  />
                  <span>{t.product.filters.onSale}</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={filters.newProducts}
                    onChange={() => handleFilterChange('newProducts')}
                    className="form-checkbox text-amber-800 rounded mr-2" 
                  />
                  <span>{t.product.filters.newProducts}</span>
                </label>
              </div>
              
              <button 
                onClick={clearFilters}
                className="w-full text-neutral-600 py-2 mt-4 hover:text-amber-800 transition-colors"
              >
                {t.product.filters.clearAll}
              </button>
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
            
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-neutral-600">{t.product.filters.noProducts}</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-amber-800 hover:text-amber-900 underline"
                >
                  {t.product.filters.clearFilters}
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      currentPage === 1
                        ? 'border-neutral-200 text-neutral-400 cursor-not-allowed'
                        : 'border-neutral-300 text-neutral-600 hover:bg-amber-800 hover:text-white hover:border-amber-800'
                    }`}
                  >
                    {t.product.filters.previous}
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 border rounded-md transition-colors ${
                        currentPage === page
                          ? 'border-amber-800 bg-amber-800 text-white'
                          : 'border-neutral-300 text-neutral-600 hover:bg-amber-800 hover:text-white hover:border-amber-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      currentPage === totalPages
                        ? 'border-neutral-200 text-neutral-400 cursor-not-allowed'
                        : 'border-neutral-300 text-neutral-600 hover:bg-amber-800 hover:text-white hover:border-amber-800'
                    }`}
                  >
                    {t.product.filters.next}
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;