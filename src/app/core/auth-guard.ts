import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth'; // Aquí estaba el detalle

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Y aquí
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};