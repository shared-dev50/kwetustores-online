import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useGetAllProducts from "../hooks/useGetAllProducts";
import { useMemo } from "react";
import kwetu from "../assets/kwetu.png";

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
      <div
        className="relative my-4 overflow-hidden rounded-[40px] bg-cover bg-top py-24 lg:py-32"
        style={{ backgroundImage: `url(${kwetu})` }}
      >
        <div className="absolute inset-0 z-0 bg-linear-to-l from-slate-900/80 via-slate-900/50 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="hidden lg:block" />

            <div className="max-w-2xl text-center lg:text-right">
              <span className="text-sm font-bold uppercase tracking-widest text-orange-400">
                Home Flavors, Global Reach
              </span>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Fresh food and daily essentials,
                <span className="text-[#ea580c]"> all in one place.</span>
              </h1>

              <p className="mt-5 text-lg text-slate-100/90">
                Shop fresh produce, pantry staples, beverages, cleaning
                supplies, and everyday household essentials from Kwetu Stores.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-end">
                <button
                  className="btn h-14 rounded-full border-none bg-[#ea580c] px-10 text-white shadow-lg transition-all hover:scale-105 hover:bg-[#d94e08]"
                  onClick={() => navigate("/products")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Popular Picks</h2>
            <p className="mt-2 text-slate-500">
              A few customer favorites available right now.
            </p>
          </div>

          <button
            className="font-bold text-[#ea580c] hover:cursor-pointer hover:underline"
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>

        {featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="italic text-slate-400">
              Check back soon for fresh stock and store favorites.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
