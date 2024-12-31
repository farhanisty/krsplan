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
import { CiDatabase } from "react-icons/ci";
import { GrPlan } from "react-icons/gr";
import { BiTask } from "react-icons/bi";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Maxwell Demon Dev</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <BiTask />
                  Plan
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/datasource">
                  <SidebarMenuButton>
                    <CiDatabase />
                    Datasource
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="text-sm text-right">v 1.0.0</SidebarFooter>
    </Sidebar>
  );
}
