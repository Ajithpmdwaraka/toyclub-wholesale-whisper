import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FiArrowRight, FiTruck, FiUsers, FiGlobe, FiBox } from "react-icons/fi";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const opacityTimeline = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [0, 1, 1, 0]);
  const yTimeline = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [100, 0, 0, -100]);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-background">
        <div className="container-custom">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-300 mb-8">
              Building the future of wholesale toy distribution with quality products and exceptional service.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-gray-300 mb-4">
                ToyClub is a premier wholesale toy distributor founded in 2010, dedicated to providing retailers with high-quality toys at competitive prices. We believe in the power of play and its importance in child development.
              </p>
              <p className="text-gray-300 mb-6">
                What started as a small family business has grown into a global operation, but our commitment to quality and customer satisfaction remains the same. We carefully select each toy in our catalog to ensure it meets our strict standards for safety, durability, and play value.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-sm text-gray-400">Retail Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-gray-400">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="rounded-2xl overflow-hidden border border-white/10 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="/placeholder.svg" 
                alt="ToyClub Team" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-accent">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at ToyClub
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<FiBox />} 
              title="Quality" 
              description="We source only the highest quality toys that meet or exceed international safety standards."
              index={0}
            />
            <ValueCard 
              icon={<FiTruck />} 
              title="Reliability" 
              description="Count on us for consistent inventory, on-time deliveries, and responsive support."
              index={1}
            />
            <ValueCard 
              icon={<FiUsers />} 
              title="Partnership" 
              description="We're committed to your success with competitive pricing and growth opportunities."
              index={2}
            />
            <ValueCard 
              icon={<FiGlobe />} 
              title="Sustainability" 
              description="We're working to reduce our environmental impact through responsible practices."
              index={3}
            />
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="py-20" ref={sectionRef}>
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From humble beginnings to an industry leader
            </p>
          </motion.div>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 border-l md:border-l-0 md:border-r border-white/20 h-full"></div>
            
            <TimelineItem 
              year="2010" 
              title="Company Founded" 
              description="ToyClub begins as a small family-operated wholesale business."
              alignment="right"
              scrollYProgress={scrollYProgress}
            />
            
            <TimelineItem 
              year="2015" 
              title="National Expansion" 
              description="Expanded operations to serve retailers nationwide with a broader product catalog."
              alignment="left"
              scrollYProgress={scrollYProgress}
            />
            
            <TimelineItem 
              year="2018" 
              title="International Growth" 
              description="Began exporting to international markets and partnering with global toy manufacturers."
              alignment="right"
              scrollYProgress={scrollYProgress}
            />
            
            <TimelineItem 
              year="2020" 
              title="Digital Transformation" 
              description="Launched our online wholesale platform to streamline ordering and inventory management."
              alignment="left"
              scrollYProgress={scrollYProgress}
            />
            
            <TimelineItem 
              year="2023" 
              title="Sustainable Initiative" 
              description="Committed to eco-friendly packaging and began offering sustainable toy options."
              alignment="right"
              scrollYProgress={scrollYProgress}
            />
            
            <TimelineItem 
              year="Today" 
              title="Innovation Focus" 
              description="Continuing to innovate with 3D product previews and enhanced wholesale experiences."
              alignment="left"
              scrollYProgress={scrollYProgress}
              isLast={true}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Partner With Us?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of retailers who trust ToyClub for their wholesale toy needs
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/products" className="btn-primary">
                Browse Products <FiArrowRight className="ml-2" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Sales Team
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Value Card Component
interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ValueCard = ({ icon, title, description, index }: ValueCardProps) => (
  <motion.div 
    className="bg-white/5 rounded-xl p-6 border border-white/10"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
  >
    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

// Timeline Item Component
interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  alignment: 'left' | 'right';
  scrollYProgress: MotionValue<number>; // Fixed type here
  isLast?: boolean;
}

const TimelineItem = ({ year, title, description, alignment, scrollYProgress, isLast = false }: TimelineItemProps) => (
  <div className={`relative flex items-center justify-between md:justify-normal gap-4 mb-12 ${!isLast ? 'pb-12' : ''}`}>
    {/* Year bubble */}
    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold z-10">
      {/* This is a simplified year indicator */}
    </div>
    
    {/* Content */}
    <div className={`w-full md:w-[calc(50%-20px)] ${
      alignment === 'left' ? 'md:mr-auto' : 'ml-10 md:ml-auto'
    }`}>
      <motion.div 
        className="bg-card p-6 rounded-lg border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="font-bold text-primary mb-1">{year}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </motion.div>
    </div>
  </div>
);

export default About;