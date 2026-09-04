import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";

/**
 * Admin area layout (Stage 3 — UI only).
 * TODO (next stage): replace this placeholder with a server-side route guard
 * that verifies the session + role (owner/deputy/moderator). Hiding the link
 * is NOT the protection.
 */
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة الإدارة — Crunchy Store" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
