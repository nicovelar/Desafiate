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

function verificar() {
    if (conectar.usuario.estado === "conectado") {

    }else {
        location.href = "./index.html";
    }
}

function desconectar (){
    localStorage.clear();
    location.href = "./index.html";
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    let usuario = {};
    usuario.nombre = profile.getGivenName();
    usuario.imagen = profile.getImageUrl();
    usuario.estado = "conectado";
    localStorage.setItem("usuario",JSON.stringify(usuario));

    location.href = "./principal.html";
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }


