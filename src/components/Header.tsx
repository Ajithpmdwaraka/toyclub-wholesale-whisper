
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useCartStore } from "@/store/cartStore";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll event for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold font-poppins"
          >
            <span className="text-primary">Toy</span>
            <span className="text-white">Club</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center space-x-8"
        >
          <NavLink to="/" label="Home" />
          <NavLink to="/products" label="Products" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
        </motion.nav>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <button className="p-2 hover:text-primary transition-colors">
            <FiSearch size={20} />
          </button>
          
          <Link to="/cart" className="p-2 hover:text-primary transition-colors relative">
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          
          <Link to="/login" className="hidden md:block">
            <button className="btn-outline">
              Login
            </button>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-card/90 backdrop-blur-md px-4 py-6 border-t border-white/10">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/products" label="Products" />
            <MobileNavLink to="/about" label="About" />
            <MobileNavLink to="/contact" label="Contact" />
            <MobileNavLink to="/login" label="Login" />
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

// Desktop NavLink with hover animation
const NavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link 
      to={to}
      className={`relative font-medium transition-colors ${
        isActive ? "text-primary" : "text-white hover:text-gray-300"
      }`}
    >
      {label}
      {isActive && (
        <motion.span 
          className="absolute -bottom-1 left-0 h-0.5 bg-primary"
          layoutId="navbar-indicator"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
};

// Mobile NavLink
const MobileNavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link 
      to={to} 
      className={`py-2 block ${isActive ? "text-primary" : "text-white"}`}
    >
      {label}
    </Link>
  );
};

export default Header;
