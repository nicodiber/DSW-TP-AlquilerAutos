import { alquiler } from './alquiler';

export class incidente {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    alquiler: alquiler;
    descripcion: string; 
    costoIncidente: number; 
    fechaIncidente: Date;
    

    constructor(alquiler: alquiler, descripcion: string, costoIncidente: number, fechaIncidente: Date, _id?: number) {
        this.alquiler = alquiler;
        this.descripcion = descripcion;
        this.costoIncidente = costoIncidente;
        this.fechaIncidente = fechaIncidente;

        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
