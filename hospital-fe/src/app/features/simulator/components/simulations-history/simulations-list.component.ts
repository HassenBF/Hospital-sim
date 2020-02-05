import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SimulationResults} from '../../../../shared/models/simulator.model';
import {AVAILABLE_DRUGS, HEALTH_STATES} from "../../../../core/full-names.const";

@Component({
  selector: 'app-simulations-list',
  templateUrl: './simulations-list.component.html',
  styleUrls: ['./simulations-list.component.scss']
})
export class SimulationsListComponent implements OnInit,OnChanges {

  @Input() simulationHistory: SimulationResults[] ;
  fullHealthStateNames = HEALTH_STATES;
  fullDrugNames = AVAILABLE_DRUGS;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    console.log(this.simulationHistory);
  }
}
