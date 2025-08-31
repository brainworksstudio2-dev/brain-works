
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us - Brain Works",
  description: "Get in touch with Brain Works for your photography and videography needs.",
};

const contactInfo = [
    {
        icon: <Mail className="size-8 text-primary" />,
        title: "Email Us",
        content: "brainworksstudio2@gmail.com",
        href: "mailto:brainworksstudio2@gmail.com",
    },
    {
        icon: <Phone className="size-8 text-primary" />,
        title: "Call Us",
        content: "024 240 3450 / 053 112 5952",
        href: "tel:0242403450",
    },
    {
        icon: <MapPin className="size-8 text-primary" />,
        title: "Find Us",
        content: "Amasaman, Ghana",
        href: "https://www.google.com/maps/search/?api=1&query=Amasaman",
    },
];

export default function ContactPage() {
  return (
    <div className="bg-background">
        <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-primary">Get In Touch</h1>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                    We&apos;d love to hear from you. Reach out with any questions or to start planning your next project.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    {contactInfo.map((item) => (
                         <a 
                            key={item.title}
                            href={item.href} 
                            target={item.href.startsWith('https') ? '_blank' : undefined}
                            rel={item.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                            className="flex items-center p-6 bg-card rounded-lg shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                        >
                            <div className="p-3 bg-primary/10 rounded-full mr-6 group-hover:bg-primary transition-colors">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-muted-foreground">{item.content}</p>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="relative h-96 md:h-full w-full rounded-lg overflow-hidden shadow-lg">
                     <Image
                        src="https://picsum.photos/seed/contact/800/1000"
                        alt="Contact us"
                        data-ai-hint="camera equipment"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            </div>
        </section>
    </div>
  );
}
