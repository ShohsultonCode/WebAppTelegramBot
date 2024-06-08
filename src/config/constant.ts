import { UserSchema } from "src/common";
import { categorySchema } from "src/common/models/category.model";
import { orderSchema } from "src/common/models/orders.model ";
import { ProductSchema } from "src/common/models/product.model";


export const Schemas = [
  { name: 'Users', schema: UserSchema},
  { name: 'Categories', schema: categorySchema},
  { name: 'Products', schema: ProductSchema},
  { name: 'Orders', schema: orderSchema},

]
