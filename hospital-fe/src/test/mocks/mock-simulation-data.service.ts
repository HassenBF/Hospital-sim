import {of} from 'rxjs';
import {MOCK_RAW_DRUGS_LIST, MOCK_RAW_PATIENTS_REGISTER} from './simulation-data.mock';
import {Injectable} from '@angular/core';
import {PatientsRegister} from '../../app/shared/models/simulator.model';

@Injectable()
export class MockSimulationDataService {
  getPatients() {
    return of(MOCK_RAW_PATIENTS_REGISTER);
  }
  getDrugs() {
    return of(MOCK_RAW_DRUGS_LIST);
  }

  parseToPatientsRegister(patientsStringList: string, separator: string): PatientsRegister {
    return patientsStringList
      .split(separator)
      .reduce((patients, healthStatus) => {
        patients[healthStatus] ? patients[healthStatus]++ : patients[healthStatus] = 1;
        return patients;
      }, {} as PatientsRegister);
  }
}
