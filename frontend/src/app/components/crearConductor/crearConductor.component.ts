import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { conductor } from '../../models/conductor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Importo el toaster que va en un constructor abajo
import { ConductorService } from '../../services/conductor.service';

@Component({
  selector: 'app-crearConductor',
  templateUrl: './crearConductor.component.html',
  styleUrls: ['./crearConductor.component.css'] // Corrección de "styleUrl" a "styleUrls"
})
export class CrearConductorComponent implements OnInit {
  conductorForm: FormGroup;
  titulo = 'Crear Conductor';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _conductorService: ConductorService,
              private aRouter: ActivatedRoute) {
    this.conductorForm = this.fb.group({
      dniPasaporte: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]], // Asumiendo DNI o pasaporte numérico de 7 a 10 dígitos
      apellidoConductor: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Solo letras y espacios
      nombreConductor: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Solo letras y espacios
      fechaNacimientoConductor: [null, [Validators.required]], // Cambiado a null y sin patrón, el control de fecha se maneja con Date
      licenciaConductor: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]], // Asumiendo licencia alfanumérica
      fechaOtorgamientoLicencia: [null, [Validators.required]], // Cambiado a null y sin patrón, el control de fecha se maneja con Date
      nroTelefonoConductor: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]], // Asumiendo teléfono numérico de 7 a 15 dígitos
      mailConductor: ['', [Validators.required, Validators.email]] // Validación de email
    });
    this.id = this.aRouter.snapshot.paramMap.get('id'); // Esta es la manera que tenemos para acceder al id
  }

  ngOnInit(): void {
    // Método de inicialización
    this.esEditar();
  }


  // Función para formatear una fecha en formato 'dd-MM-yyyy'
  formatDateToYYYYMMDD(date: Date): string {
    const day = ('0' + date.getUTCDate()).slice(-2);
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  }

  agregarConductor() {
    if (this.conductorForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    console.log('Formulario válido, enviando datos');

    // Convertir las fechas de la cadena a objetos Date
    const fechaNacimientoStr = this.conductorForm.get('fechaNacimientoConductor')?.value;
    const fechaOtorgamientoLicenciaStr = this.conductorForm.get('fechaOtorgamientoLicencia')?.value;

    // Asegúrate de convertir la fecha de cadena a un objeto Date antes de llamar a toISOString
    const fechaNacimiento = new Date(fechaNacimientoStr);
    const fechaOtorgamientoLicencia = new Date(fechaOtorgamientoLicenciaStr);

    // Verifica si las fechas son válidas
    if (isNaN(fechaNacimiento.getTime())) {
      console.error('Fecha de nacimiento no válida');
      return;
    }
    if (isNaN(fechaOtorgamientoLicencia.getTime())) {
      console.error('Fecha de otorgamiento de licencia no válida');
      return;
    }

    const CONDUCTOR: conductor = {
      dniPasaporte: this.conductorForm.get('dniPasaporte')?.value,
      apellidoConductor: this.conductorForm.get('apellidoConductor')?.value,
      nombreConductor: this.conductorForm.get('nombreConductor')?.value,
      fechaNacimientoConductor: fechaNacimiento,
      licenciaConductor: this.conductorForm.get('licenciaConductor')?.value,
      fechaOtorgamientoLicencia: fechaOtorgamientoLicencia,
      nroTelefonoConductor: this.conductorForm.get('nroTelefonoConductor')?.value,
      mailConductor: this.conductorForm.get('mailConductor')?.value,
    };

    if (this.id !== null) {
      console.log('Editando conductor:', CONDUCTOR);
      this._conductorService.editarConductor(this.id, CONDUCTOR).subscribe(data => {
        console.log('Conductor editado', data);
        this.toastr.info('El conductor fue actualizado con éxito!', 'Conductor Actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log('Error al actualizar conductor', error);
        this.conductorForm.reset();
      });
    } else {
      console.log('Guardando conductor:', CONDUCTOR);
      this._conductorService.guardarConductor(CONDUCTOR).subscribe(data => {
        console.log('Conductor guardado', data);
        this.toastr.success('El conductor fue registrado con éxito!', 'Conductor Registrado!');
        this.router.navigate(['/']);
      }, error => {
        console.log('Error al guardar conductor', error);
        this.conductorForm.reset();
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Conductor';
      this._conductorService.obtenerConductor(this.id).subscribe(data => {
        const fechaNacimiento = new Date(data.fechaNacimientoConductor);
        const fechaOtorgamientoLicencia = new Date(data.fechaOtorgamientoLicencia);

        this.conductorForm.setValue({
          dniPasaporte: data.dniPasaporte,
          apellidoConductor: data.apellidoConductor,
          nombreConductor: data.nombreConductor,
          fechaNacimientoConductor: this.formatDateToYYYYMMDD(fechaNacimiento),
          licenciaConductor: data.licenciaConductor,
          fechaOtorgamientoLicencia: this.formatDateToYYYYMMDD(fechaOtorgamientoLicencia),
          nroTelefonoConductor: data.nroTelefonoConductor,
          mailConductor: data.mailConductor,
        });
      });
    }
  }
}
