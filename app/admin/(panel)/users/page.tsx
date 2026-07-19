import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CreateAdminForm } from "@/components/admin/CreateAdminForm";
import { ToggleAdminActive } from "@/components/admin/ToggleAdminActive";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";

function formatDate(value: string) {
  return new Date(value).toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminUsersPage() {
  const me = await requireAdmin();
  const adminClient = createAdminClient();

  const [{ data: admins }, { data: listed }] = await Promise.all([
    adminClient
      .from("pts_admins")
      .select("user_id, full_name, is_active, created_at")
      .order("created_at", { ascending: true }),
    adminClient.auth.admin.listUsers({ perPage: 200 }),
  ]);

  const emailById = new Map(
    (listed?.users ?? []).map((u) => [u.id, u.email ?? ""]),
  );

  const rows = (admins ?? []).map((row) => ({
    ...row,
    email: emailById.get(row.user_id) || "—",
  }));

  return (
    <section>
      <AdminPageHeader title="Felhasználókezelő" />

      <div className="admin-card">
        <div className="admin-card-head">Új admin fiók</div>
        <div className="admin-card-body">
          <CreateAdminForm />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          Meglévő fiókok
          <span className="admin-pill admin-pill--gray">{rows.length}</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--stack">
            <thead>
              <tr>
                <th>Név</th>
                <th>Email</th>
                <th>Státusz</th>
                <th>Létrehozva</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.user_id}>
                  <td>
                    <span style={{ fontWeight: 650 }}>{row.full_name}</span>
                    {row.user_id === me.id ? (
                      <span style={{ marginLeft: 6, fontSize: 12, color: "#6b7280" }}>
                        (te)
                      </span>
                    ) : null}
                  </td>
                  <td data-label="Email">{row.email}</td>
                  <td data-label="Státusz">
                    <span
                      className={`admin-pill ${
                        row.is_active ? "admin-pill--green" : "admin-pill--gray"
                      }`}
                    >
                      {row.is_active ? "Aktív" : "Inaktív"}
                    </span>
                  </td>
                  <td data-label="Létrehozva">{formatDate(row.created_at)}</td>
                  <td data-label="Művelet">
                    <ToggleAdminActive
                      userId={row.user_id}
                      isActive={row.is_active}
                      disabled={row.user_id === me.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
