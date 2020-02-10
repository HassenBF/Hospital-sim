import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainDashboardComponent} from './main-dashboard.component';
import {Component, Input} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

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
});
