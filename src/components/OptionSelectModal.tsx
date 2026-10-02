import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Check } from 'lucide-react';

interface OptionSelectModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: MenuItem, selectedOption: string, notes: string) => void;
}

export const OptionSelectModal: React.FC<OptionSelectModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !item || !item.options) return null;

  const [selectedChoice, setSelectedChoice] = useState<string>(
    item.options.choices[0] || ''
  );
  const [specialNote, setSpecialNote] = useState('');

  const handleConfirm = () => {
    onConfirm(item, selectedChoice, specialNote);
    setSpecialNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50/50">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">{item.name}</h3>
            <p className="text-xs text-stone-500 font-mono">Rs. {item.price.toLocaleString()}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 min-h-0 custom-scrollbar">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              {item.options.title} <span className="text-amber-700">*</span>
            </label>
            <div className="space-y-2">
              {item.options.choices.map((choice) => {
                const isSelected = selectedChoice === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => setSelectedChoice(choice)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-700'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    <span>{choice}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Sauce on the side, well done..."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:border-stone-400 focus:outline-none bg-stone-50/50"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Add to Order
          </button>
        </div>

      </div>
    </div>
  );
};
