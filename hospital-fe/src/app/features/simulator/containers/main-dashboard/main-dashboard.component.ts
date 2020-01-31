import {Component, OnInit} from '@angular/core';
import {SimulationRules} from '../../../../../../../hospital-lib/src/simulationRules';
import {
  Drug, HealthConditionRuleSet,
  HealthStates,
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

  private preTreatmentPatients: PatientsRegister = {D: 2, T: 3, F: 2, H: 10};
  private postTreatmentPatients: PatientsRegister = {};
  private usedDrugs: Drug[] = ['P'];
  private readonly SIMULATION_RULES = SimulationRules.rules;


  constructor() {
  }

  ngOnInit() {
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


  /**
   * Gets index of drugs combination rules corresponding to the healthState in parameters
   *
   * @returns {number} -1 if not found , index number if found
   * @param healthState
   */
  public getCorrespondingRulesIndex(healthState: State): number {
    return this.SIMULATION_RULES.healthConditionsTreatments.findIndex((healthConditionTreatment) => {
      return healthConditionTreatment.patientInitialState === healthState;
    });
  }

  /**
   * check if there's a drug combination rule that matches with the given drugs
   *
   * @returns {number} -1 if not found , index number if found
   * @param drugsCombinationRule
   * @param usedDrugs  drugs used in current simulation
   */

  public isThereMatchingRules(drugsCombinationRule: Drug[], usedDrugs?: Drug[]): boolean {
    return drugsCombinationRule.every((drugInRuleSet) => {
      //console.log(`does ${drugInRuleSet} exist in ${this.usedDrugs} `, this.usedDrugs.indexOf(drugInRuleSet) >= 0);
      return usedDrugs.indexOf(drugInRuleSet) >= 0;
    });

  }

  /**
   * check if used drugs cause death
   *
   * @returns {boolean} true if combination causes death
   */

  public isLethalDrugCombination(): boolean {
    return this.SIMULATION_RULES.lethalDrugInteractions.some((treatment) => {
      //console.log('current ruleSet',treatment);
      return this.isThereMatchingRules(treatment.drugsCombination, this.usedDrugs);
    });
  }


  /**
   *
   *
   * @returns {State} Health state after treatment with drugs, could be the same or different
   * @param healthConditionRuleSet
   */
  public getTreatmentResult(healthConditionRuleSet: HealthConditionRuleSet): State {
    const treatmentResult = healthConditionRuleSet.treatments.find((treatment, index) => {
      return this.isThereMatchingRules(treatment.drugsCombination, this.usedDrugs);
    });
    if (treatmentResult) {
      return treatmentResult.result
    }
    // if no treatment found ,check for missing mandatory drugs like Insulin for diabetes
    if (healthConditionRuleSet.hasOwnProperty('mandatoryTreatments')) {
      return HealthStates.DEATH;
    }
    return healthConditionRuleSet.patientInitialState;
  }

  /**
   * Generate an object with patients health states post treatment
   *
   * @returns {PatientsRegister} Object with post treatment patients
   * @param preTreatmentHealthState
   * @param postTreatmentHealthState
   * @param preTreatmentPatients
   * @param postTreatmentPatients
   */
  public switchState(preTreatmentHealthState: State,
                     postTreatmentHealthState: State,
                     preTreatmentPatients: PatientsRegister,
                     postTreatmentPatients: PatientsRegister): PatientsRegister {

    postTreatmentPatients[postTreatmentHealthState] ?
      postTreatmentPatients[postTreatmentHealthState] += preTreatmentPatients[preTreatmentHealthState] :
      postTreatmentPatients[postTreatmentHealthState] = preTreatmentPatients[preTreatmentHealthState];

    //console.log('inside the switchState',postTreatmentPatients);

    return postTreatmentPatients;
  }

  /**
   * Generate an object with all dead patients
   *
   * @returns {PatientsRegister} Object with post treatment patients
   * @param preTreatmentPatients
   * @param postTreatmentPatients
   */
  public everyoneIsDead(preTreatmentPatients: PatientsRegister, postTreatmentPatients: PatientsRegister): PatientsRegister {
    const numberOfPatients = Object.keys(preTreatmentPatients)
      .reduce((total, patientState) => total + preTreatmentPatients[patientState], 0);
    return {[HealthStates.DEATH]: numberOfPatients}
  }

  public applyDrugs() {
    let newPatientState: PatientsRegister;
    //checking if administrated drug mix is not deadly
    if (this.isLethalDrugCombination()) {
      console.log('warining lethal drug combination');
      return this.everyoneIsDead(this.preTreatmentPatients, this.postTreatmentPatients);
      //console.log(('everyone is dead', this.transitionPatientsState('X',this.preTreatmentPatients)))
    }

    console.log('Pre treatment patients', this.preTreatmentPatients);
    console.log('Drugs used', this.usedDrugs);

    //  loop to check if there are any drug rules applicable for current patients object
    Object.keys(this.preTreatmentPatients).forEach((healthState, nbOfPatients) => {
      const healthStateRulesIndex = this.getCorrespondingRulesIndex(healthState as State);
      const TreatmentResult = this.getTreatmentResult(this.SIMULATION_RULES.healthConditionsTreatments[healthStateRulesIndex]);
      console.log(`1) checking ${healthState} patients now`);

      // there's a rule matching !

      //console.log(`2) ${healthState} patients changed state to `, TreatmentResult);
      // No corresponding rule found
      if (TreatmentResult === healthState) {
        // no change  of state
        this.postTreatmentPatients[healthState] = this.preTreatmentPatients[healthState];
        //console.log(`3-a) no change to patient state return normal state `);
      } else {
        newPatientState = this.switchState(healthState as State, TreatmentResult, this.preTreatmentPatients, this.postTreatmentPatients);
        //console.log(`3-b) ${healthState} Patient state changed to ${newPatientState} `);
        this.postTreatmentPatients = {...this.postTreatmentPatients, ...newPatientState};
      }
      console.log('4) results after itération ', this.postTreatmentPatients);

    })

  }

  public getPostTreatmentsPatients(postTreatmentHealthState:State, preTreatmentPatients: PatientsRegister): PatientsRegister {
    let newPatientsState: PatientsRegister;
    let postTreatmentPatients : PatientsRegister;
    if (TreatmentResult === healthState) {
      // no change  of state
      postTreatmentPatients[healthState] = preTreatmentPatients[healthState];
    } else {
      newPatientsState = this.switchState(healthState as State, TreatmentResult, preTreatmentPatients, postTreatmentPatients);
      postTreatmentPatients = {...postTreatmentPatients, ...newPatientsState};
    }

    return this.postTreatmentPatients
  }

  public setDrugs(drugs: Drug[]): void {
    this.usedDrugs = drugs;
  }

  public wait40Days(): void {

    if (this.isLethalDrugCombination()) {
      this.postTreatmentPatients = this.everyoneIsDead(this.preTreatmentPatients, this.postTreatmentPatients);
    } else {
      Object.keys(this.preTreatmentPatients).forEach((healthState, nbOfPatients) => {
        const healthStateRulesIndex = this.getCorrespondingRulesIndex(healthState as State);
        const TreatmentResult = this.getTreatmentResult(this.SIMULATION_RULES.healthConditionsTreatments[healthStateRulesIndex]);
        // No corresponding rule found

      });
    }

  }

  public report(): PatientsRegister {
    return this.postTreatmentPatients;
  }

}
