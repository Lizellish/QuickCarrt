import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopPage from "./pages/shop/ShopPage";
import CategoriesPage from "./pages/shop/CategoriesPage";
import ProductDetailsPage from "./pages/shop/ProductDetailsPage";
import Homeoage from "./pages/home/Homeoage";
import OrderConfirmationPages from "./pages/cart/OrderConfirmationPages";
import AdminLoginpage from "./pages/admin/AdminLoginpage";
import AdminCustomerPage from "./pages/admin/AdminCustomerPage";
import AcocuntSettingsPage from "./pages/account/AcocuntSettingsPage";
import SavedItemsPage from "./pages/account/SavedItemsPage";
import CartPage from "./pages/cart/CartPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPages from "./pages/auth/ForgotPasswordPages";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import CheckOutPage from "./pages/cart/CheckOutPage";
import OrderDetailsPage from "./pages/account/OrderDetailsPage";
import AdminProductpage from "./pages/admin/AdminProductpage";
import AdminOrderPage from "./pages/admin/AdminOrderPage";
import AddressPage from "./pages/account/AddressPage";
import OrderHistoryPage from "./pages/account/OrderHistoryPage";
import MainLayout from "./layouts/MainLayout";
import AccountLayout from "./layouts/AccountLayout";
import AcocuntOverviewPage from "./pages/account/AcocuntOverviewPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homeoage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/Forgot-password" element={<ForgotPasswordPages />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/*Pages that need a login: shopper who are not logged in are sent to login first if they try to to access these*/}
            <Route>
              <Route path="/verify-email" element={<VerifyEmailPage />} />

              <Route path="/checkout" element={<CheckOutPage />} />
              <Route
                path="/order-confirmation/:orderId"
                element={<OrderConfirmationPages />}
              />
              {/*Account pages: account menu on the left*/}

              <Route path="/account" element={<AccountLayout />}>
                <Route index element={<AcocuntOverviewPage />} />
                <Route path="/Orders" element={<OrderHistoryPage />} />
                <Route path="/addresses" element={<AddressPage />} />
                <Route path="/saved" element={<SavedItemsPage />} />
                <Route path="" element={<AcocuntSettingsPage />} />
              </Route>
              {/* Order details is full width in the design, so it has no account mennu*/}

              <Route
                path="/account/orders/:orderId"
                element={<OrderDetailsPage />}
              />
              {/*Shipping, returns, Faqs , about, Terms, Privacy.....(one route each, all using inforPage) */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/*Admin Login: no Layout */}
          <Route path="/admin/login" element={<AdminLoginpage />} />

          {/*Admin pages: admin menu + top bar, no store header or footer. Only admins get in*/}
          <Route>
            <Route path="/admin" element={<AdminLayout />} />
            <Route index element={<AdminDashboardPage />} />
            <Route path="product" element={<AdminProductpage />} />
            <Route path="Product/new" element={<AdminProductpage />} />

            <Route path="orders" element={<AdminOrderPage />} />
            <Route path="customer" element={<AdminCustomerPage />} />

            {/*404 PAGE NOT FOUND*/}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
