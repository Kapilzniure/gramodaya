import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, Users, CheckCircle, Calendar } from 'lucide-react';

const AdmissionsSection = () => {
  const admissionSteps = [
    {
      icon: FileText,
      title: "Download Form",
      description: "Download and fill out the admission form with all required information.",
      step: "01"
    },
    {
      icon: Users,
      title: "Submit Documents",
      description: "Submit the completed form along with required documents and photographs.",
      step: "02"
    },
    {
      icon: CheckCircle,
      title: "Entrance Test",
      description: "Appear for the entrance examination (for applicable grades).",
      step: "03"
    },
    {
      icon: Calendar,
      title: "Interview & Enrollment",
      description: "Complete the interview process and finalize enrollment upon selection.",
      step: "04"
    }
  ];

  const requirements = [
    "Birth certificate",
    "Previous school transcript",
    "Passport-sized photographs",
    "Guardian identification",
    "Medical certificate"
  ];

  return (
    <section id="admissions" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Admissions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our school community and embark on a journey of excellence
          </p>
        </div>

        {/* Admission Process */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">Admission Process</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <div 
                key={step.title}
                className="relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="text-center h-full hover:shadow-medium transition-smooth bg-dark-blue ">
                  <CardHeader>
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-primary">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{step.description}</p>
                  </CardContent>
                </Card>
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-secondary"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Requirements and Download */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Requirements */}
          <Card className="bg-dark-blue shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Required Documents</CardTitle>
              <CardDescription>Please prepare the following documents for admission</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Download Form */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Admission Form</CardTitle>
              <CardDescription>Download the official admission form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700">
                Download the admission form, fill it out completely, and submit along with 
                the required documents during the admission period.
              </p>
              <div className="space-y-4">
                <Button className="w-full" size="lg">
                  <FileText className="w-5 h-5 mr-2" />
                  Download Admission Form (PDF)
                </Button>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Admission opens: <span className="font-semibold text-primary">January 1st</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last date: <span className="font-semibold text-primary">March 31st</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;