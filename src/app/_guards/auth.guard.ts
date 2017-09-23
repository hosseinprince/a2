import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _cookieService: CookieService) {
    }

    canActivate() {
        let ca: any = document.cookie;
        console.log('##################################', ca);
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}