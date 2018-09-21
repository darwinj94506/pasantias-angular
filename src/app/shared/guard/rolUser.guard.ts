import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class RolUserGuard implements CanActivate {
    private rol=null;
    constructor(private router: Router) {
        this.rol =JSON.parse(localStorage.getItem('identity')).rol;

    }
    //rol : 1 funcionario= no tiene acceso al sistema
    //rol 2 administrador= tiene acceso a todas las partes del sistema
    //rol  3 ayudante = tiene acceso restringido al modulo de usuarios  
    canActivate() {
        if (this.rol==2) { // rol administrador
            return true;
        }

        this.router.navigate(['/modulo-material']);
        return false;
    }
}
