import { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger }
  from "@/shared/components/ui/navigation-menu";
import { HomeIcon, MoonIcon, SunIcon, User2Icon, MenuIcon, } from "lucide-react";
import lightLogo from "@/assets/svg/FazCartLight.svg";
import darkLogo from "@/assets/svg/FazCartDark.svg";
import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { type JSX } from "react";
import { useTheme } from "@/app/theme/useTheme";
import { useAuth } from "@/features/auth/useAuth";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";
import useIsDesktop from "@/app/hooks";

interface NavItem {
  label: string;
  href: string;
}

const Header = (): JSX.Element => {
  
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn } = useAuth();
  const isDesktop = useIsDesktop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavItem[] = [
    {
      label: isLoggedIn ? "My account" : "Log In",
      href: isLoggedIn ? "/account" : "/auth",
    },
    {
      label: "Orders",
      href: "/orders",
    },
    {
      label: "Wishlist",
      href: "#",
    },
  ];

  const p: string = "/products?category=";
  const categories: NavItem[] = [
    {
      label: "Foods",
      href: `${p}food`,
    },
    {
      label: "Clothing",
      href: `${p}clothing`,
    },
    {
      label: "Softwares",
      href: "#",
    },
    {
      label: "Electronics",
      href: `${p}electronics`,
    },
    {
      label: "Kitchenware",
      href: "#",
    },
  ];

  return (
    <div className="header">
        <NavigationMenu viewport={!isDesktop} className="mx-auto h-fit w-full max-w-none [&>div]:w-full">
          <NavigationMenuList id="navmenu" className="w-full px-2 py-2">
            {/* MOBILE LAYOUT */}
            <div className="flex flex-col gap-2 md:hidden w-full">
              <div className="flex items-center mx-auto">
                <img
                  src={theme === "dark" ? lightLogo : darkLogo}
                  className="size-12"
                />
                <span className="ml-1 text-sm dark:text-white font-[shock]">FazCart</span>
              </div>
          
              <SearchBar className="w-full" />
          
              <div className="flex items-center justify-between">
                {/* Hamburger */}
                <div className="relative">
                  <button onClick={() => setIsMenuOpen((p) => !p)}>
                    <MenuIcon size={24} />
                  </button>
          
                  {isMenuOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-[#000614] shadow rounded-md">
                      {categories.map((c) => (
                        <Link
                          key={c.label}
                          to={c.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
          
                {/* Icons */}
              <div className="flex items-center gap-2 min-w-fit ">
                  <Link to="/"  className="py-2 px-3" ><HomeIcon size={20}/></Link>
                  <Link to="/cart" className="py-2 px-3" ><ShoppingCartIcon size={20} /></Link>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <User2Icon size={20} />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-3 flex flex-col gap-2">
                      {navLinks.map((link) => (
                        <NavigationMenuLink asChild key={link.href}>
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
          
                  <Button variant="ghost" onClick={toggleTheme}>
                    {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                  </Button>
                </div>
              </div>
            </div>
          
            {/* DESKTOP LAYOUT */}
            <div className="hidden md:flex items-center w-full justify-between gap-4">
              {/* Left: Logo */}
              <div className="flex items-center">
                <img
                  src={theme === "dark" ? lightLogo : darkLogo}
                  className="size-10"
                />
                <span className="ml-2 text-lg dark:text-white font-[shock]">FazCart</span>
              </div>
          
              {/* Center: Search */}
              <div className="flex-1 max-w-3xl">
                <SearchBar className="w-full" />
              </div>
          
              {/* Right: Icons */}
              <div className="flex items-center gap-3">
                <Link to="/" className="py-2 px-3"><HomeIcon size={20} /></Link>
                <Link to="/cart" className="py-2 px-3"><ShoppingCartIcon size={20} /></Link>
          
                <NavigationMenuItem >
                  <NavigationMenuTrigger>
                    <User2Icon size={20} />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-3 flex flex-col gap-2 z-50 bg-[#000614]">
                    {navLinks.map((link) => (
                      <NavigationMenuLink asChild key={link.href}>
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
          
              <Button variant="ghost" onClick={toggleTheme} className="px-0">
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                </Button>
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>

      {isDesktop && (
        <NavigationMenu viewport={false} className="mx-auto w-full max-w-none bg-white/90 dark:bg-[#000614]/70 ">
          <NavigationMenuList className="flex w-full gap-x-5 px-2 py-1 overflow-x-auto scrollbar-hide sm:px-3 space-between">
            {categories.map((category) => (
              <NavigationMenuItem key={category.label}>
                <NavigationMenuLink
                  asChild className="nav-item px-3 py-1.5 text-sm md:text-lg lg:text-lg font-semibold tracking-wider 
                  rounded-md whitespace-nowrap hover:bg-accent hover:text-accent-foreground transition">
                  <Link to={category.href}>{category.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  );
};

export { Header };
