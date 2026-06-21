'use client';

import { useState } from 'react';
import { Search, PlaneTakeoff, PlaneLanding, Calendar, CreditCard, Loader2 } from 'lucide-react';

interface FlightOption {
  airline: string;
  flight_number: string;
  departure_time: string;
  cash_price: number;
  points_required: number;
}

export default function FlightSearchPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FlightOption[] | null>(null);
  
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    card_network: 'Chase Ultimate Rewards',
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    
    try {
      const res = await fetch('/api/flights/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-900/20 to-transparent rounded-full blur-[120px]"></div>
      </div>

      <main className="relative max-w-6xl mx-auto px-6 py-16 flex flex-col gap-12 items-center">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <PlaneTakeoff size={14} />
            <span>AI-Powered Point Valuations</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white/60">
            Flight Token Price
          </h1>
          <p className="text-zinc-400 text-lg">
            Maximize your credit card rewards. Find the best flight redemptions instantly using intelligent point analysis.
          </p>
        </div>

        {/* Search Form Card */}
        <div className="w-full max-w-4xl p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
          <form onSubmit={handleSearch} className="w-full bg-[#111111]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Origin</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <PlaneTakeoff size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. JFK"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Destination</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <PlaneLanding size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LHR"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Calendar size={18} />
                  </div>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Card Program</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <CreditCard size={18} />
                  </div>
                  <select
                    value={formData.card_network}
                    onChange={(e) => setFormData({ ...formData, card_network: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all appearance-none"
                  >
                    <option>Chase Ultimate Rewards</option>
                    <option>Amex Membership Rewards</option>
                    <option>Capital One Miles</option>
                    <option>Citi ThankYou</option>
                  </select>
                </div>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Analyzing Redemptions...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Search Flights
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Grid */}
        {results && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Available Redemptions</h2>
              <span className="text-zinc-400 text-sm">{results.length} options found</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((flight, idx) => {
                const departureDate = new Date(flight.departure_time);
                const timeString = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                return (
                  <div key={idx} className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/50 transition-colors duration-500">
                    <div className="bg-[#111111] h-full rounded-2xl p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden">
                      {/* Glow effect on hover */}
                      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="font-medium text-lg text-white">{flight.airline}</p>
                          <p className="text-zinc-500 text-sm">{flight.flight_number}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-sm text-zinc-300 font-medium">
                          {timeString}
                        </div>
                      </div>
                      
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Cash Price</p>
                            <p className="text-xl font-semibold text-zinc-300">${flight.cash_price.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-purple-400 uppercase tracking-wider mb-1 font-semibold">Reward Cost</p>
                            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                              {flight.points_required.toLocaleString()} pts
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}
