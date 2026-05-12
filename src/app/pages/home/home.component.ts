import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  irADestinos(): void {
    this.router.navigate(['/destinos']);
  }

  irAReservas(): void {
    this.router.navigate(['/reservas']);
  }
}

