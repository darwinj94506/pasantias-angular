import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    private rol=null;
    constructor(private router: Router) {
        this.rol =JSON.parse(localStorage.getItem('identity')).rol;

    }
    canActivate() {
        if (localStorage.getItem('token') && this.rol!=null && this.rol!=1) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
