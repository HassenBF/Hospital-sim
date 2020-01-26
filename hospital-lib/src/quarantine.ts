import {PatientsRegister} from './patientsRegister';
import {AvailableDrugs, Drug, DrugsCombination, HealthConditionTreatment, Treatment} from "./simulationRules.model";
import {SimulationRules} from "./simulationRules";

export class Quarantine {

    private static readonly NOT_IMPLEMENTED_MESSAGE = 'Work, work.';

    private patientsList = 'X,X,T,T,T,D,D,H,H';
    private drugsList = 'An,P';
    private drugsGiven: any[];
    private readonly SIMULATION_RULES = SimulationRules.rules;
    private listSeparator = ',';

    constructor(patients: PatientsRegister) {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }


    public parsePatientsList(patientsStringList: string, separator: string): PatientsRegister {
        return patientsStringList
            .split(separator)
            .reduce((patients, healthStatus) => {
                patients[healthStatus] ? patients[healthStatus]++ : patients[healthStatus] = 1;
                return patients
            }, {} as PatientsRegister)
    };

    public IsSubsetOf(set: DrugsCombination,subset?:DrugsCombination): boolean {
        let result:boolean;
        result = set.drugsCombination.every((drug) => {
            //console.log(`does ${drug} exist in ${this.drugsGiven} `, this.drugsGiven.indexOf(drug) >= 0);
            return this.drugsGiven.indexOf(drug) >= 0;
        });
        return result;
    }

    public isDrugsCombinationLethal() {
        this.SIMULATION_RULES.lethalDrugInteractions.forEach((lethalTreatment) => {
            if (this.IsSubsetOf(lethalTreatment)){
                return true;
            }
        });
        return false;
    }

    public isHealthStateInNeedOfMandatoryTreatment(healthConditionTreatment:HealthConditionTreatment): boolean {
        return healthConditionTreatment.hasOwnProperty('mandatoryTreatments')
    }



    public isDrugsAvailable(drugsList:string){
        return drugsList.length !== 0;
    }


///////////////////////////////////////////////////////////////////////////////////////////////

    public setDrugs(drugs: Array<Drug>): void {
        this.drugsGiven = drugs;
    }

    public wait40Days(): void {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }

    public report(): PatientsRegister {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }

}
