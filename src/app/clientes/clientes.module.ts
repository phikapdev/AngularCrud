import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
