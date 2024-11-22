import { CartModel } from './models/cart.model.js';
import { prodDao } from './product.dao.js';

class CartDaoMongo{
    constructor(model){
        this.model = model;
    }

    async getAll(){
        try{
            return await this.model.find({})
        } catch (error){
            throw new Error (error);
        }
    }

    async create(obj){
        try{
            return await this.model.create(obj);
        } catch (error){
            throw new Error();
        }
    }

    async getById(id){
        try{
            return await this.model.findById(id);
        } catch (error){
            throw new Error(error);
        }
    }

    async update(cid, pid, obj){
        try{    
            let cart = await this.getById(cid);

            const quantityToAdd = obj.quantity ? Number(obj.quantity) : 1;
            
            const existingProduct = cart.products.findIndex(p => p._id.toString() === pid.toString());

            if (existingProduct !== -1) cart.products[existingProduct].quantity += quantityToAdd; 
            else cart.products.push({ _id: pid, quantity: quantityToAdd });

            return await this.model.findByIdAndUpdate(cid, { products: cart.products });
        } catch (error){
            throw new Error(error);
        }
    }

    async delete(id){
        try{
            return await this.model.findByIdAndDelete(id);
        } catch (error){
            throw new Error(error);
        }
    }

    async deleteAll(){
        try{
            return await this.model.deleteMany({});
        } catch(error){
            throw new Error(error);
        }
    }
}

export const cartDao = new CartDaoMongo(CartModel);