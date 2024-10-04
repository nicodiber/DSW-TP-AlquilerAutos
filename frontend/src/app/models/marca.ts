export class marca {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    nombreMarca: string; 

    constructor(nombreMarca: string, _id?: number) {
        this.nombreMarca = nombreMarca;

        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
