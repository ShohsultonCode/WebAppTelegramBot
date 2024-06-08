import * as mongoose from 'mongoose';
///ss

export const orderSchema = new mongoose.Schema({
  order_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users',equired: true },
  order_product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
  order_amount_price: {type: Number, required: true }
  
},
  {
    timestamps:true
  }
);
