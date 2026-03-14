import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';

const NewsEventsSection = () => {
  const newsEvents = [
    {
      type: "event",
      title: "Annual Sports Day 2024",
      date: "March 15, 2024",
      location: "School Playground",
      description: "Join us for our annual sports day featuring various competitions, cultural programs, and prize distribution ceremony.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Sports"
    },
    {
      type: "news",
      title: "Excellence in SEE Results 2024",
      date: "February 28, 2024",
      description: "We are proud to announce that 95% of our students have passed the SEE examination with distinction, maintaining our tradition of academic excellence.",
      category: "Academic"
    },
    {
      type: "event",
      title: "Science Exhibition",
      date: "April 5, 2024",
      location: "Science Hall",
      description: "Annual science exhibition showcasing innovative projects by students from grades 6-12.",
      image: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Science"
    },
    {
      type: "news",
      title: "Computer Lab Upgrade",
      date: "January 20, 2024",
      description: "New computers and software installed in our computer lab to provide students with the latest technology for learning.",
      category: "Technology"
    }
  ];

  const notices = [
    "Admission for Academic Year 2024-25 is now open",
    "Parent-Teacher Meeting scheduled for March 25, 2024",
    "Winter vacation from December 20 to January 5",
    "New school uniform policy effective from next session"
  ];

  return (
    <section id="news" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">News & Events</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest happenings at our school
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News & Events */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {newsEvents.map((item, index) => (
                <Card 
                  key={index}
                  className="group hover:shadow-glow transition-smooth cursor-pointer bg-card border-border hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.image && (
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      <Badge 
                        className="absolute top-4 left-4 bg-primary/90 text-primary-foreground hover:bg-primary backdrop-blur-sm"
                      >
                        {item.category}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{item.date}</span>
                      {item.location && (
                        <>
                          <MapPin className="w-4 h-4 ml-2 text-primary" />
                          <span>{item.location}</span>
                        </>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth">
                      {item.title}
                    </CardTitle>
                    {!item.image && (
                      <Badge variant="outline" className="w-fit border-primary/20 text-primary">
                        {item.category}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Notices */}
          <div>
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 sticky top-8 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary flex items-center">
                  <Users className="w-6 h-6 mr-2 text-secondary" />
                  Important Notices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notices.map((notice, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-card/80 rounded-lg shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-l-4 border-primary backdrop-blur-sm hover:bg-card/90"
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed">{notice}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Badge className="bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-smooth cursor-pointer">
                    View All Notices
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;