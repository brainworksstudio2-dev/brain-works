
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const portfolioData = {
  weddings: [
    { src: "https://picsum.photos/seed/w1/600/800", alt: "Wedding couple smiling", dataAiHint: "wedding couple" },
    { src: "https://picsum.photos/seed/w2/800/600", alt: "Wedding ceremony", dataAiHint: "wedding ceremony" },
    { src: "https://picsum.photos/seed/w3/600/800", alt: "Bride posing", dataAiHint: "bride portrait" },
    { src: "https://picsum.photos/seed/w4/800/600", alt: "Wedding reception dance", dataAiHint: "wedding reception" },
  ],
  events: [
    { src: "https://picsum.photos/seed/e1/800/600", alt: "Corporate conference", dataAiHint: "corporate conference" },
    { src: "https://picsum.photos/seed/e2/600/800", alt: "Speaker on stage", dataAiHint: "public speaker" },
    { src: "https://picsum.photos/seed/e3/800/600", alt: "Networking at an event", dataAiHint: "business networking" },
    { src: "https://picsum.photos/seed/e4/600/800", alt: "Birthday party celebration", dataAiHint: "birthday party" },
  ],
  portraits: [
    { src: "https://picsum.photos/seed/po1/600/800", alt: "Professional headshot", dataAiHint: "professional headshot" },
    { src: "https://picsum.photos/seed/po2/800/600", alt: "Family portrait outdoors", dataAiHint: "family portrait" },
    { src: "https://picsum.photos/seed/po3/600/800", alt: "Creative artist portrait", dataAiHint: "artist portrait" },
    { src: "https://picsum.photos/seed/po4/600/800", alt: "Child portrait", dataAiHint: "child portrait" },
  ],
  corporate: [
    { src: "https://picsum.photos/seed/c1/800/600", alt: "Modern office space", dataAiHint: "modern office" },
    { src: "https://picsum.photos/seed/c2/800/600", alt: "Team meeting in a boardroom", dataAiHint: "team meeting" },
    { src: "https://picsum.photos/seed/c3/600/800", alt: "Executive portrait", dataAiHint: "ceo portrait" },
    { src: "https://picsum.photos/seed/c4/800/600", alt: "Product photography setup", dataAiHint: "product photography" },
  ],
};

type ImageType = { src: string; alt: string; dataAiHint: string };

export default function PortfolioPage() {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const openLightbox = (image: ImageType) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  const renderGallery = (images: ImageType[]) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <Card key={index} className="overflow-hidden cursor-pointer group" onClick={() => openLightbox(image)}>
          <CardContent className="p-0">
            <Image
              src={image.src}
              alt={image.alt}
              data-ai-hint={image.dataAiHint}
              width={800}
              height={600}
              className="w-full h-full object-cover aspect-w-1 aspect-h-1 transform transition-transform duration-300 group-hover:scale-105"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Our Portfolio</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A collection of our finest work, showcasing our dedication to quality and creativity.
          </p>
        </div>
        <Tabs defaultValue="weddings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="weddings">Weddings</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="portraits">Portraits</TabsTrigger>
            <TabsTrigger value="corporate">Corporate</TabsTrigger>
          </TabsList>
          <TabsContent value="weddings">{renderGallery(portfolioData.weddings)}</TabsContent>
          <TabsContent value="events">{renderGallery(portfolioData.events)}</TabsContent>
          <TabsContent value="portraits">{renderGallery(portfolioData.portraits)}</TabsContent>
          <TabsContent value="corporate">{renderGallery(portfolioData.corporate)}</TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
          {selectedImage && (
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              data-ai-hint={selectedImage.dataAiHint}
              width={1600}
              height={1200}
              className="w-full h-auto object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
