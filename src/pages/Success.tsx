import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { HiCheckCircle, HiArrowRight } from "react-icons/hi";

const Success = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Clear the cart immediately on successful checkout
    clearCart();
  }, [clearCart]);

  return (
    /* Changed 'items-center' to 'items-start' with a top-padding (pt) 
       to prevent it from feeling too low on the screen.
    */
    <div className="min-h-[80vh] flex items-start justify-center bg-[#F8F9FA] px-4 pt-12 md:pt-24 lg:pt-32">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-4xl md:rounded-[40px] shadow-2xl shadow-slate-200/60 text-center border border-slate-100 animate-in fade-in zoom-in duration-500">
        
        {/* Animated Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <HiCheckCircle size={90} className="text-green-500 animate-bounce" />
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>

        {/* Content Section */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
          Success!
        </h1>
        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
          Your order has been placed. Thank you for shopping with <span className="text-[#ea580c] font-bold">Kwetu Stores</span>. 
          Our team is now preparing your items.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/products"
            className="group flex items-center justify-center gap-2 w-full bg-[#ea580c] hover:bg-[#d94e08] text-white font-black h-16 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95"
          >
            Continue Shopping
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/"
            className="text-slate-400 hover:text-slate-600 font-bold text-sm py-2 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;