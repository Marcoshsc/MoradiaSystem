import { Place } from "../models/place";

export type User = {
  id: string;
  description: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  number_rent: number;
  number_sell: number;
  image?: string;
  createdAt: Date;
  place: Place[];
};
