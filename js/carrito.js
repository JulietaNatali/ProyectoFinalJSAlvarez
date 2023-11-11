
const divProductos = document.getElementById("productos");
const precioTotal = document.getElementById("total");
const botonComprar = document.getElementById("confirmar");

let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

class Pedido {
    constructor(detalles) {
        this.detalles = detalles;
    }

    total() {
        return this.detalles.reduce((acc, item) => acc + item.subtotal, 0);
    }
}


const mostrarMensaje = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        timer: 3000
    });
};


const procesarCompra = () => {
    if (productosCarrito.length > 0) {
        mostrarMensaje('success', '¡Compra exitosa!', 'Tu pedido ha sido procesado correctamente.');
        localStorage.removeItem("carrito");
        productosCarrito = [];
        mostrarProductosEnCarrito();
        actualizarTotal();
    } else {
        mostrarMensaje('error', 'Carrito vacío', 'No hay productos en el carrito para comprar.');
    }
};


const eliminar = (array, id) => {
    array = array.filter(item => item.producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(array));
};

divProductos.addEventListener("click", (e) => {
    if (e.target.id === "eliminar_icon") {
        const productoId = e.target.closest(".producto").id;
        eliminar(productosCarrito, productoId);
        mostrarProductosEnCarrito();
        actualizarTotal();
    }
});



const mostrarProductosEnCarrito = () => {
    const divProductos = document.getElementById("productos");
    const productosCarrito = JSON.parse(localStorage.getItem("carrito"));

    if (productosCarrito && productosCarrito.length > 0) {
        divProductos.innerHTML = `
            ${productosCarrito.map(item => `
                <div class="producto" id=${item.producto.id}>
                    <div class="producto_img">
                        <img src="${item.producto.imagen}" alt="${item.producto.nombre}">
                    </div>
                    <div class="producto_text">
                        <h2 class="producto_name">${item.producto.nombre}</h2>
                    </div>
                    <div class="producto_cantidad">
                        x${item.cantidad}
                    </div>
                    <div class="producto_subtotal">
                        $${item.subtotal}
                    </div>
                    <div class="producto_icono eliminar" id="producto_eliminar">
                        <i class="fa fa-trash-can fa-1x" id="eliminar_icon"></i>
                    </div>
                </div>
            `).join("")}`;


        const total = productosCarrito.reduce((acc, item) => acc + item.subtotal, 0);
        precioTotal.innerHTML = `$ ${total.toFixed(2)}`; 
    } else {
        divProductos.innerHTML = `<div class="vacio" id="vacio"><p>No hay productos en el carrito</p></div>`;
        precioTotal.innerHTML = `$ 0.00`;
    }
};

const actualizarTotal = (productosCarrito) => {
    const total = productosCarrito.reduce((acc, item) => acc + item.subtotal, 0);
    precioTotal.innerHTML = `$ ${total.toFixed(2)}`; 
};

botonComprar.addEventListener("click", procesarCompra);


divProductos.addEventListener("click", (e) => {
    if (e.target.id === "eliminar_icon") {
        const productoId = e.target.closest(".producto").id;
        eliminar(productosCarrito, productoId);
        mostrarProductosEnCarrito();
        actualizarTotal(productosCarrito);
    }
});



mostrarProductosEnCarrito();


