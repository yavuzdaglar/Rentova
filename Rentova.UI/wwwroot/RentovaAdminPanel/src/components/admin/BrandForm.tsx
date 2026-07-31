import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

interface BrandFormProps {
  setActiveTab: (tab: any) => void;
}

const BrandForm: React.FC<BrandFormProps> = ({ setActiveTab }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 rounded-[3rem] p-12"
    >
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
          <TrendingUp size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-display font-black text-white">Yeni Marka Ekle</h2>
          <p className="text-zinc-500 text-sm">Sisteme yeni bir otomobil markası tanımlayın.</p>
        </div>
      </div>

      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setActiveTab('fleet'); }}>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">MARKA ADI</label>
          <input type="text" placeholder="Örn: Tesla" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-emerald-500 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">MARKA LOGOSU (URL)</label>
          <input type="text" placeholder="https://..." className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-emerald-500 transition-all" />
        </div>

        <div className="pt-8 flex gap-4">
          <button type="button" onClick={() => setActiveTab('fleet')} className="flex-1 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm font-bold text-zinc-400 hover:text-white transition-all">İptal</button>
          <button type="submit" className="flex-[2] py-5 bg-emerald-500 text-black rounded-2xl text-sm font-black hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20">Markayı Kaydet</button>
        </div>
      </form>
    </motion.div>
  );
};

export default BrandForm;
