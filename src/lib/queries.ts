"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiFetch } from "./api";
import type {
  AdminStats,
  Appointment,
  CategoryCount,
  CustomerDetails,
  CustomerStats,
  PaymentStatusResult,
  Service,
  SlotAvailability,
  Transaction,
  User,
} from "./types";

interface ServiceListParams {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  includeInactive?: boolean;
  status?: string;
}

export function useServices(params: ServiceListParams = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (params.sort) query.set("sort", params.sort);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.includeInactive) {
    if (params.status) query.set("status", params.status);
  }

  return useQuery({
    queryKey: ["services", params],
    queryFn: () =>
      apiFetch<Service[]>(`/api/services?${query.toString()}`, {
        auth: Boolean(params.includeInactive),
      }),
    placeholderData: keepPreviousData,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["service-categories"],
    queryFn: () => apiFetch<CategoryCount[]>("/api/services/categories", { auth: false }),
    staleTime: 60_000,
  });
}

export function useService(id: string | undefined) {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => apiFetch<Service>(`/api/services/${id}`, { auth: false }),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useAvailability(date: string, enabled = true) {
  return useQuery({
    queryKey: ["availability", date],
    queryFn: () =>
      apiFetch<SlotAvailability[]>(`/api/appointments/availability?date=${date}`, {
        auth: false,
      }),
    enabled: Boolean(date) && enabled,
    staleTime: 15_000,
  });
}

interface AppointmentListParams {
  status?: string;
  paymentStatus?: string;
  search?: string;
  page?: number;
  limit?: number;
}

function appointmentQuery(params: AppointmentListParams) {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  if (params.paymentStatus) query.set("paymentStatus", params.paymentStatus);
  if (params.search) query.set("search", params.search);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  return query.toString();
}

export function useMyAppointments(params: AppointmentListParams = {}) {
  return useQuery({
    queryKey: ["my-appointments", params],
    queryFn: () =>
      apiFetch<Appointment[]>(`/api/appointments/mine?${appointmentQuery(params)}`),
    placeholderData: keepPreviousData,
  });
}

export function useAppointment(id: string | undefined) {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: () => apiFetch<Appointment>(`/api/appointments/${id}`),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useAdminAppointments(params: AppointmentListParams = {}) {
  return useQuery({
    queryKey: ["admin-appointments", params],
    queryFn: () =>
      apiFetch<Appointment[]>(`/api/appointments?${appointmentQuery(params)}`),
    placeholderData: keepPreviousData,
  });
}

export function useCustomerStats() {
  return useQuery({
    queryKey: ["dashboard-customer"],
    queryFn: () => apiFetch<CustomerStats>("/api/dashboard/customer"),
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["dashboard-admin"],
    queryFn: () => apiFetch<AdminStats>("/api/dashboard/admin"),
  });
}

export function useCustomers(params: { search?: string; page?: number } = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.page) query.set("page", String(params.page));

  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => apiFetch<User[]>(`/api/users?${query.toString()}`),
    placeholderData: keepPreviousData,
  });
}

export function useCustomerDetails(id: string | null) {
  return useQuery({
    queryKey: ["customer-details", id],
    queryFn: () => apiFetch<CustomerDetails>(`/api/users/${id}`),
    enabled: Boolean(id),
  });
}

export function useMyTransactions(params: { status?: string; page?: number } = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  if (params.page) query.set("page", String(params.page));

  return useQuery({
    queryKey: ["my-transactions", params],
    queryFn: () => apiFetch<Transaction[]>(`/api/transactions/mine?${query.toString()}`),
    placeholderData: keepPreviousData,
  });
}

export function useAdminTransactions(params: { status?: string; page?: number } = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  if (params.page) query.set("page", String(params.page));

  return useQuery({
    queryKey: ["admin-transactions", params],
    queryFn: () => apiFetch<Transaction[]>(`/api/transactions?${query.toString()}`),
    placeholderData: keepPreviousData,
  });
}

export function usePaymentStatus(sessionId: string | null) {
  return useQuery({
    queryKey: ["payment-status", sessionId],
    queryFn: () =>
      apiFetch<PaymentStatusResult>(
        `/api/payments/status?session_id=${encodeURIComponent(sessionId ?? "")}`,
      ),
    enabled: Boolean(sessionId),
    retry: false,
    refetchInterval: (query) => {
      const data = query.state.data as PaymentStatusResult | undefined;
      return data?.paymentStatus === "paid" ? false : 2500;
    },
  });
}
