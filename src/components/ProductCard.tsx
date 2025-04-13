
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { Product, useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addItem);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <motion.div 
      className="card group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.4, delay: index * 0.1 }
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <button 
                onClick={handleAddToCart}
                className="w-full py-2 bg-primary/90 hover:bg-primary rounded-full text-white text-sm font-medium flex items-center justify-center gap-2 transition-all"
              >
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-xs text-gray-400 mt-1">Min order: {product.minOrder} units</p>
            </div>
            
            <div className={`px-2 py-1 text-xs font-medium rounded-full ${
              (product.stock || 0) > 100 
                ? 'bg-green-500/20 text-green-400' 
                : (product.stock || 0) > 20 
                ? 'bg-yellow-500/20 text-yellow-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {(product.stock || 0) > 100 ? 'In Stock' : 
               (product.stock || 0) > 20 ? 'Limited' : 'Low Stock'}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
