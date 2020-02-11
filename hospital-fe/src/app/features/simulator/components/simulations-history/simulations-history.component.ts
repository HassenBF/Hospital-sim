import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SimulationResults} from '../../../../shared/models/simulator.model';
import {AVAILABLE_DRUGS, HEALTH_STATES} from '../../../../core/full-names.const';

@Component({
  selector: 'app-simulations-history',
  templateUrl: './simulations-history.component.html',
  styleUrls: ['./simulations-history.component.scss']
})
export class SimulationsHistoryComponent {

  @Input() simulationHistory: SimulationResults[] ;
  fullHealthStateNames = HEALTH_STATES;
  fullDrugNames = AVAILABLE_DRUGS;

  constructor() { }
}
