import {TestBed} from '@angular/core/testing';

import {HistoryService} from './history.service';
import {
  MOCK_POST_TREATMENT_PATIENTS,
  MOCK_PRE_TREATMENT_PATIENTS,
  MOCK_SIMULATION_HISTORY,
  MOCK_USED_DRUGS
} from '../../../../test/mocks/simulation-history.mock';
import {SimulationResults} from '../../../shared/models/simulator.model';

describe('HistoryServiceService', () => {
  let historyService: HistoryService;
  beforeEach(() => {TestBed.configureTestingModule({});
                    historyService = TestBed.get(HistoryService);
  });

  it('should be created', () => {
    expect(historyService).toBeTruthy();
  });

  it('should parse raw simulation data to simulationResult format',  (() => {
   const simulationResults = historyService.parseSimulationDataIntoTable({...MOCK_PRE_TREATMENT_PATIENTS},
                                                                  {...MOCK_POST_TREATMENT_PATIENTS} ,
                                                                  MOCK_USED_DRUGS );
   expect(simulationResults).toEqual({...MOCK_SIMULATION_HISTORY[1]});

  }));

  it('should take 1 element of table if table size is superior to user defined value ',  async () => {
    historyService.historySize = 2;
    const mockCopy = MOCK_SIMULATION_HISTORY.slice() as SimulationResults[];
    // MOCK_SIMULATION_HISTORY size is 3
    const simulationResults = historyService.truncateSimulationHistory(mockCopy);
    expect(simulationResults.length).toEqual(2 );
  });

});
