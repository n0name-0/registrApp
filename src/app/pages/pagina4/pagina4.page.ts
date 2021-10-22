import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pagina4',
  templateUrl: './pagina4.page.html',
  styleUrls: ['./pagina4.page.scss'],
})
export class Pagina4Page implements OnInit {

  constructor(public toastController: ToastController) { }

  async crearNotificacion() {
    const notificacion1 = await this.toastController.create({
      message: 'Usuario registrado correctamente',
      duration: 2000,
      position: 'top'
    });
    notificacion1.present();
  }

  ngOnInit() {
  }

  // Controlador elementos input individuales.
  user = new FormControl('');
  clave = new FormControl('');

  // Controlador formulario en grupo.
  usuario = new FormGroup ({
    usuario : new FormControl('', Validators.required),
    clave : new FormControl('', Validators.required)
  });
  
  // Función Registrar un nuevo usuario.
  listaUsuarios = new Array();
  usu: any;

  registrarUsuario(){

    // Obtener elementos de este usuario. (desde form)
    this.usu = {
      usuario : this.usuario.controls.usuario.value,
      password : this.usuario.controls.clave.value
    };
    
    // Obtener localStorage exitente y reiniciar lista usuarios.
    var storage = localStorage.getItem('datosAutenticacion')
    this.listaUsuarios = [];  

    // Si localStorage contiene datos previos,
    // los añade a la nueva lista (para no perderlos).
    if (storage != null) {
      var datos = localStorage.getItem('datosAutenticacion');
      datos = datos.replace('[','');
      datos = datos.replace(']','');
      datos = datos.split('},{').join('};{');
      var arreglo_temp = datos.split(';');
      var per;
      var lista_temporal = new Array();
      for (let index = 0; index < arreglo_temp.length; index++) {
        var registro = arreglo_temp[index];
        var la_persona = JSON.parse(registro);
        per={
          usuario: la_persona.usuario,
          password: la_persona.password
        };
        lista_temporal.push(per);
      }
      this.listaUsuarios = lista_temporal;
    }
    

    // Procesado de datos de lista de usuarios a localStorage.
    this.listaUsuarios.push(this.usu);
    localStorage.removeItem('datosAutenticacion');
    localStorage.setItem('datosAutenticacion', JSON.stringify(this.listaUsuarios));

  }

} 