import { usuario } from './usuario';
import { auto } from './auto';
import { sucursal } from './sucursal';

export class alquiler {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    usuario: usuario;
    auto: auto;
    sucursalEntrega: sucursal;
    sucursalDevolucion: sucursal;
    trabajadorAsignado?: usuario;
    fechaInicio: Date;
    fechaFin: Date;
    fechaInicioReal?: Date;
    fechaFinReal?: Date;
    estadoAlquiler: string; 
    precioTotalAlquiler: number; 
    notas?: string; 

    mostrarDetalles?: boolean = false; // Propiedad opcional para controlar la expansión de detalles en el frontend
    

    constructor(usuario: usuario, auto: auto, sucursalEntrega: sucursal, sucursalDevolucion: sucursal, trabajadorAsignado: usuario, fechaInicio: Date, fechaFin: Date, fechaInicioReal: Date, fechaFinReal: Date, estadoAlquiler: string, precioTotalAlquiler: number, notas: string, _id?: number) {
        this.usuario = usuario;
        this.auto = auto;
        this.sucursalEntrega = sucursalEntrega;
        this.sucursalDevolucion = sucursalDevolucion;
        this.trabajadorAsignado = trabajadorAsignado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaInicioReal = fechaInicioReal;
        this.fechaFinReal = fechaFinReal;
        this.estadoAlquiler = estadoAlquiler;
        this.precioTotalAlquiler = precioTotalAlquiler;
        this.notas = notas;

        if (_id !== undefined) {
            this._id = _id;
        }

        this.mostrarDetalles = false; // Inicia ocultando los detalles del alquiler
    }
}
