import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {PatientsRegister} from '../../../shared/models/simulator.model';

@Injectable({
  providedIn: 'root'
})
export class SimulationDataService {
  private baseUrl = environment.baseUrl;
  constructor( private http: HttpClient) { }

  getPatients(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/patients`);
  }

  getDrugs(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/drugs`);
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
