import React from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { RESTAURANT_INFO } from '../data/menu';
import { Phone } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-center gap-3">
      
      {/* 1. Green Circular WhatsApp Button (From user's screenshot) */}
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Bakhshe's Tea House on WhatsApp"
        title="WhatsApp Order & Support"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer relative group"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        
        {/* Tooltip on hover */}
        <span className="hidden sm:inline-block absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
          Order on WhatsApp
        </span>
      </a>

      {/* 2. Red Circular Phone Call Button (From user's screenshot) */}
      <a
        href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
        aria-label="Call Bakhshe's Tea House"
        title="Call Now"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-700 hover:bg-red-800 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer relative group"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
        
        {/* Tooltip on hover */}
        <span className="hidden sm:inline-block absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
          Call Bakhshe's
        </span>
      </a>

    </div>
  );
};
