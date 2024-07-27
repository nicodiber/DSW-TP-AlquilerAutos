export class conductor {
    _id?: number; // El campo _id es opcional para la creación de nuevos objetos.
    dniPasaporte: string;
    apellidoConductor: string;
    nombreConductor: string;
    fechaNacimientoConductor: Date;
    licenciaConductor: string;
    fechaOtorgamientoLicencia: Date;
    nroTelefonoConductor: string;
    mailConductor: string;

    constructor(dniPasaporte: string, apellidoConductor: string, nombreConductor: string, fechaNacimientoConductor: Date, 
                licenciaConductor: string, fechaOtorgamientoLicencia: Date, nroTelefonoConductor: string, mailConductor: string, 
                _id?: number) {
        this.dniPasaporte = dniPasaporte;
        this.apellidoConductor = apellidoConductor;
        this.nombreConductor = nombreConductor;
        this.fechaNacimientoConductor = fechaNacimientoConductor;
        this.licenciaConductor = licenciaConductor;
        this.fechaOtorgamientoLicencia = fechaOtorgamientoLicencia;
        this.nroTelefonoConductor = nroTelefonoConductor;
        this.mailConductor = mailConductor;
        if (_id !== undefined) {
            this._id = _id;
        }
    }
}
