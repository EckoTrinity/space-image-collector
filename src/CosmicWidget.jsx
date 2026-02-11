import { useState, useEffect } from 'react';
import { Search, Shuffle, ExternalLink } from 'lucide-react'; // Optional icons, see note below

// A curated list of stunning objects for the "Shuffle" feature
const COSMIC_PRESETS = [
  { name: "Pillars of Creation", id: "M16" },
  { name: "Andromeda Galaxy", id: "M31" },
  { name: "Butterfly Nebula", id: "NGC 6302" },
  { name: "Sombrero Galaxy", id: "M104" },
  { name: "Orion Nebula", id: "M42" },
  { name: "Crab Nebula", id: "M1" },
  { name: "Horsehead Nebula", id: "Barnard 33" },
];

const CosmicWidget = () => {
  // Default to the first preset (Pillars of Creation)
  const [target, setTarget] = useState(COSMIC_PRESETS[0]); 
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [customInput, setCustomInput] = useState("");

  // Construct URL
  const getUrl = (id) => {
    const encoded = encodeURIComponent(id);
    // Requesting a slightly smaller image (300px) for widget performance
    return `https://skyview.gsfc.nasa.gov/current/cgi/runquery.pl?Survey=DSS&Position=${encoded}&Return=JPG&Scaling=Log&Size=0.3`;
  };

  const handleRandom = () => {
    setLoading(true);
    setImageError(false);
    // Pick a random preset different from current
    let next;
    do {
      next = COSMIC_PRESETS[Math.floor(Math.random() * COSMIC_PRESETS.length)];
    } while (next.id === target.id);
    setTarget(next);
    setCustomInput("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setLoading(true);
    setImageError(false);
    setTarget({ name: customInput, id: customInput });
  };

  return (
    <div className="group relative w-full max-w-[320px] bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl transition-all hover:shadow-blue-900/20 hover:border-blue-500/50">
      
      {/* 1. Image Viewport */}
      <div className="relative aspect-square w-full bg-black overflow-hidden">
        
        {/* Loading State */}
        <div className={`absolute inset-0 z-10 flex items-center justify-center bg-slate-900 transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* The Image */}
        <img 
          src={getUrl(target.id)} 
          alt={target.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${loading ? 'scale-105 blur-sm' : 'scale-100 blur-0'}`}
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setImageError(true); }}
        />

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-red-400 text-xs p-4 text-center">
            <span>Signal Lost</span>
            <span className="opacity-50 mt-1">Could not resolve "{target.name}"</span>
          </div>
        )}

        {/* Overlay Title (Always visible at bottom) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
          <p className="text-xs text-blue-300 uppercase tracking-wider font-bold">Live Feed</p>
          <h3 className="text-white font-medium text-lg truncate">{target.name}</h3>
        </div>
      </div>

      {/* 2. Controls */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <form onSubmit={handleSearch} className="flex gap-2 mb-2">
          <input 
            type="text" 
            placeholder="Search object..." 
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="w-full bg-slate-800 text-xs text-white px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors">
            🔍
          </button>
        </form>

        <div className="flex justify-between items-center mt-2">
          <button 
            onClick={handleRandom}
            type="button"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors group/btn"
          >
            <span className="group-hover/btn:rotate-180 transition-transform duration-500">🎲</span> 
            Random Object
          </button>
          
          <span className="text-[10px] text-slate-600">DSS / NASA</span>
        </div>
      </div>
    </div>
  );
};

export default CosmicWidget;