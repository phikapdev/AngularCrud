import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  clientes: Cliente[] = []

  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    )
  }

  deleteAlert(cliente: Cliente): void{
    Swal.fire({
      title: 'Eliminar Cliente!',
      text: "Estas Seguro de Eliminar el Cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Eliminado!',
              'El Cliente Ha sido Eliminado.',
              'success'
            )
          }
        )
      }
    })
  }

}
