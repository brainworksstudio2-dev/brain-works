
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, LogIn, Shield, User as UserIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
    if (user) {
      return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {isAdmin && (
                     <Link href="/admin">
                        <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Admin</span>
                        </DropdownMenuItem>
                     </Link>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Button asChild variant="ghost">
        <Link href="/login">
          <LogIn className="mr-2" /> Login
        </Link>
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
        <Link href="/login">
          <LogIn className="mr-2" /> Login
        </Link>
      </Button>
    );
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
        </nav>

        <div className="hidden md:flex flex-1 justify-end items-center gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/book-a-session">Book a Session</Link>
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
                  <Link href="/book-a-session">Book a Session</Link>
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
