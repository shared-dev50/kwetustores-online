import { Link } from "react-router-dom";
import { HiXCircle } from "react-icons/hi";

const Failure = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-xl text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <HiXCircle size={80} className="text-red-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-500 mb-8 font-medium">
          We couldn't process your payment. This could be due to a card issue 
          or a temporary connection glitch with Clover.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/checkout"
            className="btn btn-wide bg-red-500 hover:bg-red-600 border-none text-white font-bold h-14 rounded-2xl mx-auto"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="text-gray-400 hover:text-gray-600 font-semibold text-sm transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Failure;