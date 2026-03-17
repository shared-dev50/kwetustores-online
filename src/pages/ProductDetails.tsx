import { useState } from "react";
import {
  HiMinus,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiPlus,
} from "react-icons/hi";
import { useCartStore } from "../stores/useCartStore";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useGetProduct";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const { id } = useParams();

  const { data: product, isLoading, error } = useProduct(id!);

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  if (error || !product)
    return (
      <div className="p-10 text-center text-red-500">Product not found.</div>
    );

  const mainImage = product.images?.elements?.[0]?.url || null;

  return (
    <div className="bg-[#F8F9FA] min-h-screen px-5">
      <div className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-[30px] shadow-sm">
          <div className="bg-[#F3F4F6] rounded-3xl h-125 flex items-center justify-center overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <div className="text-center p-4">
                <span className="text-gray-400 font-medium uppercase tracking-widest">
                  {product.name}
                </span>
                <p className="text-xs text-gray-300 mt-2">No image available</p>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-[#ea580c] font-bold text-sm uppercase mb-2">
              {product.categories?.elements?.[0]?.name || "General"}
            </span>

            <h1 className="text-4xl font-black text-slate-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-slate-800">
                ${product.price ? product.price : 0}
              </span>

              {product.available !== false ? (
                <span className="badge border-none bg-green-500 gap-2 text-white font-semibold">
                  In Stock
                </span>
              ) : (
                <span className="badge border-none bg-red-500 gap-2 text-white font-semibold">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-slate-600 mb-8 leading-relaxed">
              {product.description || "Pick from Kwetu Stores."}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-gray-50">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-gray-500 hover:text-[#ea580c] transition-colors"
                >
                  <HiMinus />
                </button>
                <span className="px-6 font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-gray-500 hover:text-[#ea580c] transition-colors"
                >
                  <HiPlus />
                </button>
              </div>
              <button
                onClick={() => addItem({ product, quantity })}
                className="btn flex-1 border-none bg-[#ea580c] hover:bg-[#d94e08] text-white rounded-full h-14 text-lg shadow-lg"
              >
                Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <HiOutlineTruck className="text-[#ea580c] text-2xl" />
                <span>
                  Express Delivery
                  <br />
                  <b>Within Seattle</b>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <HiOutlineShieldCheck className="text-[#ea580c] text-2xl" />
                <span>
                  Quality Choice
                  <br />
                  <b>Verified Product</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
