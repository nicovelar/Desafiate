//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

var productsArray = [];
var listafiltrada = [];

function showProductsList(array){
    showSpinner();
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += ` 
        
        <div class="col-md-5">

        <a href = "product-info.html" class="list-group-item list-group-item-action">
      
            <div class="row">
               
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                        <small class="text-muted"> $` + product.cost + `</small>
                    </div>
                    <smaller h4 class="mb-1">`+ product.description +`</h4>
                </div>
            </div>
        </a>
        </div>
        `

    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    hideSpinner();
}

function filterWithPrice () {
    let preciomin = document.getElementById("pricemin").value;
    let preciomax = document.getElementById("pricemax").value;
    listafiltrada = productsArray.filter(function(producto){
       
        return producto.cost >= preciomin && producto.cost <= preciomax;
   })
   showProductsList(listafiltrada);

}


function buscador() {
    let buscador = document.getElementById("buscador").value;
    listafiltrada = productsArray.filter(function(producto){
        return producto.name.toLowerCase().search(buscador) !== -1 || producto.name.search(buscador) !== -1
    }) 
    showProductsList(listafiltrada);
}



function ascendente() {

    listafiltrada = productsArray.sort(function (a ,b ){
        if (a.cost < b.cost) {
            return -1;
        } else if (a.cost > b.cost) {
            return 1;
        } else {
            return 0;
        }
    })

    showProductsList(listafiltrada);
}
function descendente() {

    listafiltrada = productsArray.sort(function (a ,b ){
        if (a.cost > b.cost) {
            return -1;
        } else if (a.cost < b.cost) {
            return 1;
        } else {
            return 0;
        }
    })

    showProductsList(listafiltrada);
}

function descendenteRelevancia() {

    listafiltrada = productsArray.sort(function (a ,b ){
        if (a.soldCount > b.soldCount) {
            return -1;
        } else if (a.soldCount < b.soldCount) {
            return 1;
        } else {
            return 0;
        }
    })

    showProductsList(listafiltrada);
}

function limpiar() {
   document.getElementById("pricemin").value = "";
   document.getElementById("pricemax").value = "";
    showProductsList(productsArray);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
});

document.getElementById("filterPrice").addEventListener("click", filterWithPrice);
document.getElementById("buscador").addEventListener("keyup",buscador);

