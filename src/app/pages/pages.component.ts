import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from "../_services/user.service";

@Component({
    selector: 'pages',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    templateUrl: './pages.component.html'
})
export class Pages {
    user: any;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.user = {username: ''};
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(user => {
                this.user = user;
            });
    }
}
