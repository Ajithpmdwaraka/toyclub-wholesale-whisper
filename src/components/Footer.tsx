
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 mt-20 pt-16 pb-8">
      <div className="container-custom">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold font-poppins mb-4">
              <span className="text-primary">Toy</span>
              <span className="text-white">Club</span>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              Premium wholesale toys for retailers worldwide. Quality products, competitive prices, and excellent service.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<FiInstagram />} href="https://instagram.com" />
              <SocialIcon icon={<FiTwitter />} href="https://twitter.com" />
              <SocialIcon icon={<FiFacebook />} href="https://facebook.com" />
              <SocialIcon icon={<FiYoutube />} href="https://youtube.com" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/products" label="Shop All" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/contact" label="Contact" />
              <FooterLink href="/login" label="Wholesale Login" />
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-3">
              <FooterLink href="/products?category=action-figures" label="Action Figures" />
              <FooterLink href="/products?category=board-games" label="Board Games" />
              <FooterLink href="/products?category=dolls" label="Dolls" />
              <FooterLink href="/products?category=educational" label="Educational" />
              <FooterLink href="/products?category=outdoor" label="Outdoor Toys" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="text-gray-300 mb-2">123 Toy Street</p>
              <p className="text-gray-300 mb-4">Toyland, TL 12345</p>
              <p className="mb-2">
                <span className="text-gray-400">Phone: </span>
                <a href="tel:+919846494210" className="text-white hover:text-primary transition-colors">
                  +91 9846 494 210
                </a>
              </p>
              <p>
                <span className="text-gray-400">Email: </span>
                <a href="mailto:info@toyclub.com" className="text-white hover:text-primary transition-colors">
                  info@toyclub.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} ToyClub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer Link Component
const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link to={href} className="text-gray-300 hover:text-primary transition-colors">
      {label}
    </Link>
  </li>
);

// Social Icon Component
const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center text-white"
  >
    {icon}
  </a>
);

export default Footer;
