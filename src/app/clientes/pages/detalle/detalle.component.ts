import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';

import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {

  titulo: string = "Detalles Cliente"

  constructor(private clienteService: ClientesService,
              private activatedRoute: ActivatedRoute) { }
              
ngOnInit(): void {
    this.obtenerCliente()
}

  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    createAt: '',
    email: ''
  }

   //Obtener Cliente
 public obtenerCliente(): void{
  this.activatedRoute.params.subscribe(param => {
    let id = param['id']

    if(id){
      this.clienteService.getCliente(id).subscribe(
        (cliente) => this.cliente = cliente
      )
    }
  })
 }


}
