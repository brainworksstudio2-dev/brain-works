"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptForm } from "./receipt-form";

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
              <h1 className="text-4xl md:text-5xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-lg text-muted-foreground mt-4">
                  Welcome, Admin. Manage your receipts here.
              </p>
          </div>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="create">Create Receipt</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>New Receipt</CardTitle>
                  <CardDescription>Fill out the form below to generate a new receipt.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReceiptForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Receipt History</CardTitle>
                  <CardDescription>View and manage all past receipts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Receipt history will be displayed here in the next step.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
}
