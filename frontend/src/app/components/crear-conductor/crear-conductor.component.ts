import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { conductor } from '../../models/conductor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; //importo el toasterx que va en un constructor abajo
import { ConductorService } from '../../services/conductor.service';

@Component({
  selector: 'app-crear-conductor',
  templateUrl: './crear-conductor.component.html',
  styleUrl: './crear-conductor.component.css'
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
      dniPasaporte: ['', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]], // Asumiendo DNI o pasaporte numérico de 8 a 10 dígitos
      apellidoConductor: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Solo letras y espacios
      nombreConductor: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Solo letras y espacios
      fechaNacimientoConductor: ['', [Validators.required, this.dateValidator]], // Validación personalizada para fecha
      licenciaConductor: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]], // Asumiendo licencia alfanumérica
      fechaOtorgamientoLicencia: ['', [Validators.required, this.dateValidator]], // Validación personalizada para fecha
      nroTelefonoConductor: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]], // Asumiendo teléfono numérico de 7 a 15 dígitos
      mailConductor: ['', [Validators.required, Validators.email]] // Validación de email
    });
    this.id = this.aRouter.snapshot.paramMap.get('id'); //esta es la manera que tenemos para acceder al id
  }

  ngOnInit(): void {
    // Método de inicialización
    this.esEditar();
  }

  // Validador personalizado para fechas
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const date = new Date(value);
    const now = new Date();
    if (isNaN(date.getTime()) || date > now) {
      return { invalidDate: true };
    }
    return null;
  }

  agregarConductor(){
    const CONDUCTOR: conductor = {
      dniPasaporte: this.conductorForm.get('dniPasaporte')?.value,
      apellidoConductor: this.conductorForm.get('apellidoConductor')?.value,
      nombreConductor: this.conductorForm.get('nombreConductor')?.value,
      fechaNacimientoConductor: this.conductorForm.get('fechaNacimientoConductor')?.value,
      licenciaConductor: this.conductorForm.get('licenciaConductor')?.value,
      fechaOtorgamientoLicencia: this.conductorForm.get('fechaOtorgamientoLicencia')?.value,
      nroTelefonoConductor: this.conductorForm.get('nroTelefonoConductor')?.value,
      mailConductor: this.conductorForm.get('mailConductor')?.value,
    }

    if(this.id !== null){
      //editamos el conductor
      this._conductorService.editarConductor(this.id, CONDUCTOR).subscribe(data =>{
        this.toastr.info('El conductor fue actualizado con exito!', 'Conductor Actualizado!');
      this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.conductorForm.reset();
      })
      
    }else{
      //agregamos el conductor
      console.log(CONDUCTOR);
      this._conductorService.guardarConductor(CONDUCTOR).subscribe(data =>{
      this.toastr.success('El conductor fue registrado con exito!', 'Conductor Registrado!');
      this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.conductorForm.reset();
      })
    }

    


  }
  esEditar(){//esto se va ejecutar cuando se inicialice el componente
    if(this.id !== null){  //si id es distindo a null osea tiene algun valor
      this.titulo = 'Editar Conductor';
      this._conductorService.obtenerConductor(this.id).subscribe(data =>{
        this.conductorForm.setValue({ //como en data tenemos la info, acá la tenemos que rellenar en el formulario
          dniPasaporte: data.dniPasaporte,
          apellidoConductor: data.apellidoConductor,
          nombreConductor: data.nombreConductor,
          fechaNacimientoConductor: data.fechaNacimientoConductor,
          licenciaConductor: data.licenciaConductor,
          fechaOtorgamientoLicencia: data.fechaOtorgamientoLicencia,
          nroTelefonoConductor: data.nroTelefonoConductor,
          mailConductor: data.mailConductor,
        }) 
      })
    }
  }
}

