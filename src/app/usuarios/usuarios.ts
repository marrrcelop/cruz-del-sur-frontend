import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="container">
      <h3>Gestión de Usuarios Administrativos</h3>
      
      <form [formGroup]="usuarioForm" (ngSubmit)="onSubmit()" class="form-card">
        <div class="grid-2">
          <div class="form-group">
            <label>Nombres</label>
            <input formControlName="nombres" class="form-control" placeholder="Ej. Admin">
          </div>
          <div class="form-group">
            <label>Correo</label>
            <input type="email" formControlName="correo" class="form-control" placeholder="admin@cruzdelsur.pe">
          </div>
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" formControlName="contrasena_hash" class="form-control" placeholder="******">
          </div>
          <div class="form-group">
            <label>Rol</label>
            <select formControlName="rol" class="form-control">
              <option value="ADMIN">ADMIN</option>
              <option value="AGENTE">AGENTE</option>
            </select>
          </div>
        </div>
        <button type="submit" [disabled]="usuarioForm.invalid" class="btn-success">Guardar Usuario</button>
      </form>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of usuarios">
              <td>{{ u.id_usuario }}</td>
              <td>{{ u.nombres }}</td>
              <td>{{ u.correo }}</td>
              <td>{{ u.rol }}</td>
              <td>
                <button (click)="eliminar(u.id_usuario)" class="btn-danger-small">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 0 2rem; max-width: 1200px; margin: auto; font-family: Arial, sans-serif; }
    h3 { color: #333; }
    .form-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555; }
    .form-control { width: 100%; padding: 0.6rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .btn-success { padding: 0.6rem 1.2rem; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 0.5rem; }
    .btn-success:disabled { background-color: #a5d8b1; cursor: not-allowed; }
    .btn-danger-small { padding: 0.4rem 0.8rem; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;}
    .table-responsive { overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background-color: #f8f9fa; }
  `]
})
export class UsuariosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  
  usuarios: any[] = [];
  
  usuarioForm = this.fb.group({
    nombres: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena_hash: ['', Validators.required],
    rol: ['ADMIN', Validators.required]
  });

  ngOnInit() { this.cargarUsuarios(); }

  cargarUsuarios() {
    this.apiService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      this.apiService.createUsuario(this.usuarioForm.value).subscribe(() => {
        this.cargarUsuarios();
        this.usuarioForm.reset({rol: 'ADMIN'});
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar usuario?')) {
      this.apiService.deleteUsuario(id).subscribe(() => this.cargarUsuarios());
    }
  }
}