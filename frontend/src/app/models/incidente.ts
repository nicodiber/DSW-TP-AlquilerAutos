import { alquiler } from './alquiler';

export class incidente {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    idAlquiler: alquiler;
    descripcion: string; 
    costoIncidente: number; 
    fechaIncidente: Date;
    fechaPago?: Date;
    estadoIncidente: string; 
    
    mostrarDetalles?: boolean = false; // Propiedad opcional para controlar la expansión de detalles en el frontend

    constructor(idAlquiler: alquiler, descripcion: string, costoIncidente: number, fechaIncidente: Date,  estadoIncidente: string, fechaPago?: Date, _id?: number) {
        this.idAlquiler = idAlquiler;
        this.descripcion = descripcion;
        this.costoIncidente = costoIncidente;
        this.fechaIncidente = fechaIncidente;
        this.fechaPago = fechaPago
        this.estadoIncidente = estadoIncidente;

        if (_id !== undefined) {
            this._id = _id;
        }

        this.mostrarDetalles = false; 
    }
}
