import React, { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { orderService, CreateOrderData } from "@/services/orderService";

// Extracted Components
import OrderSuccessModal from "@/components/sections/smart-switch/OrderSuccessModal";
import HeroSection from "@/components/sections/smart-switch/HeroSection";
import NarrativeSection from "@/components/sections/smart-switch/NarrativeSection";
import BenefitsSection from "@/components/sections/smart-switch/BenefitsSection";
import BentoSection from "@/components/sections/smart-switch/BentoSection";
import ComparisonSection from "@/components/sections/smart-switch/ComparisonSection";
import SpecificationsSection from "@/components/sections/smart-switch/SpecificationsSection";
import UnboxingSection from "@/components/sections/smart-switch/UnboxingSection";
import ReviewsSection from "@/components/sections/smart-switch/ReviewsSection";
import LeadFormSection from "@/components/sections/smart-switch/LeadFormSection";
import RelatedGearSection from "@/components/sections/smart-switch/RelatedGearSection";
import ProductInfoTabs from "@/components/sections/smart-switch/ProductInfoTabs";
import FrictionSection from "@/components/sections/smart-switch/FrictionSection";
import FloatingCTA from "@/components/sections/smart-switch/FloatingCTA";

import salesData from "@/data/smart-switch-sales.json";
import { useTheme } from "@/components/providers/ThemeProvider";
import { productService } from "@/services/productService";
import { Product } from "@/store/useCartStore";

const { MODELS: STATIC_MODELS } = salesData;

const SmartSwitchSalesPage = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Start with static models but ideally we merge with backend price
  const [models, setModels] = useState(STATIC_MODELS);
  const [selectedModel, setSelectedModel] = useState(STATIC_MODELS[1]);
  const [product, setProduct] = useState<Product | null>(null);

  // Sync theme
  React.useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  // Fetch backend product data by slug (API has slug "smart-wifi-switch", not id 4)
  const SMART_SWITCH_SLUG = "smart-wifi-switch";
  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductBySlug(SMART_SWITCH_SLUG);
        setProduct(data);

        // Update model prices if backend provides a base price
        if (data && data.price) {
          const updatedModels = STATIC_MODELS.map((m) => ({
            ...m,
            // You can implement custom pricing logic here,
            // e.g. base price + offset for more gangs
            price: data.price + (parseInt(m.id) - 1) * 2000,
          }));
          setModels(updatedModels);
          setSelectedModel(updatedModels[1]);
        }
      } catch (err) {
        console.error("Failed to fetch product data:", err);
      }
    };
    fetchProduct();
  }, []);

  const scrollToForm = (model?: (typeof STATIC_MODELS)[0]) => {
    if (model) setSelectedModel(model);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);

    try {
      const orderData: CreateOrderData = {
        product_id: product?.id ?? 1,
        quantity,
        name: (formData.fullName || "").trim(),
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        whatsapp: formData.whatsapp || undefined,
        email: formData.email || undefined,
        notes: formData.additionalNotes
          ? `DIRECT SALES PAGE. Model: ${selectedModel.name}. ${formData.additionalNotes}`.trim()
          : undefined,
      };

      await orderService.createOrder(orderData);
      setOrderSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => navigate("/catalogue/smart-wifi-switch"), 6000);
    } catch (err: any) {
      console.error("Lead submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Map backend reviews to ReviewsSection format
  const dynamicReviews = product?.reviews?.map((r) => ({
    u: r.author,
    d: "Verified Buyer",
    r: r.content,
    s: r.rating,
    title: "Verified Response",
    date: r.date || "Recently",
    model: "Smart Switch",
    hasImage: false,
  }));

  return (
    <div className="bg-obsidian text-silk-white selection:bg-accent min-h-screen font-sans transition-colors duration-500">
      <Helmet>
        <title>Luxury Smart Switches — Altair Attic | Control Your World</title>
      </Helmet>
      <Navbar />

      <main className="relative overflow-x-hidden pt-20">
        <AnimatePresence>
          {orderSuccess && <OrderSuccessModal />}
        </AnimatePresence>

        <FloatingCTA
          selectedModel={selectedModel}
          quantity={quantity}
          scrollToForm={() => scrollToForm()}
          show={true}
        />

        <HeroSection
          models={models}
          selectedModel={selectedModel}
          setSelectedModel={(model) => setSelectedModel(model)}
          quantity={quantity}
          setQuantity={setQuantity}
          scrollToForm={scrollToForm}
        />

        <ProductInfoTabs customSpecs={product?.specifications} />
        <NarrativeSection />
        <FrictionSection />
        <BenefitsSection />
        <BentoSection />
        <ComparisonSection />
        <UnboxingSection />
        <ReviewsSection customReviews={dynamicReviews} />

        <LeadFormSection
          ref={formRef}
          models={models}
          selectedModel={selectedModel}
          setSelectedModel={(model) => setSelectedModel(model)}
          quantity={quantity}
          setQuantity={setQuantity}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />

        <RelatedGearSection />

        <Footer />
      </main>

      <style>{`
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% auto; }
        .custom-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23009fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1.5rem center; }
        @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.05); } }
        .animate-float { animation: float 10s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default SmartSwitchSalesPage;
