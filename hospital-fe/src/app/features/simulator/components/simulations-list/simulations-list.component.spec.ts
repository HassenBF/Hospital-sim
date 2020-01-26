import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationsListComponent } from './simulations-list.component';

describe('SimulationsListComponent', () => {
  let component: SimulationsListComponent;
  let fixture: ComponentFixture<SimulationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
