import { cartDao } from "../daos/mongodb/cart.dao.js";
import { CustomError } from "../middlewares/errorHandler.js";

export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
};

export const getById = async (cid) => {
    try {
        const cart = await cartDao.getById(cid);
        if (!cart) throw new CustomError("Carrito no encontrado", 404);
        return cart;
    } catch (error) {
        throw error;
    }
};

export const create = async (obj) => {
    try {
        const newCart = await cartDao.create(obj);
        if (!newCart) throw new CustomError("Error al crear el carrito", 400);
        return newCart;
    } catch (error) {
        throw error;
    }
};

export const update = async (cid, pid, obj) => {
    try {
        const cartUpd = await cartDao.update(cid, pid, obj);
        if (!cartUpd) throw new CustomError("Error al actualizar el carrito", 400);
        return cartUpd;
    } catch (error) {
        throw error;
    }
};

export const remove = async (cid) => {
    try {
        const cartDel = await cartDao.delete(cid);
        if (!cartDel) throw new CustomError("Error al eliminar el carrito", 400);
        return cartDel;
    } catch (error) {
        throw error;
    }
};

export const removeAll = async () => {
    try {
        const cartDel = await cartDao.deleteAll();
        if (!cartDel) throw new CustomError("Error al eliminar los carritos", 400);
        return cartDel;
    } catch (error) {
        throw error;
    }
};