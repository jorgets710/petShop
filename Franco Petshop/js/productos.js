var productos;
let juguetes = [];
let medicamentos = [];


$(document).ready(async function () {
    await callbackAjax(); //DETIENE LA EJECUCION HASTA RECIBIR LA RESPUESTA DE LA PROMESA
    console.log(productos)
    filtrarJuguetes(productos)
})

async function callbackAjax() {

    await $.ajax({
        url: "https://apipetshop.herokuapp.com/api/articulos",
        type: "GET",
        success: function (response) {

            productos = response.response;
        }
    });
    return productos;
}



function filtrarJuguetes(produc) {
    produc.forEach(item => {
        //    console.log(item)
        if (item.tipo === 'Juguete') {
            juguetes.push(item)
        }else if (item.tipo === 'Medicamento') {
            medicamentos.push(item)
        }
    });
    console.log(juguetes)
    console.log(medicamentos)

    renderArticulos(juguetes,'juguetes')
    renderArticulos(medicamentos,'medicamentos')    

}

function renderArticulos(articulos,id) {
    let div = "";
    articulos.forEach(item => { 
        div += `<div class='col'>`
        div += `<div class='card h-100' id=''>`
        div += `<img src='${item.imagen}' alt=''>`
        div += `<div class='card-body'>`
        div += `<h5 class='card-title'>${item.nombre}</h5>`
        div += `<p class='card-text'>${item.descripcion}</p>`
        div += `<h2> ${item.precio} </h2>`
        div += `</div>`
        div += `<div class ='text-center'>`
        div += `<a href="" class="btn btn-block btn-primary " id="${item._id}" onclick="agregarArticulo(event)">Comprar</a>`
        div += `</div>`
        div += `</div>`
        div += `</div>`
        
    })
    
    document.getElementById(id).innerHTML = div
}
// 
//  <button type="button" class="btn btn-primary" onclick="agregarArticulo(event)" >Agregar Carrito</button>






