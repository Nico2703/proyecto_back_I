import * as services from "../services/cart.services.js";

export const getAll = async (req, res, next) => {
    try {
        const response = await services.getAll();
        res.json(response);
    } catch (error) {
        next(error);  
    }
};

export const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await services.getById(cid);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newCart = await services.create(req.body);
        res.json(newCart);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cartUpdated = await services.update(cid, pid, req.body);
        res.json(cartUpdated);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDel = await services.remove(cid);
        res.json(cartDel);
    } catch (error) {
        next(error);
    }
};

export const removeAll = async (req, res, next) => {
    try {
        const cartDel = await services.removeAll();
        res.json(cartDel);
    } catch (error) {
        next(error);
    }
};