import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAutosComponent } from './asignar-autos.component';

describe('AsignarAutosComponent', () => {
  let component: AsignarAutosComponent;
  let fixture: ComponentFixture<AsignarAutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignarAutosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarAutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
