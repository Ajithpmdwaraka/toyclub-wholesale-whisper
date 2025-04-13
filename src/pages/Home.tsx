
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { FiArrowRight, FiBox, FiTruck, FiUsers } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import ToyModel3D from "@/components/ToyModel3D";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const categories = [
  { 
    id: "action-figures", 
    name: "Action Figures", 
    image: "/placeholder.svg", 
    description: "Collectible action figures from popular franchises" 
  },
  { 
    id: "dolls", 
    name: "Dolls", 
    image: "/placeholder.svg", 
    description: "Beautiful dolls for all ages" 
  },
  { 
    id: "educational", 
    name: "Educational", 
    image: "/placeholder.svg", 
    description: "Learning toys that make education fun" 
  },
  { 
    id: "vehicles", 
    name: "Vehicles", 
    image: "/placeholder.svg", 
    description: "Cars, planes, trains and more" 
  },
  { 
    id: "plush", 
    name: "Plush Toys", 
    image: "/placeholder.svg", 
    description: "Soft, huggable plush for all ages" 
  },
  { 
    id: "board-games", 
    name: "Board Games", 
    image: "/placeholder.svg", 
    description: "Family fun with board and card games" 
  },
];

const featuredProducts = products.filter(product => product.featured);

const Home = () => {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based animations
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroYOffset = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.3]);
  
  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="h-screen relative overflow-hidden flex items-center"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-background z-10"></div>
        
        {/* Background visual effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#55AAFF20_0,_transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FF555520_0,_transparent_70%)]"></div>
        
        <div className="container-custom z-20 flex flex-col lg:flex-row items-center mt-16">
          <motion.div 
            className="lg:w-1/2"
            style={{ 
              y: heroYOffset,
              opacity: heroOpacity
            }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="block">Wholesale Toys</span>
              <span className="block text-primary mt-2">For Every Retailer</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Quality toys at competitive wholesale prices. Explore our extensive collection and boost your retail business.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products" className="btn-primary">
                Shop Now <FiArrowRight className="ml-2" />
              </Link>
              <Link to="/about" className="btn-outline">
                Learn More
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <ToyModel3D />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="text-sm text-gray-400 mb-2">Scroll to explore</div>
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <div className="w-1.5 h-3 bg-gray-400 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our top selling wholesale toys perfect for your inventory
            </p>
          </motion.div>

          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="pb-12"
          >
            {featuredProducts.map((product, index) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="text-center mt-4">
            <Link to="/products" className="btn-outline">
              View All Products <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-accent">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse By Category</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find exactly what your store needs from our diverse toy categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="relative overflow-hidden rounded-xl h-60 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                  <Link 
                    to={`/products?category=${category.id}`}
                    className="inline-flex items-center text-primary hover:text-primary/90 text-sm font-medium"
                  >
                    Shop Now <FiArrowRight className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-24" ref={aboutRef}>
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ToyClub</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're dedicated to helping your business succeed with premium wholesale toys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FiBox size={24} />}
              title="Premium Quality"
              description="All our toys meet or exceed international safety standards with durable materials and expert craftsmanship"
              index={0}
            />
            <FeatureCard 
              icon={<FiTruck size={24} />}
              title="Fast Delivery"
              description="Quick turnaround times with efficient logistics to ensure your inventory is stocked promptly"
              index={1}
            />
            <FeatureCard 
              icon={<FiUsers size={24} />}
              title="Dedicated Support"
              description="Our team of experts is always ready to assist you with your wholesale needs and questions"
              index={2}
            />
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/about" className="btn-outline">
              Learn More About Us <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Stock Your Store?
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Browse our selection of premium wholesale toys and place your order today. Get in touch for custom quotes and bulk discounts.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/products" className="btn-primary">
                Shop Now
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => (
  <motion.div 
    className="glass p-8 rounded-xl"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
  >
    <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default Home;
