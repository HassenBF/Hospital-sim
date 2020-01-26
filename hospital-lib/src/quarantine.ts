import {PatientsRegister} from './patientsRegister';
import {AvailableDrugs, Drug} from "./simulationRules.model";
import {SimulationRules} from "./simulationRules";

export class Quarantine {

    private static readonly NOT_IMPLEMENTED_MESSAGE = 'Work, work.';

    private patientsList = 'X,X,T,T,T,D,D,H,H';
    private drugsList = 'An,P';
    private givenDrugs :Array <Drug> ;
    private readonly SIMULATION_RULES = SimulationRules.rules;
    private listSeparator = ',';

    constructor(patients: PatientsRegister) {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }


    public parsePatientsList(patientsStringList: string, separator: string): PatientsRegister {
        return patientsStringList
            .split(separator)
            .reduce((patients, healthStatus) => {
                // @ts-ignore
                patients[healthStatus] ? patients[healthStatus]++ : patients[healthStatus] = 1;
                return patients
            }, {})
    };


///////////////////////////////////////////////////////////////////////////////////////////////

    public setDrugs(drugs: Array<Drug>): void {
      this.givenDrugs= drugs;
    }

    public wait40Days(): void {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }

    public report(): PatientsRegister {
        throw new Error(Quarantine.NOT_IMPLEMENTED_MESSAGE);
    }

}
