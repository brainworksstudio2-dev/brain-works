
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Brain Works",
  description: "Get in touch with Brain Works for your photography and videography needs.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Contact Us</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          We&apos;d love to hear from you. Reach out with any questions or to book your next session.
        </p>
      </div>

      <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-md">
          <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="size-5 text-primary" />
                <a href="mailto:brainworksstudio2@gmail.com" className="hover:underline">brainworksstudio2@gmail.com</a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="size-5 text-primary" />
                <div className="flex flex-col">
                    <a href="tel:0242403450" className="hover:underline">024 240 3450</a>
                    <a href="tel:0531125952" className="hover:underline">053 112 5952</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="size-5 text-primary mt-1" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Amasaman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  Amasaman
                </a>
              </div>
          </div>
      </div>
    </div>
  );
}
