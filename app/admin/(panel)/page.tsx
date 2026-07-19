import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";

function formatDate(value: string) {
  return new Date(value).toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: bookingCount },
    { count: articleCount },
    { data: articles },
    { data: recentBookings },
  ] = await Promise.all([
    supabase.from("pts_products").select("*", { count: "exact", head: true }),
    supabase.from("pts_bookings").select("*", { count: "exact", head: true }),
    supabase.from("pts_articles").select("*", { count: "exact", head: true }),
    supabase
      .from("pts_articles")
      .select("id, title, path, views, published_at")
      .order("views", { ascending: false })
      .limit(5),
    supabase
      .from("pts_bookings")
      .select(
        "id, product_title, customer_name, total_amount, status, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <section>
      <AdminPageHeader title="Főoldal" />

      <div className="admin-stats">
        <Link href="/admin/products" className="admin-stat">
          <span>Termékek</span>
          <strong>{productCount ?? 0}</strong>
        </Link>
        <Link href="/admin/bookings" className="admin-stat">
          <span>Foglalások</span>
          <strong>{bookingCount ?? 0}</strong>
        </Link>
        <Link href="/admin/articles" className="admin-stat">
          <span>Cikkek</span>
          <strong>{articleCount ?? 0}</strong>
        </Link>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <div className="admin-card-head">5 legnépszerűbb cikk</div>
          <div className="admin-table-wrap">
            <table className="admin-table admin-table--stack">
              <tbody>
                {(articles ?? []).map((article) => (
                  <tr key={article.id}>
                    <td>
                      <Link href={article.path} target="_blank">
                        {article.title}
                      </Link>
                    </td>
                    <td data-label="Megtekintés">
                      <span className="admin-pill">
                        {article.views} megtekintés
                      </span>
                    </td>
                    <td data-label="Dátum">{formatDate(article.published_at)}</td>
                  </tr>
                ))}
                {!articles?.length ? (
                  <tr>
                    <td>Nincs cikk.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">Legutóbbi foglalások</div>
          <div className="admin-table-wrap">
            <table className="admin-table admin-table--stack">
              <tbody>
                {(recentBookings ?? []).map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ fontWeight: 650 }}>{b.customer_name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                        {b.product_title}
                      </div>
                    </td>
                    <td data-label="Státusz">
                      <span className="admin-pill admin-pill--gray">
                        {b.status}
                      </span>
                    </td>
                    <td data-label="Összeg">
                      €{Number(b.total_amount).toFixed(2)}
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                        {formatDate(b.created_at)}
                      </div>
                    </td>
                  </tr>
                ))}
                {!recentBookings?.length ? (
                  <tr>
                    <td>Még nincs foglalás.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
