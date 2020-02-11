export interface PatientsRegister {
  [key: string]: number;
}

export type State = 'H' | 'F' | 'T' | 'D' | 'X';
export type Drug = 'As' | 'An' | 'I' | 'P'|'';


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


