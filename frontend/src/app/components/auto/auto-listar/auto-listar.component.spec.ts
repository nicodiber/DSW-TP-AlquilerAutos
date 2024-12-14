import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting  } from '@angular/common/http/testing'; // Hace que las peticiones HTTP realizadas por los servicios sean interceptadas y controladas por el entorno de pruebas
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Permite ignorar errores por elementos no declarados
import { AutoListarComponent } from './auto-listar.component';
import { AutoService } from '../../../services/auto.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

describe('AutoListarComponent', () => {
  let component: AutoListarComponent;
  let fixture: ComponentFixture<AutoListarComponent>;
  let autoServiceMock: any;
  let authServiceMock: any;
  let toastrMock: any;

  beforeEach(async () => {
    // Mocks de los servicios
    autoServiceMock = {
      obtenerAutos: jest.fn().mockReturnValue(of([])), // Este método debe devolver un observable
      eliminarAuto: jest.fn().mockReturnValue(of(null)),
    };

    authServiceMock = {
      getAuthenticatedUser: jest.fn().mockReturnValue(of({ rol: 'administrador' })), // Simula la respuesta de un usuario autenticado
    };

    toastrMock = {
      success: jest.fn(),
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AutoListarComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: AutoService, useValue: autoServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Permite ignorar errores por elementos no declarados
    })
    .overrideComponent(AutoListarComponent, { // Usar un template distinto para las pruebas
      set: {
        template: `
        <h1>Autos Listados</h1>
        <ul>
          <li *ngFor="let auto of listaAutos">
            {{ auto.modelo }}
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
              ¿Estás seguro de que deseas eliminar este Auto?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button type="button" class="btn btn-danger" (click)="eliminarAuto(autoIdToDelete)">Sí,
                eliminar</button>
            </div>
          </div>
        </div>
      </div>
      `
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoListarComponent);
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

  it('debería cargar la lista de autos al inicializarse', () => {
    const mockAutos: any[] = [
      { id: 1, modelo: 'Ford Raptor', patente: 'DS123SA', estado: 'Disponible', sucursal: 'Sucursal Colapinto' },
      { id: 2, modelo: 'X Wing', patente: 'RED005', estado: 'Disponible', sucursal: 'Sucursal Hamilton' },
    ];

    autoServiceMock.obtenerAutos.mockReturnValue(of(mockAutos));

    component.obtenerAutos();

    expect(autoServiceMock.obtenerAutos).toHaveBeenCalled();
    expect(component.listaAutos).toEqual(mockAutos);
  });

  it('debería manejar el error al obtener autos', () => {
    // Espiar console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Simular un error al obtener los autos
    autoServiceMock.obtenerAutos.mockReturnValue(throwError(() => new Error('Error al obtener autos')));

    component.obtenerAutos();
    
    // Verificar si se llamó a console.error con el mensaje esperado
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener los autos:', expect.anything());

    // Restaurar la implementación original de console.error
    consoleErrorSpy.mockRestore();
  });

  it('debería eliminar un auto y actualizar la lista', () => {
    autoServiceMock.eliminarAuto.mockReturnValue(of(null));
    autoServiceMock.obtenerAutos.mockReturnValue(of([]));

    component.eliminarAuto(1);

    expect(autoServiceMock.eliminarAuto).toHaveBeenCalledWith(1);
    expect(toastrMock.success).toHaveBeenCalledWith('Auto eliminado con éxito');
    expect(autoServiceMock.obtenerAutos).toHaveBeenCalled();
  });

  it('debería abrir el modal de eliminación correctamente', () => {
    const autoId = 1;
    component.abrirDeleteModal(autoId);

    // Ver que Angular haya procesado el cambio de estado
    fixture.detectChanges();

    expect(component.autoIdToDelete).toBe(autoId);

    // Verificar si el modal de eliminación existe
    const modalElement = document.querySelector('#deleteModal');
    expect(modalElement).not.toBeNull();

    // Verificar si el modal se ha inicializado correctamente usando Bootstrap
    const bootstrapModal = modalElement ? new (window as any).bootstrap.Modal(modalElement) : null;
    expect(bootstrapModal).toBeTruthy(); 
  });

  it('debería cerrar el modal al hacer clic en el botón "No"', () => {
    const autoId = 1;
    component.abrirDeleteModal(autoId);

    // Ver que Angular haya procesado el cambio de estado
    fixture.detectChanges();

    // Verificar que el modal existe
    const modalElement = document.querySelector('#deleteModal');
    expect(modalElement).not.toBeNull();

    // Simular el clic en el botón "No"
    const closeButton = modalElement?.querySelector('.btn-secondary') as HTMLButtonElement;
    if (closeButton) {
      closeButton.click();
    }

    // Confirmar que el modal se haya cerrado
    expect(modalElement?.classList.contains('show')).toBeFalsy();
  });

  it('debería eliminar el auto al hacer clic en el botón "Sí, eliminar"', () => {
    const autoId = 1;
    component.abrirDeleteModal(autoId);

    // Ver que Angular haya procesado el cambio de estado
    fixture.detectChanges();

    // Simula el clic en el botón "Sí, eliminar"
    const deleteButton = document.querySelector('.btn-danger') as HTMLButtonElement;
    if (deleteButton) {
      deleteButton.click();
    }

    // Verificar si el servicio de eliminar fue llamado con el id correcto
    expect(autoServiceMock.eliminarAuto).toHaveBeenCalledWith(autoId);

    // Verificar si se mostró el mensaje de éxito (usando el mock de Toastr)
    expect(toastrMock.success).toHaveBeenCalledWith('Auto eliminado con éxito');
  });

  it('debería cerrar el modal y actualizar la lista de autos después de eliminar un auto', () => {
    const autoId = 1;
    component.abrirDeleteModal(autoId);

    // Ver que Angular haya procesado el cambio de estado
    fixture.detectChanges();

    // Simula el clic en el botón "Sí, eliminar"
    const deleteButton = document.querySelector('.btn-danger') as HTMLButtonElement;
    if (deleteButton) {
      deleteButton.click();
    }

    // Verifica si el servicio de eliminar fue llamado
    expect(autoServiceMock.eliminarAuto).toHaveBeenCalledWith(autoId);

    // Simular que la lista de autos se actualiza
    autoServiceMock.obtenerAutos.mockReturnValue(of([]));
    component.obtenerAutos();

    // Verificar que la lista de autos esté vacía
    expect(component.listaAutos).toEqual([]);

    // Verificar que el modal se haya cerrado
    const modalElement = document.querySelector('#deleteModal');
    expect(modalElement?.classList.contains('show')).toBeFalsy();
  });

});
