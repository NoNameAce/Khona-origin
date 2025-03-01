import axios from "axios";
import { Property } from "./model";

export const API_URL = "http://localhost:7000/properties";

export async function getProperty() {
  try {
    const { data } = await axios.get(API_URL);
    console.log(data);
    return data;
  } catch {
    console.error("Error fetching properties");
  }
}

export async function getPropertyById(id: string) {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    console.log(id);
    return data;
  } catch {
    console.error("Error fetching property:", id);
    throw new Error("Failed to fetch property");
  }
}

export async function deleteProperty(id: string) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    getProperty();
  } catch {
    console.error("Error deleting property:", id);
    throw new Error("Failed to delete property");
  }
}

export async function updateProperty(updatedData: Property) {
  try {
    await axios.put(`${API_URL}/${updatedData.propertyId}`, updatedData);
    console.log("success");
    getProperty();
  } catch {
    console.error("Error updating property:", updatedData.propertyId);
    throw new Error("Failed to update property");
  }
}

export async function userPost(postData: Property) {
  try {
    const { data } = await axios.post(API_URL, postData);
    alert("You have successfully posted the Property");
    return data;
  } catch {
    alert("Error while posting the Property");
  }
}
