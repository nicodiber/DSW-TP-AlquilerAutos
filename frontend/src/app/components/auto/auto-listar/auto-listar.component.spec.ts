import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoListarComponent } from './auto-listar.component';

describe('AutoListarComponent', () => {
  let component: AutoListarComponent;
  let fixture: ComponentFixture<AutoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
