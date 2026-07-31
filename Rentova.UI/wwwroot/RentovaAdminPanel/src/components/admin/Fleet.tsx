import React from 'react';
import { motion } from 'motion/react';
import { Filter, Edit2, Trash2 } from 'lucide-react';
import { FleetCar } from '../../types';

interface FleetProps {
  mockFleet: FleetCar[];
  fleetSearch: string;
  setFleetSearch: (val: string) => void;
  fleetPage: number;
  setFleetPage: (page: number) => void;
  setActiveTab: (tab: any) => void;
  setEditingCar: (car: FleetCar | null) => void;
}

const Fleet: React.FC<FleetProps> = ({
  mockFleet,
  fleetSearch,
  setFleetSearch,
  fleetPage,
  setFleetPage,
  setActiveTab,
  setEditingCar
}) => {
  const itemsPerPage = 8;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-zinc-950 border border-zinc-800 p-8 rounded-[2.5rem]">
        <div className="relative flex-1 w-full">
          <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input 
            type="text" 
            placeholder="Araç ismi ile ara..." 
            value={fleetSearch}
            onChange={(e) => setFleetSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-16 pr-8 text-sm text-white outline-none focus:border-emerald-500 transition-all"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={() => setActiveTab('add-car')} className="flex-1 md:flex-none px-8 py-4 bg-emerald-500 text-black rounded-2xl text-xs font-bold hover:bg-emerald-400 transition-all">Yeni Araç</button>
        </div>
      </div>

      <motion.div
        key="fleet"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {mockFleet
          .filter(car => `${car.brand} ${car.model}`.toLowerCase().includes(fleetSearch.toLowerCase()))
          .slice((fleetPage - 1) * itemsPerPage, fleetPage * itemsPerPage)
          .map((car) => (
          <div key={car.id} className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4">
                <span className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border ${
                  car.status === 'Müsait' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' :
                  car.status === 'Kirada' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' : 'bg-zinc-900/80 border-zinc-700 text-zinc-400'
                }`}>
                  {car.status}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.2em] mb-1">{car.brand}</p>
                <h3 className="text-lg font-display font-black text-white line-clamp-1">{car.model}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/50">
                <div className="space-y-1">
                  <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">YAKIT</p>
                  <p className="text-[10px] text-zinc-300 font-bold">{car.fuel}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">GÜNLÜK</p>
                  <p className="text-[10px] text-emerald-500 font-bold">{car.price}</p>
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button 
                  onClick={() => {
                    setEditingCar(car);
                    setActiveTab('add-car');
                  }}
                  className="flex-1 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-bold text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 size={12} /> Düzenle
                </button>
                <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-red-500 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: Math.ceil(mockFleet.length / itemsPerPage) }).map((_, i) => (
          <button 
            key={i}
            onClick={() => setFleetPage(i + 1)}
            className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
              fleetPage === i + 1 ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
