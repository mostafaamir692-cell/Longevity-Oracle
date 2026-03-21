import { pgTable, text, serial, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const serviceEnum = pgEnum("service_type", [
  "skin_aesthetics",
  "laser_advanced",
  "hair_antiaging",
  "ai_health_analysis",
  "consultation",
]);

export const statusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  message: text("message"),
  status: statusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
