const socketClient = io();

const products = document.getElementById('products');

socketClient.on("productos", (array)=>{
    let infoProducts = ''
    array.map((p)=>{
        infoProducts += `${p.title} - ${p.decription} - ${p.code} - $${p.price} - ${p.status}- ${p.stock} - ${p.category} - ${p.thumbnails} <br>`
    })
    products.innerHTML = infoProducts;
})