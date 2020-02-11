import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ControlPanelComponent} from './control-panel.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelComponent],
      imports: [
        ReactiveFormsModule,
        MatSlideToggleModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetch data and emit when button "get simulation Data" is clicked', () => {
    spyOn(component.getDrugsAndPatients, 'emit').and.callThrough();
    spyOn(component, 'getSimulationData').and.callThrough();
    const getSimulationDataBtn = document.getElementById('get-sim-data');
    getSimulationDataBtn.click();
    expect(component.getSimulationData).toHaveBeenCalled();
    expect(component.getDrugsAndPatients.emit).toHaveBeenCalled();
  });

  it('should call "startSimulation" and emit when button "administer drugs" is clicked', () => {
    spyOn(component.administerDrugs, 'emit').and.callThrough();
    spyOn(component, 'startSimulation').and.callThrough();
    const administerDrugsBtn = document.getElementById('run-sim');
    administerDrugsBtn.click();
    expect(component.startSimulation).toHaveBeenCalled();
    expect(component.administerDrugs.emit).toHaveBeenCalled();
  });

  it('should output autoSimulation when auto-sim toggle is checked', async () => {
    spyOn(component.toggleAutoSimulation, 'emit').and.callThrough();
    component.controlPanelForm.get('autoSimulationSwitch').patchValue(true);
    component.autoRefreshInterval = 1;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.toggleAutoSimulation.emit).toHaveBeenCalled();
    });
  });
});
