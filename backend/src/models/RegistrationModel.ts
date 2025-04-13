import mongoose, { Schema, Document } from "mongoose";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  identityNumber?: string;
  emergencyContact?: string;
}

interface MotorcycleInfo {
  engineCapacity: string;
  registrationNumber: string;
  chassisCapacity: string;
  experience?: string;
  agreeToTerms: boolean;
}

export interface IRegistration extends Document {
  personalInfo: PersonalInfo;
  motorcycleInfo: MotorcycleInfo;
  createdAt: Date;
}

const RegistrationSchema: Schema = new Schema(
  {
    personalInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      identityNumber: String,
      emergencyContact: String,
    },
    motorcycleInfo: {
      engineCapacity: { type: String, required: true },
      registrationNumber: { type: String, required: true },
      chassisCapacity: { type: String, required: true },
      experience: String,
      agreeToTerms: { type: Boolean, required: true },
    },
    tournament: {
      name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRegistration>(
  "Registration",
  RegistrationSchema
);
