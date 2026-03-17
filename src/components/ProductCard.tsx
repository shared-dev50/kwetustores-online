import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { useCartStore } from "../stores/useCartStore";
import type { CloverItem } from "../entities/types";

interface Props {
  product: CloverItem;
}

const ProductCard = ({ product }: Props) => {
  const addItem = useCartStore(state => state.addItem);

  return (
    <div className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 relative">
      <Link to={`/products/${product.id}`} className="block cursor-pointer">
        <figure className="bg-[#F3F4F6] rounded-xl h-56 mb-4 flex items-center justify-center overflow-hidden">
          {product.images?.elements?.[0]?.url ? (
            <img
              src={product.images.elements[0].url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-gray-400 group-hover:scale-110 transition-transform duration-500 text-center px-2">
              <span className="text-xs font-medium uppercase tracking-widest">
                {product.name}
              </span>
            </div>
          )}
        </figure>

        <div className="space-y-1">
          <h3 className="font-bold text-slate-800 text-lg truncate group-hover:text-[#ea580c] transition-colors">
            {product.name}
          </h3>
        </div>
      </Link>

      <div className="flex items-center justify-between pt-4">
        <div>
          <span className="text-2xl font-black text-slate-900">
            ${product.price}
          </span>
        </div>

        <button
          onClick={e => {
            e.preventDefault();
            addItem({ product, quantity: 1 });
          }}
          className="btn btn-square bg-[#ea580c] hover:bg-[#d94e08] border-none text-white shadow-md z-20"
        >
          <HiPlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
