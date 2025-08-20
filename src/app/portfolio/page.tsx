"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const portfolioData = {
  weddings: [
    { src: "https://placehold.co/600x800.png", alt: "Wedding couple smiling", dataAiHint: "wedding couple" },
    { src: "https://placehold.co/800x600.png", alt: "Wedding ceremony", dataAiHint: "wedding ceremony" },
    { src: "https://placehold.co/600x800.png", alt: "Bride posing", dataAiHint: "bride portrait" },
    { src: "https://placehold.co/800x600.png", alt: "Wedding reception dance", dataAiHint: "wedding reception" },
  ],
  events: [
    { src: "https://placehold.co/800x600.png", alt: "Corporate conference", dataAiHint: "corporate conference" },
    { src: "https://placehold.co/600x800.png", alt: "Speaker on stage", dataAiHint: "public speaker" },
    { src: "https://placehold.co/800x600.png", alt: "Networking at an event", dataAiHint: "business networking" },
    { src: "https://placehold.co/600x800.png", alt: "Birthday party celebration", dataAiHint: "birthday party" },
  ],
  portraits: [
    { src: "https://placehold.co/600x800.png", alt: "Professional headshot", dataAiHint: "professional headshot" },
    { src: "https://placehold.co/800x600.png", alt: "Family portrait outdoors", dataAiHint: "family portrait" },
    { src: "https://placehold.co/600x800.png", alt: "Creative artist portrait", dataAiHint: "artist portrait" },
    { src: "https://placehold.co/600x800.png", alt: "Child portrait", dataAiHint: "child portrait" },
  ],
  corporate: [
    { src: "https://placehold.co/800x600.png", alt: "Modern office space", dataAiHint: "modern office" },
    { src: "https://placehold.co/800x600.png", alt: "Team meeting in a boardroom", dataAiHint: "team meeting" },
    { src: "https://placehold.co/600x800.png", alt: "Executive portrait", dataAiHint: "ceo portrait" },
    { src: "https://placehold.co/800x600.png", alt: "Product photography setup", dataAiHint: "product photography" },
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
