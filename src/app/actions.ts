"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getProduct } from "@/lib/products";
import { createOrder } from "@/lib/zaprite";

export type BuyNowState = { error?: string };

// Buy Now: create a Zaprite order for the shirt, then send the shopper to Zaprite's hosted checkout.
export async function buyNow(slug: string): Promise<BuyNowState> {
  // The price comes from the server-side catalogue, never from the browser.
  const product = getProduct(slug);
  if (!product) return { error: "That shirt doesn't exist." };

  // Come back to whichever deployment the shopper is on (localhost, a preview, or t-sats.com).
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;

  let checkoutUrl: string;
  try {
    const order = await createOrder({
      amount: product.price,
      label: product.name,
      product: product.slug,
      redirectUrl: `${origin}/success`,
    });
    checkoutUrl = order.checkoutUrl;
  } catch (e) {
    console.error("Create order failed:", e);
    return { error: "Couldn't start checkout. Please try again." };
  }

  redirect(checkoutUrl);
}
