import {Routes, RouterModule} from '@angular/router';
import {TestComponent} from "./test.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: TestComponent,
        children: []
    }
];

export const routing = RouterModule.forChild(routes);
