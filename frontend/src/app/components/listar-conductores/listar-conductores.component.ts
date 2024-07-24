import { Component, OnInit } from '@angular/core';
import { ConductorService } from '../../services/conductor.service';
import { conductor } from '../../models/conductor';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';


@Component({
  selector: 'app-listar-conductores',
  templateUrl: './listar-conductores.component.html',
  styleUrl: './listar-conductores.component.css'
})
export class ListarConductoresComponent implements OnInit {
  listConductores: conductor[] = [];

    //inyectamos el servicio (conductor.services) que acabamos de crear
  constructor(private _conductorService: ConductorService,
              private toastr: ToastrService){}

  ngOnInit(): void {
    this.obtenerConductores();
  }

 //ACLARACION ==> POR ALGUNA RAZON EL .subscribe me lo tacha, asi q tuve que usar el next y el error, aunq funciona igual

  //al devolver un observable, nos tenemos que suscribir
obtenerConductores() {
  this._conductorService.getConductores().subscribe({
    next: (data) => {
      console.log(data);
      this.listConductores = data;
    },
    error: (error) => {
      console.log(error);
    }
  });
}
 

 eliminarConductor(id: any) {
  this._conductorService.eliminarConductor(id).subscribe({
    next: (data) => {
      this.toastr.error('El conductor fue eliminado con éxito', 'Conductor Eliminado');
      this.obtenerConductores();
    },
    error: (error) => {
      console.log(error);
    }
  });
}


}
