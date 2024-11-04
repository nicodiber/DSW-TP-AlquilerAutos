import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {
[x: string]: any;
  listaUsuarios: usuario[] = [];

  constructor(private _usuarioService: UsuarioService,
        private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  formatDateToDDMMYYYY(fecha: Date | undefined): string {
  if (!fecha) {
    return 'Fecha no disponible'; // O un valor por defecto
  }

  const date = new Date(fecha);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}



  getUsuarios() {
    this._usuarioService.obtenerUsuarios().subscribe(data => {
      console.log(data);
      this.listaUsuarios = data;
    }, error => {
      console.log(error);
    })
  }

  deleteUsuario(id: any) {
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
      this.toastr.success('El usuario fue eliminado con exito' ,'Usuario Eliminado');
      this.getUsuarios();
    }, error => {
      console.log(error);
    })
  }
}


