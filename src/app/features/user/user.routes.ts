import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'User Profile'
    }
  },
    {
      path: 'add-car',
      loadComponent: () => import('./add-car/add-car.component').then(m => m.AddCarComponent),
      data: {
        title: 'add-car'
      }
    },
    {
      path: 'car-view/:id',
      loadComponent: () => import('./car-view/car-view.component').then(m => m.CarViewComponent),
      data: {
        title: 'car-view'
      }
    },
];