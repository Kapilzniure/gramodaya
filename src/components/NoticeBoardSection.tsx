import { useState } from 'react';
import { Bell, Pin, Calendar, ChevronRight, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Notice = {
  id: number;
  title: string;
  date: string;
  category: 'Academic' | 'Exam' | 'Holiday' | 'General' | 'Urgent';
  content: string;
  pinned?: boolean;
};

const initialNotices: Notice[] = [
  {
    id: 1,
    title: "Admission Open for Academic Year 2025–26",
    date: "2025-03-10",
    category: "Academic",
    content: "Admissions are now open for Nursery to Grade 12 and Higher Secondary (Hotel Management & Computer Science). Visit the school office between 10 AM – 4 PM or fill the online form. Limited seats available.",
    pinned: true,
  },
  {
    id: 2,
    title: "Grade 10 Pre-Board Examination Schedule",
    date: "2025-03-08",
    category: "Exam",
    content: "Pre-Board examinations for Grade 10 (SEE preparation) will begin from Chaitra 5, 2081. Students must bring their admit cards. Seating arrangement will be posted on the notice board by Chaitra 3.",
    pinned: true,
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting – Chaitra 18",
    date: "2025-03-05",
    category: "General",
    content: "A Parent-Teacher Meeting is scheduled for Chaitra 18, 2081 (10 AM – 2 PM). All parents of students from Grade 6 to Grade 12 are requested to attend. Report cards will be distributed on the same day.",
  },
  {
    id: 4,
    title: "Holiday Notice – Holi Festival",
    date: "2025-03-01",
    category: "Holiday",
    content: "The school will remain closed on Falgun 30 & Chaitra 1, 2081 on account of Holi Festival. Regular classes will resume from Chaitra 2, 2081.",
  },
  {
    id: 5,
    title: "Annual Sports Day – Registration Open",
    date: "2025-02-25",
    category: "General",
    content: "Annual Sports Day is scheduled for Chaitra 25, 2081. Students interested in participating in athletics, football, volleyball, and badminton events must register with their class teacher by Chaitra 15.",
  },
  {
    id: 6,
    title: "Grade 11 & 12 NEB Practical Examination",
    date: "2025-02-20",
    category: "Exam",
    content: "NEB Practical Examinations for Grade 11 and 12 will be conducted from Chaitra 10–20, 2081. Students should report to the school one hour before their scheduled practical time with proper uniform.",
  },
];

const categoryColor: Record<Notice['category'], string> = {
  Academic: 'bg-primary/10 text-primary border-primary/20',
  Exam:     'bg-destructive/10 text-destructive border-destructive/20',
  Holiday:  'bg-accent/10 text-accent border-accent/20',
  General:  'bg-secondary/10 text-secondary border-secondary/20',
  Urgent:   'bg-red-500/10 text-red-500 border-red-500/20',
};

const NoticeBoardSection = () => {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [selected, setSelected] = useState<Notice | null>(null);
  const [filter, setFilter] = useState<'All' | Notice['category']>('All');

  // Admin add notice (simple inline form)
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'General' as Notice['category'], content: '' });

  const filtered = filter === 'All' ? notices : notices.filter(n => n.category === filter);
  const pinned = filtered.filter(n => n.pinned);
  const regular = filtered.filter(n => !n.pinned);

  const addNotice = () => {
    if (!form.title || !form.content) return;
    const now = new Date().toISOString().split('T')[0];
    setNotices(prev => [{ id: Date.now(), ...form, date: now }, ...prev]);
    setForm({ title: '', category: 'General', content: '' });
    setShowForm(false);
  };

  const categories: (Notice['category'] | 'All')[] = ['All', 'Academic', 'Exam', 'Holiday', 'General', 'Urgent'];

  return (
    <section id="notices" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Bell className="w-4 h-4 animate-pulse" />
            Live Notice Board
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Notice Board</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest announcements from Gramodaya English School
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                filter === cat
                  ? 'bg-primary text-primary-foreground border-primary shadow-medium'
                  : 'bg-card border-border hover:border-primary/40 text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notice List */}
          <div className="lg:col-span-2 space-y-4">
            {pinned.map(notice => (
              <div
                key={notice.id}
                className="group relative bg-primary/5 border border-primary/20 rounded-xl p-5 cursor-pointer hover:shadow-medium transition-all duration-300 hover:border-primary/40"
                onClick={() => setSelected(notice)}
              >
                <div className="flex items-start gap-3">
                  <Pin className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge variant="outline" className={`text-xs ${categoryColor[notice.category]}`}>{notice.category}</Badge>
                      <span className="text-xs text-muted-foreground">{notice.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{notice.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notice.content}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
              </div>
            ))}

            {regular.map(notice => (
              <div
                key={notice.id}
                className="group bg-card border border-border rounded-xl p-5 cursor-pointer hover:shadow-medium transition-all duration-300 hover:border-primary/30"
                onClick={() => setSelected(notice)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge variant="outline" className={`text-xs ${categoryColor[notice.category]}`}>{notice.category}</Badge>
                      <span className="text-xs text-muted-foreground">{notice.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{notice.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notice.content}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">No notices in this category.</div>
            )}
          </div>

          {/* Sidebar: Add Notice + Stats */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Bell className="w-5 h-5" /> Post a Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full py-3 border-2 border-dashed border-primary/30 rounded-lg text-primary font-medium hover:border-primary hover:bg-primary/5 transition-all duration-200 text-sm"
                  >
                    + Add New Notice
                  </button>
                ) : (
                  <div className="space-y-3">
                    <input
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary"
                      placeholder="Notice title"
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    />
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary"
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value as Notice['category'] }))}
                    >
                      {(['Academic','Exam','Holiday','General','Urgent'] as const).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary resize-none"
                      rows={3}
                      placeholder="Notice details..."
                      value={form.content}
                      onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    />
                    <div className="flex gap-2">
                      <button onClick={addNotice} className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Post</button>
                      <button onClick={() => setShowForm(false)} className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick stats */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                {(['Academic','Exam','Holiday','General'] as const).map(cat => (
                  <div key={cat} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{cat}</span>
                    <Badge variant="outline" className={`text-xs ${categoryColor[cat]}`}>
                      {notices.filter(n => n.category === cat).length}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-2xl max-w-lg w-full p-6 shadow-large" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <Badge variant="outline" className={`text-xs ${categoryColor[selected.category]}`}>{selected.category}</Badge>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{selected.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              {selected.date}
            </div>
            <p className="text-foreground leading-relaxed">{selected.content}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default NoticeBoardSection;
