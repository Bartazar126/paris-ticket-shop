import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StripeSettingsForm } from "@/components/admin/StripeSettingsForm";

export default function AdminSettingsPage() {
  return (
    <section>
      <AdminPageHeader
        title="Beállítások"
        description="Stripe kulcsok kezelése. Teszt (pk_test / sk_test) vagy élő kulcsok — a secret csak szerveren használatos."
      />

      <div className="admin-card">
        <div className="admin-card-head">Stripe</div>
        <div className="admin-card-body">
          <StripeSettingsForm />
        </div>
      </div>
    </section>
  );
}
