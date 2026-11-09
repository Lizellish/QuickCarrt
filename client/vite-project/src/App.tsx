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
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Pls note: this website have atleast 3 layout which are (User interface, admin interface, and access pages that only those that have log-in account can have access to )*/}

          {/* everyone can access these pages, but note, this "Route is also the same route that carry the route for only users with account only, and it end there, it does not include the admin route" */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homeoage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPages />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Pages that need authentication to access (Users with account) */}
            <Route>
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/checkout" element={<CheckOutPage />} />
              <Route
                path="/order-confirmation/:orderId"
                element={<OrderConfirmationPages />}
              />
            </Route>

            {/* Account pages: account menu on the left */}
            <Route path="/account" element={<AccountLayout />}>
              <Route index element={<AcocuntOverviewPage />} />
              <Route path="orders" element={<OrderHistoryPage />} />
              <Route path="addresses" element={<AddressPage />} />
              <Route path="saved" element={<SavedItemsPage />} />
              <Route path="settings" element={<AcocuntSettingsPage />} />
            </Route>

            {/* order details in full width design, so it has no account menu */}
            <Route>
              <Route
                path="/account/orders/:orderId"
                element={<OrderDetailsPage />}
              />
            </Route>

            {/* shipping, returns, FAQs, about, terms, privacy... (one route each, all using InfoPage) */}
            {/* {InfoPage.map((page) => {
              return <Route key={page.path}
              path={page.path}
              element={<InfoPage page={page}/>/>;
            })} */}

            <Route path="*" element={<NotFoundPage />} />
          </Route>
          {/* admin login: no layout */}
          <Route path="/admin/login" element={<AdminLoginpage />} />
          {/* admin pages: admin menu + top bar, no store header or footer. only admins gets in */}
          <Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductpage />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route
                path="products/:productId/edit"
                element={<AdminProductpage />}
              />
              <Route path="orders" element={<AdminOrderPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="customer" element={<AdminCustomerPage />} />

              {/* Any other admin address shows the 404 page inside the admin layout */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
