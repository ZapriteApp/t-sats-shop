import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

// Flat t-shirt illustration with the product's print, drawn in a 200×200 box.
export function ShirtArt({ product, className }: { product: Product; className?: string }) {
  const { shirt, ink, backdrop, print } = product;
  // Light shirts need an outline to stand off their backdrop.
  const outline = shirt === "#f8f9fa" ? "#ced4da" : "none";

  return (
    <div className={cn("grid place-items-center", className)} style={{ background: backdrop }}>
      <svg viewBox="0 0 200 200" className="h-4/5 w-4/5 drop-shadow-[0_12px_18px_rgba(33,37,41,0.14)]" aria-hidden="true">
        <path
          d="M72 28 48 36 18 64l20 28 18-11v89c0 4 3 6 6 6h76c3 0 6-2 6-6V81l18 11 20-28-30-28-24-8c-3 12-14 20-28 20S75 40 72 28Z"
          fill={shirt}
          stroke={outline}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Collar and sleeve seams */}
        <path d="M72 28c3 14 14 23 28 23s25-9 28-23" fill="none" stroke="#000" strokeOpacity=".12" strokeWidth="3" />
        <path d="M56 81 50 62M144 81l6-19" fill="none" stroke="#000" strokeOpacity=".08" strokeWidth="2" />

        {print === "bitcoin" && (
          <g transform="translate(100 112) rotate(14)">
            <circle r="27" fill={ink} />
            <text
              y="12"
              textAnchor="middle"
              fontSize="36"
              fontWeight="700"
              fill={shirt}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              ₿
            </text>
          </g>
        )}
        {print === "bolt" && <path d="M106 82 80 120h18l-6 30 28-42h-19l5-26Z" fill={ink} />}
        {print === "21m" && (
          <text
            x="100"
            y="124"
            textAnchor="middle"
            fontSize="34"
            fontWeight="800"
            letterSpacing="-1"
            fill={ink}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            21M
          </text>
        )}
      </svg>
    </div>
  );
}
