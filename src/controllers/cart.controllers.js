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

export const updateCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { limit } = req.query;
        const cartUpdated = await services.updateCart(cid, limit);
        res.json(cartUpdated);
    } catch (error) {
        next(error);
    }
};

export const updateCartProduct = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cartUpdated = await services.updateCartProduct(cid, pid, req.body);
        res.json(cartUpdated);
    } catch (error) {
        next(error);
    }
};

export const removeProductFromCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cartDel = await services.removeProductFromCart(cid, pid);
        res.json(cartDel);
    } catch (error) {
        next(error);
    }
};

export const removeAllProductsFromCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDel = await services.removeAllProductsFromCart(cid);
        res.json(cartDel);
    } catch (error) {
        next(error);
    }
};

export const removeAllCarts = async (req, res, next) => {
    try {
        const cartDel = await services.removeAllCarts();
        res.json(cartDel);
    } catch (error) {
        next(error);
    }
};