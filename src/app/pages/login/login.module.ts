import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {routing} from './login.routing';
import { FormsModule }   from '@angular/forms';
import {LoginComponent} from "./login.component";

@NgModule({
    imports: [
        CommonModule,
        routing,
        FormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export default class LoginModule {
}
