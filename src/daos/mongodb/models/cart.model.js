import { Schema, model, mongoose } from "mongoose";

export const cartsCollectionName = "carritos";

const CartSchema = new Schema({
    products: [
        { 
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel' }, 
        quantity: { type: Number, required: true, default: 1 } 
        },
    ]
});

export const CartModel = model(cartsCollectionName, CartSchema);