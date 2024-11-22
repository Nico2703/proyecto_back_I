import { ProductModel } from "./models/product.model.js";

class ProductDaoMongo{
    constructor(model){
        this.model = model;
    }

    async getRender(){
        try{
            return await this.model.find({}).lean();
        } catch (error){
            throw new Error (error);
        }
    }

    async getAll(limit = 2, page = 1, category, sort){
        try{
            const filter = category ? { 'category': category } : {};
            let sortOrder = {};
            if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            return await this.model.paginate(filter, { page, limit, sort: sortOrder });
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