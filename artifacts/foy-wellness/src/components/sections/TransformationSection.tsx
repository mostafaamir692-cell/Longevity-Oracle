import { FadeIn } from "../animations/FadeIn";

export function TransformationSection() {
  return (
    <section className="relative py-32 flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/transformation.png)` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/50 to-background" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
            What if you could reverse this… <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-primary italic">
              naturally and intelligently?
            </span>
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
            At FOY, we combine cutting-edge science with the wisdom of nature and AI-powered analysis to transform you from the inside out. This isn't just treatment; it's a complete biological upgrade.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
