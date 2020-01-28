import {AvailableDrugs, ConditionsAndDrugInteractionsRules, HealthStates} from "./simulationRules.model";

export class SimulationRules {

    static readonly rules: ConditionsAndDrugInteractionsRules = {
        lethalDrugInteractions: [
            {drugsCombination: [AvailableDrugs.ASPIRIN, AvailableDrugs.PARACETAMOL]},
            {drugsCombination: [AvailableDrugs.ASPIRIN, AvailableDrugs.PARACETAMOL]}
        ],
        healthConditionsTreatments: [
            {
                patientInitialState: HealthStates.HEALTHY,
                treatments: [
                    {drugsCombination: [AvailableDrugs.INSULIN, AvailableDrugs.ANTIBIOTIC], result: HealthStates.FEVER}
                ],
            },
            {
                patientInitialState: HealthStates.FEVER,
                treatments: [
                    {drugsCombination: [AvailableDrugs.ASPIRIN], result: HealthStates.HEALTHY},
                    {drugsCombination: [AvailableDrugs.PARACETAMOL], result: HealthStates.HEALTHY}
                ]
            },
            {
                patientInitialState: HealthStates.TUBERCULOSIS,
                treatments: [
                    {drugsCombination: [AvailableDrugs.ANTIBIOTIC], result: HealthStates.HEALTHY}
                ]
            },
            {
                patientInitialState: HealthStates.DIABETES,
                treatments: [
                    {drugsCombination: [AvailableDrugs.INSULIN], result: HealthStates.DIABETES}
                ],
                mandatoryTreatments: [
                    {drugsCombination: [AvailableDrugs.INSULIN]}
                ]
            }

        ]

    }
}
