import {PatientsRegister} from './patientsRegister';
import {Drug, HealthStateRulesSet, HealthStates, State, Treatment} from './simulationRules.model';
import {SimulationRules} from './simulationRules';
import {SimulationUtils} from './simulationUtils';

export class Quarantine {

    private postTreatmentPatients: PatientsRegister = {};
    private usedDrugs: Drug[] = [];
    private readonly SIM_RULES = SimulationRules.rules;

    constructor(private preTreatmentPatients: PatientsRegister) {
        this.postTreatmentPatients = {...preTreatmentPatients};
    }

    public setDrugs(drugs: Drug[]): void {
        this.usedDrugs = drugs;
    }

    public wait40Days(): void {
        if (SimulationUtils.isLethalDrugCombination(this.usedDrugs, this.SIM_RULES.lethalDrugInteractions)) {
            this.postTreatmentPatients = SimulationUtils.everyoneIsDead(this.postTreatmentPatients);
        } else {
            this.postTreatmentPatients = SimulationUtils.treatPatients(this.preTreatmentPatients,this.postTreatmentPatients, this.usedDrugs, this.SIM_RULES);
        }
    }
    public report(): PatientsRegister {
        return this.postTreatmentPatients;
    }

}
