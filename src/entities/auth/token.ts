// src/entities/auth/token.ts
import { jwtDecode } from 'jwt-decode';
import { User } from '../user/model';

// Store token after login/register
export function storeToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_token', token);
}

// Retrieve raw token
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

// Decode token to get user info
export function decodeUserToken(): User | null {
  const token = getToken();
  if (!token) return null; 
  
  try {
    return jwtDecode<User>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

// Remove token on logout
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
}

// Check if token exists and is valid
export function isAuthenticated(): boolean {
  const user = decodeUserToken();
  return !!user; // Add expiration check if needed
}