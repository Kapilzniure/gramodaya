import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject || null,
          message: formData.message
        }]);

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Bharatpur-10, Chitwan District, Nepal",
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+977-56-123456",
      color: "text-secondary"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@gramodayaschool.edu.np",
      color: "text-accent"
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Sun-Fri: 7:00 AM - 4:00 PM",
      color: "text-school-navy"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with us for admissions, inquiries, or any other information
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Get In Touch</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We welcome you to visit our campus, meet our faculty, and experience 
                the Gramodaya difference firsthand. Contact us through any of the 
                following methods:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.title}
                  className="bg-card hover:shadow-medium transition-smooth"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${info.color}`}>
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{info.title}</h4>
                        <p className="text-muted-foreground">{info.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="bg-card">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-primary font-semibold">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">Bharatpur, Chitwan District</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-card shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Inquiry subject"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please write your message here..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground text-center">
                We'll get back to you within 24 hours during business days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;