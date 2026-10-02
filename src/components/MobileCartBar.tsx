import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface MobileCartBarProps {
  cartCount: number;
  subtotal: number;
  onOpenCart: () => void;
}

export const MobileCartBar: React.FC<MobileCartBarProps> = ({
  cartCount,
  subtotal,
  onOpenCart,
}) => {
  if (cartCount === 0) return null;

  return (
    <div className="sm:hidden fixed bottom-4 left-4 right-20 z-30 animate-in slide-in-from-bottom duration-200">
      <button
        onClick={onOpenCart}
        className="w-full bg-stone-900 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between border border-stone-700/60 active:scale-98 transition-transform cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center tabular-nums">
            {cartCount}
          </div>
          <div className="text-left">
            <div className="text-[11px] text-stone-300 font-medium">Your Order</div>
            <div className="text-xs font-mono font-bold tabular-nums">Rs. {subtotal.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-amber-300">
          <span>View Slip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
