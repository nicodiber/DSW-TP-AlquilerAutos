import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListarMarcaComponent } from './marca-listar.component';
import { MarcaService } from '../../../services/marca.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { expect } from '@jest/globals';

describe('ListarMarcaComponent', () => {
  let component: ListarMarcaComponent;
  let fixture: ComponentFixture<ListarMarcaComponent>;
  let marcaServiceMock: any;
  let authServiceMock: any;
  let toastrMock: any;

  beforeEach(async () => {
    // Mocks de los servicios
    marcaServiceMock = {
      obtenerMarcas: jest.fn().mockReturnValue(of([])),
      eliminarMarca: jest.fn().mockReturnValue(of(null)),
      verificarModelosPorMarca: jest.fn().mockReturnValue(of(false)),
      obtenerModelosPorMarca: jest.fn().mockReturnValue(of([])),
    };

    authServiceMock = {
      getAuthenticatedUser: jest.fn().mockReturnValue(of({ rol: 'administrador' })),
    };

    toastrMock = {
      success: jest.fn(),
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ListarMarcaComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: MarcaService, useValue: marcaServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(ListarMarcaComponent, {
        set: {
          template: `
            <h1>Listado de Marcas</h1>
            <ul>
              <li *ngFor="let marca of listaMarcas">
                {{ marca.nombreMarca }}
              </li>
            </ul>
             <!-- Modal de eliminación -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" style="background-color: transparent;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Confirmar Eliminación</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ¿Estás seguro de que deseas eliminar esta Marca?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button type="button" class="btn btn-danger" (click)="eliminarAuto(marcaIdToDelete)">Sí,
                eliminar</button>
            </div>
          </div>
        </div>
      </div>
          `,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    (window as any).bootstrap = { // Simular bootstrap para el Modal
        Modal: class {
          show() {}
          hide() {}
        }
      };
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar la lista de marcas al inicializarse', () => {
    const mockMarcas = [
      { _id: 1, nombreMarca: 'Toyota' },
      { _id: 2, nombreMarca: 'Ford' },
    ];

    marcaServiceMock.obtenerMarcas.mockReturnValue(of(mockMarcas));

    component.getMarcas();

    expect(marcaServiceMock.obtenerMarcas).toHaveBeenCalled();
    expect(component.listaMarcas).toEqual(mockMarcas);
  });

  it('debería manejar errores al cargar las marcas', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    marcaServiceMock.obtenerMarcas.mockReturnValue(throwError(() => new Error('Error al obtener marcas')));

    component.getMarcas();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener marcas:', expect.anything());

    consoleErrorSpy.mockRestore();
  });

  it('debería eliminar una marca y actualizar la lista', () => {
    marcaServiceMock.verificarModelosPorMarca.mockReturnValue(of(false));
    marcaServiceMock.eliminarMarca.mockReturnValue(of(null));
    marcaServiceMock.obtenerMarcas.mockReturnValue(of([]));

    component.eliminarMarca(1);

    expect(marcaServiceMock.verificarModelosPorMarca).toHaveBeenCalledWith(1);
    expect(marcaServiceMock.eliminarMarca).toHaveBeenCalledWith(1);
    expect(toastrMock.success).toHaveBeenCalledWith('Marca eliminada con éxito', 'Éxito');
    expect(marcaServiceMock.obtenerMarcas).toHaveBeenCalled();
  });

  it('debería mostrar error si la marca tiene modelos asociados', () => {
    marcaServiceMock.verificarModelosPorMarca.mockReturnValue(of(true));

    component.eliminarMarca(1);

    expect(toastrMock.error).toHaveBeenCalledWith('No se puede eliminar la marca porque tiene modelos asociados', 'Error');
    expect(marcaServiceMock.eliminarMarca).not.toHaveBeenCalled();
  });

  it('debería abrir el modal de eliminación correctamente', () => {
    const marcaId = 1;
    component.abrirDeleteModal(marcaId);

    fixture.detectChanges();

    expect(component.marcaIdToDelete).toBe(marcaId);

    const modalElement = document.querySelector('#deleteModal');
    expect(modalElement).not.toBeNull();
  });
});
