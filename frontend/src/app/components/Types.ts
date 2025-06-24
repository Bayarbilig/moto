// ------------------------------
// User Entry Types
// ------------------------------
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

// ------------------------------
// Brand
// ------------------------------
export interface Brand {
  _id: string;
  name: string;
  slug: string;
}

// ------------------------------
// Bikes
// ------------------------------
export interface Bike {
  _id: string;
  brand: string;
  title: string;
  bikeModel: string;
  cc: number;
  power: number;
  image: string;
  images?: string[]
  price?: number;
  mileage?: number; // Suggest changing from string to number
  status: "available" | "sold" | "reserved";
  originCountry?: string;
  soldDate?: string; // ISO date string (e.g. from MongoDB)
fuelType?: string;
views?: number;
likes?: number;
}


// For creating a bike (brand as ID only)
export interface CreateBikeDto extends Omit<Bike, "_id" | "brand"> {
  brand: string; // Reference ID only
}

// ------------------------------
// Accessories
// ------------------------------
export interface Accessory {
  _id: string;
  image: string;
  name: string;
  brand: string | Brand; // Could be string or populated Brand
  price: string;
}

// ------------------------------
// Equipment
// ------------------------------
export interface Equipment {
  model: string;
  _id: string;
  image: string;
  name: string;
  brand: string | Brand; // Same as Accessory
  price: string;
}

// ------------------------------
// Events
// ------------------------------
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
