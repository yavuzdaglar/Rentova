export interface Car {
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

export interface Booking {
  id: string;
  user: string;
  email: string;
  phone: string;
  carId: string;
  car: string;
  startDate: string;
  endDate: string;
  amount: string;
  status: string;
}

export interface AdminMessage {
  id: string;
  user: string;
  email: string;
  phone: string;
  title: string;
  content: string;
  status: string;
  priority: string;
}

export interface FleetCar {
  id: string;
  brand: string;
  model: string;
  plate: string;
  status: string;
  fuel: string;
  price: string;
  seats: number;
  image: string;
  mainScreen: boolean;
  popularScreen1: boolean;
  popularScreen2: boolean;
}

export interface Admin {
  email: string;
  password: string;
}
