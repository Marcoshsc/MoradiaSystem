import { Place } from "./place";

export interface Interest {
  id: number;
  proposed_value: number;
  created_at: Date;
  place: Place;
  id_user: number;
}
