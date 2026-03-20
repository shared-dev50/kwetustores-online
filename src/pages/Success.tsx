import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { HiCheckCircle } from "react-icons/hi";

const Success = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-xl text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <HiCheckCircle size={80} className="text-green-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">
          Order Placed!
        </h1>
        <p className="text-gray-500 mb-8 font-medium">
          Thank you for shopping with Kwetu Stores. We've sent the details to
          our team for preparation.
        </p>
        <Link
          to="/"
          className="btn btn-wide bg-[#ea580c] hover:bg-[#d94e08] border-none text-white font-bold h-14 rounded-2xl"
        >
          Back to Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
