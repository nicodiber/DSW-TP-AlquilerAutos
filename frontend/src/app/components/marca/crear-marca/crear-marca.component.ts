import { Component, OnInit } from '@angular/core';
import { marca } from '../../../models/marca';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrl: './crear-marca.component.css'
})
export class CrearMarcaComponent implements OnInit {
 newmarca = marca;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
