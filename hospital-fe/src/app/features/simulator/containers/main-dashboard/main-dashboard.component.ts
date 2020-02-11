import {Component, OnInit} from '@angular/core';

import {SimulationDataService} from '../../../../core/services/simulation-data-service/simulation-data.service';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {Drug, PatientsRegister} from '../../../../shared/models/simulator.model';
import {Quarantine} from '../../../../../../../hospital-lib/src';
import {HistoryService} from '../../../../core/services/history-service/history.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  private readonly listSeparator = ',';
  preTreatmentPatients: PatientsRegister = {};
  postTreatmentPatients: PatientsRegister = {};
  usedDrugs: Drug[] = [];
  simulationHistory = [];

  constructor(private simulationService: SimulationDataService,
              private historyService: HistoryService) {
  }

  ngOnInit() {
  }

  fetchPatients(): Observable<PatientsRegister> {
    return this.simulationService.getPatients()
      .pipe(
        map((patients) => this.simulationService.parseToPatientsRegister(patients, this.listSeparator) as PatientsRegister)
      );
  }

  fetchDrugs(): Observable<Drug[]> {
    return this.simulationService.getDrugs()
      .pipe(
        map((drugsString) => drugsString.split(this.listSeparator) as Drug[])
      );
  }

  getPatientsAndDrugs(): Observable<[PatientsRegister, Drug[]]> {
    return forkJoin([
      this.fetchPatients(),
      this.fetchDrugs(),
    ]);
  }

  public getSimulationData(isAutoSimulationActivated?: boolean) {
    this.getPatientsAndDrugs()
      .subscribe(([patients, drugs]) => {
      this.postTreatmentPatients = {};
      this.preTreatmentPatients = patients;
      this.usedDrugs = drugs;
      // transforms simulation data into display format before pushing to history table
      this.simulationHistory
        .push(this.historyService.parseSimulationDataIntoTable(this.preTreatmentPatients, this.postTreatmentPatients, this.usedDrugs));
      // makes sure table size do not exceed a defined size
      this.historyService.truncateSimulationHistory(this.simulationHistory);
      if (isAutoSimulationActivated) {
        this.runSimulation();
      }
    });
  }

  public runSimulation(): void {
    const quarantine = new Quarantine(this.preTreatmentPatients);
    quarantine.setDrugs(this.usedDrugs);
    quarantine.wait40Days();
    this.postTreatmentPatients = quarantine.report();
    // Append simulation results to simulation data .
    this.simulationHistory[this.simulationHistory.length - 1] =
      this.historyService.parseSimulationDataIntoTable(this.preTreatmentPatients, this.postTreatmentPatients, this.usedDrugs);
  }
}
