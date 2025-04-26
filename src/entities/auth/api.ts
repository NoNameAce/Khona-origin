// src/entities/auth/api.ts
import { LoginCredentials, RegisterCredentials, AuthResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  // Clear client-side token
  localStorage.removeItem('token');
  // Optional: Call backend logout endpoint if exists
};