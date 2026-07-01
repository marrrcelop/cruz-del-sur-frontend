import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { of, delay } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  login(credentials: any) {
    // Simulamos una petición al servidor con un pequeño retraso
    const fakeResponse = (credentials.username === 'admin' && credentials.password === '1234')
      ? 'fake-jwt-token-123456789'
      : 'Credenciales inválidas';

    // Usamos 'of' de RxJS para devolver un Observable simulado
    return of(fakeResponse).pipe(
      delay(500), // Simula medio segundo de carga
      tap(token => {
        if (token && token !== 'Credenciales inválidas') {
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}