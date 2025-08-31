
"use server";

import { z } from "zod";
import { format } from 'date-fns';
import { db } from "@/lib/firebase.server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const BookingSchema = z.object({
  clientName: z.string().min(1, "Client name is required."),
  email: z.string().email(),
  phoneNumber: z.string().min(1, "Phone number is required."),
  serviceType: z.string().min(1, "Service type is required."),
  eventDate: z.date(),
  message: z.string().optional(),
});

type State = {
  success: boolean;
  message: string;
};

export async function createBooking(
  prevState: State,
  formData: FormData
): Promise<State> {

  const validatedFields = BookingSchema.safeParse({
    clientName: formData.get("clientName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    serviceType: formData.get("serviceType"),
    eventDate: new Date(formData.get("eventDate") as string),
    message: formData.get("message") || undefined,
  });
  
  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Invalid form data. Please check your inputs.",
    };
  }

  try {
    await addDoc(collection(db, "bookings"), {
      ...validatedFields.data,
      eventDate: format(validatedFields.data.eventDate, 'yyyy-MM-dd'),
      createdAt: serverTimestamp(),
      status: 'Pending', // Default status for new client bookings
    });
    
    return {
        success: true,
        message: "Your booking request has been submitted successfully! We will get back to you shortly.",
    };

  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
