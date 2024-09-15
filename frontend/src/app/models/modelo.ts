import { tipo } from './tipo';

export class modelo {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    nombreModelo: string; 
    tipoModelo: tipo; 
    anioModelo: number; 
    colorModelo: string; 
    dimensionesModelo: string; 
    cantidadAsientosModelo: number; 
    cantidadPuertasModelo: number; 
    motorModelo: string; 
    cajaTransmisionModelo: string; 
    tipoCombustibleModelo: string; 
    capacidadTanqueCombustibleModelo: number; 
    capacidadBaulModelo: number; 
    precioModelo: number; 

    constructor(nombreModelo: string, tipoModelo: tipo, anioModelo: number, colorModelo: string, dimensionesModelo: string, cantidadAsientosModelo: number, cantidadPuertasModelo: number, motorModelo: string, cajaTransmisionModelo: string, tipoCombustibleModelo: string, capacidadTanqueCombustibleModelo: number, capacidadBaulModelo: number, precioModelo: number, _id?: number) {
        this.nombreModelo = nombreModelo;
        this.tipoModelo = tipoModelo;
        this.anioModelo = anioModelo;
        this.colorModelo = colorModelo;
        this.dimensionesModelo = dimensionesModelo;
        this.cantidadAsientosModelo = cantidadAsientosModelo;
        this.cantidadPuertasModelo = cantidadPuertasModelo;
        this.motorModelo = motorModelo;
        this.cajaTransmisionModelo = cajaTransmisionModelo;
        this.tipoCombustibleModelo = tipoCombustibleModelo;
        this.capacidadTanqueCombustibleModelo = capacidadTanqueCombustibleModelo;
        this.capacidadBaulModelo = capacidadBaulModelo;
        this.precioModelo = precioModelo;

        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
