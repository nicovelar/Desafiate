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
     <div>
            <div class="row" id=`+i+` >
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
                        <svg  onClick="eliminar(`+i+`)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                        
                </div>
            </div> 
    </div> <br>
        `
        
    }
    document.getElementById("cart").innerHTML = htmlContentToAppend;
    sumar()
    hideSpinner();
}

function eliminar(number) {
document.getElementById(number).innerHTML = "";
sumar()
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

function metodosDePago(){
  let metodoDePago = document.getElementById("metodoDePago").value
  let htmlContentToAppend = "";

  if (metodoDePago == "Tarjeta de Crédito") {
    htmlContentToAppend += `  <br>
    <form>
    <label for="tarjeta">Número de Tarjeta:</label>
    <input name="tarjeta" required> 
    <br> <br> 
    </form>
   
       `
  }
  else  {
    htmlContentToAppend += ` <br>
    <form>
    <label for="bancaria">Cuenta Bancaria:</label>
    <input name="bancaria"required> 
    <br> <br>
    </form>
       `
  }


  document.getElementById("formaDePago").innerHTML = htmlContentToAppend;
}

function totalAPagar() {
    let precios = document.getElementsByClassName("articulosCartPrecio")
    let cantidades = document.getElementsByClassName("cantidad")
  
    let subTotal=0
  
     for (i = 0 ; i < precios.length ; i++) {
        subTotal += parseFloat(precios[i].value) * parseFloat(cantidades[i].value);
     }
     
    let metodo1 = document.getElementById("exampleRadios1").checked
    let metodo2 = document.getElementById("exampleRadios2").checked
    let metodo3 = document.getElementById("exampleRadios3").checked
    
   if (metodo1 == true) {
    subTotal += ((subTotal *15) / 100 )
   }
   if (metodo2 == true) {
    subTotal += ((subTotal *7) / 100 )
   }
   if (metodo3 == true) {
    subTotal += ((subTotal *5) / 100)
   }


   document.getElementById("totalAPagar").innerHTML = (subTotal).toFixed(2) + " UYU";
   
}

function compraRealizada() {
    let htmlContentToAppend = "";
    var happypop = new Audio("sounds/happy-pop.mp3")
    happypop.load();
  happypop.play();

htmlContentToAppend = `  <div class="success-animation"> 
<svg class="checkmark happypop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>

</div> <meta http-equiv="Refresh" content="2"; />

   `
document.getElementById("exampleModal").innerHTML = htmlContentToAppend;


}


