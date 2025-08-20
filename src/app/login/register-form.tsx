"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  telephone: z.string().min(10, { message: "Please enter a valid phone number." }),
  location: z.string().min(2, { message: "Location is required." }),
});

export function RegisterForm() {
    const { signInWithGoogle, createUserWithEmail, loading } = useAuth();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            telephone: "",
            location: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        createUserWithEmail(data.email, data.password, data.username, data.telephone, data.location);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create your account to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="your_username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="your.email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="telephone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telephone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="024 123 4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Accra, Ghana" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Register with Email
                        </Button>
                    </form>
                </Form>
                
                <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-2 text-sm text-muted-foreground">OR</span>
                </div>

                <Button 
                    onClick={signInWithGoogle} 
                    disabled={loading}
                    variant="outline"
                    className="w-full"
                >
                    {loading ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.4 512 244 512S0 403.3 0 261.8S106.6 11.8 244 11.8S488 120.3 488 261.8zM97.2 261.8c0 83.4 67.2 150.9 149.9 150.9S397 345.2 397 261.8s-67.2-150.9-149.9-150.9S97.2 178.4 97.2 261.8zM259.9 161.8h-22.3v30.4h-30.4v22.3h30.4v30.4h22.3v-30.4h30.4v-22.3h-30.4v-30.4z"></path></svg>
                    )}
                    Continue with Google
                </Button>
            </CardContent>
        </Card>
    )
}
