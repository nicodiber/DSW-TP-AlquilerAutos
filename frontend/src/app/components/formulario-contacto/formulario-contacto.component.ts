import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contacto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './formulario-contacto.component.html'
})
export class FormularioContactoComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService, private toastr: ToastrService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      // Recorre los controles del formulario y muestra mensajes de error con toastr
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);

        if (control?.invalid) {
          const friendlyFieldNames: { [key: string]: string } = {
            name: 'Nombre completo',
            email: 'Email',
            phone: 'Celular',
            message: 'Mensaje',
          };

          const fieldName = friendlyFieldNames[key] || key;

          if (control.errors?.['required']) {
            this.toastr.error(`El campo ${fieldName} es obligatorio.`, 'Error en el formulario');
          }
          if (control.errors?.['pattern']) {
            this.toastr.error(`El campo ${fieldName} tiene un formato incorrecto.`, 'Error en el formulario');
          }
          if (control.errors?.['email']) {
            this.toastr.error(`El correo electrónico posee un formato inválido.`, 'Error en el formulario');
          }
        }
      });
      this.contactForm.markAllAsTouched();
      return;

    } else if (this.contactForm.valid) {
      this.toastr.info('Enviando mensaje...', 'Formulario de Contacto');
      this.contactService.sendContact(this.contactForm.value).subscribe(
        response => {
          console.log('Mensaje enviado', response);
          this.toastr.success('Mensaje enviado con éxito!', 'Formulario de Contacto');
          this.contactForm.reset(); // Limpiar los campos del formulario después del envío
        },
        error => {
          console.error('Error al enviar el mensaje', error);
          this.toastr.error('Error al enviar el mensaje', 'Formulario de Contacto');
        }
      );
    }
  }
}