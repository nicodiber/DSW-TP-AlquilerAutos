import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { SucursalCrearComponent } from './sucursal-crear.component';
import { SucursalService } from '../../../services/sucursal.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('SucursalCrearComponent', () => {
    let component: SucursalCrearComponent;
    let fixture: ComponentFixture<SucursalCrearComponent>;
    let sucursalServiceMock: any;
    let authServiceMock: any;
    let toastrMock: any;
    let routerMock: any;

    beforeEach(async () => {
        sucursalServiceMock = {
            guardarSucursal: jest.fn(),
            editarSucursal: jest.fn(),
            obtenerSucursal: jest.fn(),
        };

        authServiceMock = {
            getAuthenticatedUser: jest.fn().mockReturnValue(of({ rol: 'administrador' })),
        };

        toastrMock = {
            success: jest.fn(),
            error: jest.fn(),
            info: jest.fn(),
        };

        routerMock = {
            navigate: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [SucursalCrearComponent],
            imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
            providers: [
                { provide: SucursalService, useValue: sucursalServiceMock },
                { provide: AuthService, useValue: authServiceMock },
                { provide: ToastrService, useValue: toastrMock },
                { provide: Router, useValue: routerMock },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: jest.fn().mockReturnValue(null) } } } },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SucursalCrearComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debería crearse el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debería cargar el formulario de sucursal correctamente', () => {
        expect(component.sucursalForm).toBeDefined();
        expect(component.sucursalForm.controls['nombreSucursal']).toBeDefined();
        expect(component.sucursalForm.controls['telefonoSucursal']).toBeDefined();
    });

    it('debería enviar el formulario si es válido', () => {
        component.sucursalForm.setValue({
            nombreSucursal: 'Sucursal A',
            telefonoSucursal: '123456789',
            direccionSucursal: 'Av. Principal 123',
            paisSucursal: 'México',
            provinciaSucursal: 'CDMX',
            ciudadSucursal: 'Ciudad de México',
            horaAperturaSucursal: '08:00',
            horaCierreSucursal: '18:00',
        });

        const submitSpy = jest.spyOn(component, 'agregarSucursal');

        component.submitForm();

        expect(submitSpy).toHaveBeenCalled();
    });

    it('no debería enviar el formulario si es inválido', () => {
        const submitSpy = jest.spyOn(component, 'agregarSucursal');

        component.submitForm();

        expect(submitSpy).not.toHaveBeenCalled();
    });

    it('debería llamar al servicio de guardar sucursal cuando se crea una nueva', () => {
        component.sucursalForm.setValue({
            nombreSucursal: 'Sucursal A',
            telefonoSucursal: '123456789',
            direccionSucursal: 'Av. Principal 123',
            paisSucursal: 'México',
            provinciaSucursal: 'CDMX',
            ciudadSucursal: 'Ciudad de México',
            horaAperturaSucursal: '08:00',
            horaCierreSucursal: '18:00',
        });

        sucursalServiceMock.guardarSucursal.mockReturnValue(of({}));

        component.agregarSucursal();

        expect(sucursalServiceMock.guardarSucursal).toHaveBeenCalled();
        expect(toastrMock.success).toHaveBeenCalledWith('La sucursal fue registrada con éxito!', 'Sucursal Registrada');
        expect(routerMock.navigate).toHaveBeenCalledWith(['/sucursal-listar']);
    });

    it('debería mostrar un error si falla al guardar la sucursal', () => {
        component.sucursalForm.setValue({
            nombreSucursal: 'Sucursal A',
            telefonoSucursal: '123456789',
            direccionSucursal: 'Av. Principal 123',
            paisSucursal: 'México',
            provinciaSucursal: 'CDMX',
            ciudadSucursal: 'Ciudad de México',
            horaAperturaSucursal: '08:00',
            horaCierreSucursal: '18:00',
        });

        sucursalServiceMock.guardarSucursal.mockReturnValue(throwError(() => new Error('Error al guardar la sucursal')));

        component.agregarSucursal();

        expect(toastrMock.error).toHaveBeenCalledWith('Ocurrió un error al intentar registrar la sucursal', 'Error de Registro');
    });

    it('debería llamar al servicio de editar sucursal cuando se edita una existente', () => {
        const mockSucursal = {
            nombreSucursal: 'Sucursal A',
            telefonoSucursal: '123456789',
            direccionSucursal: 'Av. Principal 123',
            paisSucursal: 'México',
            provinciaSucursal: 'CDMX',
            ciudadSucursal: 'Ciudad de México',
            horaAperturaSucursal: '08:00',
            horaCierreSucursal: '18:00',
        };

        const id = '1';
        component.id = id;
        component.sucursalForm.setValue(mockSucursal);
        sucursalServiceMock.editarSucursal.mockReturnValue(of({}));

        component.agregarSucursal();

        expect(sucursalServiceMock.editarSucursal).toHaveBeenCalledWith(id, mockSucursal);
        expect(toastrMock.info).toHaveBeenCalledWith('La sucursal fue actualizada con éxito!', 'Sucursal Actualizada');
        expect(routerMock.navigate).toHaveBeenCalledWith(['/sucursal-listar']);
    });

    it('debería manejar el error al intentar editar la sucursal', () => {
        const mockSucursal = {
            nombreSucursal: 'Sucursal A',
            telefonoSucursal: '123456789',
            direccionSucursal: 'Av. Principal 123',
            paisSucursal: 'México',
            provinciaSucursal: 'CDMX',
            ciudadSucursal: 'Ciudad de México',
            horaAperturaSucursal: '08:00',
            horaCierreSucursal: '18:00',
        };

        const id = '1';
        component.id = id;
        component.sucursalForm.setValue(mockSucursal);
        sucursalServiceMock.editarSucursal.mockReturnValue(throwError(() => new Error('Error al editar la sucursal')));

        component.agregarSucursal();

        expect(toastrMock.error).toHaveBeenCalledWith('Ocurrió un error al intentar actualizar la sucursal', 'Error de Actualización');
    });
});
