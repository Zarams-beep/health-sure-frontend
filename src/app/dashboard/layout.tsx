// app/dashboard/layout.tsx
import DashboardGuard from "@/component/DashboardGaurd";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardGuard>
      <div className="dashboard-layout">
        {/* you can also include NavBar here */}
        {children}
      </div>
    </DashboardGuard>
  );
}
