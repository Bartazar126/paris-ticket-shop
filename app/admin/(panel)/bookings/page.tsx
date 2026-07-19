import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";

function formatDate(value: string) {
  return new Date(value).toLocaleString("hu-HU");
}

function statusPillClass(status: string): string {
  if (status === "paid") return "admin-pill admin-pill--green";
  if (status === "pending_payment") return "admin-pill admin-pill--amber";
  if (status === "failed" || status === "cancelled") {
    return "admin-pill admin-pill--red";
  }
  return "admin-pill admin-pill--gray";
}

function shortSession(id: string | null): string {
  if (!id) return "—";
  return `${id.slice(0, 10)}…`;
}

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const { data: bookings } = await supabase
    .from("pts_bookings")
    .select(
      "id, product_title, customer_name, customer_email, adults, children, infants, total_amount, status, created_at, paid_at, stripe_session_id",
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
                <th>Stripe</th>
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
                    <span className={statusPillClass(b.status)}>{b.status}</span>
                    {b.paid_at ? (
                      <div
                        style={{
                          marginTop: "0.25rem",
                          fontSize: "0.7rem",
                          color: "#6b7280",
                        }}
                      >
                        Fizetve: {formatDate(b.paid_at)}
                      </div>
                    ) : null}
                  </td>
                  <td data-label="Stripe">
                    <span
                      style={{ fontFamily: "monospace", fontSize: "0.75rem" }}
                      title={b.stripe_session_id || undefined}
                    >
                      {shortSession(b.stripe_session_id)}
                    </span>
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
