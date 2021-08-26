import { Place } from "./place";

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
