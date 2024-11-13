import { categoria } from './categoria';
import { marca } from './marca';

export class modelo {
    _id?: number; // El _id es opcional para la creación de nuevos objetos.
    nombreModelo: string; 
    categoriaModelo: categoria; 
    marcaModelo: marca; // Así permitimos que marcaModelo sea un objeto o un número
    precioXdia: number; 
    anio: number; 
    color: string; 
    dimensiones: string; 
    cantidadAsientos: number; 
    cantidadPuertas: number; 
    motor: string; 
    cajaTransmision: string; 
    tipoCombustible: string; 
    capacidadTanqueCombustible: number; 
    capacidadBaul: number; 
    images: string[] = [];
    
    mostrarDetalles?: boolean = false; // Propiedad opcional para controlar la expansión de detalles en el frontend

    constructor(nombreModelo: string, categoriaModelo: categoria, marcaModelo: marca, precioXdia: number, anio: number, color: string, dimensiones: string, cantidadAsientos: number, cantidadPuertas: number, motor: string, cajaTransmision: string, tipoCombustible: string, capacidadTanqueCombustible: number, capacidadBaul: number, _id?: number, images: string[] = []) {
        this.nombreModelo = nombreModelo;
        this.categoriaModelo = categoriaModelo;
        this.marcaModelo = marcaModelo;
        this.precioXdia = precioXdia;
        this.anio = anio;
        this.color = color;
        this.dimensiones = dimensiones;
        this.cantidadAsientos = cantidadAsientos;
        this.cantidadPuertas = cantidadPuertas;
        this.motor = motor;
        this.cajaTransmision = cajaTransmision;
        this.tipoCombustible = tipoCombustible;
        this.capacidadTanqueCombustible = capacidadTanqueCombustible;
        this.capacidadBaul = capacidadBaul;
        this.images = images;

        if (_id !== undefined) {
            this._id = _id;
        }

        this.mostrarDetalles = false; 
    }
}
