import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasTrabajadorComponent } from './tareas-trabajador.component';

describe('TareasTrabajadorComponent', () => {
  let component: TareasTrabajadorComponent;
  let fixture: ComponentFixture<TareasTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareasTrabajadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
