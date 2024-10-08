import { usuario } from './usuario';
import { auto } from './auto';

export class mantenimiento {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    auto: auto;
    trabajadorACargo: usuario; 
    fechaInicioMantenimiento: Date; 
    fechaFinMantenimiento: Date; 
    descripcion: string; 
    costoMantenimiento: number; 


    constructor(auto: auto, trabajadorACargo: usuario, fechaInicioMantenimiento: Date, fechaFinMantenimiento: Date, descripcion: string,  costoMantenimiento: number, _id?: number) {
        this.auto = auto;
        this.trabajadorACargo = trabajadorACargo;
        this.fechaInicioMantenimiento = fechaInicioMantenimiento;
        this.fechaFinMantenimiento = fechaFinMantenimiento;
        this.descripcion = descripcion;
        this.costoMantenimiento = costoMantenimiento;
             

        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
