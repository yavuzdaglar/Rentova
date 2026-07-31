import { motion, useScroll, useSpring } from 'framer-motion';
import React, { useState, useRef } from 'react';
import { 
  User, Menu, ArrowRight, Calendar, MapPin, 
  Fuel, Gauge, Users, ArrowUpRight, 
  Shield, Zap, Clock, CreditCard, 
  Instagram, Twitter, Facebook, ArrowUp, 
  Mail, Send 
} from 'lucide-react';

// --- Constants ---
const CARS = [
  { id: '1', name: 'Model S Plaid', brand: 'Tesla', type: 'Electric', price: 1250, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800', specs: { transmission: 'Otomatik', fuel: 'Elektrik', seats: 5 } },
  { id: '2', name: '911 Carrera', brand: 'Porsche', type: 'Sport', price: 2400, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', specs: { transmission: 'PDK', fuel: 'Benzin', seats: 2 } },
  { id: '3', name: 'G-Class', brand: 'Mercedes', type: 'SUV', price: 3500, image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800', specs: { transmission: 'Otomatik', fuel: 'Benzin', seats: 5 } },
  { id: '4', name: 'RS6 Avant', brand: 'Audi', type: 'Luxury', price: 1800, image: 'https://images.unsplash.com/photo-1606148047413-569087093282?auto=format&fit=crop&q=80&w=800', specs: { transmission: 'Otomatik', fuel: 'Benzin', seats: 5 } },
];

const BRANDS = [
  { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Tesla_logo.svg' },
  { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Porsche-Logo.png' },
];

// --- Components ---
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-brand-gray/30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="/" className="text-2xl font-display font-bold tracking-tighter">RENTOVA<span className="text-brand-anthracite">.</span></a>
        </div>
      </div>
    </nav>
  );
};

const CarCard = ({ car }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] border border-brand-gray/30 overflow-hidden w-[320px]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-display font-bold">{car.name}</h3>
        <p className="text-2xl font-display font-bold">{car.price} TL</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CARS.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </main>
    </div>
  );
}
