import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaCrearComponent } from './marca-crear.component';

describe('MarcaCrearComponent', () => {
  let component: MarcaCrearComponent;
  let fixture: ComponentFixture<MarcaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarcaCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
