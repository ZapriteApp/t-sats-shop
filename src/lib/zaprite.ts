import "server-only";

// Minimal Zaprite API helper. Docs: https://api.zaprite.com
// ZAPRITE_API_BASE can point at another Zaprite environment (or a local mock) for testing.
const ZAPRITE_API_BASE = process.env.ZAPRITE_API_BASE ?? "https://api.zaprite.com/v1";

// Every order this shop creates carries this tag, so we never show an order made elsewhere in the org.
export const SHOP_TAG = "T-sats Shop";

export type OrderStatus = "PENDING" | "PROCESSING" | "PAID" | "OVERPAID" | "UNDERPAID" | "COMPLETE";

export type ZapriteOrder = {
  id: string;
  status: OrderStatus;
  /** Amount in the currency's smallest unit (cents for USD). */
  totalAmount: number;
  currency: string;
  label: string | null;
  paidAt: string | null;
  expiresAt: string | null;
  /** Zaprite's hosted checkout for this order. */
  checkoutUrl: string;
  tags: string[];
  metadata: Record<string, string> | null;
};

export function isPaid(status: OrderStatus) {
  return status === "PAID" || status === "OVERPAID" || status === "COMPLETE";
}

async function zaprite<T>(path: string, init?: RequestInit): Promise<T> {
  const key = process.env.ZAPRITE_API_KEY;
  if (!key) throw new Error("ZAPRITE_API_KEY is not set");

  const res = await fetch(`${ZAPRITE_API_BASE}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Zaprite ${init?.method ?? "GET"} ${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export function createOrder({
  amount,
  label,
  product,
  redirectUrl,
}: {
  amount: number;
  label: string;
  product: string;
  /** Where Zaprite sends the shopper after payment. Zaprite appends `?orderId=`. */
  redirectUrl: string;
}) {
  return zaprite<ZapriteOrder>("/orders", {
    method: "POST",
    body: JSON.stringify({
      amount,
      currency: "USD",
      label,
      redirectUrl,
      externalUniqId: `tsats_${crypto.randomUUID()}`,
      // Optional: the Zaprite checkout to use, with the payment methods to demo.
      customCheckoutId: process.env.ZAPRITE_CHECKOUT_ID || undefined,
      // Abandoned demo orders can't be paid after an hour.
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      sendReceiptToCustomer: false,
      disablePaymentNotifs: true,
      tags: [SHOP_TAG],
      metadata: { product },
    }),
  });
}

/** The order, or null when it doesn't exist or wasn't created by this shop. */
export async function getShopOrder(id: string): Promise<ZapriteOrder | null> {
  try {
    const order = await zaprite<ZapriteOrder>(`/orders/${encodeURIComponent(id)}`);
    return order.tags?.includes(SHOP_TAG) ? order : null;
  } catch (e) {
    if (e instanceof Error && / failed: 404 /.test(e.message)) return null;
    throw e;
  }
}
