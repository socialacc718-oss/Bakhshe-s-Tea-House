/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { OptionSelectModal } from './components/OptionSelectModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReceiptSlipModal } from './components/ReceiptSlipModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileCartBar } from './components/MobileCartBar';
import { Footer } from './components/Footer';
import { BakhsheLogo } from './components/icons/BakhsheLogo';

import { MENU_ITEMS, CATEGORIES, RESTAURANT_INFO } from './data/menu';
import { MenuItem, CartItem, CustomerOrderData, OrderReceipt } from './types';
import { generateOrderId } from './utils/orderSlip';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const CART_STORAGE_KEY = 'bakhshe_cart_v1';

export default function App() {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // LocalStorage error handled
    }
  }, [cartItems]);

  // UI state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState<OrderReceipt | null>(null);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart calculations
  const cartCount = useMemo(
    () => cartItems.reduce((acc, curr) => acc + curr.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [cartItems]
  );

  // Category counts for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: MENU_ITEMS.length,
    };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = MENU_ITEMS.filter((item) => item.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered menu items based on category and search query
  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    } else if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    return items;
  }, [activeCategory, searchQuery]);

  // Grouped items by category for 'all' mode
  const groupedCategories = useMemo(() => {
    if (activeCategory !== 'all' || searchQuery.trim()) return null;

    return CATEGORIES.filter((c) => c.id !== 'all')
      .map((cat) => ({
        ...cat,
        items: MENU_ITEMS.filter((item) => item.category === cat.id),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [activeCategory, searchQuery]);

  // Show Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem, selectedOption?: string, notes?: string) => {
    setCartItems((prev) => {
      const uniqueId = selectedOption ? `${item.id}-${selectedOption}` : item.id;
      const existingIndex = prev.findIndex((ci) => ci.id === uniqueId);

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }

      return [
        ...prev,
        {
          id: uniqueId,
          menuItemId: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          quantity: 1,
          selectedOption,
          notes,
        },
      ];
    });

    triggerToast(`Added ${item.name} to order!`);
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItemId === item.id);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((ci) =>
          ci.id === existing.id ? { ...ci, quantity: ci.quantity - 1 } : ci
        );
      }
      return prev.filter((ci) => ci.id !== existing.id);
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === id) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Checkout & Slip Generation
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (customerData: CustomerOrderData) => {
    const deliveryFee =
      customerData.orderType === 'delivery' ? RESTAURANT_INFO.deliveryFee : 0;
    const grandTotal = cartSubtotal + deliveryFee;

    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const timestamp = new Intl.DateTimeFormat('en-PK', dateOptions).format(new Date());

    const receipt: OrderReceipt = {
      orderId: generateOrderId(),
      timestamp,
      customer: customerData,
      items: [...cartItems],
      subtotal: cartSubtotal,
      deliveryFee,
      grandTotal,
    };

    setGeneratedReceipt(receipt);
    setIsCheckoutOpen(false);
    setIsReceiptOpen(true);
    setCartItems([]);
  };

  // Helper to get total quantity of a menu item in cart
  const getItemCartQuantity = (menuItemId: string) => {
    return cartItems
      .filter((ci) => ci.menuItemId === menuItemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col antialiased selection:bg-emerald-950 selection:text-white">
      
      {/* 1. TOP BAR */}
      <Navbar
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          scrollToMenu();
        }}
      />

      {/* 2. HERO */}
      <Hero
        onExploreMenu={scrollToMenu}
        onExplorePlatters={() => {
          setActiveCategory('platters');
          scrollToMenu();
        }}
      />

      {/* 3. STICKY CATEGORY NAV */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(id) => {
          setActiveCategory(id);
          setSearchQuery('');
        }}
        categoryCounts={categoryCounts}
      />

      {/* 4. MAIN MENU CONTENT AREA */}
      <main id="menu-section" className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Category Header or Search Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <BakhsheLogo size={32} />
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                <span>Authentic Menu</span>
                <span>·</span>
                <span>{filteredItems.length} Items</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {searchQuery ? (
                  <span>Search: "{searchQuery}"</span>
                ) : activeCategory === 'all' ? (
                  <span>Bakhshe's Signature Dining Menu</span>
                ) : (
                  <span>{CATEGORIES.find((c) => c.id === activeCategory)?.name}</span>
                )}
              </h2>
            </div>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-red-600 font-bold hover:underline self-start sm:self-auto cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Promo Banner on Full Menu */}
        {activeCategory === 'all' && !searchQuery && (
          <div className="mb-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 text-white p-5 sm:p-7 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Special Combos & Platters
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                Order Platters, Pizzas & Stuffed Chicken
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Every order generates an instant WhatsApp slip ready for delivery or takeaway in Islamabad.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveCategory('platters')}
                className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Pre-Order Platters
              </button>
              <button
                onClick={() => setActiveCategory('regular-pizza')}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors cursor-pointer"
              >
                Regular Pizzas (1399/-)
              </button>
            </div>
          </div>
        )}

        {/* Menu Grid - EXACT 2-COLUMNS ON MOBILE, 3-4 ON DESKTOP LIKE SCREENSHOT */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto shadow-sm">
            <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No items match your search</h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Try searching for something else like "pizza", "wings", "coffee", or "pasta".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-2xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 cursor-pointer"
            >
              Reset Search & Filter
            </button>
          </div>
        ) : groupedCategories ? (
          /* Grouped by original menu categories */
          <div className="space-y-10">
            {groupedCategories.map((group) => (
              <section key={group.id} className="scroll-mt-36">
                <div className="flex items-center justify-between gap-3 mb-4 pb-2 border-b border-stone-200/80">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                    <span>{group.name}</span>
                  </h3>
                  <span className="text-xs font-mono font-semibold text-stone-500">
                    {group.items.length} items
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                  {group.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      cartQuantity={getItemCartQuantity(item.id)}
                      onAddToCart={(it) => handleAddToCart(it)}
                      onRemoveFromCart={(it) => handleRemoveFromCart(it)}
                      onOptionsClick={(it) => setCustomizingItem(it)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* Single category or search results grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                cartQuantity={getItemCartQuantity(item.id)}
                onAddToCart={(it) => handleAddToCart(it)}
                onRemoveFromCart={(it) => handleRemoveFromCart(it)}
                onOptionsClick={(it) => setCustomizingItem(it)}
              />
            ))}
          </div>
        )}

      </main>

      {/* 5. FOOTER */}
      <Footer onSelectCategory={(catId) => {
        setActiveCategory(catId);
        scrollToMenu();
      }} />

      {/* 6. FLOATING WHATSAPP & CALL BUTTONS (Matching screenshot layout) */}
      <FloatingWhatsApp />

      {/* 7. FLOATING MOBILE CART BAR */}
      <MobileCartBar
        cartCount={cartCount}
        subtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 8. OPTION SELECT MODAL */}
      <OptionSelectModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onConfirm={(item, selectedOption, notes) => {
          handleAddToCart(item, selectedOption, notes);
        }}
      />

      {/* 9. CART DRAWER (Fits full screen, scrollable, no cutoff) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* 10. CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        subtotal={cartSubtotal}
        onSubmit={handleCheckoutSubmit}
      />

      {/* 11. DIGITAL RECEIPT SLIP MODAL */}
      <ReceiptSlipModal
        receipt={generatedReceipt}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        onOrderCompleted={() => {
          setIsReceiptOpen(false);
        }}
      />

      {/* 12. ANIMATED TOAST NOTIFICATION ON ITEM ADD */}
      {toastMessage && (
        <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
