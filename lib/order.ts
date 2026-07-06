export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  qty: number;
  variant?: string;
};

export type Order = {
  id: number;
  createdAt: string;
  name: string;
  address: string;
  phone: string;
  items: OrderItem[];
  total: number;
};

/**
 * Generate a WhatsApp message text for an order.
 * Includes customer details, item list, and total price.
 */
export function formatWhatsAppMessage(order: Order, storePhone: string): string {
  const itemsText = order.items
    .map((it) => `- ${it.qty} × ${it.name}${it.variant ? ` (${it.variant})` : ''}: ${formatRupiah(it.price * it.qty)}`)
    .join('\n');
  return `Halo, saya ingin memesan produk berikut:%0A%0A${itemsText}%0A%0ATotal: ${formatRupiah(order.total)}%0A%0ANama: ${order.name}%0AAlamat: ${order.address}%0ANomor HP: ${order.phone}%00%0ATerima kasih!`;
}

// Simple rupiah formatter (duplicate from lib/products to avoid circular deps)
function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}
