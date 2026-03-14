import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Students in classroom",
      category: "Academics"
    },
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "School building exterior",
      category: "Campus"
    },
    {
      src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Science laboratory",
      category: "Facilities"
    },
    {
      src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Sports activity",
      category: "Sports"
    },
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Library",
      category: "Facilities"
    },
    {
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Cultural program",
      category: "Events"
    }
  ];

  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const filtered = activeCategory === 'All' ? galleryImages : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">School Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Glimpses of life at Gramodaya English School
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-medium scale-105'
                  : 'bg-card border border-border hover:border-primary/50 text-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-medium transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedImage(image)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center justify-between">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {image.category}
                  </span>
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-white text-sm mt-2 font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm rounded-b-lg px-4 py-3">
              <p className="text-white font-medium">{selectedImage.alt}</p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
