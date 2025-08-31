
"use server";

import { z } from "zod";
import { generateBookingPageLink } from "@/ai/flows/generate-booking-page-link";
import { format } from 'date-fns';

const FormSchema = z.object({
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
  link?: string;
  confirmationMessage?: string;
};

export async function createBookingLink(
  prevState: State,
  formData: FormData
): Promise<State> {
  const isReturningClient = formData.get("isReturningClient") === "true";

  const validatedFields = FormSchema.safeParse({
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
  
  const { eventDate, ...rest } = validatedFields.data;

  const aiPayload = {
    ...rest,
    eventDate: format(eventDate, 'yyyy-MM-dd'),
    isReturningClient, // This will be false, but let's keep the AI happy
  };

  try {
    const result = await generateBookingPageLink(aiPayload);
    
    if (result.bookingPageLink) {
        return {
            success: true,
            message: "Booking link generated successfully!",
            link: result.bookingPageLink,
            confirmationMessage: result.confirmationMessage,
        };
    } else {
        return { success: false, message: "AI failed to generate a link." };
    }

  } catch (error) {
    console.error("Error generating booking link:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
