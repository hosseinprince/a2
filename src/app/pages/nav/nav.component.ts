import {Component, OnInit} from '@angular/core';
import {UserService} from "../../_services/user.service";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    user: any;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.user = {username: ''};
        this.userService.getUsers()
            .subscribe(user => {
                this.user = user;
            });
    }

}
