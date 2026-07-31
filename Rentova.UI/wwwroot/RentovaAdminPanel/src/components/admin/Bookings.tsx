import React from 'react';
import { motion } from 'motion/react';
import { Booking, FleetCar } from '../../types';
import Calendar from './Calendar';

interface BookingsProps {
  mockBookings: Booking[];
  mockFleet: FleetCar[];
  selectedCarFilter: string | null;
  setSelectedCarFilter: (car: string | null) => void;
  selectedCalendarCar: string | null;
  setSelectedCalendarCar: (id: string | null) => void;
  calendarSearch: string;
  setCalendarSearch: (val: string) => void;
  calendarPage: number;
  setCalendarPage: (page: number) => void;
  currentMonth: number;
  currentYear: number;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

const Bookings: React.FC<BookingsProps> = ({
  mockBookings,
  mockFleet,
  selectedCarFilter,
  setSelectedCarFilter,
  selectedCalendarCar,
  setSelectedCalendarCar,
  calendarSearch,
  setCalendarSearch,
  calendarPage,
  setCalendarPage,
  currentMonth,
  currentYear,
  handlePrevMonth,
  handleNextMonth
}) => {
  return (
    <div className="space-y-12">
      <motion.div
        key="bookings-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950 border border-zinc-800 rounded-[3rem] overflow-hidden"
      >
        <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-xl font-display font-bold text-white">Tüm Rezervasyonlar</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-emerald-500 text-black rounded-xl text-xs font-bold hover:bg-emerald-400 transition-all">Dışa Aktar</button>
          </div>
        </div>

        {/* Car Selection Filter for Bookings Table */}
        <div className="p-8 border-b border-zinc-800/50 bg-zinc-900/10">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 ml-2">ARAÇ SEÇİN (TABLO FİLTRESİ)</p>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            <button 
              onClick={() => setSelectedCarFilter(null)}
              className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                selectedCarFilter === null ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'
              }`}
            >
              Tümü
            </button>
            {Array.from(new Set(mockBookings.map(b => b.car))).map(car => (
              <button 
                key={car}
                onClick={() => setSelectedCarFilter(car)}
                className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedCarFilter === car ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'
                }`}
              >
                {car}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                <th className="px-8 py-6">ID</th>
                <th className="px-8 py-6">Müşteri</th>
                <th className="px-8 py-6">Araç</th>
                <th className="px-8 py-6">Başlangıç</th>
                <th className="px-8 py-6">Bitiş</th>
                <th className="px-8 py-6">Tutar</th>
                <th className="px-8 py-6 text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockBookings
                .filter(booking => !selectedCarFilter || booking.car === selectedCarFilter)
                .map((booking) => (
                <tr key={booking.id} className="border-b border-zinc-800/30 hover:bg-zinc-900/30 transition-colors">
                  <td className="px-8 py-6 text-zinc-500 font-mono text-xs">{booking.id}</td>
                  <td className="px-8 py-6 font-bold text-white">{booking.user}</td>
                  <td className="px-8 py-6 text-zinc-400">{booking.car}</td>
                  <td className="px-8 py-6 text-zinc-500 text-xs">{booking.startDate}</td>
                  <td className="px-8 py-6 text-zinc-500 text-xs">{booking.endDate}</td>
                  <td className="px-8 py-6 font-bold text-emerald-500">{booking.amount}</td>
                  <td className="px-8 py-6 text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      booking.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-500' :
                      booking.status === 'Tamamlandı' ? 'bg-zinc-800 text-zinc-400' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Calendar 
        mockFleet={mockFleet}
        mockBookings={mockBookings}
        selectedCalendarCar={selectedCalendarCar}
        setSelectedCalendarCar={setSelectedCalendarCar}
        calendarSearch={calendarSearch}
        setCalendarSearch={setCalendarSearch}
        calendarPage={calendarPage}
        setCalendarPage={setCalendarPage}
        currentMonth={currentMonth}
        currentYear={currentYear}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />
    </div>
  );
};

export default Bookings;
