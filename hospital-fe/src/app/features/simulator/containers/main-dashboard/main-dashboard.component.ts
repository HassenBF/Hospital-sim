import {Component, OnInit} from '@angular/core';

import {SimulationDataService} from "../../../../core/services/simulation-data.service";
import {map} from "rxjs/operators";
import {forkJoin, Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Utils} from "../../../../shared/utils";
import {Drug, PatientsRegister} from "../../../../shared/models/simulator.model";
import {Quarantine} from "../../../../../../../hospital-lib/src";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  private listSeparator = ',';
  private preTreatmentPatients: PatientsRegister = {};
  private postTreatmentPatients: PatientsRegister = {};
  private usedDrugs: Drug[] = [];
  private autoRefreshInterval = environment.autoRefreshInterval;
  private simulationHistory = [];

  constructor(private simulationService: SimulationDataService) {}

  ngOnInit() {}

  getPatients(): Observable<PatientsRegister> {
    return this.simulationService.getPatients()
      .pipe(
        map((patients) => Utils.parseToPatientsRegister(patients, this.listSeparator) as PatientsRegister)
      )
  }

  getDrugs(): Observable<Drug[]> {
    return this.simulationService.getDrugs()
      .pipe(
        map((drugsString) => drugsString.split(this.listSeparator) as Drug[])
      )
  }

  public getSimulationData() {
    forkJoin([
      this.getPatients(),
      this.getDrugs(),
    ]).subscribe(([patients,drugs]) => {
      this.preTreatmentPatients = patients;
      this.usedDrugs = drugs;
      console.log('Patients',this.preTreatmentPatients);
      console.log('drugs',this.usedDrugs);
    });
  }


  public runSimulation(): void {
    const quarantine = new Quarantine(this.preTreatmentPatients);
    quarantine.setDrugs(this.usedDrugs);
    quarantine.wait40Days();
    this.postTreatmentPatients = quarantine.report();
    this.simulationHistory.push(Utils.parseSimulationDataIntoTable(this.preTreatmentPatients,this.postTreatmentPatients,this.usedDrugs));
  }

  public startStopAutoSimulation(): void {
    forkJoin([
      this.getPatients(),
      this.getDrugs(),
    ]).subscribe(([patients, drugs]) => {
      this.preTreatmentPatients = patients;
      this.usedDrugs = drugs;
      this.runSimulation();
    })
  }
}
