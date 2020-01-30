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

  private preTreatmentPatients: PatientsRegister = {D: 2, T: 3, F: 2,H:10};
  private postTreatmentPatients: PatientsRegister = {};
  private usedDrugs: Drug[] = ['An','As','I'];
  private readonly SIMULATION_RULES = SimulationRules.rules;


  constructor() {
  }

  ngOnInit() {
    //console.log('executioin result', this.isLethalDrugCombination());
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
      //console.log(`does ${drugInRuleSet} exist in ${this.usedDrugs} `, this.usedDrugs.indexOf(drugInRuleSet) >= 0);
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

  public switchState(oldHealthState: State,
                     newHealthState: State,
                     patients: PatientsRegister,
                     postTreatmentPatients:PatientsRegister):PatientsRegister {


    postTreatmentPatients[newHealthState] ?
      postTreatmentPatients[newHealthState] += patients[oldHealthState] :
      postTreatmentPatients[newHealthState] = patients[oldHealthState];

    console.log('inside the switchState',postTreatmentPatients);

    return  postTreatmentPatients;
  }

  public applyDrugs() {
    //checking if administrated drug mix is not deadly
    if (this.isLethalDrugCombination()) {
       console.log('warining lethal drug combination');
      //console.log(('everyone is dead', this.transitionPatientsState('X',this.preTreatmentPatients)))
    }

    console.log('Pre treatment patients', this.preTreatmentPatients);
    console.log('Drugs used', this.usedDrugs);

    //  loop to check if there are any drug rules applicable for current patients object
    Object.keys(this.preTreatmentPatients).forEach((healthState, nbOfPatients) => {
      const healthStateRulesIndex = this.getCorrespondingTreatmentsIndex(healthState as State);
      let newPatientState ;
      console.log(`1) checking ${healthState} patients now`);

        // there's a rule matching !
        const TreatmentResult = this.getTreatmentResult(this.SIMULATION_RULES.healthConditionsTreatments[healthStateRulesIndex]);
        console.log(`2) ${healthState} patients changed state to `, TreatmentResult);
      // No corresponding rule found
      if (TreatmentResult === healthState) {
        // no change  of state
        this.postTreatmentPatients[healthState] = this.preTreatmentPatients[healthState];
        console.log(`3-a) no change to patient state return normal state `);
      } else {
        newPatientState = this.switchState(healthState as State, TreatmentResult, this.preTreatmentPatients,this.postTreatmentPatients);
        console.log(`3-b) ${healthState} Patient state changed to ${newPatientState} `);
        this.postTreatmentPatients = {...this.postTreatmentPatients, ...newPatientState};
      }
      console.log('4) results after itération ', this.postTreatmentPatients);

    })

  }

}
