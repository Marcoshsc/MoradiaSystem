import { Place } from "../models/place";

export type User = {
  id: string;
  description: string;
  name: string;
  email: string;
  password: string;
  phone: boolean;
  location: string;
  number_rent: number;
  number_sell: number;
  createdAt: Date;
  place: Place[];
};
