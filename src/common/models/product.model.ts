import * as mongoose from 'mongoose';


export const ProductSchema = new mongoose.Schema({
  product_name: { type: String, required: true},
  product_description: { type: String, required: true},
  product_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
  product_price: { type: Number, required: true},
  product_image: { type: String, required: true},
});
