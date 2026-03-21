import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { bookingsTable, insertBookingSchema } from "@workspace/db/schema";

const router: IRouter = Router();

const SERVICES = [
  {
    id: "skin_aesthetics",
    name: "Skin & Aesthetic Treatments",
    description: "HydraFacial, PRP, Filler, Laser skin rejuvenation",
  },
  {
    id: "laser_advanced",
    name: "Laser & Advanced Procedures",
    description: "CO2 laser, IPL, Radio frequency skin tightening",
  },
  {
    id: "hair_antiaging",
    name: "Hair & Anti-Aging Solutions",
    description: "PRP hair restoration, exosome therapy, stem cell treatments",
  },
  {
    id: "ai_health_analysis",
    name: "AI Health Analysis",
    description: "Full biomarker blood panel, AI health score, personalized protocol",
  },
  {
    id: "consultation",
    name: "General Consultation",
    description: "Initial assessment and wellness planning session",
  },
];

router.get("/bookings/services", (_req, res) => {
  res.json({ services: SERVICES });
});

router.post("/bookings", async (req, res) => {
  const parsed = insertBookingSchema.safeParse(req.body);

  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => i.message);
    res.status(400).json({ error: "Invalid input", details });
    return;
  }

  try {
    const [booking] = await db
      .insert(bookingsTable)
      .values(parsed.data)
      .returning();

    res.status(201).json(booking);
  } catch (err) {
    req.log.error({ err }, "Failed to create booking");
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;
