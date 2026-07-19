import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";

function formatDate(value: string) {
  return new Date(value).toLocaleString("hu-HU");
}

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("pts_articles")
    .select("id, title, path, views, published_at, updated_at")
    .order("views", { ascending: false });

  return (
    <section>
      <AdminPageHeader title="Tartalomkezelő" />

      <div className="admin-card">
        <div className="admin-card-head">Cikkek</div>
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--stack">
            <thead>
              <tr>
                <th>Cím</th>
                <th>Megtekintés</th>
                <th>Frissítve</th>
              </tr>
            </thead>
            <tbody>
              {(articles ?? []).map((a) => (
                <tr key={a.id}>
                  <td>
                    <Link href={a.path} target="_blank">
                      {a.title}
                    </Link>
                  </td>
                  <td data-label="Megtekintés">
                    <span className="admin-pill">{a.views}</span>
                  </td>
                  <td data-label="Frissítve">
                    {formatDate(a.updated_at || a.published_at)}
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
