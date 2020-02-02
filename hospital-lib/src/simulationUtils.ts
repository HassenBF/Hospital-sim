import {
    Drug,
    DrugsCombination,
    HealthStateRuleSet,
    HealthStates,
    SimulationSession,
    State
} from "./simulationRules.model";
import {PatientsRegister} from "./patientsRegister";
import {SimulationRules} from "./simulationRules";

export class SimulationUtils {

    private readonly SIM_RULES = SimulationRules.rules;
    private usedDrugs: Drug[];
    private  simulationSession: SimulationSession;

    /**
     * Gets index of drugs combination rules corresponding to the healthState in parameters
     *
     * @returns {number} -1 if not found , index number if found
     * @param healthState
     * @param healthStatesRuleSets => array containing drug interaction rules for every health state
     */
    static getCorrespondingRulesIndex(healthState: State, healthStatesRuleSets: HealthStateRuleSet[]): number {
        return healthStatesRuleSets.findIndex((healthConditionTreatment) => {
            return healthConditionTreatment.patientInitialState === healthState;
        });
    }

    /**
     * check if there's a drug combination rule that matches with the used drugs
     *
     * @returns {number} -1 if not found , index of matching rule if found
     * @param drugsCombinationRules => drug combination rules for a specific health state
     * @param usedDrugs =>  drugs used in current simulation
     */

    static isThereMatchingRules(drugsCombinationRules: Drug[], usedDrugs?: Drug[]): boolean {
        return drugsCombinationRules.every((drugInRuleSet) => {
            //console.log(`does ${drugInRuleSet} exist in ${this.usedDrugs} `, this.usedDrugs.indexOf(drugInRuleSet) >= 0);
            return usedDrugs.indexOf(drugInRuleSet) >= 0;
        });

    }

    /**
     * check if used drugs cause death
     *
     * @returns {boolean} true if combination causes death
     */

    static  isLethalDrugCombination(usedDrugs:Drug[],lethalDrugCombinations:DrugsCombination[]): boolean {
        return lethalDrugCombinations.some((treatment) => {
            //console.log('current ruleSet',treatment);
            return this.isThereMatchingRules(treatment.drugsCombination, usedDrugs);
        });
    }


    /**
     *
     * @returns {State} Health state after treatment with drugs, could be the same or different
     * @param healthStateRuleSet => rulesSet for a specific health state
     * @param usedDrugs
     */
    static getPostTreatmentHealthState(healthStateRuleSet: HealthStateRuleSet, usedDrugs:Drug[]): State {
        const treatmentResult = healthStateRuleSet.treatments.find((treatment, index) => {
            return this.isThereMatchingRules(treatment.drugsCombination, usedDrugs);
        });
        if (treatmentResult) {
            return treatmentResult.result
        }
        // if no treatment found ,check for missing mandatory drugs like Insulin for diabetes
        if (healthStateRuleSet.hasOwnProperty('mandatoryTreatments')) {
            return HealthStates.DEAD;
        }
        return healthStateRuleSet.patientInitialState;
    }


    /**
     * Generate an object with all dead patients
     *
     * @returns {PatientsRegister} Object with post treatment patients
     * @param preTreatmentPatients
     */
    static everyoneIsDead(preTreatmentPatients: PatientsRegister): PatientsRegister {
        const numberOfPatients = Object.keys(preTreatmentPatients)
            .reduce((totalNbOfPatients, patientState) => totalNbOfPatients + preTreatmentPatients[patientState], 0);
        return {[HealthStates.DEAD]: numberOfPatients}
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

    static switchPatientsState(preTreatmentHealthState: State,
                               postTreatmentHealthState: State,
                               preTreatmentPatients: PatientsRegister,
                               postTreatmentPatients: PatientsRegister): PatientsRegister {

        postTreatmentPatients[postTreatmentHealthState] ?
            postTreatmentPatients[postTreatmentHealthState] += preTreatmentPatients[preTreatmentHealthState] :
            postTreatmentPatients[postTreatmentHealthState] = preTreatmentPatients[preTreatmentHealthState];

        return postTreatmentPatients;
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

}
