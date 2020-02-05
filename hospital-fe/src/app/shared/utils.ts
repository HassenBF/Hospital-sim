import {Drug, PatientsRegister, SimulationResults, State} from './models/simulator.model';
import {environment} from "../../environments/environment";

export class Utils {

  static readonly historySize = environment.historyLength;

  static parseToPatientsRegister(patientsStringList: string, separator: string): PatientsRegister {
    return patientsStringList
      .split(separator)
      .reduce((patients, healthStatus) => {
        patients[healthStatus] ? patients[healthStatus]++ : patients[healthStatus] = 1;
        return patients
      }, {} as PatientsRegister)
  };

  static parseSimulationDataIntoTable(preTreatmentPatients: PatientsRegister, postTreatmentPatients: PatientsRegister, usedDrugs: Drug[]) {
    let simulation = {usedDrugs: [], results: []};
    Object.keys({...preTreatmentPatients, ...postTreatmentPatients}).forEach((state: State) => {
      simulation.results.push(
        {
          healthState: state,
          preTreatment: preTreatmentPatients[state] ? preTreatmentPatients[state] : 0,
          postTreatment: postTreatmentPatients[state] ? postTreatmentPatients[state] : 0,
        });
    });
    simulation.usedDrugs = usedDrugs;
    return simulation;
  }

  static limitSimulationHistory(simulationHistory: SimulationResults[]):SimulationResults []{
    if (simulationHistory.length >= this.historySize ){
      // shift instead of pop since we show the array in reverse order
      simulationHistory.shift() ;
    }
    return simulationHistory;
  }
}
