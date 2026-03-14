import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BookOpen, Users, GraduationCap, Award } from 'lucide-react';

const AcademicsSection = () => {
  const academicLevels = [
    {
      title: "Primary",
      grades: "Grades 1-5",
      description: "Foundation building with focus on basic literacy, numeracy, and social skills development in a nurturing environment.",
      icon: BookOpen,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Lower Secondary",
      grades: "Grades 6-8",
      description: "Comprehensive curriculum preparing students for advanced studies with emphasis on critical thinking and problem-solving.",
      icon: Users,
      color: "bg-secondary/10 text-secondary"
    },
    {
      title: "Secondary",
      grades: "Grades 9-10",
      description: "Rigorous academic program preparing students for national examinations and higher secondary education.",
      icon: GraduationCap,
      color: "bg-accent/10 text-accent"
    },
    {
      title: "Higher Secondary",
      grades: "Grades 11-12",
      description: "Specialized streams in Hotel Management and Computer Science preparing students for higher education and careers.",
      icon: Award,
      color: "bg-school-navy/10 text-school-navy"
    }
  ];

  return (
    <section id="academics" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Academic Programs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive education from Nursery to Grade 12, including specialized streams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {academicLevels.map((level, index) => (
            <Card 
              key={level.title} 
              className="group hover:shadow-medium transition-smooth hover:-translate-y-2 cursor-pointer bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full ${level.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
                  <level.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-bold text-primary">{level.title}</CardTitle>
                <CardDescription className="text-secondary font-medium">{level.grades}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-center leading-relaxed">{level.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Specialized Streams */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">Specialized Streams</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="group hover:shadow-medium transition-smooth bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-secondary">Hotel Management</CardTitle>
                <CardDescription className="text-lg">Grades 11-12</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">
                  Comprehensive hospitality education covering hotel operations, culinary arts, 
                  tourism management, and customer service excellence.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hotel Operations & Management</li>
                  <li>• Food & Beverage Service</li>
                  <li>• Tourism & Travel Management</li>
                  <li>• Customer Relations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-medium transition-smooth bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-accent">Computer Science</CardTitle>
                <CardDescription className="text-lg">Grades 11-12</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">
                  Modern computing education focusing on programming, web development, 
                  database management, and emerging technologies.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Programming & Software Development</li>
                  <li>• Web Design & Development</li>
                  <li>• Database Management Systems</li>
                  <li>• Digital Literacy & IT Skills</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;