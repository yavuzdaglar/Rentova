import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Fuel, Users, ArrowUpRight, 
  Instagram, Twitter, Facebook, ArrowUp, 
  Search, Filter, ChevronLeft, ChevronRight, ArrowLeft, Gauge, ChevronDown,
  Mail, Lock, Phone, CreditCard, User as UserIcon, LogIn, Chrome
} from 'lucide-react';

// --- Types ---
interface Car {
  id: string;
  name: string;
  brand: string;
  type: 'Sedan' | 'SUV' | 'Sport' | 'Luxury' | 'Electric';
  price: number;
  image: string;
  specs: {
    transmission: string;
    fuel: string;
    seats: number;
  };
}

// --- Constants ---
const BRANDS_LIST = ['Tesla', 'Porsche', 'Mercedes', 'BMW', 'Audi', 'Ferrari', 'Lamborghini', 'Land Rover'];
const TYPES_LIST: Car['type'][] = ['Sedan', 'SUV', 'Sport', 'Luxury', 'Electric'];
const FUEL_LIST = ['Elektrik', 'Benzin', 'Dizel'];
const IMAGES = [
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1606148047413-569087093282?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=800'
];

// Generate 48 cars to ensure at least 4x9 grid can be filled or paginated
const CARS: Car[] = Array.from({ length: 48 }, (_, i) => {
  const brand = BRANDS_LIST[i % BRANDS_LIST.length];
  const type = TYPES_LIST[i % TYPES_LIST.length];
  const fuel = FUEL_LIST[i % FUEL_LIST.length];
  const image = IMAGES[i % IMAGES.length];
  
  return {
    id: (i + 1).toString(),
    brand,
    name: `${brand} ${type} Special Edition`,
    type,
    price: 1000 + (i * 100),
    image,
    specs: {
      transmission: 'Otomatik',
      fuel,
      seats: i % 2 === 0 ? 5 : 2
    }
  };
});

// --- Components ---

interface SearchableSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchableSelect({ label, options, value, onChange, placeholder = "Ara..." }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    return options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-3 relative" ref={containerRef}>
      <label className="text-xs font-bold text-brand-anthracite/60 uppercase tracking-wider">{label}</label>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-brand-light border border-brand-gray/30 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:border-brand-black transition-all flex items-center justify-between group"
      >
        <span className={value === 'Hepsi' ? 'text-brand-anthracite/40' : 'text-brand-black'}>
          {value === 'Hepsi' ? label : value}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-brand-gray/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-3 border-b border-brand-gray/10">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-anthracite/30" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder={placeholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-brand-light border border-brand-gray/20 rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-brand-black transition-all"
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto no-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-brand-light ${
                      value === opt ? 'bg-brand-light font-bold text-brand-black' : 'text-brand-anthracite/70'
                    }`}
                  >
                    {opt}
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-xs text-brand-anthracite/40 italic">
                  Sonuç bulunamadı
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="bg-brand-black text-white py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="text-2xl font-display font-bold tracking-tighter">RENTOVA<span className="text-brand-gray">.</span></span>
            <div className="flex gap-6">
              <a href="#" className="text-brand-gray/50 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-brand-gray/50 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-brand-gray/50 hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
          <button onClick={scrollToTop} className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-gray/50 hover:text-white transition-all">
            Başa dön
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all"><ArrowUp size={16} /></div>
          </button>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-gray/30 text-[10px] font-bold uppercase tracking-widest">© 2024 Rentova. Tüm hakları saklıdır.</p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-brand-gray/30">
            <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-white transition-colors">Şartlar</a>
            <a href="#" className="hover:text-white transition-colors">Çerezler</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Components ---

function ReservationPage({ onBack }: { onBack: () => void }) {
  const car = CARS[0];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [range, setRange] = useState<{ start: number | null, end: number | null }>({ start: null, end: null });
  
  // Mock reserved dates
  const reservedDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 5; i < 10; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      dates.push(d.setHours(0, 0, 0, 0));
    }
    return dates;
  }, []);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Adjust for Monday start if needed, but standard is Sunday (0)
    // Let's use Monday as first day (1)
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      days.push(d.setHours(0, 0, 0, 0));
    }
    return days;
  }, [currentMonth]);

  const handleDateClick = (timestamp: number) => {
    if (reservedDates.includes(timestamp)) return;

    if (!range.start || (range.start && range.end)) {
      setRange({ start: timestamp, end: null });
    } else {
      if (timestamp < range.start) {
        setRange({ start: timestamp, end: null });
      } else {
        // Check if any reserved date is in the range
        let hasReserved = false;
        const start = range.start;
        const end = timestamp;
        for (let t = start; t <= end; t += 86400000) {
          if (reservedDates.includes(t)) {
            hasReserved = true;
            break;
          }
        }
        if (!hasReserved) {
          setRange({ start, end: timestamp });
        } else {
          setRange({ start: timestamp, end: null });
        }
      }
    }
  };

  const selectedDates = useMemo(() => {
    if (!range.start) return [];
    if (!range.end) return [range.start];
    const dates = [];
    for (let t = range.start; t <= range.end; t += 86400000) {
      dates.push(t);
    }
    return dates;
  }, [range]);

  const totalDays = selectedDates.length;
  const totalPrice = totalDays * car.price;
  const startDate = range.start ? new Date(range.start) : null;
  const endDate = range.end ? new Date(range.end) : null;

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  return (
    <div className="min-h-screen bg-brand-light p-6 md:p-12">
      <button 
        onClick={onBack}
        className="mb-8 w-12 h-12 rounded-full bg-white border border-brand-gray/20 flex items-center justify-center text-brand-black hover:bg-brand-black hover:text-white transition-all shadow-sm"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section: Image and Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border border-white"
          >
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-full h-full object-cover aspect-video lg:aspect-square"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <p className="text-sm font-bold text-brand-anthracite/40 uppercase tracking-[0.3em] mb-2">{car.brand}</p>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-brand-black">{car.name}</h1>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-brand-gray/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-black">
                  <Gauge size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest">Vites</p>
                  <p className="font-bold text-brand-black">{car.specs.transmission}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-brand-gray/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-black">
                  <Fuel size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest">Yakıt</p>
                  <p className="font-bold text-brand-black">{car.specs.fuel}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-brand-gray/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-black">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest">Kapasite</p>
                  <p className="font-bold text-brand-black">{car.specs.seats} Kişi</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-brand-gray/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-black">
                  <CreditCard size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest">Günlük</p>
                  <p className="font-bold text-brand-black">{car.price} TL</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Reservation System */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-brand-gray/10"
        >
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-3xl font-display font-bold text-brand-black">Rezervasyon Takvimi</h2>
            
            <div className="flex items-center gap-4 bg-brand-light p-2 rounded-2xl border border-brand-gray/10">
              <button onClick={prevMonth} className="p-2 hover:bg-white rounded-xl transition-all"><ChevronLeft size={20} /></button>
              <span className="min-w-[140px] text-center font-bold uppercase tracking-widest text-sm">
                {currentMonth.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={nextMonth} className="p-2 hover:bg-white rounded-xl transition-all"><ChevronRight size={20} /></button>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-brand-anthracite/60 uppercase tracking-widest">Seçili</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-brand-gray/30" />
                <span className="text-xs font-bold text-brand-anthracite/60 uppercase tracking-widest">Dolu</span>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-12">
            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
              <div key={d} className="text-center py-2 text-[10px] font-bold text-brand-anthracite/30 uppercase tracking-widest">{d}</div>
            ))}
            {calendarDays.map((timestamp, idx) => {
              if (timestamp === null) return <div key={`empty-${idx}`} />;
              
              const isSelected = selectedDates.includes(timestamp);
              const isReserved = reservedDates.includes(timestamp);
              const isStart = range.start === timestamp;
              const isEnd = range.end === timestamp;
              const dateObj = new Date(timestamp);
              
              return (
                <button
                  key={timestamp}
                  onClick={() => handleDateClick(timestamp)}
                  disabled={isReserved}
                  className={`
                    aspect-square rounded-2xl flex flex-col items-center justify-center transition-all border relative
                    ${isReserved ? 'bg-brand-gray/10 border-brand-gray/5 text-brand-anthracite/20 cursor-not-allowed' : 
                      isSelected ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 z-10' : 
                      'bg-brand-light border-brand-gray/10 text-brand-black hover:border-brand-black'}
                    ${isStart ? 'ring-2 ring-brand-black ring-offset-2' : ''}
                    ${isEnd ? 'ring-2 ring-brand-black ring-offset-2' : ''}
                  `}
                >
                  <span className="text-lg font-display font-bold">{dateObj.getDate()}</span>
                </button>
              );
            })}
          </div>

          {/* Summary Section */}
          <div className="pt-10 border-t border-brand-gray/10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-[0.2em]">Başlangıç Tarihi</p>
              <p className="text-xl font-display font-bold text-brand-black">
                {startDate ? startDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Seçilmedi'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-[0.2em]">Bitiş Tarihi</p>
              <p className="text-xl font-display font-bold text-brand-black">
                {endDate ? endDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Seçilmedi'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-[0.2em]">Toplam Süre</p>
              <p className="text-xl font-display font-bold text-brand-black">{totalDays} Gün</p>
            </div>
          </div>

          {/* Price Section */}
          <div className="mt-12 p-8 bg-brand-black rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-1">Ödeme Özeti</p>
              <p className="text-white text-sm">Günlük <span className="font-bold">{car.price} TL</span> × {totalDays} Gün</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Toplam Tutar</p>
                <p className="text-4xl font-display font-bold text-white">{totalPrice.toLocaleString('tr-TR')} TL</p>
              </div>
              <button className="px-10 py-5 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
                Hemen Rezerve Et
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="selection:bg-brand-black selection:text-white">
      <ReservationPage onBack={() => {}} />
    </div>
  );
}
