//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){



});

function conectar() {

    let dato = document.getElementById("user");
    let usuario = {};
    if (dato.value.trim() === "") {

        dato.classList.add("isInvalid");

    }else{

        usuario.nombre = dato.value;
        
        usuario.estado = "conectado";

        sessionStorage.setItem("usuario",JSON.stringify(usuario));

        location.href = "principal.html";
    }
}

function verificar() {
    if (conectar.usuario.estado === "conectado") {

    }else {
        location.href = "index.html";
    }
}

