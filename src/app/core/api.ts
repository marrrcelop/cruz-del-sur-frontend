import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  
  // --- BASE DE DATOS SIMULADA EN MEMORIA ---
  private clientes = [
    { id_cliente: 1, nombres: 'Juan', apellidos: 'Pérez', correo: 'juan@email.com', documento: '73456789' },
    { id_cliente: 2, nombres: 'María', apellidos: 'Gómez', correo: 'maria@email.com', documento: '72345678' }
  ];

  private viajes = [
    { id_viaje: 1, origen: 'Lima', destino: 'Arequipa', fecha: '2026-07-15', hora: '10:00', tipo_servicio: 'VIP', precio: 120.00 }
  ];

  private reservas = [
    { id_reserva: 1, numero_asiento: 15, metodo_pago: 'Tarjeta', estado_pago: 'Confirmado', estado_reserva: 'Activa' }
  ];

  private usuarios = [
    { id_usuario: 1, nombres: 'Admin', correo: 'admin@cruzdelsur.pe', rol: 'ADMIN' }
  ];

  // --- MÉTODOS MOCK PARA CLIENTES ---
  getClientes(): Observable<any[]> { return of([...this.clientes]).pipe(delay(300)); }
  createCliente(cliente: any): Observable<any> { 
    cliente.id_cliente = Math.floor(Math.random() * 1000); // Genera ID aleatorio
    this.clientes.push(cliente);
    return of(cliente).pipe(delay(300)); 
  }
  deleteCliente(id: number): Observable<any> { 
    this.clientes = this.clientes.filter(c => c.id_cliente !== id);
    return of({ success: true }).pipe(delay(300)); 
  }

  // --- MÉTODOS MOCK PARA VIAJES ---
  getViajes(): Observable<any[]> { return of([...this.viajes]).pipe(delay(300)); }
  createViaje(viaje: any): Observable<any> { 
    viaje.id_viaje = Math.floor(Math.random() * 1000);
    this.viajes.push(viaje);
    return of(viaje).pipe(delay(300)); 
  }
  deleteViaje(id: number): Observable<any> { 
    this.viajes = this.viajes.filter(v => v.id_viaje !== id);
    return of({ success: true }).pipe(delay(300)); 
  }

  // --- MÉTODOS MOCK PARA RESERVAS ---
  getReservas(): Observable<any[]> { return of([...this.reservas]).pipe(delay(300)); }
  createReserva(reserva: any): Observable<any> { 
    reserva.id_reserva = Math.floor(Math.random() * 1000);
    this.reservas.push(reserva);
    return of(reserva).pipe(delay(300)); 
  }
  deleteReserva(id: number): Observable<any> { 
    this.reservas = this.reservas.filter(r => r.id_reserva !== id);
    return of({ success: true }).pipe(delay(300)); 
  }

  // --- MÉTODOS MOCK PARA USUARIOS ---
  getUsuarios(): Observable<any[]> { return of([...this.usuarios]).pipe(delay(300)); }
  createUsuario(usuario: any): Observable<any> { 
    usuario.id_usuario = Math.floor(Math.random() * 1000);
    this.usuarios.push(usuario);
    return of(usuario).pipe(delay(300)); 
  }
  deleteUsuario(id: number): Observable<any> { 
    this.usuarios = this.usuarios.filter(u => u.id_usuario !== id);
    return of({ success: true }).pipe(delay(300)); 
  }
}