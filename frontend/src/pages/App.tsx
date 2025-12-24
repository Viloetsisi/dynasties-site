import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { ChinesePage } from "./ChinesePage";
import { OurValuePage } from "./OurValuePage";
import { PortfolioPage } from "./PortfolioPage";
import { WhyExclusiveLicensingPage } from "./WhyExclusiveLicensingPage";
import { ScrollToSection } from "../components/ScrollToSection";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToSection /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/zh" element={<ChinesePage />} />
        <Route path="/our-value" element={<OurValuePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/why-exclusive-licensing" element={<WhyExclusiveLicensingPage />} />
      </Routes>
    </BrowserRouter>
  );
}