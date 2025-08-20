import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Brain Works Studio",
  description: "Get in touch with Brain Works studio for your photography and videography needs.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Contact Us</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          We'd love to hear from you. Reach out with any questions or to book your next session.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this about?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message here..." className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full md:w-auto">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="size-5 text-primary" />
                <a href="mailto:contact@brainworksstudio.com" className="hover:underline">contact@brainworksstudio.com</a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="size-5 text-primary" />
                <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="size-5 text-primary mt-1" />
                <span>123 Photo Lane, Art City, 54321</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Follow Us</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-7 w-7" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-7 w-7" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Youtube className="h-7 w-7" /></Link>
            </CardContent>
          </Card>

          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
             <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Google Map Placeholder</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
