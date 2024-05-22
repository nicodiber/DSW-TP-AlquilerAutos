class Sucursal {
  constructor(idSucursal, denominacionSucursal, nroTelefonoSucursal, provinciaSucursal, ciudadSucursal, direccionSucursal, horarioAperturaSucursal, horarioCierreSucursal) {
    this.idSucursal = idSucursal;
    this.denominacionSucursal = denominacionSucursal;
    this.nroTelefonoSucursal = nroTelefonoSucursal;
    this.provinciaSucursal = provinciaSucursal;
    this.ciudadSucursal = ciudadSucursal;
    this.direccionSucursal = direccionSucursal;
    this.horarioAperturaSucursal = horarioAperturaSucursal;
    this.horarioCierreSucursal = horarioCierreSucursal;
  }
}

module.exports = Sucursal;