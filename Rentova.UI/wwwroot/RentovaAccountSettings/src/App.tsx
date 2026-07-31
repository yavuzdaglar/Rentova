import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo } from 'react';
import { 
  Users, ArrowUpRight, 
  CreditCard, User as UserIcon, Lock, ArrowLeft, Trash2, MessageSquare, Send, Clock, CheckCircle2, AlertTriangle
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

// --- Components ---


// --- Components ---

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'reservations' | 'settings' | 'messages'>('reservations');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  
  const mockReservations = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return [
      {
        id: 'RES-001',
        carName: 'Tesla Model S Plaid',
        image: IMAGES[0],
        startDate: new Date(2026, 1, 10),
        endDate: new Date(2026, 1, 15),
        price: 7500,
        status: 'Tamamlandı'
      },
      {
        id: 'RES-002',
        carName: 'Porsche 911 Carrera',
        image: IMAGES[1],
        startDate: new Date(2026, 4, 20),
        endDate: new Date(2026, 4, 25),
        price: 12500,
        status: 'Aktif'
      },
      {
        id: 'RES-003',
        carName: 'Mercedes G-Class',
        image: IMAGES[2],
        startDate: new Date(2025, 11, 1),
        endDate: new Date(2025, 11, 5),
        price: 9000,
        status: 'Tamamlandı'
      }
    ].map(res => ({
      ...res,
      isPast: res.endDate.getTime() < today
    }));
  }, []);

  const mockMessages = useMemo(() => [
    {
      id: 'MSG-001',
      title: 'Araç Teslimatı Hakkında',
      content: 'Aracı teslim alırken nelere dikkat etmeliyim? Sigorta kapsamı nedir?',
      status: 'Cevaplandı',
      date: '2024-03-15',
      replies: [
        { sender: 'Siz', text: 'Aracı teslim alırken nelere dikkat etmeliyim? Sigorta kapsamı nedir?', time: '10:00' },
        { sender: 'Destek', text: 'Merhaba Yavuz Bey, aracı teslim alırken dış aksamını kontrol etmenizi öneririz. Sigorta tüm kaza durumlarını kapsamaktadır.', time: '11:30' }
      ]
    },
    {
      id: 'MSG-002',
      title: 'Ödeme Sorunu',
      content: 'Kredi kartımdan iki kez çekim yapıldı, iade talep ediyorum.',
      status: 'Beklemede',
      date: '2024-03-16',
      replies: [
        { sender: 'Siz', text: 'Kredi kartımdan iki kez çekim yapıldı, iade talep ediyorum.', time: '14:20' }
      ]
    },
    {
      id: 'MSG-003',
      title: 'Şikayet',
      content: 'Bu nasıl bir hizmet, rezalet!',
      status: 'Toksik Mesaj',
      date: '2024-03-17',
      replies: [
        { sender: 'Siz', text: 'Bu nasıl bir hizmet, rezalet!', time: '09:15' }
      ]
    }
  ], []);

  const menuItems = [
    { id: 'reservations', label: 'Rezervasyonlarım', icon: <CreditCard size={20} /> },
    { id: 'messages', label: 'Mesajlar', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Hesap Ayarları', icon: <UserIcon size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-brand-light flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white border-r border-brand-gray/10 p-8 flex flex-col">
        <div className="mb-12">
          <div className="text-2xl font-display font-bold tracking-tighter text-brand-black">
            RENTOVA<span className="text-brand-anthracite">.</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? 'bg-brand-black text-white shadow-lg shadow-brand-black/10' 
                : 'text-brand-anthracite/50 hover:bg-brand-light hover:text-brand-black'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <button className="mt-auto flex items-center gap-4 px-6 py-4 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all">
          <ArrowLeft size={20} />
          Çıkış Yap
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'reservations' && (
              <motion.div
                key="reservations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-display font-bold text-brand-black">Rezervasyonlarım</h2>
                  <span className="px-4 py-2 bg-white border border-brand-gray/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-anthracite/40">
                    Toplam {mockReservations.length} Kayıt
                  </span>
                </div>

                <div className="space-y-6">
                  {mockReservations.map((res) => (
                    <div 
                      key={res.id}
                      className={`group bg-white rounded-[2.5rem] p-6 border border-brand-gray/10 flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-xl ${
                        res.isPast ? 'opacity-50 grayscale' : 'opacity-100'
                      }`}
                    >
                      <div className="w-full md:w-48 aspect-video rounded-3xl overflow-hidden">
                        <img src={res.image} alt={res.carName} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 space-y-2 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <h3 className="text-xl font-display font-bold text-brand-black">{res.carName}</h3>
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit ${
                            res.isPast ? 'bg-brand-gray/10 text-brand-anthracite/40' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            {res.status}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[11px] font-bold text-brand-anthracite/40 uppercase tracking-widest">
                          <div className="flex items-center gap-2">
                            <Users size={14} />
                            {res.startDate.toLocaleDateString('tr-TR')} - {res.endDate.toLocaleDateString('tr-TR')}
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard size={14} />
                            {res.price.toLocaleString('tr-TR')} TL
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={20} />
                        </button>
                        <button className="p-4 bg-brand-light rounded-2xl text-brand-black hover:bg-brand-black hover:text-white transition-all">
                          <ArrowUpRight size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-display font-bold text-brand-black">Mesajlar</h2>
                  {selectedMessage && (
                    <button 
                      onClick={() => setSelectedMessage(null)}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-anthracite/40 hover:text-brand-black transition-all"
                    >
                      <ArrowLeft size={14} /> Geri Dön
                    </button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {!selectedMessage ? (
                    <motion.div 
                      key="message-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-8"
                    >
                      {/* New Message Form */}
                      <div className="bg-white rounded-[2.5rem] p-8 border border-brand-gray/10 space-y-6">
                        <h3 className="text-lg font-display font-bold text-brand-black">Yeni Mesaj Gönder</h3>
                        <div className="space-y-4">
                          <input 
                            type="text" 
                            placeholder="Mesaj Başlığı" 
                            className="w-full bg-brand-light border border-brand-gray/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-brand-black transition-all"
                          />
                          <textarea 
                            placeholder="Mesajınız..." 
                            rows={4}
                            className="w-full bg-brand-light border border-brand-gray/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-brand-black transition-all resize-none"
                          />
                          <button className="flex items-center gap-3 px-8 py-4 bg-brand-black text-white rounded-2xl font-bold text-sm hover:bg-brand-anthracite transition-all shadow-xl shadow-brand-black/10">
                            <Send size={18} />
                            Gönder
                          </button>
                        </div>
                      </div>

                      {/* Message List */}
                      <div className="space-y-4">
                        {mockMessages.map((msg) => (
                          <button
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg)}
                            className="w-full bg-white rounded-[2rem] p-6 border border-brand-gray/10 flex items-center justify-between group hover:shadow-xl transition-all text-left"
                          >
                            <div className="flex items-center gap-6">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                msg.status === 'Cevaplandı' ? 'bg-emerald-100 text-emerald-600' :
                                msg.status === 'Toksik Mesaj' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                              }`}>
                                {msg.status === 'Cevaplandı' ? <CheckCircle2 size={24} /> :
                                 msg.status === 'Toksik Mesaj' ? <AlertTriangle size={24} /> : <Clock size={24} />}
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-brand-black">{msg.title}</h4>
                                <p className="text-xs text-brand-anthracite/40 line-clamp-1">{msg.content}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                                msg.status === 'Cevaplandı' ? 'bg-emerald-50 text-emerald-600' :
                                msg.status === 'Toksik Mesaj' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                              }`}>
                                {msg.status}
                              </span>
                              <ArrowUpRight size={20} className="text-brand-anthracite/20 group-hover:text-brand-black transition-all" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="message-detail"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-[3rem] p-8 border border-brand-gray/10 space-y-8"
                    >
                      <div className="pb-6 border-b border-brand-gray/10">
                        <h3 className="text-2xl font-display font-bold text-brand-black">{selectedMessage.title}</h3>
                        <p className="text-xs text-brand-anthracite/40 mt-1 uppercase tracking-widest font-bold">{selectedMessage.date}</p>
                      </div>

                      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
                        {selectedMessage.replies.map((reply: any, i: number) => (
                          <div key={i} className={`flex flex-col ${reply.sender === 'Siz' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[80%] p-5 rounded-3xl text-sm ${
                              reply.sender === 'Siz' ? 'bg-brand-black text-white rounded-tr-none' : 'bg-brand-light text-brand-black rounded-tl-none'
                            }`}>
                              <p className="font-bold text-[10px] uppercase tracking-widest mb-1 opacity-50">{reply.sender}</p>
                              <p>{reply.text}</p>
                              <p className="text-[8px] mt-2 opacity-30 text-right">{reply.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <h2 className="text-4xl font-display font-bold text-brand-black">Hesap Ayarları</h2>

                <div className="bg-white rounded-[3rem] p-10 border border-brand-gray/10 space-y-8">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest ml-4">Ad</label>
                      <input type="text" defaultValue="Yavuz" className="w-full bg-brand-light border border-brand-gray/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-brand-black transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest ml-4">Soyad</label>
                      <input type="text" defaultValue="Dağlar" className="w-full bg-brand-light border border-brand-gray/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-brand-black transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest ml-4">E-posta</label>
                      <input type="email" defaultValue="yavuz@example.com" className="w-full bg-brand-light border border-brand-gray/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-brand-black transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-brand-anthracite/40 uppercase tracking-widest ml-4">Telefon</label>
                      <input type="tel" defaultValue="+90 555 000 00 00" className="w-full bg-brand-light border border-brand-gray/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-brand-black transition-all" />
                    </div>
                  </form>

                  <div className="pt-8 border-t border-brand-gray/10 flex justify-end">
                    <button className="px-10 py-5 bg-brand-black text-white rounded-2xl font-bold hover:bg-brand-anthracite transition-all shadow-xl shadow-brand-black/10">
                      Değişiklikleri Kaydet
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <div className="selection:bg-brand-black selection:text-white">
      <ProfilePage />
    </div>
  );
}
