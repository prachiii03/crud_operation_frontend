export interface User {
  id?: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
}