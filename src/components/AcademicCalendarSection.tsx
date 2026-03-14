import { useState } from 'react';
import { CalendarDays, BookOpen, Trophy, Star, Palmtree, GraduationCap } from 'lucide-react';

type EventType = 'exam' | 'holiday' | 'event' | 'academic';

type CalendarEvent = {
  day: string;
  title: string;
  type: EventType;
};

type Month = {
  name: string;
  nepali: string;
  approxAD: string;
  events: CalendarEvent[];
};

const typeConfig: Record<EventType, { color: string; dot: string; icon: React.ElementType }> = {
  exam:     { color: 'bg-destructive/10 text-destructive border-destructive/20',  dot: 'bg-destructive',   icon: BookOpen },
  holiday:  { color: 'bg-accent/10 text-accent border-accent/20',                 dot: 'bg-accent',        icon: Palmtree },
  event:    { color: 'bg-secondary/10 text-secondary border-secondary/20',        dot: 'bg-secondary',     icon: Star },
  academic: { color: 'bg-primary/10 text-primary border-primary/20',              dot: 'bg-primary',       icon: GraduationCap },
};

const months: Month[] = [
  {
    name: 'Baisakh', nepali: 'बैशाख', approxAD: 'Apr–May',
    events: [
      { day: '1',  title: 'New Academic Year Begins',         type: 'academic' },
      { day: '8',  title: 'Orientation for New Students',     type: 'event' },
      { day: '15', title: 'Book Distribution Day',            type: 'academic' },
      { day: '29', title: 'Buddha Jayanti Holiday',           type: 'holiday' },
    ],
  },
  {
    name: 'Jestha', nepali: 'जेष्ठ', approxAD: 'May–Jun',
    events: [
      { day: '5',  title: 'First Monthly Test – All Grades',  type: 'exam' },
      { day: '12', title: 'Motivational Talk – Guest Lecture',type: 'event' },
      { day: '20', title: 'Monthly Test Results Published',   type: 'academic' },
      { day: '25', title: 'Parent Orientation Meeting',       type: 'event' },
    ],
  },
  {
    name: 'Ashadh', nepali: 'आषाढ', approxAD: 'Jun–Jul',
    events: [
      { day: '3',  title: 'Monsoon Preparedness Drill',       type: 'event' },
      { day: '10', title: 'Second Monthly Test',              type: 'exam' },
      { day: '21', title: 'Guru Purnima – School Celebration',type: 'event' },
      { day: '30', title: 'Half-Year Progress Report',        type: 'academic' },
    ],
  },
  {
    name: 'Shrawan', nepali: 'श्रावण', approxAD: 'Jul–Aug',
    events: [
      { day: '1',  title: 'Shrawan Holiday (3 days)',         type: 'holiday' },
      { day: '8',  title: 'Third Monthly Test',               type: 'exam' },
      { day: '15', title: 'Janai Purnima Holiday',            type: 'holiday' },
      { day: '20', title: 'Computer Lab Workshop',            type: 'event' },
    ],
  },
  {
    name: 'Bhadra', nepali: 'भाद्र', approxAD: 'Aug–Sep',
    events: [
      { day: '5',  title: 'First Terminal Exam Begins – Gr. 1–9',type: 'exam' },
      { day: '15', title: 'First Terminal Exam Ends',           type: 'exam' },
      { day: '20', title: 'Teej Festival Holiday',              type: 'holiday' },
      { day: '28', title: 'First Terminal Results Published',   type: 'academic' },
    ],
  },
  {
    name: 'Ashwin', nepali: 'आश्विन', approxAD: 'Sep–Oct',
    events: [
      { day: '1',  title: 'Parent-Teacher Meeting',            type: 'event' },
      { day: '8',  title: 'Ghatasthapana – Dashain Holiday',   type: 'holiday' },
      { day: '8–18','title': 'Dashain Vacation',               type: 'holiday' },
      { day: '25', title: 'Classes Resume after Dashain',      type: 'academic' },
    ],
  },
  {
    name: 'Kartik', nepali: 'कार्तिक', approxAD: 'Oct–Nov',
    events: [
      { day: '1',  title: 'Tihar Festival Holiday (4 days)',   type: 'holiday' },
      { day: '8',  title: 'Science Exhibition & Fair',         type: 'event' },
      { day: '15', title: 'Fourth Monthly Test',               type: 'exam' },
      { day: '25', title: 'Annual Sports Day',                 type: 'event' },
    ],
  },
  {
    name: 'Mangsir', nepali: 'मंसिर', approxAD: 'Nov–Dec',
    events: [
      { day: '5',  title: 'Pre-Board Exam – Grade 10',         type: 'exam' },
      { day: '12', title: 'Pre-Board Exam – Grade 12',         type: 'exam' },
      { day: '20', title: 'Pre-Board Results Published',       type: 'academic' },
      { day: '28', title: 'NEB Practical Exam Begins – Gr. 11',type: 'exam' },
    ],
  },
  {
    name: 'Poush', nepali: 'पौष', approxAD: 'Dec–Jan',
    events: [
      { day: '1',  title: 'NEB Practical Exam – Grade 12',     type: 'exam' },
      { day: '10', title: 'Second Terminal Exam – All Grades', type: 'exam' },
      { day: '20', title: 'Winter Vacation Begins',            type: 'holiday' },
      { day: '30', title: 'Winter Vacation Ends',              type: 'holiday' },
    ],
  },
  {
    name: 'Magh', nepali: 'माघ', approxAD: 'Jan–Feb',
    events: [
      { day: '1',  title: 'Second Terminal Results',           type: 'academic' },
      { day: '7',  title: 'Maghe Sankranti Holiday',           type: 'holiday' },
      { day: '15', title: 'Parent-Teacher Meeting',            type: 'event' },
      { day: '25', title: 'Cultural Program Practice Begins',  type: 'event' },
    ],
  },
  {
    name: 'Falgun', nepali: 'फाल्गुण', approxAD: 'Feb–Mar',
    events: [
      { day: '5',  title: 'SEE Preparation Classes Begin',     type: 'academic' },
      { day: '12', title: 'Holi Festival Holiday',             type: 'holiday' },
      { day: '20', title: 'Annual Cultural Program',           type: 'event' },
      { day: '28', title: 'Grade 12 NEB Exam Registration',   type: 'academic' },
    ],
  },
  {
    name: 'Chaitra', nepali: 'चैत्र', approxAD: 'Mar–Apr',
    events: [
      { day: '1',  title: 'SEE Final Exam Begins (Grade 10)',  type: 'exam' },
      { day: '15', title: 'NEB Grade 12 Final Exam Begins',    type: 'exam' },
      { day: '22', title: 'Prize Distribution & Award Day',    type: 'event' },
      { day: '30', title: 'Academic Year Ends',                type: 'academic' },
    ],
  },
];

const AcademicCalendarSection = () => {
  const [activeType, setActiveType] = useState<'all' | EventType>('all');
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  const types: ('all' | EventType)[] = ['all', 'exam', 'holiday', 'event', 'academic'];
  const typeLabels: Record<string, string> = { all: 'All', exam: 'Exams', holiday: 'Holidays', event: 'Events', academic: 'Academic' };

  const filteredMonths = months.map(m => ({
    ...m,
    events: activeType === 'all' ? m.events : m.events.filter(e => e.type === activeType),
  })).filter(m => m.events.length > 0);

  return (
    <section id="calendar" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CalendarDays className="w-4 h-4" />
            Academic Year 2081–82 B.S.
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Academic Calendar</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All 12 months — exams, holidays, and events at a glance
          </p>
        </div>

        {/* Legend + Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeType === t
                  ? t === 'all' ? 'bg-primary text-primary-foreground border-primary' : `${typeConfig[t as EventType].color} border-current scale-105`
                  : 'bg-card border-border text-foreground hover:border-primary/40'
              }`}
            >
              {t !== 'all' && <span className={`w-2 h-2 rounded-full ${typeConfig[t as EventType].dot}`} />}
              {typeLabels[t]}
            </button>
          ))}
        </div>

        {/* 12-month grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMonths.map((month) => {
            const isExpanded = expandedMonth === month.name;
            const visibleEvents = isExpanded ? month.events : month.events.slice(0, 3);

            return (
              <div key={month.name} className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                {/* Month header */}
                <div className="bg-gradient-to-r from-primary to-primary/70 px-4 py-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold">{month.name}</h3>
                    <p className="text-white/70 text-xs">{month.nepali} · {month.approxAD}</p>
                  </div>
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{month.events.length} events</span>
                </div>

                {/* Events */}
                <div className="divide-y divide-border">
                  {visibleEvents.map((evt, i) => {
                    const cfg = typeConfig[evt.type];
                    const Icon = cfg.icon;
                    return (
                      <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/30 transition-colors">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${cfg.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-foreground leading-tight truncate">{evt.title}</p>
                          <p className="text-xs text-muted-foreground">{typeof evt.day === 'string' ? evt.day : evt.day}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {month.events.length > 3 && (
                  <button
                    onClick={() => setExpandedMonth(isExpanded ? null : month.name)}
                    className="w-full px-4 py-2 text-xs text-primary font-medium hover:bg-primary/5 transition-colors border-t border-border"
                  >
                    {isExpanded ? '▲ Show less' : `▼ +${month.events.length - 3} more`}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Color legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          {(Object.keys(typeConfig) as EventType[]).map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${typeConfig[t].dot}`} />
              {typeLabels[t]}
            </span>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          * Dates are in Bikram Sambat (B.S.). Actual dates may vary per official announcements.
        </p>
      </div>
    </section>
  );
};

export default AcademicCalendarSection;
