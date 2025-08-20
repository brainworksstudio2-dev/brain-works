
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

      <div className="max-w-md mx-auto">
          <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="size-5 text-primary" />
                <a href="mailto:contact@brainworks.com" className="hover:underline">contact@brainworks.com</a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="size-5 text-primary" />
                <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="size-5 text-primary mt-1" />
                <span>123 Photo Lane, Art City, 54321</span>
              </div>
          </div>
      </div>
    </div>
  );
}
