import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class ProductManager{
    constructor(path){
        this.path = path;
    }

    async getAll(){
        try{
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(products);
            } else return []
        } catch (error){
            throw new Error (error.message);
        }
    }

    async create(obj){
        try{
            const product = {
                id: uuidv4(),
                ...obj
            };
            const products = await this.getAll();
            const productExists = products.find((p) => p.id === product.id);
            if (productExists) throw new Error ("Producto existente");
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error){
            throw new Error(error.message);
        }
    }

    async getById(id){
        try{
            const products = await this.getAll();
            if (!products.length > 0) throw new Error("Lista de productos vacía");
            const product = products.find((product) => product.id === id);
            if (!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error){
            throw new Error(error.message);
        }
    }

    async update(obj, id){
        try{
            const products = await this.getAll();
            let product = await this.getById(id);
            product = { ...product, ...obj };                  
            const newArray = products.filter((product) => product.id !== id);   
            newArray.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return product;
        } catch (error){
            throw new Error(error.message);
        }
    }

    async delete(id){
        try{
            const product = await this.getById(id);
            const products = await this.getAll();
            const newArray = products.filter((product) => product.id !== id);   
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return product;
        } catch (error){
            throw new Error(error.message);
        }
    }

    async deleteAll(){
        try{
            const products = await this.getAll();
            if (!products.length > 0) throw new Error ("Lista de productos vacía");
            await fs.promises.unlink(this.path);
        } catch(error){
            throw new Error(error.message);
        }
    }
}