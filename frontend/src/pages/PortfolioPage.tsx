import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BannerSlider } from "../components/Bannerslider";
import { ScrollCardStack } from "../components/CardStack";
import { ProductGrid } from "../components/ProductGrid";

export function PortfolioPage() {
  // Store Design 图片列表
  const storeImages = [
    "/assets/portfolio/design1.png",
    "/assets/portfolio/design2.png"
  ];

  // Product Merchandising 图片列表
  const productImages = [
    "/assets/portfolio/product1.png",
    "/assets/portfolio/product2.png",
    "/assets/portfolio/product3.png"
  ];

  // 门店 Banner 图片列表
  const bannerImages = [
    "/assets/portfolio/store1.png",
    "/assets/portfolio/store2.png",
    "/assets/portfolio/store3.png",
    "/assets/portfolio/store4.png"
  ];

    // Plush 卡片图片列表
  const plushImages = [
    "/assets/portfolio/Plush1.png",
    "/assets/portfolio/Plush2.png",
    "/assets/portfolio/Plush3.png",
    "/assets/portfolio/Plush4.png"
  ];

    // Blind Box 图片列表（数量可变）
  const blindBoxImages = [
    "/assets/portfolio/blindbox1.png",
    "/assets/portfolio/blindbox2.png",
    "/assets/portfolio/blindbox3.png"
  ];

  // Others 图片列表
  const othersImages = [
    "/assets/portfolio/others1.png",
    "/assets/portfolio/others2.png",
    "/assets/portfolio/others3.png",
    "/assets/portfolio/others4.png",
    "/assets/portfolio/others5.png",
    "/assets/portfolio/others6.png",
    "/assets/portfolio/others7.png",
    "/assets/portfolio/others8.png"
  ];


  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <Navbar />

      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-20">
        {/* Main Title */}
        <section className="w-full bg-black px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-center text-4xl font-bold text-brand-yellow md:text-5xl">
              Stores
            </h1>
          </div>
        </section>

        {/* Portfolio Content - Two Carousels */}
        <section className="w-full bg-black px-6 py-2 pb-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              
              {/* Left Carousel - Store Design */}
              <BannerSlider
                images={storeImages}
                mode="fade"
                fadeEffect="zoom"
                autoPlayInterval={3000}
                showArrows={false}
                showIndicators={true}
                pauseOnHover={true}
                aspectRatio="16/9"
                showTitleOnHover={true}
                hoverTitle="Store Design"
              />

              {/* Right Carousel - Product Merchandising */}
              <BannerSlider
                images={productImages}
                mode="fade"
                fadeEffect="zoom"
                autoPlayInterval={3000}
                showArrows={false}
                showIndicators={true}
                pauseOnHover={true}
                aspectRatio="16/9"
                showTitleOnHover={true}
                hoverTitle="Product Merchandising"
              />

            </div>
          </div>
        </section>

        {/* 门店 Banner 区域 */}
        <section className="w-full bg-black px-6 py-12 pb-4">
          <div className="mx-auto max-w-7xl">
            <BannerSlider
              images={bannerImages}
              mode="slide"
              fadeEffect="zoom"
              autoPlayInterval={3000}
              showArrows={true}
              showIndicators={true}
              pauseOnHover={true}
              aspectRatio="21/9"
            />
          </div>
        </section>

        {/* Plush 卡片展开区域 - 基于滚动的渐进式动画 */}
        <section className="w-full bg-black">
          <ScrollCardStack images={plushImages} />
        </section>

      {/* Blind Box 产品展示 */}
      <ProductGrid
        title="Blind Box"
        images={blindBoxImages}
        backgroundColor="bg-brand-yellow"
        singleRow={true}
      />

      {/* Others 产品展示 */}
      <ProductGrid
        title="Others"
        images={othersImages}
        backgroundColor="bg-brand-yellow"
        singleRow={false}
      />

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}