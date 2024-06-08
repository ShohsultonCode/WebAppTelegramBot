import * as mongoose from 'mongoose';
///ss

export const orderSchema = new mongoose.Schema({
  order_user_id: { type: String, required: true },
  order_product_id: { type: String, required: true },
  
},
  {
    timestamps:true
  }
);
