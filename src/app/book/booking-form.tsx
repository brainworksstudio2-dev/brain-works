
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBookingLink } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ClipboardCopy } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  clientName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  serviceType: z.string({ required_error: "Please select a service type." }),
  eventDate: z.date({ required_error: "Please select a date for the event." }),
  message: z.string().max(500, "Message cannot exceed 500 characters.").optional(),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating Link..." : "Generate Booking Link"}
    </Button>
  );
}

export function BookingForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(createBookingLink, {
    success: false,
    message: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  if (state.success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Link Generated!</CardTitle>
          <CardDescription>A confirmation has been sent to your email. Here is your unique link to view your booking details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input value={state.link} readOnly />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(state.link ?? "");
                toast({ title: "Copied to clipboard!" });
              }}
            >
              <ClipboardCopy className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => window.location.reload()} className="w-full">
            Create Another Booking
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="555-123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Wedding Photography">Wedding Photography</SelectItem>
                      <SelectItem value="Event Videography">Event Videography</SelectItem>
                      <SelectItem value="Portrait Session">Portrait Session</SelectItem>
                      <SelectItem value="Corporate Shoot">Corporate Shoot</SelectItem>
                      <SelectItem value="Special Event">Special Event</SelectItem>
                      <SelectItem value="Studio Shoot">Studio Shoot</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                  {field.value && <input type="hidden" name="eventDate" value={field.value.toISOString()} />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any special requests or details..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
