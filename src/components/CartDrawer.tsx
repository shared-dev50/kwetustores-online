import {
  HiX,
  HiOutlineShoppingBag,
  HiMinus,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { useCartStore } from "../stores/useCartStore";

const CartDrawer = () => {
  const { cart, removeItem, updateQuantity } = useCartStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="drawer-side z-100">
      <label
        htmlFor="my-drawer-5"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <div className="bg-white min-h-full w-80 md:w-96 p-6 shadow-2xl flex flex-col text-slate-800">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <HiOutlineShoppingBag size={24} className="text-[#ea580c]" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
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
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
              <HiOutlineShoppingBag size={60} />
              <p className="mt-2 font-medium">Empty Basket</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => {
                const itemImage = item.product.images?.elements?.[0]?.url;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-4 bg-gray-50 p-3 rounded-2xl"
                  >
                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                      {itemImage ? (
                        <img
                          src={itemImage}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-400 font-bold uppercase p-1 text-center">
                          {item.product.name}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-[#ea580c] font-black text-sm">
                          ${item.product.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-3 bg-white border rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="text-gray-500 hover:text-[#ea580c] cursor-pointer"
                          >
                            <HiMinus size={14} />
                          </button>
                          <span className="text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="text-gray-500 hover:text-[#ea580c] cursor-pointer"
                          >
                            <HiPlus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <HiTrash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Subtotal</span>
            <span className="text-xl font-black text-slate-900">
              ${subtotal.toLocaleString()}
            </span>
          </div>

          <button
            disabled={cart.length === 0}
            className="btn btn-primary w-full bg-[#ea580c] hover:bg-[#d94e08] border-none text-white font-bold text-lg shadow-lg disabled:bg-gray-300"
          >
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
