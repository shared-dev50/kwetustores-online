import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="bg-[#F8F9FA] min-h-screen flex flex-col font-sans">
        <header className="top-0 z-50 w-full px-5 pt-2 sticky">
          <Navbar />
        </header>

        <main className="px-5 flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
