import { prodDao } from "../daos/mongodb/product.dao.js";

export const getAll = async () => {
    try {
        return await prodDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
};

export const getById = async (id) => {
    try {
        const prod = await prodDao.getById(id);
        if (!prod) throw new CustomError("Producto no encontrado", 404);
        return prod;
    } catch (error) {
        throw error;
    }
};

export const create = async (obj) => {
    try {
        const newProd = await prodDao.create(obj);
        if (!newProd) throw new CustomError("Error al crear el producto", 400);
        return newProd;
    } catch (error) {
        throw error;
    }
};

export const update = async (id, obj) => {
    try {
        const prodUpd = await prodDao.update(id, obj);
        if (!prodUpd) throw new CustomError("Error al actualizar el producto", 400);
        return prodUpd;
    } catch (error) {
        throw error;
    }
};

export const remove = async (id) => {
    try {
        const prodDel = await prodDao.delete(id);
        if (!prodDel) throw new CustomError("Error al eliminar el producto", 400);
        return prodDel;
    } catch (error) {
        throw error;
    }
};

export const removeAll = async (id) => {
    try {
        const prodDel = await prodDao.deleteAll();
        if (!prodDel) throw new CustomError("Error al eliminar los productos", 400);
        return prodDel;
    } catch (error) {
        throw error;
    }
};

