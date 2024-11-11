import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleModeloComponent } from './detalle-modelo.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ModeloService } from '../../../services/modelo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DetallarModeloComponent', () => {
  let component: DetalleModeloComponent;
  let fixture: ComponentFixture<DetalleModeloComponent>;
  let modeloService: ModeloService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleModeloComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (id: string) => '1', // Simulación de la ID del modelo
            }),
          },
        },
        ModeloService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleModeloComponent);
    component = fixture.componentInstance;
    modeloService = TestBed.inject(ModeloService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the model details on init', () => {
    const modeloSpy = spyOn(modeloService, 'obtenerModelo').and.callThrough();
    component.ngOnInit();
    expect(modeloSpy).toHaveBeenCalledWith('1'); // Se verifica que se llamó con la ID '1'
  });

  it('should display model details correctly', () => {
    const modeloMock = {
      denominacionModelo: 'Jeep Renegade',
      cantidadAsientos: 5,
    };

    spyOn(modeloService, 'obtenerModelo').and.returnValue(of(modeloMock));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.modelo?.denominacionModelo).toBe('Jeep Renegade');
    expect(component.modelo?.cantidadAsientos).toBe(5);
  });
});
