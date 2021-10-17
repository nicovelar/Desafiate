//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsObject = resultObj.data;
            //Muestro las categorías ordenadas
    
    
            showProductsList(productsObject.articles);
        }
    });
    
});

let productsObject = {}
let sumaTotal = 0



function showProductsList(array){
    showSpinner();
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        let cantidadProducto = productsObject.articles[i].count
        let moneda = product.currency;
        let precio = product.unitCost;
        let PrecioUruguayo = pasarAPesosUruguayos(moneda,precio)
        htmlContentToAppend += ` 
     <div class="list-group-item-action">
            <div class="row" >
                <div class="col-3">
                    <img src="`+ product.src+`" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4  class="mb-1" >`+ product.name +`</h4>
                        <small class="text-muted "> $` + precio +`  ` + moneda +  `</small>
                        <input hidden class ="articulosCartPrecio" value=`+ (PrecioUruguayo)+` >
                        <input onchange="sumar()" class="text-muted col-1 cantidad " type="number" min="1" value=`+ cantidadProducto +`>
                        <input hidden class ="subtotal" value= ` + (precio * cantidadProducto) +` >
                        
                </div>
            </div> 
    </div> <br>
        `
        
    }
    document.getElementById("cart").innerHTML = htmlContentToAppend;
    sumar()
    hideSpinner();
}

function pasarAPesosUruguayos(moneda,precio){
   if (moneda == "USD") {
    precio = (precio * 40)
   }
   return precio;
}



function sumar() {

  let precios = document.getElementsByClassName("articulosCartPrecio")
  let cantidades = document.getElementsByClassName("cantidad")

  let total= 0
  let subtotal=0

   for (i = 0 ; i < precios.length ; i++) {
      subtotal += parseFloat(precios[i].value) * parseFloat(cantidades[i].value);
      total += parseFloat(precios[i].value);
   }
   
   document.getElementById("subtotal").innerHTML = (subtotal).toFixed(2) + " UYU";
   document.getElementById("total").innerHTML = (total).toFixed(2) + " UYU";
}