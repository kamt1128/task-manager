import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/task-list/task-list.component').then(m => m.TaskListComponent),
        title: 'Lista de tareas'
    },
    {
        path: '**',
        redirectTo: '',
        title: 'Lista de tareas'
    }
];
