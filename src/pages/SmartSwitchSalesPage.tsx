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

const { MODELS } = salesData;

const SmartSwitchSalesPage = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState(MODELS[1]);

  // Removed theme force to allow the mode button (theme switcher) to function correctly
  React.useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling past hero (approx 700px)
      // and hide it when near the form
      const scrollY = window.scrollY;
      const formTop = formRef.current?.offsetTop || 0;

      if (scrollY > 700 && scrollY < formTop - 600) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = (model?: (typeof MODELS)[0]) => {
    if (model) setSelectedModel(model);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);

    try {
      const orderData: CreateOrderData = {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: `${formData.address}, ${formData.city}, ${formData.state} State`,
        notes: `DIRECT SALES PAGE. Model: ${selectedModel.name}. WhatsApp: ${formData.whatsapp}. ${formData.additionalNotes}`,
        items: [{ product_id: 10, quantity }], // ID matches the Smart Switch in products.json
      };

      await orderService.createOrder(orderData);
      setOrderSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => navigate("/shop"), 6000);
    } catch (err: any) {
      console.error("Lead submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          show={showFloatingCTA}
        />

        <HeroSection
          models={MODELS}
          selectedModel={selectedModel}
          setSelectedModel={(model) => setSelectedModel(model)}
          quantity={quantity}
          setQuantity={setQuantity}
          scrollToForm={scrollToForm}
        />

        <ProductInfoTabs />
        <NarrativeSection />
        <FrictionSection />
        <BenefitsSection />
        <BentoSection />
        <ComparisonSection />
        <UnboxingSection />
        <ReviewsSection />

        <LeadFormSection
          ref={formRef}
          models={MODELS}
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
