import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarModelosComponent } from './modelo-listar.component';
import { ModeloService } from '../../../services/modelo.service';
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
    const modelosMock = [{ nombreModelo: 'Ejemplo', categoriaModelo: { "_id": 1, "nombreCategoria": "Sedan" }, marcaModelo: { "_id": 1, "nombreMarca": "Chevrolet" }, precioXdia: 45000, anio: 2020, color: 'Rojo', dimensiones: '2200x1400x1100', cantidadAsientos: 5, cantidadPuertas: 4, motor: '1.8 Turbo', cajaTransmision: 'Manual', tipoCombustible: 'Diesel', capacidadTanqueCombustible: 50, capacidadBaul: 110, images: [] }];
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
