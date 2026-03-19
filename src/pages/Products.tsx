import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useGetAllProducts from "../hooks/useGetAllProducts";
import useGetCategories from "../hooks/useGetCategories";

const Products = () => {
  const { data: products } = useGetAllProducts();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get("category");
  const searchName = searchParams.get("search")?.toLowerCase() || "";

  const [sortBy, setSortBy] = useState<string>("default");
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const dynamicMax = useMemo(() => {
    if (!products?.length) return 2000;
    return Math.ceil(Math.max(...products.map(p => p.price || 0)));
  }, [products]);

  const updateCategory = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }

    setSearchParams(params);
  };

  const processedProducts = useMemo(() => {
    if (!products) return [];

    let result = products;

    if (searchName) {
      result = result.filter(p => p.name?.toLowerCase().includes(searchName));
    }

    if (selectedCategoryId) {
      result = result.filter(p =>
        p.categories?.elements?.some(cat => cat.id === selectedCategoryId),
      );
    }

    result = result.filter(p => (p.price || 0) <= maxPrice);

    return [...result].sort((a, b) => {
      if (sortBy === "low-high") return (a.price || 0) - (b.price || 0);
      if (sortBy === "high-low") return (b.price || 0) - (a.price || 0);
      return 0;
    });
  }, [products, selectedCategoryId, searchName, maxPrice, sortBy]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen px-5">
      <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-8 bg-white p-6 rounded-2xl shadow-sm h-fit">
          <div>
            <h3 className="font-bold text-slate-800 mb-4">Categories</h3>
            <ul className="space-y-2 text-slate-600">
              <li
                onClick={() => updateCategory(null)}
                className={`flex justify-between items-center cursor-pointer transition-colors ${
                  !selectedCategoryId
                    ? "text-[#ea580c] font-semibold"
                    : "hover:text-[#ea580c]"
                }`}
              >
                <span>All Products</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    !selectedCategoryId ? "bg-orange-100" : "bg-gray-100"
                  }`}
                >
                  {products?.length || 0}
                </span>
              </li>

              {categoriesLoading ? (
                <div className="flex flex-col gap-2 mt-2">
                  {[1, 2, 3, 4].map(n => (
                    <div
                      key={n}
                      className="h-4 w-full bg-gray-100 animate-pulse rounded"
                    />
                  ))}
                </div>
              ) : (
                categories?.map(cat => (
                  <li
                    key={cat.id}
                    onClick={() => updateCategory(cat.id)}
                    className={`cursor-pointer transition-colors ${
                      selectedCategoryId === cat.id
                        ? "text-[#ea580c] font-semibold"
                        : "hover:text-[#ea580c]"
                    }`}
                  >
                    {cat.name}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-4">
              Max Price: <span className="text-[#ea580c]">${maxPrice}</span>
            </h3>
            <input
              type="range"
              min="0"
              max={dynamicMax}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="range range-warning range-sm"
            />
            <div className="flex justify-between text-xs mt-2 text-gray-500">
              <span>$0</span>
              <span>${dynamicMax}</span>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {selectedCategoryId
                ? categories?.find(c => c.id === selectedCategoryId)?.name
                : "All Products"}
            </h2>

            <select
              className="select select-bordered bg-white select-sm border-gray-300"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="default">Sort by: Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {processedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {processedProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">No products match your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
