import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
//igual que ponerlo como "Provider" en el módulo o en un componente. En este caso, en el módulo
@Injectable({
    providedIn: 'root'
})

@Injectable()
export class routeGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        console.log('pasa por el guard');
        return true;
    }
}