import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { BookOpen, UserPlus } from 'lucide-react';
import heroImage from '@/assets/hero-school.jpg';

const HeroSection = () => {
  const stats = [
    { number: "25+", label: "Years of Excellence" },
    { number: "1500+", label: "Students" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Expert Teachers" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20 backdrop-blur-sm" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight letter-spacing-tight">
              <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent animate-shimmer bg-size-200">
                Gramodaya English School
              </span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full animate-pulse-glow" />
          </div>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium text-balance">
            Shaping futures with <span className="text-secondary font-semibold">knowledge</span>, 
            <span className="text-accent font-semibold"> values</span>, and 
            <span className="text-primary font-semibold"> excellence</span> since 1995
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-elegant hover:shadow-glow transition-all duration-500 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <a href="#about">
                <UserPlus className="mr-2 h-5 w-5" />
                Discover Our Story
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/30 hover:border-primary bg-card/80 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500 transform hover:scale-105 px-8 py-4 text-lg font-semibold hover:shadow-medium"
              asChild
            >
              <a href="#admissions">
                <BookOpen className="mr-2 h-5 w-5" />
                Apply Now
              </a>
            </Button>
          </div>
        </div>
        
        {/* Enhanced Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="bg-card/80 backdrop-blur-md border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-glow group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 font-playfair">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground mt-2 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float blur-xl" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-secondary/10 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }} />

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/60 rounded-full flex justify-center backdrop-blur-sm bg-card/20">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;