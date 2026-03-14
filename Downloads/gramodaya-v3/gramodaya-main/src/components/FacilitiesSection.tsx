import { Book, Monitor, FlaskConical, Home, Trophy } from 'lucide-react';

const FacilitiesSection = () => {
  const facilities = [
    {
      icon: Book,
      title: "Library",
      description: "Extensive collection of books, journals, and digital resources to support learning and research.",
      color: "text-primary",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Monitor,
      title: "Computer Lab",
      description: "Modern computer lab with high-speed internet and latest software for technology education.",
      color: "text-secondary",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: FlaskConical,
      title: "Science Lab",
      description: "Well-equipped laboratories for Physics, Chemistry, and Biology practical sessions.",
      color: "text-accent",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Home,
      title: "Hostel",
      description: "Safe and comfortable residential facility with 24/7 supervision for outstation students.",
      color: "text-school-navy",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Trophy,
      title: "Sports",
      description: "Comprehensive sports facilities including playground, courts, and equipment for physical development.",
      color: "text-primary",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section id="facilities" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Facilities</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Modern infrastructure and resources to support comprehensive education
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={facility.title}
              className="group rounded-2xl bg-card shadow-soft hover:shadow-medium transition-smooth hover:-translate-y-2 cursor-pointer overflow-hidden border border-border hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Photo */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center ${facility.color}`}>
                  <facility.icon className="w-5 h-5" />
                </div>
              </div>
              {/* Text */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-smooth">{facility.title}</h3>
                <p className="text-foreground text-sm leading-relaxed">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-school-light-blue rounded-2xl p-8 inline-block">
            <h3 className="text-2xl font-bold text-primary mb-4">Additional Amenities</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>• Cafeteria with healthy meals</div>
              <div>• Medical facility & first aid</div>
              <div>• Transportation service</div>
              <div>• Audio-visual classrooms</div>
              <div>• Prayer/meditation room</div>
              <div>• Student counseling center</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;