import * as services from "../services/product.services.js";

export const getRender = async (req, res, next) => {
    try {
        const response = await services.getRender();
        res.json(response);
    } catch (error) {
        next(error);  
    }
};

export const getAll = async (req, res, next) => {
    try {
        const { limit, page, category, sort } = req.query;
        const response = await services.getAll(limit, page, category, sort);
        res.json({
            status: response.status,
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?limit=${response.limit}&page=${response.prevPage}` : null,
            nextLink: response.hasNextPage ? `http://localhost:8080/api/products?limit=${response.limit}&page=${response.nextPage}` : null,
        });
    } catch (error) {
        next(error);  
    }
};

export const getById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await services.getById(pid);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProduct = await services.create(req.body);
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const productUpdated = await services.update(pid, req.body);
        res.json(productUpdated);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await services.remove(id);
        res.json(prodDel);
    } catch (error) {
        next(error);
    }
};

export const removeAll = async (req, res, next) => {
    try {
        const prodDel = await services.removeAll();
        res.json(prodDel);
    } catch (error) {
        next(error);
    }
};

