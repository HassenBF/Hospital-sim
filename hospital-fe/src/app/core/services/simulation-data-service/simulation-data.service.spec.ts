import {TestBed} from '@angular/core/testing';

import {SimulationDataService} from './simulation-data.service';
import {HttpClientModule} from '@angular/common/http';
import {
  MOCK_PARSED_PATIENTS_REGISTER,
  MOCK_RAW_DRUGS_LIST,
  MOCK_RAW_PATIENTS_REGISTER
} from '../../../../test/mocks/simulation-data.mock';
import {of} from 'rxjs';

describe('SimulationDataService', () => {
  let simulationDataService: SimulationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        SimulationDataService
      ]
    });
    simulationDataService = TestBed.get(SimulationDataService);
  });

  it('should be created', () => {
    expect(simulationDataService).toBeTruthy();
  });

  it('should return patients list', async () => {
    spyOn(simulationDataService, 'getPatients').and.returnValue(of(MOCK_RAW_PATIENTS_REGISTER));
    simulationDataService.getPatients();
    expect(simulationDataService.getPatients).toHaveBeenCalled();
  });

  it('should return drugs list', async () => {
    spyOn(simulationDataService, 'getDrugs').and.returnValue(of(MOCK_RAW_DRUGS_LIST));
    simulationDataService.getDrugs();
    expect(simulationDataService.getDrugs).toHaveBeenCalled();
  });

  it ('should parse patients string to a patients register', () => {
    const parsedPatientsRegister = simulationDataService.parseToPatientsRegister(MOCK_RAW_PATIENTS_REGISTER, ',');
    expect(parsedPatientsRegister).toEqual(MOCK_PARSED_PATIENTS_REGISTER);
  });
});
