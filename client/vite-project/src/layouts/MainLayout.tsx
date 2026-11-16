import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import ScrollToTop from "../components/Layout/ScrollToTop";
import AddedToCartModal from "../components/product/AddedToCartModal";
const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AddedToCartModal />
    </>
  );
};

export default MainLayout;
