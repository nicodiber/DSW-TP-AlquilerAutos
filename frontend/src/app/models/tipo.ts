export class tipo {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    tipoVehiculo: string; 
    precioTipo: number; 

    constructor(tipoVehiculo: string, precioTipo: number, _id?: number) {
        this.tipoVehiculo = tipoVehiculo;
        this.precioTipo = precioTipo;

        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
