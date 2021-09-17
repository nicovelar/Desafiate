//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

var productsArray = [];
var productsObject = {};

function showProductsInfoList(objeto){
    showSpinner();

    let htmlContentToAppend = `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + objeto.images[1] + `" alt="` + objeto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ objeto.name +`</h4>
                        <small class="text-muted">` + objeto.soldCount + ` artículos</small>
                        <small class="text-muted"> $` + objeto.cost + `</small>
                    </div>
                    <smaller h4 class="mb-1">`+ objeto.description +`</h4>
                </div>
            </div>
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
        
        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                showProductsInfoList(resultObj.data);
            }
        });
    });
