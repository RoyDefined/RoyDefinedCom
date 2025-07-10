import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/index.component').then((m) => m.IndexComponent),
    },
    {
        path: 'admin',
        loadComponent: () => import('./pages/admin.component').then((m) => m.AdminComponent),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
