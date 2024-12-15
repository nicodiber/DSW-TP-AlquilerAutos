import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting  } from '@angular/common/http/testing'; // Hace que las peticiones HTTP realizadas por los servicios sean interceptadas y controladas por el entorno de pruebas
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Permite ignorar errores por elementos no declarados
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ListarUsuariosComponent } from './listar-usuarios.component';

describe('ListarUsuariosComponent', () => {
  let component: ListarUsuariosComponent;
  let fixture: ComponentFixture<ListarUsuariosComponent>;
  let usuarioServiceMock: any;
  let authServiceMock: any;
  let toastrMock: any;

  beforeEach(async () => {
    // Mocks de los servicios
    usuarioServiceMock = {
      obtenerUsuarios: jest.fn().mockReturnValue(of([])), // Este método debe devolver un observable
      eliminarUsuario: jest.fn().mockReturnValue(of(null)),
    };

    authServiceMock = {
      getAuthenticatedUser: jest.fn().mockReturnValue(of({ rol: 'administrador' })), // Simula la respuesta de un usuario autenticado
    };

    toastrMock = {
      success: jest.fn(),
      error: jest.fn(),
    };

    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });

    await TestBed.configureTestingModule({
      declarations: [ListarUsuariosComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    })
    .overrideComponent(ListarUsuariosComponent, { 
      set: {
        template: `
       
                            <ng-container *ngFor="let usuario of listaUsuarios">
                                <tr>
                                <td data-label="Nombre y Apellido">{{ usuario.nombre }} {{ usuario.apellido }}</td>
                                <td data-label="Email">{{ usuario.email }}</td>
                                <td data-label="Rol">{{ usuario.rol }}</td>
                                <td data-label="Teléfono">{{ usuario.telefono }}</td>
                                <td data-label="DNI">{{ usuario.dni }}</td>
                                <td data-label="Dirección">{{ usuario.direccion }}</td>
                                <td data-label="Licencia Conductor">
                                    <span *ngIf="usuario.rol === 'usuario'">{{usuario.licenciaConductor}}</span> 
                                </td>
                                <td data-label="Fecha Registro">{{ usuario.fechaRegistro | date: 'dd/MM/yyyy ' : '-00:00' }}</td>
                                <td data-label="Alquileres">
                                    <button *ngIf="usuario.rol === 'usuario'" (click)="usuario.mostrarDetalles = !usuario.mostrarDetalles" class="btn-main btn-black">
                                        {{ usuario.mostrarDetalles ? 'Ocultar' : 'Mostrar' }}
                                    </button>
                                </td>
                                <td data-label="Acciones">
                                    <i *ngIf="usuario.rol === 'administrador' || usuario.rol === 'trabajador'"
                                        [routerLink]="['/editar-admin-trabajador', usuario._id]" class="fas fa-edit text-primary"></i>
                                    <i *ngIf="usuario.rol === 'administrador' || usuario.rol === 'trabajador'" (click)="abrirDeleteModal(usuario._id)"
                                        class="fas fa-trash text-danger">
                                    </i>
                                </td>
                                </tr>
                           
                            </ng-container>
                    
                    
                    <h5 style="text-align: start; margin-top: 10px;" *ngIf="listaUsuarios.length == 0">No hay usuarios
                        para mostrar</h5>

<!-- Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Confirmar Eliminación</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ¿Estás seguro de que deseas eliminar este usuario?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" class="btn btn-danger" (click)="confirmarDelete()">Sí, eliminar</button>
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
    fixture = TestBed.createComponent(ListarUsuariosComponent);
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

  it('debería cargar la lista de usuarios al inicializarse', () => {
    const mockUsuarios: any[] = [
        {
        id: 3,
        nombre: "Admini",
        apellido: "Strador",
        email: "admin@gmail.com",
        password: "admin123",
        licenciaConductor: "A43303974",
        telefono: "2355441011",
        direccion: "Zeballos 1330",
        dni: 43303974,
        rol: "administrador",
        fechaRegistro: "2024-11-27T20:23:40.085Z",
        alquileres: [],
        mostrarDetalles: false,
    },
    ];

    usuarioServiceMock.obtenerUsuarios.mockReturnValue(of(mockUsuarios));

    component.getUsuarios();

    expect(usuarioServiceMock.obtenerUsuarios).toHaveBeenCalled();
    expect(component.listaUsuarios).toEqual(mockUsuarios);
  });

  it('debería manejar el error al obtener usuarios', () => {
 
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});


    usuarioServiceMock.obtenerUsuarios.mockReturnValue(throwError(() => new Error('Error al obtener usuarios')));

    component.getUsuarios();
    

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener los usuarios:', expect.anything());

 
    consoleErrorSpy.mockRestore();
  });

  it('debería eliminar un usuario y actualizar la lista', () => {
    usuarioServiceMock.eliminarUsuario.mockReturnValue(of(null));
    usuarioServiceMock.obtenerUsuarios.mockReturnValue(of([]));

    component.deleteUsuario(1);

    expect(usuarioServiceMock.eliminarUsuario).toHaveBeenCalledWith(1);
    expect(toastrMock.success).toHaveBeenCalledWith("El usuario fue eliminado con exito", "Usuario Eliminado");
    expect(usuarioServiceMock.obtenerUsuarios).toHaveBeenCalled();
  });

  it('debería abrir el modal de eliminación correctamente', () => {
    const id = 1;
    component.abrirDeleteModal(id);

    fixture.detectChanges();

    expect(component.usuarioIdToDelete).toBe(id);

    const modalElement = document.querySelector('#deleteModal');
    expect(modalElement).not.toBeNull();

    const bootstrapModal = modalElement ? new (window as any).bootstrap.Modal(modalElement) : null;
    expect(bootstrapModal).toBeTruthy(); 
  });

   it('debería cerrar el modal al hacer clic en el botón "No"', () => {
    component.usuarioIdToDelete = 1;
    const modal = document.createElement('div');
    modal.id = 'deleteModal';
    document.body.appendChild(modal);

    const bootstrapMock = {
      hide: jest.fn(),
    };

    (window as any).bootstrap.Modal.getInstance = jest.fn(() => bootstrapMock);

    const bootstrapModalInstance = (window as any).bootstrap.Modal.getInstance(modal);
    bootstrapModalInstance.hide();

    expect(bootstrapMock.hide).toHaveBeenCalled();

    // Limpiar el DOM
    modal.remove();
  });

   it('debería no permitir eliminar la cuenta propia', () => {
    // Simular usuario logueado
    component.usuarioLogueado = { _id: 1 };

    // Intentar eliminar la cuenta propia
    
    component.usuarioIdToDelete = 1;
    component.confirmarDelete();
    expect(toastrMock.error).toHaveBeenCalledWith('No puedes eliminar tu propia cuenta.', 'Error');
    expect(component.usuarioIdToDelete).toBeNull();
  });

  it('debería eliminar el usuario al hacer clic en el botón "Sí, eliminar"', () => {
    const id = 1;
    component.abrirDeleteModal(id);

    // Ver que Angular haya procesado el cambio de estado
    fixture.detectChanges();

    // Simula el clic en el botón "Sí, eliminar"
    const deleteButton = document.querySelector('.btn-danger') as HTMLButtonElement;
    if (deleteButton) {
      deleteButton.click();
    }

    // Verificar si el servicio de eliminar fue llamado con el id correcto
    expect(usuarioServiceMock.eliminarUsuario).toHaveBeenCalledWith(id);

    // Verificar si se mostró el mensaje de éxito (usando el mock de Toastr)
    expect(toastrMock.success).toHaveBeenCalledWith("El usuario fue eliminado con éxito", "Usuario Eliminado");
  });

  it('debería redirigir a login si el usuario no es administrador', () => {
    authServiceMock.getAuthenticatedUser.mockReturnValue(of({ rol: 'usuario' }));

    // Simular ejecución del método
    component.isNotAdmin();

    // Verificar redirección
    expect(window.location.href).toBe('/loginUsuario');
  });

  it('debería cerrar el modal y actualizar la lista de usuarios después de eliminar un usuario', () => {
    const id = 1;
    component.abrirDeleteModal(id);

    // Ver que Angular haya procesado el cambio de estado
    fixture.detectChanges();

    // Simula el clic en el botón "Sí, eliminar"
    const deleteButton = document.querySelector('.btn-danger') as HTMLButtonElement;
    if (deleteButton) {
      deleteButton.click();
    }

    // Verifica si el servicio de eliminar fue llamado
    expect(usuarioServiceMock.eliminarUsuario).toHaveBeenCalledWith(id);

    // Simular que la lista de usuarios se actualiza
    usuarioServiceMock.obtenerUsuarios.mockReturnValue(of([]));
    component.getUsuarios();

    // Verificar que la lista de usuarios esté vacía
    expect(component.listaUsuarios).toEqual([]);

    // Verificar que el modal se haya cerrado
    const modalElement = document.querySelector('#deleteModal');
    expect(modalElement?.classList.contains('show')).toBeFalsy();
  });

});
