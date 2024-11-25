import express from 'express';      
import productRouter from './routes/product_router.js'
import cartRouter from './routes/cart_router.js'
import handlebars from 'express-handlebars';
import path from 'path';
//import products  from './data/productos.json' assert { type: 'json' };
//import ProductManager from './managers/product_manager.js';
import 'dotenv/config';
import { Server } from 'socket.io';
import { initMongoDB } from "./daos/mongodb/db.connection.js";
import { prodDao } from './daos/mongodb/product.dao.js';
import { cartDao } from './daos/mongodb/cart.dao.js';

//const productManager = new ProductManager(`${process.cwd()}/src/daos/filesystem/data/productos.json`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use('/', express.static(path.join(process.cwd(), 'src', 'public')));         

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'handlebars');

app.get('/', async (req, res) =>{
    const limit = parseInt(req.query.limit) || 3;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || null;

    const prodPag = await prodDao.getAll(limit, page, category);
    const products = prodPag.docs.map(product => {
        return {
            _id: product._id,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            category: product.category,
        };
    });
    console.log(prodPag)
    res.render('home', { products, prodPag });
});

app.get('/realTimeProducts', (req, res)=>{
    res.render('realTimeProducts')
});

app.get('/carts/:cid', async (req, res) =>{
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);
    
    const cartData = {
        _id: cart._id,
        products: cart.products.map(product => ({
            _id: product._id._id,
            title: product._id.title,
            description: product._id.description,
            quantity: product.quantity,
            
        }))
    };

    res.render('cartView', { cart: cartData });
});

const PERSISTENCE = process.env.PERSISTENCE;

if (PERSISTENCE === "MONGO")
    initMongoDB()
        .then(() => console.log("Conectado a la base de datos de MongoDB"))
        .catch((error) => console.log(error));
    const httpServer = app.listen(8080, ()=>console.log("Servidor conectado - Puerto 8080"));

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket)=>{
    let products = await prodDao.getRender();
    console.log(`Usuario conectado: ${socket.id}`);
    socket.on('disconnect', ()=>{
        console.log("Usuario desconectado")
    })
    
    socket.emit("productos", products);  

    socket.on("agregarProducto", async (prod) =>{      
        try{
            await prodDao.create(prod);
            products = await prodDao.getRender();
            socket.emit("productos", products);
        } catch(error){
            console.error("Error al agregar el producto", error);
        }
    })

    socket.on("eliminarProducto", async (pid) =>{  
        try{
            const result = await prodDao.delete(pid);
            if(result) {
                products = await prodDao.getRender();
                socket.emit("productos", products);
                socket.emit("productoEliminado", {success: true, message: `Producto #${pid} eliminado` })
            }
        }catch(error){
            socket.emit("productoEliminado", { success: false, message: "Error al eliminar el producto" });
        }
    })
});