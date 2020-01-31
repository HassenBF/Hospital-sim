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

 export type State = 'H'|'F'|'T'|'D'|'X';
 export type Drug = 'As'|'An'|'I'|'P';

export interface DrugsCombination {
    drugsCombination: Drug [],
}

export interface Treatment extends DrugsCombination{
    result: State
}

export interface HealthConditionRuleSet {
    patientInitialState: State,
    treatments: Treatment [],
    mandatoryTreatments?: DrugsCombination []  // result in death if not administrated
}


export interface ConditionsAndDrugInteractionsRules {
    lethalDrugInteractions:DrugsCombination[], // contains drug combinations that cause death if given to a patient
    healthConditionsTreatments:HealthConditionRuleSet[]
}
