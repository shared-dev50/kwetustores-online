import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ImPaypal } from "react-icons/im";
import { RiVisaLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-white text-slate-600 rounded-t-[40px] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)] border-t border-gray-100 mt-10">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#ea580c]">Kwetu Stores</h2>
            <p className="text-sm leading-relaxed">
              Bringing the freshest groceries and daily essentials right to your
              doorstep. Quality you can trust.
            </p>
            <div className="flex gap-4 text-[#ea580c]">
              <FaFacebook
                size={20}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
              <FaInstagram
                size={20}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
              <FaTwitter
                size={20}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
              <FaWhatsapp
                size={20}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">
              Shop
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  All Categories
                </a>
              </li>
              <li>
                <a className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  Fresh Produce
                </a>
              </li>
              <li>
                <a className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  Weekly Deals
                </a>
              </li>
              <li>
                <a className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  Track Order
                </a>
              </li>
              <li>
                <a className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  Delivery Areas
                </a>
              </li>
              <li>
                <a className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-[#ea580c] transition-colors cursor-pointer">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">
              Stay Updated
            </h3>
            <div className="join w-full">
              <input
                className="input input-bordered join-item w-full bg-gray-50 border-gray-200 focus:outline-none focus:border-[#ea580c]"
                placeholder="Email address"
              />
              <button className="btn join-item bg-[#ea580c] hover:bg-[#d94e08] border-none text-white px-4">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium">© 2026 Kwetu Stores Online.</p>
          <div className="flex gap-4">
            <ImPaypal className="h-4 w-4 opacity-50" />
            <RiVisaLine className="h-4 w-4 opacity-50" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
