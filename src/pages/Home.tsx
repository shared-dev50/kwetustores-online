import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useGetAllProducts from "../hooks/useGetAllProducts";
import { useMemo } from "react";
import kwetu from "../assets/kwetu.png";

const Home = () => {
  const navigate = useNavigate();
  const { data: products } = useGetAllProducts();

  // const featuredProducts = useMemo(() => {
  //   if (!products) return [];

  //   return [...products]
  //     .filter(product => product.hidden !== true)
  //     // eslint-disable-next-line react-hooks/purity
  //     .sort(() => Math.random() - 0.5)
  //     .slice(0, 12);
  // }, [products]);

  // kwetustores
  const featuredProducts = useMemo(() => {
    if (!products) return [];

    return (
      [...products]
        .filter(
          product =>
            (product.stockQuantity ?? 0) > 0 && product.enabledOnline === true,
        )
        // eslint-disable-next-line react-hooks/purity
        .sort(() => Math.random() - 0.5)
        .slice(0, 12)
    );
  }, [products]);


  return (
    <>
      <div
        className="relative my-5 sm:my-6 lg:my-7 overflow-hidden rounded-4xl bg-cover bg-center h-40 sm:h-48 md:h-56 lg:h-62.5 flex items-center"
        style={{ backgroundImage: `url(${kwetu})` }}
      >
        <div className="relative z-10 w-full" />
      </div>

      <div className="w-full py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Popular Picks
            </h2>
            <p className="text-sm text-slate-500">
              Our current favorites, refreshed daily.
            </p>
          </div>
        </div>

        {featuredProducts && featuredProducts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="italic text-slate-400">Loading fresh stock...</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            className="cursor-pointer text-sm font-bold text-[#ea580c] hover:underline"
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;