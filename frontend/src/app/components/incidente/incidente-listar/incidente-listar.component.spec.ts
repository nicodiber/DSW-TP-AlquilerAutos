import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenteListarComponent } from './incidente-listar.component';

describe('IncidenteListarComponent', () => {
  let component: IncidenteListarComponent;
  let fixture: ComponentFixture<IncidenteListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidenteListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
