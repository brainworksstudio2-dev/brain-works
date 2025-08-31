
"use server";

import { z } from "zod";
import { db } from "@/lib/firebase.server";
import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";

// INVOICE ACTIONS
const InvoiceItemSchema = z.object({
  description: z.string().min(1, "Item description is required."),
  quantity: z.coerce.number().positive("Quantity must be positive."),
  price: z.coerce.number().positive("Price must be positive."),
});

const InvoiceSchema = z.object({
  invoiceTo: z.string().min(2, "Client name is required."),
  clientEmail: z.string().email("Invalid email address."),
  paymentMethod: z.enum(["Cash", "Mobile Money", "Bank", "Other"]),
  status: z.enum(["Paid", "Pending", "Late"]),
  items: z.array(InvoiceItemSchema).min(1, "At least one item is required."),
  tax: z.coerce.number().min(0, "Tax cannot be negative.").optional().default(0),
  notes: z.string().optional(),
  authorUid: z.string(),
});

type InvoiceState = {
  success: boolean;
  message: string;
  invoiceId?: string;
};

// Function to get the last invoice number and increment it
async function getNextInvoiceNumber() {
    const counterRef = doc(db, "counters", "invoices");
    const counterSnap = await getDoc(counterRef);
  
    let nextNumber = 1;
    if (counterSnap.exists()) {
      nextNumber = counterSnap.data().lastNumber + 1;
    }
  
    return nextNumber;
}

export async function createInvoice(
  prevState: InvoiceState,
  formData: FormData
): Promise<InvoiceState> {
  const items = JSON.parse(formData.get("items") as string);
  
  const validatedFields = InvoiceSchema.safeParse({
    invoiceTo: formData.get("invoiceTo"),
    clientEmail: formData.get("clientEmail"),
    paymentMethod: formData.get("paymentMethod"),
    status: formData.get("status"),
    items: items,
    tax: formData.get("tax"),
    notes: formData.get("notes"),
    authorUid: formData.get("authorUid"),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Invalid form data. Please check your inputs.",
    };
  }
  
  try {
    const invoiceNumber = await getNextInvoiceNumber();
    const subtotal = validatedFields.data.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const taxAmount = subtotal * (validatedFields.data.tax / 100);
    const total = subtotal + taxAmount;

    const docRef = await addDoc(collection(db, "invoices"), {
      ...validatedFields.data,
      invoiceNumber: `INV-${String(invoiceNumber).padStart(4, '0')}`,
      date: serverTimestamp(),
      subtotal,
      taxAmount,
      total,
    });

    // This part should be a transaction in a real app to ensure atomicity
    const counterRef = doc(db, "counters", "invoices");
    await setDoc(counterRef, { lastNumber: invoiceNumber });

    return {
      success: true,
      message: "Invoice created successfully!",
      invoiceId: docRef.id,
    };
  } catch (error) {
    console.error("Error creating invoice:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      success: false,
      message: `Failed to create invoice: ${errorMessage}`,
    };
  }
}
