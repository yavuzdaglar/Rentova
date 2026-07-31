import React from 'react';
import { 
  LayoutDashboard, CreditCard, MessageSquare, Car as CarIcon, TrendingUp, ShieldAlert, LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Genel Bakış', icon: <LayoutDashboard size={20} /> },
    { id: 'bookings', label: 'Rezervasyonlar', icon: <CreditCard size={20} /> },
    { id: 'messages', label: 'Mesaj Yönetimi', icon: <MessageSquare size={20} /> },
    { id: 'fleet', label: 'Araç Filosu', icon: <CarIcon size={20} /> },
    { id: 'featured', label: 'Öne Çıkanlar', icon: <TrendingUp size={20} /> },
    { id: 'admins', label: 'Admin Ekle', icon: <ShieldAlert size={20} /> },
  ];

  return (
    <aside className="w-full md:w-72 bg-zinc-950 border-r border-zinc-800 p-8 flex flex-col">
      <div className="mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
            <CarIcon size={24} />
          </div>
          <div>
            <div className="text-2xl font-display font-black tracking-tighter text-white leading-none">
              RENTOVA
            </div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
              activeTab === item.id 
              ? 'bg-zinc-900 text-emerald-500 border border-zinc-800 shadow-2xl shadow-emerald-500/5' 
              : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
        
        <div className="pt-6 mt-6 border-t border-zinc-800 space-y-2">
          <button 
            onClick={() => setActiveTab('add-car')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-bold transition-all border border-dashed ${
              activeTab === 'add-car' ? 'bg-emerald-500 text-black border-emerald-500' : 'text-zinc-400 border-zinc-800 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <CarIcon size={18} />
            Araç Ekle
          </button>
          <button 
            onClick={() => setActiveTab('add-brand')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-bold transition-all border border-dashed ${
              activeTab === 'add-brand' ? 'bg-emerald-500 text-black border-emerald-500' : 'text-zinc-400 border-zinc-800 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <TrendingUp size={18} />
            Marka Ekle
          </button>
        </div>
      </nav>

      <div className="mt-auto pt-8 border-t border-zinc-800 space-y-4">
        <button className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
          <LogOut size={20} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
