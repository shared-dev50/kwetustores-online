import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* HERO */}
      <div className="bg-blue-600 text-white py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Welcome to Kwetu Stores</h1>
          <p className="mb-6">
            Your favorite local products, now available online. Shop with ease
            and trust.
          </p>
          <button className="btn btn-primary">Start Shopping</button>
        </div>
      </div>
      {/* PRODUCT GRID */}
      <div className="p-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(item => (
            <div
              key={item}
              className="card bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <figure className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Product {item}</span>
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Kwetu Item #{item}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>Crisps</p>
                <div className="card-actions justify-between mt-4">
                  <span className="text-xl font-bold">$ 2</span>
                  <button className="btn btn-primary btn-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* FOOTER */}
      <footer className="footer footer-center p-10 bg-gray-200 text-gray-700 rounded-t-lg">
        <div>
          <p>© 2026 Kwetu Stores Online</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
