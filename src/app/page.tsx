import {
  faBolt,
  faHandPointer,
  faLightbulb,
  faMobileScreenButton,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SiteFooter, SiteHeader } from "@/components/brand";
import { BuyNowButton } from "@/components/buy-now-button";
import { ShirtArt } from "@/components/shirt-art";
import { formatUsd, products } from "@/lib/products";

const steps = [
  {
    icon: faMobileScreenButton,
    title: "Sign up for Zaprite P2P",
    body: "Get the Zaprite P2P app and connect the bitcoin wallet you already use.",
    href: "https://zapritep2p.com",
  },
  {
    icon: faShirt,
    title: "Pick a T-Shirt",
    body: "Every tee is $0.21. Real sats paid. But it's a demo, so nothing actually ships.",
  },
  {
    icon: faBolt,
    title: "Choose Zaprite Pay",
    body: "On the Zaprite checkout, choose 'Pay with Zaprite P2P'. The payment goes straight to your phone.",
  },
  {
    icon: faHandPointer,
    title: "Slide to pay",
    body: "Approve it with a slide in the app. Zaprite confirms the payment and brings you back here.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand-strong">
            <FontAwesomeIcon icon={faBolt} className="size-3" />
            A Zaprite Pay demo store
          </p>
          <h1 className="max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight text-heading sm:text-6xl">
            Tees for people who count in sats.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">
            Buy any shirt for <span className="font-bold text-heading">$0.21</span> and see how a bitcoin checkout
            powered by Zaprite Pay feels from the shopper&rsquo;s side. Real bitcoin payment, pretend t-shirt.
          </p>
        </section>

        {/* Products */}
        <section aria-labelledby="shop" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 id="shop" className="sr-only">
            Shop
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.slug} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
                <ShirtArt product={product} className="aspect-square" />
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-bold text-heading">{product.name}</h3>
                      <p className="text-lg font-bold text-brand-strong tabular-nums">{formatUsd(product.price)}</p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-pretty text-muted">{product.tagline}</p>
                  </div>
                  <div className="mt-auto">
                    <BuyNowButton slug={product.slug} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* How the demo works */}
        <section className="border-t border-line bg-panel">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-heading">How this demo works</h2>
            <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-white text-brand shadow-[0_1px_0_0_#ced4da] ring-1 ring-outline">
                    <FontAwesomeIcon icon={step.icon} className="size-4" />
                  </span>
                  <h3 className="font-bold text-heading">
                    {i + 1}.{" "}
                    {step.href ? (
                      <a
                        href={step.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4 hover:text-brand-strong"
                      >
                        {step.title}
                      </a>
                    ) : (
                      step.title
                    )}
                  </h3>
                  <p className="text-sm leading-relaxed text-body">{step.body}</p>
                </li>
              ))}
            </ol>

            <p className="mt-10 flex items-start gap-3 rounded-xl border border-brand-line bg-brand-soft px-4 py-3 text-sm leading-relaxed text-pretty text-body">
              <FontAwesomeIcon icon={faLightbulb} className="mt-1 size-3.5 shrink-0 text-brand-strong" />
              <span>
                <span className="font-bold text-heading">Tip:</span> After your first Zaprite P2P payment tap
                &lsquo;Remember this browser&rsquo; and then try another payment. It&rsquo;s even faster!
              </span>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
