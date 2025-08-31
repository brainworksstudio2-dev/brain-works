
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Camera, Clapperboard, PartyPopper, Users, ArrowRight, Video, ImageIcon, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const heroImages = [
  { src: "https://picsum.photos/seed/h1/1920/1080", alt: "Stunning wedding photograph", dataAiHint: "wedding photography" },
  { src: "https://picsum.photos/seed/h2/1920/1080", alt: "Dynamic event photography", dataAiHint: "event photography" },
  { src: "https://picsum.photos/seed/h3/1920/1080", alt: "Professional corporate headshot", dataAiHint: "corporate portrait" },
];

const services = [
  {
    icon: <Camera className="size-10 text-primary" />,
    title: "Wedding Photography",
    description: "Capturing the magic of your special day with timeless photos you'll cherish forever.",
  },
  {
    icon: <Video className="size-10 text-primary" />,
    title: "Event Videography",
    description: "From corporate events to personal celebrations, we create cinematic videos that tell your story.",
  },
  {
    icon: <Users className="size-10 text-primary" />,
    title: "Portrait Sessions",
    description: "Professional headshots, family portraits, or creative solo sessions to capture your essence.",
  },
  {
    icon: <Building className="size-10 text-primary" />,
    title: "Corporate Shoots",
    description: "High-quality visuals for your brand, including product photography and team photos.",
  },
];

const portfolioImages = [
    { src: "https://picsum.photos/seed/p1/600/400", alt: "Wedding photo", category: "Weddings", dataAiHint: "wedding couple" },
    { src: "https://picsum.photos/seed/p2/600/400", alt: "Event photo", category: "Events", dataAiHint: "conference event" },
    { src: "https://picsum.photos/seed/p3/600/400", alt: "Portrait photo", category: "Portraits", dataAiHint: "professional headshot" },
    { src: "https://picsum.photos/seed/p4/600/400", alt: "Corporate photo", category: "Corporate", dataAiHint: "office meeting" },
    { src: "https://picsum.photos/seed/p5/600/400", alt: "Special Event photo", category: "Special Events", dataAiHint: "concert party" },
    { src: "https://picsum.photos/seed/p6/600/400", alt: "Studio Shoot photo", category: "Studio", dataAiHint: "photo studio" },
];

export default function Home() {
    const autoplay = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <section className="relative w-full h-[70vh] md:h-screen text-white">
        <Carousel className="w-full h-full" opts={{ loop: true }} plugins={[autoplay.current]}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.dataAiHint}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
            Brain Works studio
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-3xl text-gray-200 drop-shadow-md">
            Capturing Life's Fleeting Moments with Timeless Elegance.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/book-a-session">Book a Session</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-black/20 border-white text-white backdrop-blur-sm hover:bg-white hover:text-black shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">We offer a comprehensive range of photography and videography services tailored to your unique needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-card text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border-transparent">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    {service.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
                <p className="text-muted-foreground mt-2">A glimpse into our passion and craft.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolioImages.map((img, index) => (
                    <Link href="/portfolio" key={index} className="group block overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
                        <Image
                            src={img.src}
                            alt={img.alt}
                            data-ai-hint={img.dataAiHint}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>
                ))}
            </div>
            <div className="text-center mt-12">
                <Button asChild variant="default" size="lg" className="text-lg">
                    <Link href="/portfolio">
                        Explore Full Portfolio <ArrowRight className="ml-2 size-5" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>
      
      <section id="cta" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Capture Your Moment?</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Let's discuss your project and how we can bring your vision to life. Book a free consultation today.</p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
                <Link href="/contact">Get in Touch</Link>
            </Button>
        </div>
      </section>

    </div>
  );
}

    