import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservaService, Reserva } from '../../services/reserva.service';
import { DestinoService, Destino } from '../../services/destino.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ReservaListComponent implements OnInit {
  reservas: Reserva[] = [];
  destinos: Destino[] = [];
  cargando = false;
  error = '';

  constructor(
    private reservaService: ReservaService,
    private destinoService: DestinoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.destinoService.obtenerDestinos().subscribe({
      next: (destinos) => {
        this.destinos = destinos;
        this.cargarReservas();
      },
      error: (err) => {
        this.error = 'Error al cargar destinos';
        this.cargando = false;
      }
    });
  }

  cargarReservas(): void {
    this.reservaService.obtenerReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar reservas: ' + err.message;
        this.cargando = false;
        console.error(err);
      }
    });
  }

  obtenerNombreDestino(destinoId: number): string {
    const destino = this.destinos.find(d => d.id === destinoId);
    return destino ? destino.nombre : 'Destino no encontrado';
  }

  editar(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/reserva-form', id]);
    }
  }

  eliminar(id: number | undefined): void {
    if (id && confirm('¿Estás seguro que deseas cancelar esta reserva?')) {
      this.reservaService.eliminarReserva(id).subscribe({
        next: () => {
          this.cargarReservas();
        },
        error: (err) => {
          this.error = 'Error al eliminar: ' + err.message;
        }
      });
    }
  }

  nuevaReserva(): void {
    this.router.navigate(['/reserva-form']);
  }

  irADestinos(): void {
    this.router.navigate(['/destinos']);
  }
}
