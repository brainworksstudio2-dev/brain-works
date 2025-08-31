
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader, ClipboardCopy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceForm } from "./invoice-form";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [bookingLink, setBookingLink] = useState("");

  useEffect(() => {
    // If not loading and not an admin, redirect to home
    if (!loading && !isAdmin) {
      router.replace("/");
    }
  }, [user, isAdmin, loading, router]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBookingLink(`${window.location.origin}/book`);
    }
  }, [])

  // Set document title
  if (typeof window !== 'undefined') {
    document.title = "Admin Dashboard - Brain Works";
  }

  if (loading || !isAdmin) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
       <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Logo />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-lg text-muted-foreground mt-4">
                  Welcome, Admin. Manage your invoices and bookings here.
              </p>
          </div>
          <Tabs defaultValue="create-invoice" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="create-invoice">Create Invoice</TabsTrigger>
              <TabsTrigger value="generate-link">Booking Link</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="create-invoice">
              <Card>
                <CardHeader>
                  <CardTitle>New Invoice</CardTitle>
                  <CardDescription>Fill out the form below to generate a new invoice.</CardDescription>
                </CardHeader>
                <CardContent>
                  <InvoiceForm />
                </CardContent>
              </Card>
            </TabsContent>
             <TabsContent value="generate-link">
              <Card>
                <CardHeader>
                  <CardTitle>Share Booking Link</CardTitle>
                  <CardDescription>Share this link with clients to allow them to book a session.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <Input value={bookingLink} readOnly />
                        <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                            navigator.clipboard.writeText(bookingLink);
                            toast({ title: "Copied to clipboard!" });
                        }}
                        >
                        <ClipboardCopy className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>View and manage all past invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Invoice history will be displayed here in a future step.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
}
