"use client";

import * as React from "react";
import { Bot, ReceiptIcon } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CompanyLogo } from "./company-logo";

const data = {
  navMain: [
    {
      title: "Pix",
      url: "#",
      icon: ReceiptIcon,
      items: [
        {
          title: "Histórico",
          url: "/charges",
        },
        {
          title: "Clientes",
          url: "/clients",
        },
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
