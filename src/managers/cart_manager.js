import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class CartManager{
    constructor(path){
        this.path = path;
    }

    async getAll(){
        try{
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(carts);
            } else return []
        } catch (error){
            throw new Error (error.message);
        }
    }

    async create(obj){
        try{
            const cart = {
                id: uuidv4(),
                ...obj
            };
            const carts = await this.getAll();
            const cartExists = products.find((c) => c.id === cart.id);
            if (cartExists) throw new Error ("Carrito existente");
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart;
        } catch (error){
            throw new Error(error.message);
        }
    }

    async getById(id){
        try{
            const carts = await this.getAll();
            if (!carts.length > 0) throw new Error("Lista de carritos vacía");
            const cart = carts.find((cart) => cart.id === id);
            if (!cart) throw new Error("Carrito no encontrado");
            return carrito;
        } catch (error){
            throw new Error(error.message);
        }
    }

    async update(product, cid){
        try{
            const carts = await this.getAll();
            let cart = await this.getById(cid);

            const existingProduct = cart.products.findIndex(p => p.id === product.id);

            if (existingProduct !== -1) cart.products[existingProduct].quantity += product.quantity; 
            else cart.products.push({ id: product.id, quantity: product.quantity });

            const newArray = carts.filter((cart) => cart.id !== cid);   
            newArray.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return cart;
        } catch (error){
            throw new Error(error.message);
        }
    }

    async deleteAll(){
        try{
            const carts = await this.getAll();
            if (!carts.length > 0) throw new Error ("Lista de carritos vacía");
            await fs.promises.unlink(this.path);
        } catch(error){
            throw new Error(error.message);
        }
    }
}