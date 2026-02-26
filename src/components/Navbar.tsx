import { HiOutlineShoppingCart, HiOutlineUserCircle } from "react-icons/hi";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-white mb-6 rounded-[17px] shadow-lg px-4 lg:px-12 top-4 z-50 gap-4">
      <div className="flex-none">
        <Link to="/">
          <img
            src={logo}
            alt="Kwetu Stores Logo"
            className="h-20 w-auto object-contain transition-transform hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex-1 hidden md:flex justify-center px-4">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search groceries, drinks..."
            className="input input-bordered h-10 w-full bg-white text-black border-gray-300 focus:border-[#ea580c] focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
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
          </div>
        </div>
      </div>

      <div className="flex-none flex items-center gap-2 lg:gap-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm lg:btn-md border-none text-white bg-[#ea580c] hover:bg-[#d94e08] hidden sm:flex"
          >
            Categories
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white text-black rounded-box z-1 w-52 p-2 shadow-xl mt-2"
          >
            <li>
              <Link to="/products">Groceries</Link>
            </li>
            <li>
              <Link to="/products">Fruits & Vegetables</Link>
            </li>
            <li>
              <Link to="/products">Beverages</Link>
            </li>
          </ul>
        </div>

        <label
          htmlFor="my-drawer-5"
          className="btn btn-ghost btn-circle text-[#ea580c] cursor-pointer"
        >
          <div className="indicator">
            <HiOutlineShoppingCart size={26} />
            <span className="badge badge-sm indicator-item bg-black text-white border-none">
              0
            </span>
          </div>
        </label>

        <div className="flex items-center border-l pl-2 border-gray-200">
          <div className="btn btn-ghost btn-circle text-[#ea580c]">
            <HiOutlineUserCircle size={30} />
          </div>
          <button className="btn btn-ghost btn-sm text-black hover:bg-gray-100 hidden lg:block font-bold">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
