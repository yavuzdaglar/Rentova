import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Activity, MessageSquare, ShieldAlert, MoreVertical } from 'lucide-react';
import { Booking } from '../../types';

interface OverviewProps {
  mockBookings: Booking[];
  selectedCarFilter: string | null;
}

const Overview: React.FC<OverviewProps> = ({ mockBookings, selectedCarFilter }) => {
  const stats = [
    { label: 'Toplam Gelir', value: '1.2M TL', icon: <TrendingUp size={24} />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Aktif Kiralamalar', value: '42', icon: <Activity size={24} />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Bekleyen Mesajlar', value: '12', icon: <MessageSquare size={24} />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Toksik Uyarılar', value: '3', icon: <ShieldAlert size={24} />, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-950 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-zinc-700 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-display font-black text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-[3rem] overflow-hidden">
        <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-xl font-display font-bold text-white">Son Rezervasyonlar</h3>
          <button className="text-xs font-bold text-emerald-500 uppercase tracking-widest hover:underline">Tümünü Gör</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                <th className="px-8 py-6">Müşteri</th>
                <th className="px-8 py-6">Araç</th>
                <th className="px-8 py-6">Tarih</th>
                <th className="px-8 py-6">Tutar</th>
                <th className="px-8 py-6">Durum</th>
                <th className="px-8 py-6 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockBookings
                .filter(booking => !selectedCarFilter || booking.car === selectedCarFilter)
                .map((booking) => (
                <tr key={booking.id} className="border-b border-zinc-800/30 hover:bg-zinc-900/30 transition-colors">
                  <td className="px-8 py-6 font-bold text-white">{booking.user}</td>
                  <td className="px-8 py-6 text-zinc-400">{booking.car}</td>
                  <td className="px-8 py-6 text-zinc-500 text-xs">{booking.startDate}</td>
                  <td className="px-8 py-6 font-bold text-emerald-500">{booking.amount}</td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      booking.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-500' :
                      booking.status === 'Tamamlandı' ? 'bg-zinc-800 text-zinc-400' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-zinc-500 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;
