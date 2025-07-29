import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { CiDatabase, CiMonitor } from "react-icons/ci";
import { BiTask } from "react-icons/bi";

export function AppSidebar({ activePage }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="font-semibold text-slate-600">KRSPLAN</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/">
                  <SidebarMenuButton
                    isActive={activePage === "plan" ? true : false}
                  >
                    <BiTask />
                    Plan
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/datasource">
                  <SidebarMenuButton
                    isActive={activePage === "datasource" ? true : false}
                  >
                    <CiDatabase />
                    Datasource
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/view">
                  <SidebarMenuButton
                    isActive={activePage === "view" ? true : false}
                  >
                    <CiMonitor />
                    View
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="text-sm text-right">v 1.1.1</SidebarFooter>
    </Sidebar>
  );
}
