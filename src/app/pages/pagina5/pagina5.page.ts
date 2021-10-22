import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-pagina5',
  templateUrl: './pagina5.page.html',
  styleUrls: ['./pagina5.page.scss'],
})
export class Pagina5Page implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    var username = this.activatedRoute.snapshot.paramMap.get('user')
    //se usa la libreria active router para recibir el parametro que enviamos desde pagina uno
    this.buscar(username)
    //llamamos a la funcion buscar para setear el username dentro del form group, ya que este es usado dentro del formulario en un campo de tipo hidden
  }

  // Controlador formulario en grupo.
  persona = new FormGroup ({
    usuario : new FormControl('', Validators.required),
    clave : new FormControl('', Validators.required)
  });






  buscar(username:string){
    let session = localStorage.getItem('datosAutenticacion')
    //obtiene los datos de los usuarios registrados en el local storage
    session = session.replace('[','')//elimina el caracter [ de la cadena 
    session = session.replace(']','')//elimina el caracter ] de la cadena 
    session = session.split('},{').join('};{') //remplaza las comas por puntos y comas
      var temporal = session.split(';')// separa la cadena de texto por comas

      for (let index = 0; index < temporal.length; index++) { //recorre la cadena separada por puntos y comas
        
        var registro = temporal[index] //almacena el elemento que se esta recorriendo dentro de la variable registro

        var localstorage = JSON.parse(registro)//convierte la variable registro a formato json y lo almacena dentro de la variable persona
        
        if(localstorage.usuario =  username){
          
          /**si el nombre de usuario que recibe como parametro es igual al nombre de usuario encontrado en local storage
           * actualizamos el valor usuario del formulario para retornarlo a la vista
           * con esto al ejecutar el formulario capturaremos la nueva pass ingresada por el usuario y el usuario a quien corresponde dicha pass
           */
            this.persona.controls.usuario.setValue(username)
        }
      }
  }







  changePass(){

    alert(this.persona.controls.clave.value)

    let session = localStorage.getItem('datosAutenticacion')
    //obtiene los datos de los usuarios registrados en el local storage
    session = session.replace('[','')//elimina el caracter [ de la cadena 
    session = session.replace(']','')//elimina el caracter ] de la cadena 
    session = session.split('},{').join('};{') //remplaza las comas por puntos y comas
      var temporal = session.split(';')// separa la cadena de texto por comas

     

      for (let index = 0; index < temporal.length; index++) { //recorre la cadena separada por puntos y comas
        
        var registro = temporal[index] //almacena el elemento que se esta recorriendo dentro de la variable registro

        var localstorage = JSON.parse(registro)//convierte la variable registro a formato json y lo almacena dentro de la variable persona
        
        if(localstorage.usuario =  this.persona.controls.usuario.value){
          
          /**si el nombre de usuario que recibe como parametro es igual al nombre de usuario encontrado en local storage
           * actualizamos el valor usuario del formulario para retornarlo a la vista
           * con esto al ejecutar el formulario capturaremos la nueva pass ingresada por el usuario y el usuario a quien corresponde dicha pass
           */
          localstorage.password = this.persona.controls.clave.value 
          //seteamos dentro de localstorage el nuevo valor obtenido dentro desde el formulario
       
          localStorage.setItem("datosAutenticacion", JSON.stringify(localstorage)); 
          //seteamos dentro de local storach los valoresa ctualizados desde la variable localstorach
        }

      }

      
  }
}
