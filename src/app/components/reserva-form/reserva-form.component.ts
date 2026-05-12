import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService, Reserva } from '../../services/reserva.service';
import { DestinoService, Destino } from '../../services/destino.service';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ReservaFormComponent implements OnInit {
  reserva: Reserva = {
    id: 0,
    nombreCliente: '',
    email: '',
    telefonoContacto: '',
    destinoId: 0,
    fechaSalida: '',
    cantidadPersonas: 1,
    montoPago: 0,
    estado: 'Pendiente',
    comentarios: ''
  } as Reserva;
  reservaId: number | null = null;
  destinos: Destino[] = [];
  cargando = false;
  error = '';
  titulo = 'Crear Nueva Reserva';

  constructor(
    private reservaService: ReservaService,
    private destinoService: DestinoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cargarDestinos();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.reservaId = params['id'];
        this.titulo = 'Editar Reserva';
        if (this.reservaId) {
          this.cargarReserva(this.reservaId);
        }
      }
    });
  }

  cargarDestinos(): void {
    this.destinoService.obtenerDestinos().subscribe({
      next: (data) => {
        this.destinos = data;
      },
      error: (err) => {
        this.error = 'Error al cargar destinos';
      }
    });
  }

  cargarReserva(id: number): void {
    this.cargando = true;
    this.reservaService.obtenerReservaPorId(id).subscribe({
      next: (reserva) => {
        this.reserva = reserva as Reserva;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la reserva';
        this.cargando = false;
      }
    });
  }

  guardar(form: NgForm): void {
    if (form.invalid) {
      this.error = 'Por favor completa todos los campos correctamente';
      return;
    }

    this.cargando = true;
    const reservaEnviar: Reserva = {
      ...this.reserva,
      destinoId: typeof this.reserva.destinoId === 'string' ? parseInt(this.reserva.destinoId as any) : this.reserva.destinoId
    } as Reserva;

    const operacion = this.reservaId
      ? this.reservaService.actualizarReserva(this.reservaId, reservaEnviar)
      : this.reservaService.crearReserva(reservaEnviar);

    operacion.subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/reservas']);
      },
      error: (err) => {
        this.error = 'Error al guardar: ' + (err?.message ?? err);
        this.cargando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/reservas']);
  }
  
  // Template-driven: no getters required
}
