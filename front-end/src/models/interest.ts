import { Place } from "./place";
import { User } from "./user";

export interface Interest1 {
  id: number;
  proposed_value: number;
  created_at: Date;
  place: Place;
  id_user: number;
}
export interface Interest {
  id: number;
  proposed_value: number;
  user: User;
  place: {
    id: number;
    name: string;
    rooms: number;
    bathrooms: number;
    location: string;
    description: string;
    created_at: Date;
    status: string;
    area: number;
    value: number;
    image: string;
    user: {
      name: string;
      image: string;
    };
  };
}
