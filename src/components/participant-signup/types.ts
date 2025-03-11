export type ParticipantType = 'minor' | 'adult';

export type ParticipantStatus = 'alive' | 'deceased' | 'unknown' | 'other';

export interface ParticipantInfo {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  guardianName?: string;
  guardianEmail?: string;
  guardianPhone?: string;
  status?: ParticipantStatus;
  phone?: string;
  zipcode?: string;
  timezone?: string;
}

export type DropdownType = 'enrollmentCenter' | 'clinic' | 'language';

export interface StudyInfo {
  id: string;
  name: string;
  description: string;
  isDataCollection: boolean;
  config: DropdownType[]; // Array of dropdown types to include for this study
  selectedOptions?: Record<DropdownType, string>; // Selected options for each dropdown type
}

export interface EnrollmentCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface Clinic {
  id: string;
  name: string;
  specialization: string;
  address: string;
  contactNumber: string;
}

export interface Language {
  id: string;
  name: string;
  code: string; // ISO language code
}

export type SignupStep = 
  | 'isMinor' 
  | 'minorInfo' 
  | 'adultInfo' 
  | 'studyInfo' 
  | 'invitation' 
  | 'confirmation'; 