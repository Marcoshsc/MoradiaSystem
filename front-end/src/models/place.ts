export interface Place {
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
}
