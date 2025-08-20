import { BookingForm } from "./booking-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Session - Brain Frame",
  description: "Schedule your photography or videography session with Brain Frame studio.",
};

export default function BookPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Book a Session</h1>
            <p className="text-lg text-muted-foreground mt-4">
              Fill out the form below to start the booking process. We'll get back to you shortly.
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
