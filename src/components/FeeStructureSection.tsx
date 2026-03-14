import { useState } from 'react';
import { DollarSign, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

type Level = 'nursery' | 'primary' | 'lowersec' | 'secondary' | 'highersec';

const levels = [
  { key: 'nursery',   label: 'Nursery / LKG / UKG', grades: 'Age 3–5' },
  { key: 'primary',   label: 'Primary',              grades: 'Grade 1–5' },
  { key: 'lowersec',  label: 'Lower Secondary',      grades: 'Grade 6–8' },
  { key: 'secondary', label: 'Secondary',            grades: 'Grade 9–10' },
  { key: 'highersec', label: 'Higher Secondary',     grades: 'Grade 11–12' },
] as const;

const feeData: Record<Level, {
  admission: number;
  monthly: number;
  annual: number;
  exam: number;
  notes: string[];
}> = {
  nursery:   { admission: 3000, monthly: 1800, annual: 4000, exam: 500,  notes: ['Includes activity fee', 'School bag provided in admission'] },
  primary:   { admission: 4000, monthly: 2200, annual: 5000, exam: 800,  notes: ['Includes computer lab fee', 'Library access included'] },
  lowersec:  { admission: 5000, monthly: 2800, annual: 5500, exam: 1000, notes: ['Science lab fee included', 'Sports kit fee separate'] },
  secondary: { admission: 6000, monthly: 3200, annual: 6000, exam: 1500, notes: ['Practical exam fee included', 'SEE registration by NEB separately'] },
  highersec: { admission: 8000, monthly: 4500, annual: 7000, exam: 2500, notes: ['Stream: Hotel Mgmt / Computer Science', 'NEB registration fee extra', 'Practical & project fee included'] },
};

const formatNPR = (n: number) => `NPR ${n.toLocaleString()}`;

const FeeStructureSection = () => {
  const [active, setActive] = useState<Level>('primary');
  const fee = feeData[active];

  const breakdown = [
    { label: 'Admission Fee (One-time)',   amount: fee.admission, highlight: false },
    { label: 'Monthly Tuition Fee',         amount: fee.monthly,  highlight: true  },
    { label: 'Annual Development Fee',     amount: fee.annual,   highlight: false },
    { label: 'Examination Fee (per term)', amount: fee.exam,     highlight: false },
  ];

  const annualTotal = fee.monthly * 12 + fee.annual + fee.exam * 2;

  return (
    <section id="fees" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <DollarSign className="w-4 h-4" />
            Transparent Fee Structure
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Fee Structure</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Affordable quality education — Academic Year 2081–82 B.S.
          </p>
        </div>

        {/* Level Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {levels.map(l => (
            <button
              key={l.key}
              onClick={() => setActive(l.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                active === l.key
                  ? 'bg-primary text-primary-foreground border-primary shadow-medium'
                  : 'bg-card border-border text-foreground hover:border-primary/40 hover:bg-primary/5'
              }`}
            >
              <span className="block">{l.label}</span>
              <span className={`block text-xs mt-0.5 ${active === l.key ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{l.grades}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Fee Breakdown */}
          <div className="lg:col-span-2 space-y-4">
            {breakdown.map((item, i) => (
              <div
                key={i}
                className={`flex justify-between items-center p-5 rounded-xl border transition-all duration-200 ${
                  item.highlight
                    ? 'bg-primary/5 border-primary/30 shadow-soft'
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.highlight ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                  <span className={`font-medium ${item.highlight ? 'text-primary' : 'text-foreground'}`}>{item.label}</span>
                  {item.highlight && <Badge variant="outline" className="text-xs border-primary/20 text-primary">Recurring</Badge>}
                </div>
                <span className={`font-bold text-lg ${item.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {formatNPR(item.amount)}
                </span>
              </div>
            ))}

            {/* Annual estimate */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 flex justify-between items-center">
              <div>
                <p className="font-semibold text-foreground">Estimated Annual Cost</p>
                <p className="text-xs text-muted-foreground mt-0.5">12 months tuition + annual + 2 exams</p>
              </div>
              <span className="text-2xl font-bold text-secondary">{formatNPR(annualTotal)}</span>
            </div>
          </div>

          {/* Notes & Info */}
          <div className="space-y-4">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary text-base flex items-center gap-2">
                  <Info className="w-4 h-4" /> What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {fee.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base text-foreground">Payment Policy</CardTitle>
                <CardDescription>Important information</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Monthly fees due by 15th of each month</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> 10% late fee after due date</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Scholarship available for merit students</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Sibling discount: 5% on second child</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Uniform & books not included</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          * Fee structure is subject to revision. Contact the school office for the most current information. Transportation and hostel fees are charged separately.
        </p>
      </div>
    </section>
  );
};

export default FeeStructureSection;
