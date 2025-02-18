import axios from "axios";
import { Property } from "./model";

export const API_URL = "http://localhost:7000/properties";

// GET all properties (without filters)
export async function getProperty() {
  try {
    const { data } = await axios.get(API_URL);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// GET a single property by id
export async function getPropertyById(id: string) {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    console.log(id);
    return data;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw new Error("Failed to fetch property");
  }
}

// DELETE property by id
export async function deleteProperty(id: string) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    // Refresh properties after deletion
    getProperty();
  } catch (error) {
    console.error("Error deleting property:", error);
    throw new Error("Failed to delete property");
  }
}

// UPDATE property (uses updatedData.id to match backend)
export async function updateProperty(updatedData: Property) {
  try {
    await axios.put(`${API_URL}/${updatedData.propertyId}`, updatedData);
    console.log("success");
    // Refresh properties after update
    getProperty();
  } catch (error) {
    console.error("Error updating property:", error);
    throw new Error("Failed to update property");
  }
}

// POST new property
export async function userPost(postData: Property) {
  try {
    const { data } = await axios.post(API_URL, postData);
    alert("You have successfully posted the Property");
    return data;
  } catch (error) {
    alert("Error while posting the Property");
  }
}
