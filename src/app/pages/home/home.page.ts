import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public toastController: ToastController) { }

  async crearNotificacionIngreso() {
    const notificacionIngreso = await this.toastController.create({
      message: '¡Sesión iniciada!',
      duration: 2000,
      position: 'top'
    });
    notificacionIngreso.present();
  }

  ngOnInit(){
  }

  // Controlador formulario en grupo.
  persona = new FormGroup ({
    usuario : new FormControl('', Validators.required),
    clave : new FormControl('', Validators.required)
  });
  
  // Función ingresar.
  lista_personas = new Array();
  perso:any;
  ingresar(){
    this.perso={
      usuario: this.persona.controls.usuario.value,
      password: this.persona.controls.clave.value
    }
    this.lista_personas.push(this.perso);
    localStorage.setItem('datosAutenticacion',JSON.stringify(this.lista_personas));
  }

}
