import { jwtDecode } from 'jwt-decode';
import { User } from '../user/model';

export function storeToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_token', token);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

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

export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
}

export function isAuthenticated(): boolean {
  const user = decodeUserToken();
  return !!user;
}