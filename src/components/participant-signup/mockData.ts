import { StudyInfo, EnrollmentCenter, Clinic, Language } from './types';

export const mockStudies: StudyInfo[] = [
  {
    id: '1',
    name: 'Cognitive Development Study',
    description: 'A study on cognitive development in children and adults',
    isDataCollection: true,
    config: ['enrollmentCenter', 'clinic', 'language'],
  },
  {
    id: '2',
    name: 'Sleep Pattern Research',
    description: 'Research on sleep patterns and their effects on daily activities',
    isDataCollection: false,
    config: ['clinic', 'language'],
  },
  {
    id: '3',
    name: 'Behavioral Analysis',
    description: 'Analysis of behavioral patterns in different age groups',
    isDataCollection: true,
    config: ['enrollmentCenter', 'language'],
  },
  {
    id: '4',
    name: 'Memory Function Study',
    description: 'Study on memory function and retention capabilities',
    isDataCollection: false,
    config: ['enrollmentCenter', 'clinic'],
  },
  {
    id: '5',
    name: 'Attention Span Research',
    description: 'Research on attention span and focus in various environments',
    isDataCollection: true,
    config: ['clinic'],
  },
]; 

export const mockEnrollmentCenters: EnrollmentCenter[] = [
  {
    id: '1',
    name: 'Downtown Research Center',
    address: '123 Main Street',
    city: 'Boston',
    state: 'MA',
    zipcode: '02108',
  },
  {
    id: '2',
    name: 'University Medical Campus',
    address: '456 University Avenue',
    city: 'Cambridge',
    state: 'MA',
    zipcode: '02142',
  },
  {
    id: '3',
    name: 'Riverside Health Institute',
    address: '789 Riverside Drive',
    city: 'Brookline',
    state: 'MA',
    zipcode: '02445',
  },
  {
    id: '4',
    name: 'North Shore Research Facility',
    address: '321 Harbor View Road',
    city: 'Salem',
    state: 'MA',
    zipcode: '01970',
  },
  {
    id: '5',
    name: 'South Bay Medical Center',
    address: '555 Bay Street',
    city: 'Quincy',
    state: 'MA',
    zipcode: '02169',
  },
];

export const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'Neuroscience Research Clinic',
    specialization: 'Neurology',
    address: '100 Brain Avenue, Boston, MA 02114',
    contactNumber: '(617) 555-1234',
  },
  {
    id: '2',
    name: 'Behavioral Health Center',
    specialization: 'Psychology',
    address: '200 Mind Street, Cambridge, MA 02139',
    contactNumber: '(617) 555-2345',
  },
  {
    id: '3',
    name: 'Pediatric Research Institute',
    specialization: 'Pediatrics',
    address: '300 Children Way, Boston, MA 02115',
    contactNumber: '(617) 555-3456',
  },
  {
    id: '4',
    name: 'Sleep Disorders Clinic',
    specialization: 'Sleep Medicine',
    address: '400 Dream Boulevard, Brookline, MA 02446',
    contactNumber: '(617) 555-4567',
  },
  {
    id: '5',
    name: 'Cognitive Science Laboratory',
    specialization: 'Cognitive Science',
    address: '500 Thought Lane, Cambridge, MA 02142',
    contactNumber: '(617) 555-5678',
  },
];

export const mockLanguages: Language[] = [
  {
    id: '1',
    name: 'English',
    code: 'en',
  },
  {
    id: '2',
    name: 'Spanish',
    code: 'es',
  },
  {
    id: '3',
    name: 'French',
    code: 'fr',
  },
  {
    id: '4',
    name: 'Chinese (Simplified)',
    code: 'zh-CN',
  },
  {
    id: '5',
    name: 'Arabic',
    code: 'ar',
  },
  {
    id: '6',
    name: 'Portuguese',
    code: 'pt',
  },
  {
    id: '7',
    name: 'Russian',
    code: 'ru',
  },
]; 