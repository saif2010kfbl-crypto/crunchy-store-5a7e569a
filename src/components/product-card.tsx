import { Link } from "@tanstack/react-router";
import { type PublicProduct, formatPrice } from "@/data/catalog";
import { ShareButton } from "./share-button";

/** Compact card: image, price, game type, share. No internal identifiers. */
export function ProductCard({ product }: { product: PublicProduct }) {
  const sold = product.status === "sold";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface card-glow">
      <Link
        to="/p/$slug"
        params={{ slug: product.slug }}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={product.title}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-surface-2">
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            width={1024}
            height={1024}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {sold && (
            <span className="absolute top-2 start-2 rounded-full bg-sold px-3 py-1 text-[11px] font-bold text-sold-foreground">
              تم البيع
            </span>
          )}
        </div>

        <div className="space-y-1 p-3">
          <p className="truncate text-xs text-muted-foreground">{product.gameType}</p>
          <p className="text-base font-extrabold tracking-tight">{formatPrice(product)}</p>
        </div>
      </Link>

      <div className="absolute bottom-3 end-3">
        <ShareButton slug={product.slug} title={product.title} />
      </div>
    </article>
  );
}
