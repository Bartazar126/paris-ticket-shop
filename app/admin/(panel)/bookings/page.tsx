import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";

function formatDate(value: string) {
  return new Date(value).toLocaleString("hu-HU");
}

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const { data: bookings } = await supabase
    .from("pts_bookings")
    .select(
      "id, product_title, customer_name, customer_email, adults, children, infants, total_amount, status, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <section>
      <AdminPageHeader title="Foglalások" />

      <div className="admin-card">
        <div className="admin-card-head">
          Lista
          <span className="admin-pill admin-pill--gray">
            {bookings?.length ?? 0}
          </span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--stack">
            <thead>
              <tr>
                <th>Vendég</th>
                <th>Termék</th>
                <th>Jegyek</th>
                <th>Összeg</th>
                <th>Státusz</th>
                <th>Dátum</th>
              </tr>
            </thead>
            <tbody>
              {(bookings ?? []).map((b) => (
                <tr key={b.id}>
                  <td>
                    <div style={{ fontWeight: 650 }}>{b.customer_name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {b.customer_email}
                    </div>
                  </td>
                  <td data-label="Termék">{b.product_title}</td>
                  <td data-label="Jegyek">
                    {b.adults}A / {b.children}C / {b.infants}I
                  </td>
                  <td data-label="Összeg">
                    €{Number(b.total_amount).toFixed(2)}
                  </td>
                  <td data-label="Státusz">
                    <span className="admin-pill">{b.status}</span>
                  </td>
                  <td data-label="Dátum">{formatDate(b.created_at)}</td>
                </tr>
              ))}
              {!bookings?.length ? (
                <tr>
                  <td>Még nincs foglalás.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
