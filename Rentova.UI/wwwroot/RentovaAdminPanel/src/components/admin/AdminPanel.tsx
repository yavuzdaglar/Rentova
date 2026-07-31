import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Bookings from './Bookings';
import Fleet from './Fleet';
import CarForm from './CarForm';
import BrandForm from './BrandForm';
import Featured from './Featured';
import Messages from './Messages';
import Admins from './Admins';
import { MOCK_BOOKINGS, MOCK_FLEET, MOCK_ADMIN_MESSAGES } from '../../constants';
import { FleetCar, Admin, AdminMessage } from '../../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'messages' | 'fleet' | 'add-car' | 'add-brand' | 'featured' | 'admins'>('overview');
  const [selectedMsg, setSelectedMsg] = useState<AdminMessage | null>(null);
  const [msgFilter, setMsgFilter] = useState<'all' | 'toxic' | 'normal'>('all');
  const [selectedCalendarCar, setSelectedCalendarCar] = useState<string | null>(null);
  const [calendarSearch, setCalendarSearch] = useState('');
  const [currentMonth, setCurrentMonth] = useState(2); // March
  const [currentYear, setCurrentYear] = useState(2026);
  const [fleetSearch, setFleetSearch] = useState('');
  const [fleetPage, setFleetPage] = useState(1);
  const [msgPage, setMsgPage] = useState(1);
  const [calendarPage, setCalendarPage] = useState(1);
  const [editingCar, setEditingCar] = useState<FleetCar | null>(null);
  const [selectedCarFilter, setSelectedCarFilter] = useState<string | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([
    { email: 'admin@rentova.com', password: 'admin123' },
    { email: 'yavuz@rentova.com', password: 'yavuz_pass' }
  ]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Genel Bakış';
      case 'bookings': return 'Rezervasyonlar';
      case 'messages': return 'Mesaj Yönetimi';
      case 'fleet': return 'Araç Filosu';
      case 'featured': return 'Öne Çıkanlar';
      case 'admins': return 'Admin Ekle';
      case 'add-car': return editingCar ? 'Aracı Düzenle' : 'Yeni Araç Ekle';
      case 'add-brand': return 'Yeni Marka Ekle';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-emerald-500 selection:text-black">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-display font-black text-white mb-2">
                {getTitle()}
              </h1>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <Overview 
                mockBookings={MOCK_BOOKINGS} 
                selectedCarFilter={selectedCarFilter} 
              />
            )}

            {activeTab === 'bookings' && (
              <Bookings 
                mockBookings={MOCK_BOOKINGS}
                mockFleet={MOCK_FLEET}
                selectedCarFilter={selectedCarFilter}
                setSelectedCarFilter={setSelectedCarFilter}
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
            )}

            {activeTab === 'fleet' && (
              <Fleet 
                mockFleet={MOCK_FLEET}
                fleetSearch={fleetSearch}
                setFleetSearch={setFleetSearch}
                fleetPage={fleetPage}
                setFleetPage={setFleetPage}
                setActiveTab={setActiveTab}
                setEditingCar={setEditingCar}
              />
            )}

            {activeTab === 'add-car' && (
              <CarForm 
                editingCar={editingCar}
                setEditingCar={setEditingCar}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'add-brand' && (
              <BrandForm setActiveTab={setActiveTab} />
            )}

            {activeTab === 'featured' && (
              <Featured mockFleet={MOCK_FLEET} />
            )}

            {activeTab === 'messages' && (
              <Messages 
                mockAdminMessages={MOCK_ADMIN_MESSAGES}
                selectedMsg={selectedMsg}
                setSelectedMsg={setSelectedMsg}
                msgFilter={msgFilter}
                setMsgFilter={setMsgFilter}
                msgPage={msgPage}
                setMsgPage={setMsgPage}
              />
            )}

            {activeTab === 'admins' && (
              <Admins 
                admins={admins}
                setAdmins={setAdmins}
                newAdminEmail={newAdminEmail}
                setNewAdminEmail={setNewAdminEmail}
                newAdminPassword={newAdminPassword}
                setNewAdminPassword={setNewAdminPassword}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
