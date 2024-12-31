import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function SidebarLayout({ children, activePage }) {
  return (
    <SidebarProvider>
      <AppSidebar activePage={activePage} />
      <main className="w-full overflow-x-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
