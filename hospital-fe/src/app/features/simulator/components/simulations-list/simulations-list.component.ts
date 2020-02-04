import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PatientsRegister} from "../../../../../../../hospital-lib/src";
import {Drug} from "../../../../../../../hospital-lib/src/simulationRules.model";
import {SimulationHistory, SimulationResults} from '../../../../shared/models/simulator.model';

@Component({
  selector: 'app-simulations-list',
  templateUrl: './simulations-list.component.html',
  styleUrls: ['./simulations-list.component.scss']
})
export class SimulationsListComponent implements OnInit,OnChanges {

  @Input() simulationHistory: SimulationResults[] ;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    console.log(this.simulationHistory);
  }
}
