import { Model } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  address: {
    city: string;
    street: string;
    zip: number;
  };
}

export interface UserInstanceMethods {
  hasPassword(password: string): string;
}

export interface UserStaticMethods extends Model<IUser> {
  hasPassword(password: string): string;
}
