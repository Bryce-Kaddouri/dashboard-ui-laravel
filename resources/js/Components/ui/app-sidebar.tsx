import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
  } from "@/Components/ui/sidebar"
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BarChart, Building, ChevronUp, DollarSign, Home, LineChart, LogOut, Package, Settings, SidebarIcon, User, User2, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel } from "./dropdown-menu";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { ConfirmLogoutDialog } from "../ConfirmLogoutDialog";
import { useIsMobile } from "@/hooks/use-mobile";

  const items = [
    { url: "/dashboard", title: "Dashboard", icon:Home  },
    { url: "/providers", title: "Providers", icon:Building },
    { url: "/products", title: "Products", icon:Package },
    { url: "/prices", title: "Prices", icon:DollarSign },
    { url: "/users", title: "Users", icon:Users },
    { url: "/charts/provider", title: "Provider Charts", icon:BarChart },
    { url: "/charts/product", title: "Product Charts", icon:LineChart },
  ];
  
  export function AppSidebar() {
    const user = usePage().props.auth.user;
    const currentPath = window.location.pathname; // Get the current path

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleLogoutClick = (e: React.FormEvent<HTMLFormElement>) => {
        // prevent the dropdown from closing
        e.preventDefault();
        console.log('logout clicked');
        setIsDialogOpen(true); // Open the confirmation dialog
    };
  
    const handleConfirmLogout = () => {
      window.location.href = route('logout'); // Redirect to logout
    };
    const isMobile = useIsMobile();


    return (
        <Sidebar variant="floating" collapsible="icon" >
            <SidebarHeader>
                <SidebarTrigger />
            </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => ( 
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild isActive={!!currentPath.match(new RegExp(`^${item.url}`))}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton isActive={!!currentPath.match(new RegExp(`^(${'/profile'}|${'/settings'})`))}>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side={isMobile ? 'top' : 'right'}
                  align={isMobile ? 'center' : 'end'}
                  alignOffset={isMobile ? 0 : 0}
                  sideOffset={isMobile ? 0 : 14}
                  className=" bg-white p-2 rounded-md shadow-md w-full"
                >
                    <DropdownMenuLabel className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User2 />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">{user.name}</span>
                            <span className="text-xs text-gray-500">{user.email}</span>
                        </div>
                    </DropdownMenuLabel>
                  <DropdownMenuItem className={`flex items-center gap-2 ${!!currentPath.match(new RegExp(`^${'/profile'}`)) ? 'bg-muted' : ''}`} onClick={() => window.location.href = route('profile.edit')}>
                    <User />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`flex items-center gap-2 ${!!currentPath.match(new RegExp(`^${'/settings'}`)) ? 'bg-muted' : ''}`} onClick={() => window.location.href = route('settings')}>
                    <Settings />
                    <span>Settings</span>
                  </DropdownMenuItem >
                  <ConfirmLogoutDialog 
                children={<DropdownMenuItem className="flex items-center gap-2" onSelect={(e: Event) => handleLogoutClick(e as any)} >
                    <LogOut />
                    <span>Sign out</span>
                  </DropdownMenuItem>}
                open={isDialogOpen} 
                onConfirm={handleConfirmLogout} 
                onCancel={() => setIsDialogOpen(false)} 
              />
                  
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  }
  
