
"use server";

import { z } from "zod";
import { db } from "@/lib/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Updated schema to expect a string date in 'yyyy-MM-dd' format
const BookingSchema = z.object({
  clientName: z.string().min(1, "Client name is required."),
  email: z.string().email("A valid email is required."),
  phoneNumber: z.string().min(1, "Phone number is required."),
  serviceType: z.string().min(1, "Service type is required."),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected YYYY-MM-DD."),
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
    eventDate: formData.get("eventDate"),
    message: formData.get("message") || undefined,
  });
  
  if (!validatedFields.success) {
    // Log the detailed error for debugging
    console.error("Booking validation failed:", validatedFields.error.flatten().fieldErrors);
    
    // Create a more user-friendly error message
    const errorMessages = Object.values(validatedFields.error.flatten().fieldErrors).flat().join(' ');
    
    return {
      success: false,
      message: `Invalid form data: ${errorMessages || 'Please check your inputs.'}`,
    };
  }

  try {
    // The data is already validated and in the correct format.
    // We can add the server timestamp and status here.
    await addDoc(collection(db, "bookings"), {
      ...validatedFields.data,
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
      message: "An unexpected error occurred while saving your booking. Please try again later.",
    };
  }
}
