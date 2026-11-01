"use client";

import { useActionState } from "react";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { buyNow, type BuyNowState } from "@/app/actions";

export function BuyNowButton({ slug }: { slug: string }) {
  const [state, action, pending] = useActionState<BuyNowState>(buyNow.bind(null, slug), {});

  return (
    <form action={action} className="flex flex-col gap-2">
      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 text-[15px] font-bold text-white transition-colors hover:bg-brand-strong disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Starting checkout…
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faBolt} className="size-3.5" />
            Buy Now
          </>
        )}
      </button>
      {state.error && (
        <p role="alert" className="text-sm text-[#e03131]">
          {state.error}
        </p>
      )}
    </form>
  );
}
