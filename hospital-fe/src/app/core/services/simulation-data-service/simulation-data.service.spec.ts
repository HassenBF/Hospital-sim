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
  let service: SimulationDataService;

  const mockSimulationDataService = {
    getPatients: function () {
      return of(MOCK_RAW_PATIENTS_REGISTER);
    },
    getDrugs: function () {
      return of(MOCK_RAW_DRUGS_LIST);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {provide: SimulationDataService, useValue: mockSimulationDataService}
      ]
    });
    service = TestBed.get(SimulationDataService);
  });


  it('should be created', () => {
    const service: SimulationDataService = TestBed.get(SimulationDataService);
    expect(service).toBeTruthy();
  });

  it('should return patients list', async () => {
    mockSimulationDataService.getPatients().subscribe((patients) => {
      expect(patients).toEqual(MOCK_RAW_PATIENTS_REGISTER);
    });
  });

  it('should return drugs list', async () => {
    mockSimulationDataService.getDrugs().subscribe((drugs) => {
      expect(drugs).toEqual(MOCK_RAW_DRUGS_LIST);
    });
  });

  it ('should parse patients string to a patients register',()=> {

    const parsedPatientsRegister = service.parseToPatientsRegister(MOCK_RAW_PATIENTS_REGISTER,',');
    expect(parsedPatientsRegister).toEqual(MOCK_PARSED_PATIENTS_REGISTER);
  })
});
