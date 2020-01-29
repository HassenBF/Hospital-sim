import {Component, OnInit} from '@angular/core';
import {SimulationRules} from '../../../../../../../hospital-lib/src/simulationRules';
import {
  Drug,
  HealthConditionTreatment, HealthStates,
  State,
  Treatment
} from '../../../../../../../hospital-lib/src/simulationRules.model';
import {PatientsRegister} from '../../../../../../../hospital-lib/src';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  //private patientsList = 'X,X,T,T,T,D,D,H,H';
  //private drugsList = 'An,P';
  //private listSeparator = ',';

  private preTreatmentPatients: PatientsRegister = {D: 2, T: 3, F: 2};
  private usedDrugs: Drug[] = [''];
  private readonly SIMULATION_RULES = SimulationRules.rules;


  constructor() {
  }

  ngOnInit() {
    console.log('executioin result', this.isLethalDrugCombination());
    this.applyDrugs();
  }


  public parsePatientsList(patientsStringList: string, separator: string): PatientsRegister {
    return patientsStringList
      .split(separator)
      .reduce((patients, healthStatus) => {
        patients[healthStatus] ? patients[healthStatus]++ : patients[healthStatus] = 1;
        return patients
      }, {} as PatientsRegister)
  };

  public getCorrespondingTreatmentsIndex(healthState: State): number {
    return this.SIMULATION_RULES.healthConditionsTreatments.findIndex((healthConditionTreatment) => {
      return healthConditionTreatment.patientInitialState === healthState;
    });
  }


  public isThereMatchingRules(ruleSet: Drug[], usedDrugs?: Drug[]): boolean {
    return ruleSet.every((drugInRuleSet) => {
      console.log(`does ${drugInRuleSet} exist in ${this.usedDrugs} `, this.usedDrugs.indexOf(drugInRuleSet) >= 0);
      return usedDrugs.indexOf(drugInRuleSet) >= 0;
    });

  }


  public isLethalDrugCombination(): boolean {

    return this.SIMULATION_RULES.lethalDrugInteractions.some((treatment) => {
      //console.log('current ruleSet',treatment);
      return this.isThereMatchingRules(treatment.drugsCombination, this.usedDrugs);
    });
  }

  everyOneIsDead(newHealthState, preTreatmentPatients: PatientsRegister) {
    let total = 0;
    Object.keys(preTreatmentPatients).forEach((healtState) => {
      total += preTreatmentPatients[healtState];
      preTreatmentPatients[healtState] = 0;
    });
    return {...preTreatmentPatients, 'D': total}
  }


  // public transitionPatientsState(oldHealthState: State,healthState: State, preTreatmentPatients: PatientsRegister): PatientsRegister {
  //   return Object.keys(preTreatmentPatients).forEach((healthState)=>{
  //     if (preTreatmentPatients[healthState]){
  //       preTreatmentPatients[healthState]+ = preTreatmentPatients[oldHealthState];
  //       pr
  //     }else {
  //       preTreatmentPatients[]
  //     }
  //
  //   })
  //
  // }


  public getTreatmentResult(healthConditionTreatment: HealthConditionTreatment): State {
    const treatmentResult = healthConditionTreatment.treatments.find((treatment, index) => {
      return this.isThereMatchingRules(treatment.drugsCombination, this.usedDrugs);
    });
    // checking for a matching treatment
    if (treatmentResult) {
      return treatmentResult.result
    }
    // if not treatment found ,check for mandatory drugs like Insulin for diabetes
    if (healthConditionTreatment.hasOwnProperty('mandatoryTreatments')) {
      return HealthStates.DEATH;
    }
    // return initial patient status when nothing matches
    return healthConditionTreatment.patientInitialState;
  }

  public applyDrugs() {
    //checking if administrated drug mix is not deadly
    if (this.isLethalDrugCombination()) {
      //console.log(('everyone is dead', this.transitionPatientsState('X',this.preTreatmentPatients)))
    }

    //  loop to check if there are any drug rules applicable for current patients object
    Object.keys(this.preTreatmentPatients).forEach((healthState, nbOfPatients) => {
      const healthStateRulesIndex = this.getCorrespondingTreatmentsIndex(healthState as State);
      console.log(`******************checking ${healthState} patients now`);
      const TreatmentResult = this.getTreatmentResult(this.SIMULATION_RULES.healthConditionsTreatments[healthStateRulesIndex]);
      console.log(`${healthState} patients new state = `, TreatmentResult);
      // this.transitionPatientsState(healthState,TreatmentResult,this.preTreatmentPatients);
      console.log('newwwww states',this.preTreatmentPatients);

    })

  }

}
