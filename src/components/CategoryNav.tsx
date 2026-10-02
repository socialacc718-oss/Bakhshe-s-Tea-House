import React, { useRef } from 'react';
import { CATEGORIES } from '../data/menu';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200/90 py-2 sm:py-3 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative flex items-center">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="hidden md:flex p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 transition-colors mr-2 shrink-0 border border-stone-200 shadow-2xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Category Carousel */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full py-1"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-102 ring-2 ring-red-600/30'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs hover:border-stone-300'
                }`}
              >
                <span>{cat.name}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono tabular-nums ${
                      isActive
                        ? 'bg-white/20 text-white font-bold'
                        : 'bg-stone-100 text-stone-600 font-semibold'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="hidden md:flex p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 transition-colors ml-2 shrink-0 border border-stone-200 shadow-2xs cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
