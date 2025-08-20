import { Instagram, Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/">
                <Logo />
            </Link>
            <p className="text-sm mt-2 text-muted-foreground">© {new Date().getFullYear()} Brain Works. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="https://www.instagram.com/p/CnAIjSioYo1/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://web.facebook.com/reel/5655771921212545" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://www.youtube.com/@brainworks_studio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
