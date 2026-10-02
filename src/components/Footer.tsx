import React from 'react';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO, CATEGORIES } from '../data/menu';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { BakhsheLogo } from './icons/BakhsheLogo';

interface FooterProps {
  onSelectCategory: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-16 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-stone-800 text-xs">
          
          {/* Brand & Address Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 p-1 flex items-center justify-center border border-white/15 shadow-sm">
                <BakhsheLogo size={32} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-white tracking-tight leading-tight">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase -mt-0.5">
                  Artisanal Brews & Kitchen
                </span>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-sm">
              Authentic artisanal tea house, specialty espresso brews, stone-baked pizzas, charcoal grilled steaks, and stuffed chicken delicacies in Islamabad.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-stone-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{RESTAURANT_INFO.timings}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium transition-colors"
              >
                <span>Find on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on WhatsApp"
                className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Menu Categories */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
              Popular Menu
            </h4>
            <div className="grid grid-cols-2 gap-2 text-stone-400">
              {CATEGORIES.slice(1, 11).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Service & Ordering Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
              Online Ordering
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>• Select items to build order</li>
              <li>• Instant WhatsApp slip generation</li>
              <li>• Free pickup / Takeaway option</li>
              <li>• Dine-in pre-ordering with table #</li>
              <li>• Home Delivery in Islamabad / PWD</li>
            </ul>
          </div>

        </div>

        {/* Quiet Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-xs">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved.
          </div>
          <div>
            Main PWD Road, Police Foundation, O-9 Islamabad
          </div>
        </div>
      </div>
    </footer>
  );
};
