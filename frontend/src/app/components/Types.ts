export interface PersonalInfo {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  identityNumber: string;
}

export interface MotorcycleInfo {
  registrationNumber: string;
  engineCapacity: string;
  experience: string;
}

export interface Tournament {
  name: string;
}

export interface Entry {
  _id: string;
  personalInfo: PersonalInfo;
  motorcycleInfo: MotorcycleInfo;
  tournament: Tournament;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
}

export interface Bike {
  _id: string;
  images: string[];
  title: string;
  brand: string;
  bikeModel: string;
  cc: string;
  power: string;
  details: string;
  price: number;
}

export interface Accessory {
  _id: string;
  image: string;
  name: string;
  brand: string;
  price: string;
}

export interface Equipment {
  model: string;
  _id: string;
  image: string;
  name: string;
  brand: string;
  price: string;
}
export interface Event {
  _id?: string;
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  location: string;
  viewButtonText: string;
  applyButtonText: string;
}
