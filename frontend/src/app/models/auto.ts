import { mantenimiento } from './mantenimiento';

export class auto {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    modeloAuto: number; 
    sucursalAuto: number;
    historialMantenimiento: mantenimiento;
    estadoAuto: string;
    matricula: string;


    constructor(modeloAuto: number, sucursalAuto: number, historialMantenimiento: mantenimiento, estadoAuto: string, matricula: string, _id?: number) {
        this.modeloAuto = modeloAuto;
        this.sucursalAuto = sucursalAuto;
        this.historialMantenimiento = historialMantenimiento;
        this.estadoAuto = estadoAuto;
        this.matricula = matricula;
        
        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
