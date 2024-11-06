const socketClient = io();

const form = document.getElementById('form');
const titleIn = document.getElementById('title');
const descriptionIn = document.getElementById('description');
const codeIn = document.getElementById('code');
const priceIn = document.getElementById('price');
const statusIn = document.getElementById('status');
const stockIn = document.getElementById('stock');
const categoryIn = document.getElementById('category');
const thumbnailsIn = document.getElementById('thumbnails');
const productsContainer = document.getElementById('products');

socketClient.on("productos", (data) => {
    const products = Array.isArray(data) ? data : data.products;

    let infoProducts = '';

    products.forEach((product) => {
        infoProducts += `
        <li>
            <strong>${product.title}</strong><br>
            Description: ${product.description}<br>
            Code: ${product.code}<br>
            Price: $${product.price}<br>
            Status: ${product.status === 1 ? 'Disponible' : 'Sin stock'}<br>
            Stock: ${product.stock}<br>
            Category: ${product.category}<br>
            Thumbnails: ${product.thumbnails.length > 0 ? product.thumbnails.join(', ') : 'Sin imagen'}<br>
            <hr>
        </li>`;
    });
    console.log(infoProducts)
    
    productsContainer.innerHTML = infoProducts;
});

form.onsubmit = (e) => {
    e.preventDefault();

    const thumbnails = [ thumbnailsIn.value ].filter(e => e.trim() !== '');

    const nuevoProducto = {
        title: titleIn.value,
        description: descriptionIn.value,
        code: codeIn.value,
        price: priceIn.value,
        status: statusIn.value,
        stock: stockIn.value,
        category: categoryIn.value,
        thumbnails: thumbnails 
    };
    socketClient.emit('agregarProducto', nuevoProducto);
}
