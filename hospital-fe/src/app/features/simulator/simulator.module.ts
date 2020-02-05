import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainDashboardComponent} from './containers/main-dashboard/main-dashboard.component';
import {SimulationsListComponent} from './components/simulations-history/simulations-list.component';
import {ControlPanelComponent} from './components/control-panel/control-panel.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from '@angular/material/table';

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
        MatSlideToggleModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatTableModule,
    ],
  declarations: [
    MainDashboardComponent,
    SimulationsListComponent,
    ControlPanelComponent,
  ],
  providers: [],
})
export class SimulatorModule {
}
