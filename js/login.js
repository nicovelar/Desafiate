//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){



});

function conectar() {

    let dato = document.getElementById("user");
    let usuario = {};
    if (dato.value.trim() === "") {

        alert("Faltan datos");

    }else{

        usuario.nombre = dato.value;
        
        usuario.estado = "conectado";

        localStorage.setItem("usuario",JSON.stringify(usuario));

        location.href = "./principal.html";
    }
}

function desconectar (){
    localStorage.clear();
    signOut();
    location.href = "./index.html";
}
