import React from 'react';

interface ProductGridProps {
  title: string;
  images: string[];
  backgroundColor?: string;
  singleRow?: boolean; // 是否强制单行显示
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  images,
  backgroundColor = 'bg-brand-yellow',
  singleRow = false,
}) => {
  return (
    <section className={`w-full ${backgroundColor} px-6 py-16`}>
      <div className="mx-auto max-w-7xl">
        {/* 标题 */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black">
          {title}
        </h2>

        {/* 图片网格 */}
        <div
          className={`grid gap-4 md:gap-6 ${
            singleRow
              ? // Blind Box: 自适应单行
                images.length === 1
                ? 'grid-cols-1'
                : images.length === 2
                ? 'grid-cols-2'
                : images.length === 3
                ? 'grid-cols-1 md:grid-cols-3'
                : images.length === 4
                ? 'grid-cols-2 md:grid-cols-4'
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              : // Others: 响应式多行网格
                'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="relative aspect-square w-full">
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
