import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const values = [
    "Academic excellence with holistic development",
    "Dedicated and experienced teaching faculty",
    "Modern facilities and learning environment",
    "Strong cultural values and discipline",
    "Specialized streams in Hotel Management & Computer Science",
    "Active student support and counseling",
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">About Our School</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Established with a vision to provide quality education in Bharatpur, Nepal
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-medium">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Students in classroom"
                className="w-full h-[400px] object-cover transition-smooth hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10"></div>
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-medium">
                <p className="text-primary font-bold text-lg">Est. 1995</p>
                <p className="text-muted-foreground text-sm">Bharatpur, Chitwan</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-lg text-foreground leading-relaxed">
                At Gramodaya English School, we are committed to fostering academic excellence,
                character development, and cultural values. Our dedicated faculty and modern
                facilities create an environment where students thrive academically and personally.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our History</h3>
              <p className="text-lg text-foreground leading-relaxed">
                Founded to serve the educational needs of Bharatpur and surrounding communities,
                our school has grown from a small institution to a comprehensive educational
                center offering programs from Nursery through Grade 12, including specialized
                streams in Hotel Management and Computer Science.
              </p>
            </div>

            {/* Values checklist */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Why Choose Us</h3>
              <ul className="space-y-2">
                {values.map((v, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-school-light-blue px-6 py-3 rounded-full">
                <span className="text-primary font-semibold">1500+ Students</span>
              </div>
              <div className="bg-secondary/10 px-6 py-3 rounded-full">
                <span className="text-secondary font-semibold">50+ Teachers</span>
              </div>
              <div className="bg-accent/10 px-6 py-3 rounded-full">
                <span className="text-accent font-semibold">25+ Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
