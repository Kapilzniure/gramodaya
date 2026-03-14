import { Trophy, Award, Star, Medal, TrendingUp, Users } from 'lucide-react';

const awards = [
  {
    year: "2023",
    title: "Best School in Chitwan District",
    organization: "Chitwan District Education Office",
    icon: Trophy,
    color: "text-secondary",
    bg: "bg-secondary/10 border-secondary/20",
    description: "Recognized for outstanding SEE results, student discipline, and community contribution.",
  },
  {
    year: "2022",
    title: "Excellence in Sports Achievement",
    organization: "Nepal Schools Sports Council",
    icon: Medal,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    description: "Students won gold in inter-district athletics and volleyball championships.",
  },
  {
    year: "2022",
    title: "Top Performing School – NEB",
    organization: "National Examinations Board",
    icon: Award,
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
    description: "Ranked in top 5 schools in Bagmati Province for Grade 12 board results.",
  },
  {
    year: "2021",
    title: "Digital Education Pioneer Award",
    organization: "Ministry of Education, Nepal",
    icon: Star,
    color: "text-secondary",
    bg: "bg-secondary/10 border-secondary/20",
    description: "Awarded for early adoption of digital learning tools and smart classrooms.",
  },
  {
    year: "2020",
    title: "Community Service Award",
    organization: "Bharatpur Metropolitan City",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    description: "Recognized for free education programs and scholarship initiatives for underprivileged students.",
  },
  {
    year: "2019",
    title: "Academic Growth Award",
    organization: "Chitwan District Education Office",
    icon: TrendingUp,
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
    description: "Highest improvement in SEE pass rate — from 78% to 95% over three years.",
  },
];

const achievements = [
  { number: "95%", label: "SEE Pass Rate 2023", icon: Trophy },
  { number: "12", label: "District-Level Trophies", icon: Medal },
  { number: "3", label: "National Awards", icon: Award },
  { number: "500+", label: "Scholarship Recipients", icon: Star },
];

const AwardsSection = () => {
  return (
    <section id="awards" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Our Achievements
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Awards & Recognition</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Over 25 years of excellence recognized by educational bodies and the community
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-medium transition-all duration-300 hover:border-primary/30 group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">{a.number}</p>
                <p className="text-sm text-muted-foreground">{a.label}</p>
              </div>
            );
          })}
        </div>

        {/* Awards Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-secondary/40 to-accent/40" />

          <div className="space-y-8">
            {awards.map((award, i) => {
              const Icon = award.icon;
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8 gap-4`}>
                  {/* Card */}
                  <div className={`md:w-5/12 w-full group bg-card border ${award.bg} rounded-2xl p-6 hover:shadow-medium transition-all duration-300`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl border ${award.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-6 h-6 ${award.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${award.bg} ${award.color}`}>{award.year}</span>
                        </div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{award.title}</h3>
                        <p className={`text-sm font-medium ${award.color} mt-0.5`}>{award.organization}</p>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{award.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className={`w-4 h-4 rounded-full border-4 border-background bg-primary shadow-medium`} />
                  </div>

                  {/* Spacer */}
                  <div className="md:w-5/12 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
