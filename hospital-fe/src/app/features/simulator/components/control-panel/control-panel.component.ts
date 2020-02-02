import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {interval, of, Subscribable, Subscription} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {startWith, switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {


  @Output() getDrugsAndPatients = new EventEmitter();
  @Output() administerDrugs = new EventEmitter();
  @Output() toggleAutoSimulation = new EventEmitter();
  cpForm: FormGroup;
  private autoRefreshInterval = environment.autoRefreshInterval;
  autoSimToggleSubscription : Subscription;


  constructor(private fb:FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.cpForm = this.fb.group({
      autoSimulationSwitch: false,
    });
  }

  onChange($event){
    this.switchAutoSimulation($event.checked);
  }

  public getSimulationData(): void {
    this.getDrugsAndPatients.emit();
  }

  public startSimulation(): void {
    this.administerDrugs.emit();
  }

  public switchAutoSimulation(autoSimToggleValue:boolean): void {
    this.autoSimToggleSubscription = interval(2000).pipe(
      startWith(0)
    ).subscribe(()=>{
      console.log('call');
      this.toggleAutoSimulation.emit();
    });
    // if (!autoSimToggleValue) {
    //   this.autoSimToggleSubscription.unsubscribe();
    // }
  }

}
