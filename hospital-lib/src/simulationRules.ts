import {ConditionsAndDrugInteractionsRules} from "./simulationRules.model";

export class SimulationRules {

    static readonly rules: ConditionsAndDrugInteractionsRules = {
        lethalDrugInteractions: [
            {drugs: ['ASPIRIN', 'PARACETAMOL'], result: 'DEATH'}
        ],
        healthConditionsTreatments: [
            {
                patientInitialState: 'HEALTHY',
                treatments: [
                    {drugs: ['INSULIN', 'ANTIBIOTIC'], result: 'FEVER'}
                ],
            },
            {
                patientInitialState: 'FEVER',
                treatments: [
                    {drugs: ['ASPIRIN'], result: 'HEALTHY'},
                    {drugs: ['PARACETAMOL'], result: 'HEALTHY'}
                ]
            },
            {
                patientInitialState: 'TUBERCULOSIS',
                treatments: [
                    {drugs: ['ANTIBIOTIC'], result: 'HEALTHY'}
                ]
            },
            {
                patientInitialState: 'DIABETES',
                treatments: [
                    {drugs: ['INSULIN'], result: 'DIABETES'}
                ],
                mandatoryTreatments: ['INSULIN']
            }

        ]

    }
}
