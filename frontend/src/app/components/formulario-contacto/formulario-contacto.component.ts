import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contacto.service';

@Component({
  selector: 'app-contact',
  templateUrl: './formulario-contacto.component.html'
})
export class FormularioContactoComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.sendContact(this.contactForm.value).subscribe(
        response => {
          console.log('Mensaje enviado', response);
          alert('Mensaje enviado correctamente');
          this.contactForm.reset(); // Limpiar los campos del formulario después del envío
        },
        error => {
          console.error('Error al enviar el mensaje', error);
          alert('Error al enviar el mensaje');
        }
      );
    }
  }
}