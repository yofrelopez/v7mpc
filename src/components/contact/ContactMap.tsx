import { MapPin, Navigation } from 'lucide-react';

export default function ContactMap() {
  const address = "225 N Pace Blvd. Suite 225, Pensacola, FL 32505, United States";
  const encodedAddress = encodeURIComponent(address);
  
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-white mb-4">
            Visit Our{' '}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Office
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="font-accent text-lg text-slate-300 max-w-2xl mx-auto">
            Located in the heart of Pensacola, Florida. We welcome visitors by appointment and are easily accessible from major highways.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden mx-auto max-w-4xl">
          {/* Map */}
          <div className="aspect-[16/10] relative">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.123456789012!2d-87.2169!3d30.4518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s225%20N%20Pace%20Blvd%2C%20Pensacola%2C%20FL%2032505!5e0!3m2!1sen!2sus!4v1699123456789!5m2!1sen!2sus`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="V7 Marketplace Corporation Office Location"
            />
          </div>
          
          {/* Map Overlay Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-slate-900/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-primary text-sm font-semibold text-white">V7 Marketplace Corporation</h4>
                  <p className="font-accent text-xs text-slate-300 truncate">225 N Pace Blvd. Suite 225, Pensacola, FL 32505</p>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title="Get Directions"
                >
                  <Navigation className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}