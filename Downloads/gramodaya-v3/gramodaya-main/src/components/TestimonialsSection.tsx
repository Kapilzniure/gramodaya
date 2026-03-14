import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Sita Devi Sharma",
    role: "Parent of Grade 8 Student",
    avatar: "SD",
    rating: 5,
    text: "Gramodaya English School has transformed my daughter's academic life. The teachers are dedicated, the environment is disciplined, and she has grown both academically and in character. I couldn't be happier with our choice.",
    color: "from-primary to-primary/70",
  },
  {
    name: "Ram Bahadur Thapa",
    role: "Parent of Grade 11 Student",
    avatar: "RT",
    rating: 5,
    text: "My son joined the Hotel Management stream and the practical training they provide is outstanding. The school's facilities are modern and the faculty keeps students updated with industry knowledge. Highly recommended!",
    color: "from-secondary to-secondary/70",
  },
  {
    name: "Priya Adhikari",
    role: "Alumni – SEE 2023 (GPA 3.85)",
    avatar: "PA",
    rating: 5,
    text: "I scored GPA 3.85 in SEE and credit goes to my teachers at Gramodaya. The extra classes before exams and the personal attention from teachers made all the difference. Forever grateful to this school.",
    color: "from-accent to-accent/70",
  },
  {
    name: "Bishnu Prasad Koirala",
    role: "Parent of Grade 5 Student",
    avatar: "BK",
    rating: 5,
    text: "What I love most is the balance between academics and extracurricular activities. My son participates in sports, cultural programs and still does well in studies. The school nurtures every aspect of a child's personality.",
    color: "from-primary to-secondary",
  },
  {
    name: "Anita Gurung",
    role: "Alumni – NEB Computer Science 2022",
    avatar: "AG",
    rating: 5,
    text: "The Computer Science stream at Gramodaya gave me a solid foundation. The computer lab is well-equipped, teachers are knowledgeable, and the project-based learning approach prepared me well for my engineering college.",
    color: "from-secondary to-accent",
  },
  {
    name: "Dipak Neupane",
    role: "Parent of Grade 10 Student",
    avatar: "DN",
    rating: 4,
    text: "We transferred our child here from another school and the difference is noticeable. Smaller class sizes mean teachers can give individual attention. The notice board and communication from school keeps parents well informed.",
    color: "from-accent to-primary",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-secondary" />
            What Parents & Alumni Say
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Testimonials</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from families and graduates who have experienced Gramodaya English School firsthand
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {visible.map((t, i) => (
            <div
              key={i}
              className={`relative bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-500 ${i === 0 ? 'ring-2 ring-primary/20' : ''}`}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-6 text-sm">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border bg-card hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === current ? 'bg-primary w-6' : 'bg-border hover:bg-primary/40'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border bg-card hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Summary stats */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '200+', label: 'Reviews' },
            { value: '95%', label: 'Would Recommend' },
          ].map((s, i) => (
            <div key={i} className="bg-muted/40 rounded-xl py-4">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
