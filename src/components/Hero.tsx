import React from 'react';
import { ArrowRight, MapPin, Clock, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { BakhsheLogo } from './icons/BakhsheLogo';

interface HeroProps {
  onExploreMenu: () => void;
  onExplorePlatters: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onExplorePlatters }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F4EC] to-[#FDFBF7] border-b border-stone-200/80">
      
      {/* Decorative ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-200/40 blur-3xl animate-pulse" />
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Official Logo Badge Lockup */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-stone-200/90 rounded-2xl px-3.5 py-2 shadow-xs mb-4 self-start">
              <BakhsheLogo size={28} />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm text-stone-900 leading-tight">
                  Bakhshe's Tea House
                </span>
                <span className="text-[10px] text-emerald-900 font-semibold tracking-wider uppercase">
                  Main PWD Road, Islamabad
                </span>
              </div>
            </div>

            {/* Main Catchy Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12] mb-4 text-balance">
              Hot Karak Chai, Loaded Pizzas & Gourmet Burgers.
            </h1>

            <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-6">
              Welcome to Bakhshe's Tea House! Enjoy our signature stuffed chicken, sizzling charcoal steaks, stone-baked pizzas, and Elaichi chai. Place your order and get an instant digital WhatsApp order slip.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-2xl bg-emerald-950 hover:bg-emerald-900 active:bg-black text-white text-sm font-bold transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExplorePlatters}
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-900 border border-stone-300 text-sm font-bold transition-all duration-200 shadow-xs hover:border-stone-400 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Pre-Order Platters</span>
              </button>

              {/* Direct WhatsApp icon button */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="p-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer shadow-xs"
              >
                <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
              </a>
            </div>

            {/* Info Pills Bar */}
            <div className="pt-5 border-t border-stone-200/90 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
                <span className="font-semibold text-stone-900">12:00 PM – 02:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-stone-900 underline hover:text-emerald-800"
                >
                  Flames Basement, PWD
                </a>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                <span className="font-semibold text-stone-900">Instant WhatsApp Slip</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/3 group">
              <img
                src="/src/assets/images/burger_combo_deal_1790958975785.jpg"
                alt="Bakhshe's Tea House Gourmet Combos"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white font-bold text-[11px] mb-1.5">
                  🔥 Best Selling Deals
                </div>
                <div className="font-serif text-lg sm:text-xl font-bold">
                  Zinger Combos & Woodfired Pizzas
                </div>
              </div>
            </div>

            {/* Floating Mini Highlight Card */}
            <div className="absolute -bottom-5 -left-3 sm:left-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl p-3 shadow-xl flex items-center gap-3 max-w-xs animate-bounce" style={{ animationDuration: '4s' }}>
              <img
                src="/src/assets/images/tea_coffee_brew_1790958366089.jpg"
                alt="Cardamom Chai"
                className="w-12 h-12 rounded-xl object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs">
                <div className="font-bold text-stone-900">Signature Elaichi Chai</div>
                <div className="text-stone-500 font-mono font-semibold">From Rs 249</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
