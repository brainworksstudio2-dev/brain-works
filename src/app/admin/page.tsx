
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceForm } from "./invoice-form";
import { Logo } from "@/components/logo";
import { GenerateLinkForm } from "./generate-link-form";

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and not an admin, redirect to home
    if (!loading && !isAdmin) {
      router.replace("/");
    }
  }, [user, isAdmin, loading, router]);

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
              <TabsTrigger value="generate-link">Generate Booking Link</TabsTrigger>
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
                  <CardTitle>Generate Booking Link</CardTitle>
                  <CardDescription>Fill out the form to generate a unique booking link for a client.</CardDescription>
                </CardHeader>
                <CardContent>
                  <GenerateLinkForm />
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
