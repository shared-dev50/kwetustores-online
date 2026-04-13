import { HiOutlineShoppingCart, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCartStore } from "../stores/useCartStore";
import { useSearchStore } from "../stores/useSearchStore";
import { useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

const Navbar = () => {
  const navigate = useNavigate();
  
  const { cart } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const { searchQuery, setSearchQuery } = useSearchStore();
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();

    navigate(
      trimmed
        ? `/products?search=${encodeURIComponent(trimmed)}`
        : "/products"
    );
  };

const handleLogoClick = () => {
  setSearchQuery("");
  navigate("/", { replace: true }); 
};

  const handleShopAll = () => {
    setSearchQuery("");
    navigate("/products");
  };

useEffect(() => {
  const trimmed = debouncedSearch.trim();
  const current = new URLSearchParams(window.location.search).get("search") || "";

  if (trimmed === current) return;

  if (trimmed.length >= 3) {
    navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    return;
  }

  if (trimmed.length === 0 && current !== "") {
    navigate("/products");
  }
}, [debouncedSearch, navigate]);


  return (
    <nav className="w-full rounded-2xl bg-white shadow-sm border border-slate-100 mb-6 sticky top-2 z-40">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
        {/* Logo */}
        <button onClick={handleLogoClick} className="shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-12 md:h-16 w-auto transition-transform hover:scale-105 cursor-pointer"
          />
        </button>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 justify-center max-w-2xl mx-auto"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="input input-bordered w-full rounded-xl bg-slate-50 border-gray-200 focus:border-[#ea580c] pr-12"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-12 top-3 text-gray-400"
              >
                <HiX size={18} />
              </button>
            )}
          </div>
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {/* Shop All */}
          <button
            onClick={handleShopAll}
            className="btn btn-sm md:btn-md border-none text-white bg-[#ea580c] hover:bg-[#d94e08] rounded-xl px-4"
          >
            Shop All
          </button>

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

      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="input input-sm input-bordered w-full rounded-lg bg-slate-50"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;

