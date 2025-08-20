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
      return <Button variant="ghost" size="icon" disabled className="md:w-24 justify-start"></Button>;
    }
    if (user) {
      return (
        <Button onClick={signOut} variant="ghost">
          <LogOut className="mr-2" /> Logout
        </Button>
      );
    }
    return (
      <Button asChild variant="ghost">
        <Link href="/login"><LogIn className="mr-2" /> Login</Link>
      </Button>
    );
  };
  
  const AuthButtonMobile = () => {
    if (loading) {
        return <Button variant="ghost" size="lg" disabled className="w-full"></Button>;
    }
    if (user) {
      return (
        <Button onClick={signOut} size="lg" className="w-full">
          <LogOut className="mr-2" /> Logout
        </Button>
      );
    }
    return (
      <Button asChild size="lg" className="w-full">
        <Link href="/login"><LogIn className="mr-2" /> Login</Link>
      </Button>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
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
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/admin" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span className="flex items-center gap-1"><Shield className="size-4" /> Admin</span>
            </Link>
          )}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/book">Book a Session</Link>
          </Button>
          <AuthButton />
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
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
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === "/admin" ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                     <span className="flex items-center gap-1"><Shield className="size-5" /> Admin</span>
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
