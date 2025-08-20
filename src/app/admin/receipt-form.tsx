"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createReceipt } from "./actions";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  clientName: z.string().min(2, { message: "Client name must be at least 2 characters." }),
  amount: z.coerce.number().positive({ message: "Amount must be a positive number." }),
  paymentMethod: z.enum(["Cash", "Mobile Money", "Bank", "Other"], { required_error: "Please select a payment method." }),
  description: z.string().max(500, "Description cannot exceed 500 characters.").optional(),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Saving Receipt..." : "Generate Receipt"}
    </Button>
  );
}

export function ReceiptForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  
  const [state, formAction] = useFormState(createReceipt, {
    success: false,
    message: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      amount: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        variant: state.success ? "default" : "destructive",
        title: state.success ? "Success" : "Error",
        description: state.message,
      });
      if (state.success) {
        form.reset();
        // Potentially redirect or switch tab to history view
        // For now, we just show a success message.
      }
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form
        action={(formData) => {
          if (user) {
            formData.append("authorUid", user.uid);
            formAction(formData);
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "You must be logged in to create a receipt.",
            });
          }
        }}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Payment for wedding photography services..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
