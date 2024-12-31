import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-x-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
