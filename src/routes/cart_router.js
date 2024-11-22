import { Router } from "express";
import * as controllers from "../controllers/cart.controllers.js";
//import CartManager from "../managers/cart_manager.js";
//import ProductManager from "../managers/product_manager.js";

//const cartManager = new CartManager(`${process.cwd()}/src/data/carritos.json`);
//const productManager = new ProductManager(`${process.cwd()}/src/data/productos.json`);
const router = Router();

router.get('/', controllers.getAll);

router.get('/:cid', controllers.getById);

router.post('/', controllers.create);

router.post('/:cid/product/:pid', controllers.update);

router.delete('/:cid', controllers.remove);

router.delete('/', controllers. removeAll);

export default router;