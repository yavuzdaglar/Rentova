import React from 'react';
import { FleetCar } from '../../types';

interface FeaturedProps {
  mockFleet: FleetCar[];
}

const Featured: React.FC<FeaturedProps> = ({ mockFleet }) => {
  return (
    <div className="space-y-12">
      {['mainScreen', 'popularScreen1', 'popularScreen2'].map((screen) => (
        <div key={screen} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest">
              {screen === 'mainScreen' ? 'Ana Sayfa Araçları' : screen === 'popularScreen1' ? 'Popüler Liste 1' : 'Popüler Liste 2'}
            </h3>
            <span className="text-[10px] text-emerald-500 font-bold px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              {mockFleet.filter(car => (car as any)[screen]).length} Araç
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFleet.filter(car => (car as any)[screen]).map((car) => (
              <div key={car.id} className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden group hover:border-zinc-700 transition-all">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.2em] mb-1">{car.brand}</p>
                  <h3 className="text-lg font-display font-black text-white line-clamp-1">{car.model}</h3>
                  <button className="w-full py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    Bu Bölümden Kaldır
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
