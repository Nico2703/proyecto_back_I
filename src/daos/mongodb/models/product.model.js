import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export const productsCollectionName = "productos";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, index: true },
    thumbnails: { type: [String] },
}, { versionKey: false });

ProductSchema.plugin(mongoosePaginate);

export const ProductModel = model(productsCollectionName, ProductSchema);