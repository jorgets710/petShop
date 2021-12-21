function agregarArticulo(e) {
    e.preventDefault();
    //cuando click en agregar carrito lo añada

    const producto = e.target.parentElement.parentElement;

    console.log(producto)
    leerDatos(producto)
}

// obtengo los datos del documento
function leerDatos(producto) {
    // creo el objeto para capturar la imagen, precio,nombre,etc
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h5').textContent,
        precio: Number(producto.querySelector('h2').textContent),
        id: producto.querySelector('a').getAttribute('id'),  // no puedo obtener el id
        cantidad: 1

    }

    guardarProductosLocalStorage(infoProducto)
    // let arrayLocalStorage = obtenerProductosLocalStorege();
    // console.log(arrayLocalStorage)
    //  arrayLocalStorage.map(item => {
    
    //     if (item.id === infoProducto.id) {
    //         alert("el producto ya esta en el carrito")
            
    //     }else{
    //         guardarProductosLocalStorage(infoProducto)
    //     }
    //          console.log(item.id === infoProducto.id)

    
    // })

    console.log(infoProducto)


}

function guardarProductosLocalStorage(producto) {
    let productos;
    console.log(producto)
    productos = this.obtenerProductosLocalStorege(); //Primero obtengo si hay algun producto en el local , despues recien guardo
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos)) //se crea eñ local storage
}
function obtenerProductosLocalStorege() {
    let productoLS;
    if (localStorage.getItem('productos') === null) {
        productoLS = [];
    } else {
        productoLS = JSON.parse(localStorage.getItem('productos'))
    }
    console.log(productoLS)
    return productoLS; //me devuelve producto si esta vacio o no
}

function elimarProductoLocal(e) {

    let producto = e.target.parentElement.parentElement;
    let idProducto= producto.querySelector('a').getAttribute('id')
    let productoLS;
    producto.parentElement.remove(); // elimina los elementos del html
    productoLS = JSON.parse(localStorage.getItem('productos'))

    // obtengo los articulos q sean distintos al id y lo cargo al localStorage
    let eliminar= productoLS.filter(item =>{
        return item.id !== idProducto
    })
    localStorage.setItem('productos', JSON.stringify(eliminar)) 
    calcularTotal()

}



// renderizar el local storage en compra.html
listaCompra = document.querySelector('#lista-compra tbody');

function leerLocalStorageCompra() {
    let productoLS;
    productoLS = this.obtenerProductosLocalStorege()
    productoLS.forEach((producto) => {
        const row = document.createElement('tr');//crea la tabla
        row.innerHTML = `
    <td> 
        <img src ="${producto.imagen}" width=100>
    </td>
    <td> 
     ${producto.nombre}
    </td>
    <td> 
     ${producto.precio}
    </td>
    <td> 
     <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
    </td>
    <td> 
     ${producto.precio * producto.cantidad}
    </td>
    <td> 
        <a href="#" class="btn btn-outline-dark mt-auto" onclick=elimarProductoLocal(event) id="${producto.id}" value=${producto.id}> <i class="bi bi-trash"></i></a>
    </td>
    
    `;
        listaCompra.appendChild(row);
    })
}

// calculos 
function calcularTotal() {
    let productoLS;
    let total = 0, subtotal = 0, igv = 0;
    productoLS = this.obtenerProductosLocalStorege();
    console.log(productoLS)
    for (let index = 0; index < productoLS.length; index++) {
        let element = Number(productoLS[index].precio * productoLS[index].cantidad);
        total = total + element;

    }
    igv = parseFloat(total * 0.21).toFixed(2);
    
    subtotal = parseFloat(total - igv).toFixed(2);
    document.getElementById('subtotal').innerHTML = "$ " + subtotal;
    document.getElementById('iva').innerHTML = "$ " + igv;
    document.getElementById('total').innerHTML = "$ " + total.toFixed(2);
}
calcularTotal();



    document.addEventListener('DOMContentLoaded', leerLocalStorageCompra())

