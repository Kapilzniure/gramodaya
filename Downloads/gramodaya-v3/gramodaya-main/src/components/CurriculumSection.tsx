import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const CurriculumSection = () => {
  const [activeTab, setActiveTab] = useState('general');

  const generalCurriculum = {
    "Primary (1-5)": [
      "English Language", "Nepali Language", "Mathematics", "Science", 
      "Social Studies", "Health & Physical Education", "Art & Craft", "Computer Basics"
    ],
    "Lower Secondary (6-8)": [
      "English", "Nepali", "Mathematics", "Science", "Social Studies", 
      "Health & Physical Education", "Computer Studies", "Optional Mathematics"
    ],
    "Secondary (9-10)": [
      "Compulsory English", "Compulsory Nepali", "Compulsory Mathematics", 
      "Science & Technology", "Social Studies", "Health & Physical Education", 
      "Optional Mathematics", "Computer Science"
    ]
  };

  const hotelManagement = {
    "Grade 11": [
      "English", "Nepali", "Hotel Management", "Food Production", 
      "Food & Beverage Service", "Front Office Operation", "Housekeeping", 
      "Tourism", "Accountancy"
    ],
    "Grade 12": [
      "English", "Nepali", "Hotel Management", "Food Production", 
      "Food & Beverage Service", "Front Office Operation", "Housekeeping", 
      "Tourism", "Accountancy", "Project Work"
    ]
  };

  const computerScience = {
    "Grade 11": [
      "English", "Nepali", "Mathematics", "Computer Science", 
      "Physics", "Chemistry", "Statistics", "Database Management"
    ],
    "Grade 12": [
      "English", "Nepali", "Mathematics", "Computer Science", 
      "Physics", "Chemistry", "Statistics", "Database Management", "Project Work"
    ]
  };

  const curriculumData = {
    general: { title: "General Curriculum", data: generalCurriculum },
    hotel: { title: "Hotel Management", data: hotelManagement },
    computer: { title: "Computer Science", data: computerScience }
  };

  return (
    <section id="curriculum" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Curriculum</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive curriculum designed to foster holistic development
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12">
            <TabsTrigger value="general" className="text-sm font-medium">
              General Curriculum
            </TabsTrigger>
            <TabsTrigger value="hotel" className="text-sm font-medium">
              Hotel Management
            </TabsTrigger>
            <TabsTrigger value="computer" className="text-sm font-medium">
              Computer Science
            </TabsTrigger>
          </TabsList>

          {Object.entries(curriculumData).map(([key, curriculum]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-primary">{curriculum.title}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(curriculum.data).map(([grade, subjects], index) => (
                  <Card 
                    key={grade}
                    className="bg-card hover:shadow-medium transition-smooth"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-primary text-center">
                        {grade}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {subjects.map((subject, subIndex) => (
                          <Badge 
                            key={subIndex}
                            variant="outline" 
                            className="w-full justify-center py-2 hover:bg-primary/10 transition-smooth"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Information */}
              <div className="mt-12">
                <Card className="bg-gradient-to-br from-school-light-blue to-primary/5 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <h4 className="text-2xl font-bold text-primary mb-4">
                      {curriculum.title} Features
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                      {key === 'general' && (
                        <>
                          <div>• National Curriculum Framework</div>
                          <div>• Continuous Assessment</div>
                          <div>• Practical Learning Approach</div>
                          <div>• Co-curricular Activities</div>
                          <div>• Value-based Education</div>
                          <div>• Skill Development Programs</div>
                        </>
                      )}
                      {key === 'hotel' && (
                        <>
                          <div>• Industry-relevant Training</div>
                          <div>• Practical Kitchen Sessions</div>
                          <div>• Hotel Internship Programs</div>
                          <div>• Guest Lecture Sessions</div>
                          <div>• Tourism Industry Exposure</div>
                          <div>• Professional Certification</div>
                        </>
                      )}
                      {key === 'computer' && (
                        <>
                          <div>• Programming Languages</div>
                          <div>• Software Development</div>
                          <div>• Database Design</div>
                          <div>• Web Technologies</div>
                          <div>• IT Project Management</div>
                          <div>• Industry Partnerships</div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default CurriculumSection;