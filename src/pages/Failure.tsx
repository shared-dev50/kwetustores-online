import { Link } from "react-router-dom";
import { HiXCircle, HiRefresh} from "react-icons/hi";

const Failure = () => {
  return (
    <div className="min-h-[85vh] flex items-start justify-center bg-[#F8F9FA] px-4 pt-12 md:pt-24 lg:pt-32">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-4xl md:rounded-[40px] shadow-2xl shadow-red-100/50 text-center border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Error Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <HiXCircle size={90} className="text-red-500 animate-pulse" />
            <div className="absolute inset-0 bg-red-500/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
          Payment Failed
        </h1>
        <p className="text-slate-500 mb-8 font-medium leading-relaxed">
          We couldn't process your transaction. This is usually due to a card restriction or a temporary connection issue with the payment processor.
        </p>

 
        <div className="mb-8 rounded-2xl bg-slate-50 p-4 text-left border border-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Quick Checks:</p>
          <ul className="text-xs text-slate-600 space-y-1 font-medium">
            <li className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-400" /> Confirm your CVV and Expiry date
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-400" /> Check your internet connection
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/checkout"
            className="group flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white font-black h-16 rounded-2xl shadow-lg shadow-red-100 transition-all active:scale-95"
          >
            <HiRefresh className="group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Link>
          
             <a
  href="mailto:kwetustores001@gmail.com"
  className="transition-colors hover:text-[#ea580c]"
>
  Contact Us
</a>
        </div>
      </div>
    </div>
  );
};

export default Failure;