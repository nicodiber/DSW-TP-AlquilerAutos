import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConductoresComponent } from './listarConductores.component';

describe('ListarConductoresComponent', () => {
  let component: ListarConductoresComponent;
  let fixture: ComponentFixture<ListarConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarConductoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
