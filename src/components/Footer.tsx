import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTiktok,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 sm:mt-12 rounded-t-4xl sm:rounded-t-[40px] border-t border-slate-200 bg-white text-slate-600 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#ea580c]">Kwetu Stores</h2>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Everyday essentials for your home, with simple
              ordering and convenient pickup or delivery.
            </p>

            <div className="flex gap-4 pt-1 text-[#ea580c]">
              <a
                href="#" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-transform hover:scale-110"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/kwetustores?igsh=aGMybWF6bmt0anhw&utm_source=qr" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform hover:scale-110"
              >
                <FaInstagram size={18} />
              </a>
                    <a
                href="https://www.tiktok.com/@kwetu.stores?_r=1&_t=ZT-95Grxffs3jS" target="_blank" rel="noopener noreferrer"
                aria-label="TikTok"
                className="transition-transform hover:scale-110"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href="https://wa.me/12539709400" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-transform hover:scale-110"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/products"
                  className="transition-colors hover:text-[#ea580c]"
                >
                  Shop All Products
                </Link>
              </li>

              <li>
                <Link
                  to="/checkout"
                  className="transition-colors hover:text-[#ea580c]"
                >
                  Checkout
                </Link>
              </li>

           <a
  href="mailto:kwetustores001@gmail.com"
  className="transition-colors hover:text-[#ea580c]"
>
  Contact Us
</a>
            </ul>
          </div>

          {/* Store Info */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">
              Store Information
            </h3>

            <div className="space-y-4 text-sm text-slate-500">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#ea580c]" />
                <div>
                  <p>6402 S Tacoma Way</p>
                  <p>Tacoma, WA 98409</p>
                  <p>United States</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="shrink-0 text-[#ea580c]" />
                <a
                  href="tel:+12539709400"
                  className="transition-colors hover:text-[#ea580c]"
                >
                  (253) 970-9400
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm font-medium text-slate-500">
            © 2026 Kwetu Stores Online. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;