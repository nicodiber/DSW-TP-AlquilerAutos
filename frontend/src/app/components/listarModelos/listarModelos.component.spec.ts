import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarModelosComponent } from './listarModelos.component';
import { ModeloService } from '../../services/modelo.service';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ListarModelosComponent', () => {
  let component: ListarModelosComponent;
  let fixture: ComponentFixture<ListarModelosComponent>;
  let httpTestingController: HttpTestingController;
  let mockModeloService: any;
  let mockToastrService: any;

  beforeEach(async () => {
    mockModeloService = {
      obtenerModelos: jasmine.createSpy('obtenerModelos')
    };

    mockToastrService = {
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      declarations: [ListarModelosComponent],
      providers: [
        provideHttpClientTesting(),  // Se usa el nuevo proveedor para HTTP Testing
        { provide: ModeloService, useValue: mockModeloService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarModelosComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerModelos on initialization', () => {
    component.ngOnInit();
    const req = httpTestingController.expectOne('/api/modelos');
    expect(req.request.method).toBe('GET');
    req.flush([]); // Simula una respuesta vacía
    expect(mockModeloService.obtenerModelos).toHaveBeenCalled();
  });

  it('should set listModelos when obtenerModelos returns data', () => {
    const modelosMock = [{ nombreModelo: 'Ejemplo', tipoModelo: { "_id": 1, "tipoVehiculo": "Sedan", "precioTipo": 5000 }, anioModelo: 2020, colorModelo: 'Rojo', dimensionesModelo: '2200x1400x1100', cantidadAsientosModelo: 5, cantidadPuertasModelo: 4, motorModelo: '1.8 Turbo', cajaTransmisionModelo: 'Manual', tipoCombustibleModelo: 'Diesel', capacidadTanqueCombustibleModelo: 50, capacidadBaulModelo: 110, precioModelo: 100000 }];
    component.ngOnInit();
    const req = httpTestingController.expectOne('/api/modelos');
    expect(req.request.method).toBe('GET');
    req.flush(modelosMock); // Simula una respuesta con datos
    expect(component.listModelos).toEqual(modelosMock);
  });

  it('should handle errors and show toastr on failure', () => {
    component.ngOnInit();
    const req = httpTestingController.expectOne('/api/modelos');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error')); // Simula un error de red
    expect(mockToastrService.error).toHaveBeenCalledWith('Error al cargar los modelos', 'Error');
  });
});
