import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';


@Injectable({ providedIn: 'root' })
class PermissionService {
  
  puedeActivarRuta(rutaIngresada: string): boolean {
    console.log('Ruta ingresada: ', rutaIngresada);
    if (rutaIngresada == 'error'){
      alert('Ruta no permitida');
      return false;
    }else {
      return true;
    }
  }
}

  export const guardiaSesionGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).puedeActivarRuta(route.url.toString());
};
