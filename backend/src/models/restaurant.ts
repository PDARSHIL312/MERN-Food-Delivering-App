// import mongoose from "mongoose";

// const menuItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: String, required: true },
// });

// const restaurantSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // this is the hard concept that are suppose to be used their in jonas like to parent to child object configration. likethat ,
//   restaurantName: { type: String, required: true },
//   city: { type: String, required: true },
//   country: { type: String, required: true },
//   deliveryPrice: { type: String, required: true },
//   estimatedDeliveryTime: { type: String, required: true },
//   cuisines: [{ type: String, required: true }],
//   menuItems: [menuItemSchema],
//   imageUrl: { type: String, required: true },
//   lastUpdated: { type: Date, required: true },
// });

// const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// export default Restaurant;


import mongoose, { InferSchemaType } from "mongoose";

const menuItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export type MenuItemType = InferSchemaType<typeof menuItemSchema>;

const restaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
