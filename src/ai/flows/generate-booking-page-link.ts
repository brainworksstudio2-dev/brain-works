'use server';
/**
 * @fileOverview Generates a unique shareable booking page link using AI.
 *
 * - generateBookingPageLink - A function that handles the generation of the booking page link.
 * - GenerateBookingPageLinkInput - The input type for the generateBookingPageLink function.
 * - GenerateBookingPageLinkOutput - The return type for the generateBookingPageLink function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBookingPageLinkInputSchema = z.object({
  clientName: z.string().describe('The name of the client.'),
  email: z.string().email().describe('The email address of the client.'),
  phoneNumber: z.string().describe('The phone number of the client.'),
  serviceType: z.string().describe('The type of service booked (e.g., wedding, portrait).'),
  eventDate: z.string().describe('The date of the event.'),
  message: z.string().optional().describe('Any additional message from the client.'),
  isReturningClient: z.boolean().default(false).describe('Whether the client is a returning client.'),
});
export type GenerateBookingPageLinkInput = z.infer<typeof GenerateBookingPageLinkInputSchema>;

const GenerateBookingPageLinkOutputSchema = z.object({
  bookingPageLink: z.string().url().describe('The unique, shareable booking page link.'),
  confirmationMessage: z.string().describe('A message indicating whether the booking is automatically confirmed.'),
});
export type GenerateBookingPageLinkOutput = z.infer<typeof GenerateBookingPageLinkOutputSchema>;

export async function generateBookingPageLink(input: GenerateBookingPageLinkInput): Promise<GenerateBookingPageLinkOutput> {
  return generateBookingPageLinkFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBookingPageLinkPrompt',
  input: {schema: GenerateBookingPageLinkInputSchema},
  output: {schema: GenerateBookingPageLinkOutputSchema},
  prompt: `You are a booking link generator for Brain Works Studio.

  Based on the client information provided, generate a unique, shareable booking page link.
  If the client is a returning client (isReturningClient is true), the booking should be automatically confirmed, and the confirmation message should reflect this.
  Otherwise, the booking should require confirmation via the generated link.

  Client Name: {{{clientName}}}
  Email: {{{email}}}
  Phone Number: {{{phoneNumber}}}
  Service Type: {{{serviceType}}}
  Event Date: {{{eventDate}}}
  Message: {{{message}}}
  Is Returning Client: {{{isReturningClient}}}

  Consider this example:

  Client Name: John Doe
  Email: john.doe@example.com
  Phone Number: 555-123-4567
  Service Type: Wedding Photography
  Event Date: 2024-07-20
  Message: Looking forward to capturing our special day!
  Is Returning Client: false

  bookingPageLink: https://brainworksstudio.com/bookings/john-doe-wedding-20240720-unconfirmed
  confirmationMessage: Booking requires confirmation via the generated link.

  Client Name: Jane Smith
  Email: jane.smith@example.com
  Phone Number: 555-987-6543
  Service Type: Portrait Session
  Event Date: 2024-06-15
  Message: null
  Is Returning Client: true

  bookingPageLink: https://brainworksstudio.com/bookings/jane-smith-portrait-20240615-confirmed
  confirmationMessage: Booking automatically confirmed for returning client.

  The base URL for all booking links is https://brainworksstudio.com/bookings/.
  Include the client's name, service type, and event date in the generated link, along with a status of 'confirmed' or 'unconfirmed'.
  The confirmation message must be succinct.
  `, 
});

const generateBookingPageLinkFlow = ai.defineFlow(
  {
    name: 'generateBookingPageLinkFlow',
    inputSchema: GenerateBookingPageLinkInputSchema,
    outputSchema: GenerateBookingPageLinkOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
