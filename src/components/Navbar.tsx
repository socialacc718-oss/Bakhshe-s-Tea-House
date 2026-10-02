import React from 'react';
import { ShoppingBag, MapPin, Search } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { BakhsheLogo } from './icons/BakhsheLogo';
import { RESTAURANT_INFO } from '../data/menu';

interface NavbarProps {
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartSubtotal,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* ZONE 1: Brand Wordmark WITH OFFICIAL BAKHSHE LOGO */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="#" 
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              {/* Official Bakhshe's Tea House Logo Leaf */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-950/5 p-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 border border-emerald-900/10 shadow-2xs">
                <BakhsheLogo size={32} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-stone-900 leading-tight">
                  Bakhshe's
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-emerald-900 -mt-0.5">
                  Tea House
                </span>
              </div>
            </a>
          </div>

          {/* ZONE 2: Clean 5 Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-600">
            <button 
              onClick={() => onSelectCategory('all')} 
              className="hover:text-emerald-900 transition-colors cursor-pointer py-1"
            >
              All Items
            </button>
            <button 
              onClick={() => onSelectCategory('regular-pizza')} 
              className="hover:text-emerald-900 transition-colors cursor-pointer py-1"
            >
              Pizzas
            </button>
            <button 
              onClick={() => onSelectCategory('platters')} 
              className="hover:text-emerald-900 transition-colors cursor-pointer py-1"
            >
              Platters
            </button>
            <button 
              onClick={() => onSelectCategory('stuffed-chicken')} 
              className="hover:text-emerald-900 transition-colors cursor-pointer py-1"
            >
              Stuffed Chicken
            </button>
            <button 
              onClick={() => onSelectCategory('burgers-sandwiches')} 
              className="hover:text-emerald-900 transition-colors cursor-pointer py-1"
            >
              Burgers
            </button>
            <button 
              onClick={() => onSelectCategory('tea')} 
              className="hover:text-emerald-900 transition-colors cursor-pointer py-1"
            >
              Tea & Brews
            </button>
            <a 
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-900 transition-colors text-stone-600 py-1"
              title="Open Location on Google Maps"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Location</span>
            </a>
          </nav>

          {/* ZONE 3: Actions (Search, WhatsApp Icon, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Search Input */}
            <div className="relative hidden md:block w-40 lg:w-56">
              <input
                type="text"
                placeholder="Search food or tea..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-stone-100 hover:bg-white focus:bg-white text-stone-900 placeholder-stone-400 rounded-xl border border-stone-200 focus:border-stone-400 focus:outline-none transition-all shadow-2xs"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Direct WhatsApp Action Button (Icon Only - no raw text) */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Support and Orders"
              title="WhatsApp Bakhshe's Tea House"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center shadow-xs cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              aria-label={`View Cart, ${cartCount} items`}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4.5 h-4.5 px-1 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center tabular-nums shadow-xs animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono font-bold tabular-nums text-amber-300">
                Rs {cartSubtotal.toLocaleString()}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Search Row */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search burgers, pizzas, steaks, tea..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-stone-100 text-stone-900 placeholder-stone-400 rounded-xl border border-stone-200 focus:bg-white focus:border-stone-400 focus:outline-none transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
