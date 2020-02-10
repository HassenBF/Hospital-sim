import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {filter} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AVAILABLE_DRUGS_LIST} from '../../../../core/full-names.const';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit, OnDestroy {

  @Output() getDrugsAndPatients = new EventEmitter();
  @Output() administerDrugs = new EventEmitter();
  @Output() toggleAutoSimulation = new EventEmitter();
  controlPanelForm: FormGroup;
  autoRefreshInterval = environment.autoRefreshInterval;
  autoSimToggleSubscription: Subscription;
  drugList = AVAILABLE_DRUGS_LIST

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
      drug: ''
    });
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
