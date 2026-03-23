import { useEffect, useState } from "react";
import { HiOutlineShoppingCart, HiX } from "react-icons/hi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCartStore } from "../stores/useCartStore";
import useGetCategories from "../hooks/useGetCategories";

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
  const { data: categories } = useGetCategories();

  const urlSearch = searchParams.get("search") || "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const cart = useCartStore(state => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (trimmed !== urlSearch) {
      if (trimmed.length > 2) {
        navigate(`/products?search=${encodeURIComponent(trimmed)}`, {
          replace: true,
        });
      } else if (trimmed.length === 0 && urlSearch !== "") {
        navigate("/products", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleLogoClick = () => {
    setSearchQuery("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    navigate("/products");
  };

  return (
    <>
      <div className="navbar bg-white mb-6 rounded-[17px] shadow-lg px-4 lg:px-12 top-4 z-50 gap-4">
        <div className="flex-none">
          <Link to="/" onClick={handleLogoClick}>
            <img
              src={logo}
              alt="Kwetu Stores Logo"
              className="h-20 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 hidden md:flex justify-center px-4"
        >
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="input input-bordered h-10 w-full bg-white text-black border-gray-300 focus:border-[#ea580c] focus:outline-none pr-16"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-8 flex items-center text-gray-400 hover:text-red-500"
              >
                <HiX size={18} />
              </button>
            )}

            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#ea580c]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        <div className="flex-none flex items-center gap-2 lg:gap-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="btn btn-sm lg:btn-md border-none text-white bg-[#ea580c] hover:bg-[#d94e08] hidden sm:flex"
          >
            Categories
          </button>

          <label
            htmlFor="my-drawer-5"
            className="btn btn-ghost btn-circle text-[#ea580c] cursor-pointer"
          >
            <div className="indicator">
              <HiOutlineShoppingCart size={26} />
              {totalItems > 0 && (
                <span className="badge badge-sm indicator-item bg-black text-white border-none animate-in fade-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </div>
          </label>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>

          <div
            className="relative bg-white w-full max-w-4xl h-[75vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Browse Categories
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <HiX size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link
                  to="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#ea580c] hover:bg-orange-50 transition-all group"
                >
                  <span className="font-bold text-slate-400 group-hover:text-[#ea580c]">
                    View All Products
                  </span>
                </Link>

                {categories?.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setSearchQuery("");
                    }}
                    className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                      searchParams.get("category") === cat.id
                        ? "border-[#ea580c] bg-orange-50"
                        : "border-gray-100 hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                  >
                    <span
                      className={`font-bold ${
                        searchParams.get("category") === cat.id
                          ? "text-[#ea580c]"
                          : "text-slate-700"
                      }`}
                    >
                      {cat.name}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#ea580c] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
