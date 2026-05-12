import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Destino {
  id?: number;
  nombre: string;
  pais: string;
  descripcion: string;
  costo: number;
  dias: number;
  imagen: string;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DestinoService {
  private apiUrl = 'http://localhost:8081/api/destinos';

  constructor(private http: HttpClient) { }

  obtenerDestinos(): Observable<Destino[]> {
    return this.http.get<Destino[]>(this.apiUrl);
  }

  obtenerDestinoPorId(id: number): Observable<Destino> {
    return this.http.get<Destino>(`${this.apiUrl}/${id}`);
  }

  crearDestino(destino: Destino): Observable<Destino> {
    return this.http.post<Destino>(this.apiUrl, destino);
  }

  actualizarDestino(id: number, destino: Destino): Observable<Destino> {
    return this.http.put<Destino>(`${this.apiUrl}/${id}`, destino);
  }

  eliminarDestino(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
