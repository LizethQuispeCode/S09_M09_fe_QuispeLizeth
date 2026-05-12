import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
 nombre: string = '';
 email: string = '';
 mensaje: string = '';


 enviar() {
  console.log('Nombre:', this.nombre);
  console.log('Email:', this.email);
  console.log('Mensaje:', this.mensaje);

  alert('Mensaje enviado correctamente');

  //Limpiar el formulario
  this.nombre = '';
  this.email = '';
  this.mensaje = '';
 }
}
