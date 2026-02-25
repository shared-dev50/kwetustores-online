const Products = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen px-5">
      <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-8 bg-white p-6 rounded-2xl shadow-sm h-fit">
          <div>
            <h3 className="font-bold text-slate-800 mb-4">Categories</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex justify-between items-center text-[#ea580c] font-semibold">
                <span>All Products</span>
                <span className="text-xs bg-orange-100 px-2 py-1 rounded-full">
                  48
                </span>
              </li>
              <li className="hover:text-[#ea580c] cursor-pointer">
                Fruits & Veg
              </li>
              <li className="hover:text-[#ea580c] cursor-pointer">
                Dairy & Eggs
              </li>
              <li className="hover:text-[#ea580c] cursor-pointer">Beverages</li>
              <li className="hover:text-[#ea580c] cursor-pointer">Snacks</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-4">Price Range</h3>
            <input
              type="range"
              min="0"
              max="100"
              className="range range-warning range-sm"
            />
            <div className="flex justify-between text-xs mt-2 text-gray-500">
              <span>$0</span>
              <span>$100+</span>
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Fresh Groceries
            </h2>
            <select className="select select-bordered bg-white select-sm border-gray-300">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="h-48 bg-gray-100 rounded-xl mb-4"></div>
                <h4 className="font-bold text-slate-800">
                  Organic Cavendish Bananas
                </h4>
                <p className="text-sm text-gray-400">1kg</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">$4.99</span>
                  <button className="btn btn-sm bg-[#ea580c] text-white border-none">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
