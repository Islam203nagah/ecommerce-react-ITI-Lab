import { Link } from "react-router-dom"
import { useContext } from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon , Moon02Icon } from "@hugeicons/core-free-icons/index";
import { Logout03Icon} from "@hugeicons/core-free-icons/index";

import { ShoppingCart } from "lucide-react"
import { useAuthStore, useThemeStore } from '@/store/useThemeStore';
import { LanguageContext } from "@/context/LanguageContext";
import { Button } from "@base-ui/react"
function Navbar() {
  const {lang, setLang} = useContext(LanguageContext);
  const theme = useThemeStore((state) => ( state.theme));
  const toggleTheme = useThemeStore((state) => (state.toggleTheme));
  const logout = useAuthStore((state) => (state.logout));
  return (
    <nav className="w-full border-b bg-background" style={theme === "light" ? { backgroundColor: "#fff", color: "#000" } : { backgroundColor: "#333", color: "#fff" }}>
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          MyStore
        </Link>

        {/* Menu */}
        <NavigationMenu>
          <NavigationMenuList>

            <NavigationMenuItem>
  <NavigationMenuLink asChild>
    <Link to="/" className="text-2xl font-medium transition-colors hover:text-primary">
      {lang === "en" ? "Products" : "المنتجات"}
    </Link>
  </NavigationMenuLink>
</NavigationMenuItem>

<NavigationMenuItem>
  <NavigationMenuLink asChild>
    <Link to="/cart" className="text-xl font-medium transition-colors hover:text-primary">
      {lang === "en" ? "Cart" : "السلة"}
    </Link>
  </NavigationMenuLink>
</NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Cart Icon */}
        <Link to="/cart">
          <ShoppingCart className="cursor-pointer text-2xl" />
        </Link>
        <Button
  onClick={() => setLang(lang === "en" ? "ar" : "en")}
  className="ml-4 cursor-pointer"
>
  {lang==="en" ? "EN" : "عربى"}
</Button>
         <span onClick={toggleTheme} className="cursor-pointer">
        {theme === "light" ?<HugeiconsIcon icon={Sun03Icon} /> : <HugeiconsIcon icon={Moon02Icon} />}
      </span>
      <span onClick={() => {
        logout();
        localStorage.removeItem("token");
      }} className="cursor-pointer"><HugeiconsIcon icon={Logout03Icon} /></span>


      </div>
    </nav>
  )
}

export default Navbar