import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DestinoService, Destino } from '../../services/destino.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destino-list',
  templateUrl: './destino-list.component.html',
  styleUrls: ['./destino-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DestinoListComponent implements OnInit {
  destinos: Destino[] = [];
  cargando = false;
  error = '';

  constructor(
    private destinoService: DestinoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDestinos();
  }

  cargarDestinos(): void {
    this.cargando = true;
    this.destinoService.obtenerDestinos().subscribe({
      next: (data) => {
        this.destinos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar destinos: ' + err.message;
        this.cargando = false;
        console.error(err);
      }
    });
  }

  editar(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/destino-form', id]);
    }
  }

  eliminar(id: number | undefined): void {
    if (id && confirm('¿Estás seguro que deseas eliminar este destino?')) {
      this.destinoService.eliminarDestino(id).subscribe({
        next: () => {
          this.cargarDestinos();
        },
        error: (err) => {
          this.error = 'Error al eliminar: ' + err.message;
        }
      });
    }
  }

  nuevoDestino(): void {
    this.router.navigate(['/destino-form']);
  }

  irAReservas(): void {
    this.router.navigate(['/reservas']);
  }
}
