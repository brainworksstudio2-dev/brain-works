import Image from "next/image";
import type { Metadata } from "next";
import { Users, Camera, Heart } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - Brain Works Studio",
    description: "Learn more about the team and passion behind Brain Works Studio.",
};

const teamMembers = [
    {
        name: "Jane Doe",
        role: "Lead Photographer",
        image: "https://placehold.co/400x400.png",
        dataAiHint: "female photographer",
        bio: "With over a decade of experience, Jane has a keen eye for capturing the decisive moment, turning fleeting expressions into timeless art.",
    },
    {
        name: "John Smith",
        role: "Lead Videographer",
        image: "https://placehold.co/400x400.png",
        dataAiHint: "male videographer",
        bio: "John is a master storyteller, weaving narratives through compelling cinematography that brings every event to life.",
    },
];

export default function AboutPage() {
    return (
        <div className="bg-background">
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">About Brain Works Studio</h1>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        We are a collective of passionate photographers and videographers dedicated to capturing life's most precious moments with creativity and heart.
                    </p>
                </div>

                <div className="relative mb-16">
                    <Image src="https://placehold.co/1200x600.png" alt="Brain Works Studio team working" data-ai-hint="photography team" width={1200} height={600} className="w-full h-auto rounded-lg shadow-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-12 text-center mb-16">
                    <div>
                        <Users className="mx-auto h-12 w-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold">Our Philosophy</h3>
                        <p className="text-muted-foreground mt-2">To build genuine connections with our clients, understanding their vision and translating it into beautiful, authentic imagery.</p>
                    </div>
                    <div>
                        <Camera className="mx-auto h-12 w-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold">Our Craft</h3>
                        <p className="text-muted-foreground mt-2">We blend technical expertise with artistic intuition, using state-of-the-art equipment to ensure every shot is perfect.</p>
                    </div>
                    <div>
                        <Heart className="mx-auto h-12 w-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold">Our Promise</h3>
                        <p className="text-muted-foreground mt-2">A seamless, enjoyable experience and a final product that you and your loved ones will cherish for generations.</p>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Meet the Team</h2>
                    <p className="text-muted-foreground mt-2">The creative minds behind the lens.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col sm:flex-row items-center gap-6">
                            <Image src={member.image} alt={member.name} data-ai-hint={member.dataAiHint} width={150} height={150} className="rounded-full shadow-md" />
                            <div className="text-center sm:text-left">
                                <h4 className="text-xl font-bold">{member.name}</h4>
                                <p className="text-primary font-semibold mb-2">{member.role}</p>
                                <p className="text-muted-foreground">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
