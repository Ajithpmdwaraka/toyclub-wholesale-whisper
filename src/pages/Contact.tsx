
import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Your message has been sent. We'll get back to you soon!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">
            We're here to help with your wholesale toy needs. Reach out to our team!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <ContactItem 
                  icon={<FiPhone />} 
                  title="Phone" 
                  content="+91 9846 494 210"
                  link="tel:+919846494210"
                />
                
                <ContactItem 
                  icon={<FiMail />} 
                  title="Email" 
                  content="info@toyclub.com"
                  link="mailto:info@toyclub.com"
                />
                
                <ContactItem 
                  icon={<FiMapPin />} 
                  title="Office" 
                  content="123 Toy Street, Toyland, TL 12345"
                />
                
                <ContactItem 
                  icon={<FiClock />} 
                  title="Business Hours" 
                  content="Monday - Friday: 9am - 5pm"
                />
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="font-bold mb-3">Connect With Us</h3>
                <div className="flex gap-4">
                  <SocialButton icon="facebook" />
                  <SocialButton icon="twitter" />
                  <SocialButton icon="instagram" />
                  <SocialButton icon="linkedin" />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-card border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-background border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-background border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-background border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
        
        {/* Map */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-card border border-white/10 rounded-xl p-4 h-96">
            <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Map placeholder</p>
                <p className="font-medium">123 Toy Street, Toyland, TL 12345</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Contact Item Component
interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}

const ContactItem = ({ icon, title, content, link }: ContactItemProps) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-medium">{title}</h3>
      {link ? (
        <a href={link} className="text-gray-300 hover:text-primary transition-colors">
          {content}
        </a>
      ) : (
        <p className="text-gray-300">{content}</p>
      )}
    </div>
  </div>
);

// Social Button Component
const SocialButton = ({ icon }: { icon: string }) => (
  <a 
    href="#" 
    className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/90 flex items-center justify-center transition-colors"
  >
    <span className="sr-only">{icon}</span>
    {/* Use appropriate icon based on name */}
    {icon === "facebook" && <i className="text-white">f</i>}
    {icon === "twitter" && <i className="text-white">t</i>}
    {icon === "instagram" && <i className="text-white">i</i>}
    {icon === "linkedin" && <i className="text-white">l</i>}
  </a>
);

export default Contact;
