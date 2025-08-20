import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login - Brain Works",
  description: "Login to your Brain Works account.",
};

export default function LoginPage() {
  return (
    <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">Login</h1>
                    <p className="text-lg text-muted-foreground mt-4">
                        Sign in to book and manage your sessions.
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    </div>
  );
}
