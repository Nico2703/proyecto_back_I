import { Schema, model } from "mongoose";

export const productsCollectionName = "productos";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String },
    thumbnails: { type: [String] },
});

export const ProductModel = model(productsCollectionName, ProductSchema);