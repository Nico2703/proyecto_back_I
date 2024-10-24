import { Router } from "express";
import CartManager from "../managers/cart_manager.js";
import ProductManager from "../managers/product_manager.js";

const cartManager = new CartManager("../carrito.json");
const productManager = new ProductManager("../productos.json");
const router = Router();

router.get('/', async (req, res) =>{
    try{
        const carts = await cartManager.getAll();
        res.status(200).json(carts);
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

router.get('/:cid', async (req, res) =>{
    try{
        const { cid } = req.params;
        const cart = await cartManager.getById(cid);
        res.status(200).json(cart);
    } catch (error){
        res.status(404).json({message: error.message});
    }
})

router.post('/', async (req, res) =>{
    try{
        const cart = await cartManager.create();
        res.status(201).json(cart);
    } catch (error){
        res.status(500).json({message: error.message});
    }
}),

router.post('/:cid/product/:pid', async (req, res) =>{
    try{
        const { cid } = req.params;
        const { pid } = req.params;
        const product = await productManager.getById(pid);
        const cartUpd = await cartManager.update(product, cid, req.body);
        res.status(200).json(cartUpd);
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

router.delete('/', async (req, res) =>{
    try{
        await cartManager.deleteAll();
        res.json({message: "Carritos eliminados"});
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

export default router;