
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, LogIn, Shield } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { user, signOut, loading, isAdmin } = useAuth();

  const AuthButton = () => {
    if (loading) {
      return <Button variant="ghost" size="icon" disabled className="w-24 justify-start"></Button>;
    }
    if (user && isAdmin) {
      return (
        <Button onClick={signOut} variant="ghost">
          <LogOut className="mr-2" /> Logout
        </Button>
      );
    }
    return null;
  };
  
  const AuthButtonMobile = () => {
    if (loading) {
        return <Button variant="ghost" size="lg" disabled className="w-full"></Button>;
    }
    if (user && isAdmin) {
      return (
        <Button onClick={signOut} size="lg" className="w-full">
          <LogOut className="mr-2" /> Logout
        </Button>
      );
    }
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex-1 md:flex-none">
            <Link href="/">
                <Logo />
            </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "text-base font-medium transition-colors hover:text-primary flex items-center gap-1",
                pathname === "/admin" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Shield className="size-4" /> Admin
            </Link>
          )}
        </nav>

        <div className="hidden md:flex flex-1 justify-end items-center gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/book">Book a Session</Link>
          </Button>
          <AuthButton />
        </div>

        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/">
                  <Logo />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                   {isAdmin && (
                    <Link
                      href="/admin"
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary flex items-center gap-1",
                        pathname === "/admin" ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                     <Shield className="size-5" /> Admin
                    </Link>
                  )}
                </nav>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/book">Book a Session</Link>
                </Button>
                <AuthButtonMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
