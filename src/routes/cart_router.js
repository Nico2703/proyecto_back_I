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

router.put('/:cid/products/:pid', controllers.updateCartProduct);

router.put('/:cid', controllers.updateCart);

router.delete('/', controllers.removeAllCarts);

router.delete('/:cid', controllers.removeAllProductsFromCart);

router.delete('/:cid/products/:pid', controllers.removeProductFromCart);

export default router;