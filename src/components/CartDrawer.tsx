import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Container - strictly screen-fitted on both Mobile and PC */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md h-[100dvh] bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-stone-200 bg-[#FBF9F5] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                  Your Order Slip
                </h2>
                <p className="text-xs text-stone-500 font-mono">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in order
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  title="Clear Cart"
                  className="p-2 text-stone-400 hover:text-rose-600 transition-colors rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Item List - scrollable area that guarantees fitting inside screen */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your cart is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Explore our artisanal tea, woodfired pizzas, juicy burgers, and signature stuffed chicken dishes.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Explore Delicious Menu
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {items.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 pr-1">
                      <h4 className="text-sm font-semibold text-stone-900 leading-snug">
                        {item.name}
                      </h4>
                      {item.selectedOption && (
                        <p className="text-xs text-emerald-800 font-medium mt-0.5">
                          ↳ Choice: {item.selectedOption}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-[11px] text-stone-400 italic mt-0.5">
                          Note: {item.notes}
                        </p>
                      )}
                      <div className="mt-1 text-xs font-mono font-bold text-stone-800 tabular-nums">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                        {item.quantity > 1 && (
                          <span className="text-stone-400 font-normal ml-1">
                            (Rs. {item.price.toLocaleString()} each)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-stone-100/90 rounded-lg p-1 border border-stone-200 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-mono font-bold text-xs tabular-nums text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove item button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - fixed at bottom, never cut off */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-[#FBF9F5] shrink-0 space-y-3">
              
              {/* Order breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold tabular-nums text-stone-900">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Charges</span>
                  <span className="font-mono tabular-nums text-stone-600">
                    Calculated at Checkout (Rs. {RESTAURANT_INFO.deliveryFee})
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-stone-900 text-sm sm:text-base">
                  <span>Estimated Total</span>
                  <span className="font-mono text-emerald-900 tabular-nums text-lg">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 active:bg-black text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Generate Slip & Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-stone-500">
                Slip will be automatically sent to Bakhshe's WhatsApp
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
