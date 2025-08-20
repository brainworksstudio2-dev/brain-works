"use client";

import { BookingForm } from "./booking-form";
import type { Metadata } from "next";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";

// This is a client component, so we can't export metadata directly.
// We'll set the title dynamically in the component.
// export const metadata: Metadata = {
//   title: "Book a Session - Brain Works",
//   description: "Schedule your photography or videography session with Brain Works.",
// };

export default function BookPage() {
  const { user, loading } = useAuth();

  // Set document title
  if (typeof window !== 'undefined') {
    document.title = "Book a Session - Brain Works";
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Book a Session</h1>
            <p className="text-lg text-muted-foreground mt-4">
              {user ? "Fill out the form below to start the booking process." : "Please sign in to book a session."}
            </p>
          </div>
          {loading ? (
             <div className="flex justify-center items-center h-40">
                <Loader className="animate-spin size-8 text-primary" />
             </div>
          ) : user ? (
            <BookingForm />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Authentication Required</CardTitle>
                <CardDescription>
                  You need to be logged in to access the booking form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/login">Go to Login Page</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
