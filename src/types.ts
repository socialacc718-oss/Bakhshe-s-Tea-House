export interface MenuItemOption {
  title: string;
  choices: string[];
  required?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
  options?: MenuItemOption;
  isPreOrder?: boolean;
  highlight?: boolean;
}

export interface CartItem {
  id: string; // generated unique key for item + selectedOption
  menuItemId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  selectedOption?: string;
  notes?: string;
}

export type OrderType = 'delivery' | 'takeaway' | 'dinein';

export interface CustomerOrderData {
  name: string;
  phone: string;
  orderType: OrderType;
  address?: string;
  tableNumber?: string;
  specialNotes?: string;
  paymentMethod: string;
}

export interface OrderReceipt {
  orderId: string;
  timestamp: string;
  customer: CustomerOrderData;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
}
