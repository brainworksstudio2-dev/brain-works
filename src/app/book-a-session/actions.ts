
"use server";

import { z } from "zod";
import { db } from "@/lib/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Resend } from 'resend';

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
  bookingCode?: string;
};

// Function to generate a random alphanumeric code
function generateBookingCode(): string {
    const prefix = 'BW-';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return prefix + result;
}

export async function createBooking(
  prevState: State,
  formData: FormData
): Promise<State> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const validatedFields = BookingSchema.safeParse({
    clientName: formData.get("clientName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    serviceType: formData.get("serviceType"),
    eventDate: formData.get("eventDate"),
    message: formData.get("message") || undefined,
  });
  
  if (!validatedFields.success) {
    console.error("Booking validation failed:", validatedFields.error.flatten().fieldErrors);
    const errorMessages = Object.values(validatedFields.error.flatten().fieldErrors).flat().join(' ');
    
    return {
      success: false,
      message: `Invalid form data: ${errorMessages || 'Please check your inputs.'}`,
    };
  }

  try {
    const bookingCode = generateBookingCode();
    await addDoc(collection(db, "bookings"), {
      ...validatedFields.data,
      bookingCode,
      createdAt: serverTimestamp(),
      status: 'Pending', // Default status for new client bookings
    });

    // Send confirmation email
    await resend.emails.send({
      from: 'noreply@brainworks.dev',
      to: validatedFields.data.email,
      subject: 'Your Booking is Confirmed!',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Hello ${validatedFields.data.clientName},</p>
        <p>Thank you for booking with Brain Works. Your session for <strong>${validatedFields.data.serviceType}</strong> on <strong>${validatedFields.data.eventDate}</strong> has been successfully submitted.</p>
        <p>Your unique booking code is: <strong>${bookingCode}</strong></p>
        <p>We will contact you shortly to finalize the details.</p>
        <p>Best regards,<br/>The Brain Works Team</p>
      `,
    });
    
    return {
        success: true,
        message: "Your booking request has been submitted successfully! A confirmation email has been sent.",
        bookingCode: bookingCode,
    };

  } catch (error) {
    console.error("Error creating booking or sending email:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
