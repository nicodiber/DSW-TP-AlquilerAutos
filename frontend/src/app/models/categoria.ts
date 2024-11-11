export class categoria {
  static findById(modeloCategoriaId: number | undefined) {
    throw new Error('Method not implemented.');
  }
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    nombreCategoria: string; 
  static obtenerCategoria: any;

    constructor(nombreCategoria: string, _id?: number) {
        this.nombreCategoria = nombreCategoria;

        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
