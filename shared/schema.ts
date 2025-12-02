import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const preBookings = pgTable("prebookings", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company"),
  platforms: text("platforms").array(),
  termsAccepted: boolean("terms_accepted").notNull().default(false),
  variant: text("variant").notNull().default("A"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const abTestResults = pgTable("ab_test_results", {
  id: serial("id").primaryKey(),
  variant: text("variant").notNull(),
  views: integer("views").notNull().default(0),
  conversions: integer("conversions").notNull().default(0),
  date: text("date").notNull(), // YYYY-MM-DD format
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPreBookingSchema = createInsertSchema(preBookings).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
  variant: z.string().default("A"),
});

export const insertAbTestResultSchema = createInsertSchema(abTestResults).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PreBooking = typeof preBookings.$inferSelect;
export type InsertPreBooking = z.infer<typeof insertPreBookingSchema>;
export type AbTestResult = typeof abTestResults.$inferSelect;
export type InsertAbTestResult = z.infer<typeof insertAbTestResultSchema>;
