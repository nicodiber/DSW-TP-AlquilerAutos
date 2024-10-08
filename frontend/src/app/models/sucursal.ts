import { usuario } from './usuario';
import { auto } from './auto';

export class sucursal {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    nombreSucursal: string; 
    telefonoSucursal: string; 
    direccionSucursal: string; 
    paisSucursal: string; 
    provinciaSucursal: string; 
    ciudadSucursal: string; 
    horaAperturaSucursal: Date; 
    horaCierreSucursal: Date; 
    trabajadores: usuario; 
    autos: auto; 
    

    constructor(nombreSucursal: string, telefonoSucursal: string, direccionSucursal: string, paisSucursal: string, provinciaSucursal: string, ciudadSucursal: string, horaAperturaSucursal: Date, horaCierreSucursal: Date, trabajadores: usuario, autos: auto, _id?: number) {
        this.nombreSucursal = nombreSucursal;
        this.telefonoSucursal = telefonoSucursal;
        this.direccionSucursal = direccionSucursal;
        this.paisSucursal = paisSucursal;
        this.provinciaSucursal = provinciaSucursal;
        this.ciudadSucursal = ciudadSucursal;
        this.horaAperturaSucursal = horaAperturaSucursal;
        this.horaCierreSucursal = horaCierreSucursal;
        this.trabajadores = trabajadores;
        this.autos = autos;

        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
