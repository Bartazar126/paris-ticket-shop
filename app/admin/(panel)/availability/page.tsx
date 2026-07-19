import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AvailabilityManager } from "@/components/admin/AvailabilityManager";

export default function AdminAvailabilityPage() {
  return (
    <section>
      <AdminPageHeader
        title="Elérhetőség"
        description="Zárd le napokat és időpontokat alap vonzerőnként. A zárás automatikusan érvényes minden kombóra, ami azt a vonzerőt tartalmazza."
      />
      <AvailabilityManager />
    </section>
  );
}
