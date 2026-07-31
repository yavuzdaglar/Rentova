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

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-brand-light selection:bg-brand-black selection:text-white relative flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Back Button */}
      <button 
        onClick={() => window.history.back()}
        className="absolute top-8 left-8 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-brand-gray/20 flex items-center justify-center text-brand-black hover:bg-white transition-all shadow-sm"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Light Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Car Background" 
          className="w-full h-full object-cover opacity-20 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-brand-light/20 to-white/60" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-[3.5rem] border border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden p-10 md:p-14"
      >
        <div className="text-center mb-12">
          <div className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-brand-black mb-6">
            RENTOVA<span className="text-brand-anthracite">.</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-brand-black mb-3">
            {isLogin ? 'Hoş Geldiniz' : 'Hesap Oluşturun'}
          </h2>
          <p className="text-brand-anthracite/50 text-base">
            {isLogin ? 'Premium sürüş deneyimine giriş yapın.' : 'Rentova dünyasına ilk adımınızı atın.'}
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div 
                key="register-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-anthracite/30" size={20} />
                    <input type="text" placeholder="Ad" className="w-full bg-brand-light/50 border border-brand-gray/20 rounded-2xl py-5 pl-14 pr-5 text-sm text-brand-black outline-none focus:border-brand-black/20 focus:bg-white transition-all" />
                  </div>
                  <div className="relative">
                    <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-anthracite/30" size={20} />
                    <input type="text" placeholder="Soyad" className="w-full bg-brand-light/50 border border-brand-gray/20 rounded-2xl py-5 pl-14 pr-5 text-sm text-brand-black outline-none focus:border-brand-black/20 focus:bg-white transition-all" />
                  </div>
                </div>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-anthracite/30" size={20} />
                  <input type="tel" placeholder="Telefon" className="w-full bg-brand-light/50 border border-brand-gray/20 rounded-2xl py-5 pl-14 pr-5 text-sm text-brand-black outline-none focus:border-brand-black/20 focus:bg-white transition-all" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-anthracite/30" size={20} />
            <input type="email" placeholder="E-posta" className="w-full bg-brand-light/50 border border-brand-gray/20 rounded-2xl py-5 pl-14 pr-5 text-sm text-brand-black outline-none focus:border-brand-black/20 focus:bg-white transition-all" />
          </div>
          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-anthracite/30" size={20} />
            <input type="password" placeholder="Şifre" className="w-full bg-brand-light/50 border border-brand-gray/20 rounded-2xl py-5 pl-14 pr-5 text-sm text-brand-black outline-none focus:border-brand-black/20 focus:bg-white transition-all" />
          </div>

          <button className="w-full py-6 bg-brand-black text-white rounded-2xl font-bold text-lg hover:bg-brand-anthracite transition-all mt-6 shadow-xl shadow-brand-black/10">
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>

        <div className="mt-10 relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-gray/20"></div></div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold"><span className="bg-white px-6 text-brand-anthracite/30">Veya</span></div>
        </div>

        <button className="mt-10 w-full bg-white border border-brand-gray/20 text-brand-black rounded-2xl py-5 font-bold text-sm hover:bg-brand-light transition-all flex items-center justify-center gap-4 shadow-sm">
          <Chrome size={22} />
          Google ile {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
        </button>

        <p className="mt-10 text-center text-sm text-brand-anthracite/50">
          {isLogin ? 'Henüz hesabınız yok mu?' : 'Zaten hesabınız var mı?'} {' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-brand-black font-bold hover:underline">
            {isLogin ? 'Kayıt Olun' : 'Giriş Yapın'}
          </button>
        </p>
      </motion.div>

      {/* Admin Login Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-brand-black py-2 flex justify-center items-center z-20">
        <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
          Admin Giriş
        </button>
      </div>
    </div>
  );
}
