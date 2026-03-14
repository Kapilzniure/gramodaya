import { Link } from 'react-router-dom';
import { Bell, CalendarDays, DollarSign, Trophy, Newspaper, ArrowRight } from 'lucide-react';

const links = [
  {
    to: '/notices',
    icon: Bell,
    label: 'Notice Board',
    desc: 'Latest announcements & circulars',
    color: 'from-primary/20 to-primary/5 border-primary/30 hover:border-primary/60',
    iconBg: 'bg-primary/10 text-primary',
    badge: 'Live',
    badgeColor: 'bg-primary text-primary-foreground',
  },
  {
    to: '/calendar',
    icon: CalendarDays,
    label: 'Academic Calendar',
    desc: 'Exam dates, holidays & events',
    color: 'from-secondary/20 to-secondary/5 border-secondary/30 hover:border-secondary/60',
    iconBg: 'bg-secondary/10 text-secondary',
    badge: '2081–82',
    badgeColor: 'bg-secondary/20 text-secondary border border-secondary/30',
  },
  {
    to: '/fees',
    icon: DollarSign,
    label: 'Fee Structure',
    desc: 'Transparent fees for all grades',
    color: 'from-accent/20 to-accent/5 border-accent/30 hover:border-accent/60',
    iconBg: 'bg-accent/10 text-accent',
    badge: 'Updated',
    badgeColor: 'bg-accent/20 text-accent border border-accent/30',
  },
  {
    to: '/awards',
    icon: Trophy,
    label: 'Awards & Recognition',
    desc: 'Our trophies & achievements',
    color: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 hover:border-yellow-500/60',
    iconBg: 'bg-yellow-500/10 text-yellow-500',
    badge: '6 Awards',
    badgeColor: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30',
  },
  {
    to: '/news',
    icon: Newspaper,
    label: 'News & Events',
    desc: 'School happenings & stories',
    color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-500/60',
    iconBg: 'bg-purple-500/10 text-purple-500',
    badge: 'New',
    badgeColor: 'bg-purple-500/20 text-purple-500 border border-purple-500/30',
  },
];

const QuickLinksSection = () => (
  <section id="explore" className="py-16 bg-muted/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Explore More</h2>
        <p className="text-muted-foreground text-lg">Everything you need — one click away</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group relative bg-gradient-to-br ${item.color} border rounded-2xl p-5 transition-all duration-300 hover:shadow-medium hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{item.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                View <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default QuickLinksSection;