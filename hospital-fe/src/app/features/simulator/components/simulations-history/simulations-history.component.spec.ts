import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SimulationsHistoryComponent} from './simulations-history.component';
import {MOCK_SIMULATION_HISTORY} from '../../../../../test/mocks/simulation-history.mock';
import {SimulationResults} from '../../../../shared/models/simulator.model';

describe('SimulationsHistoryComponent', () => {
  let component: SimulationsHistoryComponent;
  let fixture: ComponentFixture<SimulationsHistoryComponent>;
  const MOCK_SIMULATION_HISTORY_COPY = MOCK_SIMULATION_HISTORY.slice() as SimulationResults[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationsHistoryComponent);
    component = fixture.componentInstance;
    component.simulationHistory = MOCK_SIMULATION_HISTORY_COPY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display case zero message if there are no entries in the table' , () => {
    component.simulationHistory = [];
    fixture.detectChanges();
    const zeroHistoryMessage = document.getElementById('zero-case-simulation-history');
    expect(zeroHistoryMessage.innerText).toEqual('Run a simulation to see data');
  });

  it('should display case zero message if there are no drugs to administer' , () => {
    // first element of table
    component.simulationHistory.length = 1;
    component.simulationHistory[0].usedDrugs = [''];
    fixture.detectChanges();
    const noDrugsMessage = document.getElementById('case-no-drugs');
    expect(noDrugsMessage.innerText).toEqual('No treatment administrated');
  });

  it('should display data on history table' , async () => {
    component.simulationHistory.length = 1;
    component.simulationHistory[0].usedDrugs = ['I'];
    fixture.detectChanges();

    const healthStateCell = document.getElementById('health-state-0');
    const nbOfPatientsPreTreatment = document.getElementById('pre-treat-0');
    const nbOfPatientsPostTreatment = document.getElementById('post-treat-0');
    const drugsUsed = document.getElementById('case-there-are-drugs-0');

    expect(healthStateCell.innerText).toEqual('Fever');
    expect(nbOfPatientsPreTreatment.innerText).toEqual('2');
    expect(nbOfPatientsPostTreatment.innerText).toEqual('2');
    expect(drugsUsed.innerText).toEqual('Insulin');
  });


});
