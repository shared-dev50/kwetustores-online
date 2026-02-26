import { HiX, HiOutlineShoppingBag } from "react-icons/hi";

const CartDrawer = () => {
  return (
    <div className="drawer-side z-100">
      <label
        htmlFor="my-drawer-5"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <div className="bg-white min-h-full w-80 md:w-96 p-6 shadow-2xl flex flex-col text-slate-800">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-2">
            <HiOutlineShoppingBag size={24} className="text-[#ea580c]" />
            <h2 className="text-xl font-bold">Your Basket</h2>
          </div>
          <label
            htmlFor="my-drawer-5"
            className="btn btn-sm btn-circle btn-ghost"
          >
            <HiX size={20} />
          </label>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <HiOutlineShoppingBag size={60} />
            <p className="mt-2 font-medium">Empty Basket</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Subtotal</span>
            <span className="text-xl font-black text-slate-900">KES 0.00</span>
          </div>

          <button className="btn btn-primary w-full bg-[#ea580c] hover:bg-[#d94e08] border-none text-white font-bold text-lg shadow-lg">
            Checkout Now
          </button>

          <p className="text-center text-xs text-gray-400">
            Shipping & taxes calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
