import { useTheme } from "@/shared/stores/use-theme-store";

import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { Clapperboard, Moon, Sun, LogOut, Bookmark } from "lucide-react";

import { AuthForm } from "@/features/auth-form";
import { useSession } from "@/shared/model/auth";
import { ROUTES } from "@/shared/model/routes";
import { Link, useLocation } from "react-router-dom";

export function AppHeader() {
  const { setTheme } = useTheme();
  const { session, logout } = useSession();
  const { pathname } = useLocation();

  return (
    <header className="py-3 px-4 mb-6 bg-linear-to-r from-cyan-500 to-blue-500 sticky top-0 z-50 dark:from-blue-900 dark:to-cyan-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <Clapperboard className="text-white dark:text-gray-100" />
          <h1 className="scroll-m-20 text-center text-2xl tracking-tight text-balance text-white dark:text-gray-100">
            WhatToWatch
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-blue-200 hover:cursor-pointer"
              >
                <Sun className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-white" />
                <Moon className="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-white" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Светлая
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Тёмная
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                Системная
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {session ? (
            <div className="flex items-center gap-2">
              <Link to={ROUTES.FAVORITES}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-blue-200 hover:cursor-pointer ${
                    pathname === ROUTES.FAVORITES ? "bg-accent/50 " : ""
                  }`}
                >
                  <Bookmark className="size-6 scale-100 rotate-0 transition-all text-white" />
                </Button>
              </Link>
              <Button
                className="hover:bg-blue-200 hover:cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={logout}
              >
                <LogOut className="size-6 scale-100 rotate-0 transition-all text-white" />
              </Button>
            </div>
          ) : (
            <AuthForm />
          )}
        </div>
      </div>
    </header>
  );
}
