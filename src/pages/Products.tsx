import { useState, useMemo} from "react";
import { useSearchParams } from "react-router-dom";
import { HiX, HiFilter } from "react-icons/hi";
import ProductCard from "../components/ProductCard";
import useGetAllProducts from "../hooks/useGetAllProducts";
import useGetCategories from "../hooks/useGetCategories";

const Products = () => {
  const { data: products, isLoading} = useGetAllProducts();
  const { data: categories} = useGetCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedCategoryId = searchParams.get("category");
  const searchName = searchParams.get("search")?.toLowerCase() || "";
  
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const dynamicMax = useMemo(() => {
    if (!products?.length) return 2000;
    return Math.ceil(Math.max(...products.map(p => p.price || 0)));
  }, [products]);

  const updateCategory = (id: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (id) params.set("category", id); else params.delete("category");
    setSearchParams(params);
    setShowMobileFilters(false);
  };

  const processedProducts = useMemo(() => {
    if (!products) return [];
    let result = products.filter(p => p.enabledOnline);
    if (searchName) result = result.filter(p => p.name?.toLowerCase().includes(searchName));
    if (selectedCategoryId) {
      result = result.filter(p => p.categories?.elements?.some(c => c.id === selectedCategoryId));
    }
    result = result.filter(p => (p.price || 0) <= maxPrice);
    
    return [...result].sort((a, b) => {
      if (sortBy === "low-high") return (a.price || 0) - (b.price || 0);
      if (sortBy === "high-low") return (b.price || 0) - (a.price || 0);
      return 0;
    });
  }, [products, selectedCategoryId, searchName, maxPrice, sortBy]);


  return (
    <div className="bg-[#F8F9FA] min-h-screen px-4 md:px-6">
      <div className="max-w-7xl mx-auto py-4 md:py-8">
        
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-xl font-bold text-slate-800">Products</h2>
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-semibold"
          >
            <HiFilter className="text-[#ea580c]" /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className={`
            fixed inset-0 z-50 bg-white p-6 transition-transform md:relative md:translate-x-0 md:z-0 md:bg-transparent md:p-0 md:w-64
            ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}
          `}>
            <div className="flex items-center justify-between mb-8 md:hidden">
              <span className="font-bold text-xl">Filters</span>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-slate-100 rounded-full"><HiX /></button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-8 border border-slate-100">
              {/* Categories Section */}
              <div>
                <h3 className="font-bold text-slate-800 mb-4">Categories</h3>
                <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  <button
                    onClick={() => updateCategory(null)}
                    className={`flex justify-between items-center p-2 rounded-lg text-sm transition-all ${!selectedCategoryId ? "bg-orange-50 text-[#ea580c] font-bold" : "hover:bg-slate-50 text-slate-600"}`}
                  >
                    <span>All Products</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">{products?.length || 0}</span>
                  </button>
                  {categories?.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => updateCategory(cat.id)}
                      className={`text-left p-2 rounded-lg text-sm transition-all ${selectedCategoryId === cat.id ? "bg-orange-50 text-[#ea580c] font-bold" : "hover:bg-slate-50 text-slate-600"}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Max Price</h3>
                  <span className="text-[#ea580c] font-bold">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={dynamicMax}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#ea580c] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                  <span>$0</span>
                  <span>${dynamicMax}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-[#ea580c] text-white rounded-xl font-bold md:hidden"
              >
                Show {processedProducts.length} Results
              </button>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="hidden md:flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {selectedCategoryId ? categories?.find(c => c.id === selectedCategoryId)?.name : "All Items"}
              </h2>
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                className="select select-bordered select-sm bg-white rounded-lg border-slate-200"
              >
                <option value="default">Default Sorting</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>

            {!isLoading && processedProducts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No matches found for your current filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;