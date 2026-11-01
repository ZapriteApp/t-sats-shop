import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { faArrowRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SiteFooter, SiteHeader } from "@/components/brand";
import { ShirtArt } from "@/components/shirt-art";
import { formatUsd, getProduct } from "@/lib/products";
import { getShopOrder, isPaid, type ZapriteOrder } from "@/lib/zaprite";

export const metadata: Metadata = { title: "Thank you — T-sats Shop", robots: { index: false } };

// Logo width and height are each SVG's own size. The files don't preserve their aspect ratio, so the wrong ratio
// squashes them.
const links = [
  {
    href: "https://zapritepay.com",
    logo: { src: "/zaprite-pay-logo-xs.svg", alt: "Zaprite Pay", width: 85, height: 16 },
    body: "No QR codes. No copy-paste. Slide to pay. Your customers can check out in seconds with Zaprite P2P.",
  },
  {
    href: "https://zapritep2p.com",
    logo: { src: "/zaprite-p2p-logo-sm.svg", alt: "Zaprite P2P", width: 108, height: 20 },
    body: "Pay and Request bitcoin from friends and family with the wallets you already use.",
  },
  {
    href: "https://zaprite.com",
    logo: { src: "/zaprite-logo.svg", alt: "Zaprite", width: 57, height: 16 },
    body: "Accept bitcoin, lightning, stablecoins and fiat for your business on one hosted Checkout.",
  },
];

async function findPaidOrder(orderId: string | undefined): Promise<ZapriteOrder | null> {
  if (!orderId) return null;
  try {
    const order = await getShopOrder(orderId);
    return order && isPaid(order.status) ? order : null;
  } catch {
    // The receipt is a nice-to-have; the thank-you page still works without it.
    return null;
  }
}

export default async function SuccessPage({ searchParams }: PageProps<"/success">) {
  const { orderId } = await searchParams;
  const order = await findPaidOrder(typeof orderId === "string" ? orderId : undefined);
  const product = getProduct(order?.metadata?.product);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start gap-5">
          <span className="grid size-14 place-items-center rounded-2xl bg-[#e6fcf5] text-success">
            <FontAwesomeIcon icon={faCircleCheck} className="size-7" />
          </span>
          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-pretty text-heading sm:text-5xl">
            Thanks for checking out our demo!
          </h1>
        </div>

        {order && (
          <div className="flex items-center gap-4 rounded-xl border border-line p-4">
            {product && <ShirtArt product={product} className="size-16 shrink-0 rounded-lg" />}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-heading">{order.label}</p>
              <p className="truncate text-sm text-muted">
                Paid {formatUsd(order.totalAmount)}
                {order.paidAt &&
                  ` on ${new Date(order.paidAt).toLocaleDateString("en-US", { dateStyle: "medium" })}`}{" "}
                · <span className="font-mono text-xs">{order.id}</span>
              </p>
            </div>
            <span className="rounded-full bg-[#e6fcf5] px-2.5 py-1 text-xs font-medium text-[#099268]">Paid</span>
          </div>
        )}

        <p className="max-w-2xl text-lg leading-relaxed text-pretty text-body">
          That was a real bitcoin payment, handled end to end by Zaprite. The t-shirt, sadly, is imaginary. If you want
          to learn more about bitcoin payments with Zaprite, check out the sites below.
        </p>

        <ul className="grid gap-4 sm:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col gap-4 rounded-xl border border-line bg-white p-5 transition-colors hover:border-brand-line hover:bg-brand-soft/40"
              >
                <Image
                  src={link.logo.src}
                  alt={link.logo.alt}
                  width={link.logo.width}
                  height={link.logo.height}
                  className="h-5 w-auto self-start"
                />
                <p className="flex-1 text-sm leading-relaxed text-body">{link.body}</p>
                <span className="flex items-center gap-1.5 text-sm font-medium text-brand-strong">
                  Learn more
                  <FontAwesomeIcon icon={faArrowRight} className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Link href="/" className="flex items-center gap-2 self-start text-sm font-medium text-muted hover:text-body">
          Back to the shop
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
