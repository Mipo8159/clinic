export enum Role {
  CLINIC = 'clinic',
  ADMIN = 'admin',
}

export enum ClinicStatus {
  REJECTED = 'rejected',
  APPROVED = 'approved',
  IN_PROCESS = 'in_process',
  UNKNOWN = 'unknown',
}

export interface User {
  clinicName: string;
  email: string;
  identifier: string;
  clinic: Clinic;
  address: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  status: ClinicStatus;
  role: Role;
}
export interface Employee {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstname: string;
  lastname: string;
  profession: string;
  imageUrn: string;
  uuid: string;
  imageUrl: string;
}
export interface Vote {
  createdAt: string;
  id: number;
  ip_address: string;
  updatedAt: string;
  value: number;
}
export interface Clinic {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  logoUrn: string;
  imageUrn: string;
  user: User;
  logoUrl: string;
  imageUrl: string;
  map: any;
  votes: Vote[];
  star: number;
  employees: Employee[];
  transparency: number;
  availability: number;
  safety: number;
  likesCount: number;
  dislikesCount: number;
}

export interface Partner {
  createdAt: string;
  updatedAt: string;
  organizationLink?: string;
  firstname: string;
  lastname: string;
  description: string;
  imageUrn?: string;
  imageUrl?: string;
  uuid: string;
  partnerLink?: string;
  map?: any;
}

export interface Link {
  organizationLinkName: string;
  organizationLink: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  clinics: Clinic[];
  uuid: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  map?: any;
}

export interface Banner {
  createdAt: string;
  updatedAt: string;
  uuid: string;
  bannerLink: string;
  bannerImg: string;
}

export interface Email {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
}

export interface Standart {
  id: number;
  createdAt: string;
  updatedAt: string;
  standart: string;
}

export interface Page {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
  map?: Function;
}

export interface Mail {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  subject: string;
  body: string;
}
