import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";

// Schemas for internal typing (would ideally come from @shared/schema)
export const bookingSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  serviceId: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export type Service = {
  id: string;
  name: string;
  category: string;
};

// Mock GET /api/bookings/services
export function useServices() {
  return useQuery({
    queryKey: ["/api/bookings/services"],
    queryFn: async (): Promise<Service[]> => {
      try {
        const res = await fetch("/api/bookings/services");
        if (res.ok) {
          const json = await res.json();
          return json.services ?? json;
        }
      } catch (e) {
        console.log("Fallback to mock services");
      }
      
      return [
        { id: "skin_aesthetics", name: "Skin & Aesthetic Treatments", category: "Aesthetics" },
        { id: "laser_advanced", name: "Laser & Advanced Procedures", category: "Laser" },
        { id: "hair_antiaging", name: "Hair & Anti-Aging Solutions", category: "Hair" },
        { id: "ai_health_analysis", name: "AI Health Analysis", category: "Diagnostic" },
        { id: "consultation", name: "General Consultation", category: "Consultation" },
      ];
    },
  });
}

// POST /api/bookings
export function useCreateBooking() {
  return useMutation({
    mutationFn: async (data: BookingInput) => {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        service: data.serviceId,
        message: data.message,
      };
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error ?? "Request failed");
      }
      return await res.json();
    },
  });
}
