
import {Drug, PatientsRegister, Simulation, State} from "./models/simulator.model";

export class Utils {
  static parseToPatientsRegister(patientsStringList: string, separator: string): PatientsRegister {
    return patientsStringList
      .split(separator)
      .reduce((patients, healthStatus) => {
        patients[healthStatus] ? patients[healthStatus]++ : patients[healthStatus] = 1;
        return patients
      }, {} as PatientsRegister)
  };


  static parseSimulationDataIntoTable(preTreatmentPatients: PatientsRegister, postTreatmentPatients: PatientsRegister, usedDrugs: Drug[]) {
    let simulation : Simulation = {usedDrugs:null,simulationResults:null};
    let tmpArray = [];
    Object.keys({...preTreatmentPatients, ...postTreatmentPatients}).forEach((state: State) => {
      tmpArray.push(
        {
          healthState: state,
          preTreatment: preTreatmentPatients[state] ? preTreatmentPatients[state] : 0,
          postTreatment: postTreatmentPatients[state] ? postTreatmentPatients[state] : 0,
        });
      simulation.simulationResults = tmpArray;
    });
    simulation.usedDrugs = usedDrugs;
    return simulation;
  }
}
