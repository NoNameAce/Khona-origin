import axios from "axios";
import { User } from "./model";

const USER_API_URL = 'http://localhost:7000/users';

export async function getUser() {
  try {
    const { data } = await axios.get(USER_API_URL);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const { data } = await axios.delete(`${USER_API_URL}/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(id: string, userData: User) {
  try {
    const { data } = await axios.put(`${USER_API_URL}/${id}`, userData);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createUser(userData: User) {
  try {
    const { data } = await axios.post(USER_API_URL, userData);
    return data;
  } catch (error) {
    console.error(error);
  }
}
