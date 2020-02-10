import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {filter} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  AVAILABLE_DRUGS,
  AVAILABLE_DRUGS_LIST,
  AVAILABLE_HEALTH_STATES_LIST,
  HEALTH_STATES
} from '../../../../core/full-names.const';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit, OnDestroy {

  @Output() getDrugsAndPatients = new EventEmitter();
  @Output() administerDrugs = new EventEmitter();
  @Output() toggleAutoSimulation = new EventEmitter();
  @Output() manuallyAddPatients = new EventEmitter();
  controlPanelForm: FormGroup;
  autoRefreshInterval = environment.autoRefreshInterval;
  autoSimToggleSubscription: Subscription;
  drugList = AVAILABLE_DRUGS_LIST;
  healthStatesList = AVAILABLE_HEALTH_STATES_LIST;
  fullHealthStateNames = HEALTH_STATES;
  fullDrugNames = AVAILABLE_DRUGS;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
    this.setUpAutoSimulation();
  }

  ngOnDestroy(): void {
    this.autoSimToggleSubscription.unsubscribe();
  }

  buildForm() {
    this.controlPanelForm = this.fb.group({
      autoSimulationSwitch: false,
      drugs: '',
      healthState:'',
      nbOfPatients:0
    });
  }


  public addDrugs(){
    console.log(this.controlPanelForm.value);
  }

  public addPatients(){
    const patients = {[this.controlPanelForm.value.healthState] : this.controlPanelForm.value.nbOfPatients};
    console.log(patients);
    this.manuallyAddPatients.emit(patients);
  }

  public getSimulationData(): void {
    this.getDrugsAndPatients.emit();
  }

  public startSimulation(): void {
    this.administerDrugs.emit();
  }

  public setUpAutoSimulation() {
    this.autoSimToggleSubscription = interval(this.autoRefreshInterval)
      .pipe(
        filter(() => this.controlPanelForm.controls.autoSimulationSwitch.value),
      ).subscribe(() => {
        this.toggleAutoSimulation.emit(this.controlPanelForm.controls.autoSimulationSwitch.value);
      });
  }


}
