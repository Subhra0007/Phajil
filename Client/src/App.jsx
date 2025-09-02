import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import HomeSection from "./pages/HomeSection";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import ShippingPolicy from "./pages/ShippingPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ExchangeReturns from "./pages/ExchangeReturns";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Feluda from "./pages/Feluda";
import Kolkata from "./pages/Kolkata";
import Unisex from "./pages/Unisex"
import Girls from "./pages/Girls";
import CategoryProducts from "./components/CategoryProducts";

// Dashboard
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Details/Profile";
import EditProfile from "./pages/Details/EditProfile";
import AddressManager from "./pages/Details/AddressManager";
import Orders from "./pages/Details/Orders";
import TrackOrder from "./pages/Details/TrackOrder";
import DashboardWishlist from "./pages/Details/DashboardWishlist";
import DashboardCart from "./pages/Details/DashboardCart";

// Auth pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeSection />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/exchange-returns" element={<ExchangeReturns />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/feluda" element={<Feluda />} />
        <Route path="/kolkata" element={<Kolkata />} />
        <Route path="/unisex" element={<Unisex />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        {/* Protected Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<DashboardWishlist />} />
            <Route path="cart" element={<DashboardCart />} />
            <Route path="track" element={<TrackOrder />} />
            <Route path="address" element={<AddressManager />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;