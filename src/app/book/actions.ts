"use server";

import { z } from "zod";
import { generateBookingPageLink } from "@/ai/flows/generate-booking-page-link";
import { format } from 'date-fns';

const FormSchema = z.object({
  clientName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  serviceType: z.string(),
  eventDate: z.date(),
  message: z.string().optional(),
  isReturningClient: z.boolean(),
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
  const validatedFields = FormSchema.safeParse({
    clientName: formData.get("clientName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    serviceType: formData.get("serviceType"),
    eventDate: new Date(formData.get("eventDate") as string),
    message: formData.get("message") || undefined,
    isReturningClient: formData.get("isReturningClient") === "true",
  });
  
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data. Please check your inputs.",
    };
  }
  
  const { eventDate, ...rest } = validatedFields.data;

  const aiPayload = {
    ...rest,
    eventDate: format(eventDate, 'yyyy-MM-dd'),
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
