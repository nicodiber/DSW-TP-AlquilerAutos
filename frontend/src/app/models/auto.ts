import { modelo } from './modelo';
import { sucursal } from './sucursal';
import { mantenimiento } from './mantenimiento';

export class auto {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    modeloAuto: modelo; 
    sucursalAuto: sucursal;
    historialMantenimiento: mantenimiento;
    estadoAuto: string;
    matricula: string;


    constructor(modeloAuto: modelo, sucursalAuto: sucursal, historialMantenimiento: mantenimiento, estadoAuto: string, matricula: string, _id?: number) {
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
