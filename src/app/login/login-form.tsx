
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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

// Helper component for the Google icon
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.9-4.32 1.9-3.26 0-5.9-2.6-5.9-5.9s2.64-5.9 5.9-5.9c1.65 0 2.99.6 3.91 1.5l2.5-2.5C18.16 3.8 15.6 2.4 12.48 2.4c-5.17 0-9.4 4.1-9.4 9.3s4.23 9.3 9.4 9.3c2.83 0 5.17-1 6.8-2.6s2.5-3.9 2.5-6.8c0-.6-.05-1.2-.15-1.7z" />
    </svg>
);


export function LoginForm() {
    const { signInWithGoogle, signInWithEmail, loading } = useAuth();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        signInWithEmail(data.email, data.password);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Choose your preferred sign-in method.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? <Loader className="animate-spin" /> : null}
                            Sign in with Email
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
                        <Loader className="animate-spin" />
                    ) : (
                        <GoogleIcon className="mr-2 h-4 w-4" />
                    )}
                    Sign in with Google
                </Button>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <Link href="/client-register" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
