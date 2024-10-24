import { Router } from "express";
import ProductManager from "../managers/product_manager.js";

const productManager = new ProductManager(`${process.cwd()}/src/productos.json`)
const router = Router();

router.get('/', async (req, res) =>{
    try{
        const limit = parseInt(req.query.limit) || null; 
        const products = await productManager.getAll();
        const limitedProducts = limit ? products.slice(0, limit) : products;
        res.status(200).json(limitedProducts);
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

router.get('/:pid', async (req, res) =>{
    try{
        const { pid } = req.params;
        const product = await productManager.getById(pid);
        res.status(200).json(product);
    } catch (error){
        res.status(404).json({message: error.message});
    }
})

router.post('/', async (req, res) =>{
    try{
        const product = await productManager.create(req.body);
        res.status(201).json(product);
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

router.put('/:pid', async (req, res) =>{
    try{
        const { pid } = req.params;
        const productUpd = await productManager.update(req.body, pid);
        res.status(200).json(productUpd);
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

router.delete('/:pid', async (req, res) =>{
    try{
        const { pid } = req.params;
        const productDel = await productManager.delete(pid);
        res.status(200).json({message: `Producto #${productDel.pid} eliminado`})
    } catch (error){
        res.status(404).json({message: error.message});
    }
})

router.delete('/', async (req, res) =>{
    try{
        await productManager.deleteAll();
        res.json({message: "Productos eliminados"});
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

export default router;