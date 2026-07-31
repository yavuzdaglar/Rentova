import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Fuel, Users, ArrowUpRight, 
  Instagram, Twitter, Facebook, ArrowUp, 
  Search, Filter, ChevronLeft, ChevronRight, ArrowLeft, Gauge, ChevronDown
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Hepsi');
  const [selectedBrand, setSelectedBrand] = useState<string>('Hepsi');
  const [selectedFuel, setSelectedFuel] = useState<string>('Hepsi');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('Hepsi');
  const [selectedSeats, setSelectedSeats] = useState<string>('Hepsi');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 36; // 4x9 grid

  const carTypes = ['Hepsi', ...TYPES_LIST];
  const brands = ['Hepsi', ...BRANDS_LIST].sort();
  const fuelTypes = ['Hepsi', ...FUEL_LIST];
  const transmissionTypes = ['Hepsi', 'Otomatik', 'Manuel'];
  const seatOptions = ['Hepsi', '2', '4', '5', '7'];

  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'Hepsi' || car.type === selectedType;
      const matchesBrand = selectedBrand === 'Hepsi' || car.brand === selectedBrand;
      const matchesFuel = selectedFuel === 'Hepsi' || car.specs.fuel === selectedFuel;
      const matchesTransmission = selectedTransmission === 'Hepsi' || car.specs.transmission === selectedTransmission;
      const matchesSeats = selectedSeats === 'Hepsi' || car.specs.seats.toString() === selectedSeats;
      
      return matchesSearch && matchesType && matchesBrand && matchesFuel && matchesTransmission && matchesSeats;
    });
  }, [searchQuery, selectedType, selectedBrand, selectedFuel, selectedTransmission, selectedSeats]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const paginatedCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setSelectedType('Hepsi');
    setSelectedBrand('Hepsi');
    setSelectedFuel('Hepsi');
    setSelectedTransmission('Hepsi');
    setSelectedSeats('Hepsi');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-brand-black selection:text-white">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-gray/30 h-20 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative">
          <button 
            onClick={() => window.history.back()}
            className="w-12 h-12 rounded-full border border-brand-gray/30 flex items-center justify-center hover:bg-brand-light transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tighter absolute left-1/2 -translate-x-1/2">
            RENTOVA<span className="text-brand-anthracite">.</span>
          </h1>

          <div className="w-12 h-12" /> {/* Spacer for symmetry */}
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-anthracite/40" size={20} />
            <input 
              type="text" 
              placeholder="Hayalinizdeki aracı arayın (örn: Porsche, Tesla...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-brand-light border border-brand-gray/30 rounded-3xl py-6 pl-16 pr-6 text-lg outline-none focus:border-brand-black transition-all"
            />
          </div>
        </div>

        {/* Detailed Filters */}
        <div className="space-y-8 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-anthracite/40 flex items-center gap-2">
              <Filter size={16} /> Filtreleme Seçenekleri
            </h2>
            <button 
              onClick={resetFilters}
              className="text-xs font-bold uppercase tracking-widest text-brand-black hover:underline transition-all"
            >
              Filtreleri Temizle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Brand Filter */}
            <SearchableSelect 
              label="Marka"
              options={brands}
              value={selectedBrand}
              onChange={(val) => { setSelectedBrand(val); setCurrentPage(1); }}
              placeholder="Marka ara..."
            />

            {/* Category Filter */}
            <SearchableSelect 
              label="Kategori"
              options={carTypes}
              value={selectedType}
              onChange={(val) => { setSelectedType(val); setCurrentPage(1); }}
              placeholder="Kategori ara..."
            />

            {/* Transmission Filter */}
            <SearchableSelect 
              label="Vites Türü"
              options={transmissionTypes}
              value={selectedTransmission}
              onChange={(val) => { setSelectedTransmission(val); setCurrentPage(1); }}
              placeholder="Vites ara..."
            />

            {/* Fuel Filter */}
            <SearchableSelect 
              label="Yakıt Türü"
              options={fuelTypes}
              value={selectedFuel}
              onChange={(val) => { setSelectedFuel(val); setCurrentPage(1); }}
              placeholder="Yakıt ara..."
            />

            {/* Seats Filter */}
            <SearchableSelect 
              label="Koltuk Sayısı"
              options={seatOptions.map(s => s === 'Hepsi' ? s : `${s} Koltuk`)}
              value={selectedSeats === 'Hepsi' ? 'Hepsi' : `${selectedSeats} Koltuk`}
              onChange={(val) => { 
                const actualValue = val === 'Hepsi' ? 'Hepsi' : val.split(' ')[0];
                setSelectedSeats(actualValue); 
                setCurrentPage(1); 
              }}
              placeholder="Koltuk ara..."
            />
          </div>
        </div>

        {/* Car Grid */}
        {paginatedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {paginatedCars.map(car => (
              <motion.div 
                key={car.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white rounded-[2rem] border border-brand-gray/30 overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-wider border border-brand-gray/20">{car.type}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest mb-1">{car.brand}</p>
                    <h3 className="text-xl font-display font-bold truncate">{car.name}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-brand-anthracite/40 uppercase">
                      <Fuel size={12} /> {car.specs.fuel}
                    </div>
                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-brand-anthracite/40 uppercase">
                      <Gauge size={12} /> {car.specs.transmission}
                    </div>
                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-brand-anthracite/40 uppercase">
                      <Users size={12} /> {car.specs.seats}
                    </div>
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-brand-gray/20">
                    <div>
                      <p className="text-lg font-display font-bold">{car.price} TL</p>
                      <p className="text-[9px] font-bold text-brand-anthracite/40 uppercase tracking-widest">/ Gün</p>
                    </div>
                    <button className="p-3 bg-brand-light group-hover:bg-brand-black group-hover:text-white rounded-xl transition-all">
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-brand-anthracite/40 text-lg font-medium">Aradığınız kriterlere uygun araç bulunamadı.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="w-12 h-12 rounded-full border border-brand-gray/30 flex items-center justify-center hover:bg-brand-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-black transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${
                    currentPage === page ? 'bg-brand-black text-white' : 'hover:bg-brand-light'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-12 h-12 rounded-full border border-brand-gray/30 flex items-center justify-center hover:bg-brand-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-black transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
