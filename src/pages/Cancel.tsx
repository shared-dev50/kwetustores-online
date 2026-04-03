import { Link } from "react-router-dom";
import { HiArrowLeft, HiOutlineShoppingBag, HiInformationCircle } from "react-icons/hi";

const Cancel = () => {
  return (
    /* Shifted content higher up the page (pt-12 to pt-32) */
    <div className="min-h-[85vh] flex items-start justify-center bg-[#F8F9FA] px-4 pt-12 md:pt-24 lg:pt-32">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-4xl md:rounded-[40px] shadow-2xl shadow-slate-200/50 text-center border border-slate-100 animate-in fade-in zoom-in duration-500">
        
        {/* Neutral Information Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <HiInformationCircle size={50} />
            </div>
            {/* Subtle orange accent glow */}
            <div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-orange-100 p-1 text-[#ea580c]">
               <HiOutlineShoppingBag size={14} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
          Payment Canceled
        </h1>
        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
          No worries! Your order wasn't processed and your items are still waiting in your cart. You can resume your checkout whenever you're ready.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-[#ea580c] hover:bg-[#d94e08] text-white font-black h-16 rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-95"
          >
            Return to Checkout
          </Link>
          
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm py-2 transition-colors"
          >
            <HiArrowLeft size={16} />
            Keep Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;