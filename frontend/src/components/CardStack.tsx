import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface ScrollCardStackProps {
  images: string[];
  className?: string;
}

export const ScrollCardStack: React.FC<ScrollCardStackProps> = ({
  images,
  className = "",
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动端
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 统一卡片尺寸
  const CARD_W = isMobile ? 300 : 340;
  const CARD_H = isMobile ? 400 : 440;
  const GAP = isMobile ? 20 : 40;

  // 为每张卡片生成随机旋转方向
  const cardRotations = useMemo(() => {
    return images.map((_, index) => {
      const totalCards = images.length;
      const middleIndex = (totalCards - 1) / 2;
      const offsetFromCenter = index - middleIndex;
      
      // 基础角度 + 随机偏移,让每张卡片方向不同
      const baseAngle = offsetFromCenter * (isMobile ? 6 : 8);
      const randomOffset = (Math.random() - 0.5) * 4;
      
      return baseAngle + randomOffset;
    });
  }, [images.length, isMobile]);

  // 平滑的 easing 函数
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = (t: number) => 
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;

      let progress = 0;

      // 扩大滚动范围,让动画更平缓
      if (elementTop <= -windowHeight * 0.5) {
        progress = 1;
      } else if (elementTop < windowHeight * 0.9) {
        const scrollStart = windowHeight * 0.9;
        const scrollEnd = -windowHeight * 0.5;
        const scrollRange = scrollStart - scrollEnd;
        const scrolled = scrollStart - elementTop;
        progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      }

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 计算每张卡片的样式
  const getCardStyle = useCallback(
    (index: number) => {
      const totalCards = images.length;
      const middleIndex = (totalCards - 1) / 2;
      const offsetFromCenter = index - middleIndex;

      // 三段式进度:
      // 0-0.35: 错位叠放(旋转+轻微位移)
      // 0.35-0.65: 过渡段(旋转归零,位移加速)
      // 0.65-1.0: 完全平铺
      
      let rotation = 0;
      let translateX = 0;
      let translateY = 0;
      let scale = 1;

      if (scrollProgress < 0.35) {
        // 阶段1: 错位叠放,使用 easeOutCubic 让启动更顺滑
        const phase1 = easeOutCubic(scrollProgress / 0.35);
        
        rotation = cardRotations[index] * phase1;
        translateX = offsetFromCenter * 20 * phase1;
        translateY = Math.abs(offsetFromCenter) * 15 * phase1;
        scale = 1 - Math.abs(offsetFromCenter) * 0.03 * phase1;
        
      } else if (scrollProgress < 0.65) {
        // 阶段2: 过渡段,旋转归零,位移开始展开
        const phase2 = (scrollProgress - 0.35) / 0.3;
        const easedPhase2 = easeInOutCubic(phase2);
        
        // 保持阶段1的最终状态
        const stackedX = offsetFromCenter * 20;
        const stackedY = Math.abs(offsetFromCenter) * 15;
        const stackedRotation = cardRotations[index];
        
        // 开始向平铺位置移动
        const spreadMultiplier = isMobile ? 2.5 : 3.5;
        const intermediateX = offsetFromCenter * 60 * spreadMultiplier * easedPhase2;
        const intermediateY = isMobile 
          ? Math.floor(index / 2) * (CARD_H * 0.6) * easedPhase2
          : 0;
        
        translateX = stackedX + (intermediateX - stackedX) * easedPhase2;
        translateY = stackedY * (1 - easedPhase2) + intermediateY;
        rotation = stackedRotation * (1 - easedPhase2);
        scale = 1 - Math.abs(offsetFromCenter) * 0.03 * (1 - easedPhase2);
        
      } else {
        // 阶段3: 完全平铺,使用 easeOutCubic 让结束更自然
        const phase3 = easeOutCubic((scrollProgress - 0.65) / 0.35);
        
        if (isMobile) {
          // 移动端: 2列布局
          const col = index % 2;
          const row = Math.floor(index / 2);
          
          translateX = (col === 0 ? -1 : 1) * (CARD_W / 2 + GAP / 2);
          translateY = row * (CARD_H * 0.6 + GAP);
        } else {
          // 桌面端: 横向排列
          const finalSpacing = (CARD_W + GAP);
          translateX = offsetFromCenter * finalSpacing;
          translateY = 0;
        }
        
        rotation = 0;
        scale = 1;
      }

      // 层级: 中间卡片在上层
      const zIndex = totalCards - Math.abs(offsetFromCenter);

      return {
        transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) rotate(${rotation}deg) scale(${scale})`,
        zIndex,
        opacity: 1,
        transition: "none",
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        left: "50%",
        top: "50%",
      } as React.CSSProperties;
    },
    [
      images.length,
      scrollProgress,
      cardRotations,
      isMobile,
      CARD_W,
      CARD_H,
      GAP,
    ]
  );

  return (
    <div ref={sectionRef} className={`scroll-card-stack-container ${className}`}>
      {/* 提供更长的滚动空间 */}
      <div className="relative w-full h-[250vh] flex items-center justify-center">
        <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl mx-auto px-6">
          <div className="relative w-full h-[600px] md:h-[560px] flex items-center justify-center">
            {images.map((image, index) => (
              <div key={index} className="absolute" style={getCardStyle(index)}>
                <div className="w-full h-full overflow-hidden rounded-2xl shadow-2xl bg-white">
                  <img
                    src={image}
                    alt={`Card ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 调试用进度指示器 */}
      <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-mono z-50">
        <div>Progress: {(scrollProgress * 100).toFixed(1)}%</div>
        <div className="text-xs text-gray-400 mt-1">
          {scrollProgress < 0.35 && "Phase 1: Stacking"}
          {scrollProgress >= 0.35 && scrollProgress < 0.65 && "Phase 2: Transition"}
          {scrollProgress >= 0.65 && "Phase 3: Spread"}
        </div>
      </div>
    </div>
  );
};