
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Camera, Clapperboard, PartyPopper, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const heroImages = [
  { src: "https://picsum.photos/seed/h1/1920/1080", alt: "Stunning wedding photograph", dataAiHint: "wedding photography" },
  { src: "https://picsum.photos/seed/h2/1920/1080", alt: "Dynamic event photography", dataAiHint: "event photography" },
  { src: "https://picsum.photos/seed/h3/1920/1080", alt: "Professional corporate headshot", dataAiHint: "corporate portrait" },
];

const services = [
  {
    icon: <Camera className="size-8 text-primary" />,
    title: "Photography",
    description: "Capturing moments with artistry and precision. From portraits to landscapes, we bring your vision to life.",
  },
  {
    icon: <Clapperboard className="size-8 text-primary" />,
    title: "Videography",
    description: "Telling your story through cinematic videography. We create compelling visual narratives for any occasion.",
  },
  {
    icon: <PartyPopper className="size-8 text-primary" />,
    title: "Events",
    description: "From corporate functions to personal celebrations, we document your events with a creative and professional touch.",
  },
  {
    icon: <Users className="size-8 text-primary" />,
    title: "Portraits",
    description: "Individual, family, or corporate portraits that capture personality and professionalism.",
  },
];

const portfolioImages = [
    { src: "https://picsum.photos/seed/p1/600/400", alt: "Wedding photo", category: "Weddings", dataAiHint: "wedding couple" },
    { src: "https://picsum.photos/seed/p2/600/400", alt: "Event photo", category: "Events", dataAiHint: "conference event" },
    { src: "https://picsum.photos/seed/p3/600/400", alt: "Portrait photo", category: "Portraits", dataAiHint: "professional headshot" },
    { src: "https://picsum.photos/seed/p4/600/400", alt: "Corporate photo", category: "Corporate", dataAiHint: "office meeting" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.dataAiHint}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-accent">Brain Works</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">Capturing Life's Moments, One Frame at a Time.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/book-a-session">Book a Session</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="text-muted-foreground mt-2">Professional photography and videography tailored for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-12 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
                <p className="text-muted-foreground mt-2">A glimpse into our passion and craft.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {portfolioImages.map((img, index) => (
                    <Link href="/portfolio" key={index} className="group overflow-hidden rounded-lg">
                        <Image
                            src={img.src}
                            alt={img.alt}
                            data-ai-hint={img.dataAiHint}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover aspect-w-3 aspect-h-2 transform transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>
                ))}
            </div>
            <div className="text-center mt-12">
                <Button asChild variant="link" className="text-primary text-lg">
                    <Link href="/portfolio">
                        Explore Full Portfolio <ArrowRight className="ml-2 size-5" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
