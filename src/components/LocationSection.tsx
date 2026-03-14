import { MapPin, Phone, Clock, Bus, Navigation } from 'lucide-react';

const LocationSection = () => {
  // Bharatpur-10, Chitwan coordinates
  const lat = 27.6833;
  const lng = 84.4322;

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQxJzAwLjAiTiA4NMKwMjUnNTYuMCJF!5e0!3m2!1sen!2snp!4v1234567890`;

  const info = [
    {
      icon: MapPin,
      label: "Address",
      value: "Bharatpur-10, Chitwan District\nBagmati Province, Nepal",
      color: "text-primary bg-primary/10",
    },
    {
      icon: Phone,
      label: "Contact",
      value: "+977-56-123456\n+977-9845-000000",
      color: "text-secondary bg-secondary/10",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Sun–Fri: 10:00 AM – 4:00 PM\nSaturday: Closed",
      color: "text-accent bg-accent/10",
    },
    {
      icon: Bus,
      label: "How to Get Here",
      value: "5 min from Narayanghat Bus Park\nLocal tempo or taxi available",
      color: "text-primary bg-primary/10",
    },
  ];

  return (
    <section id="location" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Find Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Location</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conveniently located in Bharatpur, the heart of Chitwan District
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-medium border border-border" style={{ minHeight: 420 }}>
            <iframe
              title="Gramodaya English School Location"
              width="100%"
              height="100%"
              style={{ minHeight: 420, border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=Bharatpur+10+Chitwan+Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            {info.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-soft transition-all duration-200 hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                      {item.value.split('\n').map((line, j) => (
                        <p key={j} className="text-sm text-foreground">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Directions button */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-soft hover:shadow-medium"
            >
              <Navigation className="w-4 h-4" />
              Get Directions on Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
