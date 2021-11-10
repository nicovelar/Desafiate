//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) { desplegarInfo()

});


function desplegarInfo(){
    var usuario = JSON.parse(localStorage.getItem("usuario"));

    document.getElementById("userProfile").innerHTML = `
    <form>
    <div class="form-group col-3">
    <label for="fname">Nombre: </label>
    <input id="fname" placeholder="Ingrese su nombre">
    </div>
    <div class="form-group col-3">
    <label for="lname">Apellido: </label>
    <input id="lname" placeholder="Ingrese su apellido">
    </div>
    <div class="form-group col-3">
    <label >Edad: </label> <br>
    <input id="edad" type="number" placeholder="Ingrese su edad">
    </div>
    <div class="form-group col-3">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" value="" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese su email:">
    </div>
    <div class="form-group col-3">
    <label >Teléfono: </label> <br>
    <input id= "tel" type="tel" placeholder="Ingrese su Teléfono">
    </div>
    <form> <br>
    <div class="col -3">
    <button type="button" class="btn btn-primary btn-lg" onClick="guardarCambios()">Guardar Cambios</button>
    </div>
   `

   mostrarDatos()
}

function guardarCambios() {
var usuario = JSON.parse(localStorage.getItem("usuario"));

    if (document.getElementById("fname").value !== "") {
        usuario.nombre = document.getElementById("fname").value
    }

    if (document.getElementById("lname").value  !== "") {
        usuario.apellido = document.getElementById("lname").value
    }

    if (document.getElementById("edad").value  !== "") {
        usuario.edad = document.getElementById("edad").value
    }

    if (document.getElementById("exampleInputEmail1").value  !== "") {
        usuario.email = document.getElementById("exampleInputEmail1").value
    }

    if (document.getElementById("tel").value  !== "") {
        usuario.telefono = document.getElementById("tel").value
    }

    if (document.getElementById("urlImagen").value !== "") {
        usuario.imagen = document.getElementById("urlImagen").value
    }
 
localStorage.setItem("usuario",JSON.stringify(usuario));

document.getElementById("success").innerHTML += `
<div class="row">
    <div class="col-xs-12 col-sm-6 col-sm-offset-3">
      <div class="new-message-box">
                    <div class="new-message-box-success">
                        <div class="info-tab tip-icon-success" title="success"><i class="fas fa-check"></i></div>
                        <div class="tip-box-success">
                            <!--<p><strong>Tip:</strong> If you want to enable the fading transition effect while closing the alert boxes, apply the classes <code>.fade</code> and <code>.in</code> to them along with the contextual class.</p>-->
                            <h3>Sus datos han sido guardados con éxito </h3>
                            <a class="btn btn-sm" href="my-profile.html"> Aceptar</a></p>
                        </div>
                    </div>
                </div>
</div>
</div>
`
}


function mostrarDatos() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));

    if (typeof usuario.nombre !== 'undefined') {
        document.getElementById("fname").value = usuario.nombre
    }

    if (typeof usuario.apellido !== 'undefined') {
        document.getElementById("lname").value = usuario.apellido
    }

    if (typeof usuario.edad !== 'undefined') {
        document.getElementById("edad").value = usuario.edad
    }

    if (typeof usuario.email !== 'undefined') {
        document.getElementById("exampleInputEmail1").value = usuario.email
    }
    

    if (typeof usuario.telefono !== 'undefined') {
        document.getElementById("tel").value = usuario.telefono
    }

    if (typeof usuario.imagen !== 'undefined') {
        document.getElementsById("urlImagen").value = usuario.imagen

        
    }

}