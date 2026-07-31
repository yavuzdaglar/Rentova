import React from 'react';
import { motion } from 'motion/react';
import { Search, ArrowLeft, ArrowUpRight, Car as CarIcon } from 'lucide-react';
import { FleetCar, Booking } from '../../types';
import { MONTHS } from '../../constants';

interface CalendarProps {
  mockFleet: FleetCar[];
  mockBookings: Booking[];
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

const Calendar: React.FC<CalendarProps> = ({
  mockFleet,
  mockBookings,
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
  const calendarItemsPerPage = 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-950 border border-zinc-800 rounded-[3rem] p-8 md:p-12 shadow-2xl"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-white">Rezervasyon Takvimi</h2>
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Takvim için araç seçin</p>
      </div>

      {/* Car Search for Calendar */}
      <div className="mb-8 relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          placeholder="Takvimde araç ara..." 
          value={calendarSearch}
          onChange={(e) => {
            setCalendarSearch(e.target.value);
            setCalendarPage(1);
          }}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-16 pr-8 text-sm text-white outline-none focus:border-emerald-500 transition-all"
        />
      </div>

      {/* Car Selection Grid for Calendar (2x4) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {mockFleet
          .filter(car => car.model.toLowerCase().includes(calendarSearch.toLowerCase()) || car.brand.toLowerCase().includes(calendarSearch.toLowerCase()))
          .slice((calendarPage - 1) * calendarItemsPerPage, calendarPage * calendarItemsPerPage)
          .map((car) => (
          <button
            key={car.id}
            onClick={() => setSelectedCalendarCar(car.id)}
            className={`p-4 rounded-3xl border transition-all text-left group ${
              selectedCalendarCar === car.id 
              ? 'bg-zinc-900 border-emerald-500 shadow-xl shadow-emerald-500/10' 
              : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="aspect-video rounded-2xl overflow-hidden mb-4">
              <img src={car.image} alt={car.model} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">{car.brand}</p>
            <h4 className="text-sm font-bold text-white group-hover:text-emerald-500 transition-colors">{car.model}</h4>
          </button>
        ))}
      </div>

      {/* Calendar Pagination */}
      {mockFleet.filter(car => car.model.toLowerCase().includes(calendarSearch.toLowerCase()) || car.brand.toLowerCase().includes(calendarSearch.toLowerCase())).length > calendarItemsPerPage && (
        <div className="flex justify-center gap-2 mb-12">
          {Array.from({ length: Math.ceil(mockFleet.filter(car => car.model.toLowerCase().includes(calendarSearch.toLowerCase()) || car.brand.toLowerCase().includes(calendarSearch.toLowerCase())).length / calendarItemsPerPage) }).map((_, i) => (
            <button 
              key={i}
              onClick={() => setCalendarPage(i + 1)}
              className={`w-8 h-8 rounded-lg font-bold text-[10px] transition-all ${
                calendarPage === i + 1 ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {selectedCalendarCar ? (
        <div className="space-y-12">
          {/* Month/Year Selector & Legend */}
          <div className="flex flex-col items-center gap-8 mb-12">
            <div className="flex items-center gap-8 bg-zinc-900/50 p-4 rounded-[2rem] border border-zinc-800 shadow-xl">
              <button 
                onClick={handlePrevMonth}
                className="w-12 h-12 flex items-center justify-center hover:bg-zinc-800 rounded-2xl transition-all text-zinc-400 hover:text-white border border-zinc-800"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex flex-col items-center min-w-[180px]">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Seçili Dönem</span>
                <span className="text-xl font-display font-black text-white tracking-widest">
                  {MONTHS[currentMonth]} {currentYear}
                </span>
              </div>
              <button 
                onClick={handleNextMonth}
                className="w-12 h-12 flex items-center justify-center hover:bg-zinc-800 rounded-2xl transition-all text-zinc-400 hover:text-white border border-zinc-800"
              >
                <ArrowUpRight size={20} className="rotate-45" />
              </button>
            </div>

            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Seçili Gün</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg bg-zinc-800 border border-zinc-700"></div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Dolu / Rezerve</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((dayName) => (
              <div key={dayName} className="text-center py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{dayName}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 mb-12">
            {Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }).map((_, i) => {
              const day = i + 1;
              const reservation = mockBookings.find(b => b.carId === selectedCalendarCar && parseInt(b.startDate.split(' ')[0]) <= day && parseInt(b.endDate.split(' ')[0]) >= day);
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center border transition-all relative group/day ${
                    reservation 
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-500' 
                    : 'bg-zinc-900/30 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <span className="text-xs font-bold">{day}</span>
                  {reservation && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-2xl opacity-0 invisible group-hover/day:opacity-100 group-hover/day:visible transition-all z-50 pointer-events-none">
                      <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-2">REZERVASYON BİLGİSİ</p>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">MÜŞTERİ</p>
                          <p className="text-sm text-white font-bold">{reservation.user}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">E-POSTA</p>
                          <p className="text-xs text-zinc-400">{reservation.email}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">TELEFON</p>
                          <p className="text-xs text-zinc-400">{reservation.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-10 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Başlangıç Tarihi</p>
              <p className="text-xl font-display font-bold text-white">17 Mart 2026</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Bitiş Tarihi</p>
              <p className="text-xl font-display font-bold text-white">20 Mart 2026</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Toplam Süre</p>
              <p className="text-xl font-display font-bold text-white">3 Gün</p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-zinc-900 border border-zinc-800 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-1">Ödeme Özeti</p>
              <p className="text-white text-sm">Günlük {mockFleet.find(c => c.id === selectedCalendarCar)?.price} × 3 Gün</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Toplam Tutar</p>
                <p className="text-4xl font-display font-bold text-white">7,500 TL</p>
              </div>
              <button className="px-10 py-5 bg-emerald-500 text-black rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
                Hemen Rezerve Et
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-700">
            <CarIcon size={32} />
          </div>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Takvimi görüntülemek için yukarıdan bir araç seçin.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Calendar;
