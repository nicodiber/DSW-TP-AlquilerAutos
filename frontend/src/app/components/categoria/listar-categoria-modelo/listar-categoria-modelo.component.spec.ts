import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCategoriaModeloComponent } from './listar-categoria-modelo.component';

describe('ListarCategoriaModeloComponent', () => {
  let component: ListarCategoriaModeloComponent;
  let fixture: ComponentFixture<ListarCategoriaModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarCategoriaModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCategoriaModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
