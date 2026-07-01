import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <nav class="navbar">
      <h2>Panel Cruz del Sur</h2>
      <button (click)="volver()" class="btn-success">Volver al Menú</button>
    </nav>
    <div class="container">
      <h3>Gestión de Viajes</h3>
      
      <form [formGroup]="viajeForm" (ngSubmit)="onSubmit()" class="form-card">
        <div class="grid-2">
          <div class="form-group">
            <label>Origen</label>
            <input formControlName="origen" class="form-control" placeholder="Ej. Lima">
          </div>
          <div class="form-group">
            <label>Destino</label>
            <input formControlName="destino" class="form-control" placeholder="Ej. Arequipa">
          </div>
          <div class="form-group">
            <label>Fecha</label>
            <input type="date" formControlName="fecha" class="form-control">
          </div>
          <div class="form-group">
            <label>Hora</label>
            <input type="time" formControlName="hora" class="form-control">
          </div>
          <div class="form-group">
            <label>Tipo de Servicio</label>
            <select formControlName="tipo_servicio" class="form-control">
              <option value="VIP">VIP</option>
              <option value="Económico">Económico</option>
            </select>
          </div>
          <div class="form-group">
            <label>Precio (S/)</label>
            <input type="number" formControlName="precio" class="form-control" placeholder="0.00">
          </div>
        </div>
        <button type="submit" [disabled]="viajeForm.invalid" class="btn-primary">Guardar Viaje</button>
      </form>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ruta (Origen - Destino)</th>
              <th>Fecha y Hora</th>
              <th>Servicio</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let v of viajes">
              <td>{{ v.id_viaje }}</td>
              <td>{{ v.origen }} - {{ v.destino }}</td>
              <td>{{ v.fecha | date }} {{ v.hora }}</td>
              <td>{{ v.tipo_servicio }}</td>
              <td>S/ {{ v.precio }}</td>
              <td>
                <button (click)="eliminar(v.id_viaje)" class="btn-danger-small">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    body { margin: 0; font-family: Arial, sans-serif; background-color: #f4f7f6;}
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #0056b3; color: white; margin-bottom: 2rem;}
    .navbar h2 { margin: 0; }
    .container { padding: 0 2rem; max-width: 1200px; margin: auto; font-family: Arial, sans-serif; }
    h3 { color: #333; }
    .form-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555; }
    .form-control { width: 100%; padding: 0.6rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .btn-primary { padding: 0.6rem 1.2rem; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 0.5rem; }
    .btn-primary:disabled { background-color: #a0c4e8; cursor: not-allowed; }
    .btn-success { padding: 0.5rem 1rem; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .btn-danger-small { padding: 0.4rem 0.8rem; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;}
    .table-responsive { overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background-color: #f8f9fa; }
  `]
})
export class ViajesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);
  
  viajes: any[] = [];
  
  viajeForm = this.fb.group({
    origen: ['', Validators.required],
    destino: ['', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    tipo_servicio: ['VIP', Validators.required],
    precio: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() { this.cargarViajes(); }

  cargarViajes() {
    this.apiService.getViajes().subscribe(data => this.viajes = data);
  }

  onSubmit() {
    if (this.viajeForm.valid) {
      this.apiService.createViaje(this.viajeForm.value).subscribe(() => {
        this.cargarViajes();
        this.viajeForm.reset({tipo_servicio: 'VIP'});
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar viaje?')) {
      this.apiService.deleteViaje(id).subscribe(() => this.cargarViajes());
    }
  }

  volver() {
    this.router.navigate(['/home']);
  }
}