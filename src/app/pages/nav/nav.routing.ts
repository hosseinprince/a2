import {Routes, RouterModule} from '@angular/router';
import {NavComponent} from "./nav.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: NavComponent,
        children: []
    }
];

export const routing = RouterModule.forChild(routes);
