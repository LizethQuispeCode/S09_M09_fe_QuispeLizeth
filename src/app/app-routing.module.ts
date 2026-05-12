import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './pages/enrollments/enrollments.component';
import { HomeComponent } from './pages/home/home.component';
import { DestinoListComponent } from './components/destino-list/destino-list.component';
import { DestinoFormComponent } from './components/destino-form/destino-form.component';
import { ReservaListComponent } from './components/reserva-list/reserva-list.component';
import { ReservaFormComponent } from './components/reserva-form/reserva-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enrollments', component: EnrollmentsComponent },
  { path: 'destinos', component: DestinoListComponent },
  { path: 'destino-form', component: DestinoFormComponent },
  { path: 'destino-form/:id', component: DestinoFormComponent },
  { path: 'reservas', component: ReservaListComponent },
  { path: 'reserva-form', component: ReservaFormComponent },
  { path: 'reserva-form/:id', component: ReservaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
