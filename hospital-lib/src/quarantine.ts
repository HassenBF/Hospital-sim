import {PatientsRegister} from './patientsRegister';
import {Drug, HealthStateRuleSet, HealthStates, State, Treatment} from './simulationRules.model';
import {SimulationRules} from './simulationRules';
import {SimulationUtils} from "./simulationUtils";

export class Quarantine {

    //private static readonly NOT_IMPLEMENTED_MESSAGE = 'Work, work.';

    //private preTreatmentPatients :PatientsRegister = {X:2,T:3,D:2,H:2};
    private postTreatmentPatients: PatientsRegister = {};
    private usedDrugs: Drug[] = [];
    private readonly SIM_RULES = SimulationRules.rules;

    constructor(private preTreatmentPatients: PatientsRegister) {
        this.preTreatmentPatients = {...preTreatmentPatients}
    }

    public setDrugs(drugs: Drug[]): void {
        this.usedDrugs = drugs;
    }

    public wait40Days(): PatientsRegister {
        if (SimulationUtils.isLethalDrugCombination(this.usedDrugs, this.SIM_RULES.lethalDrugInteractions)) {
            return this.postTreatmentPatients = SimulationUtils.everyoneIsDead(this.preTreatmentPatients);
        }
        Object.keys(this.preTreatmentPatients).forEach((preTreatmentHealthState: State) => {
            const healthStateRulesIndex = SimulationUtils.getCorrespondingRulesIndex(preTreatmentHealthState, this.SIM_RULES.healthStatesRuleSets);
            const correspondingRuleSet = this.SIM_RULES.healthStatesRuleSets[healthStateRulesIndex];
            const postTreatmentHealthState = SimulationUtils.getPostTreatmentHealthState(correspondingRuleSet, this.usedDrugs);
            this.postTreatmentPatients = SimulationUtils.switchPatientsState(
                preTreatmentHealthState, postTreatmentHealthState, this.preTreatmentPatients, this.postTreatmentPatients)
        });
        return this.postTreatmentPatients;
    }

    public report(): PatientsRegister {
        console.log('post treatment', this.postTreatmentPatients);
        return this.postTreatmentPatients;
    }

}
