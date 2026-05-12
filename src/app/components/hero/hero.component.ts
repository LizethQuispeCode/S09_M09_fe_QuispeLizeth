import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  constructor(private router: Router) {}

  irADestinos(): void {
    this.router.navigate(['/destinos']);
  }

  irAReservas(): void {
    this.router.navigate(['/reservas']);
  }
}

