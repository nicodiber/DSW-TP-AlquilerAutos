export class marca {
    _id?: number; // El campo _id es opcional
    nombreMarca: string;
  
    constructor(nombreMarca: string, _id?: number) {
      this.nombreMarca = nombreMarca;
  
      if (_id !== undefined) {
        this._id = _id;
      }
    }
  }
  