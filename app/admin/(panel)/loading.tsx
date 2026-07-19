export default function AdminLoading() {
  return (
    <div className="admin-skeleton" aria-busy="true" aria-label="Betöltés">
      <div className="admin-skeleton-bar" style={{ width: "30%" }} />
      <div className="admin-skeleton-bar" style={{ width: "55%" }} />
      <div
        style={{
          display: "grid",
          gap: "0.65rem",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginTop: "0.5rem",
        }}
      >
        <div className="admin-skeleton-card" />
        <div className="admin-skeleton-card" />
        <div className="admin-skeleton-card" />
      </div>
      <div className="admin-skeleton-card" style={{ height: "12rem" }} />
    </div>
  );
}
