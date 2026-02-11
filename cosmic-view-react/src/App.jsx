import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(false);
    
    // We encode the query to handle spaces (e.g., "Orion Nebula" -> "Orion%20Nebula")
    const encodedLocation = encodeURIComponent(query);
    
    // Direct URL to the DSS (Digitized Sky Survey)
    const url = `https://skyview.gsfc.nasa.gov/current/cgi/runquery.pl?Survey=DSS&Position=${encodedLocation}&Return=JPG&Scaling=Log`;
    
    // We set the URL immediately. The <img> tag's onLoad/onError events will handle the rest.
    setImgUrl(url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        
        {/* Header */}
        <div className="p-6 text-center border-b border-slate-700">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Cosmic View
          </h1>
          <p className="text-slate-400 text-sm mt-2">NASA SkyView Telescope Interface</p>
        </div>

        {/* Search Form */}
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. M31, Saturn, Crab Nebula"
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Scan
            </button>
          </form>
        </div>

        {/* Display Area */}
        <div className="relative w-full aspect-square bg-black flex items-center justify-center">
          
          {/* Initial State */}
          {!imgUrl && !loading && (
            <div className="text-slate-600 flex flex-col items-center">
              <span className="text-4xl mb-2">🔭</span>
              <span>Ready to observe</span>
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10 text-red-400">
              <p>Signal Lost (Object not found)</p>
            </div>
          )}

          {/* The Image */}
          {imgUrl && (
            <img 
              src={imgUrl} 
              alt="Space view" 
              className={`w-full h-full object-cover transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
          )}
        </div>
        
        {/* Footer info */}
        <div className="bg-slate-900 p-3 text-xs text-center text-slate-500">
          Data provided by NASA High Energy Astrophysics Science Archive Research Center
        </div>
      </div>
    </div>
  );
}

export default App;