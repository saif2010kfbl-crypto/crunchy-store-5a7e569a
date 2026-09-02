import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  title: string;
  className?: string;
  variant?: "icon" | "full";
};

/** Builds a permanent, slug-based public link. Internal refs are never used. */
export function productUrl(slug: string) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/p/${slug}`;
}

export function ShareButton({ slug, title, className, variant = "icon" }: Props) {
  const onShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = productUrl(slug);
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("تم نسخ رابط المنتج");
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("تم نسخ رابط المنتج");
      } catch {
        toast.error("تعذّرت المشاركة");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label={`مشاركة ${title}`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-share text-share-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95",
        variant === "icon" ? "size-9" : "h-11 px-5 text-sm font-semibold",
        className,
      )}
    >
      <Share2 className="size-4" />
      {variant === "full" && <span>مشاركة</span>}
    </button>
  );
}
