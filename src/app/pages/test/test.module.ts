import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {routing} from './test.routing';
import {FormsModule} from '@angular/forms';
import {TestComponent} from "./test.component";

@NgModule({
    imports: [
        CommonModule,
        routing,
        FormsModule
    ],
    declarations: [
        TestComponent
    ]
})
export default class LoginModule {
}
