export class conductor{
    _id?: number;
    dniPasaporte: string;
    apellidoConductor: string;
    nombreConductor: string;
    fechaNacimientoConductor: Date;
    licenciaConductor: string;
    fechaOtorgamientoLicencia: Date;
    nroTelefonoConductor: string;
    mailConductor: string;

    constructor(dniPasaporte: string, apellidoConductor: string, nombreConductor: string, fechaNacimientoConductor: Date, 
                licenciaConductor: string, fechaOtorgamientoLicencia: Date, nroTelefonoConductor: string, mailConductor: string ){
        this.dniPasaporte = dniPasaporte;
        this.apellidoConductor = apellidoConductor;
        this.nombreConductor = nombreConductor;
        this.fechaNacimientoConductor = fechaNacimientoConductor;
        this.licenciaConductor = licenciaConductor;
        this.fechaOtorgamientoLicencia = fechaOtorgamientoLicencia ;
        this.nroTelefonoConductor = nroTelefonoConductor;
        this.mailConductor = mailConductor;
    }

}

