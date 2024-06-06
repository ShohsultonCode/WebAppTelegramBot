import * as mongoose from 'mongoose';
///ss

export const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique:true },
});
