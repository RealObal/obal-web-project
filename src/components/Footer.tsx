import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2A43] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img src="/Logo2.png" alt="Ronald Obal Logo" className="h-16 w-auto opacity-90" />
            </div>
            <p className="text-gray-300 mb-4">
              MEAL Manager specializing in monitoring, evaluation, accountability,
              and learning systems for social impact programs.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-[#C9A227] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-[#C9A227] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-gray-300 hover:text-[#C9A227] transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-[#C9A227] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-[#C9A227] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-[#C9A227] mt-1" />
                <a
                  href="mailto:ronaldobal20@gmail.com"
                  className="text-gray-300 hover:text-[#C9A227] transition-colors"
                >
                  ronaldobal20@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-[#C9A227] mt-1" />
                <a
                  href="tel:+256776280494"
                  className="text-gray-300 hover:text-[#C9A227] transition-colors"
                >
                  +256 776 280 494
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#C9A227] mt-1" />
                <span className="text-gray-300">Gulu & Kampala, Uganda</span>
              </li>
              <li className="flex items-start space-x-3">
                <Linkedin size={18} className="text-[#C9A227] mt-1" />
                <a
                  href="https://linkedin.com/in/ronaldobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#C9A227] transition-colors"
                >
                  linkedin.com/in/ronaldobal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Ronald Obal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
