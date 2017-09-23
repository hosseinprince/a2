import {Component, OnInit} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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
