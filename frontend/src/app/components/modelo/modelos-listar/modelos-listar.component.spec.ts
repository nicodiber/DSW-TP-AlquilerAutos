import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosListarComponent } from './modelos-listar.component';

describe('ModelosListarComponent', () => {
  let component: ModelosListarComponent;
  let fixture: ComponentFixture<ModelosListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelosListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
