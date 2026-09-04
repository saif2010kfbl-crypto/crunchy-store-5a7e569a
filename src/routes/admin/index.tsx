import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AdminCard, AdminPageHeader, adminNav } from "@/components/admin/admin-shell";
import {
  activityLog,
  adminOrders,
  adminProducts,
  moderators,
  roleLabels,
} from "@/data/admin-mock";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const total = adminProducts.length;
  const available = adminProducts.filter((p) => p.status === "available").length;
  const pending = adminProducts.filter((p) => p.status === "pending").length;
  const sold = adminProducts.filter((p) => p.status === "sold").length;
  const newOrders = adminOrders.filter((o) => o.status === "new").length;
  const activeModerators = moderators.filter((m) => m.active).length;

  const stats = [
    { label: "إجمالي المنتجات", value: total },
    { label: "متوفرة", value: available },
    { label: "قيد الطلب", value: pending },
    { label: "تم البيع", value: sold },
    { label: "طلبات جديدة", value: newOrders },
    { label: "المشرفون النشطون", value: activeModerators },
  ];

  return (
    <>
      <AdminPageHeader
        title="لوحة الإدارة"
        description="نظرة عامة على المتجر. بيانات تجريبية حتى يتم ربط قاعدة البيانات."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <AdminCard key={s.label} className="text-center">
            <p className="text-2xl font-extrabold tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </AdminCard>
        ))}
      </div>

      <AdminCard>
        <h2 className="text-base font-extrabold tracking-tight">اختصارات</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {adminNav
            .filter((item) => item.to !== "/admin")
            .map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center justify-between gap-2 rounded-2xl border border-border bg-surface-2 px-4 py-3 text-sm font-semibold transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-center gap-2">
                  <item.icon className="size-4 text-muted-foreground" />
                  {item.label}
                </span>
                <ArrowLeft className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
              </Link>
            ))}
        </div>
      </AdminCard>

      <AdminCard>
        <h2 className="text-base font-extrabold tracking-tight">آخر نشاطات الإدارة</h2>
        <ul className="mt-3 space-y-2">
          {activityLog.slice(0, 5).map((entry) => (
            <li
              key={entry.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-surface-2 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {entry.action} — {entry.target}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {entry.actorName} · {roleLabels[entry.actorRole]} · {entry.details}
                </p>
              </div>
              <time className="text-[11px] text-muted-foreground">
                {new Date(entry.at).toLocaleString("ar")}
              </time>
            </li>
          ))}
        </ul>
      </AdminCard>
    </>
  );
}
