import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowLeft, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon from Font Awesome icons
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const hasItems = items.length > 0;
  const totalPrice = getTotalPrice();
  
  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      
      // Generate formatted message for WhatsApp
      const orderDetails = items.map(item => 
        `- ${item.product.name}, Quantity: ${item.quantity}, Price: $${(item.product.price * item.quantity).toFixed(2)}`
      ).join('\n');
      
      const message = `ToyClub Wholesale Order:
${orderDetails}
Total: $${totalPrice.toFixed(2)}
Order ID: TC-${Date.now().toString().slice(-8)}`;
      
      // Format WhatsApp URL with phone number and encoded message
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/+919846494210?text=${encodedMessage}`;
      
      // Open WhatsApp in new window
      window.open(whatsappUrl, '_blank');
      
      // Clear cart and redirect to confirmation page
      setTimeout(() => {
        clearCart();
        window.location.href = '/checkout';
      }, 1000);
      
    } catch (error) {
      console.error('WhatsApp checkout error:', error);
      toast.error('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold flex items-center mb-4">
            <FiShoppingCart className="mr-3" /> Shopping Cart
          </h1>
          {hasItems ? (
            <p className="text-gray-400">
              You have {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          ) : (
            <p className="text-gray-400">Your cart is empty</p>
          )}
        </motion.div>
        
        {hasItems ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-white/10 overflow-hidden">
                {/* Cart Items */}
                <div className="divide-y divide-white/10">
                  {items.map((item, index) => (
                    <CartItem 
                      key={item.product.id} 
                      item={item} 
                      index={index}
                      updateQuantity={updateQuantity}
                      removeItem={removeItem}
                    />
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="p-6 flex items-center justify-between">
                  <Link 
                    to="/products" 
                    className="text-sm text-primary hover:text-primary/80 flex items-center"
                  >
                    <FiArrowLeft className="mr-2" /> Continue Shopping
                  </Link>
                  
                  <button 
                    onClick={clearCart}
                    className="text-sm text-gray-400 hover:text-white flex items-center"
                  >
                    <FiTrash2 className="mr-2" /> Clear Cart
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-lg border border-white/10 p-6"
              >
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping estimate</span>
                    <span>TBD</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between font-bold">
                    <span>Order total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <FaWhatsapp size={20} /> Proceed with WhatsApp
                    </>
                  )}
                </button>
                
                <p className="mt-4 text-sm text-gray-400 text-center">
                  Click above to place an order via WhatsApp message with all details
                </p>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 mb-6">
              <FiShoppingCart size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Start shopping to fill it with great toys!
            </p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Cart Item Component
interface CartItemProps {
  item: {
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
      minOrder?: number;
    };
    quantity: number;
  };
  index: number;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartItem = ({ item, index, updateQuantity, removeItem }: CartItemProps) => {
  const incrementQuantity = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (item.quantity > (item.product.minOrder || 1)) {
      updateQuantity(item.product.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.product.id);
  };
  
  return (
    <motion.div 
      className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Product Image */}
      <Link to={`/products/${item.product.id}`} className="w-20 h-20 shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </Link>
      
      {/* Product Info */}
      <div className="flex-grow">
        <Link to={`/products/${item.product.id}`}>
          <h3 className="font-medium hover:text-primary transition-colors">{item.product.name}</h3>
        </Link>
        <p className="text-sm text-gray-400">
          ${item.product.price.toFixed(2)} per unit
        </p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center">
        <button 
          onClick={decrementQuantity}
          disabled={item.quantity <= (item.product.minOrder || 1)}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <FiMinus />
        </button>
        <span className="mx-3 w-10 text-center font-medium">{item.quantity}</span>
        <button 
          onClick={incrementQuantity}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-sm"
        >
          <FiPlus />
        </button>
      </div>
      
      {/* Price */}
      <div className="text-right">
        <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={handleRemove}
          className="text-sm text-gray-400 hover:text-red-400 mt-2 flex items-center ml-auto"
        >
          <FiTrash2 className="mr-1" size={14} /> Remove
        </button>
      </div>
    </motion.div>
  );
};

export default Cart;