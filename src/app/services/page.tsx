import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Video, Users, Building, PartyPopper, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - Brain Works Studio",
  description: "Explore the photography and videography services offered by Brain Works studio.",
};

const services = [
  {
    icon: <Camera className="size-10 text-primary" />,
    title: "Wedding Photography",
    description: "Capturing the magic of your special day with timeless photos you'll cherish forever.",
    image: { src: "https://placehold.co/600x400.png", alt: "Wedding photography example", dataAiHint: "bride groom" },
  },
  {
    icon: <Video className="size-10 text-primary" />,
    title: "Event Videography",
    description: "From corporate events to personal celebrations, we create cinematic videos that tell your story.",
    image: { src: "https://placehold.co/600x400.png", alt: "Event videography example", dataAiHint: "event videography" },
  },
  {
    icon: <Users className="size-10 text-primary" />,
    title: "Portrait Sessions",
    description: "Professional headshots, family portraits, or creative solo sessions to capture your essence.",
    image: { src: "https://placehold.co/600x400.png", alt: "Portrait session example", dataAiHint: "portrait photography" },
  },
  {
    icon: <Building className="size-10 text-primary" />,
    title: "Corporate Shoots",
    description: "High-quality visuals for your brand, including product photography, office lifestyle, and team photos.",
    image: { src: "https://placehold.co/600x400.png", alt: "Corporate shoot example", dataAiHint: "corporate office" },
  },
  {
    icon: <PartyPopper className="size-10 text-primary" />,
    title: "Special Events",
    description: "Concerts, parties, and other special occasions documented with energy and creativity.",
    image: { src: "https://placehold.co/600x400.png", alt: "Special event example", dataAiHint: "concert party" },
  },
  {
    icon: <ImageIcon className="size-10 text-primary" />,
    title: "Studio Shoots",
    description: "Controlled environment for perfect product shots, fashion photography, and more.",
    image: { src: "https://placehold.co/600x400.png", alt: "Studio shoot example", dataAiHint: "photo studio" },
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Our Services</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            We provide a wide range of professional photography and videography services. Explore our offerings below.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 p-6">
                {service.icon}
                <div className="flex-1">
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-0 mt-auto">
                 <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    data-ai-hint={service.image.dataAiHint}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
