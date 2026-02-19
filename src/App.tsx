import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ContactPage from "@/pages/ContactPage";
import EventsPage from "@/pages/EventsPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ProductsPage from "@/pages/ProductsPage";
import BlogPage from "@/pages/BlogPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import ShoppingCartPage from "@/pages/ShoppingCartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ShopDetailPage from "@/pages/ShopDetailPage";
import ShopPage from "@/pages/ShopPage";
import SmartSwitchSalesPage from "@/pages/SmartSwitchSalesPage";
import NotFoundPage from "@/pages/NotFoundPage";
import FloatingCart from "@/components/cart/FloatingCart";

function App() {
  return (
    <div className="min-h-screen bg-obsidian text-silk-white selection:bg-accent selection:text-obsidian">
      <FloatingCart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/shop/smart-wifi-switch"
          element={<SmartSwitchSalesPage />}
        />
        <Route path="/shop/:slug" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:url" element={<ServiceDetailPage />} />
        <Route path="/catalogue" element={<ProductsPage />} />
        <Route
          path="/catalogue/smart-wifi-switch"
          element={<SmartSwitchSalesPage />}
        />
        <Route path="/catalogue/:slug" element={<ProductDetailPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
