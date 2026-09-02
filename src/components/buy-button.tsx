import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

type Props = {
  slug: string;
  disabled?: boolean;
  className?: string;
  label?: string;
};

/**
 * Placeholder purchase action. Real checkout / Telegram order flow is added
 * later; this only signals intent locally.
 */
export function BuyButton({ slug, disabled, className, label = "شراء الآن" }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => toast.success("تم تسجيل رغبتك بالشراء، سيتم ربط الطلبات لاحقًا", { id: slug })}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-buy px-6 text-sm font-bold text-buy-foreground transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      <ShoppingBag className="size-4" />
      {label}
    </button>
  );
}
