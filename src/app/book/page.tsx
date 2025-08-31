
"use client";

import { BookingForm } from "./booking-form";

export default function BookPage() {
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
              Fill out the form below to start the booking process. We'll send a confirmation to your email.
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
