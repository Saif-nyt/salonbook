export type Role = "customer" | "admin";
export type AppointmentStatus = "pending" | "confirmed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid";
export type ServiceStatus = "active" | "inactive";
export type TransactionStatus = "pending" | "paid" | "failed" | "cancelled";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
  role: Role;
  isBlocked: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface AppointmentCustomer {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
  role: Role;
  isBlocked: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  customerId: string;
  appointmentDate: string;
  timeSlot: string;
  message: string;
  servicePrice: number;
  paymentStatus: PaymentStatus;
  status: AppointmentStatus;
  createdAt: string;
  service: {
    name: string;
    image: string;
    category: string;
    duration: number;
  };
  customer?: AppointmentCustomer;
}

export interface Transaction {
  id: string;
  appointmentId: string;
  customerId: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  status: TransactionStatus;
  createdAt: string;
  customer?: AppointmentCustomer;
  appointment?: {
    date: string;
    timeSlot: string;
    serviceName: string;
    serviceImage: string;
  };
}

export interface CustomerStats {
  totalAppointments: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  payments: number;
  totalPaid: number;
}

export interface AdminStats {
  totalCustomers: number;
  activeServices: number;
  totalAppointments: number;
  pending: number;
  confirmed: number;
  successfulPayments: number;
  totalRevenue: number;
}

export interface CustomerDetails {
  customer: User;
  appointmentCounts: {
    total: number;
    pending: number;
    confirmed: number;
    cancelled: number;
  };
  recentAppointments: Appointment[];
}

export interface SlotAvailability {
  slot: string;
  available: boolean;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: PaginationMeta & Record<string, unknown>;
}

export interface PaymentSession {
  url: string;
  sessionId: string;
}

export interface PaymentStatusResult {
  sessionId: string;
  transactionStatus: TransactionStatus;
  appointmentStatus: AppointmentStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  currency: string;
}

export interface UploadedImage {
  url: string;
  thumbnailUrl: string | null;
  deleteUrl: string | null;
}
