import {Component, OnInit} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

@Component({
    selector: 'app-test',
    templateUrl: './test2.component.html',
    styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.http.post('/api/secret', {u: "sdfsdf", p: "sdfsdf"})
            .map((response: Response) => response.json())
            .subscribe(res => {
                console.log('res', res);
            });
    }

}
