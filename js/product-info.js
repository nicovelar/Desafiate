//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

var info = {};
var autos = [];
var productsArray = [];
var productsObject = {};

function showProductsInfoList(objeto){
    showSpinner();

    let htmlContentToAppend = ` 

        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active" data-interval="2000">
      <img src="` + objeto.images[1] + `" class="d-block w-100" >
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="` + objeto.images[0] + `"class="d-block w-100" >
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="` + objeto.images[2] + `"class="d-block w-100"  >
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="` + objeto.images[3] + `"class="d-block w-100"  >
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="` + objeto.images[4] + `"class="d-block w-100" >
    </div>
  </div>

  
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
        `
        document.getElementById("product-info").innerHTML = htmlContentToAppend;
    hideSpinner();
    }
    

    function showProductsInfoCommentList(array){
        showSpinner();
        let htmlContentToAppend = "";
        for(let i = 0; i < array.length; i++){
            let comment = array[i];
    
            htmlContentToAppend += califico(comment.score) +`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>        
          </svg>
          <h3 class="mb-1">`+ comment.user +`</h3>
          <h5 class="mb-1">`+ comment.dateTime +`</h5>
          <p class="mb-1">`+ comment.description +`</p> <br>
            ` 
        }
        document.getElementById("product-info-comment").innerHTML = htmlContentToAppend;
        hideSpinner();
    }

    function showProductsRelated(array){
        showSpinner();
        let htmlContentToAppend = ` <h3>Productos Relacionados </h3> `;
        let nuevoAuto = []

         for(let i = 0; i < array.length; i++){
         const indice = array[i];
        nuevoAuto = autos[indice];

            htmlContentToAppend += ` <a href = "product-info.html" class="list-group-item list-group-item-action">
      
            <div class="row">
                <div class="col-3 zoom" >
                    <img src="` + nuevoAuto.imgSrc + `" alt="` + nuevoAuto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ nuevoAuto.name +`</h4>
                        <small class="text-muted">` + nuevoAuto.soldCount + ` artículos</small>
                        <small class="text-muted"> $` + nuevoAuto.cost + `</small>
                    </div>
                    <smaller h4 class="mb-1">`+ nuevoAuto.description +`</h4>
                </div>
            </div>
        </a>
        `
    }


        document.getElementById("product-related").innerHTML = htmlContentToAppend;
        hideSpinner();
    }



function califico(estrella) {
let estrellas ="";
for (let i=1; i<=5; i++){
    if (i<=estrella) {
        estrellas += '<i class="fas fa-star"></i>';
    } else {
        estrellas += '<i class="far fa-star"></i>';
    }
}
return estrellas;
}

function publicar() {
    let nombre = JSON.parse(localStorage.getItem("usuario"));
    let comentario = document.getElementById("comentario").value;
    let dejarComentario = {};
    let valor = document.getElementById("valor").value;
    let fecha = new Date();
    let mes = fecha.getMonth()+1;
    if (mes<10) { 
        mes = "0" + mes;
    }
    let hoy=new Date();
    let h=hoy.getHours();
    let m=hoy.getMinutes();
    let s=hoy.getSeconds();
    dejarComentario.dateTime = (fecha.getFullYear() + "-" + (mes) + "-" + fecha.getDate() + " " + h + ":" + m + ":" + s);
    dejarComentario.user = nombre.nombre;
    dejarComentario.description = comentario;
    dejarComentario.score = valor;
    productsArray.push(dejarComentario);
    showProductsInfoCommentList(productsArray);
}

  
 document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                productsArray = resultObj.data;
                showProductsInfoCommentList(productsArray);     
            }
        });

        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                autos = resultObj.data;
            }
        });
        
        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                info = resultObj.data
                showProductsInfoList(info);
                showProductsRelated(info.relatedProducts);
            }
        });

       

    });
