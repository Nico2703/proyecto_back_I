import { prodDao } from "../daos/mongodb/product.dao.js";
import { CustomError } from "../middlewares/errorHandler.js";

export const getRender = async () => {
    try {
        return await prodDao.getRender();
    } catch (error) {
        throw new Error(error);
    }
};

export const getAll = async (limit, page, category, sort) => {
    try {
        return await prodDao.getAll(limit, page, category, sort);
    } catch (error) {
        throw new Error(error);
    }
};

export const getById = async (pid) => {
    try {
        console.log(pid);
        const prod = await prodDao.getById(pid);
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

export const update = async (pid, obj) => {
    try {
        const prodUpd = await prodDao.update(pid, obj);
        if (!prodUpd) throw new CustomError("Error al actualizar el producto", 400);
        return prodUpd;
    } catch (error) {
        throw error;
    }
};

export const remove = async (pid) => {
    try {
        const prodDel = await prodDao.delete(pid);
        if (!prodDel) throw new CustomError("Error al eliminar el producto", 400);
        return prodDel;
    } catch (error) {
        throw error;
    }
};

export const removeAll = async () => {
    try {
        const prodDel = await prodDao.deleteAll();
        if (!prodDel) throw new CustomError("Error al eliminar los productos", 400);
        return prodDel;
    } catch (error) {
        throw error;
    }
};

