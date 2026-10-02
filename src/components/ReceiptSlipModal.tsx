import React, { useState } from 'react';
import { OrderReceipt } from '../types';
import { formatWhatsAppMessage, getWhatsAppOrderLink } from '../utils/orderSlip';
import { RESTAURANT_INFO } from '../data/menu';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { BakhsheLogo } from './icons/BakhsheLogo';
import { X, Printer, Copy, Check, CheckCircle2, ArrowRight } from 'lucide-react';

interface ReceiptSlipModalProps {
  receipt: OrderReceipt | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: () => void;
}

export const ReceiptSlipModal: React.FC<ReceiptSlipModalProps> = ({
  receipt,
  isOpen,
  onClose,
  onOrderCompleted,
}) => {
  if (!isOpen || !receipt) return null;

  const [copied, setCopied] = useState(false);
  const whatsappUrl = getWhatsAppOrderLink(receipt);

  const handleCopy = () => {
    const text = formatWhatsAppMessage(receipt);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    // Navigate / open WhatsApp with the generated slip
    window.location.href = whatsappUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-stone-100 rounded-2xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col my-auto max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Status Bar */}
        <div className="px-5 py-3.5 bg-emerald-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Order Slip Generated
              </span>
              <p className="text-xs font-mono font-bold text-white">
                Slip #{receipt.orderId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Callout Banner */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2.5 flex items-center justify-between gap-3 text-xs text-emerald-900 shrink-0">
          <span className="font-medium">
            Tap below to send this slip directly to WhatsApp to confirm order!
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1 shrink-0 font-semibold"
            title="Open WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Send Now</span>
          </a>
        </div>

        {/* The Realistic Slip Preview Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          
          <div 
            id="printable-receipt-slip"
            className="bg-white rounded-xl shadow-xs border border-stone-200/90 p-5 sm:p-6 text-stone-800 font-mono text-xs relative overflow-hidden"
          >
            {/* Top decorative dashed punch line */}
            <div className="border-b-2 border-dashed border-stone-300 pb-4 mb-4 text-center">
              <div className="mx-auto flex items-center justify-center mb-1.5">
                <BakhsheLogo size={36} />
              </div>
              <h2 className="font-serif text-lg font-bold text-stone-900 tracking-tight">
                {RESTAURANT_INFO.name}
              </h2>
              <p className="text-[11px] text-stone-500 mt-0.5 max-w-xs mx-auto">
                {RESTAURANT_INFO.address}
              </p>
              <div className="mt-2 text-[10px] text-stone-400 tracking-widest uppercase">
                * OFFICIAL ORDER SLIP *
              </div>
            </div>

            {/* Slip Meta */}
            <div className="space-y-1 pb-3 mb-3 border-b border-stone-200 text-[11px]">
              <div className="flex justify-between">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-bold text-stone-900">#{receipt.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Date & Time:</span>
                <span>{receipt.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Customer:</span>
                <span className="font-semibold text-stone-900">{receipt.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Phone:</span>
                <span>{receipt.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Order Type:</span>
                <span className="font-semibold capitalize text-emerald-900">
                  {receipt.customer.orderType === 'delivery' 
                    ? '🛵 Home Delivery' 
                    : receipt.customer.orderType === 'dinein' 
                    ? `🍽️ Dine-In (Table: ${receipt.customer.tableNumber || 'N/A'})` 
                    : '🛍️ Takeaway'}
                </span>
              </div>
              {receipt.customer.orderType === 'delivery' && (
                <div className="pt-1 text-[11px] text-stone-600">
                  <span className="text-stone-500 block">Delivery Address:</span>
                  <span className="font-medium text-stone-900 block">{receipt.customer.address}</span>
                </div>
              )}
            </div>

            {/* Itemized Table */}
            <div className="py-2">
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-2 flex justify-between">
                <span>Item & Quantity</span>
                <span>Price (PKR)</span>
              </div>
              <div className="divide-y divide-stone-100">
                {receipt.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-stone-900">
                        {item.name} <span className="text-stone-500 font-normal">x{item.quantity}</span>
                      </div>
                      {item.selectedOption && (
                        <div className="text-[10px] text-emerald-800">
                          ↳ Choice: {item.selectedOption}
                        </div>
                      )}
                      {item.notes && (
                        <div className="text-[10px] text-stone-400 italic">
                          ↳ Note: {item.notes}
                        </div>
                      )}
                    </div>
                    <div className="font-bold tabular-nums text-stone-900 shrink-0">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Calculation */}
            <div className="border-t-2 border-dashed border-stone-300 pt-3 mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="tabular-nums">Rs. {receipt.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery Charges:</span>
                <span className="tabular-nums">Rs. {receipt.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-stone-200 pt-1.5 flex justify-between font-bold text-stone-950 text-sm">
                <span>TOTAL PAYABLE:</span>
                <span className="text-emerald-950 tabular-nums">
                  Rs. {receipt.grandTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 pt-1">
                <span>Payment Mode:</span>
                <span className="font-medium text-stone-800">{receipt.customer.paymentMethod}</span>
              </div>
              {receipt.customer.specialNotes && (
                <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                  <span className="font-semibold">Instructions:</span> {receipt.customer.specialNotes}
                </div>
              )}
            </div>

            {/* Slip Footer */}
            <div className="text-center pt-4 mt-4 border-t border-dashed border-stone-300 text-[10px] text-stone-400 space-y-1">
              <p>Thank you for choosing Bakhshe's Tea House!</p>
              <p>Freshly brewed & prepared with passion</p>
            </div>

          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex flex-col gap-2 shrink-0">
          
          {/* PRIMARY: Send Slip Directly to WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onOrderCompleted}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 text-white" />
            <span>Send Slip to WhatsApp (Done Order)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Secondary Action Row: Print / Copy Slip */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={handleCopy}
              className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied Slip!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Copy Slip Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>Print / Save PDF</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
