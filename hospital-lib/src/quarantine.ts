import {PatientsRegister} from './patientsRegister';
import {Drug, HealthConditionTreatment, HealthStates, State, Treatment} from './simulationRules.model';
import {SimulationRules} from './simulationRules';

export class Quarantine {

    private static readonly NOT_IMPLEMENTED_MESSAGE = 'Work, work.';

    private patientsList = 'X,X,T,T,T,D,D,H,H';
    private patientsListFormatted = {X:2,T:3,D:2,H:2};
    private drugsList = 'An,P';
    private drugsGiven: Drug[] = ['An','P'];
    private readonly SIMULATION_RULES = SimulationRules.rules;
    private listSeparator = ',';

    constructor(patients: PatientsRegister) {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }



    /*check if a given array is a subset of another array*/

    public isThereMatchingRules(ruleSet: Drug[], usedDrugs?:Drug[]): boolean {
        //let result:boolean;
        return  ruleSet.every((drugInRuleSet) => {
            //console.log(`does ${drug} exist in ${this.drugsGiven} `,  this.drugsGiven.indexOf(drug) >= 0);
            return usedDrugs.indexOf(drugInRuleSet) >= 0;
        });//return result;
    }

    public isDrugsCombinationLethal() {
        this.SIMULATION_RULES.lethalDrugInteractions.forEach((lethalTreatment) => {
            if (this.isThereMatchingRules(lethalTreatment.drugsCombination, this.drugsGiven)) {
                return true;
            }
        });
        return false;
    }

    public isHealthStateInNeedOfMandatoryTreatment(healthConditionTreatment:HealthConditionTreatment): boolean {
        return healthConditionTreatment.hasOwnProperty('mandatoryTreatments')
    }

    public getCorrespondingRulesSetIndex(healthState: State): number {
        return this.SIMULATION_RULES.healthConditionsTreatments.findIndex((healthConditionTreatment)=>{
            return healthConditionTreatment.patientInitialState === healthState;
        });
    }


    public isDrugsAvailable(drugsList:Drug[]) {
        return drugsList.length !== 0;
    }





///////////////////////////////////////////////////////////////////////////////////////////////

    public setDrugs(drugs: Drug[]): void {
        this.drugsGiven = drugs;
    }

    public wait40Days(): void {

        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }

    public report(): PatientsRegister {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }

}
