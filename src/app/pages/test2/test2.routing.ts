import {Routes, RouterModule} from '@angular/router';
import {Test2Component} from "./test2.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Test2Component,
        children: []
    }
];

export const routing = RouterModule.forChild(routes);
