import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, GraduationCap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const mainNavItems = [
  { name: 'About',      href: '#about' },
  { name: 'Academics',  href: '#academics' },
  { name: 'Facilities', href: '#facilities' },
  { name: 'Gallery',    href: '#gallery' },
  { name: 'Admissions', href: '#admissions' },
  { name: 'Contact',    href: '#contact' },
];

const pageNavItems = [
  { name: 'Notices',    to: '/notices' },
  { name: 'Calendar',   to: '/calendar' },
  { name: 'Fees',       to: '/fees' },
  { name: 'Awards',     to: '/awards' },
  { name: 'News',       to: '/news' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold font-playfair bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                Gramodaya
              </h1>
              <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">English School</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isHome && mainNavItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm px-3 py-1.5 rounded-md hover:bg-primary/8 whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
            {/* Divider */}
            {isHome && <div className="w-px h-5 bg-border mx-1" />}
            {pageNavItems.map(item => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-sm px-3 py-1.5 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
                  location.pathname === item.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/8'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden hover:bg-primary/10"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border/50">
          <div className="px-4 pt-3 pb-5 space-y-1">
            {isHome && mainNavItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="block text-foreground hover:text-primary px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:bg-primary/10"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {isHome && <div className="border-t border-border my-2" />}
            <p className="text-xs text-muted-foreground px-4 pb-1 font-semibold uppercase tracking-wider">More Pages</p>
            {pageNavItems.map(item => (
              <Link
                key={item.name}
                to={item.to}
                className={`block px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  location.pathname === item.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
