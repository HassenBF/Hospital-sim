import {Component, Input, OnInit} from '@angular/core';
import {PatientsRegister} from "../../../../../../../hospital-lib/src";
import {Drug} from "../../../../../../../hospital-lib/src/simulationRules.model";

@Component({
  selector: 'app-simulations-list',
  templateUrl: './simulations-list.component.html',
  styleUrls: ['./simulations-list.component.scss']
})
export class SimulationsListComponent implements OnInit {

  @Input() preTreatmentPatients: PatientsRegister;
  @Input() postTreatmentPatients: PatientsRegister;
  @Input() usedDrugs: Drug[];

  constructor() { }

  ngOnInit() {
  }

}
