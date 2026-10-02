import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, Minus, Heart } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onOptionsClick: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
  onOptionsClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.options) {
      onOptionsClick(item);
    } else {
      onAddToCart(item);
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveFromCart(item);
  };

  return (
    <div className="group bg-white rounded-3xl border border-stone-200/90 p-2.5 sm:p-3 shadow-xs hover:shadow-lg hover:border-stone-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* 1. TOP IMAGE CONTAINER (Exact layout from user's screenshot) */}
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400">
            <span className="font-serif font-bold text-xs text-stone-500">{item.name}</span>
          </div>
        )}

        {/* Heart Favorite Button (Top-Right of Image) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          aria-label="Save to favorites"
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-stone-400 hover:text-red-500 shadow-sm transition-transform active:scale-90 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-stone-400 hover:text-red-500'
            }`}
          />
        </button>

        {/* Pre-order badge if applicable */}
        {item.isPreOrder && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-600/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
            Pre-Order
          </span>
        )}

        {/* Circular RED (+) ADD Button OR Quantity Stepper (Bottom-Right of Image) */}
        <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 z-10">
          {cartQuantity > 0 && !item.options ? (
            <div className="flex items-center gap-1 bg-stone-900/95 backdrop-blur-xs rounded-full p-1 shadow-lg text-white animate-in zoom-in-75 duration-150">
              <button
                onClick={handleRemoveClick}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center font-mono font-bold text-xs tabular-nums">
                {cartQuantity}
              </span>
              <button
                onClick={handleAddClick}
                aria-label="Increase quantity"
                className="w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              aria-label={`Add ${item.name} to cart`}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-600 hover:bg-red-700 active:scale-90 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.5]" />
            </button>
          )}
        </div>

      </div>

      {/* 2. CARD CONTENT (Exact layout from user's screenshot) */}
      <div className="pt-2.5 sm:pt-3 px-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-tight line-clamp-1 group-hover:text-emerald-950 transition-colors">
            {item.name}
          </h3>

          {/* Description (Uppercase / Gray subtitle like Deal screenshot) */}
          <p className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wide line-clamp-2 mt-1 leading-snug">
            {item.description || 'Specialty item from Bakhshe kitchen'}
          </p>
        </div>

        {/* Price (Bold, clean) */}
        <div className="mt-2.5 pt-1.5 border-t border-stone-100 flex items-center justify-between">
          <span className="font-bold text-sm sm:text-base text-stone-950 font-mono tabular-nums tracking-tight">
            Rs {item.price.toLocaleString()}
          </span>

          {item.options && (
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              Customize
            </span>
          )}
        </div>

      </div>

    </div>
  );
};
