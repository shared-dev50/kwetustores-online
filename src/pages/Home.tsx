import { HiPlus } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative overflow-hidden bg-[#FFF5F0] rounded-[30px] my-6 py-16 lg:py-24">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#ea580c15] rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <span className="text-[#ea580c] font-bold tracking-widest uppercase text-sm">
            Fresh & Local
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
            Freshness Delivered to <br />
            <span className="text-[#ea580c]">Your Doorstep.</span>
          </h1>
          <p className="mb-8 text-slate-600 text-lg">
            Shop groceries, household essentials, and electronics from Kwetu
            Stores.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn border-none bg-[#ea580c] hover:bg-[#d94e08] text-white px-8 h-14 rounded-full shadow-lg transition-all hover:scale-105">
              Start Shopping
            </button>
            <button className="btn btn-outline border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:border-[#ea580c] hover:text-white px-8 h-14 rounded-full transition-all">
              View Deals
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Featured Items
            </h2>
            <p className="text-slate-500">The most popular picks this week</p>
          </div>
          <button
            className="text-[#ea580c] font-semibold hover:cursor-pointer hover:underline"
            onClick={() => navigate("/products")}
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(item => (
            <div
              key={item}
              className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 relative"
            >
              <Link to={`/products/${item}`} className="block cursor-pointer">
                <figure className="bg-[#F3F4F6] rounded-xl h-56 mb-4 flex items-center justify-center overflow-hidden">
                  <div className="text-gray-400 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-xs font-medium uppercase tracking-widest">
                      View Product
                    </span>
                  </div>
                </figure>

                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 text-lg truncate group-hover:text-[#ea580c] transition-colors">
                    Product #{item}
                  </h3>
                  <p className="text-sm text-gray-500">500g / 1kg</p>
                </div>
              </Link>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <span className="text-2xl font-black text-slate-900">
                    $ 2
                  </span>
                  <span className="text-sm text-gray-400 line-through ml-2">
                    $ 3
                  </span>
                </div>

                <button
                  onClick={e => {
                    e.preventDefault();
                    console.log("Added to cart");
                  }}
                  className="btn btn-square bg-[#ea580c] hover:bg-[#d94e08] border-none text-white shadow-md z-20"
                >
                  <HiPlus size={20} />
                </button>
              </div>

              <div className="absolute top-6 left-6 pointer-events-none">
                <div className="badge border-none bg-[#ea580c] text-white font-bold p-3">
                  -15% OFF
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
