var infoEstudiante=[];

function acceso(){
	var usuario = document.getElementById("idUsuario").value;
	var contraseña = document.getElementById("idContraseña").value;

	fetch('https://localhost:44318/api/Usuarios')
      .then(response=>response.json())
      .then(datos=>{

      	var contador = 0;
      	var encontrado = false;
      	var administrador = false;
      	var error = true;

      	while(contador<datos.length && !encontrado){
   
      		if(usuario==datos[contador].idUsuario && contraseña==datos[contador].contraseña){

      			fetch('https://localhost:44318/api/Catedraticos/'+usuario)
      			.then(response=>response.json())
      			.then(datos=>{
      				if (datos==true) {
                                    debugger;
                                    localStorage.setItem("usuario", usuario);
                                    localStorage.setItem("tipoUsuario", "catedratico");
      					window.location='../Sitio/paginas/inicio_usuario.html';
      				}else{
      					fetch('https://localhost:44318/api/Estudiantes/'+usuario)
      					.then(response=>response.json())
      					.then(datos=>{
      						if(datos.usuario_idUsuario==usuario){
                                                infoEstudiante = [datos.usuario_idUsuario, datos.carrera_idCarrera];
                                                localStorage.setItem("usuario", JSON.stringify(infoEstudiante));
                                                localStorage.setItem("tipoUsuario", "estudiante");
                                                window.location='../Sitio/paginas/inicio_usuario.html';
      						}
      					});
      				}
      			});

      			encontrado=true;
      		}

      		contador++;
      	}
      	
      	if(!encontrado){
      		fetch('https://localhost:44318/api/Administradores')
      		.then(response=>response.json())
      		.then(datos=>{

      			var i=0;
      			var acept=false;

      			while(i<datos.length && !acept){
      				if (usuario == datos[0].usuario && contraseña == datos[0].contraseña){
                                    acept=true;
      					window.location='../Sitio/paginas/inicio_administrador.html';
      				}
      				i++;
      			}

      			if(acept==false){
      				alert('Los datos ingresados son incorrectos!!!');
      			}
  
      		});
      	}
      });
}

//Funcion para los horarios
function horarios(){
      
      var miUsuario=localStorage.getItem("usuario");
      var codCatedratico;
      fetch('https://localhost:44318/api/Catedraticos')
      .then( response=>response.json()) 
      .then( datos=>{

            var contador=0;
            var encontrado=false;
            while( contador<datos.length && !encontrado){
                  debugger;
                  if(miUsuario==datos[contador].usuario_idUsuario){

                        codCatedratico=datos[contador].idCatedratico;
                        encontrado=true;
                  }
                  contador++;
            }
      });

      var script="";
      fetch('https://localhost:44318/api/Programaciones')
      .then(response=>response.json())
      .then(datos=>{

            fetch('https://localhost:44318/api/Cursos')
            .then(response=>response.json())
            .then(dat=>{

                  for(var i=0;i<datos.length;i++){

                        if(codCatedratico==datos[i].catedratico_idCatedratico){

                              for(var j=0;j<dat.length;j++){

                                    if(datos[i].curso_idCurso==dat[j].idCurso){

                                     script+="<tr>";   
                                     script+="<td>"+dat[j].nombreCurso+"</td>";
                                     script+="<td>"+datos[i].horario+"</td>";
                                     script+="<td>"+datos[i].seccion+"</td>";
                                     script+="</tr>";     
                                    
                                    }

                              }

                        }


                  }
                  
                  document.getElementById("tableCurso").innerHTML=script;

            });     

      });
}

function cargar(){
      if(localStorage.getItem("tipoUsuario") == "catedratico"){
            mostrarCatedratico();
            getAnuncioCatedratico();
      }else{
            if(localStorage.getItem("tipoUsuario") == "estudiante"){
                  mostrarEstudiante();
                  getAnuncio();
                  getPromocion();
            }else{
                  window.location="../index.html";
            }
      }
}

function cargarPensum(){
      if(localStorage.getItem("tipoUsuario") == "catedratico"){
            mostrarCatedratico();
      }else{
            if(localStorage.getItem("tipoUsuario") == "estudiante"){
                  mostrarEstudiante();
                  infoPensum();
            }else{
                  window.location="../index.html";
            }
      }
}

function cargarInfoCarrera(){
      if(localStorage.getItem("tipoUsuario") == "catedratico"){
            mostrarCatedratico();
      }else{
            if(localStorage.getItem("tipoUsuario") == "estudiante"){
                  mostrarEstudiante();
                  infoCarrera();
            }else{
                  window.location="../index.html";
            }
      }
}

function cargarActividad(){
      if(localStorage.getItem("tipoUsuario") == "catedratico"){
            mostrarCatedratico();
            getActividadCatedratico()
      }else{
            mostrarEstudiante();
            getActividad();
      }
}

function cargarHorarios(){

      if(localStorage.getItem("tipoUsuario") == "catedratico"){
            mostrarCatedratico();
      }else{
            mostrarEstudiante();
      }
      horarios();
}

function mostrarEstudiante(){ 

      var showEstudiante="";

      showEstudiante+="   <li> <a class=  \"nav-link\"   href= \"../index.html \" onclick=\"cerrarSesion()\" >Salir</a>  </li>"
      showEstudiante+="   <li> <a class=  \"nav-link\"   href= \"calendario.html \" >Calendario</a> </li>"
      showEstudiante+="   <li> <a class=  \"nav-link\"   href= \"pensum.html \" >Pensum</a> </li>"
      showEstudiante+="   <li> <a class=  \"nav-link\"   href= \"informacion_carrera.html\" >Carrera</a> </li>"
      showEstudiante+="   <li> <a class=  \"nav-link\"   href= \"inicio_usuario.html\" >Inicio</a> </li>" 

      document.getElementById("mostrar").innerHTML=showEstudiante;

}

function mostrarCatedratico(){

      var showCatedratico="";

      showCatedratico+="   <li> <a class=  \"nav-link\"   href= \"../index.html \" onclick=\"cerrarSesion() \" >Salir</a> </li>"
      showCatedratico+="   <li> <a class=  \"nav-link\"   href= \"horarios_catedratico.html\" >Horarios</a> </li>"
      showCatedratico+="   <li> <a class=  \"nav-link\"   href= \"calendario.html \" >Calendario</a> </li>"
      showCatedratico+="   <li> <a class=  \"nav-link\"   href= \"inicio_usuario.html\" >Inicio</a> </li>" 

      document.getElementById("mostrar").innerHTML=showCatedratico;

}

function getAnuncioCatedratico(){

      fetch('https://localhost:44318/api/Publicaciones')
      .then(response=>response.json())
      .then(datos=>{

            var script="";

            debugger;
            for(var i=datos.length-1; i>=0; i--){
                        
                        if(datos[i].tipoPublicacion == "Anuncio"){
                              script+="<h2 align=\"center\">"+datos[i].tituloPublicacion+"</h2>";
                        script+="<h3>"+datos[i].informacionPublicacion+"</h3>";

                        //Con este if valido que sí existe un enlace para el video en la base de datos
                        //Si el registro en la base de datos no es nulo y además contiene la palabra http o https entonces sí existe
                        if(datos[i].videoPublicacion != null && (datos[i].videoPublicacion.includes("http://") || datos[i].videoPublicacion.includes("https://"))){
                              script+="<video src=\""+datos[i].videoPublicacion+"\"></video><br>";
                        }

                        //Con este if valido que sí existe la imagen en la base de datos
                        //Si el registro en la base de datos no es nulo y además contiene la palabra base64 entonces sí existe
                        if(datos[i].imagenPublicacion!=null && datos[i].imagenPublicacion.includes("base64")){
                              script+="<div align=\"center\"><img src=\""+datos[i].imagenPublicacion+"\" width=\"250px\"></div>";
                        }

                        script+="<br><br><hr><br><br>";
                        }            
                  }
            document.getElementById("idMain").innerHTML="<article id=\"anuncios\" style=\"width=100%;\"></article>";
            document.getElementById("anuncios").innerHTML=script;

      });
}

function getAnuncio(){
      infoEstudiante = JSON.parse(localStorage.getItem("usuario"));
      var carreraAlum = infoEstudiante[1];

      fetch('https://localhost:44318/api/Publicaciones')
      .then(response=>response.json())
      .then(datos=>{

            var script="";

            for(var i=datos.length-1; i>=0; i--){
                  if(carreraAlum == datos[i].carrera_idCarrera && datos[i].tipoPublicacion == "Anuncio"){

                        script+="<h2 align=\"center\">"+datos[i].tituloPublicacion+"</h2>";
                        script+="<h3>"+datos[i].informacionPublicacion+"</h3>";

                        //Con este if valido que sí existe un enlace para el video en la base de datos
                        //Si el registro en la base de datos no es nulo y además contiene la palabra http o https entonces sí existe
                        if(datos[i].videoPublicacion != null && (datos[i].videoPublicacion.includes("http://") || datos[i].videoPublicacion.includes("https://"))){
                              script+="<video src=\""+datos[i].videoPublicacion+"\"></video><br>";
                        }

                        //Con este if valido que sí existe la imagen en la base de datos
                        //Si el registro en la base de datos no es nulo y además contiene la palabra base64 entonces sí existe
                        if(datos[i].imagenPublicacion!=null && datos[i].imagenPublicacion.includes("base64")){
                              script+="<div align=\"center\"><img src=\""+datos[i].imagenPublicacion+"\" width=\"250px\"></div>";
                        }

                        script+="<br><br><hr><br><br>";            
                  }
            }

            document.getElementById("anuncios").innerHTML=script;

      });
}

function getPromocion(){
      infoEstudiante = JSON.parse(localStorage.getItem("usuario"));
      var carreraAlum = infoEstudiante[1];

      fetch('https://localhost:44318/api/Publicaciones')
      .then(response=>response.json())
      .then(datos=>{

            var script="";

            for(var i=datos.length-1; i>=0; i--){
                  if(carreraAlum == datos[i].carrera_idCarrera && datos[i].tipoPublicacion == "Promoción"){

                        script+="<h2 align=\"center\">"+datos[i].tituloPublicacion+"</h2>";
                        script+="<h3>"+datos[i].informacionPublicacion+"</h3>";
                        if(datos[i].videoPublicacion != null && (datos[i].videoPublicacion.includes("http://") || datos[i].videoPublicacion.includes("https://"))){
                              script+="<video src=\""+datos[i].videoPublicacion+"\"></video><br>";
                        }
                        if(datos[i].imagenPublicacion!=null && datos[i].imagenPublicacion.includes("base64")){
                              script+="<div align=\"center\"><img src=\""+datos[i].imagenPublicacion+"\" width=\"250px\"></div>";
                        }
                        script+="<br><br><hr><br><br>";            
                  }
            }

            document.getElementById("promociones").innerHTML=script;

      });
}

function getActividad(){
      debugger;
      infoEstudiante = JSON.parse(localStorage.getItem("usuario"));
      var carreraAlum = infoEstudiante[1];

      fetch('https://localhost:44318/api/Actividades')
      .then(response=>response.json())
      .then(datos=>{

            var script="";
            for(var i=0; i<datos.length; i++){
                  if(carreraAlum == datos[i].carrera_idCarrera){
                        script+="<tr>";
                        script+="<td>"+datos[i].tituloActividad+"</td>";
                        script+="<td>"+datos[i].fechaInicio+"</td>";
                        script+="<td>"+datos[i].fechaFin+"</td>";
                        script+="</tr>";              
                  }
            }

            document.getElementById("agregar").innerHTML=script;

      });

}

function getActividadCatedratico(){

      fetch('https://localhost:44318/api/Actividades')
      .then(response=>response.json())
      .then(datos=>{

            var script="";
            for(var i=0; i<datos.length; i++){
                  script+="<tr>";
                  script+="<td>"+datos[i].tituloActividad+"</td>";
                  script+="<td>"+datos[i].fechaInicio+"</td>";
                  script+="<td>"+datos[i].fechaFin+"</td>";
                  script+="</tr>"; 
            }

            document.getElementById("agregar").innerHTML=script;

      });

}

function setCarrera(){

      var nombre = document.getElementById("idNomCarrera").value;
      var exito = false;

      if(nombre.length!=0){

            fetch('https://localhost:44318/api/Carreras', {
                  method: "POST",
                  body: JSON.stringify({nombreCarrera: nombre}),
                  headers: {
                        "Acept": "application/json",
                        "Content-Type": "application/json"
                  }
            })
            .then(aviso=>{
                  
                  alert('La carrera se registró con ÉXITO!!!');
                  document.getElementById("idNomCarrera").value=null;
                  getCarrera();

            });

      }else{
            alert('Hay campos pendientes de llenar!!!');
      }

}

function setJornada(){

      var combobox1 = document.getElementById("idCarreras");
      var carrera = combobox1.options[combobox1.selectedIndex].value;
      var direccion = document.getElementById("idDireCarrera").value;
      var combobox2 = document.getElementById("idJornada");
      var jornada = combobox2.options[combobox2.selectedIndex].text;

      if(carrera.length!=0 && direccion.length!=0 && jornada.selectedIndex!=0){
            fetch('https://localhost:44318/api/Jornadas', {
                  method: "POST",
                  body: JSON.stringify({
                        dia: jornada,
                        ubicacion: direccion,
                        carrera_idCarrera: parseInt(carrera)
                  }),
                  headers: {
                        "Acept": "application/json",
                        "Content-Type": "application/json"
                  }
            })
            .then(aviso=>{
                  alert('La jornada se registró con ÉXITO!!!');
                  document.getElementById("idNomCarrera").value=null;
                  document.getElementById("idDireCarrera").value=null;
                  document.getElementById("idJornada").selectedIndex=0;
                  getCarrera();
            })
      }else{
            alert('Hay campos pendientes de llenar!!!');
      }
}

function setEstudiante(){

      var nombreUsuario = document.getElementById("idNombreE").value;
      var usuario = document.getElementById("idUsuarioE").value;
      var contraseñaUsuario = document.getElementById("idContraseñaE").value;
      var codCarrera = document.getElementById("idRegCarrera").value;

      if (nombreUsuario.length!=0 && usuario.length!=0 && contraseñaUsuario.length!=0 && codCarrera.selectedIndex!=0){

            //Primero se registra como un usuario en general
            fetch('https://localhost:44318/api/Usuarios', {
                  method: "POST",
                  body: JSON.stringify({
                        idUsuario: usuario,
                        nombre: nombreUsuario,
                        contraseña: contraseñaUsuario
                  }),
                  headers: {
                        "Acept": "application/json",
                        "Content-Type": "application/json"
                  }
            })
            .then(est=>{

                  //Aquí se registra como un estudiante
                  fetch('https://localhost:44318/api/Estudiantes', {
                        method: "POST",
                        body: JSON.stringify({
                              carrera_idCarrera: parseInt(codCarrera),
                              usuario_idUsuario: usuario
                        }),
                        headers: {
                              "Acept": "application/json",
                              "Content-Type": "application/json"
                        }
                  })
                  .then(ir=>{
                        alert('Se ha registrado con ÉXITO!!!');
                        alert('Inicie sesión para continuar!');
                        window.location='../index.html';
                  });

            });

      }else{
            alert('Hay campos pendientes de llenar!!!');
      }

}

function getCarreraEstudiante(){

      fetch('https://localhost:44318/api/Carreras')
      .then(response=>response.json())
      .then(datos=>{

            //Este fetch sirve para obtener la jornada en que se imparte la carrera
            fetch('https://localhost:44318/api/Jornadas')
            .then(response=>response.json())
            .then(dias=>{

                  var script="<option value=\"0\" selected disabled>-Carrera-</option>";

                  for(var i=0; i<datos.length; i++){
                        for(j=0; j<dias.length; j++){
                              if(datos[i].idCarrera == dias[j].carrera_idCarrera){
                                    script+="<option value="+datos[i].idCarrera+">"+datos[i].nombreCarrera+" - Plan "+dias[j].dia+"</option>";
                              }
                        }
                  }

                  document.getElementById("idRegCarrera").innerHTML=script;
                  

            });

      });
}

//Este método sirve para llevar el select del módulo agregar curso
function getCarrera(){

      fetch('https://localhost:44318/api/Carreras')
      .then(response=>response.json())
      .then(datos=>{

            var script="<option value=\"0\" selected disabled>-Carrera-</option>";

            for(var i=0; i<datos.length; i++){

                  script+="<option value="+datos[i].idCarrera+">"+datos[i].nombreCarrera+"</option>";
            }

            document.getElementById("idCarreras").innerHTML=script;

      });
}

function setCurso(){

      var nomCurso = document.getElementById("idNomCurso").value;
      var cicloCarrera = document.getElementById("idCicloCarrera").value;
      var combobox = document.getElementById("idCarreras");
      var carreraC = combobox.options[combobox.selectedIndex].value;

      if(nomCurso.length!=0 && cicloCarrera!=0){
            
            fetch('https://localhost:44318/api/Cursos', {
                  method: "POST",
                  body: JSON.stringify({
                        nombreCurso: nomCurso,
                        semestre: parseInt(cicloCarrera),
                        carrera_idCarrera: parseInt(carreraC)
                  }),
                  headers: {
                        "Acept": "application/json",
                        "Content-Type": "application/json"
                  }
            })
            .then(aviso=>{
                  alert('El curso se registró con ÉXITO!!!');
                  document.getElementById("idNomCurso").value=null;
                  document.getElementById("idCicloCarrera").value=null;
                  document.getElementById("idCarreras").selectedIndex=0;
            });

      }else{
            alert("Hay campos pendientes de llenar!!!");
      }

}

function getCatedratico(){

      fetch('https://localhost:44318/api/Catedraticos')
      .then(response=>response.json())
      .then(datos=>{

            fetch('https://localhost:44318/api/Usuarios')
            .then(resp=>resp.json())
            .then(dat=>{

                  var script="<option value=\"0\" selected disabled>-Catedrático-</option>";

                  for(var i=0; i<datos.length; i++){

                        for(var j=0; j<dat.length; j++){
                              if(datos[i].usuario_idUsuario==dat[j].idUsuario){
                                    script+="<option value="+datos[i].idCatedratico+">"+dat[j].nombre+"</option>";
                              }
                        }

                  }

                  document.getElementById("idAddCatedratico").innerHTML=script;

            });

      });

}

function setCatedratico(){

      var profesor = document.getElementById("nomCate").value;
      var usuarioP = document.getElementById("idCate").value;
      var contraseñaP = document.getElementById("idContraCate").value;

      if(profesor.length!=0 && usuarioP.length!=0 && contraseñaP.length!=0){
            
            //Primero se registra como usuario en general
            fetch('https://localhost:44318/api/Usuarios', {
                  method: "POST",
                  body: JSON.stringify({
                        idUsuario: usuarioP,
                        nombre: profesor,
                        contraseña: contraseñaP
                  }),
                  headers: {
                        "Acept": "application/json",
                        "Content-Type": "application/json"
                  }
            })
            .then(cat=>{

                  fetch('https://localhost:44318/api/Catedraticos', {
                        method: "POST",
                        body: JSON.stringify({
                              usuario_idUsuario: usuarioP
                        }),
                        headers: {
                              "Acept": "application/json",
                              "Content-Type": "application/json"
                        }
                  })
                  .then(aviso=>{
                        alert("El catedratico se registró con ÉXITO!!!");
                        document.getElementById("nomCate").value=null;
                        document.getElementById("idCate").value=null;
                        document.getElementById("idContraCate").value=null;

                  });

            });


      }else{
            alert("Hay campos pendientes de llenar!!!");
      }

}

function getFile(){

      var resultado="";
      var file = document.querySelector('input[type=file]').files[0];
      var reader = new FileReader();

      reader.addEventListener("load", function(){
            resultado = reader.result;
            sessionStorage.setItem("url", resultado);
      },false);

      if (file){
            reader.readAsDataURL(file);
      }

}

function setAnuncio(){

      var tituloA = document.getElementById("idTitulo").value;
      var info = document.getElementById("idinfo").value;
      var carrera = document.getElementById("idCarreras").value;
      
      var imagen = sessionStorage.getItem("url");
      sessionStorage.removeItem("url");

      if(tituloA.length!=0 && info.length!=0 && carrera!=0){
            
            fetch('https://localhost:44318/api/Publicaciones', {
                  method: "POST",
                  body: JSON.stringify({
                  tipoPublicacion: "Anuncio",
                  tituloPublicacion: tituloA,
                  informacionPublicacion: info,
                  videoPublicacion: null,
                  imagenPublicacion: imagen,
                  carrera_idCarrera: parseInt(carrera)
                  }),
                  headers: {
                        "Acept": "application/json",
                        "Content-Type": "application/json"
                  }
            })
            .then(aviso=>{
                  alert("El anuncio se agregó correctamente!!!");
                  document.getElementById("idTitulo").value=null;
                  document.getElementById("idinfo").value=null;
                  document.getElementById("idCarreras").selectedIndex=0;
                  
                  document.getElementById("idImagen").value=null;
            });

      }else{
            alert('Hay campos obligatorios pendientes de llenar!!!');
      }

}

function cargarPagProm(){

      getCarrera();
      selectQuitarPromo();
}

function setPromocion(){

      var tituloA = document.getElementById("idTitulo").value;
      var info = document.getElementById("idDescripcion").value;
      var carrera = document.getElementById("idCarreras").value;
      var imagen = sessionStorage.getItem("url");
      sessionStorage.removeItem("url");

      if(tituloA.length!=0 && info.length!=0 && carrera!=0){
            
            fetch('https://localhost:44318/api/Publicaciones', {
                  method: "POST",
                  body: JSON.stringify({
                  tipoPublicacion: "Promoción",
                  tituloPublicacion: tituloA,
                  informacionPublicacion: info,
                  videoPublicacion: null,
                  imagenPublicacion: imagen,
                  carrera_idCarrera: parseInt(carrera)
                  }),
                  headers: {
                        "Acept": "application/json",
                        "Content-Type": "application/json"
                  }
            })
            .then(aviso=>{
                  alert("La promoción se agregó correctamente!!!");
                  document.getElementById("idTitulo").value=null;
                  document.getElementById("idDescripcion").value=null;
                  document.getElementById("idCarreras").selectedIndex=0;
                  document.getElementById("idImagen").value=null;
            });

            //Vuelve a cargar el select con la nueva información
            selectQuitarPromo();

      }else{
            alert('Hay campos obligatorios pendientes de llenar!!!');
      }

}

function selectQuitarPromo(){

      fetch('https://localhost:44318/api/Publicaciones')
      .then(response=>response.json())
      .then(datos=>{

            var script="<option value=\"0\" selected disabled>-Título Promoción-</option>";

            for(var i=0; i<datos.length; i++){

                  if(datos[i].tipoPublicacion == "Promoción"){

                        script+="<option value=\""+datos[i].idPublicacion+"\">"+datos[i].tituloPublicacion+"</option>";          
                  }
            }

            document.getElementById("idTituloProm").innerHTML=script;

      });
}

function quitarPromocion(){

      var titulo = document.getElementById("idTituloProm").value;

      if(titulo!=0){
            
            fetch('https://localhost:44318/api/Publicaciones/'+titulo, {
                  method: "DELETE"
            })
            .then(aviso=>alert("La promoción se eliminó correctamente!!!"));

      }else{
            alert('Seleccione el título de la promoción a eliminar!!!');
      }

}

function setActividad(){

      var titulo = document.getElementById("idTituloAct").value;
      var info = document.getElementById("idDescAct").value;
      var diaI = document.getElementById("idDiaInicio").value;
      combobox1 = document.getElementById("idMesInicio");
      var mesI = combobox1.options[combobox1.selectedIndex].text;
      combobox2 = document.getElementById("idMesFin");
      var mesF = combobox2.options[combobox2.selectedIndex].text;
      var diaF = document.getElementById("idDiaFin").value;
      var carrera = document.getElementById("idCarreras").value;

      if(titulo.length!=0 && info.length!=0 && diaI.length!=0 && mesI.length!=0 && diaF.length!=0 && mesF.length!=0){

            var fInicio = diaI+" "+mesI;
            var fFin = diaF+" "+mesF;

             fetch('https://localhost:44318/api/Actividades', {
                  method: "POST",
                  body: JSON.stringify({
                  tituloActividad: titulo,
                  descripcionActividad: info,
                  fechaInicio: fInicio,
                  fechaFin: fFin,
                  carrera_idCarrera: parseInt(carrera)
                  }),
                  headers: {
                        "Acept": "application/json",
                        "Content-Type": "application/json"
                  }
            })
            .then(aviso=>{

                  alert("La actividad se agregó con ÉXITO!!!");
                  document.getElementById("idTituloAct").value = null;
                  document.getElementById("idDescAct").value = null;
                  document.getElementById("idDiaInicio").value = null;
                  document.getElementById("idMesInicio").selectedIndex=0;
                  document.getElementById("idMesFin").selectedIndex=0;
                  document.getElementById("idDiaFin").value = null;
                  document.getElementById("idCarreras").selectedIndex=0;
            }); 


      }else{
            alert('Hay campos pendientes de llenar!!!');
      }

}

//Cuando se carga la página de programación de cursos entonces se llama a éste método
function cargarPagHorario(){
      getCarrera();
      getCatedratico();

}

//En la página de programación de cursos, cuando se seleccina una carrera entonce se llama a ese método para llenar los demás combobox//
function comboboxProgCursos(){
      programarCurso();
      programarJornada();
}

//Llena el combobox de cursos en la página programar curso
function programarCurso(){

      fetch('https://localhost:44318/api/Cursos')
      .then(response=>response.json())
      .then(datos=>{

            var script="<option value=\"0\" selected disabled>-Cursos-</option>";

            for(var i=0; i<datos.length; i++){

                  if (document.getElementById("idCarreras").value == datos[i].carrera_idCarrera){
                        script+="<option value="+datos[i].idCurso+">"+datos[i].nombreCurso+"</option>";
                  }
            }

            document.getElementById("idCursos").innerHTML=script;

      });

}

//Llena el combobox de jornadas en la página de programación de cursos
function programarJornada(){

      fetch('https://localhost:44318/api/Jornadas')
      .then(response=>response.json())
      .then(datos=>{

            var script="<option value=\"0\" selected disabled>-Jornada-</option>";

            for(var i=0; i<datos.length; i++){

                  if (document.getElementById("idCarreras").value == datos[i].carrera_idCarrera){
                        script+="<option value="+datos[i].idJornada+">"+datos[i].dia+"</option>";
                  }
            }

            document.getElementById("idJornada").innerHTML=script;

      });

}

function setProgramacion(){

      var seccionProg = document.getElementById("idSeccion").value.toUpperCase();
      var combobox1 = document.getElementById("idHorario");
      var horarioProg = combobox1.options[combobox1.selectedIndex].text;
      var curso = document.getElementById("idCursos").value;
      var jornada = document.getElementById("idJornada").value;
      var catedratico = document.getElementById("idAddCatedratico").value;

      if(seccionProg.length!=0 && horarioProg.length!=0 && curso!=0 && jornada!=0 && catedratico!=0){
            
            fetch('https://localhost:44318/api/Programaciones', {
                  method: "POST",
                  body: JSON.stringify({
                  seccion: seccionProg,
                  horario: horarioProg,
                  curso_idCurso: parseInt(curso),
                  jornada_idJornada: parseInt(jornada),
                  catedratico_idCatedratico: parseInt(catedratico)
                  }),
                  headers: {
                        "Acept": "application/json",
                        "Content-Type": "application/json"
                  }
            })
            .then(aviso=>{
                  alert("La programación del curso se realizó correctamente!!!");
                  document.getElementById("idCarreras").selectedIndex=0;
                  document.getElementById("idSeccion").value=null;
                  document.getElementById("idHorario").selectedIndex=0;
                  var curso = document.getElementById("idCursos").selectedIndex=0;
                  var jornada = document.getElementById("idJornada").selectedIndex=0;
                  var catedratico = document.getElementById("idAddCatedratico").selectedIndex=0;
            });

      }else{
            alert('Hay campos obligatorios pendientes de llenar!!!');
      }

}

// Metodo para cerras sesion activa
function cerrarSesion(){

localStorage.removeItem("usuario");
localStorage.removeItem("tipoUsuario");

}

function infoCarrera(){

      infoEstudiante = JSON.parse(localStorage.getItem("usuario"));
      var carreraAlum = infoEstudiante[1];

      var c1="";
      var c2="";
      var c3="";
      var c4="";
      var c5="";
      var c6="";
      var c7="";
      var c7="";
      var c8="";
      var c9="";
      var c10="";

      fetch('https://localhost:44318/api/Programaciones')
      .then(response=>response.json())
      .then(datos=>{

            fetch('https://localhost:44318/api/Cursos')
            .then(response=>response.json())
            .then(dat=>{
                  debugger;
                  for(var i=0;i<datos.length;i++){

                        for(var j=0;j<dat.length;j++){
                                    
                              if(carreraAlum==dat[j].carrera_idCarrera && datos[i].curso_idCurso==dat[j].idCurso){
                                          
                                    if(dat[j].semestre == 1){
                                          c1+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                    }else{
                                          if(dat[j].semestre == 2){
                                                c2+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                          }else{
                                                if(dat[j].semestre == 3){
                                                      c3+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                                }else{
                                                      if(dat[j].semestre == 4){
                                                            c4+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                                      }else{
                                                            if(dat[j].semestre == 5){
                                                                  c5+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                                            }else{
                                                                  if(dat[j].semestre == 6){
                                                                        c6+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                                                  }else{
                                                                        if(dat[j].semestre == 7){
                                                                              c7+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                                                        }else{
                                                                              if(dat[j].semestre == 8){
                                                                                    c8+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                                                              }else{
                                                                                    if(dat[j].semestre == 9){
                                                                                          c9+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                                                                    }else{
                                                                                          if(dat[j].semestre == 10){
                                                                                                c10+="<tr><td>"+dat[j].nombreCurso+"</td><td>"+datos[i].seccion+"</td><td>"+datos[i].horario+"</td></tr>";
                                                                                          }
                                                                                    }
                                                                              }
                                                                        }
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    }   
                                    
                              }

                        }


                  }

                  document.getElementById("Ciclo1").innerHTML=c1;
                  document.getElementById("Ciclo2").innerHTML=c2;
                  document.getElementById("Ciclo3").innerHTML=c3;
                  document.getElementById("Ciclo4").innerHTML=c4;
                  document.getElementById("Ciclo5").innerHTML=c5;
                  document.getElementById("Ciclo6").innerHTML=c6;
                  document.getElementById("Ciclo7").innerHTML=c7;
                  document.getElementById("Ciclo8").innerHTML=c8;
                  document.getElementById("Ciclo9").innerHTML=c9;
                  document.getElementById("Ciclo10").innerHTML=c10;

            });     

      });
}

function infoPensum(){

      infoEstudiante = JSON.parse(localStorage.getItem("usuario"));
      var carreraAlum = infoEstudiante[1];

      var c1="";
      var c2="";
      var c3="";
      var c4="";
      var c5="";
      var c6="";
      var c7="";
      var c7="";
      var c8="";
      var c9="";
      var c10="";

      fetch('https://localhost:44318/api/Cursos')
            .then(response=>response.json())
            .then(dat=>{
                  debugger;

                  for(var j=0;j<dat.length;j++){
                                    
                              if(carreraAlum==dat[j].carrera_idCarrera){
                                          
                                    if(dat[j].semestre == 1){
                                          c1+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                    }else{
                                          if(dat[j].semestre == 2){
                                                c2+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                          }else{
                                                if(dat[j].semestre == 3){
                                                      c3+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                                }else{
                                                      if(dat[j].semestre == 4){
                                                            c4+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                                      }else{
                                                            if(dat[j].semestre == 5){
                                                                  c5+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                                            }else{
                                                                  if(dat[j].semestre == 6){
                                                                        c6+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                                                  }else{
                                                                        if(dat[j].semestre == 7){
                                                                              c7+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                                                        }else{
                                                                              if(dat[j].semestre == 8){
                                                                                    c8+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                                                              }else{
                                                                                    if(dat[j].semestre == 9){
                                                                                          c9+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                                                                    }else{
                                                                                          if(dat[j].semestre == 10){
                                                                                                c10+="<tr><td>"+dat[j].nombreCurso+"</td></tr>";
                                                                                          }
                                                                                    }
                                                                              }
                                                                        }
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    }   
                                    
                              }

                        }

                  document.getElementById("idPensum1").innerHTML=c1;
                  document.getElementById("idPensum2").innerHTML=c2;
                  document.getElementById("idPensum3").innerHTML=c3;
                  document.getElementById("idPensum4").innerHTML=c4;
                  document.getElementById("idPensum5").innerHTML=c5;
                  document.getElementById("idPensum6").innerHTML=c6;
                  document.getElementById("idPensum7").innerHTML=c7;
                  document.getElementById("idPensum8").innerHTML=c8;
                  document.getElementById("idPensum9").innerHTML=c9;
                  document.getElementById("idPensum10").innerHTML=c10;

            });     
}