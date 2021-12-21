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
        
        
        div += `<div class='col cards'>`
           div += `<div class='padre'>`
                 div += `<div class='card cards-side front' >`
                     div += `<img src='${item.imagen}' alt=''>`
                        div += `<div class='card-body'>`
                            div += `<h5 class='card-title'>${item.nombre}</h5>`
                        div += `</div>`
                        div += `<div class ='text-center'>`
                            div += `<h2>${item.precio} </h2>`


                             div += `<a href="" class="btn btn-block btn-primary " id="${item._id}">stock ${item.stock}</a>`
                                if (item.stock < 5) {
                                div += `<div class="stock"> <p>Ultimas unidades disponibles</p> </div>`
                                }

                         div += `</div>`
                 div += `</div>`
                div += `<div class='cards-side back'>`
                    div += `<p class='card-text h5'>${item.descripcion}</p>`
                    div += `<div class="comprar"><a href="" class="btn btn-block btn-primary " id="${item._id}" onclick="agregarArticulo(event)">Comprar</a> </div>`
                div += `</div>`
             div += `</div>`
        div += `</div>`
        
        
    })
    
    
    document.getElementById(id).innerHTML = div
}
// 
//  <button type="button" class="btn btn-primary" onclick="agregarArticulo(event)" >Agregar Carrito</button>






