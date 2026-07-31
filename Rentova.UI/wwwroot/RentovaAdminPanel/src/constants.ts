import { FleetCar, Booking, AdminMessage } from './types';

export const IMAGES = [
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

export const MONTHS = ['OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK'];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'BK-101', user: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '0555 111 2233', carId: 'FL-001', car: 'Tesla Model S', startDate: '17 Mart 2026', endDate: '20 Mart 2026', amount: '7,500 TL', status: 'Aktif' },
  { id: 'BK-102', user: 'Mehmet Demir', email: 'mehmet@example.com', phone: '0555 222 3344', carId: 'FL-002', car: 'Porsche 911', startDate: '15 Mart 2026', endDate: '18 Mart 2026', amount: '12,500 TL', status: 'Tamamlandı' },
  { id: 'BK-103', user: 'Ayşe Kaya', email: 'ayse@example.com', phone: '0555 333 4455', carId: 'FL-003', car: 'Mercedes G-Class', startDate: '12 Mart 2026', endDate: '14 Mart 2026', amount: '9,000 TL', status: 'İptal Edildi' },
];

export const MOCK_ADMIN_MESSAGES: AdminMessage[] = [
  { id: 'MSG-001', user: 'Yavuz Dağlar', email: 'yavuz@example.com', phone: '0555 000 00 01', title: 'Araç Teslimatı', content: 'Aracı teslim alırken nelere dikkat etmeliyim?', status: 'Cevaplandı', priority: 'Normal' },
  { id: 'MSG-002', user: 'Caner Öz', email: 'caner@example.com', phone: '0555 000 00 02', title: 'Ödeme Sorunu', content: 'Kredi kartımdan iki kez çekim yapıldı.', status: 'Beklemede', priority: 'Yüksek' },
  { id: 'MSG-003', user: 'Gizem Ak', email: 'gizem@example.com', phone: '0555 000 00 03', title: 'Şikayet', content: 'Bu nasıl bir hizmet, rezalet!', status: 'Toksik Mesaj', priority: 'Kritik' },
];

export const MOCK_FLEET: FleetCar[] = [
  { id: 'FL-001', brand: 'Tesla', model: 'Model S', plate: '34 AAA 001', status: 'Müsait', fuel: 'Elektrik', price: '2,500 TL', seats: 5, image: IMAGES[0], mainScreen: true, popularScreen1: true, popularScreen2: false },
  { id: 'FL-002', brand: 'Porsche', model: '911 Carrera', plate: '34 BBB 002', status: 'Kirada', fuel: 'Benzin', price: '4,500 TL', seats: 2, image: IMAGES[1], mainScreen: false, popularScreen1: true, popularScreen2: true },
  { id: 'FL-003', brand: 'Mercedes', model: 'G-Class', plate: '34 CCC 003', status: 'Bakımda', fuel: 'Dizel', price: '3,000 TL', seats: 5, image: IMAGES[2], mainScreen: true, popularScreen1: false, popularScreen2: true },
  { id: 'FL-004', brand: 'Audi', model: 'RS6 Avant', plate: '34 DDD 004', status: 'Müsait', fuel: 'Benzin', price: '3,800 TL', seats: 5, image: IMAGES[3], mainScreen: false, popularScreen1: false, popularScreen2: true },
  { id: 'FL-005', brand: 'BMW', model: 'M5 CS', plate: '34 EEE 005', status: 'Müsait', fuel: 'Benzin', price: '4,200 TL', seats: 5, image: IMAGES[4], mainScreen: true, popularScreen1: true, popularScreen2: true },
  { id: 'FL-006', brand: 'Range Rover', model: 'Sport', plate: '34 FFF 006', status: 'Kirada', fuel: 'Dizel', price: '3,500 TL', seats: 5, image: IMAGES[5], mainScreen: false, popularScreen1: false, popularScreen2: false },
  { id: 'FL-007', brand: 'Lamborghini', model: 'Urus', plate: '34 GGG 007', status: 'Müsait', fuel: 'Benzin', price: '8,500 TL', seats: 5, image: IMAGES[6], mainScreen: true, popularScreen1: true, popularScreen2: false },
  { id: 'FL-008', brand: 'Ferrari', model: 'F8 Tributo', plate: '34 HHH 008', status: 'Müsait', fuel: 'Benzin', price: '12,000 TL', seats: 2, image: IMAGES[7], mainScreen: false, popularScreen1: false, popularScreen2: true },
  { id: 'FL-009', brand: 'Bentley', model: 'Continental GT', plate: '34 JJJ 009', status: 'Müsait', fuel: 'Benzin', price: '9,500 TL', seats: 4, image: IMAGES[8], mainScreen: true, popularScreen1: false, popularScreen2: false },
  { id: 'FL-010', brand: 'Rolls Royce', model: 'Ghost', plate: '34 KKK 010', status: 'Müsait', fuel: 'Benzin', price: '15,000 TL', seats: 5, image: IMAGES[9], mainScreen: false, popularScreen1: true, popularScreen2: true },
];
