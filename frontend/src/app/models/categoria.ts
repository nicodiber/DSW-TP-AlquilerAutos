export class categoria {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    nombreCategoria: string; 

    constructor(nombreCategoria: string, _id?: number) {
        this.nombreCategoria = nombreCategoria;

        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
