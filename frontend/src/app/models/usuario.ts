import { alquiler } from './alquiler';

export class usuario {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    nombre: string; 
    apellido: string; 
    email: string; 
    contrasena: string; 
    rol: string; 
    telefono: string; 
    dni: number; 
    direccion: string;
    licenciaConducir: string;
    fechaRegistro: Date;
    alquileres: alquiler; 
    

    constructor(nombre: string, apellido: string, email: string, contrasena: string, rol: string, telefono: string, dni: number, direccion: string, licenciaConducir: string, fechaRegistro: Date, alquileres: alquiler, _id?: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasena = contrasena;
        this.rol = rol;
        this.telefono = telefono;
        this.dni = dni;
        this.direccion = direccion;
        this.licenciaConducir = licenciaConducir;
        this.fechaRegistro = fechaRegistro;
        this.alquileres = alquileres;

        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
