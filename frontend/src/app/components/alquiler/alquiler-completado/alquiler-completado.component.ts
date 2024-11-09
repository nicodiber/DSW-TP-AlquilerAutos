import { Component } from '@angular/core';

@Component({
  selector: 'app-alquiler-completado',
  templateUrl: './alquiler-completado.component.html',
  styleUrls: ['./alquiler-completado.component.css']
})
export class AlquilerCompletadoComponent {

  generatePDF() {
    const ticket = document.querySelector('.reservation');

    if (ticket) {
      const options = {
        margin: 0.5,
        filename: 'constancia_reserva_vehiculo.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      (window as any).html2pdf().set(options).from(ticket).save();
    } else {
      console.error("No se encontró el elemento '.reservation'");
    }
  }

}
