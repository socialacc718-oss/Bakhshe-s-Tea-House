import { OrderReceipt } from '../types';
import { RESTAURANT_INFO } from '../data/menu';

export function formatWhatsAppMessage(receipt: OrderReceipt): string {
  const dateStr = receipt.timestamp;
  const itemsText = receipt.items
    .map((item, idx) => {
      let line = `${idx + 1}. *${item.name}* x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`;
      if (item.selectedOption) {
        line += `\n   ↳ Choice: _${item.selectedOption}_`;
      }
      if (item.notes) {
        line += `\n   ↳ Note: ${item.notes}`;
      }
      return line;
    })
    .join('\n');

  let orderTypeLabel = '🛵 Home Delivery';
  if (receipt.customer.orderType === 'dinein') {
    orderTypeLabel = `🍽️ Dine-In (Table: ${receipt.customer.tableNumber || 'Assigned on arrival'})`;
  } else if (receipt.customer.orderType === 'takeaway') {
    orderTypeLabel = '🛍️ Self Takeaway / Pickup';
  }

  const slip = 
`☕ *BAKHSHE'S TEA HOUSE - ORDER SLIP*
━━━━━━━━━━━━━━━━━━━━
📌 *Order ID:* #${receipt.orderId}
🕒 *Time:* ${dateStr}
━━━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS:*
• *Name:* ${receipt.customer.name}
• *Phone:* ${receipt.customer.phone}
• *Order Type:* ${orderTypeLabel}
${receipt.customer.orderType === 'delivery' ? `• *Delivery Address:* ${receipt.customer.address}` : ''}
${receipt.customer.orderType === 'dinein' && receipt.customer.tableNumber ? `• *Table Number:* ${receipt.customer.tableNumber}` : ''}
• *Payment:* ${receipt.customer.paymentMethod}
${receipt.customer.specialNotes ? `• *Special Instructions:* ${receipt.customer.specialNotes}` : ''}

━━━━━━━━━━━━━━━━━━━━
📋 *ITEMS ORDERED:*
${itemsText}

━━━━━━━━━━━━━━━━━━━━
💵 *BILL BREAKDOWN:*
• *Subtotal:* Rs. ${receipt.subtotal.toLocaleString()}
${receipt.customer.orderType === 'delivery' ? `• *Delivery Fee:* Rs. ${receipt.deliveryFee.toLocaleString()}` : '• *Delivery Fee:* Rs. 0 (Free / Dine-In)'}
✨ *NET TOTAL PAYABLE:* Rs. ${receipt.grandTotal.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━
📍 *Restaurant Location:*
${RESTAURANT_INFO.address}
🗺️ ${RESTAURANT_INFO.googleMapsUrl}

_Please confirm this order by replying to this message!_`;

  return slip;
}

export function getWhatsAppOrderLink(receipt: OrderReceipt): string {
  const text = formatWhatsAppMessage(receipt);
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function generateOrderId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `BTH-${randomNum}`;
}
