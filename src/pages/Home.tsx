import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useGetAllProducts from "../hooks/useGetAllProducts";

const Home = () => {
  const navigate = useNavigate();
  const { data: products } = useGetAllProducts();

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
          {products?.slice(0, 4).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showDiscount
              discountPercentage={15}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
