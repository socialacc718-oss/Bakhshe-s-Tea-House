import React, { useState } from 'react';
import { CustomerOrderData, OrderType } from '../types';
import { X, Bike, Store, Utensils, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtotal: number;
  onSubmit: (data: CustomerOrderData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  subtotal,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [error, setError] = useState('');

  const deliveryFee = orderType === 'delivery' ? RESTAURANT_INFO.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setError('Please provide a valid phone/WhatsApp number.');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setError('Please enter your delivery street address & area in Islamabad/PWD.');
      return;
    }

    setError('');
    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      orderType,
      address: address.trim(),
      tableNumber: tableNumber.trim(),
      specialNotes: specialNotes.trim(),
      paymentMethod,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-200 bg-[#FBF9F5] flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
              Customer Details & Slip Setup
            </h3>
            <p className="text-xs text-stone-500">
              Provide your details to generate the official restaurant order slip
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 min-h-0 custom-scrollbar text-xs">
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-medium">
              {error}
            </div>
          )}

          {/* Order Type Tabs */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-stone-700 mb-2">
              Select Order Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setOrderType('delivery');
                  setPaymentMethod('Cash on Delivery');
                }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-800'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-700'
                }`}
              >
                <Bike className="w-4 h-4 text-emerald-700" />
                <span className="text-xs">Home Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOrderType('takeaway');
                  setPaymentMethod('Cash / Card on Pickup');
                }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-800'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-700'
                }`}
              >
                <Store className="w-4 h-4 text-emerald-700" />
                <span className="text-xs">Self Takeaway</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOrderType('dinein');
                  setPaymentMethod('Pay at Table / Counter');
                }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                  orderType === 'dinein'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-800'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-700'
                }`}
              >
                <Utensils className="w-4 h-4 text-emerald-700" />
                <span className="text-xs">Dine-In</span>
              </button>
            </div>
          </div>

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Your Full Name <span className="text-amber-700">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Muhammad Usman"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-stone-500 focus:outline-none bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Phone / WhatsApp Number <span className="text-amber-700">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 0300 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-stone-500 focus:outline-none bg-stone-50/50"
              />
            </div>
          </div>

          {/* Conditional Delivery Address */}
          {orderType === 'delivery' && (
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Delivery Address & Landmark <span className="text-amber-700">*</span>
              </label>
              <textarea
                rows={2}
                placeholder="House #, Street #, Sector / Area (e.g. PWD Block B, Police Foundation, Soan Gardens, Islamabad)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-stone-500 focus:outline-none bg-stone-50/50 resize-none"
              />
            </div>
          )}

          {/* Conditional Table Number for Dine-In */}
          {orderType === 'dinein' && (
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Table Number (If already seated)
              </label>
              <input
                type="text"
                placeholder="e.g. Table 5 (or leave empty if placing ahead)"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-stone-500 focus:outline-none bg-stone-50/50"
              />
            </div>
          )}

          {/* Special Cooking / Packing Instructions */}
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Cooking / Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Less spicy, extra sauce, call on arrival..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-stone-500 focus:outline-none bg-stone-50/50"
            />
          </div>

          {/* Summary Box */}
          <div className="p-3 rounded-xl bg-stone-100/80 border border-stone-200 space-y-1.5 text-xs text-stone-700">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span className="font-mono font-semibold">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-mono font-semibold">Rs. {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="pt-1.5 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
              <span>Grand Total:</span>
              <span className="font-mono text-emerald-950">Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

        </form>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-[#FBF9F5] flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Back to Cart
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Generate WhatsApp Slip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
