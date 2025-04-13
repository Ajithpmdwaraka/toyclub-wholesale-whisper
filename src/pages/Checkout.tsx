
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";

const Checkout = () => {
  // Track successful order completion
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="container-custom max-w-lg mx-auto">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-6">
            <FiCheckCircle size={40} />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Successfully Placed!</h1>
          
          <p className="text-gray-300 mb-8">
            Your wholesale order has been sent to our team via WhatsApp. We'll get back to you shortly to confirm your order details.
          </p>
          
          <div className="bg-card border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="font-bold mb-3">What happens next?</h2>
            
            <div className="text-left text-sm text-gray-300 space-y-4">
              <div className="flex">
                <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">1</span>
                <p>Our team will review your order and reach out via WhatsApp for confirmation.</p>
              </div>
              
              <div className="flex">
                <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">2</span>
                <p>We'll provide shipping details, timeline, and payment information.</p>
              </div>
              
              <div className="flex">
                <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">3</span>
                <p>Once payment is processed, your order will be shipped to your location.</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-outline">
              Back to Home
            </Link>
            <Link to="/products" className="btn-primary flex items-center justify-center gap-2">
              <FiShoppingBag /> Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
