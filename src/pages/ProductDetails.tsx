
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowLeft, FiMinus, FiPlus, FiBox, FiTruck } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import ToyModel3D from "@/components/ToyModel3D";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  const addToCart = useCartStore((state) => state.addItem);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Set initial quantity to min order
      if (foundProduct.minOrder) {
        setQuantity(foundProduct.minOrder);
      }
      
      // Find related products (same category, excluding current product)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-6">Product Not Found</h1>
          <p className="mb-8 text-gray-400">The product you are looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn-primary">
            <FiArrowLeft className="mr-2" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  // Handlers
  const decrementQuantity = () => {
    setQuantity(prev => Math.max(product.minOrder || 1, prev - 1));
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-white">Products</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-primary truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {/* Product Image/Model */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.hasModel ? (
              <div>
                <div className="mb-4">
                  <button 
                    onClick={() => setShowModel(!showModel)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      showModel 
                        ? 'bg-primary text-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {showModel ? '2D Image' : '3D Model'}
                  </button>
                </div>
                
                {showModel ? (
                  <ToyModel3D toyType={product.category === "action-figures" ? "robot" : "car"} />
                ) : (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-auto rounded-2xl border border-white/10 object-cover aspect-square"
                  />
                )}
              </div>
            ) : (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto rounded-2xl border border-white/10 object-cover aspect-square"
              />
            )}
          </motion.div>
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              <span className="text-gray-400 ml-2">per unit</span>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FiBox className="text-primary mr-2" />
                  <span className="font-medium">Minimum Order</span>
                </div>
                <p className="text-gray-300">{product.minOrder} units</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FiTruck className="text-primary mr-2" />
                  <span className="font-medium">Stock Status</span>
                </div>
                <p className={`${
                  (product.stock || 0) > 100 
                    ? 'text-green-400' 
                    : (product.stock || 0) > 20 
                    ? 'text-yellow-400' 
                    : 'text-red-400'
                }`}>
                  {(product.stock || 0) > 100 ? 'In Stock' : 
                   (product.stock || 0) > 20 ? 'Limited Stock' : 'Low Stock'}
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <p className="mb-2 font-medium">Age Range</p>
              <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm">
                {product.ageRange || "All Ages"}
              </div>
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium">Quantity</p>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  disabled={quantity <= (product.minOrder || 1)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiMinus />
                </button>
                <span className="mx-6 w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10"
                >
                  <FiPlus />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">Total: ${(product.price * quantity).toFixed(2)}</p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3"
            >
              <FiShoppingCart /> Add to Cart
            </button>
          </motion.div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
