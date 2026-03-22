import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-500 transition-colors">
                <FaTicketAlt className="text-white text-lg" />
              </div>
              <span className="text-white text-2xl font-bold tracking-tight">
                Zion
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Bhopal's premium event management platform. Discover, book, and
              experience the best tech, music, and business events near you.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/events"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-indigo-400 transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Admin Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/events?category=Tech"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Tech Conferences
                </Link>
              </li>
              <li>
                <Link
                  to="/events?category=Music"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Music Festivals
                </Link>
              </li>
              <li>
                <Link
                  to="/events?category=Business"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Business Meetups
                </Link>
              </li>
              <li>
                <Link
                  to="/events?category=Sports"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Sports Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
              Get In Touch
            </h3>
            <div className="flex items-start gap-3 text-sm">
              <FaMapMarkerAlt className="text-indigo-500 mt-1" />
              <p>
                MP Nagar, Zone 1, Arera Colony,
                <br />
                Bhopal, MP - 462011
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FaEnvelope className="text-indigo-500" />
              <p>support@zionevents.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} **Zion Pvt. Ltd.** All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1">
            Built with <span className="text-red-500 text-lg">♥</span> for
            Bhopal
          </p>
          <div className="flex gap-6 text-xs uppercase tracking-tighter">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
