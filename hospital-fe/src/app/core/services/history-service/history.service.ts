import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Drug, PatientsRegister, SimulationResults, State} from '../../../shared/models/simulator.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

  readonly historySize = environment.historyLength;

   parseSimulationDataIntoTable(preTreatmentPatients: PatientsRegister, postTreatmentPatients: PatientsRegister, usedDrugs: Drug[]) {
     const simulation = {usedDrugs: [], results: []};
     Object.keys({...preTreatmentPatients, ...postTreatmentPatients}).forEach((state: State) => {
       simulation.results.push(
         {
           healthState: state,
           preTreatment: preTreatmentPatients[state] ? preTreatmentPatients[state] : '-',
           postTreatment: postTreatmentPatients[state] ? postTreatmentPatients[state] : '-',
         });
     });
     simulation.usedDrugs = usedDrugs;
     return simulation;
   }

    truncateSimulationHistory(simulationHistory: SimulationResults[]): SimulationResults [] {
       if (simulationHistory.length > this.historySize ) {
         simulationHistory.shift() ;
       }
       return simulationHistory;
     }
}
