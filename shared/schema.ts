import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertPreBookingSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  platforms: z.array(z.string()).optional(),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & { id: number };
export type InsertPreBooking = z.infer<typeof insertPreBookingSchema>;
export type PreBooking = InsertPreBooking & { id: number; createdAt: Date };
