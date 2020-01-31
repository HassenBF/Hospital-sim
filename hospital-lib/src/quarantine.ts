import {PatientsRegister} from './patientsRegister';
import {Drug, HealthConditionRuleSet, HealthStates, State, Treatment} from './simulationRules.model';
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
