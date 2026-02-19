import { HiOutlineShoppingCart, HiOutlineUserCircle } from "react-icons/hi";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar bg-white mt-[1.5%] mb-[1.5%] rounded-[17px] shadow-lg px-4 lg:px-12 sticky top-0 z-50 gap-4">
      <div className="flex-none">
        <img
          src={logo}
          alt="Kwetu Stores Logo"
          className="h-30 w-auto object-contain"
        />
      </div>

      <div className="flex-1 hidden md:flex justify-center px-4">
        <div className="relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search groceries, drinks, electronics..."
            className="input input-bordered w-full bg-white text-black border-gray-300 focus:border-[#ea580c] focus:outline-none"
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

      <div className="flex-none flex items-center gap-3 lg:gap-5">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn border-none text-white bg-[#ea580c] hover:bg-[#d94e08] hidden sm:flex"
          >
            Categories
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white text-black rounded-box z-1 w-52 p-2 shadow mt-2"
          >
            <li>
              <a>Groceries</a>
            </li>
            <li>
              <a>Fruits & Vegetables</a>
            </li>
            <li>
              <a>Beverages</a>
            </li>
            <li>
              <a>Electronics</a>
            </li>
            <li>
              <a>Household</a>
            </li>
          </ul>
        </div>

        {/* Cart */}
        <div className="btn btn-circle border-none bg-[#ea580c] hover:bg-[#d94e08] text-white">
          <div className="indicator">
            <HiOutlineShoppingCart size={24} />
            <span className="badge badge-sm indicator-item bg-black text-white border-none">
              0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
          <div className="btn btn-ghost btn-circle text-[#ea580c]">
            <HiOutlineUserCircle size={28} />
          </div>
          <button className="btn btn-ghost text-black hover:bg-gray-100 hidden lg:block font-semibold">
            Login / Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
