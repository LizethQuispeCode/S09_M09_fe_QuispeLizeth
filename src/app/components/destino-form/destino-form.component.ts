import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinoService, Destino } from '../../services/destino.service';

@Component({
  selector: 'app-destino-form',
  templateUrl: './destino-form.component.html',
  styleUrls: ['./destino-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class DestinoFormComponent implements OnInit {
  destino: Destino = {
    id: 0,
    nombre: '',
    pais: '',
    descripcion: '',
    costo: 0,
    dias: 1,
    imagen: '',
    disponible: true
  } as Destino;
  destinoId: number | null = null;
  cargando = false;
  error = '';
  titulo = 'Crear Nuevo Destino';

  constructor(
    private destinoService: DestinoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.destinoId = params['id'];
        this.titulo = 'Editar Destino';
        if (this.destinoId) {
          this.cargarDestino(this.destinoId);
        }
      }
    });
  }

  cargarDestino(id: number): void {
    this.cargando = true;
    this.destinoService.obtenerDestinoPorId(id).subscribe({
      next: (destino) => {
        this.destino = destino as Destino;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el destino';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  guardar(form: NgForm): void {
    if (form.invalid) {
      this.error = 'Por favor completa todos los campos correctamente';
      return;
    }

    this.cargando = true;
    const destinoEnviar: Destino = {
      ...this.destino,
      costo: Number(this.destino.costo),
      dias: Number(this.destino.dias)
    } as Destino;

    const operacion = this.destinoId
      ? this.destinoService.actualizarDestino(this.destinoId, destinoEnviar)
      : this.destinoService.crearDestino(destinoEnviar);

    operacion.subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/destinos']);
      },
      error: (err) => {
        this.error = 'Error al guardar: ' + (err?.message ?? err);
        this.cargando = false;
        console.error(err);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/destinos']);
  }

  // Template-driven: no getters required
}
