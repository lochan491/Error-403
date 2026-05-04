import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Radar, Info } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { ShieldLogo } from "./ShieldLogo";

const items = [
  { title: "Home", url: "/" as const, icon: Home },
  { title: "Live Detection", url: "/detection" as const, icon: Radar },
  { title: "About", url: "/about" as const, icon: Info },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40">
      <SidebarContent className="bg-sidebar">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-border/40">
          <ShieldLogo className="h-8 w-8 shrink-0" />
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold neon-text text-sm">DEEPSHIELD</span>
              <span className="text-[10px] text-muted-foreground tracking-widest">AI · DEFENSE GRID</span>
            </div>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display text-[10px] tracking-widest text-muted-foreground">
            NAVIGATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = path === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 transition-all ${
                          active
                            ? "bg-primary/15 text-primary border-l-2 border-primary"
                            : "hover:bg-sidebar-accent/60"
                        }`}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {!collapsed && (
          <div className="mx-3 mt-auto mb-4 glass rounded-lg p-3 text-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-muted-foreground">THREAT LEVEL</span>
            </div>
            <div className="font-display text-success font-bold">LOW</div>
            <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-1/4 bg-gradient-to-r from-success to-warning" />
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
