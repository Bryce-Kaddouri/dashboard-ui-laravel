import Link from "next/link"
import * as React from "react"
import Dropdown from '@/Components/Dropdown';

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  BarChart,
  DollarSign,
  Building,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import {NextUIProvider} from "@nextui-org/system";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/Components/ui/tooltip"
import NoData from "@/Components/NoData"
import { usePage } from "@inertiajs/react";
import { ConfirmLogoutDialog } from "@/Components/ConfirmLogoutDialog";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { AppSidebar } from "@/Components/ui/app-sidebar"
import { useSidebar } from "@/Components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/Components/ui/toaster";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
  { href: "/providers", label: "Providers", icon: <Building className="h-4 w-4" /> },
  { href: "/products", label: "Products", icon: <Package className="h-4 w-4" /> },
  { href: "/prices", label: "Prices", icon: <DollarSign className="h-4 w-4" /> },
  { href: "/users", label: "Users", icon: <Users className="h-4 w-4" /> },
  { href: "/charts/provider", label: "Provider Charts", icon: <BarChart className="h-4 w-4" /> },
  { href: "/charts/product", label: "Product Charts", icon: <LineChart className="h-4 w-4" /> },
];

export function DashboardLayout({pageTitle, children }: { pageTitle: string, children: React.ReactNode }) {
  const currentPath = window.location.pathname; // Get the current path
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const user = usePage().props.auth.user;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const handleLogoutClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the dropdown from closing
    setIsDialogOpen(true); // Open the confirmation dialog
  };

  const handleConfirmLogout = () => {
    window.location.href = route('logout'); // Redirect to logout
  };

  console.log(isDialogOpen)


  return (
<NextUIProvider>
    <SidebarProvider>
      <AppSidebar />
      
      <SidebarInset>
    <main className={`p-4 w-auto ${isMobile ? 'mt-14' : ''}`}>
    
      {children}
      </main>
  </SidebarInset>
    </SidebarProvider>
    </NextUIProvider>
  )
    {/* <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className={`border-r bg-muted/40 transition-width duration-300 ${isCollapsed ? 'w-20' : ''} md:block`}>
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              {!isCollapsed && <span className="">Acme Inc</span>}
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8" onClick={toggleSidebar}>
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
          <div className="flex-1">
          
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            
              {links.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${currentPath.match(new RegExp(`^${link.href}`)) ? 'rounded-lg bg-muted' : ''}`}
                >
                  {link.icon}
                  {!isCollapsed && link.label}
                </Link>
              ))}
            </nav>
          </div>
          
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {links.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`${currentPath.match(new RegExp(`^${link.href}`)) ? 'flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary' : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'}`}
                  >
                    {link.icon}
                    {!isCollapsed && link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
             <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = route('profile.edit')}>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <ConfirmLogoutDialog 
              children={<DropdownMenuItem onClick={handleLogoutClick}>Logout</DropdownMenuItem>}
                open={isDialogOpen} 
                onConfirm={handleConfirmLogout} 
                onCancel={() => setIsDialogOpen(false)} 
              />
            </DropdownMenuContent>
           
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
          </div>
          
            {children}
         
        </main>
      </div>
    </div> */}
  
}
