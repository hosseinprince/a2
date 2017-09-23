import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {routing} from './test2.routing';
import {FormsModule} from '@angular/forms';
import {Test2Component} from "./test2.component";

@NgModule({
    imports: [
        CommonModule,
        routing,
        FormsModule
    ],
    declarations: [
        Test2Component
    ]
})
export default class Test2Module {
}
