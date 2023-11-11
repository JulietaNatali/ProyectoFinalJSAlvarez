
const categoria = localStorage.getItem('categoria')


const divProductos = document.getElementById("productos")
const titulo = document.getElementById("titulo")


titulo.textContent = categoria


const traerProductos = async () => {
    const response = await fetch('../json/productos.json')
    const productos = await response.json()
    return productos
}

traerProductos().then(productos => {

    productos.forEach((producto) => {
        if (producto.categoria == categoria){
            divProductos.innerHTML += `
        <div class="producto" id=${producto.id}>
            <div class="producto_img">
                <img src=${producto.img} alt= ${producto.nombre}>
            </div>
            <div class="producto_text">
                <h2 class="producto_name"> ${producto.nombre}</h2>
                <p class="producto_price">$  ${producto.precio}</p>
            </div>
            <div class="producto_icono">
                <i class="fa fa-circle-plus fa-2x"></i>
            </div>
        </div>
        `
        }
    })

})


divProductos.addEventListener("click", (e)=> {

    let idProducto
    if (e.target.id != "productos"){
        idProducto = e.target.parentNode.parentNode.id


        traerProductos().then(productos => {
            let buscado = productos.filter( producto => producto.id == idProducto)

            localStorage.setItem('productoSeleccionado', JSON.stringify(buscado[0]))
            location.href="detalle.html"
        })
    }
})