import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import "../admin.css";

export const metadata: Metadata = {
  title: "Admin | Levente Digital",
};

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  return (
    <AdminShell fullName={admin.fullName} email={admin.email}>
      {children}
    </AdminShell>
  );
}
