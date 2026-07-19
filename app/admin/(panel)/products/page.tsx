import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SyncProductsButton } from "@/components/admin/SyncProductsButton";
import { createClient } from "@/lib/supabase/server";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("pts_products")
    .select(
      "id, slug, title, category, price, original_price, is_active, updated_at",
    )
    .order("title");

  return (
    <section>
      <AdminPageHeader title="Áruház" actions={<SyncProductsButton />} />

      <div className="admin-card">
        <div className="admin-card-head">
          Termékek
          <span className="admin-pill admin-pill--gray">
            {products?.length ?? 0}
          </span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--stack">
            <thead>
              <tr>
                <th>Termék</th>
                <th>Kategória</th>
                <th>Ár</th>
                <th>Státusz</th>
              </tr>
            </thead>
            <tbody>
              {(products ?? []).map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 650 }}>{p.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {p.slug}
                    </div>
                  </td>
                  <td data-label="Kategória">{p.category || "—"}</td>
                  <td data-label="Ár">
                    {p.price != null ? `€${Number(p.price).toFixed(2)}` : "—"}
                    {p.original_price != null ? (
                      <span
                        style={{
                          marginLeft: "0.4rem",
                          color: "#9ca3af",
                          textDecoration: "line-through",
                        }}
                      >
                        €{Number(p.original_price).toFixed(2)}
                      </span>
                    ) : null}
                  </td>
                  <td data-label="Státusz">
                    <span
                      className={`admin-pill ${
                        p.is_active ? "admin-pill--green" : "admin-pill--gray"
                      }`}
                    >
                      {p.is_active ? "Aktív" : "Inaktív"}
                    </span>
                  </td>
                </tr>
              ))}
              {!products?.length ? (
                <tr>
                  <td>Nincs termék. Használd a szinkron gombot.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
