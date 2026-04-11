import { useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { PremiumButton } from "../ui/PremiumButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBooking, useServices, bookingSchema, type BookingInput } from "@/hooks/use-bookings";
import { Shield, Award, Stethoscope, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const inputClass =
  "w-full bg-white border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm";

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
    <section id="booking" className="py-24 bg-aurora relative z-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
              Book a Consultation
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-5 leading-tight text-foreground text-glow-white">
              Begin Your Healthspan Journey
            </h2>
            <p className="text-muted-foreground text-lg font-light mb-10">
              Schedule a consultation with our medical team. We will assess your current health status and recommend the program best suited to your goals.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {badges.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/8 border border-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    {b.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground/60">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-muted/50 border border-border rounded-2xl space-y-3">
              <h4 className="font-semibold text-sm text-foreground/80">Location &amp; Contact</h4>
              <a
                href="https://maps.app.goo.gl/eNogzYsjbfpKWsnC7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors block"
              >
                30 El-Mohandes Mohammed Hasan Helmy<br />El Mohandseen, Cairo, Egypt
              </a>
              <a
                href="https://wa.me/201200022406"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:text-[#20bc5a] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp: 012 0002 2406
              </a>
              <p className="text-sm text-muted-foreground">clinic@foyclinic.com</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="left">
            <div className="bg-white border border-border rounded-2xl p-8 md:p-10 shadow-lg">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-foreground">Request Submitted</h3>
                  <p className="text-muted-foreground mb-8 font-light">Our medical concierge will contact you within 24 hours to confirm your appointment.</p>
                  <PremiumButton onClick={() => setSubmitted(false)} variant="outline">
                    Submit Another Request
                  </PremiumButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">Full Name</label>
                    <input {...register("fullName")} className={inputClass} placeholder="Your full name" />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">Email</label>
                      <input {...register("email")} type="email" className={inputClass} placeholder="your@email.com" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">Phone</label>
                      <input {...register("phone")} className={inputClass} placeholder="+20 100 000 0000" />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">Program of Interest</label>
                    <select {...register("serviceId")} className={inputClass + " appearance-none bg-white"}>
                      <option value="">Select a program...</option>
                      {isLoadingServices ? (
                        <option disabled>Loading...</option>
                      ) : (
                        services?.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))
                      )}
                    </select>
                    {errors.serviceId && <p className="text-red-400 text-xs mt-1">{errors.serviceId.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">Message (Optional)</label>
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

                  <p className="text-center text-[11px] text-muted-foreground/60">
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
