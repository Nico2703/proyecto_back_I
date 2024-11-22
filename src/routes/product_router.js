import { Router } from "express";
import * as controllers from "../controllers/product.controllers.js";
//import ProductManager from "../managers/product_manager.js";

//const productManager = new ProductManager(`${process.cwd()}/src/daos/filesystem/data/productos.json`)
const router = Router();

router.get('/', controllers.getAll);

router.get('/:pid', controllers.getById);

router.post('/', controllers.create);

router.put('/:pid', controllers.update);

router.delete('/:pid', controllers.remove);

router.delete('/', controllers.removeAll);

export default router;