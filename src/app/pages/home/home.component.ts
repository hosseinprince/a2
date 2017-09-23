import {Component, OnInit} from '@angular/core';

import {CookieService} from 'angular2-cookie/core';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    constructor(private _cookieService: CookieService) {
    }

    ngOnInit() {
        console.log('CookieService :', this._cookieService.get('shak'));
    }

}
