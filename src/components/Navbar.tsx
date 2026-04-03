import { useEffect, useState } from "react";
import { HiOutlineShoppingCart, HiX} from "react-icons/hi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCartStore } from "../stores/useCartStore";

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounced;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  const debouncedSearch = useDebounce(searchQuery, 400);
  const cart = useCartStore(state => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (trimmed !== urlSearch) {
      if (trimmed.length > 2) {
        navigate(`/products?search=${encodeURIComponent(trimmed)}`, { replace: true });
      } else if (trimmed.length === 0 && urlSearch !== "") {
        navigate("/products", { replace: true });
      }
    }
  }, [debouncedSearch, navigate, urlSearch]);

  useEffect(() => { setSearchQuery(urlSearch); }, [urlSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    navigate(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : "/products");
  };

  return (
    <nav className="w-full rounded-2xl bg-white shadow-sm border border-slate-100 mb-6 sticky top-2 z-40">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
        <Link to="/" onClick={() => setSearchQuery("")} className="shrink-0">
          <img src={logo} alt="Logo" className="h-12 md:h-16 w-auto transition-transform hover:scale-105" />
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 justify-center max-w-2xl mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="input input-bordered w-full rounded-xl bg-slate-50 border-gray-200 focus:border-[#ea580c] pr-12"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")} className="absolute right-12 top-3 text-gray-400">
                <HiX size={18} />
              </button>
            )}
          </div>
        </form>
{/* Actions */}
<div className="ml-auto flex items-center gap-2 sm:gap-4">
  {/* Shop All Button - Text only on all screens */}
  <Link 
    to="/products" 
    className="btn btn-sm md:btn-md border-none text-white bg-[#ea580c] hover:bg-[#d94e08] rounded-xl px-4"
  >
    Shop All
  </Link>

  {/* Cart */}
  <label
    htmlFor="my-drawer-5"
    className="btn btn-ghost btn-circle text-[#ea580c] cursor-pointer"
  >
    <div className="indicator">
      <HiOutlineShoppingCart size={26} />
      {totalItems > 0 && (
        <span className="badge badge-sm indicator-item bg-black text-white border-none">
          {totalItems}
        </span>
      )}
    </div>
  </label>
</div>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="input input-sm input-bordered w-full rounded-lg bg-slate-50"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;