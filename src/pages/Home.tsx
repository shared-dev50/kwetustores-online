import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useGetAllProducts from "../hooks/useGetAllProducts";
import { useMemo } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { data: products } = useGetAllProducts();

  const featuredProducts = useMemo(() => {
    if (!products) return [];

    return (
      [...products]
        .filter(product => (product.stockQuantity ?? 0) > 0)
        // eslint-disable-next-line react-hooks/purity
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
    );
  }, [products]);

  return (
    <>
      <div className="relative my-4 overflow-hidden rounded-[30px] bg-[#FFF5F0] py-12 lg:py-16">
        <div className="absolute right-[-5%] top-[-10%] h-96 w-96 rounded-full bg-[#ea580c15] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="max-w-2xl">
              <span className="text-sm font-bold uppercase tracking-widest text-[#ea580c]">
                Fresh groceries, every day
              </span>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
                Fresh food and daily essentials,
                <span className="text-[#ea580c]"> all in one place.</span>
              </h1>

              <p className="mt-5 text-lg text-slate-600">
                Shop fresh produce, pantry staples, beverages, cleaning
                supplies, and everyday household essentials from Kwetu Stores.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  className="btn h-14 rounded-full border-none bg-[#ea580c] px-8 text-white shadow-lg transition-all hover:scale-105 hover:bg-[#d94e08]"
                  onClick={() => navigate("/products")}
                >
                  Shop Now
                </button>

                <button
                  className="btn btn-outline h-14 rounded-full border-[#ea580c] px-8 text-[#ea580c] transition-all hover:border-[#ea580c] hover:bg-[#ea580c] hover:text-white"
                  onClick={() => navigate("/products")}
                >
                  Browse Categories
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-[28px] bg-white/70 p-6 shadow-sm backdrop-blur-sm border border-orange-100">
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="font-bold text-slate-900">Fresh Produce</p>
                    <p className="mt-1 text-slate-500">
                      Fruits and vegetables picked for everyday freshness
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="font-bold text-slate-900">Pantry Staples</p>
                    <p className="mt-1 text-slate-500">
                      Flour, rice, sugar, cooking oil, and more
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="font-bold text-slate-900">Home Essentials</p>
                    <p className="mt-1 text-slate-500">
                      Cleaning products and everyday household needs
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="font-bold text-slate-900">Fast & Easy</p>
                    <p className="mt-1 text-slate-500">
                      A simple way to shop what you need in minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Popular Picks</h2>
            <p className="mt-2 text-slate-500">
              A few customer favorites available right now.
            </p>
          </div>

          <button
            className="font-semibold text-[#ea580c] hover:cursor-pointer hover:underline"
            onClick={() => navigate("/products")}
          >
            View All
          </button>
        </div>

        {featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center italic text-slate-400">
            Check back soon for fresh stock and store favorites.
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
