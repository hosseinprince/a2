import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {routing}       from './nav.routing';
import {NavComponent} from "./nav.component";


@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [
        NavComponent
    ]
})
export default class NavModule {
}
