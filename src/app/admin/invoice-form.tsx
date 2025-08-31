
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createInvoice } from "./actions";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trash2, PlusCircle, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  invoiceTo: z.string().min(2, "Client name is required."),
  clientEmail: z.string().email("Invalid email address."),
  paymentMethod: z.enum(["Cash", "Mobile Money", "Bank", "Other"], { required_error: "Please select a payment method." }),
  status: z.enum(["Paid", "Pending", "Late"], { required_error: "Please select a status."}),
  items: z.array(
    z.object({
      description: z.string().min(1, "Description is required."),
      quantity: z.coerce.number().positive("Qty must be > 0."),
      price: z.coerce.number().positive("Price must be > 0."),
    })
  ).min(1, "At least one item is required."),
  tax: z.coerce.number().min(0, "Tax cannot be negative.").optional().default(0),
  notes: z.string().max(500, "Notes cannot exceed 500 characters.").optional(),
});

type FormValues = z.infer<typeof formSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Saving Invoice..." : "Generate Invoice"}
    </Button>
  );
}

export function InvoiceForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  
  const [state, formAction] = useActionState(createInvoice, {
    success: false,
    message: "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceTo: "",
      clientEmail: "",
      paymentMethod: "Bank",
      status: "Pending",
      items: [{ description: "", quantity: 1, price: 0 }],
      tax: 5,
      notes: "Late charge for 10 days",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchedItems = useWatch({
    control: form.control,
    name: "items",
  });

  const watchedTax = useWatch({
    control: form.control,
    name: "tax"
  });

  const subtotal = watchedItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const taxAmount = subtotal * ((watchedTax || 0) / 100);
  const total = subtotal + taxAmount;

  useEffect(() => {
    if (state.message) {
      toast({
        variant: state.success ? "default" : "destructive",
        title: state.success ? "Success" : "Error",
        description: state.message,
      });
      if (state.success && state.invoiceId) {
        form.reset();
        router.push(`/invoice/${state.invoiceId}`);
      }
    }
  }, [state, toast, form, router]);

  return (
    <Form {...form}>
      <form
        action={(formData) => {
          if (user) {
            formData.append("authorUid", user.uid);
            // Append items as a JSON string
            formData.append('items', JSON.stringify(form.getValues('items')));
            formAction(formData);
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "You must be logged in to create an invoice.",
            });
          }
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="invoiceTo"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Invoice To</FormLabel>
                <FormControl>
                    <Input placeholder="Client's Full Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Client Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="client@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Invoice Items</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-6">
                     <FormField
                        control={form.control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                            <FormItem>
                                {index === 0 && <FormLabel>Description</FormLabel>}
                                <FormControl>
                                    <Input placeholder="e.g., Logo Design" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                  </div>
                  <div className="col-span-2">
                     <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                            <FormItem>
                               {index === 0 && <FormLabel>Qty</FormLabel>}
                                <FormControl>
                                    <Input type="number" placeholder="1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                  </div>
                   <div className="col-span-3">
                     <FormField
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                            <FormItem>
                                {index === 0 && <FormLabel>Price</FormLabel>}
                                <FormControl>
                                    <Input type="number" placeholder="90.00" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                  </div>
                  <div className="col-span-1 flex items-end h-full">
                     {index > 0 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="size-4 text-destructive" />
                        </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ description: "", quantity: 1, price: 0 })}
            >
              <PlusCircle className="mr-2 size-4" /> Add Item
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                name="status"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Late">Late</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
          control={form.control}
          name="tax"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax (%)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Card>
            <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax ({watchedTax || 0}%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                </div>
                <Separator />
                 <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </CardContent>
        </Card>


        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terms & Conditions</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Late charge for 10 days" {...field} />
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

