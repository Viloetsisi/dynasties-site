import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function PortfolioPage() {
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isStoreHovered, setIsStoreHovered] = useState(false);
  const [isProductHovered, setIsProductHovered] = useState(false);

  // Store Design 图片列表
  const storeImages = [
    "/assets/portfolio/store1.jpg",
    "/assets/portfolio/store2.jpg",
    "/assets/portfolio/store3.jpg",
    "/assets/portfolio/store4.jpg",
    "/assets/portfolio/store5.jpg"
  ];

  // Product Merchandising 图片列表
  const productImages = [
    "/assets/portfolio/product1.jpg",
    "/assets/portfolio/product2.jpg",
    "/assets/portfolio/product3.jpg",
    "/assets/portfolio/product4.jpg",
    "/assets/portfolio/product5.jpg"
  ];

  // Store Design 自动轮播
  useEffect(() => {
    if (!isStoreHovered) {
      const interval = setInterval(() => {
        setCurrentStoreIndex((prev) => (prev + 1) % storeImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isStoreHovered, storeImages.length]);

  // Product Merchandising 自动轮播
  useEffect(() => {
    if (!isProductHovered) {
      const interval = setInterval(() => {
        setCurrentProductIndex((prev) => (prev + 1) % productImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isProductHovered, productImages.length]);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <Navbar />

      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-20">
        {/* Main Title */}
        <section className="w-full bg-black px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-4xl font-bold text-brand-yellow md:text-5xl">
              Stores
            </h1>
          </div>
        </section>

        {/* Portfolio Content - Two Carousels */}
        <section className="w-full bg-black px-6 py-12 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              
              {/* Left Carousel - Store Design */}
              <div
                className="group relative overflow-hidden rounded-2xl"
                onMouseEnter={() => setIsStoreHovered(true)}
                onMouseLeave={() => setIsStoreHovered(false)}
              >
                {/* Image Container */}
                <div className="relative aspect-[16/9] w-full">
                  {storeImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Store Design ${index + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                        index === currentStoreIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
                    isStoreHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex h-full items-center justify-center">
                      <h2 className="text-4xl font-bold text-brand-yellow">
                        Store Design
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Indicator Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {storeImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStoreIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        index === currentStoreIndex
                          ? 'w-8 bg-brand-yellow'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Carousel - Product Merchandising */}
              <div
                className="group relative overflow-hidden rounded-2xl"
                onMouseEnter={() => setIsProductHovered(true)}
                onMouseLeave={() => setIsProductHovered(false)}
              >
                {/* Image Container */}
                <div className="relative aspect-[16/9] w-full">
                  {productImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Merchandising ${index + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                        index === currentProductIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
                    isProductHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex h-full items-center justify-center">
                      <h2 className="text-4xl font-bold text-brand-yellow">
                        Product Merchandising
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Indicator Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProductIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        index === currentProductIndex
                          ? 'w-8 bg-brand-yellow'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}