import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

export async function loginUser(data: { email: string; password: string }) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}
