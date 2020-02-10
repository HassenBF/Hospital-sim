import { TestBed } from '@angular/core/testing';

import { HistoryService } from './history.service';
import {SimulationDataService} from '../simulation-data-service/simulation-data.service';
import {MOCK_RAW_PATIENTS_REGISTER} from '../../../../test/mocks/simulation-data.mock';
import {
  MOCK_POST_TREATMENT_PATIENTS,
  MOCK_PRE_TREATMENT_PATIENTS, MOCK_SIMULATION_HISTORY, MOCK_TRUNCATED_SIMULATION_HISTORY, MOCK_USED_DRUGS
} from '../../../../test/mocks/simulation-history.mock';
import {SimulationResults} from '../../../shared/models/simulator.model';

describe('HistoryServiceService', () => {
  let service: HistoryService;
  beforeEach(() => {TestBed.configureTestingModule({})
    service = TestBed.get(HistoryService);
  });

  it('should be created', () => {
    const service: HistoryService = TestBed.get(HistoryService);
    expect(service).toBeTruthy();
  });

  it('should parse raw simulation data to simulationResult format',  () => {
   const simulationResults = service.parseSimulationDataIntoTable(MOCK_PRE_TREATMENT_PATIENTS, MOCK_POST_TREATMENT_PATIENTS, MOCK_USED_DRUGS);
    expect(simulationResults).toEqual(MOCK_SIMULATION_HISTORY[1]);
  });

  it('simulation history size should not exceed a user defined size',  () => {
    service.historySize = 0;
    const simulationResults = service.truncateSimulationHistory(MOCK_SIMULATION_HISTORY as SimulationResults[]);
    expect(simulationResults).toEqual(MOCK_TRUNCATED_SIMULATION_HISTORY as SimulationResults[]);
  });


});
