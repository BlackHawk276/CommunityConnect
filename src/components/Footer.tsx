// Footer section with links, contact info, and branding

import { Heart, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-md flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-xl font-bold font-display">
                CommunityConnect
              </span>
            </Link>
            <p className="text-neutral-400 text-sm">
              Connecting communities across India
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <a href="#how-it-works" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                How It Works
              </a>
              <a href="#for-ngos" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                For NGOs
              </a>
              <a href="#for-volunteers" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                For Volunteers
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                Contact Us
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:hello@communityconnect.org" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
                <Mail size={16} />
                hello@communityconnect.org
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
                <Phone size={16} />
                +91 98765 43210
              </a>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            © 2024 CommunityConnect. Made with ❤️ for communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
