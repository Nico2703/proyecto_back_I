import express from 'express';      
import productRouter from './routes/product_router.js'
import cartRouter from './routes/cart_router.js'
import handlebars from 'express-handlebars';
import path from 'path';
import products  from './data/productos.json' assert { type: 'json' };
import ProductManager from './managers/product_manager.js';
import { Server } from 'socket.io';

const productManager = new ProductManager(`${process.cwd()}/src/data/productos.json`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use('/', express.static(path.join(process.cwd(), 'src', 'public')));         

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res)=>{
    res.render('home', {products})
});

app.get('/realTimeProducts', (req, res)=>{
    res.render('realTimeProducts')
});

const httpServer = app.listen(8080, ()=>console.log("Servidor conectado - Puerto 8080"));

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);
    socket.on('disconnect', ()=>{
        console.log("Usuario desconectado")
    })

    socket.emit("productos", products);  

    socket.on("agregarProducto", (prod) =>{      
        productManager.create(prod);
        socket.emit("productos", products);
    })

    socket.on("eliminarProducto", (id) =>{      
        productManager.delete(id);
        socket.emit("productos", products);
    })
});