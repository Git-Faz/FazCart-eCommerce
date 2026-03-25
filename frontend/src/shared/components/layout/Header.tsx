import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  //    NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu";
import { HomeIcon, MoonIcon, SunIcon, User2Icon } from "lucide-react";
import lightLogo from "@/assets/FazCartLight.svg";
import darkLogo from "@/assets/FazCartDark.svg";
import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { type JSX } from "react";
import { useTheme } from "@/app/theme/useTheme";
import { useAuth } from "@/features/auth/useAuth";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import SearchBar from "./SearchBar";

interface NavItem {
  label: string;
  href: string;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const listener = () => setIsDesktop(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isDesktop;
}

const Header = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  const { isLoggedIn } = useAuth();

  const isDesktop = useIsDesktop();

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

  const categories: NavItem[] = [
    {
      label: "Foods",
      href: "#",
    },
    {
      label: "Clothing",
      href: "#",
    },
    {
      label: "Softwares",
      href: "#",
    },
    {
      label: "Electronics",
      href: "#",
    },
    {
      label: "Kitchenware",
      href: "#",
    },
  ];

  return (
    <div className="header">
      <NavigationMenu
        viewport={!isDesktop}
        className="mx-auto h-fit w-full max-w-none [&>div]:w-full"
      >
        <NavigationMenuList
          id="navmenu"
          className="min-h-fit w-full px-2 py-2 sm:px-3 sm:py-2"
        >
          <div className="m-0 flex min-w-0 items-center justify-start p-0.5 text-sm font-light text-black sm:p-2 sm:text-xl">
            <img
              src={theme === "dark" ? lightLogo : darkLogo}
              alt="logo"
              className="size-8 sm:size-12 md:size-15"
            />
            <span
              className="my-auto h-fit leading-none dark:text-white"
              id="logo"
            >
              Faz<br className="hidden sm:block"></br>
              <span className="sm:hidden">Cart</span>
              <span className="hidden sm:inline">Cart</span>
            </span>
          </div>

          <SearchBar className="order-3 lg:w-full md:w-125 sm:w-62.5 basis-full sm:order-0 sm:basis-auto" />

          <div className="ml-auto flex w-fit items-center gap-0.5 align-middle sm:ml-0 sm:gap-1">
            <NavigationMenuItem className="flex flex-col items-center rounded-md p-0.5 hover:bg-background sm:p-1">
              <Link
                to={"/"}
                className="flex flex-row items-center justify-center gap-x-2 px-1 text-base font-semibold content-center sm:px-2 sm:text-lg"
              >
                <HomeIcon size={18} />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex flex-col items-center rounded-md p-0.5 hover:bg-background sm:p-1">
              <Link
                to={"/cart"}
                className="flex flex-row items-center justify-center gap-x-2 px-1 text-base font-semibold content-center sm:px-2 sm:text-lg"
              >
                <ShoppingCartIcon size={18} />
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="z-100 flex items-center gap-2 px-1.5 text-base dark:bg-gray-900 sm:px-2 sm:text-lg">
                <User2Icon size={18} />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-3 flex flex-col gap-2 dark:bg-gray-900 dark:border-none bg-[#ffffff]/90 min-w-fit">
                {navLinks.map((link) => (
                  <NavigationMenuLink
                    asChild
                    key={link.href}
                    className="dark:hover:bg-blue-950 hover:bg-amber-50 dark:hover:text-blue-300 min-w-fit flex-nowrap"
                  >
                    <Link to={link.href} className="font-semibold ">
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="h-8 px-2 text-sm sm:h-9 sm:px-3"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <SunIcon></SunIcon> : <MoonIcon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="m-2 p-2 z-70">
                {theme === "dark" ? (
                  <span>Light mode</span>
                ) : (
                  <span>Dark mode</span>
                )}
              </TooltipContent>
            </Tooltip>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      
      <NavigationMenu
        viewport={false}
        className="mx-auto w-full max-w-none bg-white/90 dark:bg-[#000614]/70 "
      >
        <NavigationMenuList className="flex w-full gap-x-5 px-2 py-1 overflow-x-auto scrollbar-hide sm:px-3 space-between">
          {categories.map((category) => (
            <NavigationMenuItem key={category.label}>
              <NavigationMenuLink
                asChild
                className="nav-item px-3 py-1.5 text-sm md:text-lg lg:text-lg font-semibold tracking-wider rounded-md whitespace-nowrap hover:bg-accent hover:text-accent-foreground transition"
              >
                <Link to={category.href}>{category.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export { Header };
