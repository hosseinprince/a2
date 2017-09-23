import {Routes, RouterModule} from '@angular/router';
import {Pages} from './pages.component';
import {AuthGuard} from "../_guards/auth.guard";
// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: 'login',
        loadChildren: './login/login.module'
    },
    // {
    //     path: 'logout',
    // },
    {
        path: 'pages',
        canActivate: [AuthGuard],
        component: Pages,
        children: [
            // {path: '', component: HomeComponent, pathMatch: 'full'},
            // { path: '', loadChildren: () => HomeComponentSystem.import('./test/test.module') },
            {path: '', loadChildren: './home/home.module'},
            {path: 'test', loadChildren: './test/test.module'},
            {path: 'test2', loadChildren: './test2/test2.module'},
        ]
    }
];

export const routing = RouterModule.forChild(routes);
