import {
    Drug,
    DrugsCombination,
    HealthStateRulesSet,
    HealthStates,
    HealthStatesAndDrugInteractionsRules,
    State
} from './simulationRules.model';
import {PatientsRegister} from './patientsRegister';

export class SimulationUtils {

    /**
     * Gets index of the right object in the rules array
     *
     * @returns {number} -1 if not found , index number if found
     * @param healthState
     * @param healthStatesRulesSets => array containing rules object for every health state
     */
    static getCorrespondingRulesIndex(healthState: State, healthStatesRulesSets: HealthStateRulesSet[]): number {
        return healthStatesRulesSets.findIndex((rulesSet) => {
            return rulesSet.patientInitialState === healthState;
        });
    }

    /**
     * check if there's a drug combination that matches with the used drugs
     *
     * @returns {boolean} true if found
     * @param drugsCombination => Predefined combination of drugs
     * @param usedDrugs =>  drugs used in current simulation
     */

    static isThereMatchingRules(drugsCombination: Drug[], usedDrugs?: Drug[]): boolean {
        return drugsCombination.every((drug) => {
            return usedDrugs.indexOf(drug) >= 0;
        });

    }

    /**
     * check if used drugs cause death
     *
     * @returns {boolean} true if combination causes death
     */

    static isLethalDrugCombination(usedDrugs: Drug[], lethalDrugCombinations: DrugsCombination[]): boolean {
        return lethalDrugCombinations.some((treatment) => {
            return this.isThereMatchingRules(treatment.drugsCombination, usedDrugs);
        });
    }

    /**
     *
     * @returns {State} Patients' Health state after applying the drugs, could be the same or different
     * @param healthStateRulesSet => object with rules for a specefic health state
     * @param usedDrugs
     */
    static getPostTreatmentHealthState(healthStateRulesSet: HealthStateRulesSet, usedDrugs: Drug[]): State {
        const treatmentResult = healthStateRulesSet.treatments.find((drugTreatment) => {
            return this.isThereMatchingRules(drugTreatment.drugsCombination, usedDrugs);
        });
        if (treatmentResult) {
            return treatmentResult.result
        }
        // if no treatment found ,check for missing mandatory drugs like Insulin for diabetes
        if (healthStateRulesSet.hasOwnProperty('mandatoryTreatments')) {
            return HealthStates.DEAD;
        }
        return healthStateRulesSet.patientInitialState;
    }


    /**
     * Generate an object with all dead patients
     *
     * @returns {PatientsRegister} Object with post treatment patients
     * @param preTreatmentPatients => non treated patients
     */
    static everyoneIsDead(preTreatmentPatients: PatientsRegister): PatientsRegister {
        preTreatmentPatients[HealthStates.DEAD] = Object.keys(preTreatmentPatients)
            .reduce((totalNbOfPatients, patientState) => {
                    totalNbOfPatients += preTreatmentPatients[patientState];
                    preTreatmentPatients[patientState] = 0;
                    return totalNbOfPatients;
                }, 0);
        return preTreatmentPatients
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

    static switchPatientsState(preTreatmentPatients: PatientsRegister,
                               postTreatmentPatients: PatientsRegister,
                               preTreatmentHealthState: State,
                               postTreatmentHealthState: State): PatientsRegister {

        // if target health state already exists
        if (postTreatmentPatients[postTreatmentHealthState]) {
            postTreatmentPatients[postTreatmentHealthState] += preTreatmentPatients[preTreatmentHealthState];
            postTreatmentPatients[preTreatmentHealthState] -=  preTreatmentPatients[preTreatmentHealthState];
        } else {
            postTreatmentPatients[postTreatmentHealthState] = preTreatmentPatients[preTreatmentHealthState];
            postTreatmentPatients[preTreatmentHealthState] -= postTreatmentPatients[postTreatmentHealthState];
        }
        return postTreatmentPatients;
    }


    static treatPatients(preTreatmentPatients: PatientsRegister,
                         postTreatmentPatients: PatientsRegister,
                         usedDrugs: Drug[],
                         simRules: HealthStatesAndDrugInteractionsRules): PatientsRegister {

        Object.keys(postTreatmentPatients).forEach((preTreatmentHealthState: State) => {
            // Index of rules (in rules table) corresponding to current patients healthState.
            const healthStateRulesIndex = SimulationUtils.getCorrespondingRulesIndex(preTreatmentHealthState, simRules.healthStatesRulesSets);
            const correspondingRuleSet = simRules.healthStatesRulesSets[healthStateRulesIndex];
            const postTreatmentHealthState = SimulationUtils.getPostTreatmentHealthState(correspondingRuleSet, usedDrugs);
            // building post treatment patients object
            if (postTreatmentHealthState !== preTreatmentHealthState) {
                postTreatmentPatients = SimulationUtils.switchPatientsState(preTreatmentPatients, postTreatmentPatients,
                    preTreatmentHealthState, postTreatmentHealthState
                )
            }
        });
        return postTreatmentPatients;
    }


}
