import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import CartDrawer from "../components/CartDrawer";

const Layout = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen bg-[#F8F9FA]">
        <ScrollToTop />
        <header className="sticky top-0 z-40 w-full px-5 pt-2">
          <Navbar />
        </header>
        <main className="px-5 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      <CartDrawer />
    </div>
  );
};

export default Layout;
