import React from 'react';
import { motion } from 'motion/react';
import { Car as CarIcon, Edit2, Search } from 'lucide-react';
import { FleetCar } from '../../types';

interface CarFormProps {
  editingCar: FleetCar | null;
  setEditingCar: (car: FleetCar | null) => void;
  setActiveTab: (tab: any) => void;
}

const CarForm: React.FC<CarFormProps> = ({ editingCar, setEditingCar, setActiveTab }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 rounded-[3rem] p-12"
    >
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
          {editingCar ? <Edit2 size={32} /> : <CarIcon size={32} />}
        </div>
        <div>
          <h2 className="text-3xl font-display font-black text-white">{editingCar ? 'Aracı Düzenle' : 'Yeni Araç Ekle'}</h2>
          <p className="text-zinc-500 text-sm">{editingCar ? `${editingCar.brand} ${editingCar.model} aracını güncelliyorsunuz.` : 'Filoya yeni bir araç dahil edin.'}</p>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); setEditingCar(null); setActiveTab('fleet'); }}>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">ARAÇ MODELİ</label>
          <input type="text" defaultValue={editingCar?.model} placeholder="Örn: Tesla Model S" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-emerald-500 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">GÜNLÜK FİYAT</label>
          <input type="number" defaultValue={editingCar?.price.replace(/[^0-9]/g, '')} placeholder="Örn: 2500" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-emerald-500 transition-all" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">ARAÇ GÖRSELİ (URL)</label>
          <input type="text" defaultValue={editingCar?.image} placeholder="https://..." className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-emerald-500 transition-all" />
        </div>

        {/* Searchable Lists */}
        {[
          { label: 'MARKA SEÇİN', options: ['Tesla', 'Porsche', 'Mercedes', 'Audi', 'BMW', 'Lamborghini', 'Ferrari', 'Bentley', 'Rolls Royce'], value: editingCar?.brand },
          { label: 'YAKIT TİPİ', options: ['Elektrik', 'Benzin', 'Dizel', 'Hibrit'], value: editingCar?.fuel },
          { label: 'VİTES TİPİ', options: ['Otomatik', 'Manuel', 'Yarı Otomatik'], value: 'Otomatik' },
          { label: 'KOLTUK SAYISI', options: ['2', '4', '5', '7', '9+'], value: editingCar?.seats?.toString() || '5' }
        ].map((field) => (
          <div key={field.label} className="space-y-4">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">{field.label}</label>
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                <input type="text" placeholder="Ara..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-xs text-white outline-none focus:border-emerald-500/50 transition-all" />
              </div>
              <div className="max-h-40 overflow-y-auto no-scrollbar space-y-1">
                {field.options.map(opt => (
                  <button 
                    key={opt}
                    type="button"
                    className={`w-full text-left px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      field.value === opt ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <label className="flex items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer hover:border-emerald-500 transition-all">
            <input type="checkbox" defaultChecked={editingCar?.mainScreen} className="w-5 h-5 accent-emerald-500" />
            <span className="text-xs font-bold text-zinc-300">Ana Sayfa</span>
          </label>
          <label className="flex items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer hover:border-emerald-500 transition-all">
            <input type="checkbox" defaultChecked={editingCar?.popularScreen1} className="w-5 h-5 accent-emerald-500" />
            <span className="text-xs font-bold text-zinc-300">Popüler 1</span>
          </label>
          <label className="flex items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer hover:border-emerald-500 transition-all">
            <input type="checkbox" defaultChecked={editingCar?.popularScreen2} className="w-5 h-5 accent-emerald-500" />
            <span className="text-xs font-bold text-zinc-300">Popüler 2</span>
          </label>
        </div>

        <div className="md:col-span-2 pt-8 flex gap-4">
          <button type="button" onClick={() => { setEditingCar(null); setActiveTab('fleet'); }} className="flex-1 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm font-bold text-zinc-400 hover:text-white transition-all">İptal</button>
          <button type="submit" className="flex-[2] py-5 bg-emerald-500 text-black rounded-2xl text-sm font-black hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20">
            {editingCar ? 'Değişiklikleri Kaydet' : 'Aracı Kaydet'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CarForm;
