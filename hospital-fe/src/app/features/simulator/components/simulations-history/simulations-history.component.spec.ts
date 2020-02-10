import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationsHistoryComponent } from './simulations-history.component';
import {MOCK_SIMULATION_HISTORY} from '../../../../../test/mocks/simulation-history.mock';
import {SimulationResults} from '../../../../shared/models/simulator.model';

describe('SimulationsHistoryComponent', () => {
  let component: SimulationsHistoryComponent;
  let fixture: ComponentFixture<SimulationsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationsHistoryComponent);
    component = fixture.componentInstance;
    component.simulationHistory = MOCK_SIMULATION_HISTORY as SimulationResults[];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
