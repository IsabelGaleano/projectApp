import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    this.rastreador = JSON.parse(sessionStorage.rastreadorPaquete);
    this.donacionPaquete = JSON.parse(sessionStorage.donacionPaquete);
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

  pagarPaquete(): void {
    const router = this.router;
    this.router.navigate(['pago-final-paquetes']);
  }
}
