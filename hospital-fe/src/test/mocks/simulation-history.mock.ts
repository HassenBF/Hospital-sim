import {Drug, SimulationResults} from '../../app/shared/models/simulator.model';

export const MOCK_PRE_TREATMENT_PATIENTS = {F:3,T:1,D:3,H:0};
export const MOCK_POST_TREATMENT_PATIENTS = {F:3,T:0,D:3,H:1};
export const MOCK_USED_DRUGS :Drug[] = ['I','An'];


export const MOCK_SIMULATION_HISTORY = [
  {
    usedDrugs: [
      '',
    ],
    results: [
      {
        healthState: 'F',
        preTreatment: 2,
        postTreatment: 2,
      },
      {
        healthState: 'X',
        preTreatment: 3,
        postTreatment: 3,
      },
      {
        healthState: 'T',
        preTreatment: 1,
        postTreatment: 1,
      },
      {
        healthState: 'H',
        preTreatment: 2,
        postTreatment: 2,
      },
    ],
  },
  {
    usedDrugs: [
      'I',
      'An',
    ],
    results: [
      {
        healthState: 'F',
        preTreatment: 3,
        postTreatment: 3,
      },
      {
        healthState: 'T',
        preTreatment: 1,
        postTreatment: '-',
      },
      {
        healthState: 'D',
        preTreatment: 3,
        postTreatment: 3,
      },
      {
        healthState: 'H',
        preTreatment: '-',
        postTreatment: 1,
      },
    ],
  },
  {
    usedDrugs: [
      'P',
      'As',
    ],
    results: [
      {
        healthState: 'F',
        preTreatment: 3,
        postTreatment: '-',
      },
      {
        healthState: 'T',
        preTreatment: 3,
        postTreatment: '-',
      },
      {
        healthState: 'D',
        preTreatment: 1,
        postTreatment: '-',
      },
      {
        healthState: 'H',
        preTreatment: 2,
        postTreatment: '-',
      },
      {
        healthState: 'X',
        preTreatment: '-',
        postTreatment: 9,
      },
    ],
  },
];


export const MOCK_TRUNCATED_SIMULATION_HISTORY = [
  {
    usedDrugs: [
      '',
    ],
    results: [
      {
        healthState: 'F',
        preTreatment: 2,
        postTreatment: 2,
      },
      {
        healthState: 'X',
        preTreatment: 3,
        postTreatment: 3,
      },
      {
        healthState: 'T',
        preTreatment: 1,
        postTreatment: 1,
      },
      {
        healthState: 'H',
        preTreatment: 2,
        postTreatment: 2,
      },
    ],
  },
];

