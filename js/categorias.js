
categorias.addEventListener("click", (e) => {


    if (e.target.parentNode.id != ""){
        if ( e.target.id != "") {
            localStorage.setItem('categoria', e.target.id)
        } else {
            localStorage.setItem('categoria', e.target.parentNode.id)
        }
        location.href="pages/productos.html"
    }
})