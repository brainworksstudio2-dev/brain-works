
"use client";

import { LoginForm } from "./login-form";

export default function LoginPage() {
    // Set document title
    if (typeof window !== 'undefined') {
        document.title = "Sign In - Brain Works";
    }

    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary">
                            Sign In
                        </h1>
                        <p className="text-lg text-muted-foreground mt-4">
                            Sign in with Google to book a session, or use your administrator credentials.
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
