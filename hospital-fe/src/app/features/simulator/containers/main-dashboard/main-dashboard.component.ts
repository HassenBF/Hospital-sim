import {Component, OnInit} from '@angular/core';
import {SimulationRules} from '../../../../../../../hospital-lib/src/simulationRules';
import {
  Drug, DrugsCombination, HealthStateRuleSet,
  HealthStates,
  State,
  Treatment
} from '../../../../../../../hospital-lib/src/simulationRules.model';
import {PatientsRegister, Quarantine} from '../../../../../../../hospital-lib/src';
import {SimulationUtils} from "../../../../../../../hospital-lib/src/simulationUtils";
import {SimulationDataService} from "../../../../core/services/simulation-data.service";
import {map, mergeMap, startWith, subscribeOn, switchMap} from "rxjs/operators";
import {forkJoin, interval, Observable, of} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Utils} from "../../../../shared/utils";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  private listSeparator = ',';
  private preTreatmentPatients: PatientsRegister = {};
  private usedDrugs: Drug[] = [];
  private autoRefreshInterval = environment.autoRefreshInterval;

  constructor(private simulationService: SimulationDataService) {}

  ngOnInit() {}

  getPatients(): Observable<PatientsRegister> {
    return this.simulationService.getPatients()
      .pipe(
        map((patients) => Utils.parsePatientsList(patients, this.listSeparator) as PatientsRegister)
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
    quarantine.report();
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
