import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F8F6]">
      <SidebarProvider defaultOpen={true}>
        <main className="min-w-0 flex-1">
          <div className="fixed left-3 top-3 z-[60] lg:hidden">
            <SidebarTrigger className="h-10 w-10 rounded-xl border border-[#DDE1D9] bg-white text-primary shadow-md hover:bg-[#F2F4F0]" />
          </div>
          <div className="min-h-screen w-full overflow-x-clip">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
