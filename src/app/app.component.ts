import {Component} from '@angular/core';
import {UserService} from "./_services/user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    user: any;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        // this.user = {username: null};
        // get users from secure api end point
        // this.userService.getUsers()
        //     .subscribe(user => {
        //         console.log('===================',user);
        //         this.user = user;
        //     });
    }
}
