
const productoLocal = JSON.parse(localStorage.getItem('productoSeleccionado'))


class Producto{
    constructor (objeto) {
        this.id = objeto.id
        this.categoria = objeto.categoria
        this.nombre = objeto.nombre
        this.precio = parseInt(objeto.precio)
        this.descripcion = objeto.descripcion
        this.imagen = objeto.img
    }
}


class DetalleProducto{
    constructor (producto, cantidad, subtotal) {
        this.producto = producto
        this.cantidad = cantidad
        this.subtotal = subtotal
    }

    aumentarSubtotal() {
        this.subtotal += producto.precio
    }
    aumentarSubtotalExistente(nro) {
        this.subtotal += nro
    }
    disminuirSubtotal() {
        if (this.subtotal > producto.precio){
            this.subtotal -= producto.precio
        }
    }

    aumentarCantidad() {
        this.cantidad += 1
    }
    aumentarCantidadExistente(nro) {
        this.cantidad += nro
    }

    disminuirCantidad() {
        if (this.cantidad > 1) {
            this.cantidad -= 1
        }
    }
    
}


const producto = new Producto(productoLocal)
const detalleProducto = new DetalleProducto(producto, 1, producto.precio)


const titulo = document.getElementById("titulo")
const imagen = document.getElementById("detalle_img")
const descripcion = document.getElementById("detalle_desc")
const precio = document.getElementById("detalle_precio")

const menos = document.getElementById("menos")
const mas = document.getElementById("mas")
const cantidad = document.getElementById("detalle_cantidad")

const agregar = document.getElementById("detalle_agregar")


titulo.textContent = producto.nombre
imagen.innerHTML = `<img src= ${producto.imagen} alt=${producto.nombre}>`
descripcion.textContent = producto.descripcion
precio.textContent = ` $ ${producto.precio}`
cantidad.textContent = 1


menos.addEventListener("click", () => {
    detalleProducto.disminuirSubtotal()
    precio.textContent = `$ ${detalleProducto.subtotal}`

    detalleProducto.disminuirCantidad()
    cantidad.textContent = detalleProducto.cantidad
})


mas.addEventListener("click", ()=>{
    detalleProducto.aumentarSubtotal()
    precio.textContent = `$ ${detalleProducto.subtotal}`

    detalleProducto.aumentarCantidad()
    cantidad.textContent = detalleProducto.cantidad
})



agregar.addEventListener("click", () => {

    
    if(localStorage.getItem("carrito")) {
        
        
        let productosCarrito = JSON.parse(localStorage.getItem("carrito"))
        let nuevoItem = []
        banIguales = false
        
        
        productosCarrito.forEach(item => {

            
            if (item.producto.id == detalleProducto.producto.id){

                itemIgual = new DetalleProducto(item.producto, item.cantidad, item.subtotal)
                itemIgual.aumentarCantidadExistente(detalleProducto.cantidad)
                itemIgual.aumentarSubtotalExistente(detalleProducto.subtotal)

                nuevoItem.push(itemIgual)
                banIguales = true
            } 
            else{
                nuevoItem.push(new DetalleProducto(item.producto, item.cantidad, item.subtotal))
            }
        });

        
        if (!banIguales){
            nuevoItem.push(detalleProducto)
        }

        
        carritoDeCompras = JSON.stringify(nuevoItem)
        
        localStorage.setItem("carrito", carritoDeCompras)
        
    } 
    
    else{
        
        let nuevoItem = []
        nuevoItem.push(detalleProducto)

        
        carritoDeCompras = JSON.stringify(nuevoItem)
        
        localStorage.setItem("carrito", carritoDeCompras)
    }
})


agregar.addEventListener("click", () => {
    Toastify({
        text: "Añadido!",
        duration: 1000,

        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#fcd484",
        },
        onClick: function(){} 
    }).showToast();
})