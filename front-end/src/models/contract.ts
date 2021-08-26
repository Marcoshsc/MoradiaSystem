import { Place } from "./place";
import { User } from "./user";

export interface RentContract {
  id: number;
  created_at: Date;
  start: Date;
  end: Date;
  value: number;
  user: User;
  place: Place;
}

export interface SellContract {
  id: number;
  created_at: Date;
  value: number;
  user: User;
  place: Place;
}
