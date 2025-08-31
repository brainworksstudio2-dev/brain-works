
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper component for the Google icon
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.9-4.32 1.9-3.26 0-5.9-2.6-5.9-5.9s2.64-5.9 5.9-5.9c1.65 0 2.99.6 3.91 1.5l2.5-2.5C18.16 3.8 15.6 2.4 12.48 2.4c-5.17 0-9.4 4.1-9.4 9.3s4.23 9.3 9.4 9.3c2.83 0 5.17-1 6.8-2.6s2.5-3.9 2.5-6.8c0-.6-.05-1.2-.15-1.7z" />
    </svg>
);


export default function ClientRegisterPage() {
    const { signInWithGoogle, loading } = useAuth();
    // Set document title
    if (typeof window !== 'undefined') {
        document.title = "Client Registration - Brain Works";
    }

    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto text-center">
                     <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary">
                            Client Registration
                        </h1>
                        <p className="text-lg text-muted-foreground mt-4">
                            Create your client account by signing up with Google. It's fast and easy!
                        </p>
                    </div>

                    <Button 
                        onClick={signInWithGoogle} 
                        disabled={loading}
                        size="lg"
                        className="w-full max-w-xs mx-auto"
                    >
                        {loading ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <GoogleIcon className="mr-2 h-4 w-4" />
                        )}
                        Sign up with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}
