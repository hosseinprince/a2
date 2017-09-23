import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';


export const routes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages/dashboard' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
