import mongoose from "mongoose";


//user roles
export enum UserRole {
  User = 'user',
  Admin = 'admin',
}
export interface User extends Document {
  id: string;
  user_firstname: string;
  user_lastname: string;
  user_telegram_id: string;
}
export interface Category extends Document {
  id: string;
  category_name: string;
  category_description: string;
}



export interface Product extends Document {
  id: string;
  product_name: string;
  product_description: string;
  product_category: mongoose.Schema.Types.ObjectId;
  product_price: string;
  product_image: string;
}

export default interface UploadedFileInter {
  fieldname: string;
  originalname: string;
  name: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number
}
