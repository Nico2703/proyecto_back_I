import { ProductModel } from "./models/product.model.js";

class ProductDaoMongo{
    constructor(model){
        this.model = model;
    }

    async getAll(){
        try{
            return await this.model.find({}).lean();
        } catch (error){
            throw new Error (error);
        }
    }

    async create(obj){
        try{
            return await this.model.create(obj);
        } catch (error){
            throw new Error(error);
        }
    }

    async getById(pid){
        try{
            return await this.model.findById(pid);
        } catch (error){
            throw new Error(error);
        }
    }

    async update(id, obj){
        try{
            return await this.model.findByIdAndUpdate(id, obj, { new: true });  
        } catch (error){
            throw new Error(error);
        }
    }

    async delete(pid){
        try{
            return await this.model.findByIdAndDelete(pid);
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

export const prodDao = new ProductDaoMongo(ProductModel);