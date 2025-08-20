
"use client";

import { AdminRegisterForm } from "./admin-register-form";
import type { Metadata } from "next";

// This is a client component, so we can't export metadata directly.
// We'll set the title dynamically in the component.
// export const metadata: Metadata = {
//   title: "Admin Registration - Brain Works",
//   description: "Register a new admin account for Brain Works.",
// };

export default function AdminRegisterPage() {
  // Set document title
  if (typeof window !== 'undefined') {
    document.title = "Admin Registration - Brain Works";
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Admin Registration
            </h1>
            <p className="text-lg text-muted-foreground mt-4">
              Create a new administrator account.
            </p>
          </div>
          <AdminRegisterForm />
        </div>
      </div>
    </div>
  );
}
