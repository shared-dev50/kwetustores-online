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
        .filter(
          product =>
            (product.stockQuantity ?? 0) > 0 && product.enabledOnline === true,
        )
        // eslint-disable-next-line react-hooks/purity
        .sort(() => Math.random() - 0.5)
        .slice(0, 12)
    );
  }, [products]);
// const featuredProducts = useMemo(() => {
//   if (!products) return [];

//   return [...products]
//     .filter(product => 
//       product.hidden !== true 
//     )
//     // eslint-disable-next-line react-hooks/purity
//     .sort(() => Math.random() - 0.5)
//     .slice(0, 12);
// }, [products]);

  return (
    <>
      <div
        className="relative my-4 overflow-hidden rounded-4xl bg-cover bg-center h-62.5 flex items-center"
        style={{ backgroundImage: `url(${kwetu})` }}
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8">
          {/* <div className="flex flex-col items-center justify-center text-center">
            <button className="btn h-12 rounded-full bg-[#ea580c] text-white px-10 shadow-xl transition-all hover:scale-110">
              Shop Now
            </button>
          </div> */}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Popular Picks</h2>
            <p className="text-sm text-slate-500">
              Our current favorites, refreshed daily.
            </p>
          </div>

        </div>

        {featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
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
            className="text-sm font-bold text-[#ea580c] hover:underline cursor-pointer"
            onClick={() => navigate("/products")}
          >
            View All 
           
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
