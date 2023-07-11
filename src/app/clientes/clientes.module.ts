import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DetalleComponent } from './pages/detalle/detalle.component';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent,
    HomeComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
