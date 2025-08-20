"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { Button } from "@/components/ui/button";

// export const metadata: Metadata = {
//   title: "Login - Brain Works",
//   description: "Login to your Brain Works account.",
// };

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);

    // Set document title
    if (typeof window !== 'undefined') {
        document.title = isRegistering ? "Register - Brain Works" : "Login - Brain Works";
    }

    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary">
                            {isRegistering ? "Create Account" : "Welcome Back"}
                        </h1>
                        <p className="text-lg text-muted-foreground mt-4">
                            {isRegistering ? "Sign up to book and manage your sessions." : "Sign in to book and manage your sessions."}
                        </p>
                    </div>
                    {isRegistering ? <RegisterForm /> : <LoginForm />}
                    <div className="mt-4 text-center">
                        <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                            {isRegistering
                                ? "Already have an account? Login"
                                : "Don't have an account? Register"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
