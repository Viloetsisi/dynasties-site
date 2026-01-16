import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function WhyExclusiveLicensingPage() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const caseStudies = [
    {
      number: "01",
      title: "Multiple Licenses Severely Dilute IP Value",
      explanation: "Granting licenses to multiple parties results in uneven product quality and frequent price wars, weakening the brand's premium positioning.",
      caseTitle: "Hello Kitty",
      caseContent: "Hello Kitty adopted a \"broad multi-party licensing\" model in China, resulting in a large number of homogeneous products such as stationery, snacks, home appliances, and clothing. Overly fragmented licensing led to rampant piracy and inconsistent quality. Consumers gradually came to view it as a \"cheap sticker,\" significantly reducing the brand's scarcity and premium value."
    },
    {
      number: "02",
      title: "Low Licensing Thresholds Undermine IP Scarcity",
      explanation: "Low-barrier collaborations and overexposure mix high- and low-quality products, creating a \"lack of scarcity\" perception among fans, leading to aesthetic fatigue and downgraded consumption.",
      caseTitle: "Detective Conan",
      caseContent: "In November 2023, four brands—Naixue's Tea, Lele Tea, DQ, and Paiyuefang—simultaneously launched Detective Conan-themed beverages. While initial sales were strong, inventory stagnated the next day. By lowering the licensing threshold, the IP owner allowed small and medium brands to obtain single-category regional licenses for only 50,000–150,000 RMB. This flooded the market with 19 RMB Conan toothbrushes and 3–4 RMB collectible cards. These low-quality products quickly turned a \"national classic\" into a \"cheap symbol.\""
    },
    {
      number: "03",
      title: "Exclusive Licensing Helps Standardize Official Products and Combat Piracy",
      explanation: "Exclusive licensing ensures all derivatives and marketing activities follow unified standards. It allows centralized pricing, quality control, and channel management, effectively combating piracy and maintaining the scarcity of official products.",
      caseTitle: "Chiikawa",
      caseContent: "Official dolls sell for 80–150 RMB, while pirated versions go for only 30–50 RMB. The circulation of these pirated products severely damages the IP's premium image. During Miniso's 2024 co-branded pop-up, stock shortages and printing defects on official dolls caused fan dissatisfaction. Meanwhile, the \"misprinted Xiao Ba\" gained viral attention on social media, even surpassing the official co-branded products, further blurring the line between genuine and pirated goods and diluting brand value."
    },
    {
      number: "04",
      title: "Exclusive Licensing Ensures Long-Term IP Management",
      explanation: "Under an exclusive model, the brand can control collaboration frequency and product categories, maintaining freshness and value while motivating further investment to drive long-term IP growth.",
      caseTitle: "Minions",
      caseContent: "During the movie release period, numerous brands launched Minions co-branded products, including beverages, snacks, stationery, and FMCG items. While this generated short-term hype, post-release, the co-branded products quickly stagnated, leading to aesthetic fatigue among consumers and significantly reducing the IP's scarcity and collectible value."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

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
              Why Exclusive Licensing?
            </h1>
          </div>
        </section>

        {/* Case Studies */}
        <section className="w-full bg-black px-6 py-12">
          <div className="mx-auto max-w-6xl space-y-12">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-index={index}
                className={`rounded-2xl border border-brand-yellow/20 bg-white/5 p-8 transition-all duration-700 hover:border-brand-yellow/50 hover:bg-white/10 ${
                  visibleSections.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-20'
                }`}
              >
                {/* Number Badge */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow">
                    <span className="text-xl font-bold text-black">{study.number}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-brand-yellow">
                    {study.title}
                  </h2>
                </div>

                {/* Explanation */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">Explanation:</h3>
                  <p className="text-base leading-relaxed text-white/80">
                    {study.explanation}
                  </p>
                </div>

                {/* Case Study */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-brand-yellow">
                    Case Study: {study.caseTitle}
                  </h3>
                  <p className="text-base leading-relaxed text-white/70">
                    {study.caseContent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="w-full bg-black px-6 py-12 pb-20">
          <div className="mx-auto max-w-6xl">
            <div
              ref={(el) => (sectionRefs.current[4] = el)}
              data-index={4}
              className={`rounded-2xl border border-brand-yellow/30 bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5 p-8 transition-all duration-700 ${
                visibleSections.has(4)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <h2 className="mb-6 text-center text-3xl font-bold text-brand-yellow">
                Conclusion
              </h2>
              <p className="text-base leading-relaxed text-white">
                Exclusive licensing is the only approach that allows centralized resource management, 
                ensures the scarcity and high-end positioning of official products, and prevents the 
                brand from being "commoditized." By strictly controlling licensing frequency and product 
                categories, it maintains fan interest and consumption motivation, laying a solid foundation 
                for the IP's long-term operation and sustainable growth in Greater China and Southeast Asia.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}