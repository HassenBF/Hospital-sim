import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainDashboardComponent} from './containers/main-dashboard/main-dashboard.component';
import {SimulationsListComponent} from './components/simulations-list/simulations-list.component';
import {ListElementComponent} from './components/simulations-list/list-element/list-element.component';
import {ControlPanelComponent} from './components/control-panel/control-panel.component';

const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [

    MainDashboardComponent,
    SimulationsListComponent,
    ListElementComponent,
    ControlPanelComponent,
  ],
  providers: [],
})
export class SimulatorModule {
}
