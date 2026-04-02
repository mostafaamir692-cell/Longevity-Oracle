import { useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { PremiumButton } from "../ui/PremiumButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBooking, useServices, bookingSchema, type BookingInput } from "@/hooks/use-bookings";
import { Shield, Award, Stethoscope, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const inputClass =
  "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm";

export function BookingSection() {
  const { data: services, isLoading: isLoadingServices } = useServices();
  const createBooking = useCreateBooking();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingInput) => {
    createBooking.mutate(data, {
      onSuccess: () => {
        setSubmitted(true);
        toast({
          title: "Request Received",
          description: "Our team will contact you within 24 hours to confirm your appointment.",
        });
      },
      onError: () => {
        toast({
          title: "Submission Error",
          description: "Something went wrong. Please try again or contact us directly.",
          variant: "destructive",
        });
      },
    });
  };

  const badges = [
    { icon: <Award className="w-4 h-4 text-primary" />, text: "Physician-Led Care" },
    { icon: <Stethoscope className="w-4 h-4 text-primary" />, text: "Personalized Protocols" },
    { icon: <Shield className="w-4 h-4 text-primary" />, text: "Evidence-Based Medicine" },
    { icon: <Lock className="w-4 h-4 text-primary" />, text: "Strict Confidentiality" },
  ];

  return (
    <section id="booking" className="py-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Editorial info */}
          <FadeIn>
            <span className="section-label">Book a Consultation</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-5">
              Begin Your<br />Healthspan Journey
            </h2>
            <div className="rule-accent mb-7" />
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
              Schedule a consultation with our medical team. We will assess your current health status and recommend the program best suited to your goals.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {badges.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    {b.icon}
                  </div>
                  <span className="text-sm text-muted-foreground font-light">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-border bg-muted/40">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Location</p>
              <p className="text-sm text-foreground font-medium">FOY Longevity &amp; Regenerative Medicine Center</p>
              <p className="text-sm text-muted-foreground font-light">New Cairo Medical District, Cairo, Egypt</p>
              <div className="rule my-4 opacity-50" />
              <p className="text-sm text-primary font-medium">+20 100 000 0000</p>
              <p className="text-sm text-muted-foreground font-light">clinic@foyclinic.com</p>
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn delay={0.2}>
            <div className="card-elevated p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">Request Submitted</h3>
                  <p className="text-muted-foreground mb-8 font-light text-sm leading-relaxed">
                    Our medical concierge will contact you within 24 hours to confirm your appointment.
                  </p>
                  <PremiumButton onClick={() => setSubmitted(false)} variant="outline">
                    Submit Another Request
                  </PremiumButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Full Name</label>
                    <input {...register("fullName")} className={inputClass} placeholder="Your full name" />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Email</label>
                      <input {...register("email")} type="email" className={inputClass} placeholder="your@email.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Phone</label>
                      <input {...register("phone")} className={inputClass} placeholder="+20 100 000 0000" />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Program of Interest</label>
                    <select {...register("serviceId")} className={inputClass + " appearance-none"}>
                      <option value="">Select a program...</option>
                      {isLoadingServices ? (
                        <option disabled>Loading...</option>
                      ) : (
                        services?.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))
                      )}
                    </select>
                    {errors.serviceId && <p className="text-red-500 text-xs mt-1">{errors.serviceId.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Message (Optional)</label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      className={inputClass + " resize-none"}
                      placeholder="Share your health goals or concerns..."
                    />
                  </div>
                  <PremiumButton type="submit" className="w-full" size="lg" isLoading={createBooking.isPending}>
                    Submit Consultation Request
                  </PremiumButton>
                  <p className="text-center text-[11px] text-muted-foreground font-light">
                    All information is handled with strict medical confidentiality.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
