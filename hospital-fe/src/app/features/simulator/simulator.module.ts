import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainDashboardComponent} from './containers/main-dashboard/main-dashboard.component';
import {SimulationsHistoryComponent} from './components/simulations-history/simulations-history.component';
import {ControlPanelComponent} from './components/control-panel/control-panel.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";

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
    MatSelectModule,
    MatInputModule,
  ],
  declarations: [
    MainDashboardComponent,
    SimulationsHistoryComponent,
    ControlPanelComponent,
  ],
  providers: [],
})
export class SimulatorModule {
}
