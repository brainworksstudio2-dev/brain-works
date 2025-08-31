
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.4 512 244 512S0 403.3 0 261.8S106.6 11.8 244 11.8S488 120.3 488 261.8zM97.2 261.8c0 83.4 67.2 150.9 149.9 150.9S397 345.2 397 261.8s-67.2-150.9-149.9-150.9S97.2 178.4 97.2 261.8zM259.9 161.8h-22.3v30.4h-30.4v22.3h30.4v30.4h22.3v-30.4h30.4v-22.3h-30.4v-30.4z"></path></svg>
                        )}
                        Sign up with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}
