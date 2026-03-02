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
  return (
    <div className="bg-[#F8F9FA] min-h-screen px-5">
      <div className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-[30px] shadow-sm">
          <div className="space-y-4">
            <div className="bg-[#F3F4F6] rounded-3xl h-100 flex items-center justify-center">
              {product?.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>
            <div className="flex gap-4">
              {product?.images?.slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  className="w-24 h-24 bg-gray-100 rounded-xl border-2 border-transparent hover:border-[#ea580c] cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${product.title} thumbnail ${i + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[#ea580c] font-bold text-sm uppercase mb-2">
              {product?.category.name}
            </span>
            <h1 className="text-4xl font-black text-slate-900 mb-4">
              {product?.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-slate-800">
                ${product?.price}
              </span>
              <span className="badge badge-success gap-2 text-white font-semibold">
                In Stock
              </span>
            </div>

            <p className="text-slate-600 mb-8 leading-relaxed">
              {product?.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-gray-50">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-gray-500 hover:text-[#ea580c]"
                >
                  <HiMinus />
                </button>
                <span className="px-6 font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-gray-500 hover:text-[#ea580c]"
                >
                  <HiPlus />
                </button>
              </div>
              <button
                onClick={() => addItem({ product, quantity })}
                className="btn flex-1 border-none bg-[#ea580c] hover:bg-[#d94e08] text-white rounded-full h-14 text-lg"
              >
                Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <HiOutlineTruck className="text-[#ea580c] text-xl" />
                <span>
                  Express Delivery
                  <br />
                  <b>In 30-60 mins</b>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <HiOutlineShieldCheck className="text-[#ea580c] text-xl" />
                <span>
                  Quality Guaranteed
                  <br />
                  <b>100% Organic</b>
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
