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

    async update(product, cid, obj){
        try{    
            const carts = await this.getAll();
            let cart = await this.getById(cid);
            
            const existingProduct = cart.products.findIndex(p => p.id === product.id);

            if (existingProduct !== -1) cart.products[existingProduct].quantity += obj.quantity; 
            else cart.products.push({ id: product.id, quantity: obj.quantity });

            const newArray = carts.filter((cart) => cart.id !== cid);   
            newArray.push(cart);
            
            return await this.model.findByIdAndUpdate(cid, obj, { new: true });
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