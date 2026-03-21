import { useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { PremiumButton } from "../ui/PremiumButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBooking, useServices, bookingSchema, type BookingInput } from "@/hooks/use-bookings";
import { Shield, Award, Stethoscope, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
          description: "Our concierge will contact you shortly to confirm your booking.",
        });
      },
      onError: () => {
        toast({
          title: "Submission Error",
          description: "Something went wrong. Please try again or call us directly.",
          variant: "destructive"
        });
      }
    });
  };

  const badges = [
    { icon: <Award className="w-5 h-5 text-gold" />, text: "Certified Experts" },
    { icon: <Stethoscope className="w-5 h-5 text-gold" />, text: "Personalized Care" },
    { icon: <Shield className="w-5 h-5 text-gold" />, text: "Proven Results" },
    { icon: <Lock className="w-5 h-5 text-gold" />, text: "100% Confidential" },
  ];

  return (
    <section id="booking" className="py-24 bg-card relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Begin Your Transformation</h2>
            <p className="text-foreground/70 text-lg mb-10">
              Schedule your comprehensive consultation today. Let our experts craft a personalized longevity and aesthetics protocol just for you.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              {badges.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">{b.icon}</div>
                  <span className="font-medium text-sm">{b.text}</span>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
              <h4 className="font-bold mb-2">Location</h4>
              <p className="text-sm text-foreground/70">FOY Longevity & Wellness Clinic<br/>Downtown Dubai, UAE</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="left">
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Request Sent</h3>
                  <p className="text-foreground/70 mb-8">Our medical concierge will contact you within 24 hours to confirm your appointment time.</p>
                  <PremiumButton onClick={() => setSubmitted(false)} variant="outline">
                    Book Another Service
                  </PremiumButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Full Name</label>
                    <input 
                      {...register("fullName")}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white placeholder:text-white/20"
                      placeholder="Jane Doe"
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">Email Address</label>
                      <input 
                        {...register("email")}
                        type="email"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white placeholder:text-white/20"
                        placeholder="jane@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">Phone Number</label>
                      <input 
                        {...register("phone")}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white placeholder:text-white/20"
                        placeholder="+971 50 000 0000"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Service of Interest</label>
                    <select 
                      {...register("serviceId")}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white appearance-none"
                    >
                      <option value="" disabled className="bg-background">Select a service...</option>
                      {isLoadingServices ? (
                        <option disabled>Loading services...</option>
                      ) : (
                        services?.map(s => (
                          <option key={s.id} value={s.id} className="bg-background text-white">{s.name}</option>
                        ))
                      )}
                    </select>
                    {errors.serviceId && <p className="text-red-400 text-xs mt-1">{errors.serviceId.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Message (Optional)</label>
                    <textarea 
                      {...register("message")}
                      rows={3}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white placeholder:text-white/20 resize-none"
                      placeholder="Tell us about your specific goals..."
                    />
                  </div>

                  <PremiumButton 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    isLoading={createBooking.isPending}
                  >
                    Submit Booking Request
                  </PremiumButton>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
