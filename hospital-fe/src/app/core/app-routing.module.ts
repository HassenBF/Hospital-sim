import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'main-dashboard',
    loadChildren: 'src/app/features/simulator/simulator.module#SimulatorModule',
  },
  {
    path: '',
    redirectTo: 'main-dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'main-dashboard',
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  declarations: [],
})
export class AppRoutingModule {
}
