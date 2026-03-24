import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Menu,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Layers,
  PackageSearch,
  ClipboardList,
  Database,
} from "lucide-react";
import { TabsList, TabsTrigger } from "./tabs";
import { cn } from "@/lib/utils";



const Sidebar = () => {
    const navItems = [
    { value: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { value: "products", label: "Products", icon: Database },
    { value: "users", label: "Users", icon: Users },
    { value: "categories", label: "Categories", icon: Layers },
    { value: "product-details", label: "Product Details", icon: PackageSearch },
    { value: "orders", label: "Orders", icon: ClipboardList },
    ];

  return (
    <>
        <div className="w-70 min-h-screen hidden bg-[#0f172a]  p-5 lg:flex flex-col justify-between shadow-xl">
        
            <TabsList variant="line" className="w-full flex-col justify-center items-start bg-[#0f172a] border-b-0">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                    <TabsTrigger
                        key={item.value}
                        value={item.value}
                        
                        className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl text-gray-400",
                                    "aria-[selected=true]:bg-red-500",
                                    "aria-[selected=true]:text-[#fe9a00] text-xl",
                                    "aria-[selected=true]:border-l-4",
                                    "aria-[selected=true]:border-[#fe9a00]",
                                    "aria-[selected=true]:after:bg-[#fe9a00]",
                                    "hover:bg-[#fe9a00]/5 hover:text-[#fe9a00]",
                                    )}
                    >
                        <Icon style={{width:"30px ",height:"30px"}} className="text-inherit" />
                        <span className="text-inherit">{item.label}</span>
                    </TabsTrigger>
                    );
                })}
            </TabsList>

        

        </div>
        <div className=" flex justify-between items-center p-3 bg-white shadow-sm lg:hidden">

      {/* Menu Button */}
            <Sheet>
                <SheetTrigger>
                    <Menu className="w-6 h-6 text-[#0f172a]" />
                </SheetTrigger>

                <SheetContent side="left" className="w-64 p-5  bg-[#0f172a] text-white">
                <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

                <div className="flex flex-col gap-2">

                    <TabsList variant="line" className="w-full flex-col justify-center items-start">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <TabsTrigger
                                key={item.value}
                                value={item.value}
                                
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl text-gray-400",
                                    "aria-[selected=true]:bg-red-500",
                                    "aria-[selected=true]:text-[#fe9a00] text-xl",
                                    "aria-[selected=true]:border-l-4",
                                    "aria-[selected=true]:border-[#fe9a00]",
                                    "aria-[selected=true]:after:bg-[#fe9a00]",
                                    "hover:bg-[#fe9a00]/5 hover:text-[#fe9a00]",
                                    )}
                                >
                                <Icon style={{width:"30px ",height:"30px"}} className="text-inherit" />
                                {item.label}
                                </TabsTrigger>
                            );
                            })}
                    </TabsList>

                </div>
                </SheetContent>
            </Sheet>

      {/* Title */}
      <h2 className="font-semibold text-[#0f172a]">Admin</h2>
        </div>
        </>

  );
};

export default Sidebar;