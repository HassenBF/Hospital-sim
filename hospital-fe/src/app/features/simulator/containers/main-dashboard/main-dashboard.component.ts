import { Component, OnInit } from '@angular/core';
import {SimulationRules} from "../../../../../../../hospital-lib/src/simulationRules";
import {Treatment} from "../../../../../../../hospital-lib/src/simulationRules.model";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  private patientsList = 'X,X,T,T,T,D,D,H,H';
  private drugsList = 'An,P';
  private usedDrugs = ['An','P'];
  private readonly SIMULATION_RULES = SimulationRules.rules;
  private listSeparator = ',';

  constructor() { }

  ngOnInit() {
    console.log(this.isLethalDrugCombination());
  }

  public isDrugInLethalInteractionsList(lethalTreatment: Treatment): boolean {
    let result:boolean;
    result = lethalTreatment.drugsCombination.every((drug) => {
      console.log(`does ${drug} exist in ${this.usedDrugs} `, this.usedDrugs.indexOf(drug) >= 0);
      return this.usedDrugs.indexOf(drug) >= 0;
    });
    return result;
  }

  // public isLethalDrugCombination() {
  //   this.SIMULATION_RULES.lethalDrugInteractions.forEach((treatment) => {
  //     if (this.isDrugInLethalInteractionsList(treatment)){
  //       return true;
  //     }
  //   });
  //   return false;
  // }

}
