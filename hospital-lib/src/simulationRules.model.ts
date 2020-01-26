export enum HealthStates {
    'HEALTHY' = 'H',
    'FEVER' = 'F',
    'TUBERCULOSIS' = 'T',
    'DIABETES' = 'D',
    'DEATH' = 'X',
}

export enum AvailableDrugs {
    'ASPIRIN' = 'As',
    'ANTIBIOTIC' = 'An',
    'INSULIN' = 'I',
    'PARACETAMOL' = 'P',
}

export type State = keyof typeof HealthStates;
export type Drug = keyof typeof AvailableDrugs;


export interface Treatment {
    drugs: Drug [],
    result: State
}

export interface HealthConditionTreatment {
    patientInitialState: State,
    treatments: Treatment [],
    mandatoryTreatments?: Drug []  // result in death if not administrated
}


export interface ConditionsAndDrugInteractionsRules {
    lethalDrugInteractions:Treatment[],
    healthConditionsTreatments:HealthConditionTreatment[]
}
