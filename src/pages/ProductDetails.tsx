import { useState } from "react";
import {
  HiMinus,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiPlus,
  HiChevronLeft,
} from "react-icons/hi";
import { useCartStore } from "../stores/useCartStore";
import { useParams, useNavigate } from "react-router-dom";
import useProduct from "../hooks/useGetProduct";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id!);

  if (isLoading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );

  if (error || !product)
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Product not found</h2>
        <button onClick={() => navigate("/products")} className="mt-4 text-orange-600 font-bold">Back to Shop</button>
      </div>
    );

  const mainImage = product.images?.elements?.[0]?.url || null;

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-24 md:pb-12">
      {/* Mobile Back Button */}
      <div className="md:hidden p-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <HiChevronLeft size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 bg-white p-4 md:p-10 rounded-4xl shadow-sm">
          
          {/* Image Gallery Section */}
          <div className="relative aspect-square md:h-125 w-full bg-[#F3F4F6] rounded-3xl overflow-hidden group">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply p-4 md:p-8 transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <span className="font-bold uppercase tracking-widest text-xs">No Image</span>
              </div>
            )}
            
            {/* Stock Badge on Image (Mobile) */}
            <div className="absolute top-4 right-4 md:hidden">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${product.available !== false ? 'bg-green-500' : 'bg-red-500'}`}>
                  {product.available !== false ? "In Stock" : "Sold Out"}
                </span>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-center">
            <nav className="mb-4">
               <span className="text-[#ea580c] font-black text-xs uppercase tracking-widest">
                {product.categories?.elements?.[0]?.name || "General"}
              </span>
            </nav>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-slate-800">
                ${product.price ? product.price.toFixed(2) : "0.00"}
              </span>
              
              <div className="hidden md:block">
                {product.available !== false ? (
                  <span className="badge badge-success gap-2 text-white font-bold py-3">In Stock</span>
                ) : (
                  <span className="badge badge-error gap-2 text-white font-bold py-3">Out of Stock</span>
                )}
              </div>
            </div>

            <div className="prose prose-slate mb-8">
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                {product.description || "High-quality item curated specifically for Kwetu Stores customers."}
              </p>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4 mb-10">
              <div className="flex items-center border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50/50">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1 hover:text-[#ea580c] transition-colors"
                >
                  <HiMinus size={20} />
                </button>
                <span className="px-8 font-black text-xl w-20 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1 hover:text-[#ea580c] transition-colors"
                >
                  <HiPlus size={20} />
                </button>
              </div>
              <button
                onClick={() => addItem({ product, quantity })}
                className="btn flex-1 bg-[#ea580c] hover:bg-[#d94e08] border-none text-white rounded-2xl h-16 text-lg font-bold shadow-xl shadow-orange-200 transition-all active:scale-95"
              >
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-t border-slate-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-xl text-[#ea580c]">
                  <HiOutlineTruck size={24} />
                </div>
                <div className="text-sm">
                  <h4 className="font-bold text-slate-900">Express Delivery</h4>
                  <p className="text-slate-500">Available within Seattle area</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-xl text-[#ea580c]">
                  <HiOutlineShieldCheck size={24} />
                </div>
                <div className="text-sm">
                  <h4 className="font-bold text-slate-900">Quality Verified</h4>
                  <p className="text-slate-500">100% Authentic Product</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE ACTIONS */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <div className="flex items-center border border-slate-200 rounded-xl px-2 py-2 bg-slate-50">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2"><HiMinus /></button>
            <span className="px-4 font-bold">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="p-2"><HiPlus /></button>
          </div>
          <button
            onClick={() => addItem({ product, quantity })}
            className="flex-1 bg-[#ea580c] text-white rounded-xl h-12 font-bold active:scale-95 transition-transform"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;