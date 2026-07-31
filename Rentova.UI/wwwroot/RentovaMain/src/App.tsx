import { motion, useScroll, useSpring } from 'motion/react';
import React, { useState, useRef } from 'react';
import { 
  User, Menu, ArrowRight, Calendar, MapPin, 
  Fuel, Gauge, Users, ArrowUpRight, 
  Shield, Zap, Clock, CreditCard, 
  Instagram, Twitter, Facebook, ArrowUp, 
  Mail, Send 
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
const CARS: Car[] = [
  {
    id: '1',
    name: 'Model S Plaid',
    brand: 'Tesla',
    type: 'Electric',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Elektrik', seats: 5 },
  },
  {
    id: '2',
    name: '911 Carrera',
    brand: 'Porsche',
    type: 'Sport',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'PDK', fuel: 'Benzin', seats: 2 },
  },
  {
    id: '3',
    name: 'G-Class',
    brand: 'Mercedes',
    type: 'SUV',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Benzin', seats: 5 },
  },
  {
    id: '4',
    name: 'RS6 Avant',
    brand: 'Audi',
    type: 'Luxury',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1606148047413-569087093282?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Benzin', seats: 5 },
  },
  {
    id: '5',
    name: 'Taycan Turbo S',
    brand: 'Porsche',
    type: 'Electric',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Elektrik', seats: 4 },
  },
  {
    id: '6',
    name: 'Range Rover Sport',
    brand: 'Land Rover',
    type: 'SUV',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Dizel', seats: 5 },
  },
  {
    id: '7',
    name: 'M4 Competition',
    brand: 'BMW',
    type: 'Sport',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Benzin', seats: 4 },
  },
  {
    id: '8',
    name: 'Urus',
    brand: 'Lamborghini',
    type: 'SUV',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Benzin', seats: 5 },
  },
  {
    id: '9',
    name: 'F8 Tributo',
    brand: 'Ferrari',
    type: 'Sport',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Benzin', seats: 2 },
  },
  {
    id: '10',
    name: 'S-Class',
    brand: 'Mercedes',
    type: 'Luxury',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Dizel', seats: 5 },
  },
  {
    id: '11',
    name: 'Model X',
    brand: 'Tesla',
    type: 'Electric',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Elektrik', seats: 7 },
  },
  {
    id: '12',
    name: 'Q8',
    brand: 'Audi',
    type: 'SUV',
    price: 1750,
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Otomatik', fuel: 'Dizel', seats: 5 },
  },
];

const BRANDS = [
  { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Tesla_logo.svg' },
  { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Porsche-Logo.png' },
  { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Benz_logo.svg' },
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Audi_logo.svg' },
  { name: 'Land Rover', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Land_Rover_logo.svg' },
  { name: 'Ferrari', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Ferrari-Logo.svg' },
  { name: 'Lamborghini', logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Lamborghini_Logo.svg' },
  { name: 'Volvo', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Volvo-Iron-Mark.svg' },
  { name: 'Jaguar', logo: 'https://upload.wikimedia.org/wikipedia/en/4/44/Jaguar_2012_logo.png' },
  { name: 'Bentley', logo: 'https://upload.wikimedia.org/wikipedia/en/6/63/Bentley_logo.svg' },
  { name: 'Aston Martin', logo: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Aston_Martin_logo.svg' },
  { name: 'Maserati', logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Maserati_logo.svg' },
  { name: 'Rolls-Royce', logo: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Rolls-Royce_Motor_Cars_logo.svg' },
];

const FEATURES = [
  {
    icon: <Shield size={32} />,
    title: "Güvenli Rezervasyon",
    description: "Şifreli ödemelerimizle güvenliğiniz bizim için en öncelikli konudur."
  },
  {
    icon: <Zap size={32} />,
    title: "Anında Onay",
    description: "Yıldırım hızındaki doğrulama sürecimizle yola daha hızlı çıkın."
  },
  {
    icon: <Clock size={32} />,
    title: "7/24 Destek",
    description: "Özel konsiyerj ekibimiz size yardımcı olmak için her zaman burada."
  },
  {
    icon: <CreditCard size={32} />,
    title: "Esnek Ödeme",
    description: "Yaşam tarzınıza uygun çeşitli ödeme yöntemlerinden birini seçin."
  }
];

// --- Sub-Components ---

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-brand-gray/30"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="/" className="text-2xl font-display font-bold tracking-tighter">
            RENTOVA<span className="text-brand-anthracite">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-anthracite">
            <a href="#fleet" className="hover:text-brand-black transition-colors">Filo</a>
            <a href="#brands" className="hover:text-brand-black transition-colors">Markalar</a>
            <a href="#about" className="hover:text-brand-black transition-colors">Hakkımızda</a>
            <a href="#contact" className="hover:text-brand-black transition-colors">İletişim</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-black text-white rounded-full text-sm font-medium hover:bg-brand-anthracite transition-all">
            <User size={18} />
            <span>Giriş Yap</span>
          </button>
          <button className="md:hidden p-2 hover:bg-brand-light rounded-full transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero Car" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 bg-brand-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              Premium Araç Kiralama
            </span>
            <h1 className="text-7xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
              GELECEĞİ <br />
              <span className="text-brand-anthracite">BUGÜN</span> SÜRÜN
            </h1>
            <p className="text-lg text-brand-anthracite max-w-md mb-10 leading-relaxed">
              Lüks ve performansın zirvesini deneyimleyin. Rentova, dünyanın en prestijli araçlarından oluşan özel bir filo sunar.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center gap-2 group">
                Filoyu Keşfet
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  return (
    <motion.div whileHover={{ y: -10 }} className="group bg-white rounded-[2.5rem] border border-brand-gray/30 overflow-hidden hover:shadow-2xl transition-all duration-500 w-[320px] md:w-[400px] flex-shrink-0">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider border border-brand-gray/20">{car.type}</span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs font-bold text-brand-anthracite/40 uppercase tracking-widest mb-1">{car.brand}</p>
            <h3 className="text-2xl font-display font-bold">{car.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold">{car.price} TL</p>
            <p className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest">/ Gün</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 py-6 border-y border-brand-gray/20 mb-8">
          <div className="flex flex-col items-center gap-1">
            <Gauge size={18} className="text-brand-anthracite/40" />
            <span className="text-[10px] font-bold text-brand-anthracite/60 uppercase">{car.specs.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Fuel size={18} className="text-brand-anthracite/40" />
            <span className="text-[10px] font-bold text-brand-anthracite/60 uppercase">{car.specs.fuel}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Users size={18} className="text-brand-anthracite/40" />
            <span className="text-[10px] font-bold text-brand-anthracite/60 uppercase">{car.specs.seats} Koltuk</span>
          </div>
        </div>
        <button className="w-full py-4 bg-brand-light group-hover:bg-brand-black group-hover:text-white rounded-2xl font-bold transition-all duration-300">Hemen Kirala</button>
      </div>
    </motion.div>
  );
}

function CarGrid() {
  // Split cars into two rows for the marquee
  const firstRow = CARS.slice(0, Math.ceil(CARS.length / 2));
  const secondRow = CARS.slice(Math.ceil(CARS.length / 2));

  return (
    <section id="fleet" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="max-w-xl">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-anthracite/40 mb-4 block">Filomuz</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-display font-bold leading-tight">
            MÜKEMMEL SÜRÜŞÜ <br />
            <span className="text-brand-anthracite/30 italic">KEŞFEDİN</span>
          </motion.h2>
        </div>
      </div>

      <div className="space-y-12">
        {/* First Row Marquee */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee gap-8 py-4">
            {[...firstRow, ...firstRow].map((car, index) => (
              <CarCard key={`${car.id}-${index}`} car={car} />
            ))}
          </div>
        </div>

        {/* Second Row Marquee (Reverse or just offset) */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-reverse gap-8 py-4">
            {[...secondRow, ...secondRow].map((car, index) => (
              <CarCard key={`${car.id}-${index}`} car={car} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section id="brands" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-display font-bold leading-tight text-center"
        >
          MARKALARIMIZ
        </motion.h2>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee gap-12 py-4">
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 h-40 bg-brand-light rounded-[2.5rem] border border-brand-gray/20 flex items-center justify-center p-8 hover:bg-brand-gray transition-all duration-500"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500" 
                referrerPolicy="no-referrer" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="about" className="py-32 bg-brand-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-anthracite/40 mb-4 block">Neden Rentova</span>
          <h2 className="text-5xl font-display font-bold mb-6">RENTOVA DENEYİMİ</h2>
          <p className="text-brand-anthracite/60">Araç kiralamayı, sunduğumuz araçlar kadar kusursuz ve lüks olacak şekilde yeniden tanımladık.</p>
        </div>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee gap-8 py-4">
          {[...FEATURES, ...FEATURES, ...FEATURES, ...FEATURES].map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex-shrink-0 w-[300px] md:w-[400px] bg-white p-10 rounded-[2.5rem] border border-brand-gray/20 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 text-brand-black">{feature.icon}</div>
              <h3 className="text-xl font-display font-bold mb-4">{feature.title}</h3>
              <p className="text-sm text-brand-anthracite/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-black p-8 md:p-20 rounded-[4rem] border border-white/10 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-8">BİZE <br /><span className="text-brand-gray/40 italic">ULAŞIN</span></h2>
              <p className="text-brand-gray/50 text-lg mb-12 max-w-md">Herhangi bir sorunuz mu var? Ekibimiz size yardımcı olmaktan mutluluk duyacaktır.</p>
            </div>
            <div className="bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10 relative">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="İsim Soyisim" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-white/30 transition-all" />
                  <input type="email" placeholder="E-posta" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-white/30 transition-all" />
                </div>
                <textarea placeholder="Mesajınız..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-white/30 transition-all resize-none"></textarea>
                <button className="w-full flex items-center justify-center gap-2 py-5 bg-white text-brand-black rounded-2xl font-bold hover:bg-brand-gray transition-all"><Send size={18} /> Gönder</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen selection:bg-brand-black selection:text-white bg-white">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-black z-[60] origin-left" style={{ scaleX }} />
      <Navbar />
      <main>
        <Hero />
        <CarGrid />
        <Brands />
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto bg-brand-black rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-8">SIRADIŞI YOLCULUĞUNUZA <br /><span className="text-brand-gray/40 italic">BAŞLAMAYA</span> HAZIR MISINIZ?</h2>
              <p className="text-brand-gray/60 text-lg mb-10">Premium seyahat ihtiyaçları için Rentova'yı seçen binlerce memnun sürücüye katılın.</p>
              <button className="px-10 py-5 bg-white text-brand-black rounded-full font-bold hover:bg-brand-gray transition-all hover:scale-105 active:scale-95">Hemen Başlayın</button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000" alt="Car detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </section>
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
