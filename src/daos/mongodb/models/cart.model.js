import { Schema, model, mongoose } from "mongoose";

export const cartsCollectionName = "carritos";

const CartSchema = new Schema({
    products: [
        { 
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'productos' }, 
        quantity: { type: Number, required: true, default: 1 } 
        },
    ]
}, { versionKey: false });

CartSchema.pre('find', function(){
    this.populate('products');
});

export const CartModel = model(cartsCollectionName, CartSchema);