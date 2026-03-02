import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { useCartStore } from "../stores/useCartStore";
import type { Product } from "../entities/types";

interface Props {
  product: Product;
  showDiscount?: boolean;
  discountPercentage?: number;
}

const ProductCard = ({
  product,
  showDiscount = false,
  discountPercentage = 0,
}: Props) => {
  const addItem = useCartStore(state => state.addItem);
  const discount = discountPercentage ?? 0;

  const discountedPrice = showDiscount
    ? Math.round(product.price * (1 - discount / 100))
    : product.price;

  return (
    <div className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 relative">
      <Link to={`/products/${product.id}`} className="block cursor-pointer">
        <figure className="bg-[#F3F4F6] rounded-xl h-56 mb-4 flex items-center justify-center overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-gray-400 group-hover:scale-110 transition-transform duration-500 text-center px-2">
              <span className="text-xs font-medium uppercase tracking-widest">
                {product.title}
              </span>
            </div>
          )}
        </figure>

        <div className="space-y-1">
          <h3 className="font-bold text-slate-800 text-lg truncate group-hover:text-[#ea580c] transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500">{product.category.name}</p>
        </div>
      </Link>

      <div className="flex items-center justify-between pt-4">
        <div>
          <span className="text-2xl font-black text-slate-900">
            ${discountedPrice}
          </span>

          {showDiscount && (
            <span className="text-sm text-gray-400 line-through ml-2">
              ${product.price}
            </span>
          )}
        </div>

        {showDiscount && discount > 0 && (
          <div className="absolute top-6 left-6 pointer-events-none">
            <div className="badge border-none bg-[#ea580c] text-white font-bold p-3">
              -{discount}% OFF
            </div>
          </div>
        )}

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
