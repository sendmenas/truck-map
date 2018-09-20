import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTruckComponent } from './selected-truck.component';

describe('SelectedTruckComponent', () => {
  let component: SelectedTruckComponent;
  let fixture: ComponentFixture<SelectedTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
