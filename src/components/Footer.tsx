import { Facebook, Instagram, Mail, MapPin, Phone, GraduationCap } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Awards & Recognition', href: '#awards' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Notice Board', href: '#notices' },
    { name: 'Academic Calendar', href: '#calendar' },
    { name: 'Fee Structure', href: '#fees' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Our Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const academicLinks = [
    { name: 'Primary Education', href: '#academics' },
    { name: 'Secondary Education', href: '#academics' },
    { name: 'Hotel Management', href: '#academics' },
    { name: 'Computer Science', href: '#academics' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: 'mailto:info@gramodayaschool.edu.np', label: 'Email' },
  ];

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: 'Bharatpur-10, Chitwan District, Nepal' },
    { icon: Phone, label: 'Phone', value: '+977-56-123456' },
    { icon: Mail, label: 'Email', value: 'info@gramodayaschool.edu.np' },
  ];

  return (
    <footer className="bg-gradient-to-br from-background via-primary/5 to-secondary/5 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Enhanced School Info */}
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-playfair bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Gramodaya
                </h3>
                <p className="text-sm text-muted-foreground font-medium letter-spacing-wide">
                  ENGLISH SCHOOL
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-balance">
              Nurturing minds, building futures, and creating leaders for tomorrow through quality education and strong values.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-card border border-border hover:border-primary/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:shadow-medium hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-lg font-semibold text-foreground font-playfair">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-all duration-300 group relative py-1"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Academic Programs */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold text-foreground font-playfair">Academic Programs</h4>
            <div className="space-y-3">
              {academicLinks.map((program, index) => (
                <a
                  key={index}
                  href={program.href}
                  className="block text-muted-foreground hover:text-primary transition-all duration-300 group relative py-1"
                >
                  <span className="relative z-10">{program.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Contact Info */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-semibold text-foreground font-playfair">Contact</h4>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300 mt-0.5">
                    <info.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{info.label}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Gramodaya English School. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;