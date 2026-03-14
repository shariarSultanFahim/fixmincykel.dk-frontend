"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";

import type { AuthRole } from "@/types/auth-role";
import type { MessageDictionary } from "@/types/messages";
import { AUTH_SESSION_COOKIE } from "@/constants/auth";

import logo from "@/assets/icons/logo.png";
import { cookie } from "@/lib/cookie-client";
import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { useLogout } from "@/hooks/use-logout";

import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const getAuthRoleFromSession = (): AuthRole | null => {
  const rawSession = cookie.get(AUTH_SESSION_COOKIE);

  if (!rawSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(rawSession) as { role?: string };
    const role = parsedSession.role;

    if (role === "admin" || role === "user" || role === "workshop") {
      return role;
    }

    return null;
  } catch {
    return null;
  }
};

const getDashboardPathByRole = (role: AuthRole) => {
  if (role === "user") {
    return "/user";
  }

  if (role === "workshop") {
    return "/workshop";
  }

  return "/admin";
};

export const Header = () => {
  const copy = messages as MessageDictionary;
  const [authRole, setAuthRole] = useState<AuthRole | null>(getAuthRoleFromSession);
  const isAuthenticated = authRole !== null;
  const dashboardPath = authRole ? getDashboardPathByRole(authRole) : "/login";
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    setAuthRole(null);
  };

  return (
    <header className="bg-transparent">
      <div className="container">
        <div className="flex items-center justify-between gap-6 py-6">
          <Link href="/" className="flex flex-col items-center gap-3">
            <Image src={logo} alt="FixMinCykel Logo" width={72} height={72} />
            <p className="hidden text-sm font-semibold text-navy md:block">
              {getMessage(copy, "Header.brand")}
            </p>
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-8 rounded-full border border-border px-8 py-3 text-sm text-navy md:flex"
          >
            <Link href="/how-it-works" className="hover:text-primary">
              {getMessage(copy, "Header.navHow")}
            </Link>
            <Link href="/explore" className="hover:text-primary">
              {getMessage(copy, "Header.navExplore")}
            </Link>
            {/* <Link href="/about-us" className="hover:text-primary">
              {getMessage(copy, "Header.navAbout")}
            </Link> */}
            <Link href="/contact-us" className="hover:text-primary">
              {getMessage(copy, "Header.navFaq")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center">
                <Button className="hidden px-6 md:flex" onClick={handleLogout}>
                  {getMessage(copy, "Header.logout")}
                </Button>
                <Link href={dashboardPath} className="hidden px-6 md:flex">
                  <Button variant="outline">Dashboard</Button>
                </Link>
              </div>
            ) : (
              <Button asChild className="hidden md:flex">
                <Link href="/login" className="px-6">
                  {getMessage(copy, "Header.login")}
                </Link>
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label={getMessage(copy, "Header.menuLabel")}
                >
                  <Menu className="size-5 text-navy" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="mt-8 flex flex-col gap-4 p-4">
                  <Button asChild className="w-full">
                    <Link href="/how-it-works" className="text-navy hover:text-primary">
                      {getMessage(copy, "Header.navHow")}
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/explore" className="text-navy hover:text-primary">
                      {getMessage(copy, "Header.navExplore")}
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/contact-us" className="text-navy hover:text-primary">
                      {getMessage(copy, "Header.navFaq")}
                    </Link>
                  </Button>
                  {isAuthenticated ? (
                    <>
                      <Button asChild className="w-full">
                        <Link href={dashboardPath} className="text-navy hover:text-primary">
                          Dashboard
                        </Link>
                      </Button>
                      <Button className="w-full" variant="outline" onClick={handleLogout}>
                        {getMessage(copy, "Header.logout")}
                      </Button>
                    </>
                  ) : (
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/login">{getMessage(copy, "Header.login")}</Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
