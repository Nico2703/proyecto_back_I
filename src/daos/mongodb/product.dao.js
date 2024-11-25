import { ProductModel } from "./models/product.model.js";

class ProductDaoMongo{
    constructor(model){
        this.model = model;
    }

    async getRender(){
        try{
            const limit = 6
            return await this.model.find({})
            .sort({ _id: -1 })
            .lean()
            .limit(limit);
        } catch (error){
            throw new Error (error);
        }
    }

    async getAll(limit = 3, page = 1, category, sort){
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
            const product = await this.model.findByIdAndDelete(pid);
            if (!product) return null;
            return product;
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