import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    createAt: '',
    email: ''
  }

  errors: string[] = []

  titulo: string = "Crear Cliente"

 constructor(private clienteService: ClientesService,
             private router: Router,
             private activatedRoute: ActivatedRoute) { }

 ngOnInit(): void {
  this.obtenerCliente()
 }

 //Obtener Cliente
 public obtenerCliente(): void{
  this.activatedRoute.params.subscribe({
    next: (param) =>  {
      let id = param['id']

      if(id){
        this.clienteService.getCliente(id).subscribe({
          next: (cliente: Cliente) =>  {
           this.cliente = cliente
          }
        })
      }
    }
  });
 }

 //Crear Cliente
 public crearCliente(): void {
  this.clienteService.createCliente(this.cliente).subscribe({
    next: (cliente: Cliente) =>  {
      this.router.navigate(['/listado'])
      Swal.fire({
        title: 'Nuevo Cliente',
        text: `Cliente: ${cliente.nombre} ${cliente.apellido} creado con exito`,
        icon: 'success'
      })
    },
    complete: () => {},
    error: (err) => {
      this.errors = err.error.errors as string []
      console.error('Codigo del Error desde del BackEnd: ' + err.status)
      console.error(err.error.errors)
    }
  });
}

 //Actualizar Cliente
public actualizarCliente(): void {
  this.clienteService.updateCliente(this.cliente).subscribe({
    next: (cliente: Cliente) =>  {
      this.router.navigate(['/listado'])
      Swal.fire({
        title: 'Cliente Actualizado',
        text: `Se Actualizo: ${cliente.nombre} ${cliente.apellido} con exito`,
        icon: 'success'
      })
    },
    complete: () => {},
    error: (err: any) => {
      this.errors = err.errors as string []
      console.error('Codigo del Error desde del BackEnd: ' + err.status)
      console.error(err.error.errors)
    }
  });
}

}
