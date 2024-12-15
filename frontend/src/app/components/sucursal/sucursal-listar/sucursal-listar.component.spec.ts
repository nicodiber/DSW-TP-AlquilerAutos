import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SucursalListarComponent } from './sucursal-listar.component';
import { SucursalService } from '../../../services/sucursal.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

describe('SucursalListarComponent', () => {
    let component: SucursalListarComponent;
    let fixture: ComponentFixture<SucursalListarComponent>;
    let sucursalServiceMock: any;
    let authServiceMock: any;
    let toastrMock: any;

    beforeEach(async () => {
        // Mocks de los servicios
        sucursalServiceMock = {
            obtenerSucursales: jest.fn().mockReturnValue(of([])), // Este método debe devolver un observable
            eliminarSucursal: jest.fn().mockReturnValue(of(null)),
        };

        authServiceMock = {
            getAuthenticatedUser: jest.fn().mockReturnValue(of({ rol: 'administrador' })), // Simula la respuesta de un usuario autenticado
        };

        toastrMock = {
            success: jest.fn(),
            error: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [SucursalListarComponent],
            providers: [
                provideHttpClientTesting(),
                { provide: SucursalService, useValue: sucursalServiceMock },
                { provide: AuthService, useValue: authServiceMock },
                { provide: ToastrService, useValue: toastrMock },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .overrideComponent(SucursalListarComponent, {
                set: {
                    template: `
        <h1>Sucursales Listadas</h1>
        <ul>
          <li *ngFor="let sucursal of listaSucursales">
            {{ sucursal.nombreSucursal }}
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
                ¿Estás seguro de que deseas eliminar esta Sucursal?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" class="btn btn-danger" (click)="deleteSucursal(sucursalIdToDelete)">Sí, eliminar</button>
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
        fixture = TestBed.createComponent(SucursalListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).bootstrap = { // Simular bootstrap para el Modal
            Modal: class {
                show() { }
                hide() { }
            }
        };
    });

    it('debería crearse el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debería cargar la lista de sucursales al inicializarse', () => {
        const mockSucursales: any[] = [
            { id: 1, nombreSucursal: 'Sucursal Central', telefonoSucursal: '123456789', direccionSucursal: 'Av. Siempre Viva', paisSucursal: 'México', provinciaSucursal: 'CDMX', ciudadSucursal: 'Ciudad de México' },
            { id: 2, nombreSucursal: 'Sucursal Norte', telefonoSucursal: '987654321', direccionSucursal: 'Calle Ficticia', paisSucursal: 'México', provinciaSucursal: 'CDMX', ciudadSucursal: 'Ciudad de México' },
        ];

        sucursalServiceMock.obtenerSucursales.mockReturnValue(of(mockSucursales));

        component.getSucursales();

        expect(sucursalServiceMock.obtenerSucursales).toHaveBeenCalled();
        expect(component.listaSucursales).toEqual(mockSucursales);
    });

    it('debería manejar el error al obtener sucursales', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Simulamos un error en la obtención de sucursales
        sucursalServiceMock.obtenerSucursales.mockReturnValue(throwError(() => new Error('Error al obtener sucursales')));

        component.getSucursales();

        // Verificamos que se haya llamado a console.error con el mensaje adecuado
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener las sucursales:', expect.anything());

        consoleErrorSpy.mockRestore();
    });

    it('debería eliminar una sucursal y actualizar la lista', () => {
        sucursalServiceMock.eliminarSucursal.mockReturnValue(of(null));
        sucursalServiceMock.obtenerSucursales.mockReturnValue(of([]));

        component.deleteSucursal(1);

        expect(sucursalServiceMock.eliminarSucursal).toHaveBeenCalledWith(1);
        expect(toastrMock.success).toHaveBeenCalledWith('La sucursal fue eliminada con éxito', 'Sucursal Eliminada');
        expect(sucursalServiceMock.obtenerSucursales).toHaveBeenCalled();
    });

    it('debería abrir el modal de eliminación correctamente', () => {
        const sucursalId = 1;
        component.abrirDeleteModal(sucursalId);

        fixture.detectChanges();

        expect(component.sucursalIdToDelete).toBe(sucursalId);

        const modalElement = document.querySelector('#deleteModal');
        expect(modalElement).not.toBeNull();

        const bootstrapModal = modalElement ? new (window as any).bootstrap.Modal(modalElement) : null;
        expect(bootstrapModal).toBeTruthy();
    });

    it('debería cerrar el modal al hacer clic en el botón "No"', () => {
        const sucursalId = 1;
        component.abrirDeleteModal(sucursalId);

        fixture.detectChanges();

        const modalElement = document.querySelector('#deleteModal');
        expect(modalElement).not.toBeNull();

        const closeButton = modalElement?.querySelector('.btn-secondary') as HTMLButtonElement;
        if (closeButton) {
            closeButton.click();
        }

        expect(modalElement?.classList.contains('show')).toBeFalsy();
    });

    it('debería eliminar la sucursal al hacer clic en el botón "Sí, eliminar"', () => {
        const sucursalId = 1;
        component.abrirDeleteModal(sucursalId);

        fixture.detectChanges();

        const deleteButton = document.querySelector('.btn-danger') as HTMLButtonElement;
        if (deleteButton) {
            deleteButton.click();
        }

        expect(sucursalServiceMock.eliminarSucursal).toHaveBeenCalledWith(sucursalId);
        expect(toastrMock.success).toHaveBeenCalledWith('La sucursal fue eliminada con éxito', 'Sucursal Eliminada');
    });

    it('debería cerrar el modal y actualizar la lista de sucursales después de eliminar una sucursal', () => {
        const sucursalId = 1;
        component.abrirDeleteModal(sucursalId);

        fixture.detectChanges();

        const deleteButton = document.querySelector('.btn-danger') as HTMLButtonElement;
        if (deleteButton) {
            deleteButton.click();
        }

        expect(sucursalServiceMock.eliminarSucursal).toHaveBeenCalledWith(sucursalId);

        sucursalServiceMock.obtenerSucursales.mockReturnValue(of([]));
        component.getSucursales();

        expect(component.listaSucursales).toEqual([]);
        const modalElement = document.querySelector('#deleteModal');
        expect(modalElement?.classList.contains('show')).toBeFalsy();
    });

});
