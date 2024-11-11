import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarModelosMarcaComponent } from './listar-marca-modelo.component';

describe('ListarModelosMarcaComponent', () => {
  let component: ListarModelosMarcaComponent;
  let fixture: ComponentFixture<ListarModelosMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarModelosMarcaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarModelosMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
