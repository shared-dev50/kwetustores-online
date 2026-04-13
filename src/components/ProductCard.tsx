import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { useCartStore } from "../stores/useCartStore";
import type { CloverItem } from "../entities/types";
import { useState } from "react";

interface Props {
  product: CloverItem;
}

const ProductCard = ({ product }: Props) => {
  const addItem = useCartStore(state => state.addItem);
  const [imgLoaded, setImgLoaded] = useState(false);
const imageUrl = product.images?.elements?.[0]?.url;

  const isOutOfStock = (product.stockQuantity ?? 0) <= 0;

  const CardContent = (
    <>
      <figure className="bg-[#F3F4F6] rounded-xl h-56 mb-4 flex items-center justify-center overflow-hidden relative">
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 shadow-sm">
              Sold Out
            </span>
          </div>
        )}

   {imageUrl ? (
  <div className="relative w-full h-full">
    {/* Blur placeholder */}
    {!imgLoaded && (
      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
    )}

    <img
      src={imageUrl}
      alt={product.name}
      loading="lazy"
      decoding="async"
      onLoad={() => setImgLoaded(true)}
      className={`
        w-full h-full object-cover transition-all duration-500
        ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
        ${isOutOfStock ? "grayscale opacity-50" : ""}
      `}
    />
  </div>
) : (
  <div
    className={`text-gray-400 transition-transform duration-500 text-center px-2 ${
      !isOutOfStock && "group-hover:scale-110"
    }`}
  >
    <span className="text-xs font-medium uppercase tracking-widest">
      {product.name}
    </span>
  </div>
)}
      </figure>

      <div className="space-y-1">
        <h3
          className={`font-bold text-lg truncate transition-colors 
          ${isOutOfStock ? "text-slate-400" : "text-slate-800 group-hover:text-[#ea580c]"}`}
        >
          {product.name}
        </h3>
      </div>
    </>
  );

  return (
    <div
      className={`group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all duration-300 relative 
        ${isOutOfStock ? "cursor-not-allowed shadow-none" : "hover:shadow-2xl"}`}
    >
      {isOutOfStock ? (
        <div className="block">{CardContent}</div>
      ) : (
        <Link to={`/products/${product.id}`} className="block cursor-pointer">
          {CardContent}
        </Link>
      )}

      <div className="flex items-center justify-between pt-4">
        <div className="flex flex-col">
          <span
            className={`text-2xl font-black ${isOutOfStock ? "text-slate-300" : "text-slate-900"}`}
          >
            ${Number(product.price).toFixed(2)}
          </span>
          {isOutOfStock && (
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-tighter">
              Out of Stock
            </span>
          )}
        </div>

        {isOutOfStock ? (
          <div className="p-3 text-slate-200 bg-slate-50 rounded-xl border border-slate-100">
            <HiPlus size={20} />
          </div>
        ) : (
          <button
            onClick={e => {
              e.preventDefault();
              addItem({ product, quantity: 1 });
            }}
            className="btn btn-square bg-[#ea580c] hover:bg-[#d94e08] border-none text-white shadow-md z-20"
          >
            <HiPlus size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
