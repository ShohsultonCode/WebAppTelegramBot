// src/users/schemas/user.schema.ts
import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
  user_firstname: { type: String, required: true },
  user_lastname: { type: String, required: true },
  user_telegram_id: { type: String, required: true},
});
