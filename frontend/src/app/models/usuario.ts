import { alquiler } from './alquiler';

export class usuario {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    nombre: string; 
    apellido: string; 
    email: string; 
    password: string; 
    rol: string; 
    telefono: string; 
    dni: number; 
    direccion: string;
    licenciaConductor: string;
    fechaRegistro?: Date;
    alquileres?: alquiler []; 

    mostrarDetalles?: boolean = false; // Propiedad opcional para controlar la expansión de detalles en el frontend

    constructor(nombre: string, apellido: string, email: string, password: string, rol: string, telefono: string, dni: number, direccion: string, licenciaConductor: string, fechaRegistro: Date, alquileres?: alquiler[], _id?: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.telefono = telefono;
        this.dni = dni;
        this.direccion = direccion;
        this.licenciaConductor = licenciaConductor;
        this.fechaRegistro = fechaRegistro;
        this.alquileres = alquileres;

        if (_id !== undefined) {
            this._id = _id;
        }

        this.mostrarDetalles = false;
    }
}
