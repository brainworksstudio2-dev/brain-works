
"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateBookingLinkAction } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ClipboardCopy } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  clientName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  serviceType: z.string({ required_error: "Please select a service type." }),
  eventDate: z.date({ required_error: "Please select a date for the event." }),
  message: z.string().max(500, "Message cannot exceed 500 characters.").optional(),
  isReturningClient: z.boolean().default(false).optional(),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating Link..." : "Generate Booking Link"}
    </Button>
  );
}

export function GenerateLinkForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(generateBookingLinkAction, {
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
      isReturningClient: false,
    },
  });
  
  useEffect(() => {
    if (state.message && !state.success) {
        toast({
            title: "Error",
            description: state.message,
            variant: "destructive"
        })
    }
  }, [state, toast])


  if (state.success && state.link) {
    return (
      <Card>
        <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-medium text-center">Booking Link Generated!</h3>
            <p className="text-sm text-muted-foreground text-center">{state.confirmationMessage}</p>
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
            <Button onClick={() => form.reset()} variant="outline" className="w-full">
                Generate Another Link
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form
        action={(formData) => {
            const values = form.getValues();
            // Manually append checkbox value
            formData.append('isReturningClient', values.isReturningClient ? 'true' : 'false');
            // Manually append date value
            if (values.eventDate) {
                formData.append('eventDate', values.eventDate.toISOString());
            }
            formAction(formData);
        }}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client's Full Name</FormLabel>
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
              <FormLabel>Client's Email</FormLabel>
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
              <FormLabel>Client's Phone Number</FormLabel>
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
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Message (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special requests or details..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
            control={form.control}
            name="isReturningClient"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                    <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel>
                    Is this a returning client?
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                        Check this box to automatically confirm the booking for this client.
                    </p>
                </div>
                </FormItem>
            )}
        />

        {state.message && !state.success && (
            <p className="text-sm font-medium text-destructive">{state.message}</p>
        )}
        
        <SubmitButton />
      </form>
    </Form>
  );
}
