import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />{" "}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
