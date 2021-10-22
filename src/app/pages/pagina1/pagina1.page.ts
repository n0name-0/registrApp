import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router'

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {

  constructor(public toastController: ToastController, private router: Router) { }

  async crearNotificacionLogout() {
    const notificacionLogout = await this.toastController.create({
      message: '¡Sesión finalizada!',
      duration: 2000,
      position: 'top'
    });
    notificacionLogout.present();

    localStorage.clear();
    localStorage.removeItem('datosAutenticacion')
  }

  ngOnInit() {

    setTimeout(()=>{// se establece un time out antes de la ejecucion para esperar la carga del registro en localstorage antes de consultarlo
      this.usuario()
    },100)
  }


    usuarios_logeados = []// se inicializa un arreglo vacio que sera enviado a la vista


    usuario(){//la funcion usuario recorre el total de usuarios logeados en sistema y retorna los datos del ultimo ingreso

      let user = localStorage.getItem('datosAutenticacion')
      //obtiene los datos de los usuarios registrados en el local storage
        user = user.replace('[','')//elimina el caracter [ de la cadena 
        user = user.replace(']','')//elimina el caracter ] de la cadena 
        user = user.split('},{').join('};{') //remplaza las comas por puntos y comas
        var temporal = user.split(';')// separa la cadena de texto por comas

        var usuarios_logeados_temporal =  new Array()//inicializa un nuevo array vacio 

        for (let index = 0; index < temporal.length; index++) { //recorre la cadena separada por puntos y comas
          
          var registro = temporal[index] //almacena el elemento que se esta recorriendo dentro de la variable registro

          var persona = JSON.parse(registro)//convierte la variable registro a formato json y lo almacena dentro de la variable persona
          
          var per = { //construye un objeto nuevo con los valores obtenidos de la variable persona
            usuario : persona.usuario,
            pass: persona.pass
          }

          usuarios_logeados_temporal.push(per)//inserta dentro del array usuarios_logeados_temporal los valores obtendos del objero per recien creado
        }


        this.usuarios_logeados =   usuarios_logeados_temporal[temporal.length -1]
        //asigna el valor del ultimo usuario logeado dentro del localstorage dentro de el arreglo usuarios_logeados que sera enviado a la vista
      
    }




    restartPass(user:string){
      //esta funcion redirecciona  a la pagina 5 enviando el username como parametro
      this.router.navigate(['/pagina5',user])
    }


}
