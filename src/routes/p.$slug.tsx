import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { ShareButton } from "@/components/share-button";
import { BuyButton } from "@/components/buy-button";
import { formatPrice, getProductBySlug, getRelatedProducts } from "@/data/catalog";

export const Route = createFileRoute("/p/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product, related: getRelatedProducts(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "المنتج غير متاح — Game Market" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.title} — Game Market`;
    const description = product.description.slice(0, 150);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const detailsRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const sold = product.status === "sold";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 180);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <Link
            to="/"
            aria-label="رجوع"
            className="grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowRight className="size-5" />
          </Link>
          <p className="truncate text-center text-sm font-bold">{product.gameType}</p>
          {/* Reserved slot for the hidden admin menu (owner / moderators only). */}
          <div aria-hidden className="size-10" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-5">
        <h1 className="sr-only">{product.title}</h1>
        <ProductGallery images={product.images} title={product.title} />

        <div
          ref={detailsRef}
          style={{
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? "translateY(-8px)" : "none",
            pointerEvents: scrolled ? "none" : "auto",
          }}
          className="space-y-4 transition-all duration-500 ease-out"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-muted-foreground">{product.title}</p>
              <p className="text-2xl font-extrabold tracking-tight">{formatPrice(product)}</p>
            </div>
            <ShareButton slug={product.slug} title={product.title} variant="full" />
          </div>

          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <InfoRow label="نوع المنتج" value={product.gameType} />
            <InfoRow label="طريقة التحويل" value={product.transferMethod} />
            <InfoRow label="طريقة الشراء" value={product.purchaseMethod} />
          </dl>

          <div className="rounded-3xl border border-border bg-surface p-4">
            <p className="text-sm leading-7 text-muted-foreground">{product.description}</p>
          </div>

          {sold ? (
            <p className="rounded-full bg-sold px-4 py-3 text-center text-sm font-bold text-sold-foreground">
              تم بيع هذا المنتج
            </p>
          ) : (
            <BuyButton slug={product.slug} className="w-full" />
          )}
        </div>

        <section
          aria-label="منتجات ذات صلة"
          style={{ opacity: scrolled ? 1 : 0.35 }}
          className="space-y-3 transition-opacity duration-500 ease-out"
        >
          <h2 className="text-base font-extrabold tracking-tight">منتجات ذات صلة</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      </main>

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-xl transition-all duration-500"
        style={{
          transform: scrolled ? "translateY(0)" : "translateY(120%)",
          opacity: scrolled ? 1 : 0,
        }}
      >
        <div className="mx-auto grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 truncate text-sm font-bold">{formatPrice(product)}</p>
          <BuyButton slug={product.slug} disabled={sold} label={sold ? "تم البيع" : "شراء الآن"} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 truncate text-sm font-semibold">{value}</dd>
    </div>
  );
}
