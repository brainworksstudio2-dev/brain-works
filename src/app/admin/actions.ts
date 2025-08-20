"use server";

import { z } from "zod";
import { db } from "@/lib/firebase.server"; // Using server-side initialized instance
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

const ReceiptSchema = z.object({
  clientName: z.string().min(2, "Client name is required."),
  amount: z.coerce.number().positive("Amount must be a positive number."),
  paymentMethod: z.enum(["Cash", "Mobile Money", "Bank", "Other"]),
  description: z.string().optional(),
  authorUid: z.string(),
});

type State = {
  success: boolean;
  message: string;
  receiptId?: string;
};

// Function to get the last receipt number and increment it
async function getNextReceiptNumber() {
    const counterRef = doc(db, "counters", "receipts");
    const counterSnap = await getDoc(counterRef);
  
    let nextNumber = 1;
    if (counterSnap.exists()) {
      nextNumber = counterSnap.data().lastNumber + 1;
    }
  
    return nextNumber;
}


export async function createReceipt(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = ReceiptSchema.safeParse({
    clientName: formData.get("clientName"),
    amount: formData.get("amount"),
    paymentMethod: formData.get("paymentMethod"),
    description: formData.get("description"),
    authorUid: formData.get("authorUid"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data. Please check your inputs.",
    };
  }
  
  try {
    const receiptNumber = await getNextReceiptNumber();
    
    const docRef = await addDoc(collection(db, "receipts"), {
      ...validatedFields.data,
      receiptNumber: `BW-${String(receiptNumber).padStart(4, '0')}`,
      date: serverTimestamp(),
    });

    // This part is a transaction in a real app to ensure atomicity
    // For now, we just update the counter after successfully creating a receipt
    const { setDoc } = await import("firebase/firestore");
    const counterRef = doc(db, "counters", "receipts");
    await setDoc(counterRef, { lastNumber: receiptNumber });

    return {
      success: true,
      message: "Receipt created successfully!",
      receiptId: docRef.id,
    };
  } catch (error) {
    console.error("Error creating receipt:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      success: false,
      message: `Failed to create receipt: ${errorMessage}`,
    };
  }
}
