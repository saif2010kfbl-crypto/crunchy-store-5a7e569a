import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Layers,
  Megaphone,
  CreditCard,
  Users,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

export const adminNav = [
  { to: "/admin", label: "لوحة الإدارة", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "المنتجات", icon: Package, exact: false },
  { to: "/admin/orders", label: "الطلبات", icon: ClipboardList, exact: false },
  { to: "/admin/sections", label: "الأقسام", icon: Layers, exact: false },
  { to: "/admin/ads", label: "الإعلانات", icon: Megaphone, exact: false },
  { to: "/admin/payments", label: "طرق الدفع", icon: CreditCard, exact: false },
  { to: "/admin/moderators", label: "المشرفون", icon: Users, exact: false },
  { to: "/admin/activity", label: "سجل الإدارة", icon: ScrollText, exact: false },
  { to: "/admin/settings", label: "الحماية والإعدادات", icon: ShieldCheck, exact: false },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-lg font-extrabold tracking-tight">CRUNCHY STORE</p>
              <p className="text-xs text-muted-foreground">لوحة الإدارة</p>
            </div>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] text-muted-foreground">
              وضع تجريبي — بدون مصادقة
            </span>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {adminNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="shrink-0 rounded-full border border-border px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[status=active]:bg-surface-2 data-[status=active]:font-bold data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 pb-20">{children}</main>
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-xl font-extrabold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-3xl border border-border bg-surface p-4 sm:p-5 card-glow ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border py-14 text-center">
      <p className="text-sm font-semibold">{title}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
