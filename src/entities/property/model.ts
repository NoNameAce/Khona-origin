export interface Property {
  propertyId: string;
  userId: string;
  name: string;
  mainImage: File | null | string;
  image1: File | null | string;
  image2: File | null | string;
  image3: File | null | string;
  price: string;
  location: string;
  description: string;
  phone: string;
  email: string;
  type: string;
}
