
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Products = () => {
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 100,
    ageRange: "",
  });
  
  // Parse URL params for category filtering
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    
    if (categoryParam) {
      setActiveFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [location]);
  
  // Apply filters when activeFilters change
  useEffect(() => {
    let result = [...products];
    
    if (activeFilters.category) {
      result = result.filter(product => product.category === activeFilters.category);
    }
    
    if (activeFilters.minPrice > 0 || activeFilters.maxPrice < 100) {
      result = result.filter(
        product => product.price >= activeFilters.minPrice && product.price <= activeFilters.maxPrice
      );
    }
    
    if (activeFilters.ageRange) {
      // This is a simplified example. In a real app, you'd need to parse the age range from the product data
      result = result.filter(product => product.ageRange?.includes(activeFilters.ageRange));
    }
    
    setFilteredProducts(result);
  }, [activeFilters]);
  
  const handlePriceChange = (min: number, max: number) => {
    setActiveFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveFilters(prev => ({ 
      ...prev, 
      category: prev.category === category ? "" : category 
    }));
  };
  
  const handleAgeRangeChange = (range: string) => {
    setActiveFilters(prev => ({ 
      ...prev, 
      ageRange: prev.ageRange === range ? "" : range 
    }));
  };
  
  const clearFilters = () => {
    setActiveFilters({
      category: "",
      minPrice: 0,
      maxPrice: 100,
      ageRange: "",
    });
  };
  
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-12">
          <motion.h1 
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Products
          </motion.h1>
          <motion.p 
            className="text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse our extensive collection of wholesale toys for your retail store
          </motion.p>
        </div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-6">
            <button 
              onClick={toggleFilters}
              className="w-full flex items-center justify-between p-3 border border-white/20 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <FiFilter /> Filters
                {(activeFilters.category || activeFilters.minPrice > 0 || 
                  activeFilters.maxPrice < 100 || activeFilters.ageRange) && (
                  <span className="bg-primary/80 text-white text-xs rounded-full px-2 py-0.5">
                    Active
                  </span>
                )}
              </span>
              <FiChevronDown className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-4 border border-white/10 rounded-lg bg-card"
              >
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Filters</h3>
                    {(activeFilters.category || activeFilters.minPrice > 0 || 
                      activeFilters.maxPrice < 100 || activeFilters.ageRange) && (
                      <button 
                        onClick={clearFilters}
                        className="text-sm text-primary hover:text-primary/80"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <FilterSection />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Desktop filters sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card p-6 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">Filters</h3>
                  {(activeFilters.category || activeFilters.minPrice > 0 || 
                    activeFilters.maxPrice < 100 || activeFilters.ageRange) && (
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <FilterSection />
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-400">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select className="bg-card border border-white/20 rounded text-sm p-1">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold mb-2">No products found</p>
                <p className="text-gray-400">Try adjusting your filters</p>
                <button 
                  onClick={clearFilters} 
                  className="mt-4 btn-outline"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter section component (shared between mobile and desktop)
const FilterSection = () => {
  const categories = [
    { id: "action-figures", name: "Action Figures" },
    { id: "plush", name: "Plush Toys" },
    { id: "dolls", name: "Dolls" },
    { id: "vehicles", name: "Vehicles" },
    { id: "educational", name: "Educational" },
    { id: "board-games", name: "Board Games" },
    { id: "construction", name: "Construction" },
    { id: "creative", name: "Arts & Crafts" },
  ];
  
  const ageRanges = ["0+", "3+", "4+", "6+", "8+", "12+"];
  
  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center">
              <input 
                type="checkbox" 
                id={`cat-${category.id}`} 
                className="mr-3 h-4 w-4 accent-primary"
              />
              <label htmlFor={`cat-${category.id}`} className="text-sm">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price range filter */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <input 
            type="range" 
            min="0" 
            max="100" 
            className="w-full accent-primary" 
            value="50"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>$0</span>
            <span>$100</span>
          </div>
        </div>
      </div>
      
      {/* Age range filter */}
      <div>
        <h4 className="font-medium mb-3">Age Range</h4>
        <div className="flex flex-wrap gap-2">
          {ageRanges.map(range => (
            <button 
              key={range}
              className="px-3 py-1 border border-white/20 rounded text-sm hover:bg-white/10 transition-colors"
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
