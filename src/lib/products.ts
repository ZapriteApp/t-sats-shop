export type Product = {
  slug: string;
  name: string;
  tagline: string;
  /** Price in cents. */
  price: number;
  /** Shirt colour, the print on it, and the card behind it. */
  shirt: string;
  ink: string;
  backdrop: string;
  print: "bitcoin" | "bolt" | "21m";
};

// Every shirt costs 21 cents: enough to show a real Lightning payment, little enough to not matter.
export const products: Product[] = [
  {
    slug: "21-million-tee",
    name: "21 Million Tee",
    tagline: "Limited supply. Hard cap. No exceptions.",
    price: 21,
    // Zaprite green
    shirt: "#20c997",
    ink: "#fefeff",
    backdrop: "#e6fcf5",
    print: "21m",
  },
  {
    slug: "lightning-tee",
    name: "Lightning Tee",
    tagline: "Settles faster than you can put it on.",
    price: 21,
    shirt: "#f8f9fa",
    ink: "#339af0",
    backdrop: "#f1f3f5",
    print: "bolt",
  },
  {
    slug: "satoshi-t-shirt",
    name: "Satoshi T-Shirt",
    tagline: "The classic. Unmistakable. One big ₿.",
    price: 21,
    // Bitcoin orange
    shirt: "#f7931a",
    ink: "#fefeff",
    backdrop: "#fff4e6",
    print: "bitcoin",
  },
];

export function getProduct(slug: string | undefined) {
  return products.find((p) => p.slug === slug);
}

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}
