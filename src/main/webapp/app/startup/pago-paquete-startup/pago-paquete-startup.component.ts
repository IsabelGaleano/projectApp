import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-pago-paquete-startup',
  templateUrl: './pago-paquete-startup.component.html',
})
export class PagoPaqueteStartupComponent implements OnInit {
  rastreador: any;
  donacionPaquete: any;
  startup: any;
  paquete: any;
  usuario: any;

  constructor() {
    this.rastreador = JSON.parse(sessionStorage.donacionPaquete);
    this.donacionPaquete = this.rastreador.idDonacionPaquete;
    this.startup = JSON.parse(sessionStorage.startupEnvioPaqueteObject);
    this.paquete = JSON.parse(sessionStorage.paqueteRegistroEnvioObject);
    this.usuario = JSON.parse(sessionStorage.usuarioLoginObject);

    console.warn(this.rastreador);
    console.warn(this.donacionPaquete);
    console.warn(this.startup);
    console.warn(this.paquete);
    console.warn(this.usuario);
  }

  ngOnInit(): void {
    console.warn(this.rastreador);
  }
}
