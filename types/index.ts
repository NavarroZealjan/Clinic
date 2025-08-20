export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodType: string;
  medicalHistory: MedicalHistoryEntry[];
  labResults: LabResult[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalHistoryEntry {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  doctor: string;
  notes: string;
  createdAt: string;
}

export interface LabResult {
  id: string;
  date: string;
  testName: string;
  result: string;
  normalRange: string;
  status: "Normal" | "Abnormal" | "Critical";
  file?: File | null;
  fileName?: string;
  fileUrl?: string;
  doctor: string;
  notes: string;
  createdAt: string;
}
