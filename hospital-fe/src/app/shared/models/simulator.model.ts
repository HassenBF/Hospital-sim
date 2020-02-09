export interface PatientsRegister {
  [key: string]: number;
}

export enum HealthStates {
  'HEALTHY' = 'H',
  'FEVER' = 'F',
  'TUBERCULOSIS' = 'T',
  'DIABETES' = 'D',
  'DEAD' = 'X',
}

export enum AvailableDrugs {
  'ASPIRIN' = 'As',
  'ANTIBIOTIC' = 'An',
  'INSULIN' = 'I',
  'PARACETAMOL' = 'P',
}

export type State = 'H' | 'F' | 'T' | 'D' | 'X';
export type Drug = 'As' | 'An' | 'I' | 'P';

export interface DrugsCombination {
  drugsCombination: Drug [];
}

export interface Treatment extends DrugsCombination {
  result: State;
}

export interface HealthStateRuleSet {
  patientInitialState: State;
  treatments: Treatment [];
  mandatoryTreatments?: DrugsCombination [];  // result in death if not administrated
}


export interface HealthStatesAndDrugInteractionsRules {
  lethalDrugInteractions: DrugsCombination[]; // contains drug combinations that cause death if given to a patient
  healthStatesRuleSets: HealthStateRuleSet[];
}

export interface SimulationSession {
  preTreatmentHealthState: State;
  postTreatmentHealthState: State;
  preTreatmentPatients: PatientsRegister;
  postTreatmentPatients: PatientsRegister;
}

export interface SimulationResults {
  usedDrugs: Drug[];
  results: [
    {
      healthState: State,
      preTreatment: number,
      postTreatment: number
    }
  ];
}


