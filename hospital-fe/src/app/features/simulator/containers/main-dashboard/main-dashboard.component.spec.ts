import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainDashboardComponent} from './main-dashboard.component';
import {Component, Input} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {SimulationDataService} from '../../../../core/services/simulation-data-service/simulation-data.service';
import {MockSimulationDataService} from '../../../../../test/mocks/mock-simulation-data.service';

@Component({
  selector: 'app-control-panel',
  template: '<span>Fake app-control-panel</span>',
})
class FakeControlPanelComponent {
}

@Component({
  selector: 'app-simulations-history',
  template: '<span>Fake app-simulation-history</span>',
})
class FakeSimulationHistoryComponent {
  @Input() simulationHistory;
}

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainDashboardComponent,
        FakeControlPanelComponent,
        FakeSimulationHistoryComponent,
      ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        {provide: SimulationDataService, useClass: MockSimulationDataService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch simulation data and init component when getSimulationData is called',  async () => {
    spyOn(component, 'getPatientsAndDrugs').and.callThrough();
    component.getSimulationData();
    expect(component.getPatientsAndDrugs).toHaveBeenCalled();
    // init components value
    expect(component.postTreatmentPatients).toEqual({});
    expect(component.preTreatmentPatients).toEqual({F: 3, X: 2, H: 1, D: 3, T: 2});
    expect(component.usedDrugs).toEqual(['An', 'P']);
    // Test if fetched values were pushed into history table.
    expect(component.simulationHistory.length).toEqual(1);

  });

  it('should fetch data and run simulation when getSimulationData is called with autoSimulation Activated ', () => {
    // calls run simulation if auto simulation is turned On
    spyOn(component, 'runSimulation').and.callThrough();
    component.getSimulationData(true);
    expect(component.runSimulation).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

});
