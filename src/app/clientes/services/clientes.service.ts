import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, map, catchError, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // Api de SpringBoot
  private urlEndPoint: string = "http://localhost:8080/api/clientes"

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private router: Router) { }

  // Obtener Listado de Clientes
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint)
  }

  // Obtener Cliente por Id
  getCliente(id: number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje);
        Swal.fire({
          title: 'Error al editar',
          text: e.error.mensaje,
          icon:'error'
        })

        return throwError(e)
      })
    )
  }

  // Crear Cliente
  createCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders})
    .pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status ==400){
          return throwError(e)
        }
        console.error(e.error.mensaje);
        Swal.fire({
          title: 'Error al Crear un Cliente',
          text: e.error.mensaje,
          icon:'error'
        })
        return throwError(e)
      })
    )
  }

  // Actualizar Cliente
  updateCliente(cliente: Cliente):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders })
    .pipe(
      catchError(e => {
        if(e.status ==400){
          return throwError(e)
        }
        console.error(e.error.mensaje);
        Swal.fire({
          title: 'Error al Actualizar un Cliente',
          text: e.error.mensaje,
          icon:'error'
        })
        return throwError(e)
      })
    )
  }

  // Eliminar Cliente
  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire({
          title: 'Error al Eliminar el Cliente',
          text: e.error.mensaje,
          icon:'error'
        })
        return throwError(e)
      })
    )
  }
}
