import { Schema, model } from "mongoose";

export const cartsCollectionName = "carrito";

const CartSchema = new Schema({
    products: { type: [String], required: true },
});

export const CartModel = model(cartsCollectionName, CartSchema);