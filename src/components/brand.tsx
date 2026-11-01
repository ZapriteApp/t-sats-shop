import Image from "next/image";
import Link from "next/link";
import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

// T-sats Shop avatar from the Zaprite mockups: a white t-shirt on blue. Scales with its container.
export function TSatsAvatar({ className }: { className?: string }) {
  return (
    <span
      className={cn("grid shrink-0 place-items-center bg-brand text-[#fefeff] [container-type:size]", className)}
      aria-hidden="true"
    >
      <FontAwesomeIcon icon={faShirt} className="size-[46cqw]!" />
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-white/85 backdrop-blur supports-backdrop-filter:sticky supports-backdrop-filter:top-0 supports-backdrop-filter:z-20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 rounded-lg">
          <TSatsAvatar className="size-9 rounded-[10px]" />
          <span className="text-lg font-bold tracking-tight text-heading">T-sats Shop</span>
        </Link>
        <span className="rounded-full border border-brand-line bg-brand-soft px-3 py-1 text-xs font-medium text-brand-strong">
          Demo store
        </span>
      </div>
    </header>
  );
}

export function PoweredByZaprite({ className }: { className?: string }) {
  return (
    <a
      href="https://zaprite.com"
      target="_blank"
      rel="noreferrer"
      className={cn("inline-flex items-center gap-1.5 text-sm text-muted hover:text-body", className)}
    >
      Powered by
      <Image src="/zaprite-logo.svg" alt="Zaprite" width={57} height={16} />
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>T-sats Shop is a demo store. Payments are real, but nothing is for sale and nothing ships.</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="https://zapritepay.com" target="_blank" rel="noreferrer" className="hover:text-body">
            Zaprite Pay
          </a>
          <a href="https://zapritep2p.com" target="_blank" rel="noreferrer" className="hover:text-body">
            Zaprite P2P
          </a>
          <PoweredByZaprite />
        </div>
      </div>
    </footer>
  );
}
