import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminCard, AdminPageHeader, EmptyState } from "@/components/admin/admin-shell";
import {
  adminOrders,
  orderStatusLabels,
  paymentMethodLabels,
  type OrderStatus,
} from "@/data/admin-mock";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const statusStyles: Record<OrderStatus, string> = {
  new: "bg-buy text-buy-foreground",
  in_progress: "bg-surface-2 text-foreground",
  completed: "bg-share text-share-foreground",
  cancelled: "bg-sold text-sold-foreground",
};

function AdminOrders() {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const orders = adminOrders.filter((o) => filter === "all" || o.status === filter);

  return (
    <>
      <AdminPageHeader
        title="الطلبات"
        description="ستصل الطلبات لاحقًا من قاعدة البيانات وبوت Telegram. حاليًا بيانات تجريبية."
      />

      <div className="flex flex-wrap gap-2">
        {(["all", "new", "in_progress", "completed", "cancelled"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-full border border-border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              filter === s
                ? "bg-surface-2 font-bold text-foreground"
                : "text-muted-foreground hover:bg-surface"
            }`}
          >
            {s === "all" ? "الكل" : orderStatusLabels[s]}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <EmptyState title="لا توجد طلبات بهذه الحالة" />
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id}>
              <AdminCard className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{o.productTitle}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {o.price}
                      {o.currency} · {new Date(o.createdAt).toLocaleString("ar")}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusStyles[o.status]}`}
                  >
                    {orderStatusLabels[o.status]}
                  </span>
                </div>

                <dl className="grid gap-2 text-xs sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-surface-2 px-3 py-2">
                    <dt className="text-muted-foreground">المشتري</dt>
                    <dd className="mt-0.5 font-semibold">
                      {o.buyerName}
                      {o.telegramUsername ? ` · ${o.telegramUsername}` : " (بدون هوية Telegram بعد)"}
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface-2 px-3 py-2">
                    <dt className="text-muted-foreground">طريقة الدفع</dt>
                    <dd className="mt-0.5 font-semibold">{paymentMethodLabels[o.paymentMethod]}</dd>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface-2 px-3 py-2">
                    <dt className="text-muted-foreground">رقم الطلب</dt>
                    <dd className="mt-0.5 font-semibold">{o.id}</dd>
                  </div>
                </dl>

                {o.paymentMethod === "on_contact" && (
                  <p className="rounded-2xl bg-buy px-4 py-2.5 text-xs font-bold text-buy-foreground">
                    اختار المشتري الدفع عند التواصل — يتم الاتفاق مباشرة.
                  </p>
                )}

                {o.cardCode && (
                  <p className="rounded-2xl border border-border bg-surface-2 px-4 py-2.5 text-xs">
                    كود بطاقة الرصيد: <span className="font-bold tracking-wide">{o.cardCode}</span>
                  </p>
                )}

                {o.receiptImages.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-xs text-muted-foreground">
                      صور بطاقة الرصيد المرفوعة ({o.receiptImages.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {o.receiptImages.map((url, i) => (
                        <img
                          key={url}
                          src={url}
                          alt={`إيصال ${i + 1}`}
                          loading="lazy"
                          className="size-20 rounded-2xl border border-border object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {o.note && <p className="text-xs text-muted-foreground">ملاحظة: {o.note}</p>}
              </AdminCard>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
