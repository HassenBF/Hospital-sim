import {Drug, PatientsRegister, SimulationResults, State} from './models/simulator.model';
import {environment} from '../../environments/environment';

export class Utils {

  static readonly historySize = environment.historyLength;



  static parseSimulationDataIntoTable(preTreatmentPatients: PatientsRegister, postTreatmentPatients: PatientsRegister, usedDrugs: Drug[]) {
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

  static truncateSimulationHistory(simulationHistory: SimulationResults[]): SimulationResults [] {
    if (simulationHistory.length > this.historySize ) {
      simulationHistory.shift() ;
    }
    return simulationHistory;
  }
}
